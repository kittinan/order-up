'use client';

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
  const maxValue = Math.max(...data.map(item => item[dataKey as keyof ChartDataPoint] as number));
  const minValue = Math.min(...data.map(item => item[dataKey as keyof ChartDataPoint] as number));
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatValue = (value: number) => {
    return `฿${value.toLocaleString()}`;
  };

  return (
    <div className="w-full">
      {/* Simple CSS-based chart for now */}
      <div className="relative h-64 w-full">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
          <span>{formatValue(maxValue)}</span>
          <span>{formatValue(Math.round((maxValue + minValue) / 2))}</span>
          <span>{formatValue(minValue)}</span>
        </div>
        
        {/* Chart area */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-t border-gray-200"></div>
            <div className="border-t border-gray-200"></div>
            <div className="border-t border-gray-200"></div>
          </div>
          
          {/* Chart bars */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {data.map((item, index) => {
              const height = ((item[dataKey as keyof ChartDataPoint] as number - minValue) / (maxValue - minValue)) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1 mx-1">
                  <div
                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: color,
                      minHeight: '2px'
                    }}
                    title={`${formatDate(item.date)}: ${formatValue(item.revenue)}`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 text-center transform -rotate-45 origin-left">
                    {formatDate(item.date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Chart info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {data.length} days of data
      </div>
      
      {/* Note about chart library */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Simple Chart Implementation</p>
            <p className="text-xs text-blue-600 mt-1">
              This is a basic CSS-based chart. For production, consider installing Chart.js or Recharts:
              <br />
              <code className="bg-blue-100 px-1 rounded">npm install recharts</code> or <code className="bg-blue-100 px-1 rounded">npm install chart.js react-chartjs-2</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}