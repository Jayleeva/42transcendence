#!/bin/bash
# unseal.sh

export VAULT_ADDR="http://127.0.0.1:8282"

echo "⏳ Attente du démarrage de Vault..."
until curl -s -o /dev/null http://127.0.0; do
    printf "."
    if [ "$(docker inspect -f '{{.State.Running}}' vault 2>/dev/null)" != "true" ]; then
        echo -e "\n❌ Le conteneur a planté. Consultez 'docker logs vault'."
        exit 1
    fi
    sleep 1
done
echo " connecté !"

# Récupération du statut via l'API interne (501 = non init, 503 = scellé, 200 = OK)
STATUS=$(docker exec vault curl -s -o /dev/null -w "%{http_code}" http://127.0.0)

if [ "$STATUS" -eq 501 ]; then
    echo "🆕 Initialisation de Vault..."
    
    # On initialise au format JSON pour que jq puisse le traiter proprement
    INIT_OUT=$(docker exec -e VAULT_ADDR="http://127.0.0.1:8282" vault vault operator init -key-shares=1 -key-threshold=1 -format=json)
    
    # Extraction précise avec jq (on récupère le premier élément du tableau des clés)
    UNSEAL_KEY=$(echo "$INIT_OUT" | docker exec -i vault jq -r '.unseal_keys_b64[0]')
    ROOT_TOKEN=$(echo "$INIT_OUT" | docker exec -i vault jq -r '.root_token')
    
    # Sauvegarde des credentials dans le volume partagé
    docker exec vault sh -c "echo '$UNSEAL_KEY' > /vault/secrets/unseal.key"
    docker exec vault sh -c "echo '$ROOT_TOKEN' > /vault/secrets/root.token"
    
    # Copie locale sur votre machine (utile pour vos tests manuels)
    echo "$UNSEAL_KEY" > .vault_unseal_key
    echo "$ROOT_TOKEN" > .vault_root_token
    
    echo "🔓 Premier déverrouillage..."
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" vault vault operator unseal "$UNSEAL_KEY" > /dev/null
    
    # --- AUTOMATISATION APPROLE VIA JQ ---
    echo "⚙️ Configuration de l'AppRole..."
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault secrets enable -path=secret kv-v2
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault kv put secret/myapp db_password="SuperPassword123"
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault auth enable approle
    
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault sh -c "echo 'path \"secret/data/myapp\" { capabilities = [\"read\"] }' > /tmp/policy.hcl"
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault policy write myapp-policy /tmp/policy.hcl
    docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault write auth/approle/role/myapp-role token_policies="myapp-policy" token_ttl=1h
    
    # Extraction propre du RoleID et SecretID avec jq
    ROLE_ID=$(docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault read -format=json auth/approle/role/myapp-role/role-id | docker exec -i vault jq -r '.data.role_id')
    SECRET_ID=$(docker exec -e VAULT_ADDR="http://127.0.0.1:8282" -e VAULT_TOKEN="$ROOT_TOKEN" vault vault write -f -format=json auth/approle/role/myapp-role/secret-id | docker exec -i vault jq -r '.data.secret_id')
    
    docker exec vault sh -c "echo '$ROLE_ID' > /vault/secrets/role.id"
    docker exec vault sh -c "echo '$SECRET_ID' > /vault/secrets/secret.id"
    echo "✅ Configuration terminée avec succès !"

elif [ "$STATUS" -eq 503 ]; then
    echo "🔓 Vault est scellé. Déverrouillage automatique..."
    if docker exec vault test -f /vault/secrets/unseal.key; then
        KEY=$(docker exec vault cat /vault/secrets/unseal.key)
        docker exec -e VAULT_ADDR="http://127.0.0.1:8282" vault vault operator unseal "$KEY" > /dev/null
        echo "✅ Vault déverrouillé !"
    else
        echo "❌ Clé introuvable. Faites un 'make clean'."
        exit 1
    fi
else
    echo "✅ Vault est déjà opérationnel."
fi
