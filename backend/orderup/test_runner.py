from django.test import TransactionTestCase
from django.test.runner import DiscoverRunner
from django_tenants.test.cases import TenantTestCase


class TenantTestRunner(DiscoverRunner):
    """
    Custom test runner for django-tenants that properly handles
    schema creation and migrations.
    """
    def __init__(self, *args, **kwargs):
        kwargs['verbosity'] = 2
        super().__init__(*args, **kwargs)

    def setup_test_environment(self, **kwargs):
        """Setup the test environment."""
        super().setup_test_environment(**kwargs)

    def setup_databases(self, **kwargs):
        """Setup databases - this will handle tenant schemas."""
        # Let the parent handle schema creation
        return super().setup_databases(**kwargs)
