YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

NETWORKS = srcs_frontend-network srcs_backend-network srcs_vault-network 
IMAGES = nginx frontend backend pgdb vault
DOCKERS = nginx frontend backend pgdb vault
VOLUMES = srcs_pgdb_data srcs_vault_backend_token #srcs_vault_data srcs_certs_data

ENV = /home/ubuntu/tocopy/.env
DATA_DIR = /home/ubuntu/data
DB_DATA = $(DATA_DIR)/pgdb

all: copy up

copy:
	cp $(ENV) ./srcs/

up:
	mkdir -p $(DB_DATA)
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
	rm -rf $(DB_DATA)
	rm -rf .env

re: down up

.PHONY: all up down clean fclean re copy