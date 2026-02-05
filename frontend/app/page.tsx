'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
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

export default function Home() {
  const tenant = useTenant();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // In real app, we get hostname from window, but for api calls we pass it
    fetchMenu(window.location.hostname).then(setCategories);
  }, []);

  return (
    <div className="min-h-screen pb-20">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {tenant?.logo_url && <img src={tenant.logo_url} alt="Logo" className="w-10 h-10 rounded-full" />}
                    <h1 className="font-bold text-xl">{tenant?.name}</h1>
                </div>
            </div>
        </header>

        {/* Categories & Menu */}
        <main className="max-w-md mx-auto px-4 py-6 space-y-8">
            {categories.map(cat => (
                <section key={cat.id} id={`cat-${cat.id}`}>
                    <h2 className="text-2xl font-bold mb-4">{cat.name}</h2>
                    <div className="space-y-4">
                        {cat.items.map(item => (
                            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 border border-gray-100 hover:border-[var(--primary-color)] transition-colors cursor-pointer">
                                {item.image_url && (
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">{item.description}</p>
                                    <p className="font-bold text-[var(--primary-color)] mt-2">฿{Number(item.price).toFixed(0)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    </div>
  );
}
