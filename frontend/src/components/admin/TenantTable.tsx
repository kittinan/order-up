'use client';

import { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronDown
} from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  domain: string;
  schema_name: string;
  created_at: string;
  orders_count: number;
  total_sales: number;
}

interface TenantTableProps {
  tenants: Tenant[];
  onViewTenant?: (tenant: Tenant) => void;
  onEditTenant?: (tenant: Tenant) => void;
  onDeleteTenant?: (tenantId: string) => void;
}

type SortField = keyof Tenant | 'created_at_formatted';
type SortDirection = 'asc' | 'desc' | null;

export function TenantTable({ 
  tenants, 
  onViewTenant, 
  onEditTenant, 
  onDeleteTenant 
}: TenantTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc'
      );
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const sortedTenants = useMemo(() => {
    if (!sortField || !sortDirection) return tenants;

    return [...tenants].sort((a, b) => {
      let aValue: any, bValue: any;

      if (sortField === 'created_at_formatted') {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      } else {
        aValue = a[sortField as keyof Tenant];
        bValue = b[sortField as keyof Tenant];
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [tenants, sortField, sortDirection]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (tenants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenants found</h3>
        <p className="text-gray-500">There are no tenants matching your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                Tenant
                {getSortIcon('name')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('domain')}
            >
              <div className="flex items-center gap-1">
                Domain
                {getSortIcon('domain')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('orders_count')}
            >
              <div className="flex items-center gap-1">
                Orders
                {getSortIcon('orders_count')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('total_sales')}
            >
              <div className="flex items-center gap-1">
                Revenue
                {getSortIcon('total_sales')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('created_at_formatted')}
            >
              <div className="flex items-center gap-1">
                Created
                {getSortIcon('created_at_formatted')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTenants.map((tenant) => (
            <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">
                      {tenant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                    <div className="text-sm text-gray-500">{tenant.schema_name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  {tenant.domain}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-sm font-medium">{tenant.orders_count.toLocaleString()}</div>
                <div className="text-xs text-gray-500">total orders</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-sm font-medium">฿{tenant.total_sales.toLocaleString()}</div>
                <div className="text-xs text-gray-500">total revenue</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(tenant.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <span className="text-xs">🟢</span>
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="relative group">
                  <button className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                        Actions
                      </div>
                      <button
                        onClick={() => onViewTenant?.(tenant)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Orders
                      </button>
                      <button
                        onClick={() => onEditTenant?.(tenant)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Tenant
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => onDeleteTenant?.(tenant.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Tenant
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}