'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  height?: number;
}

export function RevenueChart({ data, height = 300 }: RevenueChartProps) {
  const formatXAxisLabel = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTooltipLabel = (label: string) => {
    const date = new Date(label);
    return date.toLocaleDateString('th-TH', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTooltipValue = (value: number) => {
    return [`฿${value.toLocaleString()}`, 'Revenue'];
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxisLabel}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `฿${value.toLocaleString()}`}
          />
          <Tooltip 
            labelFormatter={formatTooltipLabel}
            formatter={formatTooltipValue}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#22c55e" 
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}