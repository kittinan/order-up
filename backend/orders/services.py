from decimal import Decimal
from datetime import datetime
import random
import uuid
from django.db import transaction
from django.utils import timezone
from .models import Order
from customers.models import Customer, Membership, LoyaltyTransaction


class PaymentService:
    """Mock payment service for handling payments"""
    
    PAYMENT_METHODS = ['cash', 'card', 'promptpay']
    
    @staticmethod
    def process_payment(order_id, payment_method, payment_details=None):
        """
        Process payment for an order
        
        Args:
            order_id (int): Order ID
            payment_method (str): Payment method ('cash', 'card', 'promptpay')
            payment_details (dict): Additional payment details
            
        Returns:
            dict: Payment result with transaction details
        """
        try:
            with transaction.atomic():
                # Get the order
                order = Order.objects.select_for_update().get(id=order_id)
                
                # Validate order status
                if order.status != 'pending':
                    return {
                        'success': False,
                        'message': f'Order {order_id} is not in pending status (current: {order.status})'
                    }
                
                if order.payment_status == 'paid':
                    return {
                        'success': False,
                        'message': f'Order {order_id} is already paid'
                    }
                
                # Validate payment method
                if payment_method not in PaymentService.PAYMENT_METHODS:
                    return {
                        'success': False,
                        'message': f'Invalid payment method: {payment_method}'
                    }
                
                # Process payment based on method
                payment_result = PaymentService._process_payment_method(order, payment_method, payment_details)
                
                if not payment_result['success']:
                    return payment_result
                
                # Update order payment status
                order.payment_status = 'paid'
                order.payment_method = payment_method
                order.status = 'preparing'  # Move to preparing status when paid
                order.save()
                
                # Calculate and award loyalty points
                if order.customer:
                    PaymentService._award_loyalty_points(order)
                
                return {
                    'success': True,
                    'message': 'Payment processed successfully',
                    'transaction_id': payment_result['transaction_id'],
                    'amount': float(order.total_amount),
                    'payment_method': payment_method,
                    'timestamp': timezone.now().isoformat()
                }
                
        except Order.DoesNotExist:
            return {
                'success': False,
                'message': f'Order {order_id} not found'
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'Payment processing failed: {str(e)}'
            }
    
    @staticmethod
    def _process_payment_method(order, payment_method, payment_details):
        """Process payment based on the specific method"""
        
        # Generate mock transaction ID
        transaction_id = f"TXN_{timezone.now().strftime('%Y%m%d')}_{random.randint(100000, 999999)}"
        
        if payment_method == 'cash':
            # Cash payment - always successful in mock
            return {
                'success': True,
                'transaction_id': transaction_id,
                'message': 'Cash payment processed'
            }
            
        elif payment_method == 'card':
            # Mock card payment validation
            if not payment_details or not payment_details.get('card_number'):
                return {
                    'success': False,
                    'message': 'Card details required'
                }
            
            # Mock validation - fail if test card number 4111111111111111
            card_number = payment_details.get('card_number', '').replace(' ', '')
            if card_number == '4111111111111111':
                return {
                    'success': False,
                    'message': 'Card declined: Test card number'
                }
            
            return {
                'success': True,
                'transaction_id': transaction_id,
                'message': 'Card payment processed'
            }
            
        elif payment_method == 'promptpay':
            # Mock PromptPay payment
            if not payment_details or not payment_details.get('promptpay_id'):
                return {
                    'success': False,
                    'message': 'PromptPay ID required'
                }
            
            # Mock processing delay
            if random.random() < 0.1:  # 10% chance of failure for demo
                return {
                    'success': False,
                    'message': 'PromptPay payment failed'
                }
            
            return {
                'success': True,
                'transaction_id': transaction_id,
                'message': 'PromptPay payment processed'
            }
    
    @staticmethod
    def _award_loyalty_points(order):
        """Award loyalty points for completed order"""
        if not order.customer:
            return
        
        # Calculate points: 1 point per 10 THB
        points_to_award = int(order.total_amount / Decimal('10.0'))
        
        if points_to_award <= 0:
            return
        
        # Get or create membership
        membership, created = Membership.objects.get_or_create(
            customer=order.customer,
            defaults={
                'points': 0,
                'tier': 'bronze',
                'total_spent': Decimal('0.00'),
                'visits_count': 0
            }
        )
        
        # Record the purchase
        membership.record_purchase(order.total_amount)
        
        # Add points and create transaction record
        new_balance = membership.add_points(points_to_award)
        
        # Create loyalty transaction
        LoyaltyTransaction.objects.create(
            customer=order.customer,
            order=order,
            transaction_type='earned',
            points=points_to_award,
            description=f'Points earned from order #{order.id}',
            balance_after=new_balance
        )
    
    @staticmethod
    def refund_payment(transaction_id, amount=None, reason=None):
        """Process refund for a transaction"""
        # Mock refund processing
        refund_id = f"REF_{timezone.now().strftime('%Y%m%d')}_{random.randint(100000, 999999)}"
        
        return {
            'success': True,
            'message': 'Refund processed successfully',
            'refund_id': refund_id,
            'original_transaction_id': transaction_id,
            'amount': amount,
            'reason': reason,
            'timestamp': timezone.now().isoformat()
        }
    
    @staticmethod
    def get_payment_status(transaction_id):
        """Get payment status for a transaction"""
        # Mock status check
        return {
            'transaction_id': transaction_id,
            'status': 'completed',  # Always completed in mock
            'timestamp': timezone.now().isoformat(),
            'message': 'Payment completed successfully'
        }