'use client';

import { useEffect, useState, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { AnalyticsChart } from '@/components/admin/AnalyticsChart';
import { RevenueChart } from '@/components/admin/charts/RevenueChart';
import { TopTenantsChart } from '@/components/admin/charts/TopTenantsChart';
import { PopularItemsChart } from '@/components/admin/charts/PopularItemsChart';

interface AnalyticsData {
  top_tenants: Array<{
    id: string;
    name: string;
    revenue: number;
  }>;
  popular_items: Array<{
    name: string;
    tenant_id: string;
    tenant_name: string;
    quantity: number;
    revenue: number;
  }>;
  revenue_trends: Array<{
    date: string;
    revenue: number;
  }>;
  period_days: number;
}

interface SystemStats {
  total_revenue: number;
  total_orders: number;
  avg_order_value: number;
  customer_retention: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    top_tenants: [],
    popular_items: [],
    revenue_trends: [],
    period_days: 30
  });
  const [stats, setStats] = useState<SystemStats>({
    total_revenue: 0,
    total_orders: 0,
    avg_order_value: 0,
    customer_retention: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mock data - replace with actual API calls
      const mockAnalytics: AnalyticsData = {
        top_tenants: [
          { id: 'tenant-3', name: 'Sushi Master', revenue: 189450.25 },
          { id: 'tenant-1', name: 'Pizza Palace', revenue: 156420.75 },
          { id: 'tenant-2', name: 'Burger House', revenue: 125890.50 },
          { id: 'tenant-4', name: 'Thai Kitchen', revenue: 98560.00 },
          { id: 'tenant-5', name: 'Coffee Corner', revenue: 45780.75 }
        ],
        popular_items: [
          { name: 'Margherita Pizza', tenant_id: 'tenant-1', tenant_name: 'Pizza Palace', quantity: 125, revenue: 1875.00 },
          { name: 'California Roll', tenant_id: 'tenant-3', tenant_name: 'Sushi Master', quantity: 98, revenue: 2450.00 },
          { name: 'Classic Burger', tenant_id: 'tenant-2', tenant_name: 'Burger House', quantity: 87, revenue: 1305.00 },
          { name: 'Pad Thai', tenant_id: 'tenant-4', tenant_name: 'Thai Kitchen', quantity: 76, revenue: 1140.00 },
          { name: 'Cappuccino', tenant_id: 'tenant-5', tenant_name: 'Coffee Corner', quantity: 234, revenue: 3510.00 }
        ],
        revenue_trends: [
          { date: '2024-01-07', revenue: 5420.30 },
          { date: '2024-01-08', revenue: 6180.50 },
          { date: '2024-01-09', revenue: 5890.20 },
          { date: '2024-01-10', revenue: 7230.80 },
          { date: '2024-01-11', revenue: 6910.40 },
          { date: '2024-01-12', revenue: 8150.60 },
          { date: '2024-01-13', revenue: 7980.90 },
          { date: '2024-01-14', revenue: 9240.10 },
          { date: '2024-01-15', revenue: 8760.30 },
          { date: '2024-01-16', revenue: 10250.70 },
          { date: '2024-01-17', revenue: 9890.40 },
          { date: '2024-01-18', revenue: 11420.80 },
          { date: '2024-01-19', revenue: 10890.20 },
          { date: '2024-01-20', revenue: 12340.50 },
          { date: '2024-01-21', revenue: 11780.90 },
          { date: '2024-01-22', revenue: 13210.30 },
          { date: '2024-01-23', revenue: 12890.60 },
          { date: '2024-01-24', revenue: 14520.80 },
          { date: '2024-01-25', revenue: 13980.40 },
          { date: '2024-01-26', revenue: 15240.70 },
          { date: '2024-01-27', revenue: 14890.20 },
          { date: '2024-01-28', revenue: 16420.50 },
          { date: '2024-01-29', revenue: 15980.90 },
          { date: '2024-01-30', revenue: 17210.30 },
          { date: '2024-01-31', revenue: 16890.60 },
          { date: '2024-02-01', revenue: 18520.80 },
          { date: '2024-02-02', revenue: 17980.40 },
          { date: '2024-02-03', revenue: 19240.70 },
          { date: '2024-02-04', revenue: 18890.20 },
          { date: '2024-02-05', revenue: 20420.50 },
          { date: '2024-02-06', revenue: 15420.50 }
        ],
        period_days: parseInt(selectedPeriod)
      };

      const totalRevenue = mockAnalytics.revenue_trends.reduce((sum, trend) => sum + trend.revenue, 0);
      const totalOrders = Math.floor(totalRevenue / 150); // Mock calculation
      const avgOrderValue = totalRevenue / totalOrders;
      const customerRetention = 68.5; // Mock percentage

      const mockStats: SystemStats = {
        total_revenue: totalRevenue,
        total_orders: totalOrders,
        avg_order_value: avgOrderValue,
        customer_retention: customerRetention
      };

      setAnalytics(mockAnalytics);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Business insights and performance metrics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button className="text-purple-600 hover:text-purple-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`฿${stats.total_revenue.toLocaleString()}`}
            icon="💰"
            description={`Last ${selectedPeriod} days`}
            color="bg-purple-500"
          />
          <StatsCard
            title="Total Orders"
            value={stats.total_orders.toLocaleString()}
            icon="📋"
            description="Orders processed"
            color="bg-green-500"
          />
          <StatsCard
            title="Avg Order Value"
            value={`฿${stats.avg_order_value.toFixed(2)}`}
            icon="🛒"
            description="Per order average"
            color="bg-blue-500"
          />
          <StatsCard
            title="Customer Retention"
            value={`${stats.customer_retention}%`}
            icon="👥"
            description="Retention rate"
            color="bg-orange-500"
          />
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Daily Revenue
            </div>
          </div>
          <RevenueChart data={analytics.revenue_trends} height={300} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Tenants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Performing Tenants</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4 text-sm">Loading analytics...</p>
                </div>
              ) : (
                <TopTenantsChart data={analytics.top_tenants} height={250} />
              )}
            </div>
          </div>

          {/* Popular Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Most Popular Items</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4 text-sm">Loading analytics...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button 
                      className="text-sm font-medium text-purple-600 hover:text-purple-700"
                      onClick={() => {}}
                    >
                      Sort by Quantity
                    </button>
                    <span className="text-gray-400">|</span>
                    <button 
                      className="text-sm font-medium text-gray-400 hover:text-gray-600"
                      onClick={() => {}}
                    >
                      Sort by Revenue
                    </button>
                  </div>
                  <PopularItemsChart data={analytics.popular_items} height={250} sortBy="quantity" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}