#!/bin/sh

sudo systemctl start postgresql
sudo systemctl status postgresql

echo "==== [PGDB] Readying configuration file ===="
PGSQL_USER=$(grep "^PGSQL_USER" /run/secrets/DB_credentials | sed 's/PGSQL_USER=//')
PGSQL_PASSWORD=$(grep "^PGSQL_PASSWORD" /run/secrets/DB_credentials | sed 's/PGSQL_PASSWORD=//')
PGSQL_ROOT_PASSWORD=$(grep "^PGSQL_ROOT_PASSWORD" /run/secrets/DB_credentials | sed 's/PGSQL_ROOT_PASSWORD=//')

docker run \
	-e POSTGRES_PASSWORD=mypassword \
	-e POSTGRES_USER=myuser \
	-e POSTGRES_DB=mydatabase \
	(-p 5432:5432 \
	-v postgres-data:/var/lib/postgresql/data \
	-d postgres)