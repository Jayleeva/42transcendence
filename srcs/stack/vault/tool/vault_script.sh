#!/bin/bash

vault server -config=/vault/config/config.hcl & VAULT_PID=$!

export VAULT_ADDR="http://127.0.0.1:8282"

echo "Waiting for Vault to start..."
until curl -s "$VAULT_ADDR/v1/sys/health" > /dev/null; do
    sleep 1
done

STATUS=$(curl -s "$VAULT_ADDR/v1/sys/init" | jq -r '.initialized')

if [ $STATUS = "false" ]; then
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