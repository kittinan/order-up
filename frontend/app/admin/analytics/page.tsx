'use client';

import { useState } from 'react';
import { AnalyticsChart } from '@/components/admin/AnalyticsChart';
import { StatsCard } from '@/components/admin/StatsCard';

// Mock Data
const SALES_DATA = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const ORDERS_DATA = [
  { name: 'Mon', value: 24 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 12 },
  { name: 'Thu', value: 16 },
  { name: 'Fri', value: 14 },
  { name: 'Sat', value: 28 },
  { name: 'Sun', value: 32 },
];

const HOURLY_DATA = [
  { name: '10:00', value: 12 },
  { name: '11:00', value: 45 },
  { name: '12:00', value: 89 },
  { name: '13:00', value: 65 },
  { name: '14:00', value: 32 },
  { name: '15:00', value: 24 },
  { name: '16:00', value: 28 },
  { name: '17:00', value: 45 },
  { name: '18:00', value: 78 },
  { name: '19:00', value: 62 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="mt-1 text-sm text-gray-500">Track your business performance and growth.</p>
          </div>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="3m">Last 3 Months</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value="฿124,500"
            icon="💰"
            description="+12% from last week"
            color="bg-green-500"
          />
          <StatsCard
            title="Total Orders"
            value="1,245"
            icon="🛍️"
            description="+5% from last week"
            color="bg-blue-500"
          />
          <StatsCard
            title="Avg. Order Value"
            value="฿350"
            icon="📊"
            description="+2% from last week"
            color="bg-purple-500"
          />
          <StatsCard
            title="New Customers"
            value="128"
            icon="👥"
            description="+18% from last week"
            color="bg-orange-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalyticsChart
            title="Revenue Overview"
            data={SALES_DATA}
            type="area"
            primaryColor="#10b981"
            valuePrefix="฿"
          />
          <AnalyticsChart
            title="Orders Trend"
            data={ORDERS_DATA}
            type="bar"
            primaryColor="#3b82f6"
          />
          <div className="lg:col-span-2">
            <AnalyticsChart
              title="Peak Hours Traffic"
              data={HOURLY_DATA}
              type="bar"
              primaryColor="#8b5cf6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
