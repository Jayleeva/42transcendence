FROM debian:bookworm

RUN apt update && apt-get install -y \
	nginx \
 	openssl

RUN mkdir -p \
	/var/run/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf

#-days 365 -newkey rsa:2048 apres nodes pour preciser la duree (quels parametres?)

# faire un fichier tmp pour enregistrer temporairement le certificat? puis faire l'appel API put:
# 	vault kv put secrets/transcendence.crt cert=
#	vault kv put secrets/transcendence.key key=
# ou en dynamique : ?

# ou utiliser 'transit' pour chiffrer et dechiffrer des donnees a la volee sans avoir a les stocker?
# --> non, besoin d'y reacceder donc doit etre stocke
RUN	openssl req -x509 -nodes \
	-out ./secrets/transcendence.crt \
	-keyout ./secrets/transcendence.key \
	-subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=clmmm/CN=$(DOMAIN_NAME)"


RUN chmod 755 /var/www/html
RUN chown -R www-data:www-data /var/www/html

RUN rm -rf /var/www/html/index.nginx-debian.html /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]