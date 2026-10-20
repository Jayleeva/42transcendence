#!/bin/sh

export VAULT_ADDR="http://127.0.0.1:8200"
export VAULT_SKIP_VERIFY="true"


echo "🚀 Démarrage du serveur Vault..."
vault server -config=/vault/config/config.hcl &
VAULT_PID=$!

echo "⏳ Attente du démarrage local de Vault sur le port 8200..."
# nc -z vérifie si le port répond. Tant que c'est fermé, on attend.
until nc -z 127.0.0.1 8200; do
    sleep 1
done

echo "🔓 Le port Vault est ouvert. Vérification de l'initialisation..."

# Fichier masqué isolé des volumes Docker de l'hôte, pour conserver vos clés d'Unseal
INIT_FILE="/root/.vault_init_keys.json"

# On demande à Vault s'il est initialisé (renvoie "true" ou "false")
IS_INIT=$(vault status -format=json 2>/dev/null | jq -r '.initialized' 2>/dev/null)

# Si la commande échoue ou dit "false", on procède à l'initialisation
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

# ---- ÉTAPE REPRODUCTIBLE : INJECTION DES SECRETS ----
echo "[VAULT] Configuration des moteurs de secrets..."

mkdir -p /vault/generated_certs
chmod 777 /vault/generated_certs

vault secrets enable -path=secret kv-v2 || true
vault kv put secret/transcendence \
    pgsql_user="$POSTGRES_USER" \
    pgsql_password="$POSTGRES_PASSWORD" \
    pgsql_database="$POSTGRES_DB" \
    database_url="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@pgdb:5432/$POSTGRES_DB"

# ---- ÉTAPE REPRODUCTIBLE : Génération des certificats pour Nginx ----
vault secrets enable pki || true
vault secrets tune -max-lease-ttl=8760h pki || true

vault write -format=json pki/root/generate/internal \
    common_name="transcendence.42" \
    ttl=8760h > /tmp/root_ca.json

vault write pki/roles/transcendence-domain \
    allowed_domains="localhost,127.0.0.1" \
    allow_subdomains=true \
    max_ttl=720h

echo "[VAULT] Génération du certificat pour Nginx..."
vault write -format=json pki/issue/transcendence-domain \
    common_name="localhost" \
    ip_sans="127.0.0.1" > /tmp/nginx_certs.json

# Écriture dans le volume de certificats partagé avec Nginx
jq -r '.data.certificate' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.crt
jq -r '.data.private_key' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.key

echo "✅ Certificats générés avec succès !"
rm -f /tmp/root_ca.json /tmp/nginx_certs.json


echo "[VAULT] Configuration de l'AppRole pour le backend..."
vault auth enable approle || true

vault policy write backend-policy - <<EOF
path "secret/data/transcendence" {
  capabilities = ["read"]
}
EOF

vault write auth/approle/role/backend-role token_policies="backend-policy" token_ttl=1h max_ttl=4h

vault read -format=json auth/approle/role/backend-role/role-id | jq -r '.data.role_id' > /vault/generated_certs/role_id
vault write -f -format=json auth/approle/role/backend-role/secret-id | jq -r '.data.secret_id' > /vault/generated_certs/secret_id

echo "✅ Configuration AppRole terminée !"

# Maintenir le conteneur actif
wait $VAULT_PID
