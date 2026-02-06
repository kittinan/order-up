#!/bin/bash
# Restore script for OrderUp production deployment

set -e

BACKUP_DIR="/opt/orderup/backups"
LATEST_BACKUP=$(ls -t "${BACKUP_DIR}/orderup_backup_"*"_database.sql" | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ No backup found!"
    exit 1
fi

BACKUP_NAME=$(basename "${LATEST_BACKUP}" "_database.sql")
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

echo "🔄 Restoring from backup: ${BACKUP_NAME}"

# Confirm restore
read -p "⚠️  This will restore the database and configuration. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

# Stop services
echo "🛑 Stopping services..."
docker-compose down

# Restore database
echo "💾 Restoring database..."
if [ -f "${BACKUP_PATH}_database.sql" ]; then
    docker-compose up -d postgres
    sleep 5
    docker-compose exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS orderup;"
    docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE orderup;"
    docker-compose exec -T postgres psql -U postgres orderup < "${BACKUP_PATH}_database.sql"
else
    echo "⚠️  Database backup not found: ${BACKUP_PATH}_database.sql"
fi

# Restore media files
echo "💾 Restoring media files..."
if [ -f "${BACKUP_PATH}_media.tar.gz" ]; then
    tar -xzf "${BACKUP_PATH}_media.tar.gz" -C backend/
fi

# Restore configuration
echo "💾 Restoring configuration..."
if [ -f "${BACKUP_PATH}_config.tar.gz" ]; then
    tar -xzf "${BACKUP_PATH}_config.tar.gz" -C ./
fi

# Restore git to previous state
echo "🔄 Restoring git state..."
git reset --hard HEAD~1  # Remove the last commit that caused the issue

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Health check
echo "🔍 Running health checks..."
if curl -f http://localhost:8001/health/; then
    echo "✅ Backend health check passed"
else
    echo "❌ Backend health check failed"
    exit 1
fi

echo "✅ Restore completed successfully!"
echo "🔄 System restored from backup: ${BACKUP_NAME}"