from django.core.management.base import BaseCommand
from django_tenants.utils import schema_context
from store.models import Category, Item, ModifierGroup, ModifierOption

class Command(BaseCommand):
    help = 'Seeds menu for a specific tenant'

    def add_arguments(self, parser):
        parser.add_argument('schema_name', type=str)

    def handle(self, *args, **kwargs):
        schema_name = kwargs['schema_name']
        
        with schema_context(schema_name):
            self.stdout.write(f"Seeding menu for {schema_name}...")
            
            # Clear existing
            Category.objects.all().delete()

            if schema_name == 'pizza':
                cat_pizza = Category.objects.create(name="Classic Pizzas", slug="classic-pizzas", sort_order=1)
                
                item_margherita = Item.objects.create(
                    category=cat_pizza,
                    name="Margherita",
                    description="Tomato sauce, mozzarella, basil",
                    price=250.00,
                    image_url="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60"
                )

                mod_size = ModifierGroup.objects.create(item=item_margherita, name="Size", min_selection=1, max_selection=1)
                ModifierOption.objects.create(group=mod_size, name="Medium 10\"", price_adjustment=0)
                ModifierOption.objects.create(group=mod_size, name="Large 12\"", price_adjustment=50)

                mod_crust = ModifierGroup.objects.create(item=item_margherita, name="Crust", min_selection=1, max_selection=1)
                ModifierOption.objects.create(group=mod_crust, name="Thin", price_adjustment=0)
                ModifierOption.objects.create(group=mod_crust, name="Pan", price_adjustment=0)
                ModifierOption.objects.create(group=mod_crust, name="Cheese Stuffed", price_adjustment=30)

            elif schema_name == 'sushi':
                cat_roll = Category.objects.create(name="Sushi Rolls", slug="sushi-rolls", sort_order=1)
                
                Item.objects.create(
                    category=cat_roll,
                    name="Salmon Roll",
                    description="Fresh salmon, rice, seaweed",
                    price=120.00,
                    image_url="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60"
                )
            
            self.stdout.write(self.style.SUCCESS(f"Menu seeded for {schema_name}"))
