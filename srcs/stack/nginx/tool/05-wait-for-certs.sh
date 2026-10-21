#!/bin/sh
set -eu

CERT_DIR="/etc/nginx/certs"
CERT_PATH="$CERT_DIR/transcendence.crt"
KEY_PATH="$CERT_DIR/transcendence.key"
TIMEOUT=60

# Hors de la stack (test local), le volume certs_data n'est pas monté :
# le dossier n'existe pas, donc on n'attend rien et l'image génère
# elle-même son certificat auto-signé.
if [ ! -d "$CERT_DIR" ]; then
	echo "[NGINX] $CERT_DIR absent : pas d'attente de Vault"
	exit 0
fi

waited=0
while [ ! -s "$CERT_PATH" ] || [ ! -s "$KEY_PATH" ]; do
	if [ "$waited" -ge "$TIMEOUT" ]; then
		echo "[NGINX] Certificats absents après ${TIMEOUT}s, abandon" >&2
		exit 1
	fi
	echo "[NGINX] Waiting for certificate files..."
	sleep 2
	waited=$((waited + 2))
done

echo "[NGINX] Certificate files ready!"
