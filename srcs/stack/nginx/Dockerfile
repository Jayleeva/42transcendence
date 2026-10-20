FROM nginx:stable

RUN apt-get update && apt-get install -y openssl

RUN mkdir -p \
	/var/run/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf

#RUN	openssl req -x509 -nodes \
#	-out ./secrets/transcendence.crt \
#	-keyout ./secrets/transcendence.key \
#	-subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=clmmm/CN=$(DOMAIN_NAME)"

COPY ./tool/nginx_script.sh /usr/local/bin/nginx_script.sh
RUN chmod +x /usr/local/bin/nginx_script.sh
ENTRYPOINT [ "/usr/local/bin/nginx_script.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]