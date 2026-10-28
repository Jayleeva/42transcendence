#!/bin/sh

# On s'assure que le script s'arrête si une commande échoue
set -e

export VAULT_ADDR="http://127.0.0.1:8200"
export VAULT_SKIP_VERIFY="true"

echo "🚀 Démarrage du serveur Vault..."
vault server -config=/vault/config/config.hcl &
VAULT_PID=$!

echo "⏳ Attente du démarrage local de Vault sur le port 8200..."
until nc -z 127.0.0.1 8200; do
    sleep 1
done

echo "🔓 Le port Vault est ouvert. Vérification de l'initialisation..."

# Fichier masqué isolé des volumes Docker de l'hôte, pour conserver vos clés d'Unseal
INIT_FILE="/vault/file/.vault_init_keys.json"

# On demande à Vault s'il est initialisé (renvoie "true" ou "false")
IS_INIT=$(vault status -format=json 2>/dev/null | jq -r '.initialized' 2>/dev/null)

if [ "$IS_INIT" != "true" ]; then
    echo "[VAULT] Première initialisation en cours..."
    vault operator init -key-shares=1 -key-threshold=1 -format=json > "$INIT_FILE"
    chmod 600 "$INIT_FILE"
    echo "🔒 Fichier des clés chiffré et masqué avec succès."
else
    echo "[VAULT] Système déjà initialisé."
fi

# ---- ÉTAPE CRUCIALE : Unseal automatique ----
if [ -f "$INIT_FILE" ]; then
    UNSEAL_KEY=$(jq -r '.unseal_keys_b64[0]' "$INIT_FILE")
    ROOT_TOKEN=$(jq -r '.root_token' "$INIT_FILE")
    
    echo "[VAULT] Ouverture (Unsealing)..."
    vault operator unseal "$UNSEAL_KEY"
    
    echo "[VAULT] Connexion (Login)..."
    vault login "$ROOT_TOKEN"
else
    echo "❌ Erreur critique : Impossible de trouver le fichier des clés d'initialisation."
    exit 1
fi

# ---- ÉTAPE REPRODUCTIBLE : INJECTION DES SECRETS & API DNS ----
echo "[VAULT] Configuration des moteurs de secrets..."

mkdir -p /vault/generated_certs
chmod 777 /vault/generated_certs

# Activation du moteur KV-v2 pour les données de l'application et du DNS
vault secrets enable -path=secret kv-v2 || true

# 1. Injection des identifiants de l'API DNS (Ex: Cloudflare) pour Let's Encrypt
echo "[VAULT] Stockage des clés API du fournisseur DNS..."
vault kv put secret/dns-provider \
    cf_token="$CLOUDFLARE_API_TOKEN" \
    cf_account_id="$CLOUDFLARE_ACCOUNT_ID"

# 2. Injection des variables d'environnement de l'application (PostgreSQL)
echo "[VAULT] Stockage des configurations applicatives..."
vault kv put secret/transcendence \
    pgsql_user="$POSTGRES_USER" \
    pgsql_password="$POSTGRES_PASSWORD" \
    pgsql_database="$POSTGRES_DB" \
    database_url="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@pgdb:5432/$POSTGRES_DB" \
    session_secret="$SESSION_SECRET"

# ---- ÉTAPE REPRODUCTIBLE : CONFIGURATION DES APPROLES ----

# Activation de la méthode d'authentification AppRole
echo "[VAULT] Configuration des AppRoles..."
vault auth enable approle || true

# 1. AppRole pour le Backend
echo "[VAULT] Configuration de l'AppRole pour le backend..."
vault policy write backend-policy - <<EOF
path "secret/data/transcendence" {
  capabilities = ["read"]
}
EOF

vault write auth/approle/role/backend-role token_policies="backend-policy" token_ttl=1h max_ttl=4h
vault read -format=json auth/approle/role/backend-role/role-id | jq -r '.data.role_id' > /vault/generated_certs/backend_role_id
vault write -f -format=json auth/approle/role/backend-role/secret-id | jq -r '.data.secret_id' > /vault/generated_certs/backend_secret_id

# 2. AppRole pour Nginx (Lecture exclusive des identifiants DNS)
echo "[VAULT] Configuration de l'AppRole pour Nginx..."
vault policy write nginx-policy - <<EOF
path "secret/data/dns-provider" {
  capabilities = ["read"]
}
EOF

vault write auth/approle/role/nginx-role token_policies="nginx-policy" token_ttl=24h max_ttl=24h
vault read -format=json auth/approle/role/nginx-role/role-id | jq -r '.data.role_id' > /vault/generated_certs/nginx_role_id
vault write -f -format=json auth/approle/role/nginx-role/secret-id | jq -r '.data.secret_id' > /vault/generated_certs/nginx_secret_id

echo "✅ Tous les secrets et AppRoles ont été initialisés avec succès !"

# Maintenir le conteneur actif
wait $VAULT_PID
