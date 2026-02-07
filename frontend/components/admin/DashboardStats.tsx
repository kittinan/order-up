'use client';

import { useTenant } from '@/contexts/TenantContext';

interface DashboardStatsProps {
  stats: {
    today_orders: number;
    today_revenue: number;
    active_orders: number;
    pending_orders: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const tenant = useTenant();
  const primaryColor = tenant?.primary_color || '#e63946';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Today's Orders */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-color)]/80"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}99 100%)`
          }}
        ></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium">Today&apos;s Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.today_orders}</p>
              <p className="text-white/80 text-xs mt-1">Total orders today</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Revenue */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"
        ></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium">Today&apos;s Revenue</p>
              <p className="text-3xl font-bold mt-2">฿{stats.today_revenue.toLocaleString()}</p>
              <p className="text-white/80 text-xs mt-1">Total sales today</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600"
        ></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium">Active Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.active_orders}</p>
              <p className="text-white/80 text-xs mt-1">Currently being prepared</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700"
        ></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium">Pending Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.pending_orders}</p>
              <p className="text-white/80 text-xs mt-1">Awaiting confirmation</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}