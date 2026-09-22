FROM debian:bullseye


# Copying the .sh, then giving the right to launch it localy, and defining it as entrypoint
COPY /tools/frontend_script.sh /usr/local/bin/frontend_autoconfig.sh
RUN chmod +x /usr/local/bin/frontend_autoconfig.sh
ENTRYPOINT ["/usr/local/bin/frontend_autoconfig.sh"]