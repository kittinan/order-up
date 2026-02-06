from django.db import models
from django.utils import timezone
import uuid

class QRCode(models.Model):
    restaurant = models.ForeignKey('customers.Client', on_delete=models.CASCADE)
    table = models.ForeignKey('store.Table', on_delete=models.CASCADE)
    code = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['restaurant', 'table']
        verbose_name = "QR Code"
        verbose_name_plural = "QR Codes"

    def __str__(self):
        return f"QR Code for {self.restaurant.name} - {self.table.name}"

    def is_expired(self):
        """Check if QR code has expired"""
        if self.expires_at is None:
            return False
        return timezone.now() > self.expires_at

    @classmethod
    def generate_unique_code(cls):
        """Generate a unique QR code"""
        return str(uuid.uuid4())[:8].upper()

    def save(self, *args, **kwargs):
        """Generate unique code if not provided"""
        if not self.code:
            self.code = self.generate_unique_code()
        super().save(*args, **kwargs)