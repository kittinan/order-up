from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QRCodeViewSet, QRCodeGenerateView, QRCodeDetailView

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'qrcodes', QRCodeViewSet, basename='qrcode')

urlpatterns = [
    # Include the router URLs
    path('', include(router.urls)),
    
    # QR code generation endpoint
    path('qrcodes/generate/', QRCodeGenerateView.as_view(), name='qrcode-generate'),
    
    # QR code detail by code (public access)
    path('qrcodes/<str:code>/', QRCodeDetailView.as_view(), name='qrcode-detail'),
]