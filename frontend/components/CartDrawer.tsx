'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart, useCartCalculations } from '@/contexts/CartContext';
import { CartItemComponent } from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { isEmpty, totals } = useCartCalculations();

  const handleQuantityChange = (itemId: number, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear all items from your cart?')) {
      clearCart();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="
          fixed inset-0 bg-black/50 backdrop-blur-sm
          z-40 transition-opacity duration-300
          ease-in-out
        "
        onClick={onClose}
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer */}
      <div
        className="
          fixed right-0 top-0 h-full w-full max-w-md
          bg-white shadow-2xl
          z-50 transform transition-transform duration-300
          ease-out
        "
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto px-4 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some delicious items to get started!</p>
              <button
                onClick={onClose}
                className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(quantity) => handleQuantityChange(item.id, quantity)}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout */}
        {!isEmpty && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 z-10">
            {/* Order Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">฿{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="font-medium">฿{totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">฿{totals.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-[var(--primary-color)]">
                    ฿{totals.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--primary-color)]/90 transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};