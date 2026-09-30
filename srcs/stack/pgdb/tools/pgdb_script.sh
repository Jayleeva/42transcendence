#!/bin/sh

sudo systemctl start postgresql
sudo systemctl status postgresql

mkdir -p /var/lib/postgresql/data
chown -R postgres:postgres /var/lib/postgresql/data

if [ ! -d "/var/lib/postgresql/postgresql" ]; then
    echo "==== [PGDB] Initializing tables ===="
    su-exec postgres initdb -D /var/lib/postgresql/data
fi
echo "==== [PGDB] Data base installed. ===="

echo "==== [PGDB] Readying configuration file ===="
PGSQL_USER=$(grep "^PGSQL_USER" /run/secrets/DB_credentials | sed 's/PGSQL_USER=//')
PGSQL_PASSWORD=$(grep "^PGSQL_PASSWORD" /run/secrets/DB_credentials | sed 's/PGSQL_PASSWORD=//')
PGSQL_ROOT_PASSWORD=$(grep "^PGSQL_ROOT_PASSWORD" /run/secrets/DB_credentials | sed 's/PGSQL_ROOT_PASSWORD=//')
PGSQL_DATABASE=$(grep "^PGDB" /.env | sed 's/PGDB=//')
echo "==== [PGDB] Configuration file ready ===="


#docker run \
#	-e POSTGRES_PASSWORD=$PGSQL_PASSWORD \
#	-e POSTGRES_USER=$PGSQL_USER \
#	-e POSTGRES_DB=$PGSQL_DATABASE \
#	(-p 5432:5432 \
#	-v postgres-data:/var/lib/postgresql/data \
#	-d postgres)