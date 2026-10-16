#!/bin/bash
# unseal.sh

echo "⏳ Attente du démarrage du conteneur Vault..."
until docker exec vault vault status -format=json > /dev/null 2>&1; do
    sleep 1
done

# Récupération du statut via l'API interne du conteneur
# 0 = unsealed, 2 = sealed, 5 = non initialisé
STATUS=$(docker exec vault curl -s -o /dev/null -w "%{http_code}" http://127.0.0)

if [ "$STATUS" -eq 5 ]; then
    echo "🆕 Initialisation de Vault..."
    # On initialise avec 1 seule clé pour la simplicité du projet
    INIT_OUT=$(docker exec vault vault operator init -key-shares=1 -key-threshold=1)
    
    # Extraction de la clé et du token root sans jq
    UNSEAL_KEY=$(echo "$INIT_OUT" | grep "Unseal Key 1:" | awk '{print $4}')
    ROOT_TOKEN=$(echo "$INIT_OUT" | grep "Initial Root Token:" | awk '{print $4}')
    
    # Stockage dans le conteneur (via le volume partagé) pour les prochains redémarrages
    docker exec vault sh -c "echo '$UNSEAL_KEY' > /vault/secrets/unseal.key"
    docker exec vault sh -c "echo '$ROOT_TOKEN' > /vault/secrets/root.token"
    
    # Optionnel : copie locale sur votre machine hôte pour vos tests
    echo "$UNSEAL_KEY" > .vault_unseal_key
    echo "$ROOT_TOKEN" > .vault_root_token
    
    echo "🔓 Premier déverrouillage..."
    docker exec vault vault operator unseal "$UNSEAL_KEY" > /dev/null
    echo "✅ Vault est initialisé et prêt !"

elif [ "$STATUS" -eq 2 ]; then
    echo "🔓 Vault est scellé. Récupération de la clé..."
    # Vérification si le fichier existe dans le volume de secrets
    if docker exec vault test -f /vault/secrets/unseal.key; then
        KEY=$(docker exec vault cat /vault/secrets/unseal.key)
        docker exec vault vault operator unseal "$KEY" > /dev/null
        echo "✅ Vault déverrouillé avec succès !"
    else
        echo "❌ Erreur : Clé introuvable dans le volume. Faites un 'make clean' et relancez."
        exit 1
    fi
else
    echo "✅ Vault est déjà déverrouillé et opérationnel."
fi