FROM hashicorp/vault:1.21

RUN apk add --no-cache curl jq

RUN mkdir -p /vault/config /vault/file

COPY ./stack/vault/conf/vault.hcl /vault/config/config.hcl
RUN chown -R vault:vault /vault

EXPOSE 8200

USER vault

COPY ./tool/vault_script.sh /vault/config/vault_init.sh
RUN chmod +x /vault/config/vault_init.sh
ENTRYPOINT [ "/vault/config/vault_init.sh" ]