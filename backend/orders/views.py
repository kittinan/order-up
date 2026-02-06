from django.db.models import Sum
from django.utils import timezone
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Order
from .serializers import (
    OrderSerializer,
    OrderStatusUpdateSerializer,
    OrderStatsSerializer,
    PublicOrderSerializer
)


def send_order_update(request, order, update_type='updated'):
    """Helper to send order updates via WebSocket"""
    try:
        channel_layer = get_channel_layer()
        host = request.get_host().split(':')[0]
        safe_host = host.replace('.', '_').replace('-', '_')
        group_name = f'orders_{safe_host}'
        
        serializer = OrderSerializer(order)
        
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'order_update',
                'action': update_type,
                'order': serializer.data
            }
        )
    except Exception as e:
        print(f"Failed to send websocket update: {e}")


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().prefetch_related('items__modifiers')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrderStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Calculate today's stats
        today = timezone.now().date()
        orders_today = Order.objects.filter(created_at__date=today).count()
        completed_today = Order.objects.filter(
            created_at__date=today,
            status='completed'
        ).count()
        revenue_today = Order.objects.filter(
            created_at__date=today,
            status='completed'
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        active_orders = Order.objects.filter(
            status__in=['pending', 'preparing']
        ).count()

        serializer = OrderStatsSerializer({
            'orders_today': orders_today,
            'orders_completed_today': completed_today,
            'revenue_today': revenue_today,
            'active_orders': active_orders
        })
        return Response(serializer.data)


class OrderStatusUpdateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Update status
            if 'status' in serializer.validated_data:
                new_status = serializer.validated_data['status']
                old_status = instance.status
                instance.status = new_status
                
                # Calculate points if order is completed
                if new_status == 'completed' and old_status != 'completed' and instance.customer_phone:
                    try:
                        from store.models import Customer
                        customer, created = Customer.objects.get_or_create(
                            phone=instance.customer_phone,
                            defaults={'name': instance.customer_name}
                        )
                        # 1 point per 10 currency units
                        points_earned = int(instance.total_amount / 10)
                        customer.points += points_earned
                        customer.save()
                    except Exception as e:
                        print(f"Error adding points: {e}")

            if 'payment_status' in serializer.validated_data:
                instance.payment_status = serializer.validated_data['payment_status']
            instance.save()

            # Return the updated order with full serializer
            response_serializer = OrderSerializer(instance)
            
            # Send WebSocket update
            send_order_update(request, instance, update_type='status_changed')
            
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PublicOrderCreateView(APIView):
    """Public API for creating orders from cart (customer orders)"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        session_id = request.headers.get('X-Session-ID') or request.data.get('session_id')
        if not session_id:
            return Response(
                {'error': 'Session ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get cart items from session
        from store.models import Cart, CartItem, CartItemModifier
        try:
            cart = Cart.objects.get(session_id=session_id, is_active=True)
            cart_items = cart.items.all().prefetch_related('modifiers')

            if not cart_items.exists():
                return Response(
                    {'error': 'Cart is empty'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Prepare order data
            items_data = []
            total_amount = 0

            for cart_item in cart_items:
                item_total = cart_item.total_price
                item_data = {
                    'item_id': cart_item.item.id,
                    'quantity': cart_item.quantity,
                    'special_instructions': cart_item.special_instructions or '',
                    'modifiers': []
                }

                # Add modifiers
                for modifier in cart_item.modifiers.all():
                    item_total += modifier.total_price
                    item_data['modifiers'].append({
                        'modifier_option_id': modifier.modifier_option.id,
                        'quantity': modifier.quantity
                    })

                items_data.append(item_data)
                total_amount += item_total

            # Create order
            order_data = {
                'customer_name': request.data.get('customer_name', ''),
                'customer_phone': request.data.get('customer_phone', ''),
                'total_amount': total_amount,
                'delivery_address': request.data.get('delivery_address', ''),
                'special_instructions': request.data.get('special_instructions', ''),
                'session_id': session_id
            }

            # Get QR code and table if available
            qr_code_id = request.data.get('qr_code_id')
            if qr_code_id:
                from qrcodes.models import QRCode
                try:
                    qr_code = QRCode.objects.get(id=qr_code_id)
                    order_data['qr_code'] = qr_code
                    order_data['table'] = qr_code.table
                    order_data['customer_name'] = f"Table {qr_code.table.name}"
                except QRCode.DoesNotExist:
                    pass

            # Use PublicOrderSerializer to create order
            serializer = PublicOrderSerializer(data={**order_data, 'items': items_data})
            if serializer.is_valid():
                order = serializer.save()

                # Mark cart as inactive
                cart.is_active = False
                cart.save()

                response_serializer = OrderSerializer(order)
                
                # Send WebSocket update
                send_order_update(request, order, update_type='new_order')
                
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class PublicOrderDetailView(APIView):
    """Public API for viewing order details (customer view)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, order_id):
        session_id = request.headers.get('X-Session-ID') or request.GET.get('session_id')

        try:
            order = get_object_or_404(Order, id=order_id)

            # Allow access if same session or if it's an authenticated request
            if session_id and order.session_id != session_id:
                if not request.user.is_authenticated:
                    return Response(
                        {'error': 'Access denied'},
                        status=status.HTTP_403_FORBIDDEN
                    )

            serializer = OrderSerializer(order)
            return Response(serializer.data)

        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class OrderPaymentView(APIView):
    """Payment API with comprehensive payment service"""
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Verify session if not authenticated
        session_id = request.headers.get('X-Session-ID') or request.data.get('session_id')
        if not request.user.is_authenticated:
            if not session_id or (order.session_id and order.session_id != session_id):
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        payment_method = request.data.get('method', 'cash')
        payment_details = request.data.get('payment_details', {})
        
        # Use PaymentService to process payment
        from .services import PaymentService
        result = PaymentService.process_payment(
            order_id=order.id,
            payment_method=payment_method,
            payment_details=payment_details
        )
        
        if result['success']:
            # Send WebSocket update
            send_order_update(request, order, update_type='payment_processed')
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
