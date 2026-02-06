from django.urls import path, include
from rest_framework.routers import DefaultRouter
from store.views import MenuViewSet, TenantInfoView, CartViewSet

router = DefaultRouter()
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('api/tenant/', TenantInfoView.as_view(), name='tenant-info'),
    path('api/', include(router.urls)),
]
