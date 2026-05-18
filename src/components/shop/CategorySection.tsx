'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

export default function CategorySection() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Danh mục nổi bật</h2>
          <p className="text-sm text-gray-500 mt-1">Khám phá hàng ngàn sản phẩm công nghệ</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:gap-2 transition-all">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hexagon-style grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-3 p-4 rounded-2xl relative"
          >
            {/* Hexagon-ish container with neon glow */}
            <div className="relative">
              {/* Neon glow ring */}
              <motion.div
                className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500`}
              />

              {/* Connection dots */}
              <motion.div
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100`}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100`}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />

              {/* Main icon container */}
              <motion.div
                className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-transparent transition-all duration-300"
                style={{ width: 72, height: 72 }}
                whileHover={{ rotateY: 15, rotateX: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Tech overlay pattern */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 2s infinite'
                  }}
                />

                {/* Border glow */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${cat.color}`}
                  style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', padding: 2 }}
                />
              </motion.div>
            </div>

            {/* Label */}
            <div className="text-center">
              <span className="text-xs font-bold text-gray-700 group-hover:text-orange-600 transition block leading-tight">
                {cat.name}
              </span>
              <motion.span
                className="text-[10px] text-gray-400 group-hover:text-orange-400 transition"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                {cat.count} sản phẩm
              </motion.span>
            </div>

            {/* Bottom line indicator */}
            <motion.div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r ${cat.color}`}
              initial={{ width: 0 }}
              whileHover={{ width: '60%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Animated connection line */}
      <div className="relative mt-4 h-[2px] rounded-full overflow-hidden bg-gray-100">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full"
          animate={{ x: ['0%', '300%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
