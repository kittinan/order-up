# OrderUp

Multi-tenant Restaurant Management System.

## Stack
- Backend: Django + django-tenants
- Frontend: Next.js
- Database: PostgreSQL
- Real-time: Redis + Django Channels

## Quick Start (Docker)

### Prerequisites
- Docker & Docker Compose installed

### Start the stack

```bash
# Start all services
make up

# Or using docker-compose directly
docker-compose up -d
```

### Access the services
- Frontend: http://localhost:3001
- Backend API: http://localhost:8001
- PostgreSQL: localhost:5435
- Redis: localhost:6380

### Common commands

```bash
# Stop all services
make down

# View logs
make logs

# Rebuild services
make build

# Open backend shell
make shell-backend

# Access database
make shell-db

# Clean everything (removes volumes too!)
make clean
```

### Development Mode
- **Frontend**: Hot-reload enabled automatically with Dockerfile.dev
- **Backend**: Volume mounted for live code changes

## Getting Started

See `ORDER_UP_PLAN.md` for the development roadmap.

## Project Structure
```
order-up/
├── backend/          # Django backend
│   └── Dockerfile
├── frontend/         # Next.js frontend
│   ├── Dockerfile       # Production build
│   └── Dockerfile.dev   # Development with hot-reload
├── backlog/          # Project backlog
└── docker-compose.yml
```
