'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { OrderList } from '@/components/admin/OrderList';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Order {
  id: string;
  customer_name: string;
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  created_at: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface DashboardStatsData {
  today_orders: number;
  today_revenue: number;
  active_orders: number;
  pending_orders: number;
}

export default function AdminDashboard() {
  const tenant = useTenant();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStatsData>({
    today_orders: 0,
    today_revenue: 0,
    active_orders: 0,
    pending_orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual API calls
      const mockOrders: Order[] = [
        {
          id: '#1001',
          customer_name: 'สมชาย ใจดี',
          total: 245,
          status: 'pending',
          created_at: '2026-02-06T14:00:00Z',
          items: [
            { name: 'พิซซ่าฮาวายเอี้ยน', quantity: 1, price: 180 },
            { name: 'โค้ก', quantity: 1, price: 25 }
          ]
        },
        {
          id: '#1002',
          customer_name: 'สมหญิง รักดี',
          total: 320,
          status: 'preparing',
          created_at: '2026-02-06T13:45:00Z',
          items: [
            { name: 'สเป็กเกิลตี้พิซซ่า', quantity: 1, price: 280 },
            { name: 'น้ำเปล่า', quantity: 1, price: 10 }
          ]
        },
        {
          id: '#1003',
          customer_name: 'นาย ดีดี',
          total: 180,
          status: 'completed',
          created_at: '2026-02-06T13:30:00Z',
          items: [
            { name: 'พิซซ่ามาร์การีต้า', quantity: 1, price: 180 }
          ]
        }
      ];

      const mockStats: DashboardStatsData = {
        today_orders: 45,
        today_revenue: 12500,
        active_orders: 8,
        pending_orders: 3
      };

      setOrders(mockOrders);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // Update order status - replace with actual API call
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // Update stats if needed
      if (newStatus === 'completed' || newStatus === 'cancelled') {
        setStats(prev => ({
          ...prev,
          active_orders: Math.max(0, prev.active_orders - 1),
          pending_orders: newStatus === 'completed' ? Math.max(0, prev.pending_orders - 1) : prev.pending_orders
        }));
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Info */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Store Open
            </span>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading dashboard...</p>
              </div>
            ) : (
              <>
                <OrderList 
                  orders={orders} 
                  onUpdateStatus={updateOrderStatus}
                />
                
                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of <span className="font-medium">{orders.length}</span> results
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
    </AdminLayout>
  );
}