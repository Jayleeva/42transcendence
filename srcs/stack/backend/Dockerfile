FROM debian:bullseye


# Copying the .sh, then giving the right to launch it localy, and defining it as entrypoint
COPY /tools/backend_script.sh /usr/local/bin/backend_autoconfig.sh
RUN chmod +x /usr/local/bin/backend_autoconfig.sh
ENTRYPOINT ["/usr/local/bin/backend_autoconfig.sh"]