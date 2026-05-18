import React, { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Zap, Flame, Clock, ArrowRight, Star, ShoppingCart } from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import { products } from '@/data/mockData';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

function BigCountdown() {
  const [time, setTime] = useState({ d: 2, h: 14, m: 37, s: 42 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { d, h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) d = 0;
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { val: pad(time.d), label: 'Ngày' },
    { val: pad(time.h), label: 'Giờ' },
    { val: pad(time.m), label: 'Phút' },
    { val: pad(time.s), label: 'Giây' },
  ];
  return (
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <motion.div
              key={u.val}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-black text-2xl tabular-nums border border-white/30"
            >
              {u.val}
            </motion.div>
            <span className="text-white/70 text-xs mt-1">{u.label}</span>
          </div>
          {i < 3 && <span className="text-white font-black text-2xl mb-4">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

const saleCategories = [
  { label: 'Tất cả', discount: null },
  { label: 'Giảm 10-20%', discount: [10, 20] },
  { label: 'Giảm 20-30%', discount: [20, 30] },
  { label: 'Trên 30%', discount: [30, 100] },
];

export default function SalePage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const filtered = activeCategory === 0
    ? products
    : products.filter(p => {
        const range = saleCategories[activeCategory].discount!;
        return p.discount >= range[0] && p.discount < range[1];
      });

  return (
    <ShopLayout>
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-3"
            >
              <Flame className="w-6 h-6 fill-white" />
              <span className="text-lg font-bold opacity-90">MEGA SALE</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black leading-none mb-2"
            >
              GIẢM ĐẾN
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl md:text-9xl font-black text-yellow-300 leading-none"
            >
              50%
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 text-lg mt-3"
            >
              Hàng ngàn sản phẩm công nghệ chính hãng
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock className="w-4 h-4" />
              Kết thúc sau:
            </div>
            <BigCountdown />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-500 font-black rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-2"
            >
              <Zap className="w-5 h-5" /> Mua ngay
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {saleCategories.map((cat, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveCategory(i)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeCategory === i
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Section: Hot deals */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500 fill-red-500" />
            Deal hot nhất
          </h2>
          <button className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:gap-2 transition-all">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Big deal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filtered.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Discount badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white font-black text-xl px-4 py-2 rounded-2xl shadow-lg">
                  -{product.discount}%
                </div>

                {/* Savings */}
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs opacity-80">Tiết kiệm</p>
                  <p className="font-black text-lg">
                    {(product.originalPrice - product.price).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-xs text-orange-500 font-medium mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-800 mb-3 line-clamp-2">{product.name}</h3>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</p>
                    <p className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Mua ngay
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.slice(3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-lg">
                  -{product.discount}%
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-2">{product.name}</p>
                <p className="text-sm font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</p>
                <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</p>
                <button className="mt-2 w-full py-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1">
                  <ShoppingCart className="w-3 h-3" /> Thêm vào giỏ
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}
