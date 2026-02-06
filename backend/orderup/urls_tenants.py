from django.urls import path, include
from rest_framework.routers import DefaultRouter
from store.views import MenuViewSet, TenantInfoView, CartViewSet
from orders.views import OrderViewSet, OrderStatsView, OrderStatusUpdateView

router = DefaultRouter()
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'admin/orders', OrderViewSet, basename='admin-orders')

urlpatterns = [
    path('api/tenant/', TenantInfoView.as_view(), name='tenant-info'),
    path('api/', include(router.urls)),
    path('api/admin/order-stats/', OrderStatsView.as_view(), name='admin-order-stats'),
    path('api/admin/orders/<uuid:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),
    # QR Code URLs
    path('api/', include('qrcodes.urls')),
]
