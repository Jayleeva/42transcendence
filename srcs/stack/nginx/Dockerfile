FROM owasp/modsecurity-crs:nginx

USER root
RUN apt-get update && apt-get install -y --no-install-recommends jq \
 && rm -rf /var/lib/apt/lists/* \
 && chown nginx:nginx /etc/nginx/ssl \
 && chmod 700 /etc/nginx/ssl
USER nginx

COPY conf/default.conf.template /etc/nginx/templates/conf.d/default.conf.template
COPY --chmod=755 tool/nginx_script.sh /docker-entrypoint.d/05-vault-certs.sh
