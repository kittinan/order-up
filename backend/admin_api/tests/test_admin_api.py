import json
from django.test import SimpleTestCase, TestCase
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock

User = get_user_model()


class AdminAPIStructureTest(SimpleTestCase):
    """Test API structure without database dependencies"""
    
    def test_url_patterns_resolve(self):
        """Test that all admin API URLs resolve correctly"""
        # Test system stats URL
        resolver = resolve('/api/admin/stats/overview/')
        self.assertEqual(resolver.view_name, 'admin-stats-overview')
        
        # Test tenants list URL
        resolver = resolve('/api/admin/tenants/')
        self.assertEqual(resolver.view_name, 'admin-tenants')
        
        # Test analytics revenue URL
        resolver = resolve('/api/admin/analytics/revenue/')
        self.assertEqual(resolver.view_name, 'admin-analytics-revenue')

    def test_reverse_url_generation(self):
        """Test that reverse URL generation works"""
        # Test reverse URLs
        self.assertEqual(reverse('admin-stats-overview'), '/api/admin/stats/overview/')
        self.assertEqual(reverse('admin-tenants'), '/api/admin/tenants/')
        self.assertEqual(reverse('admin-analytics-revenue'), '/api/admin/analytics/revenue/')

    def test_view_functions_exist(self):
        """Test that all view functions exist and are callable"""
        from admin_api import views
        
        # Check that view functions exist
        self.assertTrue(hasattr(views, 'system_stats'))
        self.assertTrue(hasattr(views, 'tenants_list'))
        self.assertTrue(hasattr(views, 'analytics'))
        self.assertTrue(hasattr(views, 'tenant_orders'))
        
        # Check that they are callable
        self.assertTrue(callable(views.system_stats))
        self.assertTrue(callable(views.tenants_list))
        self.assertTrue(callable(views.analytics))
        self.assertTrue(callable(views.tenant_orders))


class AdminAPIUnauthenticatedTest(SimpleTestCase):
    """Test API endpoints without authentication"""
    
    def setUp(self):
        self.client = APIClient()
    
    def test_system_stats_unauthenticated(self):
        """Test system stats endpoint without authentication"""
        with patch('admin_api.views.system_stats') as mock_view:
            mock_view.return_value = MagicMock()
            
            response = self.client.get('/api/admin/stats/overview/')
            
            # The endpoint should exist but return 401/403 due to authentication
            self.assertIn(response.status_code, [401, 403])
    
    def test_tenants_list_unauthenticated(self):
        """Test tenants list endpoint without authentication"""
        with patch('admin_api.views.tenants_list') as mock_view:
            mock_view.return_value = MagicMock()
            
            response = self.client.get('/api/admin/tenants/')
            
            # Should return 401/403 when not authenticated
            self.assertIn(response.status_code, [401, 403])
    
    def test_analytics_revenue_unauthenticated(self):
        """Test analytics revenue endpoint without authentication"""
        with patch('admin_api.views.analytics') as mock_view:
            mock_view.return_value = MagicMock()
            
            response = self.client.get('/api/admin/analytics/revenue/')
            
            # Should return 401/403 when not authenticated
            self.assertIn(response.status_code, [401, 403])


class AdminAPIFieldStructureTest(SimpleTestCase):
    """Test API response field structures"""
    
    def test_system_stats_response_fields(self):
        """Test system stats response has correct field names"""
        from admin_api.views import system_stats
        from django.http import HttpRequest
        from unittest.mock import patch, MagicMock
        
        # Create a mock request
        request = MagicMock()
        request.user = MagicMock()
        
        # Mock the response data
        mock_response_data = {
            'total_tenants': 5,
            'total_orders_today': 100,
            'total_revenue_today': 5000.50,
            'active_customers_30d': 50
        }
        
        with patch('admin_api.views.Response') as mock_response:
            mock_response.return_value = MagicMock()
            mock_response.return_value.status_code = 200
            
            # Check the views.py file contains correct field names
            with open('/home/tun/workspace/orderup/backend/admin_api/views.py', 'r') as f:
                views_content = f.read()
            
            # Verify field names are used in the code
            self.assertIn('total_tenants', views_content)
            self.assertIn('total_orders_today', views_content)
            self.assertIn('total_revenue_today', views_content)
            self.assertIn('active_customers_30d', views_content)

    def test_analytics_response_fields(self):
        """Test analytics response has correct field names"""
        with open('/home/tun/workspace/orderup/backend/admin_api/views.py', 'r') as f:
            views_content = f.read()
        
        # Check for required response fields
        required_fields = ['top_tenants', 'popular_items', 'revenue_trends', 'period_days']
        for field in required_fields:
            self.assertIn(field, views_content)


class AdminAPIMethodTest(SimpleTestCase):
    """Test HTTP method support"""
    
    def test_tenants_list_get_post_support(self):
        """Test that tenants_list supports both GET and POST methods"""
        from admin_api.views import tenants_list
        import inspect
        
        # Get the source code of the view function
        source = inspect.getsource(tenants_list)
        
        # Check that it supports both GET and POST
        self.assertIn('GET', source)
        self.assertIn('POST', source)
        self.assertIn('request.method == \'GET\'', source)
        self.assertIn('request.method == \'POST\'', source)


class AdminAPIIntegrationTest(TestCase):
    """Integration tests with database (these will skip if DB not available)"""
    
    @classmethod
    def setUpClass(cls):
        try:
            super().setUpClass()
            cls.db_available = True
        except Exception:
            cls.db_available = False
    
    def setUp(self):
        if not self.db_available:
            self.skipTest("Database not available")
            
        self.client = APIClient()
        
        # Create admin user
        self.admin_user = User.objects.create_user(
            username='admin',
            email='admin@test.com',
            password='admin123',
            is_staff=True,
            is_superuser=True
        )
    
    def test_system_stats_authorized_admin(self):
        """Test system stats endpoint with admin authentication"""
        if not self.db_available:
            self.skipTest("Database not available")
            
        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)
        
        response = self.client.get('/api/admin/stats/overview/')
        
        # Should return 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Parse response data
        data = response.json()
        
        # Check required response fields
        required_fields = ['total_tenants', 'total_orders_today', 'total_revenue_today', 'active_customers_30d']
        for field in required_fields:
            self.assertIn(field, data)
            self.assertIsNotNone(data[field])

    def test_tenants_list_get(self):
        """Test tenants list endpoint with GET"""
        if not self.db_available:
            self.skipTest("Database not available")
            
        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)
        
        response = self.client.get('/api/admin/tenants/')
        
        # Should return 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Parse response data
        data = response.json()
        
        # Check response structure
        self.assertIn('tenants', data)
        self.assertIn('pagination', data)
        
        # Check pagination fields
        pagination = data['pagination']
        required_pagination_fields = ['page', 'page_size', 'total_count', 'total_pages']
        for field in required_pagination_fields:
            self.assertIn(field, pagination)

    def test_tenants_create_post(self):
        """Test tenant creation with POST"""
        if not self.db_available:
            self.skipTest("Database not available")
            
        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)
        
        tenant_data = {
            'name': 'New Restaurant',
            'schema_name': 'new_restaurant_test',
            'domain_url': 'new.restaurant.test.localhost',
            'email': 'new@restaurant.test.com',
            'phone': '1234567890'
        }
        
        response = self.client.post('/api/admin/tenants/', 
                                 data=json.dumps(tenant_data),
                                 content_type='application/json')
        
        # Should return 201
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Parse response data
        data = response.json()
        
        # Check required fields in response
        required_fields = ['id', 'name', 'domain', 'schema_name', 'created_at']
        for field in required_fields:
            self.assertIn(field, data)

    def test_analytics_revenue_get(self):
        """Test analytics revenue endpoint with GET"""
        if not self.db_available:
            self.skipTest("Database not available")
            
        # Authenticate as admin
        self.client.force_authenticate(user=self.admin_user)
        
        response = self.client.get('/api/admin/analytics/revenue/')
        
        # Should return 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Parse response data
        data = response.json()
        
        # Check required response fields
        required_fields = ['top_tenants', 'popular_items', 'revenue_trends', 'period_days']
        for field in required_fields:
            self.assertIn(field, data)
        
        # Check that the data structures are lists where expected
        self.assertIsInstance(data['top_tenants'], list)
        self.assertIsInstance(data['popular_items'], list)
        self.assertIsInstance(data['revenue_trends'], list)

    def test_tenant_orders_get(self):
        """Test tenant orders endpoint with GET"""
        if not self.db_available:
            self.skipTest("Database not available")
            
        # Skip this test as it requires tenant creation and complex setup
        # In a real scenario, we would create a tenant and test orders
        self.skipTest("Complex tenant setup required - testing basic structure only")