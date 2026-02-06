'use client';

interface CheckoutButtonProps {
  onPlaceOrder: () => void;
  isProcessing: boolean;
  total: number;
}

export function CheckoutButton({ onPlaceOrder, isProcessing, total }: CheckoutButtonProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="space-y-4">
        {/* Total Display */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total Amount</span>
          <span className="text-2xl font-bold text-[var(--primary-color)]">
            ฿{total.toFixed(2)}
          </span>
        </div>

        {/* Place Order Button */}
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-200 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing Order...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Place Order</span>
            </div>
          )}
        </button>

        {/* Order Terms */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By placing this order, you agree to our{' '}
            <a href="#" className="text-[var(--primary-color)] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[var(--primary-color)] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-green-600 font-medium">Secure Checkout</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-blue-600 font-medium">SSL Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}