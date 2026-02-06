'use client';

import { useCart } from '@/contexts/CartContext';

export function OrderSummary() {
  const { items, totals } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items in cart</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">฿{item.price.toFixed(2)} × {item.quantity}</p>
                  
                  {/* Modifiers */}
                  {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                    <div className="mt-1 text-xs text-gray-400">
                      {item.selectedModifiers.map((modifier, index) => (
                        <div key={`${modifier.groupId}-${modifier.optionId}`}>
                          {modifier.groupName}: {modifier.optionName}
                          {modifier.priceAdjustment > 0 && (
                            <span className="text-gray-500"> (+฿{modifier.priceAdjustment.toFixed(2)})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ฿{((item.price + (item.selectedModifiers?.reduce((sum, mod) => sum + mod.priceAdjustment, 0) || 0)) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">฿{totals.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="font-medium text-gray-900">฿{totals.tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium text-gray-900">฿{totals.deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-[var(--primary-color)]">฿{totals.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900">Delivery Information</p>
            <p className="text-xs text-blue-700">Estimated delivery: 15-20 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}