'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useTenant } from '@/contexts/TenantContext';
import { CartButton } from '@/components/CartButton';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';

interface Customer {
  phone: string;
  name: string;
  points: number;
  joined_at: string;
}

interface Tier {
  name: string;
  color: string;
}

interface NextTier {
  name: string;
  points_needed: number;
}

interface Transaction {
  id: string;
  type: 'earned';
  points: number;
  description: string;
  amount: number;
  date: string;
}

export default function ProfilePage() {
  const tenant = useTenant();
  const { showToast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [nextTier, setNextTier] = useState<NextTier | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');

  // Try to get phone from localStorage or search params
  useEffect(() => {
    const savedPhone = localStorage.getItem('customerPhone');
    const urlParams = new URLSearchParams(window.location.search);
    const urlPhone = urlParams.get('phone');
    
    if (urlPhone) {
      setPhone(urlPhone);
      localStorage.setItem('customerPhone', urlPhone);
    } else if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  // Fetch customer data
  useEffect(() => {
    if (phone) {
      fetchCustomerData();
    }
  }, [phone]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      
      // Fetch customer tier info
      const tierResponse = await fetch(`/api/customers/${phone}/tier/`);
      if (tierResponse.ok) {
        const tierData = await tierResponse.json();
        setCustomer(tierData.customer);
        setTier(tierData.tier);
        setNextTier(tierData.next_tier);
      } else {
        showToast('Customer not found', 'error');
      }

      // Fetch transaction history
      const transactionsResponse = await fetch(`/api/customers/${phone}/transactions/`);
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
      showToast('Failed to load customer data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatPoints = (points: number) => {
    return points.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!phone) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <h1 className="font-bold text-xl text-gray-900">Profile</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/profile" className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors ring-2 ring-yellow-500/30" title="View Profile">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <CartButton />
            </div>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Phone Number</h2>
            <p className="text-gray-600 mb-6">Enter your phone number to view your loyalty profile and transaction history.</p>
            
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value) {
                      setPhone(input.value);
                      localStorage.setItem('customerPhone', input.value);
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="tel"]') as HTMLInputElement;
                  if (input?.value) {
                    setPhone(input.value);
                    localStorage.setItem('customerPhone', input.value);
                  }
                }}
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className="font-bold text-xl text-gray-900">My Profile</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/profile" className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors ring-2 ring-yellow-500/30" title="View Profile">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {customer && tier && (
          <>
            {/* Customer Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                  <p className="text-gray-600">{customer.phone}</p>
                </div>
                <div 
                  className="px-4 py-2 rounded-full text-white font-medium"
                  style={{ backgroundColor: tier.color }}
                >
                  {tier.name}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Points</p>
                    <p className="text-3xl font-bold text-gray-900">{formatPoints(customer.points)}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {nextTier && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700 font-medium">
                      {formatPoints(nextTier.points_needed)} points to {nextTier.name}
                    </span>
                    <div className="w-24 h-2 bg-blue-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ 
                          width: `${Math.min(100, ((customer.points - (customer.points - nextTier.points_needed)) / nextTier.points_needed) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Point History</h3>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No transactions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Place orders to earn points!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">+{formatPoints(transaction.points)}</p>
                        <p className="text-sm text-gray-500">฿{transaction.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}