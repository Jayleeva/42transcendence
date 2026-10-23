YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

DOCKERS = nginx frontend backend pgdb vault
IMAGES = nginx frontend backend pgdb vault
VOLUMES = srcs_pgdb_data srcs_vault_data srcs_certs_data srcs_vault_logs
# srcs_modsec_logs volontairement exclu : les journaux du WAF doivent survivre aux reconstructions
NETWORKS = srcs_frontend-network srcs_backend-network srcs_vault-network 
DOMAIN_NAME = clmmm.42.fr

ENV_SRC = /home/$(USER)/tocopy/.env
ENV_DEST = ./srcs/

all: up

up: 
	cp $(ENV_SRC) $(ENV_DEST)
#	echo "DOMAIN_NAME=$(DOMAIN_NAME)" > $(ENV_DEST).env
#	grep "^DOMAIN_NAME" $(ENV_DEST).env | sed '$(DOMAIN_NAME)'
	$(CMP) up -d --build
	@if ! grep -q "$(DOMAIN_NAME)" /etc/hosts; then \
		echo "127.0.0.1 $(DOMAIN_NAME)" | sudo tee -a /etc/hosts > /dev/null; \
	fi

down:
	$(CMP) down

clean:
	docker stop $(DOCKERS)
	docker rm $(DOCKERS)
	docker image rmi -f $(IMAGES)
	docker volume rm $(VOLUMES)
	docker network rm $(NETWORKS) 2>/dev/null
	rm -f $(ENV_DEST).env

fclean: clean

re: down up

.PHONY: all up down clean fclean re