from django.urls import path
from . import views

urlpatterns = [
    # System statistics
    path('stats/', views.system_stats, name='admin-stats'),
    
    # Tenant management
    path('tenants/', views.tenants_list, name='admin-tenants'),
    path('tenants/<uuid:tenant_id>/orders/', views.tenant_orders, name='admin-tenant-orders'),
    
    # Analytics
    path('analytics/', views.analytics, name='admin-analytics'),
]