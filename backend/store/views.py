from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Category, Item, Cart, CartItem
from .serializers import (
    CategorySerializer, 
    TenantBrandingSerializer, 
    CartSerializer, 
    CartItemSerializer, 
    CartItemCreateSerializer,
    CartItemUpdateSerializer
)

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

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.filter(is_active=True)
    serializer_class = CartSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        session_id = self.request.headers.get('X-Session-ID') or self.request.GET.get('session_id')
        if session_id:
            return Cart.objects.filter(session_id=session_id, is_active=True)
        return Cart.objects.none()

    def get_cart_or_create(self, session_id):
        cart, created = Cart.objects.get_or_create(
            session_id=session_id,
            defaults={'is_active': True}
        )
        return cart

    def list(self, request, *args, **kwargs):
        session_id = request.headers.get('X-Session-ID') or request.GET.get('session_id')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = self.get_cart_or_create(session_id)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        session_id = request.data.get('session_id') or request.headers.get('X-Session-ID')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = self.get_cart_or_create(session_id)
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='items')
    def add_item(self, request):
        session_id = request.headers.get('X-Session-ID') or request.data.get('session_id')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = self.get_cart_or_create(session_id)
        
        serializer = CartItemCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Check if item exists and is available
            try:
                item = Item.objects.get(id=serializer.validated_data['item_id'], is_available=True)
            except Item.DoesNotExist:
                return Response(
                    {'error': 'Item not found or not available'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            cart_item = CartItem.objects.create(
                cart=cart,
                item=item,
                quantity=serializer.validated_data.get('quantity', 1),
                special_instructions=serializer.validated_data.get('special_instructions', '')
            )
            
            # Add modifiers if any
            modifiers_data = serializer.validated_data.get('modifiers', [])
            for modifier_data in modifiers_data:
                from .models import CartItemModifier, ModifierOption
                try:
                    modifier_option = ModifierOption.objects.get(id=modifier_data['modifier_option_id'])
                    CartItemModifier.objects.create(
                        cart_item=cart_item,
                        modifier_option=modifier_option,
                        quantity=modifier_data.get('quantity', 1)
                    )
                except ModifierOption.DoesNotExist:
                    continue  # Skip invalid modifiers
            
            response_serializer = CartItemSerializer(cart_item)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'], url_path='items/(?P<item_id>[^/.]+)/update')
    def update_item(self, request, pk=None, item_id=None):
        session_id = request.headers.get('X-Session-ID') or request.data.get('session_id')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = get_object_or_404(Cart, session_id=session_id, is_active=True)
        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        
        serializer = CartItemUpdateSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_serializer = CartItemSerializer(cart_item)
            return Response(response_serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='items/(?P<item_id>[^/.]+)/delete')
    def delete_item(self, request, pk=None, item_id=None):
        session_id = request.headers.get('X-Session-ID') or request.GET.get('session_id')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = get_object_or_404(Cart, session_id=session_id, is_active=True)
        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        cart_item.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
