FROM debian:bookworm

RUN apt update && apt-get install -y \
	nginx \
 	openssl

RUN mkdir -p \
	/var/run/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf

#RUN	openssl req -x509 -nodes \
#	-out ./secrets/transcendence.crt \
#	-keyout ./secrets/transcendence.key \
#	-subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=clmmm/CN=$(DOMAIN_NAME)"

COPY ./tool/nginx_script.sh /usr/local/bin/nginx_entrypoint.sh
RUN chmod +x /usr/local/bin/nginx_entrypoint.sh
ENTRYPOINT [ "/usr/local/bin/nginx_entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]