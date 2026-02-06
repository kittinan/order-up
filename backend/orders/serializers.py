from rest_framework import serializers
from .models import Order, OrderItem, OrderItemModifier


class OrderItemModifierSerializer(serializers.ModelSerializer):
    modifier_name = serializers.CharField(source='modifier_option.name', read_only=True)
    price_adjustment = serializers.DecimalField(max_digits=6, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItemModifier
        fields = ['modifier_option_id', 'modifier_name', 'quantity', 'price_adjustment', 'total_price']
        read_only_fields = ['price_adjustment', 'total_price']


class OrderItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_description = serializers.CharField(source='item.description', read_only=True)
    modifiers = OrderItemModifierSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = [
            'id', 'item_id', 'item_name', 'item_description', 'quantity',
            'unit_price', 'special_instructions', 'modifiers', 'total_price'
        ]
        read_only_fields = ['unit_price', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    table_name = serializers.CharField(source='table.name', read_only=True)
    qr_code_str = serializers.CharField(source='qr_code.code', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_phone', 'total_amount',
            'status', 'payment_status', 'payment_method',
            'delivery_address', 'table_name', 'qr_code_str',
            'special_instructions', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class OrderStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.ORDER_STATUS_CHOICES)
    payment_status = serializers.ChoiceField(
        choices=Order.PAYMENT_STATUS_CHOICES,
        required=False,
        allow_null=True
    )


class OrderStatsSerializer(serializers.Serializer):
    orders_today = serializers.IntegerField()
    orders_completed_today = serializers.IntegerField()
    revenue_today = serializers.DecimalField(max_digits=10, decimal_places=2)
    active_orders = serializers.IntegerField()


class PublicOrderSerializer(serializers.ModelSerializer):
    """Serializer for creating orders from cart (public API)"""
    items = serializers.ListField(
        child=serializers.DictField(),
        write_only=True,
        required=True,
        help_text="List of cart items with modifiers"
    )

    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_phone', 'total_amount',
            'delivery_address', 'special_instructions', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        # Create order
        order = Order.objects.create(**validated_data)

        # Create order items from cart items
        from store.models import Item, ModifierOption
        for item_data in items_data:
            item = Item.objects.get(id=item_data['item_id'])
            order_item = OrderItem.objects.create(
                order=order,
                item=item,
                quantity=item_data.get('quantity', 1),
                unit_price=item.price,
                special_instructions=item_data.get('special_instructions', '')
            )

            # Add modifiers
            for modifier_data in item_data.get('modifiers', []):
                modifier_option = ModifierOption.objects.get(id=modifier_data['modifier_option_id'])
                OrderItemModifier.objects.create(
                    order_item=order_item,
                    modifier_option=modifier_option,
                    quantity=modifier_data.get('quantity', 1),
                    price_adjustment=modifier_option.price_adjustment
                )

        # Recalculate total amount
        order.total_amount = sum(item.total_price for item in order.items.all())
        order.save()

        return order