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

VAULT_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.auth.client_token // empty')

if [ -z "$VAULT_TOKEN" ] || [ "$VAULT_TOKEN" = "null" ]; then
    echo "❌ [NGINX] Échec de l'authentification Vault : $LOGIN_RESP"
    exit 1
fi

echo "📜 [NGINX] Demande dynamique du certificat TLS au moteur PKI..."
CERT_RESP=$(curl -s --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{"common_name": "localhost", "ip_sans": "127.0.0.1"}' \
    "$VAULT_ADDR/v1/pki/issue/transcendence-domain")

# Extraction des données et écriture des fichiers finaux requis par Nginx
# (On utilise -r pour extraire le texte brut sans guillemets)
echo "$CERT_RESP" | jq -r '.data.certificate' > "$SSL_DIR/transcendence.crt"
echo "$CERT_RESP" | jq -r '.data.private_key' > "$SSL_DIR/transcendence.key"

# Vérification rapide que les fichiers ont bien été écrits et ne sont pas vides
if [ ! -s "$SSL_DIR/transcendence.crt" ] || [ ! -s "$SSL_DIR/transcendence.key" ]; then
    echo "❌ [NGINX] Erreur : Les fichiers de certificats extraits sont vides."
    echo "Réponse brute de Vault : $CERT_RESP"
    exit 1
fi

echo "🚀 [NGINX] Certificats générés et installés avec succès. Démarrage du serveur..."
exec "$@"
