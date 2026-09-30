FROM debian:bullseye

RUN apt-get install -y npm

#node 22.23.2
#npm 10.9.8
#prisma 7
#prisma client 7
#npm install prisma@7 --save-dev
#npm install @prisma/client@7 @prisma/adapter-pg dotenv


RUN mkdir -p /var/www/html ?

# Copying the .sh, then giving the right to launch it localy, and defining it as entrypoint
COPY /tools/backend_script.sh /usr/local/bin/backend_autoconfig.sh
RUN chmod +x /usr/local/bin/backend_autoconfig.sh
ENTRYPOINT ["/usr/local/bin/backend_autoconfig.sh"]