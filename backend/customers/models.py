from django.db import models
from django_tenants.models import TenantMixin, DomainMixin


class Client(TenantMixin):
    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)

    # Branding
    logo_url = models.URLField(blank=True, null=True)
    primary_color = models.CharField(max_length=20, default="#000000")
    font_family = models.CharField(max_length=50, default="Inter")

    def __str__(self):
        return self.name


class Domain(DomainMixin):
    pass


class Customer(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    # Basic customer info
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    phone = models.CharField(max_length=20, unique=True, db_index=True)
    email = models.EmailField(blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    
    # Address
    address = models.TextField(blank=True)
    
    # Marketing preferences
    email_marketing = models.BooleanField(default=True)
    sms_marketing = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_visit = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-last_visit', '-created_at']
        indexes = [
            models.Index(fields=['phone']),
            models.Index(fields=['email']),
            models.Index(fields=['last_visit']),
        ]

    def __str__(self):
        name = f"{self.first_name} {self.last_name}".strip() or self.phone
        return name

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        elif self.user and self.user.get_full_name():
            return self.user.get_full_name()
        return self.phone


class Membership(models.Model):
    TIER_CHOICES = [
        ('bronze', 'Bronze'),
        ('silver', 'Silver'),
        ('gold', 'Gold'),
        ('platinum', 'Platinum'),
    ]

    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='membership')
    points = models.PositiveIntegerField(default=0, help_text="Current loyalty points")
    tier = models.CharField(max_length=10, choices=TIER_CHOICES, default='bronze')
    total_spent = models.DecimalField(max_digits=12, decimal_places=2, default=0, help_text="Total amount spent")
    visits_count = models.PositiveIntegerField(default=0, help_text="Number of visits/orders")
    
    # Tier progression
    points_to_next_tier = models.PositiveIntegerField(default=100, help_text="Points needed for next tier")
    tier_updated_at = models.DateTimeField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-points', '-tier']
        indexes = [
            models.Index(fields=['customer']),
            models.Index(fields=['tier']),
            models.Index(fields=['points']),
        ]

    def __str__(self):
        return f"{self.customer} - {self.get_tier_display()} ({self.points} pts)"

    def update_tier(self):
        """Update membership tier based on points"""
        old_tier = self.tier
        
        if self.points >= 1000:
            self.tier = 'platinum'
            self.points_to_next_tier = 0  # Max tier
        elif self.points >= 500:
            self.tier = 'gold'
            self.points_to_next_tier = 1000 - self.points
        elif self.points >= 200:
            self.tier = 'silver'
            self.points_to_next_tier = 500 - self.points
        else:
            self.tier = 'bronze'
            self.points_to_next_tier = 200 - self.points
        
        if old_tier != self.tier:
            self.tier_updated_at = models.DateTimeField(auto_now_add=True)()
        
        self.save()

    def add_points(self, points):
        """Add points and update tier if necessary"""
        self.points += points
        self.update_tier()
        return self.points

    def record_purchase(self, amount):
        """Record a purchase and update stats"""
        self.total_spent += amount
        self.visits_count += 1
        self.save()


class LoyaltyTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('earned', 'Points Earned'),
        ('redeemed', 'Points Redeemed'),
        ('expired', 'Points Expired'),
        ('adjusted', 'Points Adjusted'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='loyalty_transactions')
    order = models.ForeignKey('orders.Order', on_delete=models.SET_NULL, null=True, blank=True)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    points = models.IntegerField(help_text="Positive for earned, negative for redeemed/expired")
    description = models.CharField(max_length=200)
    balance_after = models.IntegerField(help_text="Points balance after this transaction")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['customer']),
            models.Index(fields=['transaction_type']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.customer} - {self.transaction_type} {self.points} pts"
