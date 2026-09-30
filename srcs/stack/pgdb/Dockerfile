FROM debian:bullseye

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y postgresql

COPY conf/pgdb.conf	/etc/postgresql/postgresql.conf 

# où copier le script?
COPY /tools/pgdb_script.sh /usr/local/bin/pgdb_script.sh
RUN chmod +x /usr/local/bin/pgdb_script.sh
CMD [ "./usr/local/bin/pgdb_script.sh" ]