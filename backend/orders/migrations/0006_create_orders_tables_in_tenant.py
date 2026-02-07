from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('orders', '0005_rename_orders_orde_status_c6dd84_idx_idx_order_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=200)),
                ('customer_phone', models.CharField(blank=True, max_length=20)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('preparing', 'Preparing'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='pending', max_length=20)),
                ('payment_status', models.CharField(choices=[('pending', 'Pending'), ('paid', 'Paid'), ('failed', 'Failed'), ('refunded', 'Refunded')], default='pending', max_length=20)),
                ('payment_method', models.CharField(blank=True, choices=[('cash', 'Cash on Delivery'), ('card', 'Credit/Debit Card'), ('promptpay', 'PromptPay')], max_length=20, null=True)),
                ('delivery_address', models.TextField(blank=True)),
                ('session_id', models.CharField(blank=True, help_text='Cart session ID for linking with customer', max_length=255, null=True)),
                ('special_instructions', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('qr_code', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='qrcodes.qrcode')),
                ('table', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='store.table')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='customers.customer')),
            ],
            options={
                'ordering': ['-created_at'],
                'indexes': [
                    models.Index(fields=['status'], name='idx_order_status'),
                    models.Index(fields=['created_at'], name='idx_order_created_at'),
                    models.Index(fields=['status', 'created_at'], name='idx_order_status_created_at'),
                    models.Index(fields=['qr_code'], name='idx_order_qr_code'),
                    models.Index(fields=['session_id'], name='idx_order_session_id'),
                ],
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=10, help_text='Price at time of order')),
                ('special_instructions', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='store.item')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='orders.order')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='OrderItemModifier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('price_adjustment', models.DecimalField(decimal_places=2, max_digits=6, help_text='Price adjustment at time of order')),
                ('modifier_option', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='store.modifieroption')),
                ('order_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modifiers', to='orders.orderitem')),
            ],
            options={
                'unique_together': {('order_item', 'modifier_option')},
            },
        ),
    ]
