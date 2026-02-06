from rest_framework import serializers

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['phone', 'name', 'points', 'joined_at']
        read_only_fields = ['joined_at']

class CustomerTransactionSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    type = serializers.CharField()
    points = serializers.IntegerField()
    description = serializers.CharField()
    amount = serializers.FloatField()
    date = serializers.DateTimeField()