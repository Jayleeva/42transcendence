YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

NETWORK = srcs_transcendence
IMAGES = nginx frontend backend pgdb
DOCKERS = nginx frontend backend pgdb
VOLUMES = srcs_pgdb_data 

SECRETS_DIR = /home/ubuntu/tocopy/secrets
ENV = /home/ubuntu/tocopy/.env
DATA_DIR = /home/ubuntu/data
DB_DATA = $(DATA_DIR)/pgdb

all: up

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
	docker network rm $(NETWORK) 2>/dev/null

fclean: clean
	rm -rf $(DB_DATA)
	rm -rf .env
	rm -rf secrets/

re: down up

.PHONY: all up down clean fclean re