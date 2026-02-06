#!/bin/bash
# Backup script for OrderUp production deployment

set -e

BACKUP_DIR="/opt/orderup/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="orderup_backup_${TIMESTAMP}"

echo "📦 Creating backup: ${BACKUP_NAME}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Database backup
echo "💾 Backing up database..."
docker-compose exec -T postgres pg_dump -U postgres orderup > "${BACKUP_DIR}/${BACKUP_NAME}_database.sql"

# Media files backup (if any)
echo "💾 Backing up media files..."
if [ -d "backend/media" ]; then
    tar -czf "${BACKUP_DIR}/${BACKUP_NAME}_media.tar.gz" -C backend media/
fi

# Config files backup
echo "💾 Backing up configuration files..."
tar -czf "${BACKUP_DIR}/${BACKUP_NAME}_config.tar.gz" \
    docker-compose.yml \
    .env \
    nginx.conf \
    2>/dev/null || true

# Keep only last 7 backups
echo "🧹 Cleaning old backups (keeping last 7)..."
cd "${BACKUP_DIR}"
ls -t orderup_backup_* | tail -n +8 | xargs rm -f --

echo "✅ Backup completed: ${BACKUP_NAME}"
echo "📂 Backup location: ${BACKUP_DIR}"

# List current backups
echo ""
echo "📋 Current backups:"
ls -lah "${BACKUP_DIR}/orderup_backup_${TIMESTAMP}*"