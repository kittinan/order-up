from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderStatsView, OrderStatusUpdateView

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-stats', OrderStatsView, basename='order-stats')

urlpatterns = [
    path('', include(router.urls)),
    path('orders/<uuid:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),
]