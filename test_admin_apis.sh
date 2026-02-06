#!/bin/bash

# Admin API Test Script for OrderUp
# This script tests the admin dashboard APIs

BASE_URL="http://localhost:8000"
TOKEN=""  # Add your admin JWT token here

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
        echo "Response: $3"
    fi
}

echo "Testing OrderUp Admin APIs"
echo "=========================="
echo ""

# Test 1: System Stats
echo -e "${YELLOW}Test 1: GET /api/admin/stats/${NC}"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "$BASE_URL/api/admin/stats/")

http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
body=$(echo "$response" | sed -e 's/HTTP_STATUS:[0-9]*$//')

print_result $(test "$http_code" = "200") "System Stats API" "$body"
echo ""

# Test 2: Tenants List (page 1, 5 items)
echo -e "${YELLOW}Test 2: GET /api/admin/tenants/?page=1&page_size=5${NC}"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "$BASE_URL/api/admin/tenants/?page=1&page_size=5")

http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
body=$(echo "$response" | sed -e 's/HTTP_STATUS:[0-9]*$//')

print_result $(test "$http_code" = "200") "Tenants List API" "$body"
echo ""

# Test 3: Tenant Orders (will need a valid tenant ID)
echo -e "${YELLOW}Test 3: GET /api/admin/tenants/{tenant_id}/orders/${NC}"
echo "Note: This test requires a valid tenant ID from the previous test"
echo "Example: $BASE_URL/api/admin/tenants/tenant-uuid-here/orders/"
echo ""

# Test 4: Analytics (last 7 days)
echo -e "${YELLOW}Test 4: GET /api/admin/analytics/?days=7${NC}"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "$BASE_URL/api/admin/analytics/?days=7")

http_code=$(echo "$response" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
body=$(echo "$response" | sed -e 's/HTTP_STATUS:[0-9]*$//')

print_result $(test "$http_code" = "200") "Analytics API" "$body"
echo ""

echo -e "${YELLOW}Note: Make sure to:${NC}"
echo "1. Start the Django server: python manage.py runserver"
echo "2. Get an admin JWT token (login via /api/token/ endpoint)"
echo "3. Set the TOKEN variable at the top of this script"
echo "4. Ensure you have admin permissions"