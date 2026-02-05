import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Extract hostname from the request
  const hostname = request.headers.get('host') || 'localhost';

  // Parse subdomain from hostname
  // Format: tenant.domain.com or tenant.localhost for dev
  const parts = hostname.split('.');
  let subdomain = '';

  if (parts.length > 1) {
    // For multi-level domains (e.g., pizza.orderup.com), take the first part
    subdomain = parts[0];
  }

  // Add tenant info to request headers for backend use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Tenant-Subdomain', subdomain);
  requestHeaders.set('X-Tenant-Host', hostname);

  // Rewrite to the original URL with enhanced headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
