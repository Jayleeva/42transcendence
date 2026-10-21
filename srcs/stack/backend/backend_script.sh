#!/bin/sh
set -e

VAULT_URL="${VAULT_ADDR:-http://vault:8200}"
SHARED_DIR="/app/vault_shared"

echo "⏳ [BACKEND] Attente des identifiants AppRole générés par Vault..."
until [ -f "$SHARED_DIR/backend_role_id" ] && [ -f "$SHARED_DIR/backend_secret_id" ]; do
  sleep 1
done

echo "🔑 [BACKEND] Identifiants trouvés. Authentification temporaire auprès de Vault..."
ROLE_ID=$(cat "$SHARED_DIR/backend_role_id" | tr -d '\r\n[:space:]')
SECRET_ID=$(cat "$SHARED_DIR/backend_secret_id" | tr -d '\r\n[:space:]')

AUTH_RESPONSE=$(curl -k -s \
  --request POST \
  --header "Content-Type: application/json" \
  --data "{\"backend_role_id\":\"$ROLE_ID\",\"secret_id\":\"$SECRET_ID\"}" \
  "$VAULT_URL/v1/auth/approle/login")

VAULT_TOKEN=$(echo "$AUTH_RESPONSE" | jq -r '.auth.client_token' 2>/dev/null)

if [ "$VAULT_TOKEN" = "null" ] || [ -z "$VAULT_TOKEN" ]; then
  echo "❌ [BACKEND] Échec de l'authentification AppRole."
  exit 1
fi

SECRET_RESPONSE=$(curl -k -s --header "X-Vault-Token: $VAULT_TOKEN" "$VAULT_URL/v1/secret/data/transcendence")
REAL_DB_URL=$(echo "$SECRET_RESPONSE" | jq -r '.data.data.database_url')

# --- NOUVELLE SÉCURITÉ : ATTENTE RÉSEAU DE POSTGRESQL ---
echo "⏳ [BACKEND] Attente de la disponibilité réseau de PostgreSQL (pgdb:5432)..."
until nc -z pgdb 5432; do
  sleep 1
done
echo "🔌 [BACKEND] Le port PostgreSQL 5432 répond !"
# --------------------------------------------------------

echo "🚀 [BACKEND] Application des migrations Prisma..."
DATABASE_URL="$REAL_DB_URL" npx prisma migrate deploy

echo "✅ [BACKEND] Migrations appliquées avec succès !"
exec node dist/main.js
