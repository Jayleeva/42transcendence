FROM debian:bullseye

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y postgresql

# où copier le fichier de conf?
COPY conf/pgdb.conf	/?

# où copier le script?
COPY /tools/pgdb_script.sh /?
RUN chmod +x /?
CMD [ "./?" ]