'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTenantInfo } from '../utils/api';

interface Tenant {
  name: string;
  logo_url: string | null;
  primary_color: string;
  font_family: string;
}

// Default tenant for fallback
const DEFAULT_TENANT: Tenant = {
  name: "Pizza Lover",
  logo_url: "https://img.icons8.com/color/96/pizza.png",
  primary_color: "#e63946",
  font_family: "Roboto"
};

const TenantContext = createContext<Tenant>(DEFAULT_TENANT);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant>(DEFAULT_TENANT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async () => {
      // Make sure we're on the client side
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }
      
      let hostname = window.location.hostname;
      
      // For development: if accessing via localhost, default to pizza.localhost
      if (hostname === 'localhost') {
        hostname = 'pizza.localhost';
      }
      
      try {
        console.log("Loading tenant for hostname:", hostname);
        const tenantData = await fetchTenantInfo(hostname);
        console.log("Tenant loaded successfully:", tenantData);
        setTenant(tenantData);
      } catch (err) {
        console.error("Tenant load failed for", hostname, err);
        // Fallback to pizza.localhost if first attempt fails
        if (hostname !== 'pizza.localhost') {
          try {
            console.log("Trying fallback to pizza.localhost");
            const fallbackData = await fetchTenantInfo('pizza.localhost');
            console.log("Fallback tenant loaded successfully:", fallbackData);
            setTenant(fallbackData);
          } catch (fallbackErr) {
            console.error("Fallback tenant load failed, using default tenant", fallbackErr);
            // Keep the default tenant
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadTenant();
  }, []);

  // Always render children, even while loading or if tenant fails to load
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
