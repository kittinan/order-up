'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { OrderList } from '@/components/admin/OrderList';

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

interface DashboardStats {
  today_orders: number;
  today_revenue: number;
  active_orders: number;
  pending_orders: number;
}

export default function AdminDashboard() {
  const tenant = useTenant();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
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

      const mockStats: DashboardStats = {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">{tenant?.name} Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="mb-8">
          <DashboardStats stats={stats} />
        </div>

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Order Management</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
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
              <OrderList 
                orders={orders} 
                onUpdateStatus={updateOrderStatus}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}