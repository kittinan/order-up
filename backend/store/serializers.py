from rest_framework import serializers
from .models import Category, Item, ModifierGroup, ModifierOption, Cart, CartItem, CartItemModifier, Customer
from customers.models import Client

class TenantBrandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['name', 'logo_url', 'primary_color', 'font_family']

class ModifierOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModifierOption
        fields = ['id', 'name', 'price_adjustment', 'is_available']

class ModifierGroupSerializer(serializers.ModelSerializer):
    options = ModifierOptionSerializer(many=True, read_only=True)

    class Meta:
        model = ModifierGroup
        fields = ['id', 'name', 'min_selection', 'max_selection', 'options']

class ItemSerializer(serializers.ModelSerializer):
    modifier_groups = ModifierGroupSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'price', 'image_url', 'is_available', 'modifier_groups']

class CategorySerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'items']

    def get_items(self, obj):
        items = obj.items.filter(is_available=True)
        return ItemSerializer(items, many=True).data

class CartItemModifierSerializer(serializers.ModelSerializer):
    modifier_option = ModifierOptionSerializer(read_only=True)
    modifier_option_id = serializers.IntegerField(write_only=True)
    quantity = serializers.IntegerField(min_value=1, default=1)

    class Meta:
        model = CartItemModifier
        fields = ['id', 'modifier_option', 'modifier_option_id', 'quantity']

    def create(self, validated_data):
        return CartItemModifier.objects.create(**validated_data)

class CartItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    item_id = serializers.IntegerField(write_only=True)
    modifiers = CartItemModifierSerializer(source='cartitemmodifier_set', many=True, read_only=True)
    special_instructions = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'item', 'item_id', 'quantity', 'special_instructions', 'modifiers', 'total_price']
        read_only_fields = ['total_price']

    def create(self, validated_data):
        return CartItem.objects.create(**validated_data)

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_items = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'session_id', 'customer', 'created_at', 'updated_at', 'is_active', 
                  'items', 'total_amount', 'total_items']
        read_only_fields = ['created_at', 'updated_at']

class CartItemCreateSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField()
    modifiers = CartItemModifierSerializer(many=True, write_only=True, required=False)
    
    class Meta:
        model = CartItem
        fields = ['item_id', 'quantity', 'special_instructions', 'modifiers']

    def create(self, validated_data):
        modifiers_data = validated_data.pop('modifiers', [])
        cart_item = CartItem.objects.create(**validated_data)
        
        for modifier_data in modifiers_data:
            CartItemModifier.objects.create(cart_item=cart_item, **modifier_data)
        
        return cart_item

class CartItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity', 'special_instructions']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone', 'email', 'points', 'membership_tier', 'created_at', 'updated_at']
        read_only_fields = ['id', 'points', 'membership_tier', 'created_at', 'updated_at']


class CustomerTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone', 'points', 'membership_tier']
        read_only_fields = ['id', 'points', 'membership_tier']
