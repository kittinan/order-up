"""
Main URL configuration for OrderUp project.
This file serves as the entry point for URL routing.
The actual routing is handled dynamically by the HeaderTenantMiddleware.
"""

from django.urls import path, include
from django.conf import settings
from django.http import HttpResponse

def health_check(request):
    """Simple health check endpoint"""
    return HttpResponse("OK", status=200)

# Base URL patterns - the actual routing is handled by middleware
urlpatterns = [
    path('health/', health_check, name='health_check'),
    # The middleware will dynamically set request.urlconf based on tenant
    # No need for explicit include patterns here
]