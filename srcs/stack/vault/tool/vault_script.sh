#!/bin/bash

VAULT_INIT=$(docker exec vault vault operator init -format=json)

ROOT_TOKEN=$(echo $VAULT_INIT | jq -r '.root_token')
UNSEAL_KEY=$(echo $VAULT_INIT | jq -r '.unseal_keys_b64[0]')

#PGSQL_USER=$(grep "^POSTGRES_USER" /run/secrets/WP_credentials | sed 's/POSTGRES_USER=//')
#PGSQL_PASSWORD=$(grep "^POSTGRES_PASSWORD" /run/secrets/WP_credentials | sed 's/POSTGRES_PASSWORD=//')

docker exec vault vault operator unseal $UNSEAL_KEY

docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault login $ROOT_TOKEN

docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault secrets enable -path=secret kv-v2

docker exec -e VAULT_TOKEN="$ROOT_TOKEN" vault vault kv put secret/transcendence \
	pgsql_user="$POSTGRES_USER" \
	pgsql_password="$POSTGRES_PASSWORD" \

