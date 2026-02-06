from .settings import *

# Test settings - use PostgreSQL for testing with django-tenants
DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': 'orderup_test',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Disable Redis for testing (not needed for unit tests)
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

# Use test runner
TEST_RUNNER = 'django.test.runner.DiscoverRunner'

# Test-specific tenant settings
TENANT_TESTS = True

# Disable migrations for faster testing  
class DisableMigrations:
    def __contains__(self, item):
        return True
    
    def __getitem__(self, item):
        return None

MIGRATION_MODULES = DisableMigrations()