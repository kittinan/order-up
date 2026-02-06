from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'name']
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Item(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name

class ModifierGroup(models.Model):
    item = models.ForeignKey(Item, related_name='modifier_groups', on_delete=models.CASCADE)
    name = models.CharField(max_length=100) # e.g., "Choose Size", "Add-ons"
    min_selection = models.IntegerField(default=0)
    max_selection = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.item.name} - {self.name}"

class ModifierOption(models.Model):
    group = models.ForeignKey(ModifierGroup, related_name='options', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price_adjustment = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Cart(models.Model):
    session_id = models.CharField(max_length=255, unique=True)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Cart {self.session_id}"

    @property
    def total_amount(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    special_instructions = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.quantity}x {self.item.name} in cart {self.cart.session_id}"

    @property
    def total_price(self):
        return self.quantity * self.item.price

class CartItemModifier(models.Model):
    cart_item = models.ForeignKey(CartItem, related_name='modifiers', on_delete=models.CASCADE)
    modifier_option = models.ForeignKey(ModifierOption, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ['cart_item', 'modifier_option']

    def __str__(self):
        return f"{self.quantity}x {self.modifier_option.name} for {self.cart_item}"

    @property
    def total_price(self):
        return self.quantity * self.modifier_option.price_adjustment
