import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
  description?: string;
  className?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      )}
      <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-200">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="L"
          includeMargin={true}
        />
      </div>
      {description && (
        <p className="text-sm text-gray-600 text-center max-w-xs">
          {description}
        </p>
      )}
    </div>
  );
};

interface QRCodeDisplayProps {
  code: string;
  restaurantName: string;
  tableName: string;
  expiresAt?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  code,
  restaurantName,
  tableName,
  expiresAt
}) => {
  const qrValue = `${window.location.origin}/qr/${code}`;
  
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {restaurantName}
        </h2>
        <p className="text-gray-600 mb-4">
          Table: {tableName}
        </p>
        {expiresAt && (
          <div className={`text-sm ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
            {isExpired ? 'Expired' : `Expires: ${new Date(expiresAt).toLocaleString()}`}
          </div>
        )}
      </div>
      
      <QRCode
        value={qrValue}
        size={256}
        title="Scan to Order"
        description="Scan this QR code with your phone camera to view the menu and place orders"
      />
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-4">
          Code: {code}
        </p>
        <button
          onClick={() => navigator.clipboard.writeText(qrValue)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};