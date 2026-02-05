from django.core.management.base import BaseCommand
from customers.models import Client, Domain

class Command(BaseCommand):
    help = 'Seeds initial tenants'

    def handle(self, *args, **kwargs):
        # Public Tenant (Required by django-tenants)
        if not Client.objects.filter(schema_name='public').exists():
            public_client = Client(schema_name='public', name='Public Tenant')
            public_client.save()
            Domain(domain='localhost', tenant=public_client, is_primary=True).save()
            self.stdout.write(self.style.SUCCESS('Created public tenant'))

        # Pizza Tenant
        if not Client.objects.filter(schema_name='pizza').exists():
            pizza_client = Client(
                schema_name='pizza', 
                name='Pizza Lover',
                primary_color='#e63946', # Red
                font_family='Roboto',
                logo_url='https://img.icons8.com/color/96/pizza.png'
            )
            pizza_client.save()
            
            # Domain for Pizza (using localhost subdomain for dev)
            # Note: In real production, this would be pizza.orderup.com
            # For local docker, we might need to map /etc/hosts or just use port mapping tricks.
            # But django-tenants looks at Host header. 
            Domain(domain='pizza.localhost', tenant=pizza_client, is_primary=True).save()
            self.stdout.write(self.style.SUCCESS('Created Pizza Lover tenant'))
        
        # Sushi Tenant
        if not Client.objects.filter(schema_name='sushi').exists():
            sushi_client = Client(
                schema_name='sushi', 
                name='Sushi Master',
                primary_color='#2a9d8f', # Teal
                font_family='Lato',
                logo_url='https://img.icons8.com/color/96/sushi.png'
            )
            sushi_client.save()
            Domain(domain='sushi.localhost', tenant=sushi_client, is_primary=True).save()
            self.stdout.write(self.style.SUCCESS('Created Sushi Master tenant'))
