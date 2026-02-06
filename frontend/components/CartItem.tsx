'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/contexts/CartContext';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { totals } = useCart();
  
  const itemTotal = item.price * item.quantity;
  const modifiersTotal = (item.selectedModifiers || []).reduce(
    (sum, mod) => sum + mod.priceAdjustment * item.quantity,
    0
  );
  const finalTotal = itemTotal + modifiersTotal;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex gap-3">
        {/* Item Image */}
        {item.image_url && (
          <div className="w-20 h-20 flex-shrink-0 relative">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        )}

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {item.name}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Selected Modifiers */}
          {item.selectedModifiers && item.selectedModifiers.length > 0 && (
            <div className="mt-2 space-y-1">
              {item.selectedModifiers.map((modifier, index) => (
                <div key={`${modifier.groupId}-${modifier.optionId}`} className="text-xs text-gray-600">
                  <span className="font-medium">{modifier.groupName}:</span> {modifier.optionName}
                  {modifier.priceAdjustment > 0 && (
                    <span className="text-green-600 ml-1">+฿{modifier.priceAdjustment}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Quantity Controls and Price */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-8 text-center font-medium text-gray-900">
                {item.quantity}
              </span>
              
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 transition-colors flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-bold text-lg text-gray-900">
                ฿{finalTotal.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">
                ฿{item.price.toFixed(0)} × {item.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};