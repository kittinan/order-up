'use client';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'credit_card',
      name: 'Credit/Debit Card',
      description: 'Secure online payment',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'promptpay',
      name: 'PromptPay',
      description: 'Scan QR code to pay',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedMethod === method.id
              ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/5'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            selectedMethod === method.id
              ? 'bg-[var(--primary-color)] text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {method.icon}
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">{method.name}</h3>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
          
          <div className="flex-shrink-0">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === method.id
                ? 'border-[var(--primary-color)] bg-[var(--primary-color)]'
                : 'border-gray-300'
            }`}>
              {selectedMethod === method.id && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </button>
      ))}

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-900">Payment Security</p>
            <p className="text-xs text-amber-700">All payments are secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}