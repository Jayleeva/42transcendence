#!/bin/sh
set -e

echo "[Vault-Init] Attente de la disponibilité de Vault..."
# Attend que Vault réponde (HTTP 200 ou 400 s'il est initialisé)
until curl -s -o /dev/null -w "%{http_code}" "${VAULT_ADDR}/v1/sys/health" | grep -qE "200|400|429"; do
    sleep 2
done

