'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TenantData {
  id: string;
  name: string;
  revenue: number;
}

interface TopTenantsChartProps {
  data: TenantData[];
  height?: number;
}

const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export function TopTenantsChart({ data, height = 300 }: TopTenantsChartProps) {
  const formatXAxisLabel = (name: string) => {
    if (name.length > 10) {
      return name.substring(0, 10) + '...';
    }
    return name;
  };

  const formatTooltipValue = (value: number) => {
    return [`฿${value.toLocaleString()}`, 'Revenue'];
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tickFormatter={formatXAxisLabel}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={formatTooltipValue}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}