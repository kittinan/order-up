import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-secret-key-dev-only')

DEBUG = True

ALLOWED_HOSTS = ['*']

SHARED_APPS = (
    'django_tenants',  # mandatory
    'customers', # you must list the app where your tenant model resides in
    'admin_api',  # Admin dashboard APIs
    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',  # CORS support for frontend
    'channels',
)

TENANT_APPS = (
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'store',
    'orders',
    'qrcodes',
)

INSTALLED_APPS = list(SHARED_APPS) + [app for app in TENANT_APPS if app not in SHARED_APPS]

TENANT_MODEL = "customers.Client" # app.Model
TENANT_DOMAIN_MODEL = "customers.Domain" # app.Model

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware (must be before TenantMainMiddleware)
    'orderup.middleware.HeaderTenantMiddleware', # Custom: supports X-Tenant-Subdomain & X-Tenant-Host headers
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'orderup.urls_public' # Default for public/shared
PUBLIC_SCHEMA_URLCONF = 'orderup.urls_public'
TENANT_SCHEMA_URLCONF = 'orderup.urls_tenants'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'orderup.wsgi.application'
ASGI_APPLICATION = 'orderup.asgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend', # mandatory
        'NAME': os.environ.get('POSTGRES_DB', 'orderup'),
        'USER': os.environ.get('POSTGRES_USER', 'postgres'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'password'),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
    }
}

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Configuration
if DEBUG:
    # Allow all origins in development mode
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOW_CREDENTIALS = True
    # Explicitly list allowed headers in uppercase as HTTP headers are case-insensitive
    CORS_ALLOW_HEADERS = [
        'content-type',
        'x-tenant-host',
        'x-tenant-subdomain',
        'accept',
        'authorization',
    ]
    CORS_ALLOW_METHODS = [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
    ]
else:
    CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_HEADERS = [
        'content-type',
        'x-tenant-host',
        'x-tenant-subdomain',
        'accept',
        'authorization',
    ]
    CORS_ALLOW_METHODS = [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
    ]

# Logging for debugging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'orderup': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ.get('REDIS_URL', 'redis://redis:6379/0')],
        },
    },
}
