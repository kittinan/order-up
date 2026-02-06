from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    OrderViewSet, OrderStatsView, OrderStatusUpdateView,
    PublicOrderCreateView, PublicOrderDetailView, OrderPaymentView
)

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-stats', OrderStatsView, basename='order-stats')

urlpatterns = [
    path('', include(router.urls)),
    path('orders/<uuid:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),
    path('orders/<uuid:pk>/pay/', OrderPaymentView.as_view(), name='order-payment'),
    # Public APIs (for customers)
    path('public/orders/create/', PublicOrderCreateView.as_view(), name='public-order-create'),
    path('public/orders/<uuid:order_id>/', PublicOrderDetailView.as_view(), name='public-order-detail'),
]