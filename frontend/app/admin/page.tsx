'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface SystemStats {
  total_tenants: number;
  total_orders_today: number;
  total_revenue_today: number;
  active_customers_30d: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    total_tenants: 0,
    total_orders_today: 0,
    total_revenue_today: 0,
    active_customers_30d: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for multi-tenant system stats - replace with actual API call to /api/admin/stats/overview/
      const mockStats: SystemStats = {
        total_tenants: 156,
        total_orders_today: 2847,
        total_revenue_today: 1258000,
        active_customers_30d: 8942
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Info */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Overview of your multi-tenant restaurant management system</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              System Online
            </span>
          </div>
        </div>

        {/* System Stats Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Tenants */}
            <StatsCard
              title="Total Tenants"
              value={stats.total_tenants.toLocaleString()}
              icon="🏪"
              description="Active restaurants"
              color="bg-blue-500"
            />

            {/* Total Orders Today */}
            <StatsCard
              title="Total Orders Today"
              value={stats.total_orders_today.toLocaleString()}
              icon="📋"
              description="Across all tenants"
              color="bg-green-500"
            />

            {/* Total Revenue Today */}
            <StatsCard
              title="Total Revenue Today"
              value={`฿${stats.total_revenue_today.toLocaleString()}`}
              icon="💰"
              description="System-wide revenue"
              color="bg-purple-500"
            />

            {/* Active Customers (30 days) */}
            <StatsCard
              title="Active Customers"
              value={stats.active_customers_30d.toLocaleString()}
              icon="👥"
              description="Last 30 days"
              color="bg-orange-500"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Tenant Management</h3>
                <p className="text-sm text-gray-500">Manage all registered restaurants</p>
              </div>
            </div>
            <div className="mt-4">
              <a href="/admin/tenants" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all tenants →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-500">Business insights and performance</p>
              </div>
            </div>
            <div className="mt-4">
              <a href="/admin/analytics" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View analytics →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                <p className="text-sm text-gray-500">All systems operational</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}