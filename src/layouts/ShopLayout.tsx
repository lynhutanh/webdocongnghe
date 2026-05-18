import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useThemeStore } from '@stores/themeStore';

const ShopHeader = dynamic(() => import('@components/shop/ShopHeader'), { ssr: false });
const ShopFooter = dynamic(() => import('@components/shop/ShopFooter'), { ssr: false });

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <ShopHeader cartCount={3} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <ShopFooter />
    </div>
  );
}
