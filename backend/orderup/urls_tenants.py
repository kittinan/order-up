from django.urls import path, include
from rest_framework.routers import DefaultRouter
from store.views import MenuViewSet, TenantInfoView

router = DefaultRouter()
router.register(r'menu', MenuViewSet, basename='menu')

urlpatterns = [
    path('api/tenant/', TenantInfoView.as_view(), name='tenant-info'),
    path('api/', include(router.urls)),
]
