YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

NETWORKS = srcs_frontend-network srcs_backend-network srcs_vault-network 
IMAGES = nginx frontend backend pgdb vault
DOCKERS = nginx frontend backend pgdb vault
VOLUMES = srcs_pgdb_data srcs_vault_data srcs_certs_data srcs_vault_logs

ENV = /home/$(USER)/tocopy/.env
VAULT_INIT = srcs/vault_init.sh

all: copy up

copy:
	cp $(ENV) ./srcs/

up:
	$(CMP) up -d --build
	@if ! grep -q "$(DOMAIN_NAME)" /etc/hosts; then \
		echo "127.0.0.1 $(DOMAIN_NAME)" | sudo tee -a /etc/hosts; \
	fi

down:
	$(CMP) down

clean:
	docker stop $(DOCKERS)
	docker rm $(DOCKERS)
	docker image rmi -f $(IMAGES)
	docker volume rm $(VOLUMES)
	docker network rm $(NETWORKS) 2>/dev/null

fclean: clean
	rm -rf .env

re: down up

.PHONY: all up down clean fclean re copy