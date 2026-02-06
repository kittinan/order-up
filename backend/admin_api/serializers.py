from rest_framework import serializers


class TenantStatsSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
    domain = serializers.CharField()
    schema_name = serializers.CharField()
    created_at = serializers.DateTimeField()
    orders_count = serializers.IntegerField()
    total_sales = serializers.FloatField()


class OrderSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    order_number = serializers.CharField()
    user = serializers.EmailField(allow_null=True)
    status = serializers.CharField()
    total_amount = serializers.FloatField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    items_count = serializers.IntegerField()


class SystemStatsSerializer(serializers.Serializer):
    tenants_count = serializers.IntegerField()
    orders_today = serializers.IntegerField()
    sales_today = serializers.FloatField()
    active_customers_count = serializers.IntegerField()


class TopTenantSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    revenue = serializers.FloatField()


class PopularItemSerializer(serializers.Serializer):
    name = serializers.CharField()
    tenant_id = serializers.CharField()
    tenant_name = serializers.CharField()
    quantity = serializers.IntegerField()
    revenue = serializers.FloatField()


class RevenueTrendSerializer(serializers.Serializer):
    date = serializers.CharField()
    revenue = serializers.FloatField()


class AnalyticsSerializer(serializers.Serializer):
    top_tenants = TopTenantSerializer(many=True)
    popular_items = PopularItemSerializer(many=True)
    revenue_trends = RevenueTrendSerializer(many=True)
    period_days = serializers.IntegerField()