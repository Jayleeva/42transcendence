FROM owasp/modsecurity-crs:nginx

USER root
RUN apt-get update && apt-get install -y --no-install-recommends jq \
 && rm -rf /var/lib/apt/lists/*
USER nginx

COPY conf/default.conf.template /etc/nginx/templates/conf.d/default.conf.template
COPY --chmod=755 tool/05-wait-for-certs.sh /docker-entrypoint.d/05-wait-for-certs.sh
