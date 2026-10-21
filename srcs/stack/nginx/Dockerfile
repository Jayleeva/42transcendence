FROM nginx:stable

RUN apt-get update && apt-get install -y openssl curl jq

COPY conf/nginx.conf /etc/nginx/nginx.conf

COPY ./tool/nginx_script.sh /usr/local/bin/nginx_script.sh
RUN chmod +x /usr/local/bin/nginx_script.sh
ENTRYPOINT [ "/usr/local/bin/nginx_script.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]