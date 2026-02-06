from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_phone', 'total_amount', 
            'status', 'delivery_address', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class OrderStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.ORDER_STATUS_CHOICES)


class OrderStatsSerializer(serializers.Serializer):
    orders_today = serializers.IntegerField()
    orders_completed_today = serializers.IntegerField()
    revenue_today = serializers.DecimalField(max_digits=10, decimal_places=2)
    active_orders = serializers.IntegerField()