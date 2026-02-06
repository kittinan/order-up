'use client';

import { useState, useEffect } from 'react';
import { TenantList } from '@/components/admin/TenantList';

interface Tenant {
  id: string;
  name: string;
  domain: string;
  schema_name: string;
  created_at: string;
  orders_count: number;
  total_sales: number;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock API call
    const loadTenants = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockTenants: Tenant[] = [
          {
            id: '1',
            name: 'Pizza Paradise',
            domain: 'pizza.orderup.com',
            schema_name: 'tenant_pizza',
            created_at: '2026-01-15T10:00:00Z',
            orders_count: 1250,
            total_sales: 450000
          },
          {
            id: '2',
            name: 'Burger King (Demo)',
            domain: 'burger.orderup.com',
            schema_name: 'tenant_burger',
            created_at: '2026-01-20T14:30:00Z',
            orders_count: 850,
            total_sales: 280000
          },
          {
            id: '3',
            name: 'Sushi Master',
            domain: 'sushi.orderup.com',
            schema_name: 'tenant_sushi',
            created_at: '2026-02-01T09:15:00Z',
            orders_count: 320,
            total_sales: 150000
          }
        ];

        setTenants(mockTenants);
      } catch (error) {
        console.error('Failed to load tenants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTenants();
  }, []);

  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
            <p className="mt-1 text-sm text-gray-500">Manage all registered restaurants and stores.</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Tenant
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading tenants...</p>
            </div>
          ) : (
            <>
              <TenantList tenants={filteredTenants} />
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTenants.length}</span> of <span className="font-medium">{filteredTenants.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button disabled className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
                    Previous
                  </button>
                  <button disabled className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
