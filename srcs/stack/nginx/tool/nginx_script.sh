#!/bin/sh

CERT_PATH="/etc/nginx/certs/transcendence.crt"
KEY_PATH="/etc/nginx/certs/transcendence.key"

while [ ! -s "$CERT_PATH" ] || [ ! -s "$KEY_PATH" ]; do
    echo "[NGINX] Waiting for certificate files..."
    sleep 2
done

echo "[NGINX] Certificate files ready!"
# Lancer la commande principale de Nginx reçue via le Dockerfile (daemon off)
# Le 'exec' permet à Nginx de récupérer le PID 1 (essentiel pour Docker)
exec "$@"