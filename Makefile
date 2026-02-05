.PHONY: help up down restart logs build clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: down up ## Restart all services

logs: ## Show logs from all services
	docker-compose logs -f

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

logs-backend: ## Show backend logs
	docker-compose logs -f backend

logs-db: ## Show database logs
	docker-compose logs -f db

build: ## Rebuild all services
	docker-compose build

build-frontend: ## Rebuild frontend
	docker-compose build frontend

build-backend: ## Rebuild backend
	docker-compose build backend

clean: ## Stop and remove all containers, networks, and volumes
	docker-compose down -v

ps: ## Show running containers
	docker-compose ps

shell-backend: ## Open shell in backend container
	docker-compose exec backend bash

shell-db: ## Open psql in database container
	docker-compose exec db psql -U postgres -d orderup
