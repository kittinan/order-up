'use client';

import { useState } from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number?: string;
  customer_name: string;
  user?: string;
  total: number;
  total_amount?: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled' | 'confirmed';
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
  items_count?: number;
}

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus?: (orderId: string, newStatus: Order['status']) => void;
  showTenant?: boolean;
  tenantName?: string;
  searchable?: boolean;
  paginated?: boolean;
}

export function OrderTable({ 
  orders, 
  onUpdateStatus, 
  showTenant = false, 
  tenantName,
  searchable = false,
  paginated = false 
}: OrderTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusOptions = (currentStatus: Order['status']) => {
    const allStatuses: Order['status'][] = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.order_number?.toLowerCase().includes(searchLower) ||
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.user?.toLowerCase().includes(searchLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchLower))
    );
  });

  const paginatedOrders = paginated 
    ? filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredOrders;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500">There are no orders matching your current criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      {searchable && (
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search orders by ID, customer, or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select className="ml-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                {showTenant && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                {onUpdateStatus && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.order_number || order.id}
                    </div>
                  </td>
                  
                  {showTenant && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tenantName || 'N/A'}
                    </td>
                  )}
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer_name || order.user || 'N/A'}
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="text-xs">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                      {(order.items.length > 2 || (order.items_count && order.items_count > 2)) && (
                        <div className="text-xs text-gray-500">
                          +{((order.items_count || order.items.length) - 2)} more items
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ฿{(order.total || order.total_amount || 0).toLocaleString()}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(order.created_at)}
                  </td>
                  
                  {onUpdateStatus && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          View
                        </button>
                        <select
                          onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Update</option>
                          {getStatusOptions(order.status).map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}