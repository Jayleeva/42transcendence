#!/bin/sh
set -e

VAULT_ADDR="http://vault:8200"
SHARED_DIR="/app/vault_shared"
SSL_DIR="/etc/nginx/ssl"
TMP_RESP="/tmp/vault_pki_resp.json"

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

VAULT_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.auth.client_token // empty')

if [ -z "$VAULT_TOKEN" ] || [ "$VAULT_TOKEN" = "null" ]; then
    echo "❌ [NGINX] Échec de l'authentification Vault : $LOGIN_RESP"
    exit 1
fi

echo "📜 [NGINX] Demande dynamique du certificat TLS au moteur PKI..."
# On écrit la réponse directement dans un fichier pour éviter les erreurs de parsing shell
curl -s --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{"common_name": "localhost", "ip_sans": "127.0.0.1"}' \
    "$VAULT_ADDR/v1/pki/issue/transcendence-domain" > "$TMP_RESP"

# Extraction sécurisée depuis le fichier vers vos fichiers SSL Nginx
jq -r '.data.certificate' "$TMP_RESP" > "$SSL_DIR/transcendence.crt"
jq -r '.data.private_key' "$TMP_RESP" > "$SSL_DIR/transcendence.key"

# Nettoyage du fichier temporaire
rm -f "$TMP_RESP"

# Vérification finale de la validité des fichiers générés
if [ ! -s "$SSL_DIR/transcendence.crt" ] || [ ! -s "$SSL_DIR/transcendence.key" ]; then
    echo "❌ [NGINX] Erreur : Les fichiers de certificats extraits sont vides ou invalides."
    exit 1
fi

echo "🚀 [NGINX] Certificats générés et installés avec succès. Démarrage du serveur..."
exec "$@"
