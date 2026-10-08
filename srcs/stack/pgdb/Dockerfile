FROM --platform=linux/amd64 postgres:16-alpine

COPY conf/pgdb.conf	/etc/postgresql/postgresql.conf 

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]