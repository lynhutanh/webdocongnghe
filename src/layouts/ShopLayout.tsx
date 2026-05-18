import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useThemeStore } from '@stores/themeStore';

const ShopHeader = dynamic(() => import('@components/shop/ShopHeader'), { ssr: false });
const ShopFooter = dynamic(() => import('@components/shop/ShopFooter'), { ssr: false });
const SplashScreen = dynamic(() => import('@components/shop/SplashScreen'), { ssr: false });

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const { isDark } = useThemeStore();
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Show splash only on first visit (per session)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('techhub-visited');
    if (!hasVisited) {
      setShowSplash(true);
    } else {
      setSplashDone(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashDone(true);
    sessionStorage.setItem('techhub-visited', '1');
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} ${splashDone ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s ease' }}
      >
        <ShopHeader cartCount={3} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <ShopFooter />
      </div>
    </>
  );
}
