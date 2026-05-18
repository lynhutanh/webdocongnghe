import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star, ShoppingCart, Crown, Medal, Trophy } from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import { products } from '@/data/mockData';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

const tabs = ['Tất cả', 'Điện thoại', 'Laptop', 'Tai nghe', 'Đồng hồ'];

const rankIcons = [
  { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-200' },
  { icon: Trophy, color: 'text-orange-400', bg: 'bg-orange-50', border: 'border-orange-200' },
];

export default function BestsellerPage() {
  const [activeTab, setActiveTab] = useState('Tất cả');

  const filtered = activeTab === 'Tất cả'
    ? [...products].sort((a, b) => b.reviews - a.reviews)
    : [...products].filter(p => p.category === activeTab).sort((a, b) => b.reviews - a.reviews);

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <ShopLayout>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8 md:p-12">
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">TOP BÁN CHẠY</span>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-3"
          >
            Bestseller
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg"
          >
            Những sản phẩm được yêu thích và mua nhiều nhất
          </motion.p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div className="mb-10">
        <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Top 3 bán chạy nhất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((product, i) => {
            const rank = rankIcons[i];
            const RankIcon = rank.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-3xl overflow-hidden border-2 ${rank.border} hover:shadow-xl transition-all`}
              >
                {/* Rank badge */}
                <div className={`absolute top-4 left-4 z-10 w-10 h-10 ${rank.bg} ${rank.border} border-2 rounded-2xl flex items-center justify-center`}>
                  <RankIcon className={`w-5 h-5 ${rank.color}`} />
                </div>

                {/* Rank number */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black text-sm">
                  #{i + 1}
                </div>

                {/* Image */}
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-xs text-purple-500 font-medium mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{product.reviews.toLocaleString()} đánh giá</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</p>
                      <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl text-sm flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Mua
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ranked list */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-5">Bảng xếp hạng đầy đủ</h2>
        <div className="space-y-3">
          {rest.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ x: 4 }}
              className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all p-4 flex items-center gap-4"
            >
              {/* Rank */}
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-500 flex-shrink-0">
                #{i + 4}
              </div>

              {/* Image */}
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-orange-500 font-medium">{product.category}</p>
                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</p>
                <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</p>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 w-10 h-10 bg-orange-100 hover:bg-orange-500 text-orange-500 hover:text-white rounded-xl flex items-center justify-center transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}
