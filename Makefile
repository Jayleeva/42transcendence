YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

DOCKERS = nginx frontend backend pgdb vault
IMAGES = nginx frontend backend pgdb vault
VOLUMES = srcs_pgdb_data srcs_vault_data srcs_certs_data srcs_vault_logs
NETWORKS = srcs_frontend-network srcs_backend-network srcs_vault-network 

ENV = /home/$(USER)/tocopy/.env

all: copy up erase

copy:
	cp $(ENV) ./srcs/

erase:
	rm -rf ./srcs/.env

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

re: down up

.PHONY: all up down clean fclean re copy