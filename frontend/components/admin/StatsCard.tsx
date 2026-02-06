'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  description: string;
  color: string;
}

export function StatsCard({ title, value, icon, description, color }: StatsCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'bg-blue-500':
        return 'from-blue-500 to-blue-600';
      case 'bg-green-500':
        return 'from-green-500 to-green-600';
      case 'bg-purple-500':
        return 'from-purple-500 to-purple-600';
      case 'bg-orange-500':
        return 'from-orange-500 to-orange-600';
      case 'bg-red-500':
        return 'from-red-500 to-red-600';
      case 'bg-gray-500':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(color)}`}
      ></div>
      <div className="relative p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            <p className="text-white/80 text-xs mt-1">{description}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}