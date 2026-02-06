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

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the order to your backend
      const orderData = {
        tenantName: tenant?.name,
        items: items,
        totals: totals,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString()
      };
      
      console.log('Order placed:', orderData);
      
      // Show success message
      showSuccessToast('Order placed successfully!');
      
      // Clear cart and show success screen
      clearCart();
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Failed to place order:', error);
      showToast('Failed to place order. Please try again.', 'error');
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
          <CartButton />
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
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <OrderSummary />
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