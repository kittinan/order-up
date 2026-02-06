'use client';

interface OrderStatusBadgeProps {
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: '⏳',
          label: 'Pending'
        };
      case 'preparing':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: '🍳',
          label: 'Preparing'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅',
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: '❌',
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❓',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
}