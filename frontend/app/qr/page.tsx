'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeDisplay } from '@/components/QRCode';
import { QRScanner } from '@/components/QRScanner';

// Types
interface QRCodeData {
  id: string;
  code: string;
  restaurant_name: string;
  table_name: string;
  expires_at?: string;
  is_active: boolean;
}

export default function QRPage() {
  const [mode, setMode] = useState<'display' | 'scan'>('display');
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch QR code data for display mode
  const fetchQRCode = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be replaced with actual API call
      // For now, using mock data
      const mockQrData: QRCodeData = {
        id: '1',
        code: 'DEMO1234',
        restaurant_name: 'Demo Restaurant',
        table_name: 'Table 1',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        is_active: true
      };
      
      setQrData(mockQrData);
    } catch (err) {
      setError('Failed to load QR code');
      console.error('Error fetching QR code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle QR code scan
  const handleScan = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be replaced with actual API call to verify QR code
      // For now, just simulate success
      console.log('Scanned code:', code);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to menu or show success
      alert(`Success! QR code "${code}" is valid. Redirecting to menu...`);
      
      // In real app, would redirect to menu page with the QR code context
      // router.push(`/menu?qr=${code}`);
      
    } catch (err) {
      setError('Invalid QR code');
      console.error('Error verifying QR code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (mode === 'display') {
      fetchQRCode();
    }
  }, [mode]);

  if (loading && mode === 'display') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QR code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              QR Code Management
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setMode('display')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'display'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Display QR
              </button>
              <button
                onClick={() => setMode('scan')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'scan'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Scan QR
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {mode === 'display' ? (
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="flex justify-center">
              {qrData ? (
                <QRCodeDisplay
                  code={qrData.code}
                  restaurantName={qrData.restaurant_name}
                  tableName={qrData.table_name}
                  expiresAt={qrData.expires_at}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No QR code available</p>
                  <button
                    onClick={fetchQRCode}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  How to Use This QR Code
                </h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                    <p>Customers can scan this QR code with their phone camera</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                    <p>They will be directed to your digital menu</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                    <p>Orders will be associated with this table for easy service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <QRScanner
              onScan={handleScan}
              onError={(error) => setError(error)}
            />
          </div>
        )}
      </main>
    </div>
  );
}