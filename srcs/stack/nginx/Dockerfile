FROM debian:bullseye

RUN apt update && apt-get install -y \
	nginx \
	vim \
	curl \
 	openssl

RUN mkdir -p \
	/etc/nginx/ssl \
	/var/run/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf

RUN chmod 755 /var/www/html
RUN chown -R www-data:www-data /var/www/html

RUN rm -rf /var/www/html/index.nginx-debian.html /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]