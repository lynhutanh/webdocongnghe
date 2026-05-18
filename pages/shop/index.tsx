import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import ShopLayout from '@layouts/ShopLayout';

const HeroBanner = dynamic(() => import('@components/shop/HeroBanner'), { ssr: false });
const TrustBar = dynamic(() => import('@components/shop/TrustBar'), { ssr: false });
const CategorySection = dynamic(() => import('@components/shop/CategorySection'), { ssr: false });
const FeaturedBanners = dynamic(() => import('@components/shop/FeaturedBanners'), { ssr: false });
const FlashSale = dynamic(() => import('@components/shop/FlashSale'), { ssr: false });
const BestsellerSection = dynamic(() => import('@components/shop/BestsellerSection'), { ssr: false });
const Tech3DShowcase = dynamic(() => import('@components/shop/Tech3DShowcase'), { ssr: false });

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'vi', ['common']))
  }
});

export default function ShopHomePage() {
  return (
    <ShopLayout>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Trust bar */}
      <TrustBar />

      {/* Categories */}
      <CategorySection />

      {/* Featured banners */}
      <FeaturedBanners />

      {/* Flash Sale */}
      <FlashSale />

      {/* Bestseller */}
      <BestsellerSection />

      {/* 3D Tech Showcase */}
      <Tech3DShowcase />
    </ShopLayout>
  );
}
