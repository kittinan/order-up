from decimal import Decimal
from datetime import datetime, timedelta
from django.test import TestCase
from django.utils import timezone
from django.db import transaction
from customers.models import Client, Domain, Customer, Membership, LoyaltyTransaction
from orders.models import Order, OrderItem, OrderItemModifier
from orders.services import PaymentService
from store.models import Category, Item, ModifierGroup, ModifierOption, Table


class OrderModelTests(TestCase):
    """Test cases for Order model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test customer
        self.customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        
        # Create test table
        self.table = Table.objects.create(
            name='Table 1',
            capacity=4,
            status='available'
        )
        
        # Create test category and item
        self.category = Category.objects.create(name='Main Course')
        self.item = Item.objects.create(
            category=self.category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        
        # Create test order data
        self.order_data = {
            'customer_name': 'John Doe',
            'customer_phone': '0812345678',
            'total_amount': Decimal('150.00'),
            'status': 'pending',
            'payment_status': 'pending',
            'delivery_address': '123 Test Street'
        }
    
    def test_order_creation(self):
        """Test order creation with valid data"""
        order = Order.objects.create(**self.order_data)
        
        self.assertEqual(order.customer_name, 'John Doe')
        self.assertEqual(order.customer_phone, '0812345678')
        self.assertEqual(order.total_amount, Decimal('150.00'))
        self.assertEqual(order.status, 'pending')
        self.assertEqual(order.payment_status, 'pending')
        self.assertEqual(order.delivery_address, '123 Test Street')
    
    def test_order_creation_with_customer(self):
        """Test order creation with customer relationship"""
        order_data = self.order_data.copy()
        order_data['customer'] = self.customer
        
        order = Order.objects.create(**order_data)
        
        self.assertEqual(order.customer, self.customer)
        self.assertEqual(order.customer_name, 'John Doe')
        self.assertEqual(order.customer_phone, '0812345678')
    
    def test_order_creation_with_table(self):
        """Test order creation with table relationship"""
        order_data = self.order_data.copy()
        order_data['table'] = self.table
        
        order = Order.objects.create(**order_data)
        
        self.assertEqual(order.table, self.table)
    
    def test_order_str_representation(self):
        """Test string representation of order"""
        order = Order.objects.create(**self.order_data)
        expected = f"Order {order.id} - John Doe (pending)"
        self.assertEqual(str(order), expected)
    
    def test_order_status_choices(self):
        """Test valid order status choices"""
        valid_statuses = ['pending', 'preparing', 'completed', 'cancelled']
        
        for status in valid_statuses:
            order = Order.objects.create(
                customer_name='Test Customer',
                total_amount=Decimal('100.00'),
                status=status
            )
            self.assertEqual(order.status, status)
    
    def test_payment_status_choices(self):
        """Test valid payment status choices"""
        valid_statuses = ['pending', 'paid', 'failed', 'refunded']
        
        for status in valid_statuses:
            order = Order.objects.create(
                customer_name='Test Customer',
                total_amount=Decimal('100.00'),
                payment_status=status
            )
            self.assertEqual(order.payment_status, status)
    
    def test_payment_method_choices(self):
        """Test valid payment method choices"""
        valid_methods = ['cash', 'card', 'promptpay']
        
        for method in valid_methods:
            order = Order.objects.create(
                customer_name='Test Customer',
                total_amount=Decimal('100.00'),
                payment_method=method
            )
            self.assertEqual(order.payment_method, method)


class OrderItemModelTests(TestCase):
    """Test cases for OrderItem model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test category and item
        self.category = Category.objects.create(name='Main Course')
        self.item = Item.objects.create(
            category=self.category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        
        # Create test order
        self.order = Order.objects.create(
            customer_name='John Doe',
            total_amount=Decimal('150.00')
        )
        
        # Create test modifier option
        self.modifier_group = ModifierGroup.objects.create(
            item=self.item,
            name='Size',
            min_selection=1,
            max_selection=1
        )
        self.modifier_option = ModifierOption.objects.create(
            group=self.modifier_group,
            name='Large',
            price_adjustment=Decimal('20.00')
        )
    
    def test_order_item_creation(self):
        """Test order item creation"""
        order_item = OrderItem.objects.create(
            order=self.order,
            item=self.item,
            quantity=2,
            unit_price=Decimal('150.00')
        )
        
        self.assertEqual(order_item.order, self.order)
        self.assertEqual(order_item.item, self.item)
        self.assertEqual(order_item.quantity, 2)
        self.assertEqual(order_item.unit_price, Decimal('150.00'))
    
    def test_order_item_total_price(self):
        """Test total_price property calculation"""
        order_item = OrderItem.objects.create(
            order=self.order,
            item=self.item,
            quantity=3,
            unit_price=Decimal('150.00')
        )
        
        expected_total = Decimal('450.00')  # 3 * 150
        self.assertEqual(order_item.total_price, expected_total)
    
    def test_order_item_str_representation(self):
        """Test string representation of order item"""
        order_item = OrderItem.objects.create(
            order=self.order,
            item=self.item,
            quantity=2,
            unit_price=Decimal('150.00')
        )
        
        expected = f"2x {self.item.name} in Order {self.order.id}"
        self.assertEqual(str(order_item), expected)


class OrderItemModifierModelTests(TestCase):
    """Test cases for OrderItemModifier model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test category, item, and order
        self.category = Category.objects.create(name='Main Course')
        self.item = Item.objects.create(
            category=self.category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        self.order = Order.objects.create(
            customer_name='John Doe',
            total_amount=Decimal('150.00')
        )
        
        # Create test modifier option
        self.modifier_group = ModifierGroup.objects.create(
            item=self.item,
            name='Size',
            min_selection=1,
            max_selection=1
        )
        self.modifier_option = ModifierOption.objects.create(
            group=self.modifier_group,
            name='Large',
            price_adjustment=Decimal('20.00')
        )
        
        # Create test order item
        self.order_item = OrderItem.objects.create(
            order=self.order,
            item=self.item,
            quantity=1,
            unit_price=Decimal('150.00')
        )
    
    def test_order_item_modifier_creation(self):
        """Test order item modifier creation"""
        modifier = OrderItemModifier.objects.create(
            order_item=self.order_item,
            modifier_option=self.modifier_option,
            quantity=1,
            price_adjustment=Decimal('20.00')
        )
        
        self.assertEqual(modifier.order_item, self.order_item)
        self.assertEqual(modifier.modifier_option, self.modifier_option)
        self.assertEqual(modifier.quantity, 1)
        self.assertEqual(modifier.price_adjustment, Decimal('20.00'))
    
    def test_order_item_modifier_total_price(self):
        """Test total_price property calculation"""
        modifier = OrderItemModifier.objects.create(
            order_item=self.order_item,
            modifier_option=self.modifier_option,
            quantity=2,
            price_adjustment=Decimal('20.00')
        )
        
        expected_total = Decimal('40.00')  # 2 * 20
        self.assertEqual(modifier.total_price, expected_total)
    
    def test_order_item_modifier_str_representation(self):
        """Test string representation of order item modifier"""
        modifier = OrderItemModifier.objects.create(
            order_item=self.order_item,
            modifier_option=self.modifier_option,
            quantity=1,
            price_adjustment=Decimal('20.00')
        )
        
        expected = f"1x {self.modifier_option.name} for OrderItem {self.order_item.id}"
        self.assertEqual(str(modifier), expected)


class PaymentServiceTests(TestCase):
    """Test cases for PaymentService"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test customer and membership
        self.customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        self.membership = Membership.objects.create(
            customer=self.customer,
            points=0,
            tier='bronze',
            total_spent=Decimal('0.00'),
            visits_count=0
        )
        
        # Create test category and item
        self.category = Category.objects.create(name='Main Course')
        self.item = Item.objects.create(
            category=self.category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        
        # Create test order
        self.order = Order.objects.create(
            customer_name='John Doe',
            customer_phone='0812345678',
            total_amount=Decimal('150.00'),
            status='pending',
            payment_status='pending',
            customer=self.customer
        )
    
    def test_payment_service_cash_payment_success(self):
        """Test successful cash payment processing"""
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['payment_method'], 'cash')
        self.assertEqual(result['amount'], float(self.order.total_amount))
        self.assertIn('transaction_id', result)
        
        # Refresh order from database
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'paid')
        self.assertEqual(self.order.status, 'preparing')
        self.assertEqual(self.order.payment_method, 'cash')
    
    def test_payment_service_card_payment_success(self):
        """Test successful card payment processing"""
        payment_details = {
            'card_number': '4111111111111112'  # Valid card (not the test fail card)
        }
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='card',
            payment_details=payment_details
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['payment_method'], 'card')
        
        # Refresh order from database
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'paid')
        self.assertEqual(self.order.payment_method, 'card')
    
    def test_payment_service_card_payment_fail_test_card(self):
        """Test card payment failure with test card number"""
        payment_details = {
            'card_number': '4111111111111111'  # Test fail card
        }
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='card',
            payment_details=payment_details
        )
        
        self.assertFalse(result['success'])
        self.assertIn('Card declined', result['message'])
        
        # Order should remain unchanged
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'pending')
        self.assertEqual(self.order.status, 'pending')
    
    def test_payment_service_card_payment_missing_details(self):
        """Test card payment failure with missing card details"""
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='card'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('Card details required', result['message'])
    
    def test_payment_service_promptpay_payment_success(self):
        """Test successful PromptPay payment processing"""
        payment_details = {
            'promptpay_id': '0812345678'
        }
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='promptpay',
            payment_details=payment_details
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['payment_method'], 'promptpay')
        
        # Refresh order from database
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'paid')
        self.assertEqual(self.order.payment_method, 'promptpay')
    
    def test_payment_service_promptpay_payment_missing_details(self):
        """Test PromptPay payment failure with missing details"""
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='promptpay'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('PromptPay ID required', result['message'])
    
    def test_payment_service_invalid_payment_method(self):
        """Test payment processing with invalid payment method"""
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='invalid_method'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('Invalid payment method', result['message'])
    
    def test_payment_service_order_not_pending(self):
        """Test payment processing for non-pending order"""
        # Change order status to preparing
        self.order.status = 'preparing'
        self.order.save()
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('not in pending status', result['message'])
    
    def test_payment_service_already_paid(self):
        """Test payment processing for already paid order"""
        # Mark order as paid
        self.order.payment_status = 'paid'
        self.order.save()
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('already paid', result['message'])
    
    def test_payment_service_order_not_found(self):
        """Test payment processing for non-existent order"""
        result = PaymentService.process_payment(
            order_id=99999,  # Non-existent order ID
            payment_method='cash'
        )
        
        self.assertFalse(result['success'])
        self.assertIn('not found', result['message'])
    
    def test_loyalty_points_awarded(self):
        """Test that loyalty points are awarded for payment"""
        initial_points = self.membership.points
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        
        # Refresh membership from database
        self.membership.refresh_from_db()
        
        # 150 THB / 10 = 15 points
        expected_points = initial_points + 15
        self.assertEqual(self.membership.points, expected_points)
        self.assertEqual(self.membership.total_spent, Decimal('150.00'))
        self.assertEqual(self.membership.visits_count, 1)
    
    def test_loyalty_transaction_created(self):
        """Test that loyalty transaction is created for payment"""
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        
        # Check that loyalty transaction was created
        transaction = LoyaltyTransaction.objects.get(
            customer=self.customer,
            order=self.order,
            transaction_type='earned'
        )
        
        self.assertEqual(transaction.points, 15)  # 150 THB / 10
        self.assertEqual(transaction.balance_after, 15)
        self.assertIn(f'order #{self.order.id}', transaction.description)
    
    def test_loyalty_points_no_customer(self):
        """Test payment processing without customer (no loyalty points)"""
        # Create order without customer
        order_no_customer = Order.objects.create(
            customer_name='Anonymous Customer',
            total_amount=Decimal('100.00'),
            status='pending',
            payment_status='pending'
        )
        
        result = PaymentService.process_payment(
            order_id=order_no_customer.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        
        # No loyalty transaction should be created
        self.assertFalse(LoyaltyTransaction.objects.filter(
            order=order_no_customer
        ).exists())
    
    def test_refund_payment(self):
        """Test refund processing"""
        transaction_id = 'TXN_20240206_123456'
        amount = Decimal('150.00')
        reason = 'Customer request'
        
        result = PaymentService.refund_payment(
            transaction_id=transaction_id,
            amount=amount,
            reason=reason
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['original_transaction_id'], transaction_id)
        self.assertEqual(result['amount'], amount)
        self.assertEqual(result['reason'], reason)
        self.assertIn('refund_id', result)
    
    def test_get_payment_status(self):
        """Test payment status check"""
        transaction_id = 'TXN_20240206_123456'
        
        result = PaymentService.get_payment_status(transaction_id)
        
        self.assertEqual(result['transaction_id'], transaction_id)
        self.assertEqual(result['status'], 'completed')
        self.assertIn('timestamp', result)
    
    def test_order_with_items_payment(self):
        """Test payment processing for order with items"""
        # Create order items
        order_item = OrderItem.objects.create(
            order=self.order,
            item=self.item,
            quantity=2,
            unit_price=Decimal('150.00')
        )
        
        # Update order total to match items
        self.order.total_amount = Decimal('300.00')  # 2 * 150
        self.order.save()
        
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['amount'], 300.0)
        
        # Check loyalty points: 300 THB / 10 = 30 points
        self.membership.refresh_from_db()
        self.assertEqual(self.membership.points, 30)
        self.assertEqual(self.membership.total_spent, Decimal('300.00'))


class OrderWorkflowTests(TestCase):
    """Test cases for order status workflow"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test customer
        self.customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        self.membership = Membership.objects.create(
            customer=self.customer,
            points=0,
            tier='bronze',
            total_spent=Decimal('0.00'),
            visits_count=0
        )
        
        # Create test category and item
        self.category = Category.objects.create(name='Main Course')
        self.item = Item.objects.create(
            category=self.category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        
        # Create test order
        self.order = Order.objects.create(
            customer_name='John Doe',
            total_amount=Decimal('150.00'),
            status='pending',
            payment_status='pending',
            customer=self.customer
        )
    
    def test_order_status_transition_pending_to_preparing(self):
        """Test order status transition from pending to preparing"""
        # Process payment to change status
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        
        # Refresh order from database
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, 'preparing')
        self.assertEqual(self.order.payment_status, 'paid')
    
    def test_order_status_manual_update(self):
        """Test manual order status updates"""
        # Update status to preparing
        self.order.status = 'preparing'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, 'preparing')
        
        # Update status to completed
        self.order.status = 'completed'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, 'completed')
        
        # Update status to cancelled
        self.order.status = 'cancelled'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, 'cancelled')
    
    def test_order_payment_status_workflow(self):
        """Test payment status workflow"""
        # Initial status
        self.assertEqual(self.order.payment_status, 'pending')
        
        # Process payment
        result = PaymentService.process_payment(
            order_id=self.order.id,
            payment_method='cash'
        )
        
        self.assertTrue(result['success'])
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'paid')
        
        # Manually set to failed
        self.order.payment_status = 'failed'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'failed')
        
        # Manually set to refunded
        self.order.payment_status = 'refunded'
        self.order.save()
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, 'refunded')


class MultiTenantOrderTests(TestCase):
    """Test multi-tenant isolation for orders"""
    
    def test_order_tenant_relationships(self):
        """Test order relationships with tenant models"""
        # Create test data
        customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        
        category = Category.objects.create(name='Main Course')
        item = Item.objects.create(
            category=category,
            name='Test Dish',
            price=Decimal('150.00')
        )
        
        table = Table.objects.create(
            name='Table 1',
            capacity=4
        )
        
        # Create order with relationships
        order = Order.objects.create(
            customer_name='John Doe',
            total_amount=Decimal('150.00'),
            customer=customer,
            table=table
        )
        
        # Test relationships
        self.assertEqual(order.customer, customer)
        self.assertEqual(order.table, table)
        
        # Create order item
        order_item = OrderItem.objects.create(
            order=order,
            item=item,
            quantity=1,
            unit_price=Decimal('150.00')
        )
        
        self.assertEqual(order_item.order, order)
        self.assertEqual(order_item.item, item)
    
    def test_order_with_session_id(self):
        """Test order creation with session ID"""
        session_id = 'test_session_12345'
        
        order = Order.objects.create(
            customer_name='Anonymous Customer',
            total_amount=Decimal('100.00'),
            session_id=session_id
        )
        
        self.assertEqual(order.session_id, session_id)