from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import QRCode
from .serializers import QRCodeSerializer, QRCodeGenerateSerializer

User = get_user_model()

class QRCodeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD operations on QR codes.
    Only shows QR codes for the current tenant (restaurant).
    """
    serializer_class = QRCodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter QR codes by current tenant"""
        return QRCode.objects.filter(restaurant=self.request.tenant)

    def perform_create(self, serializer):
        """Set the restaurant to current tenant"""
        serializer.save(restaurant=self.request.tenant)

    @action(detail=True, methods=['post'])
    def deactivate(self, request, pk=None):
        """Deactivate a QR code"""
        qr_code = self.get_object()
        qr_code.is_active = False
        qr_code.save()
        return Response({'status': 'QR code deactivated'})

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        """Activate a QR code"""
        qr_code = self.get_object()
        qr_code.is_active = True
        qr_code.save()
        return Response({'status': 'QR code activated'})

class QRCodeGenerateView(generics.CreateAPIView):
    """
    API view to generate a new QR code for a specific table.
    """
    serializer_class = QRCodeGenerateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Generate a new QR code for the specified table.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            qr_code = serializer.save()
            response_serializer = QRCodeSerializer(qr_code, context={'request': request})
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QRCodeDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve QR code details by code.
    No authentication required - accessible by anyone with the QR code.
    """
    serializer_class = QRCodeSerializer
    lookup_field = 'code'
    permission_classes = []

    def get_queryset(self):
        """Allow access to any QR code by its code"""
        return QRCode.objects.filter(is_active=True)
