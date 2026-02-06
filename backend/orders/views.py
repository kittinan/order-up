from django.db.models import Sum
from django.utils import timezone
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order
from .serializers import (
    OrderSerializer, 
    OrderStatusUpdateSerializer, 
    OrderStatsSerializer
)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrderStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Calculate today's stats
        today = timezone.now().date()
        orders_today = Order.objects.filter(created_at__date=today).count()
        completed_today = Order.objects.filter(
            created_at__date=today, 
            status='completed'
        ).count()
        revenue_today = Order.objects.filter(
            created_at__date=today, 
            status='completed'
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        active_orders = Order.objects.filter(
            status__in=['pending', 'preparing']
        ).count()
        
        serializer = OrderStatsSerializer({
            'orders_today': orders_today,
            'orders_completed_today': completed_today,
            'revenue_today': revenue_today,
            'active_orders': active_orders
        })
        return Response(serializer.data)


class OrderStatusUpdateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            instance.status = serializer.validated_data['status']
            instance.save()
            
            # Return the updated order with full serializer
            response_serializer = OrderSerializer(instance)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)