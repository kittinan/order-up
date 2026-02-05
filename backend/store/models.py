from django.db import models

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
