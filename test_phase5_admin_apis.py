#!/usr/bin/env python3
"""
Test script for Phase 5: Admin Dashboard APIs
This script validates the Admin Dashboard API endpoints implementation.
"""

import os
import sys
import django
import json
import requests
import time
from datetime import datetime, timedelta
from django.conf import settings
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

# Add the backend directory to Python path
sys.path.insert(0, '/home/tun/workspace/orderup/backend')

# Configure Django settings
# if not settings.configured:
#     settings.configure(
#         DEBUG=True,
#         DATABASES={
#             'default': {
#                 'ENGINE': 'django.db.backends.sqlite3',
#                 'NAME': ':memory:',
#             }
#         },
#         INSTALLED_APPS=[
#             'django.contrib.auth',
#             'django.contrib.contenttypes',
#             'rest_framework',
#             'customers',
#             'orders',
#             'store',
#             'qrcodes',
#         ],
#         SECRET_KEY='test-secret-key-for-phase5-admin',
#         USE_TZ=True,
#         REST_FRAMEWORK={
#             'DEFAULT_AUTHENTICATION_CLASSES': [
#                 'rest_framework.authentication.SessionAuthentication',
#                 'rest_framework.authentication.TokenAuthentication',
#             ],
#             'DEFAULT_PERMISSION_CLASSES': [
#                 'rest_framework.permissions.IsAuthenticated',
#             ],
#         }
#     )

django.setup()

def test_admin_api_endpoints():
    """Test Admin Dashboard API endpoints"""
    print("=" * 60)
    print("PHASE 5: ADMIN DASHBOARD APIS - TESTING")
    print("=" * 60)
    
    User = get_user_model()
    client = APIClient()
    
    print("\n1. Testing System Statistics API...")
    print("-" * 40)
    
    # Create super admin user
    try:
        superuser = User.objects.create_superuser(
            username='admin',
            email='admin@test.com',
            password='admin123'
        )
        print(f"✓ Super admin user created: {superuser.username}")
    except Exception as e:
        print(f"ℹ Super admin user exists or error: {e}")
        superuser = User.objects.filter(username='admin').first()
    
    # Test unauthenticated access
    print("Testing unauthenticated access...")
    response = client.get('/api/admin/stats/overview/')
    if response.status_code == status.HTTP_401_UNAUTHORIZED:
        print("✓ Unauthenticated access properly blocked")
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Endpoint not found - implementation pending")
    else:
        print(f"⚠ Unexpected status: {response.status_code}")
    
    # Test authenticated non-admin access
    print("Testing authenticated non-admin access...")
    regular_user = User.objects.create_user(
        username='user',
        email='user@test.com',
        password='user123'
    )
    client.force_authenticate(user=regular_user)
    response = client.get('/api/admin/stats/overview/')
    if response.status_code == status.HTTP_403_FORBIDDEN:
        print("✓ Non-admin access properly blocked")
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Endpoint not found - implementation pending")
    else:
        print(f"⚠ Unexpected status: {response.status_code}")
    
    # Test super admin access
    print("Testing super admin access...")
    client.force_authenticate(user=superuser)
    response = client.get('/api/admin/stats/overview/')
    
    if response.status_code == status.HTTP_200_OK:
        print("✓ Super admin access granted")
        
        # Validate response structure
        try:
            data = response.json()
            expected_fields = ['total_tenants', 'active_tenants', 'total_orders_today', 
                            'total_revenue_today', 'total_customers', 'active_customers_30d']
            
            missing_fields = [field for field in expected_fields if field not in data]
            if not missing_fields:
                print("✓ Response structure valid")
                print(f"✓ Data received: {data}")
            else:
                print(f"⚠ Missing fields in response: {missing_fields}")
                
        except json.JSONDecodeError:
            print("⚠ Invalid JSON response")
            
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Admin stats endpoint not found - implementation pending")
        print("   Expected endpoint: /api/admin/stats/overview/")
    else:
        print(f"⚠ Unexpected status: {response.status_code}")
    
    print("\n2. Testing Tenant Management API...")
    print("-" * 40)
    
    # Test tenant listing
    response = client.get('/api/admin/tenants/')
    if response.status_code == status.HTTP_200_OK:
        print("✓ Tenant listing endpoint accessible")
        try:
            data = response.json()
            if isinstance(data, list) or (isinstance(data, dict) and 'results' in data):
                print("✓ Tenant listing response structure valid")
            else:
                print("⚠ Unexpected tenant listing response structure")
        except json.JSONDecodeError:
            print("⚠ Invalid JSON response from tenant listing")
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Tenant management endpoint not found - implementation pending")
        print("   Expected endpoint: /api/admin/tenants/")
    else:
        print(f"⚠ Unexpected status for tenant listing: {response.status_code}")
    
    # Test tenant creation
    tenant_data = {
        'name': 'Test Restaurant',
        'domain': 'testrestaurant',
        'schema_name': 'testrestaurant',
        'email': 'info@testrestaurant.com',
        'phone': '0812345678'
    }
    
    response = client.post('/api/admin/tenants/', tenant_data, format='json')
    if response.status_code in [status.HTTP_201_CREATED, status.HTTP_200_OK]:
        print("✓ Tenant creation endpoint functional")
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Tenant creation endpoint not found")
    else:
        print(f"⚠ Tenant creation status: {response.status_code}")
    
    print("\n3. Testing Revenue Analytics API...")
    print("-" * 40)
    
    # Test revenue analytics
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=30)
    
    response = client.get(f'/api/admin/analytics/revenue/?start_date={start_date}&end_date={end_date}')
    if response.status_code == status.HTTP_200_OK:
        print("✓ Revenue analytics endpoint accessible")
        try:
            data = response.json()
            expected_fields = ['total_revenue', 'order_count', 'average_order_value']
            
            missing_fields = [field for field in expected_fields if field not in data]
            if not missing_fields:
                print("✓ Revenue analytics response structure valid")
            else:
                print(f"⚠ Missing fields in revenue response: {missing_fields}")
                
        except json.JSONDecodeError:
            print("⚠ Invalid JSON response from revenue analytics")
    elif response.status_code == status.HTTP_404_NOT_FOUND:
        print("⚠ Revenue analytics endpoint not found - implementation pending")
        print("   Expected endpoint: /api/admin/analytics/revenue/")
    else:
        print(f"⚠ Revenue analytics status: {response.status_code}")

def test_admin_ui_components():
    """Test Admin Dashboard UI components availability"""
    print("\n4. Testing Admin UI Components...")
    print("-" * 40)
    
    # Check if admin dashboard route exists
    print("Testing admin dashboard route availability...")
    try:
        from django.urls import resolve
        try:
            resolve('/admin/dashboard/')
            print("✓ Admin dashboard route configured")
        except:
            print("⚠ Admin dashboard route not found")
    except ImportError:
        print("ℹ URL resolution not available in test mode")
    
    # Check for admin templates
    admin_templates = [
        'admin/dashboard.html',
        'admin/tenants.html', 
        'admin/analytics.html',
        'admin/base.html'
    ]
    
    print("Checking admin templates...")
    templates_dir = '/home/tun/workspace/orderup/frontend/src/templates'
    if os.path.exists(templates_dir):
        for template in admin_templates:
            template_path = os.path.join(templates_dir, template)
            if os.path.exists(template_path):
                print(f"✓ Template exists: {template}")
            else:
                print(f"⚠ Template missing: {template}")
    else:
        print("⚠ Templates directory not found")
    
    # Check for admin React components
    components_dir = '/home/tun/workspace/orderup/frontend/components'
    admin_components = [
        'AdminDashboard.js',
        'TenantManagement.js',
        'AnalyticsCharts.js',
        'AdminLayout.js'
    ]
    
    print("Checking admin React components...")
    if os.path.exists(components_dir):
        for component in admin_components:
            component_path = os.path.join(components_dir, component)
            if os.path.exists(component_path):
                print(f"✓ Component exists: {component}")
            else:
                print(f"⚠ Component missing: {component}")
    else:
        print("ℹ Components directory not checked (frontend may be built)")

def test_ci_cd_pipeline():
    """Test CI/CD Pipeline configuration"""
    print("\n5. Testing CI/CD Pipeline...")
    print("-" * 40)
    
    ci_config_path = '/home/tun/workspace/orderup/.github/workflows/ci.yml'
    
    if os.path.exists(ci_config_path):
        print("✓ CI/CD workflow file exists")
        
        with open(ci_config_path, 'r') as f:
            ci_config = f.read()
            
        # Check for required jobs
        required_jobs = ['backend-test', 'frontend-test', 'docker-build']
        for job in required_jobs:
            if job in ci_config:
                print(f"✓ Job configured: {job}")
            else:
                print(f"⚠ Job missing: {job}")
                
        # Check for security scanning
        security_checks = ['security', 'scan', 'vulnerability']
        security_found = any(check in ci_config.lower() for check in security_checks)
        if security_found:
            print("✓ Security scanning configured")
        else:
            print("⚠ Security scanning not detected")
            
        # Check for deployment job
        if 'deploy' in ci_config:
            print("✓ Deployment job configured")
        else:
            print("⚠ Deployment job missing")
    else:
        print("⚠ CI/CD workflow file not found")

def test_unit_tests():
    """Test Unit Tests structure and coverage"""
    print("\n6. Testing Unit Tests...")
    print("-" * 40)
    
    backend_dir = '/home/tun/workspace/orderup/backend'
    test_directories = [
        'tests',
        'customers/tests',
        'orders/tests', 
        'store/tests'
    ]
    
    for test_dir in test_directories:
        full_path = os.path.join(backend_dir, test_dir)
        if os.path.exists(full_path):
            print(f"✓ Test directory exists: {test_dir}")
            
            # List test files
            test_files = [f for f in os.listdir(full_path) if f.startswith('test_')]
            if test_files:
                print(f"  ✓ Test files: {', '.join(test_files)}")
            else:
                print(f"  ⚠ No test files found in {test_dir}")
        else:
            print(f"⚠ Test directory missing: {test_dir}")
    
    # Check for pytest configuration
    pytest_config_files = ['pytest.ini', 'pyproject.toml', 'setup.cfg']
    config_found = False
    
    for config_file in pytest_config_files:
        config_path = os.path.join(backend_dir, config_file)
        if os.path.exists(config_path):
            print(f"✓ Test configuration file: {config_file}")
            config_found = True
            break
    
    if not config_found:
        print("⚠ No pytest configuration found")

def main():
    """Main test function"""
    print("=" * 80)
    print("ORDERUP PHASE 5: ADMIN & POLISH - IMPLEMENTATION VERIFICATION")
    print("=" * 80)
    print("Testing Admin Dashboard APIs, UI, CI/CD, and Unit Tests")
    print("Run this script to verify implementation progress")
    print("=" * 80)
    
    try:
        # Test admin API endpoints
        test_admin_api_endpoints()
        
        # Test admin UI components  
        test_admin_ui_components()
        
        # Test CI/CD pipeline
        test_ci_cd_pipeline()
        
        # Test unit tests
        test_unit_tests()
        
        print("\n" + "=" * 80)
        print("PHASE 5 TESTING SUMMARY")
        print("=" * 80)
        
        print("\n📋 NEXT STEPS:")
        print("1. Implement missing endpoints and components")
        print("2. Fix authentication and authorization issues")
        print("3. Add comprehensive unit tests")
        print("4. Configure CI/CD pipeline security scanning")
        print("5. Performance testing under load")
        
        print("\n✅ IMPLEMENTATION CHECKLIST:")
        print("• Admin Dashboard APIs:")
        print("  - [ ] System Stats API (/api/admin/stats/overview/)")
        print("  - [ ] Tenant Management API (/api/admin/tenants/)")
        print("  - [ ] Revenue Analytics API (/api/admin/analytics/revenue/)")
        print("• Admin Dashboard UI:")
        print("  - [ ] Dashboard page (/admin/dashboard)")
        print("  - [ ] Tenant management interface")
        print("  - [ ] Analytics charts component")
        print("• CI/CD Pipeline:")
        print("  - [ ] Security scanning configured")
        print("  - [ ] Deployment automation ready")
        print("• Unit Tests:")
        print("  - [ ] Test files for all models and services")
        print("  - [ ] >80% test coverage")
        
        print("\n🚀 READY FOR COMPREHENSIVE TESTING WHEN:")
        print("- All endpoints return 200 for super admin")
        print("- Authentication blocks unauthorized access")
        print("- UI components render correctly")
        print("- CI/CD pipeline runs successfully")
        print("- Unit tests pass with good coverage")
        
    except Exception as e:
        print(f"\n❌ TESTING FAILED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()