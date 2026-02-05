from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Item
from .serializers import CategorySerializer, TenantBrandingSerializer

class TenantInfoView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        tenant = request.tenant
        serializer = TenantBrandingSerializer(tenant)
        return Response(serializer.data)

class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True).prefetch_related('items__modifier_groups__options')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
