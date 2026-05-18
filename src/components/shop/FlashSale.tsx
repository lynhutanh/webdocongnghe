'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { flashSaleProducts } from '@/data/mockData';

function FlipDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 34, s: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { val: pad(time.h), label: 'Giờ' },
    { val: pad(time.m), label: 'Phút' },
    { val: pad(time.s), label: 'Giây' },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {units.map((u, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className="relative w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center font-black text-base text-white tabular-nums overflow-hidden shadow-lg shadow-black/20">
              {/* 3D flip effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent h-1/2" />
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/20" />
              <FlipDigit value={u.val} />
              {/* Neon glow */}
              <div className="absolute inset-0 rounded-xl border border-orange-500/30" />
            </div>
            <span className="text-[9px] text-gray-500 mt-1 font-medium">{u.label}</span>
          </div>
          {i < 2 && (
            <motion.span
              className="text-orange-500 font-black text-lg mb-4"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              :
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function FlashSale() {
  return (
    <section className="py-8 relative">
      {/* Electric spark background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-orange-400 to-transparent opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              height: '100%',
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Animated lightning icon */}
            <motion.div
              className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-white fill-white" />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-orange-400"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Flash Sale</h2>
              <p className="text-xs text-gray-500">Số lượng có hạn</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden md:inline">Kết thúc sau:</span>
            <CountdownTimer />
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:gap-2 transition-all">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
        {flashSaleProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/50 transition-all relative"
          >
            {/* Neon top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Discount badge with pulse */}
              <motion.div
                className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-lg shadow-lg shadow-red-500/30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                -{product.discount}%
              </motion.div>

              {/* Holographic sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.7 }}
              />

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2">
                <div className="flex items-center justify-between text-white text-[10px] mb-1">
                  <span className="font-medium">🔥 Đã bán {product.timeLeft}%</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg, #f97316, #ef4444, #ec4899)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${product.timeLeft}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1 }}
                  >
                    {/* Animated shine on progress */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-xs text-gray-600 font-medium line-clamp-2 mb-2 group-hover:text-gray-800 transition">{product.name}</p>

              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-2.5 h-2.5 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-black text-orange-500">
                  {product.flashPrice.toLocaleString('vi-VN')}đ
                </p>
                <p className="text-[10px] text-gray-400 line-through">
                  {product.price.toLocaleString('vi-VN')}đ
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-orange-200 transition-shadow relative overflow-hidden group/btn"
              >
                {/* Button shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <ShoppingCart className="w-3 h-3 relative z-10" />
                <span className="relative z-10">Mua ngay</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
