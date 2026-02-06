import type { Metadata } from "next";
import "./globals.css";
import { TenantProvider } from "@/contexts/TenantContext";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "OrderUp",
  description: "Restaurant Ordering System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <TenantProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
