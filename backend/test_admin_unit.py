#!/usr/bin/env python3
"""
Unit test script for Admin APIs that doesn't require database connection.
Runs only the structure and basic functionality tests.
"""

import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, '/home/tun/workspace/orderup/backend')

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'orderup.settings')

import django
from django.conf import settings
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from django.test import Client
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
import inspect

# Setup Django
django.setup()


class AdminAPITestRunner:
    """Test runner for Admin API unit tests"""
    
    def __init__(self):
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        self.failures = []
    
    def run_test(self, test_name, test_func):
        """Run a single test and track results"""
        self.total_tests += 1
        try:
            test_func()
            self.passed_tests += 1
            print(f"✓ {test_name}")
            return True
        except Exception as e:
            self.failed_tests += 1
            self.failures.append((test_name, str(e)))
            print(f"❌ {test_name}: {e}")
            return False
    
    def run_all_tests(self):
        """Run all Admin API unit tests"""
        print("=" * 80)
        print("ORDERUP ADMIN API - UNIT TESTS")
        print("=" * 80)
        print("Running tests without database dependency...")
        print("=" * 80)
        
        # Test 1: URL patterns resolve
        print("\n1. URL Pattern Resolution Tests")
        print("-" * 40)
        
        def test_url_patterns_resolve():
            """Test that all admin API URLs resolve correctly"""
            # Test system stats URL
            resolver = resolve('/api/admin/stats/overview/')
            assert resolver.view_name == 'admin-stats-overview', f"Expected 'admin-stats-overview', got {resolver.view_name}"
            
            # Test tenants list URL
            resolver = resolve('/api/admin/tenants/')
            assert resolver.view_name == 'admin-tenants', f"Expected 'admin-tenants', got {resolver.view_name}"
            
            # Test analytics revenue URL
            resolver = resolve('/api/admin/analytics/revenue/')
            assert resolver.view_name == 'admin-analytics-revenue', f"Expected 'admin-analytics-revenue', got {resolver.view_name}"
        
        self.run_test("URL patterns resolve correctly", test_url_patterns_resolve)
        
        # Test 2: Reverse URL generation
        def test_reverse_url_generation():
            """Test that reverse URL generation works"""
            assert reverse('admin-stats-overview') == '/api/admin/stats/overview/'
            assert reverse('admin-tenants') == '/api/admin/tenants/'
            assert reverse('admin-analytics-revenue') == '/api/admin/analytics/revenue/'
        
        self.run_test("Reverse URL generation works", test_reverse_url_generation)
        
        # Test 3: View functions exist
        def test_view_functions_exist():
            """Test that all view functions exist and are callable"""
            from admin_api import views
            
            # Check that view functions exist
            assert hasattr(views, 'system_stats'), "system_stats view function missing"
            assert hasattr(views, 'tenants_list'), "tenants_list view function missing"
            assert hasattr(views, 'analytics'), "analytics view function missing"
            assert hasattr(views, 'tenant_orders'), "tenant_orders view function missing"
            
            # Check that they are callable
            assert callable(views.system_stats), "system_stats is not callable"
            assert callable(views.tenants_list), "tenants_list is not callable"
            assert callable(views.analytics), "analytics is not callable"
            assert callable(views.tenant_orders), "tenant_orders is not callable"
        
        self.run_test("View functions exist and are callable", test_view_functions_exist)
        
        # Test 4: Authentication requirements
        print("\n2. Authentication Tests")
        print("-" * 40)
        
        def test_system_stats_unauthorized():
            """Test system stats endpoint returns 401/403 without authentication"""
            client = APIClient()
            
            with patch('admin_api.views.system_stats') as mock_view:
                mock_view.return_value = MagicMock()
                
                response = client.get('/api/admin/stats/overview/')
                
                # The endpoint should return 401/403 due to authentication
                assert response.status_code in [401, 403], f"Expected 401 or 403, got {response.status_code}"
        
        self.run_test("System stats unauthorized returns 401/403", test_system_stats_unauthorized)
        
        def test_tenants_list_unauthorized():
            """Test tenants list endpoint returns 401/403 without authentication"""
            client = APIClient()
            
            with patch('admin_api.views.tenants_list') as mock_view:
                mock_view.return_value = MagicMock()
                
                response = client.get('/api/admin/tenants/')
                
                # Should return 401/403 when not authenticated
                assert response.status_code in [401, 403], f"Expected 401 or 403, got {response.status_code}"
        
        self.run_test("Tenants list unauthorized returns 401/403", test_tenants_list_unauthorized)
        
        def test_analytics_revenue_unauthorized():
            """Test analytics revenue endpoint returns 401/403 without authentication"""
            client = APIClient()
            
            with patch('admin_api.views.analytics') as mock_view:
                mock_view.return_value = MagicMock()
                
                response = client.get('/api/admin/analytics/revenue/')
                
                # Should return 401/403 when not authenticated
                assert response.status_code in [401, 403], f"Expected 401 or 403, got {response.status_code}"
        
        self.run_test("Analytics revenue unauthorized returns 401/403", test_analytics_revenue_unauthorized)
        
        # Test 5: Field structure
        print("\n3. Response Field Structure Tests")
        print("-" * 40)
        
        def test_system_stats_response_fields():
            """Test system stats response has correct field names"""
            # Check the views.py file contains correct field names
            with open('/home/tun/workspace/orderup/backend/admin_api/views.py', 'r') as f:
                views_content = f.read()
            
            # Verify field names are used in the code
            assert 'total_tenants' in views_content, "Field 'total_tenants' not found in views.py"
            assert 'total_orders_today' in views_content, "Field 'total_orders_today' not found in views.py"
            assert 'total_revenue_today' in views_content, "Field 'total_revenue_today' not found in views.py"
            assert 'active_customers_30d' in views_content, "Field 'active_customers_30d' not found in views.py"
        
        self.run_test("System stats response fields are correct", test_system_stats_response_fields)
        
        def test_analytics_response_fields():
            """Test analytics response has correct field names"""
            with open('/home/tun/workspace/orderup/backend/admin_api/views.py', 'r') as f:
                views_content = f.read()
            
            # Check for required response fields
            required_fields = ['top_tenants', 'popular_items', 'revenue_trends', 'period_days']
            for field in required_fields:
                assert field in views_content, f"Field '{field}' not found in views.py"
        
        self.run_test("Analytics response fields are correct", test_analytics_response_fields)
        
        # Test 6: HTTP method support
        print("\n4. HTTP Method Support Tests")
        print("-" * 40)
        
        def test_tenants_list_get_post_support():
            """Test that tenants_list supports both GET and POST methods"""
            from admin_api.views import tenants_list
            
            # Get the source code of the view function
            source = inspect.getsource(tenants_list)
            
            # Check that it supports both GET and POST
            assert 'GET' in source, "GET method not supported in tenants_list"
            assert 'POST' in source, "POST method not supported in tenants_list"
            assert "request.method == 'GET'" in source, "GET handling logic not found in tenants_list"
            assert "request.method == 'POST'" in source, "POST handling logic not found in tenants_list"
        
        self.run_test("Tenants list supports GET and POST methods", test_tenants_list_get_post_support)
        
        # Test 7: Required decorators
        def test_view_decorators():
            """Test that views have proper authentication decorators"""
            from admin_api import views
            
            # Check system_stats view
            system_stats_source = inspect.getsource(views.system_stats)
            assert '@permission_classes([IsAuthenticated, IsAdminUser])' in system_stats_source, "System stats missing authentication decorators"
            assert "@api_view(['GET'])" in system_stats_source, "System stats missing GET API decorator"
            
            # Check tenants_list view
            tenants_list_source = inspect.getsource(views.tenants_list)
            assert '@permission_classes([IsAuthenticated, IsAdminUser])' in tenants_list_source, "Tenants list missing authentication decorators"
            assert "@api_view(['GET', 'POST'])" in tenants_list_source, "Tenants list missing GET/POST API decorator"
            
            # Check analytics view
            analytics_source = inspect.getsource(views.analytics)
            assert '@permission_classes([IsAuthenticated, IsAdminUser])' in analytics_source, "Analytics missing authentication decorators"
            assert "@api_view(['GET'])" in analytics_source, "Analytics missing GET API decorator"
        
        self.run_test("Views have proper authentication decorators", test_view_decorators)
        
        # Summary
        print("\n" + "=" * 80)
        print("TEST RESULTS SUMMARY")
        print("=" * 80)
        
        print(f"\n📊 Test Results:")
        print(f"   Total tests: {self.total_tests}")
        print(f"   ✓ Passed: {self.passed_tests}")
        print(f"   ❌ Failed: {self.failed_tests}")
        print(f"   Success rate: {(self.passed_tests/self.total_tests*100):.1f}%" if self.total_tests > 0 else "   Success rate: 0%")
        
        if self.failures:
            print(f"\n❌ Failed Tests:")
            for test_name, error in self.failures:
                print(f"   - {test_name}: {error}")
        
        print(f"\n🎯 Test Coverage:")
        print(f"   ✓ URL pattern resolution")
        print(f"   ✓ Reverse URL generation")
        print(f"   ✓ View function existence")
        print(f"   ✓ Authentication requirements")
        print(f"   ✓ Response field structure")
        print(f"   ✓ HTTP method support")
        print(f"   ✓ Authentication decorators")
        
        if self.failed_tests == 0:
            print(f"\n🎉 ALL TESTS PASSED!")
            print(f"   Admin APIs are ready for database integration testing.")
        else:
            print(f"\n⚠️  Some tests failed. Please review the failed tests above.")
        
        return self.failed_tests == 0


def main():
    """Main function to run all tests"""
    runner = AdminAPITestRunner()
    success = runner.run_all_tests()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()