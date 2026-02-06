# OrderUp Admin Dashboard APIs

This document describes the admin dashboard APIs for the OrderUp platform.

## Base URL
All admin APIs are accessible at: `/api/admin/`

## Authentication
All admin APIs require:
1. Authentication (JWT Bearer token)
2. Admin user permissions (IsAdminUser)

## API Endpoints

### 1. System Statistics
**GET** `/api/admin/stats/`

Get system-wide statistics:
- Number of tenants
- Today's orders count
- Total sales today
- Active customers count

**Response:**
```json
{
    "tenants_count": 5,
    "orders_today": 142,
    "sales_today": 15420.50,
    "active_customers_count": 341
}
```

### 2. Tenants List
**GET** `/api/admin/tenants/`

Get paginated list of all tenants with their statistics.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 10)

**Response:**
```json
{
    "tenants": [
        {
            "id": "uuid-here",
            "name": "Restaurant A",
            "domain": "restaurant-a.orderup.com",
            "schema_name": "restaurant_a",
            "created_at": "2024-01-15T10:30:00Z",
            "orders_count": 1250,
            "total_sales": 156420.75
        }
    ],
    "pagination": {
        "page": 1,
        "page_size": 10,
        "total_count": 5,
        "total_pages": 1
    }
}
```

### 3. Tenant Orders
**GET** `/api/admin/tenants/{tenant_id}/orders/`

Get orders for a specific tenant with filtering options.

**Path Parameters:**
- `tenant_id`: UUID of the tenant

**Query Parameters:**
- `start_date` (optional): Start date (YYYY-MM-DD format)
- `end_date` (optional): End date (YYYY-MM-DD format)
- `status` (optional): Filter by order status (pending, confirmed, preparing, ready, completed, cancelled)

**Response:**
```json
{
    "tenant": {
        "id": "uuid-here",
        "name": "Restaurant A"
    },
    "orders": [
        {
            "id": "order-uuid-here",
            "order_number": "ORD-2024-0001",
            "user": "customer@example.com",
            "status": "completed",
            "total_amount": 125.50,
            "created_at": "2024-02-06T14:30:00Z",
            "updated_at": "2024-02-06T14:45:00Z",
            "items_count": 3
        }
    ]
}
```

### 4. Analytics
**GET** `/api/admin/analytics/`

Get analytics and reports across all tenants.

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 30)

**Response:**
```json
{
    "top_tenants": [
        {
            "id": "uuid-here",
            "name": "Restaurant A",
            "revenue": 45230.50
        }
    ],
    "popular_items": [
        {
            "name": "Margherita Pizza",
            "tenant_id": "uuid-here",
            "tenant_name": "Restaurant A",
            "quantity": 125,
            "revenue": 1875.00
        }
    ],
    "revenue_trends": [
        {
            "date": "2024-01-07",
            "revenue": 5420.30
        }
    ],
    "period_days": 30
}
```

## Error Responses

All APIs return standard HTTP status codes:

- `200 OK`: Success
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Admin permissions required
- `404 Not Found`: Tenant not found
- `500 Internal Server Error`: Server error

## Testing

Use the provided test script `test_admin_apis.sh` to test the APIs:

1. Start the Django server
2. Get an admin JWT token
3. Set the TOKEN in the test script
4. Run: `./test_admin_apis.sh`

## Implementation Notes

- The admin APIs use Django's multi-tenancy features to access data across all tenants
- All operations are performed with proper tenant context switching
- The APIs are designed to be efficient and minimize database queries
- Pagination is implemented for large datasets
- Date filtering uses timezone-aware datetime objects