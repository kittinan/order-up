from django.db import connection
from django.http import Http404
from django.conf import settings


class HeaderTenantMiddleware:
    """
    Custom middleware to support header-based tenant selection.
    Overrides standard behavior to check headers first.

    Usage:
    - Frontend sends: X-Tenant-Host: pizza.localhost
    - Or direct test: X-Tenant-Subdomain: pizza
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.process_request(request) or self.get_response(request)

    def process_request(self, request):
        """
        Process request to determine tenant from headers.
        """
        # 1. Try to get tenant from X-Tenant-Subdomain header
        tenant = None
        subdomain = request.META.get('HTTP_X_TENANT_SUBDOMAIN')

        # 2. If not found, try from X-Tenant-Host header (sent by frontend)
        if not subdomain:
            host_header = request.META.get('HTTP_X_TENANT_HOST')
            if host_header and '.' in host_header:
                # Extract 'pizza' from 'pizza.localhost'
                parts = host_header.split('.')
                if parts[0] != 'localhost':
                    subdomain = parts[0]

        # Debug logging
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"TenantMiddleware: HTTP_X_TENANT_SUBDOMAIN={request.META.get('HTTP_X_TENANT_SUBDOMAIN')}")
        logger.info(f"TenantMiddleware: HTTP_X_TENANT_HOST={request.META.get('HTTP_X_TENANT_HOST')}")
        logger.info(f"TenantMiddleware: Extracted subdomain={subdomain}")

        if subdomain and subdomain not in ['localhost', 'public', 'www']:
            try:
                from customers.models import Client
                tenant = Client.objects.get(schema_name=subdomain)
                logger.info(f"TenantMiddleware: Found tenant={tenant.name} (schema={tenant.schema_name})")
            except Exception as e:
                # If specified tenant not found, don't crash, let standard logic fail or fallback
                logger.warning(f"TenantMiddleware: Failed to find tenant for {subdomain}: {e}")
                pass

        if tenant:
            # Found tenant from header! Set it up
            request.tenant = tenant
            connection.set_tenant(request.tenant)
            request.urlconf = settings.TENANT_SCHEMA_URLCONF
            logger.info(f"TenantMiddleware: Set request.tenant, connection, and urlconf to {tenant.schema_name}")
            # Return None to continue processing
            return None

        # 3. Fallback to public schema (ROOT_URLCONF)
        logger.info("TenantMiddleware: Using fallback to public schema (ROOT_URLCONF)")
        request.urlconf = settings.ROOT_URLCONF
        # Set tenant to public schema
        from customers.models import Client
        try:
            request.tenant = Client.objects.get(schema_name='public')
            connection.set_tenant(request.tenant)
        except Exception:
            pass
        return None
