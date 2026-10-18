#!/bin/sh
set -e

PGSQL_USER=$(cat /run/secrets/pgsql_user)
PGSQL_PASSWORD=$(cat /run/secrets/pgsql_password)

export DATABASE_URL="postgresql://${PGSQL_USER}:${PGSQL_PASSWORD}@${PGSQL_HOST}:${PGSQL_PORT}/${PGSQL_DATABASE}?schema=public"

npx prisma migrate deploy

exec node dist/main.js
