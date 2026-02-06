'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/contexts/TenantContext';
import { useCart } from '@/contexts/CartContext';
import { CartButton } from '@/components/CartButton';
import { CartDrawer } from '@/components/CartDrawer';
import { Toast } from '@/components/Toast';
import { QRModal } from '@/components/QRModal';
import { useToast } from '@/hooks/useToast';
import { fetchMenu } from '@/utils/api';

interface ModifierOption {
    id: number;
    name: string;
    price_adjustment: number;
}

interface ModifierGroup {
    id: number;
    name: string;
    options: ModifierOption[];
}

interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
    image_url: string;
    modifier_groups: ModifierGroup[];
}

interface Category {
    id: number;
    name: string;
    items: Item[];
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-xl flex-shrink-0"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const tenant = useTenant();
  const { addItem } = useCart();
  const { toast, showSuccessToast, hideToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    // Get hostname, default to pizza.localhost for development
    let hostname = window.location.hostname;
    if (hostname === 'localhost') {
      hostname = 'pizza.localhost';
    }
    
    const loadMenu = async () => {
      try {
        setLoading(true);
        const menuData = await fetchMenu(hostname);
        setCategories(menuData);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {tenant?.logo_url && (
                      <div className="relative">
                        <img 
                          src={tenant.logo_url} 
                          alt={tenant?.name || "Logo"} 
                          className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-white"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    )}
                    <div>
                        <h1 className="font-bold text-2xl text-gray-900">{tenant?.name}</h1>
                        <p className="text-xs text-gray-500">Menu & Delivery</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsQRModalOpen(true)}
                      className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                      title="View QR Codes"
                    >
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </button>
                    <Link href="/profile" className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors" title="View Profile">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </Link>
                    <CartButton 
                      onClick={() => setIsCartOpen(true)}
                      className="w-8 h-8 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center"
                    />
                </div>
            </div>
        </header>

        {/* Welcome Banner */}
        <div className="max-w-md mx-auto px-4 py-6">
            <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome to {tenant?.name}!</h2>
                <p className="text-white/90 text-sm">Fresh ingredients, fast delivery</p>
            </div>
        </div>

        {/* Categories & Menu */}
        <main className="max-w-md mx-auto px-4">
            {loading ? (
                <LoadingSkeleton />
            ) : categories.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Menu Coming Soon</h3>
                    <p className="text-gray-500">We're preparing delicious items for you</p>
                </div>
            ) : (
                categories.map((cat, catIndex) => (
                    <section key={cat.id} id={`cat-${cat.id}`} className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-[var(--primary-color)] rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-900">{cat.name}</h2>
                        </div>
                        
                        <div className="grid gap-6">
                            {cat.items.map((item, itemIndex) => (
                                <div 
                                    key={item.id}
                                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-[var(--primary-color)] cursor-pointer overflow-hidden"
                                    style={{ 
                                        animationDelay: `${(catIndex * 200) + (itemIndex * 100)}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards',
                                        opacity: 0
                                    }}
                                >
                                    <div className="flex gap-4 p-4">
                                        {/* Image Section */}
                                        {item.image_url && (
                                            <div className="relative w-32 h-32 flex-shrink-0">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent rounded-xl"></div>
                                                <img 
                                                    src={item.image_url} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Content Section */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-[var(--primary-color)] transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <div className="bg-[var(--primary-color)]/10 px-2 py-1 rounded-lg">
                                                        <p className="font-bold text-lg text-[var(--primary-color)]">
                                                            ฿{Number(item.price).toFixed(0)}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                                
                                                {/* Tags or additional info */}
                                                <div className="flex gap-2 mt-3">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Available
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Add to Cart Button */}
                                            <div className="flex items-center justify-between mt-4">
                                                <button 
                                                    onClick={() => {
                                                        addItem({
                                                            id: item.id,
                                                            name: item.name,
                                                            description: item.description,
                                                            price: Number(item.price),
                                                            image_url: item.image_url
                                                        });
                                                        showSuccessToast(`${item.name} added to cart!`);
                                                    }}
                                                    className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-color)]/90 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add to Cart
                                                </button>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    15-20 min
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            )}
        </main>

        {/* Bottom Navigation Hint */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
            <div className="max-w-md mx-auto text-center">
                <p className="text-xs text-gray-500">Scroll up to see more items</p>
            </div>
        </div>

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        {/* QR Modal */}
        <QRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          restaurantName={tenant?.name || 'Restaurant'}
        />

        {/* Toast Notification */}
        <Toast 
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />

        <style jsx global>{`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
    </div>
  );
}
