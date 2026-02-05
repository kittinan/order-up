'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTenantInfo } from '../utils/api';

interface Tenant {
  name: string;
  logo_url: string | null;
  primary_color: string;
  font_family: string;
}

const TenantContext = createContext<Tenant | null>(null);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hostname = window.location.hostname;
    // For dev: if localhost, maybe default to 'pizza.localhost' or parse from URL if possible
    // or we just let the backend handle 'localhost' as public or specific tenant
    
    fetchTenantInfo(hostname)
      .then(setTenant)
      .catch((err) => console.error("Tenant load failed", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!tenant) return <div className="min-h-screen flex items-center justify-center">Tenant not found</div>;

  return (
    <TenantContext.Provider value={tenant}>
      <style jsx global>{`
        :root {
          --primary-color: ${tenant.primary_color};
          --font-family: ${tenant.font_family}, sans-serif;
        }
        body {
          font-family: var(--font-family);
        }
      `}</style>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
