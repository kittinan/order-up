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

## Development Setup

### Pre-commit Hooks (Recommended)

Set up pre-commit hooks to ensure code quality before committing:

```bash
# Install and set up pre-commit hooks
./scripts/setup-pre-commit.sh
```

This will install and configure the following hooks:
- **Python**: Black (formatting), flake8 (linting), isort (import sorting)
- **JavaScript/TypeScript**: ESLint, Prettier
- **Tests**: pytest, npm test
- **File checks**: Trailing whitespace, YAML/JSON validation

### Manual Pre-commit Usage

```bash
# Run all hooks on all files
pre-commit run --all-files

# Run a specific hook
pre-commit run black

# Skip hooks (not recommended)
git commit --no-verify
```

## CI/CD Pipeline

### Overview

OrderUp uses GitHub Actions for continuous integration and deployment:

- **CI Pipeline** (`.github/workflows/ci.yml`): Runs on every push to `main` or `develop` branches
- **CD Pipeline** (`.github/workflows/deploy.yml`): Handles deployments to staging and production

### CI Pipeline Features

- **Backend Testing**: 
  - Python linting (black, flake8)
  - pytest with PostgreSQL test database
  - Django migrations
  
- **Frontend Testing**:
  - ESLint for JavaScript/TypeScript
  - TypeScript compilation check
  - Next.js build verification
  
- **Docker Build & Push**:
  - Multi-architecture builds
  - Push to Docker registry (GitHub Packages or Docker Hub)
  - Image tagging with git refs

### CD Pipeline Features

- **Staging Deployment** (develop branch):
  - Automatic deployment to staging environment
  - Health checks
  - Slack notifications
  
- **Production Deployment** (main branch):
  - Zero-downtime deployment with blue-green strategy
  - Pre-deployment backups
  - Database migrations
  - Comprehensive health checks
  - Automatic rollback on failure
  - Slack notifications

### Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

#### Docker Registry
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password or access token

#### Staging Environment
- `STAGING_SSH_KEY`: SSH private key for staging server
- `STAGING_HOST`: Staging server hostname/IP
- `STAGING_USER`: SSH username for staging server

#### Production Environment
- `PRODUCTION_SSH_KEY`: SSH private key for production server
- `PRODUCTION_HOST`: Production server hostname/IP
- `PRODUCTION_USER`: SSH username for production server

#### Monitoring
- `SLACK_WEBHOOK`: Incoming webhook URL for deployment notifications

### Environment Management

#### Staging Environment
- Deployed from `develop` branch
- URL: `https://staging.orderup.example.com`
- Database: Separate staging database

#### Production Environment
- Deployed from `main` branch
- URL: `https://app.orderup.example.com`
- Database: Production database with backups

### Deployment Process

1. **Development** → Push to `develop` branch
   - CI pipeline runs
   - Auto-deploys to staging

2. **Production** → Create PR from `develop` to `main`
   - CI pipeline runs
   - Manual review and merge
   - Auto-deploys to production

3. **Rollback** → If deployment fails, automatic rollback to previous version

### Monitoring & Health Checks

- **Backend Health**: `GET /health/` endpoint
- **Frontend Health**: HTTP 200 response from root path
- **Database**: PostgreSQL connection test
- **Services**: Docker container status checks

### Getting Started

See `ORDER_UP_PLAN.md` for the development roadmap.

## Project Structure
```
order-up/
├── .github/workflows/     # CI/CD pipelines
│   ├── ci.yml            # Continuous Integration
│   └── deploy.yml        # Continuous Deployment
├── backend/             # Django backend
│   └── Dockerfile
├── frontend/            # Next.js frontend
│   ├── Dockerfile        # Production build
│   └── Dockerfile.dev    # Development with hot-reload
├── scripts/             # Utility scripts
│   └── setup-pre-commit.sh
├── backlog/             # Project backlog
├── .pre-commit-config.yaml
└── docker-compose.yml
```
