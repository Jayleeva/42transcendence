#!/bin/sh
set -e

VAULT_ADDR="http://vault:8200"
SHARED_DIR="/app/vault_shared"
SSL_DIR="/etc/nginx/ssl"
WEBROOT="/var/www/html"
DOMAIN="lauzanimo.ch"  # Remplacez par votre futur vrai domaine acheté

mkdir -p "$SSL_DIR"
mkdir -p "$WEBROOT"

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

echo "📜 [NGINX] Récupération des clés API DNS depuis le moteur KV..."
DNS_RESP=$(curl -s --header "X-Vault-Token: $VAULT_TOKEN" "$VAULT_ADDR/v1/secret/data/dns-provider")

# Extraction des variables d'environnement requises par acme.sh pour Cloudflare
export CF_Token=$(echo "$DNS_RESP" | jq -r '.data.data.cf_token // empty')
export CF_Account_ID=$(echo "$DNS_RESP" | jq -r '.data.data.cf_account_id // empty')

if [ -z "$CF_Token" ] || [ "$CF_Token" = "null" ]; then
    echo "❌ [NGINX] Erreur : Impossible de récupérer les jetons d'API Cloudflare depuis Vault."
    exit 1
fi

# 1. Installation de acme.sh si non présent
if [ ! -d "$HOME/.acme.sh" ]; then
    echo "📦 [NGINX] Installation locale de acme.sh..."
    curl -sLS https://acme.sh | sh -s email="admin@$DOMAIN"
fi
export LE_WORKING_DIR="$HOME/.acme.sh"

# 2. Demande ou renouvellement du certificat public officiel via Challenge DNS
echo "🌍 [NGINX] Vérification/Demande du certificat Let's Encrypt pour $DOMAIN (Challenge DNS)..."
"$HOME/.acme.sh/acme.sh" --issue -d "$DOMAIN" -d "*.$DOMAIN" \
    --dns dns_cf \
    --server letsencrypt

# 3. Déploiement et installation des certificats pour Nginx
echo "🚚 [NGINX] Déploiement des certificats publics dans $SSL_DIR..."
"$HOME/.acme.sh/acme.sh" --install-cert -d "$DOMAIN" \
    --key-file       "$SSL_DIR/transcendence.key" \
    --fullchain-file "$SSL_DIR/transcendence.crt" \
    --reloadcmd     "nginx -s reload 2>/dev/null || true"

# Vérification finale de la validité des fichiers
if [ ! -s "$SSL_DIR/transcendence.crt" ] || [ ! -s "$SSL_DIR/transcendence.key" ]; then
    echo "❌ [NGINX] Erreur : Les certificats générés par acme.sh sont introuvables ou invalides."
    exit 1
fi

# 4. Lancement en arrière-plan d'une boucle légère de renouvellement automatique
(
    while true; do
        sleep 43200 # Vérification toutes les 12 heures
        echo "🔍 [ACME] Lancement de la vérification de routine des certificats..."
        "$HOME/.acme.sh/acme.sh" --cron --home "$HOME/.acme.sh" || true
    done
) &

echo "🚀 [NGINX] Certificats officiels installés. Passage de relais au binaire Nginx..."
exec "$@"
