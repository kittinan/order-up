import React from 'react';
import { QRCodeDisplay } from './QRCode';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

interface TableQRCode {
  id: string;
  table_name: string;
  code: string;
  expires_at?: string;
}

export const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  restaurantName
}) => {
  const [selectedTable, setSelectedTable] = React.useState<TableQRCode | null>(null);

  // Mock table QR codes - in real app, this would come from API
  const tableQRCodes: TableQRCode[] = [
    {
      id: '1',
      table_name: 'Table 1',
      code: 'TABLE001',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      table_name: 'Table 2',
      code: 'TABLE002',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      table_name: 'Table 3',
      code: 'TABLE003',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      table_name: 'Booth A',
      code: 'BOOTHA01',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      table_name: 'Outdoor Table',
      code: 'OUT01',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              QR Codes for {restaurantName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {selectedTable ? (
              <>
                {/* QR Code Display */}
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Tables
                  </button>

                  <QRCodeDisplay
                    code={selectedTable.code}
                    restaurantName={restaurantName}
                    tableName={selectedTable.table_name}
                    expiresAt={selectedTable.expires_at}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {/* Table Selection */}
                <p className="text-gray-600 mb-6">
                  Select a table to view its QR code. Customers can scan the code to access the menu and place orders.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tableQRCodes.map((table) => (
                    <button
                      key={table.id}
                      onClick={() => setSelectedTable(table)}
                      className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {table.table_name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Code: {table.code}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Instructions */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-3">How to use QR codes:</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Print these QR codes and place them on your tables
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Customers scan them with their phone camera
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      They'll be taken to your digital menu
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Orders are automatically linked to the correct table
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};