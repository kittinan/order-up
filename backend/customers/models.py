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
