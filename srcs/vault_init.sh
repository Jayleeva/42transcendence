#!/bin/bash
# unseal.sh

# Indiquer explicitement au client CLI de parler en HTTP local
export VAULT_ADDR="http://127.0.0.1:8200"

echo "⏳ Attente de l'ouverture du port réseau de Vault..."
# On attend simplement que le port 8200 réponde, peu importe le code HTTP (200, 501, 503)
until docker exec vault curl -s -o /dev/null http://127.0.0.1:8200/v1/sys/health; do
    printf "."
    sleep 1
done
echo " connecté !"

echo "🔍 Vérification du statut de Vault..."
# Récupération du code HTTP de sys/health (501 = non init, 503 = scellé, 200 = OK déverrouillé)
STATUS=$(docker exec vault curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8200/v1/sys/health)

if [ "$STATUS" -eq 501 ]; then
    echo "🆕 Vault n'est pas initialisé. Initialisation en cours..."
    
    # Initialisation avec 1 clé (Recommandé pour un projet d'école)
    INIT_OUT=$(docker exec vault vault operator init -key-shares=1 -key-threshold=1)
    
    # Extraction propre des clés (Gestion robuste des espaces et retours à la ligne)
    UNSEAL_KEY=$(echo "$INIT_OUT" | grep "Unseal Key 1:" | awk '{print $NF}' | tr -d '\r')
    ROOT_TOKEN=$(echo "$INIT_OUT" | grep "Initial Root Token:" | awk '{print $NF}' | tr -d '\r')
    
    # Sauvegarde des credentials dans le volume partagé pour les prochains redémarrages
    docker exec vault sh -c "echo '$UNSEAL_KEY' > /vault/secrets/unseal.key"
    docker exec vault sh -c "echo '$ROOT_TOKEN' > /vault/secrets/root.token"
    
    # Copie locale (sur votre machine hôte) pratique pour vos propres tests au besoin
    echo "$UNSEAL_KEY" > .vault_unseal_key
    echo "$ROOT_TOKEN" > .vault_root_token
    
    echo "🔓 Premier déverrouillage de Vault..."
    docker exec vault vault operator unseal "$UNSEAL_KEY" > /dev/null
    
    # --- CONFIGURATION AUTOMATIQUE DES SERVICES ---
    echo "⚙️ Configuration du moteur de secrets et de l'AppRole..."
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault secrets enable -path=secret kv-v2
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault kv put secret/myapp db_password="SuperPassword123"
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault auth enable approle
    
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault sh -c "echo 'path \"secret/data/myapp\" { capabilities = [\"read\"] }' > /tmp/policy.hcl"
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault policy write myapp-policy /tmp/policy.hcl
    docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault write auth/approle/role/myapp-role token_policies="myapp-policy" token_ttl=1h
    
    ROLE_ID=$(docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault read -format=json auth/approle/role/myapp-role/role-id | grep -o '"role_id":[^,]*' | cut -d'"' -f4)
    SECRET_ID=$(docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault write -f -format=json auth/approle/role/myapp-role/secret-id | grep -o '"secret_id":[^,]*' | cut -d'"' -f4)
    
    docker exec vault sh -c "echo '$ROLE_ID' > /vault/secrets/role.id"
    docker exec vault sh -c "echo '$SECRET_ID' > /vault/secrets/secret.id"
    
    echo "✅ Vault est initialisé, configuré et prêt !"

elif [ "$STATUS" -eq 503 ]; then
    echo "🔓 Vault est scellé (Sealed). Tentative de déverrouillage..."
    
    if docker exec vault test -f /vault/secrets/unseal.key; then
        KEY=$(docker exec vault cat /vault/secrets/unseal.key | tr -d '\r')
        docker exec vault vault operator unseal "$KEY" > /dev/null
        echo "✅ Vault déverrouillé avec succès !"
    else
        echo "❌ Erreur : Fichier /vault/secrets/unseal.key introuvable dans le conteneur."
        echo "💡 Astuce : Lancez 'make clean' pour tout réinitialiser proprement."
        exit 1
    fi
elif [ "$STATUS" -eq 200 ]; then
    echo "✅ Vault est déjà déverrouillé et opérationnel."
else
    echo "❓ Statut Vault inconnu (Code HTTP: $STATUS). Vérifiez les logs avec 'docker logs vault'."
    exit 1
fi
