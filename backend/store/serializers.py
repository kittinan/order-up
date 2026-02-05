from rest_framework import serializers
from .models import Category, Item, ModifierGroup, ModifierOption
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
