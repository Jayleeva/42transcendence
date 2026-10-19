#!/bin/sh
# unseal.sh

vault server -config=/vault/config/config.hcl&

# Sauvegarder le PID du serveur pour plus tard
VAULT_PID=$!

echo "⏳ Attente du démarrage du conteneur Vault..."
until docker exec vault vault status -format=json > /dev/null 2>&1; do
    sleep 1
done

# Récupération du statut via l'API interne du conteneur
# 0 = unsealed, 2 = sealed, 5 = non initialisé
STATUS=$(docker exec vault curl -s -o /dev/null -w "%{http_code}" http://127.0.0)

if [ "$STATUS" -eq 5 ]; then
    echo "[VAULT] Initializing..."
	vault operator init

	echo "[VAULT] Unsealing: waiting for key..."
	vault operator unseal #$UNSEAL_KEY
	echo "[VAULT] Loging: waiting for root token..."
	vault login #$ROOT_TOKEN

	vault secrets enable -path=secret kv-v2
	vault kv put secret/ \
		pgsql_user="$POSTGRES_USER" \
		pgsql_password="$POSTGRES_PASSWORD" \
		pgsql_database="$POSTGRES_DB"

	vault secrets enable pki
	
	vault secrets tune -max-lease-ttl=8760h pki

	vault write -format=json pki/root/generate/internal \
		common_name="transcendence.42" \
		ttl=8760h > /tmp/root_ca.json

	vault write pki/roles/transcendence-domain \
		allowed_domains="localhost,127.0.0.1" \
		allow_subdomains=true \
		max_ttl=720h

	vault write -format=json pki/issue/transcendence-domain \
		common_name="localhost" \
		ip_sans="127.0.0.1" > /tmp/nginx_certs.json

	jq -r '.data.certificate' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.crt
	jq -r '.data.private_key' /tmp/nginx_certs.json > /vault/generated_certs/transcendence.key

fi

wait $VAULT_PID
