FROM hashicorp/vault:latest

USER root

RUN apk add --no-cache curl jq

RUN mkdir -p /vault/config /vault/file

COPY ./conf/config.hcl /vault/config/config.hcl
RUN chown -R vault:vault /vault
#COPY --chown=vault:vault config.hcl /vault/config/config.hcl

EXPOSE 8282

COPY ./tool/vault_script.sh /vault/config/vault_script.sh
RUN chmod +x /vault/config/vault_script.sh

USER vault

ENTRYPOINT [ "/vault/config/vault_script.sh" ]