#!/bin/sh
set -e

#PGSQL_USER=$(cat /run/secrets/pgsql_user)
#PGSQL_PASSWORD=$(cat /run/secrets/pgsql_password)

#postgresql://[utilisateur]:[mot_de_passe]@[hôte]:[port]/[nom_de_la_base]

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${PGSQL_HOST}:${PGSQL_PORT}/${POSTGRES_NAME}?schema=public"

npx prisma migrate deploy

exec node dist/main.js
