from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views_customer import CustomerViewSet, CustomerDetailView, CustomerTierView

router = DefaultRouter()
router.register(r'customers', CustomerViewSet, basename='customer')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/customers/<str:phone>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('api/customers/<str:phone>/tier/', CustomerTierView.as_view(), name='customer-tier'),
]