'use client';

import { RevenueChart } from './charts/RevenueChart';

interface ChartDataPoint {
  date: string;
  revenue: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  title: string;
  dataKey: string;
  color: string;
}

export function AnalyticsChart({ data, title, dataKey, color }: AnalyticsChartProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <RevenueChart data={data} height={250} />
      
      {/* Chart info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {data.length} days of data
      </div>
    </div>
  );
}