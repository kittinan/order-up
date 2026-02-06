'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick, className = '' }) => {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className={`
        relative p-2 rounded-full transition-all duration-300
        hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label="Shopping cart"
    >
      {/* Cart Icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Badge */}
      {itemCount > 0 && (
        <div
          className="
            absolute -top-1 -right-1
            bg-red-500 text-white
            text-xs font-bold
            rounded-full
            min-w-[20px] h-5
            flex items-center justify-center
            px-1
            animate-bounce
            transition-all duration-300
          "
        >
          {itemCount > 99 ? '99+' : itemCount}
        </div>
      )}

      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};