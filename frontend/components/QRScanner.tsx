import React, { useState } from 'react';

interface QRScannerProps {
  onScan?: (code: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onError,
  className = ''
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [mockCode, setMockCode] = useState('');

  const handleMockScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockQrCode = 'DEMO' + Math.random().toString(36).substr(2, 6).toUpperCase();
      setMockCode(mockQrCode);
      setIsScanning(false);
      
      if (onScan) {
        onScan(mockQrCode);
      }
    }, 2000);
  };

  const handleManualInput = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const code = formData.get('code') as string;
    
    if (code && onScan) {
      onScan(code.toUpperCase());
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        QR Code Scanner
      </h2>
      
      <div className="space-y-6">
        {/* Mock Scanner Interface */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          {isScanning ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
                <p className="text-blue-600 font-medium">Scanning...</p>
              </div>
            </div>
          ) : mockCode ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4"></div>
              <div>
                <p className="text-green-600 font-medium mb-2">QR Code Found!</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">{mockCode}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Camera would appear here</p>
              <p className="text-sm text-gray-500">(Mock for demo)</p>
            </div>
          )}
        </div>

        {/* Mock Scan Button */}
        <button
          onClick={handleMockScan}
          disabled={isScanning}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isScanning
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isScanning ? 'Scanning...' : 'Mock Scan QR Code'}
        </button>

        {/* Manual Code Input */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Or Enter Code Manually</h3>
          <form onSubmit={handleManualInput} className="space-y-3">
            <input
              type="text"
              name="code"
              placeholder="Enter QR code (e.g., DEMO123)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[A-Z0-9]+"
              maxLength={12}
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Code
            </button>
          </form>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click "Mock Scan" to simulate scanning a QR code</li>
            <li>• Or enter the code manually if you have one</li>
            <li>• The system will redirect you to the appropriate menu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};