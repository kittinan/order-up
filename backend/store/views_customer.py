from django.db.models import Sum
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Customer
from orders.models import Order
from .serializers import CustomerSerializer, CustomerTransactionSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.AllowAny]  # Allow public access for customer creation
    lookup_field = 'phone'

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=['get'])
    def transactions(self, request, phone=None):
        """Get transaction history for a customer"""
        customer = self.get_object()
        
        # Get orders for this customer
        orders = Order.objects.filter(customer_phone=phone).order_by('-created_at')
        
        transactions = []
        for order in orders:
            if order.status == 'completed':
                # Points earned from this order
                points_earned = int(order.total_amount / 10)
                transactions.append({
                    'id': order.id,
                    'type': 'earned',
                    'points': points_earned,
                    'description': f'Order #{order.id}',
                    'amount': float(order.total_amount),
                    'date': order.created_at
                })
        
        serializer = CustomerTransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def lookup_or_create(self, request):
        """Look up customer by phone or create if doesn't exist"""
        phone = request.data.get('phone')
        name = request.data.get('name', '')
        
        if not phone:
            return Response(
                {'error': 'Phone number is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        customer, created = Customer.objects.get_or_create(
            phone=phone,
            defaults={'name': name}
        )
        
        if not created and name and customer.name != name:
            # Update name if provided and different
            customer.name = name
            customer.save()
        
        serializer = self.get_serializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerDetailView(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'phone'


class CustomerTierView(APIView):
    """Get customer tier based on points"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, phone):
        customer = get_object_or_404(Customer, phone=phone)
        
        # Define tier thresholds
        tiers = {
            'Bronze': {'min': 0, 'max': 99, 'color': '#CD7F32'},
            'Silver': {'min': 100, 'max': 499, 'color': '#C0C0C0'},
            'Gold': {'min': 500, 'max': 999, 'color': '#FFD700'},
            'Platinum': {'min': 1000, 'max': float('inf'), 'color': '#E5E4E2'}
        }
        
        current_tier = 'Bronze'
        for tier_name, tier_info in tiers.items():
            if tier_info['min'] <= customer.points <= tier_info['max']:
                current_tier = tier_name
                break
        
        # Calculate points to next tier
        next_tier = None
        points_to_next = 0
        for i, (tier_name, tier_info) in enumerate(tiers.items()):
            if tier_name == current_tier and i < len(tiers) - 1:
                next_tier_name = list(tiers.keys())[i + 1]
                next_tier = {
                    'name': next_tier_name,
                    'points_needed': tiers[next_tier_name]['min'] - customer.points
                }
                break
        
        return Response({
            'customer': {
                'name': customer.name,
                'phone': customer.phone,
                'points': customer.points
            },
            'tier': {
                'name': current_tier,
                'color': tiers[current_tier]['color']
            },
            'next_tier': next_tier
        })