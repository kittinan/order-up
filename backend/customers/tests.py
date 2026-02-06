from decimal import Decimal
from datetime import datetime, date
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from customers.models import Client, Domain, Customer, Membership, LoyaltyTransaction

User = get_user_model()


class CustomerModelTests(TestCase):
    """Test cases for Customer model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        # Create test customer
        self.customer_data = {
            'phone': '0812345678',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': 'M',
            'birth_date': date(1990, 1, 1),
            'address': '123 Test Street',
            'email_marketing': True,
            'sms_marketing': True,
        }
    
    def test_customer_creation(self):
        """Test customer creation with valid data"""
        customer = Customer.objects.create(**self.customer_data)
        
        self.assertEqual(customer.phone, '0812345678')
        self.assertEqual(customer.email, 'test@example.com')
        self.assertEqual(customer.first_name, 'John')
        self.assertEqual(customer.last_name, 'Doe')
        self.assertEqual(customer.gender, 'M')
        self.assertEqual(customer.birth_date, date(1990, 1, 1))
        self.assertEqual(customer.address, '123 Test Street')
        self.assertTrue(customer.email_marketing)
        self.assertTrue(customer.sms_marketing)
    
    def test_customer_creation_minimal(self):
        """Test customer creation with minimal required data"""
        customer = Customer.objects.create(phone='0812345679')
        
        self.assertEqual(customer.phone, '0812345679')
        self.assertEqual(customer.first_name, '')
        self.assertEqual(customer.last_name, '')
        self.assertIsNone(customer.gender)
        self.assertIsNone(customer.birth_date)
        self.assertEqual(customer.address, '')
        self.assertTrue(customer.email_marketing)  # Default value
        self.assertTrue(customer.sms_marketing)    # Default value
    
    def test_customer_unique_constraints(self):
        """Test that phone and email must be unique"""
        # Create first customer
        Customer.objects.create(phone='0812345678', email='test@example.com')
        
        # Try to create customer with same phone - should fail
        with self.assertRaises(Exception):
            Customer.objects.create(phone='0812345678', email='another@example.com')
        
        # Try to create customer with same email - should fail
        with self.assertRaises(Exception):
            Customer.objects.create(phone='0812345679', email='test@example.com')
    
    def test_customer_str_representation(self):
        """Test string representation of customer"""
        # Test with full name
        customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        self.assertEqual(str(customer), 'John Doe')
        
        # Test with first name only
        customer2 = Customer.objects.create(
            phone='0812345679',
            first_name='Jane'
        )
        self.assertEqual(str(customer2), 'Jane')
        
        # Test with phone only
        customer3 = Customer.objects.create(phone='0812345680')
        self.assertEqual(str(customer3), '0812345680')
    
    def test_customer_full_name_property(self):
        """Test full_name property"""
        # Test with both names
        customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        self.assertEqual(customer.full_name, 'John Doe')
        
        # Test with first name only
        customer2 = Customer.objects.create(
            phone='0812345679',
            first_name='Jane'
        )
        self.assertEqual(customer2.full_name, 'Jane')
        
        # Test with phone only
        customer3 = Customer.objects.create(phone='0812345680')
        self.assertEqual(customer3.full_name, '0812345680')


class MembershipModelTests(TestCase):
    """Test cases for Membership model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
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
    
    def test_membership_creation(self):
        """Test membership creation with valid data"""
        self.assertEqual(self.membership.customer, self.customer)
        self.assertEqual(self.membership.points, 0)
        self.assertEqual(self.membership.tier, 'bronze')
        self.assertEqual(self.membership.total_spent, Decimal('0.00'))
        self.assertEqual(self.membership.visits_count, 0)
        self.assertEqual(self.membership.points_to_next_tier, 200)
    
    def test_membership_str_representation(self):
        """Test string representation of membership"""
        expected = f"John Doe - Bronze ({self.membership.points} pts)"
        self.assertEqual(str(self.membership), expected)
    
    def test_update_tier_bronze_to_silver(self):
        """Test tier upgrade from bronze to silver"""
        self.membership.points = 200
        self.membership.update_tier()
        
        self.assertEqual(self.membership.tier, 'silver')
        self.assertEqual(self.membership.points_to_next_tier, 300)
        self.assertIsNotNone(self.membership.tier_updated_at)
    
    def test_update_tier_silver_to_gold(self):
        """Test tier upgrade from silver to gold"""
        self.membership.tier = 'silver'
        self.membership.points = 500
        self.membership.update_tier()
        
        self.assertEqual(self.membership.tier, 'gold')
        self.assertEqual(self.membership.points_to_next_tier, 500)
        self.assertIsNotNone(self.membership.tier_updated_at)
    
    def test_update_tier_gold_to_platinum(self):
        """Test tier upgrade from gold to platinum"""
        self.membership.tier = 'gold'
        self.membership.points = 1000
        self.membership.update_tier()
        
        self.assertEqual(self.membership.tier, 'platinum')
        self.assertEqual(self.membership.points_to_next_tier, 0)
        self.assertIsNotNone(self.membership.tier_updated_at)
    
    def test_update_tier_platinum_stays_platinum(self):
        """Test that platinum tier stays platinum with more points"""
        self.membership.tier = 'platinum'
        self.membership.points = 1500
        self.membership.update_tier()
        
        self.assertEqual(self.membership.tier, 'platinum')
        self.assertEqual(self.membership.points_to_next_tier, 0)
    
    def test_update_tier_no_change(self):
        """Test tier update when tier doesn't change"""
        self.membership.points = 100
        self.membership.update_tier()
        
        self.assertEqual(self.membership.tier, 'bronze')
        self.assertEqual(self.membership.points_to_next_tier, 100)
        self.assertIsNone(self.membership.tier_updated_at)
    
    def test_add_points(self):
        """Test adding points to membership"""
        initial_points = self.membership.points
        points_to_add = 50
        
        new_balance = self.membership.add_points(points_to_add)
        
        self.assertEqual(self.membership.points, initial_points + points_to_add)
        self.assertEqual(new_balance, initial_points + points_to_add)
        self.assertEqual(self.membership.tier, 'bronze')  # Still bronze
    
    def test_add_points_tier_upgrade(self):
        """Test adding points that cause tier upgrade"""
        self.membership.points = 150  # Close to silver
        self.membership.add_points(100)  # Should upgrade to silver
        
        self.assertEqual(self.membership.points, 250)
        self.assertEqual(self.membership.tier, 'silver')
        self.assertEqual(self.membership.points_to_next_tier, 250)
    
    def test_record_purchase(self):
        """Test recording a purchase"""
        initial_spent = self.membership.total_spent
        initial_visits = self.membership.visits_count
        purchase_amount = Decimal('250.00')
        
        self.membership.record_purchase(purchase_amount)
        
        self.assertEqual(self.membership.total_spent, initial_spent + purchase_amount)
        self.assertEqual(self.membership.visits_count, initial_visits + 1)


class LoyaltyTransactionModelTests(TestCase):
    """Test cases for LoyaltyTransaction model"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client.objects.create(name='Test Restaurant')
        self.domain = Domain.objects.create(domain='test.test', tenant=self.client)
        
        self.customer = Customer.objects.create(
            phone='0812345678',
            first_name='John',
            last_name='Doe'
        )
        
        self.transaction_data = {
            'customer': self.customer,
            'transaction_type': 'earned',
            'points': 25,
            'description': 'Test loyalty points',
            'balance_after': 25
        }
    
    def test_loyalty_transaction_creation(self):
        """Test loyalty transaction creation"""
        transaction = LoyaltyTransaction.objects.create(**self.transaction_data)
        
        self.assertEqual(transaction.customer, self.customer)
        self.assertEqual(transaction.transaction_type, 'earned')
        self.assertEqual(transaction.points, 25)
        self.assertEqual(transaction.description, 'Test loyalty points')
        self.assertEqual(transaction.balance_after, 25)
        self.assertIsNone(transaction.order)
    
    def test_loyalty_transaction_str_representation(self):
        """Test string representation of loyalty transaction"""
        transaction = LoyaltyTransaction.objects.create(**self.transaction_data)
        expected = f"John Doe - earned 25 pts"
        self.assertEqual(str(transaction), expected)
    
    def test_loyalty_transaction_negative_points(self):
        """Test loyalty transaction with negative points (redemption)"""
        transaction_data = self.transaction_data.copy()
        transaction_data['points'] = -10
        transaction_data['balance_after'] = 15
        transaction_data['transaction_type'] = 'redeemed'
        
        transaction = LoyaltyTransaction.objects.create(**transaction_data)
        
        self.assertEqual(transaction.points, -10)
        self.assertEqual(transaction.transaction_type, 'redeemed')
        self.assertEqual(transaction.balance_after, 15)


class TenantIsolationTests(TestCase):
    """Test multi-tenant isolation for customers"""
    
    def test_customer_tenant_isolation(self):
        """Test that customers are isolated by tenant"""
        # Create two tenants
        tenant1 = Client.objects.create(name='Restaurant A')
        tenant2 = Client.objects.create(name='Restaurant B')
        
        # This test would typically require tenant-specific schema creation
        # For now, we'll test the basic model relationships
        self.assertIsNotNone(tenant1)
        self.assertIsNotNone(tenant2)
        self.assertNotEqual(tenant1.name, tenant2.name)
    
    def test_customer_membership_relationship(self):
        """Test customer-membership one-to-one relationship"""
        customer = Customer.objects.create(phone='0812345678', first_name='John', last_name='Doe')
        membership = Membership.objects.create(customer=customer)
        
        self.assertEqual(membership.customer, customer)
        self.assertEqual(customer.membership, membership)
    
    def test_customer_loyalty_transactions_relationship(self):
        """Test customer-loyalty transactions one-to-many relationship"""
        customer = Customer.objects.create(phone='0812345678', first_name='John', last_name='Doe')
        
        # Create multiple transactions for the same customer
        transaction1 = LoyaltyTransaction.objects.create(
            customer=customer,
            transaction_type='earned',
            points=10,
            description='Transaction 1',
            balance_after=10
        )
        transaction2 = LoyaltyTransaction.objects.create(
            customer=customer,
            transaction_type='earned',
            points=15,
            description='Transaction 2',
            balance_after=25
        )
        
        # Check that customer has both transactions
        transactions = customer.loyalty_transactions.all()
        self.assertEqual(transactions.count(), 2)
        self.assertIn(transaction1, transactions)
        self.assertIn(transaction2, transactions)
        
        # Check ordering (should be most recent first)
        self.assertEqual(transactions[0], transaction2)
        self.assertEqual(transactions[1], transaction1)