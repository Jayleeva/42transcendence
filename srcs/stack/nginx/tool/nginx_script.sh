#!/bin/sh
set -e

VAULT_ADDR="http://vault:8200"
SHARED_DIR="/app/vault_shared"
SSL_DIR="/etc/nginx/ssl"

mkdir -p "$SSL_DIR"

echo "⏳ [NGINX] Attente des identifiants AppRole générés par Vault..."
while [ ! -f "$SHARED_DIR/nginx_role_id" ] || [ ! -f "$SHARED_DIR/nginx_secret_id" ]; do
    sleep 1
done

ROLE_ID=$(cat "$SHARED_DIR/nginx_role_id")
SECRET_ID=$(cat "$SHARED_DIR/nginx_secret_id")

echo "🔑 [NGINX] Authentification auprès de Vault via AppRole..."
LOGIN_RESP=$(curl -s --request POST \
    --data "{\"role_id\":\"$ROLE_ID\",\"secret_id\":\"$SECRET_ID\"}" \
    "$VAULT_ADDR/v1/auth/approle/login")

# DÉBOGAGE : Si la réponse login n'est pas du JSON valide, on l'affiche
if ! echo "$LOGIN_RESP" | jq . >/dev/null 2>&1; then
    echo "❌ [NGINX] Réponse d'authentification invalide (Non-JSON) de Vault :"
    echo "$LOGIN_RESP"
    exit 1
fi

VAULT_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.auth.client_token // empty')

if [ -z "$VAULT_TOKEN" ] || [ "$VAULT_TOKEN" = "null" ]; then
    echo "❌ [NGINX] Échec de l'authentification Vault : $(echo "$LOGIN_RESP" | jq -c '.errors')"
    exit 1
fi

echo "📜 [NGINX] Demande dynamique du certificat TLS au moteur PKI..."
CERT_RESP=$(curl -s --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{"common_name": "localhost", "ip_sans": "127.0.0.1"}' \
    "$VAULT_ADDR/v1/pki/issue/transcendence-domain")

# DÉBOGAGE : Si la réponse PKI n'est pas du JSON valide, on l'affiche avant que jq ne crashe
if ! echo "$CERT_RESP" | jq . >/dev/null 2>&1; then
    echo "❌ [NGINX] Réponse PKI invalide (Non-JSON) de Vault :"
    echo "$CERT_RESP"
    exit 1
fi

# Si c'est du JSON mais qu'il y a une erreur renvoyée par Vault
if echo "$CERT_RESP" | jq -e '.errors' >/dev/null 2>&1; then
    echo "❌ [NGINX] Vault a retourné une erreur PKI : $(echo "$CERT_RESP" | jq -c '.errors')"
    exit 1
fi

# Extraction des données et écriture des fichiers finaux requis par Nginx
echo "$CERT_RESP" | jq -r '.data.certificate' > "$SSL_DIR/transcendence.crt"
echo "$CERT_RESP" | jq -r '.data.private_key' > "$SSL_DIR/transcendence.key"

echo "🚀 [NGINX] Certificats générés et installés avec succès. Démarrage du serveur..."
exec "$@"
