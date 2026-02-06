from rest_framework import serializers
from .models import QRCode
from store.models import Table

class QRCodeSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    table_name = serializers.CharField(source='table.name', read_only=True)
    is_expired = serializers.BooleanField(read_only=True)

    class Meta:
        model = QRCode
        fields = [
            'id', 'restaurant', 'restaurant_name', 'table', 'table_name',
            'code', 'created_at', 'expires_at', 'is_active', 'is_expired'
        ]
        read_only_fields = ['id', 'created_at', 'restaurant']

class QRCodeGenerateSerializer(serializers.Serializer):
    table_id = serializers.IntegerField()
    expires_hours = serializers.IntegerField(default=24, required=False)
    
    def validate_table_id(self, value):
        """Validate that table exists"""
        try:
            table = Table.objects.get(id=value)
            # Check if QR code already exists for this table
            if QRCode.objects.filter(table=table, is_active=True).exists():
                raise serializers.ValidationError(
                    "QR code already exists for this table. Please deactivate the existing one first."
                )
            return value
        except Table.DoesNotExist:
            raise serializers.ValidationError("Table does not exist.")

    def create(self, validated_data):
        """Generate a new QR code"""
        table = Table.objects.get(id=validated_data['table_id'])
        request = self.context.get('request')
        
        # Calculate expiration time
        expires_hours = validated_data.get('expires_hours', 24)
        expires_at = None
        if expires_hours > 0:
            from django.utils import timezone
            import datetime
            expires_at = timezone.now() + datetime.timedelta(hours=expires_hours)

        # Create QR code
        qr_code = QRCode.objects.create(
            restaurant=request.tenant,  # Current tenant from middleware
            table=table,
            expires_at=expires_at
        )
        
        return qr_code