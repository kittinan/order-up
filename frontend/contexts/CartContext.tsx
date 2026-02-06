'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url?: string;
  quantity: number;
  selectedModifiers?: {
    groupId: number;
    groupName: string;
    optionId: number;
    optionName: string;
    priceAdjustment: number;
  }[];
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totals: CartTotals;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: number) => boolean;
  getItemQuantity: (itemId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Tax rate and delivery fee constants
const TAX_RATE = 0.07; // 7% tax
const DELIVERY_FEE = 30; // 30 baht delivery fee

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('orderup-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('orderup-cart', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items]);

  // Calculate totals
  const totals: CartTotals = {
    subtotal: items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const modifiersTotal = (item.selectedModifiers || []).reduce(
        (modSum, mod) => modSum + mod.priceAdjustment * item.quantity,
        0
      );
      return sum + itemTotal + modifiersTotal;
    }, 0),
    tax: 0,
    deliveryFee: items.length > 0 ? DELIVERY_FEE : 0,
    total: 0,
  };

  totals.tax = Math.round(totals.subtotal * TAX_RATE * 100) / 100;
  totals.total = totals.subtotal + totals.tax + totals.deliveryFee;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (itemId: number): boolean => {
    return items.some(item => item.id === itemId);
  };

  const getItemQuantity = (itemId: number): number => {
    const item = items.find(cartItem => cartItem.id === itemId);
    return item?.quantity || 0;
  };

  const value: CartContextType = {
    items,
    itemCount,
    totals,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Hook for cart-related calculations
export const useCartCalculations = () => {
  const { items, totals } = useCart();
  
  return {
    items,
    totals,
    isEmpty: items.length === 0,
    hasItems: items.length > 0,
  };
};