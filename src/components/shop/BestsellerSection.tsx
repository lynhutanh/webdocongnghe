'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { products } from '@/data/mockData';
import ProductCard from './ProductCard';

const tabs = ['Tất cả', 'Điện thoại', 'Laptop', 'Tai nghe', 'Đồng hồ', 'Gaming'];

export default function BestsellerSection() {
  const [activeTab, setActiveTab] = useState('Tất cả');

  const filtered = activeTab === 'Tất cả'
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Sản phẩm bán chạy</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Được yêu thích nhất tháng này</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:gap-2 transition-all">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Products grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {filtered.slice(0, 12).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
