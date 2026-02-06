'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useTenant } from '@/contexts/TenantContext';
import { CartButton } from '@/components/CartButton';
import { OrderSummary } from '@/components/OrderSummary';
import { PaymentMethod } from '@/components/PaymentMethod';
import { CheckoutButton } from '@/components/CheckoutButton';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();
  const tenant = useTenant();
  const { showToast, showSuccessToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash');
  const [orderComplete, setOrderComplete] = useState(false);

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <h1 className="font-bold text-xl text-gray-900">Checkout</h1>
            </Link>
            <CartButton />
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some delicious items from our menu</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="font-bold text-xl text-gray-900">Order Complete</h1>
            <CartButton />
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
            <p className="text-gray-600 mb-4">Thank you for ordering from {tenant?.name}</p>
            <p className="text-sm text-gray-500 mb-6">Your order will be delivered in 15-20 minutes</p>
            
            <div className="space-y-3">
              <Link 
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: ''
  });

  const handlePlaceOrder = async () => {
    if (!customerInfo.name.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order via API
      const orderData = {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        items: items.map(item => ({
          item_id: item.id,
          quantity: item.quantity,
          special_instructions: item.specialInstructions || '',
          modifiers: item.modifiers?.map(mod => ({
            modifier_option_id: mod.id,
            quantity: 1
          })) || []
        })),
        payment_method: selectedPaymentMethod,
        special_instructions: ''
      };

      const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': localStorage.getItem('sessionId') || ''
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      
      // Process payment if not cash
      if (selectedPaymentMethod !== 'cash') {
        const paymentResponse = await fetch(`/api/orders/${order.id}/payment/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-ID': localStorage.getItem('sessionId') || ''
          },
          body: JSON.stringify({
            method: selectedPaymentMethod,
            session_id: localStorage.getItem('sessionId') || ''
          })
        });

        if (!paymentResponse.ok) {
          throw new Error('Payment failed');
        }

        const paymentResult = await paymentResponse.json();
        
        if (paymentResult.payment_status === 'failed') {
          throw new Error('Payment processing failed');
        }
      }

      // Save customer info for profile
      if (customerInfo.phone) {
        localStorage.setItem('customerPhone', customerInfo.phone);
        
        // Create/update customer record
        try {
          await fetch('/api/customers/lookup_or_create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: customerInfo.name,
              phone: customerInfo.phone
            })
          });
        } catch (error) {
          console.error('Failed to save customer info:', error);
        }
      }

      // Show success message
      showSuccessToast('Order placed successfully!');
      
      // Clear cart and show success screen
      clearCart();
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Failed to place order:', error);
      showToast(error instanceof Error ? error.message : 'Failed to place order. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className="font-bold text-xl text-gray-900">Checkout</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/profile" className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors" title="View Profile">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { step: 1, label: 'Cart', completed: true },
            { step: 2, label: 'Details', completed: true },
            { step: 3, label: 'Payment', completed: false },
            { step: 4, label: 'Complete', completed: false }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                item.completed 
                  ? 'bg-green-500 text-white' 
                  : item.step === 3 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {item.completed ? '✓' : item.step}
              </div>
              <span className={`text-xs font-medium ${
                item.completed ? 'text-green-600' : item.step === 3 ? 'text-[var(--primary-color)]' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {index < 3 && (
                <div className={`w-8 h-0.5 ${
                  item.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Content */}
      <main className="max-w-md mx-auto px-4 pb-24">
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (for loyalty points)
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <OrderSummary />
            
            {/* Points to be earned */}
            {customerInfo.phone && (
              <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm font-medium text-yellow-800">
                      Points to be earned
                    </span>
                  </div>
                  <span className="text-lg font-bold text-yellow-700">
                    +{Math.floor(totals.total / 10)}
                  </span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Complete your order to earn loyalty points!
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
            <PaymentMethod 
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />
          </div>

          {/* Checkout Button */}
          <CheckoutButton 
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
            total={totals.total}
          />
        </div>
      </main>
    </div>
  );
}