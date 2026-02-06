from django.db import models
from django_tenants.models import TenantMixin
from django.contrib.auth import get_user_model

User = get_user_model()


class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('preparing', 'Preparing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash on Delivery'),
        ('card', 'Credit/Debit Card'),
        ('promptpay', 'PromptPay'),
    ]

    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=20, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS_CHOICES,
        default='pending'
    )
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default='pending'
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        blank=True,
        null=True
    )
    delivery_address = models.TextField(blank=True)
    qr_code = models.ForeignKey('qrcodes.QRCode', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    table = models.ForeignKey('store.Table', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    session_id = models.CharField(max_length=255, blank=True, null=True, help_text="Cart session ID for linking with customer")
    customer = models.ForeignKey('customers.Customer', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    special_instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['qr_code']),
            models.Index(fields=['session_id']),
        ]

    def __str__(self):
        return f"Order {self.id} - {self.customer_name} ({self.status})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    item = models.ForeignKey('store.Item', on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price at time of order")
    special_instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.quantity}x {self.item.name} in Order {self.order.id}"

    @property
    def total_price(self):
        return self.quantity * self.unit_price


class OrderItemModifier(models.Model):
    order_item = models.ForeignKey(OrderItem, related_name='modifiers', on_delete=models.CASCADE)
    modifier_option = models.ForeignKey('store.ModifierOption', on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price_adjustment = models.DecimalField(max_digits=6, decimal_places=2, help_text="Price adjustment at time of order")

    class Meta:
        unique_together = ['order_item', 'modifier_option']

    def __str__(self):
        return f"{self.quantity}x {self.modifier_option.name} for OrderItem {self.order_item.id}"

    @property
    def total_price(self):
        return self.quantity * self.price_adjustment