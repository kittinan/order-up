from django.urls import path
from . import views

urlpatterns = [
    # System statistics - เปลี่ยนเป็น overview/
    path('stats/overview/', views.system_stats, name='admin-stats-overview'),
    
    # Tenant management - เพิ่ม POST method support
    path('tenants/', views.tenants_list, name='admin-tenants'),
    path('tenants/<uuid:tenant_id>/orders/', views.tenant_orders, name='admin-tenant-orders'),
    
    # Analytics - เปลี่ยนเป็น revenue/
    path('analytics/revenue/', views.analytics, name='admin-analytics-revenue'),
]