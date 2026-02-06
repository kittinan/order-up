'use client';

import { useState, useCallback } from 'react';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ isVisible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showSuccessToast = useCallback((message: string) => {
    showToast(message, 'success');
  }, [showToast]);

  const showErrorToast = useCallback((message: string) => {
    showToast(message, 'error');
  }, [showToast]);

  const showInfoToast = useCallback((message: string) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
  };
};