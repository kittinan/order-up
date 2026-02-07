from .settings import *

# Test settings - use PostgreSQL for testing
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Use regular backend for unit tests
        'NAME': 'orderup_test',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'db',
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