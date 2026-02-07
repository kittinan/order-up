'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PopularItem {
  name: string;
  tenant_name: string;
  quantity: number;
  revenue: number;
}

interface PopularItemsChartProps {
  data: PopularItem[];
  height?: number;
  sortBy?: 'quantity' | 'revenue';
}

const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export function PopularItemsChart({ data, height = 300, sortBy = 'quantity' }: PopularItemsChartProps) {
  const formatXAxisLabel = (name: string) => {
    if (name.length > 12) {
      return name.substring(0, 12) + '...';
    }
    return name;
  };

  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'quantity') {
      return [`${value} orders`, 'Quantity Sold'];
    }
    return [`฿${value.toLocaleString()}`, 'Revenue'];
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'quantity') {
      return b.quantity - a.quantity;
    }
    return b.revenue - a.revenue;
  });

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tickFormatter={formatXAxisLabel}
            stroke="#6b7280"
            fontSize={11}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            formatter={formatTooltipValue}
            labelFormatter={(label) => {
              const item = data.find(d => d.name === label);
              return item ? `${label} (${item.tenant_name})` : label;
            }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar 
            dataKey={sortBy} 
            radius={[4, 4, 0, 0]}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}