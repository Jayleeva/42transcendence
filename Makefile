COUNTRY = CH
STATE = Vaud
LOCATION = Lausanne
ORGANIZATION = 42
GROUP = clmmm
DOMAIN_NAME = $(GROUP).42.fr
CERT = "/C=$(COUNTRY)/ST=$(STATE)/L=$(LOCATION)/O=$(ORGANIZATION)/OU=$(GROUP)/CN=$(DOMAIN_NAME)"

YML = ./srcs/docker-compose.yml
CMP = docker compose -f $(YML)

NETWORK = srcs_transcendence
IMAGES = nginx frontend backend pgdb
DOCKERS = nginx frontend backend pgdb
VOLUMES = srcs_website_data srcs_pgdb_data 

DATA_DIR = /home/cyglardo/data
WS_DATA = $(DATA_DIR)/website
DB_DATA = $(DATA_DIR)/pgdb

all: up

up:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-out ./secrets/transcendence.crt \
	-keyout ./secrets/transcendence.key \
	-subj "$(CERT)"
	mkdir -p $(WS_DATA)
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
	sudo rm -rf $(WS_DATA)
	sudo rm -rf $(DB_DATA)

re: down up

.PHONY: all up down clean fclean re