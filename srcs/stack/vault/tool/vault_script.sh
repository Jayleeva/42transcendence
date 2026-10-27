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
INIT_FILE="/vault/file/.vault_init_keys.json"

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
#jq -r '.data.certificate' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.crt
#jq -r '.data.private_key' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.key

TRANSCENDENCE_CERT=$(jq -r '.data.certificate' "/tmp/nginx_certs.json")
TRANSCENDENCE_KEY=$(jq -r '.data.private_key' "/tmp/nginx_certs.json")

echo "✅ Certificats générés avec succès !"
rm -f /tmp/root_ca.json /tmp/nginx_certs.json

vault secrets enable -path=secret kv-v2 || true
vault kv put secret/transcendence \
    pgsql_user="$POSTGRES_USER" \
    pgsql_password="$POSTGRES_PASSWORD" \
    pgsql_database="$POSTGRES_DB" \
    database_url="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@pgdb:5432/$POSTGRES_DB" \
    transcendence_cert="$TRANSCENDENCE_CERT" \
    transcendence_key="$TRANSCENDENCE_KEY" \
    session_secret="$SESSION_SECRET"

echo "[VAULT] Configuration de l'AppRole pour le backend..."
vault auth enable approle || true

vault policy write backend-policy - <<EOF
path "secret/data/transcendence" {
  capabilities = ["read"]
}
EOF

vault write auth/approle/role/backend-role token_policies="backend-policy" token_ttl=1h max_ttl=4h

vault read -format=json auth/approle/role/backend-role/role-id | jq -r '.data.role_id' > /vault/generated_certs/backend_role_id
vault write -f -format=json auth/approle/role/backend-role/secret-id | jq -r '.data.secret_id' > /vault/generated_certs/backend_secret_id

echo "✅ Configuration AppRole pour backend terminée !"


# ---- ÉTAPE REPRODUCTIBLE : Configuration de l'AppRole pour Nginx ----
echo "[VAULT] Configuration de l'AppRole pour Nginx..."

# 1. Création de la politique stricte pour permettre à Nginx de générer un certificat
vault policy write nginx-policy - <<EOF
path "pki/issue/transcendence-domain" {
  capabilities = ["update"]
}
EOF

# 2. Création du rôle AppRole pour Nginx (Jeton valide 24h)
vault write auth/approle/role/nginx-role \
    token_policies="nginx-policy" \
    token_ttl=24h \
    token_max_ttl=24h

# 3. Export des identifiants dans le volume partagé
# Note : On réutilise le dossier /vault/generated_certs déjà créé dans votre script
vault read -format=json auth/approle/role/nginx-role/role-id | jq -r '.data.role_id' > /vault/generated_certs/nginx_role_id
vault write -f -format=json auth/approle/role/nginx-role/secret-id | jq -r '.data.secret_id' > /vault/generated_certs/nginx_secret_id

echo "✅ Configuration AppRole pour Nginx terminée !"


# Maintenir le conteneur actif
wait $VAULT_PID
