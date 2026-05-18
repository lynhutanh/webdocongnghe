'use client';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/router';
import { ShoppingCart, Heart, Eye, Star, Zap } from 'lucide-react';
import type { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const badgeColors: Record<string, string> = {
    HOT: 'bg-red-500',
    SALE: 'bg-orange-500',
    NEW: 'bg-green-500',
    GAMING: 'bg-purple-500',
    PRO: 'bg-blue-500'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 800
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-300"
    >
      {/* Neon glow border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      <div className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-900 z-[1]" />

      {/* Card content */}
      <div className="relative z-[2] rounded-2xl overflow-hidden">
        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          {/* Discount badge */}
          {product.discount > 0 && (
            <motion.div
              className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg shadow-red-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              -{product.discount}%
            </motion.div>
          )}

          {/* Type badge */}
          {product.badge && (
            <div className={`absolute top-3 right-3 z-10 ${badgeColors[product.badge] || 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg`}>
              {product.badge}
            </div>
          )}

          {product.isNew && !product.badge && (
            <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg shadow-green-500/30">
              MỚI
            </div>
          )}

          {/* Product image with 3D depth */}
          <motion.div
            className="w-full h-full"
            style={{ transform: 'translateZ(30px)' }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Holographic shine sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.preventDefault(); router.push(`/shop/product/${product.id}`); }}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition ${
                addedToCart
                  ? 'bg-green-500 text-white shadow-green-500/40'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/40'
              }`}
            >
              {addedToCart ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm">✓</motion.span>
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
            >
              <Heart className={`w-4 h-4 transition ${liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </motion.button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-orange-500 font-medium mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-black text-orange-500">
                {product.price.toLocaleString('vi-VN')}đ
              </p>
              <p className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </p>
            </div>

            {/* Quick add button with neon effect */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="relative w-9 h-9 bg-orange-100 hover:bg-orange-500 text-orange-500 hover:text-white rounded-xl flex items-center justify-center transition-all group/btn"
            >
              <div className="absolute inset-0 rounded-xl bg-orange-500 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
              <ShoppingCart className="w-4 h-4 relative z-10" />
            </motion.button>
          </div>
        </div>

        {/* Bestseller neon line */}
        {product.isBestseller && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #f97316, #ef4444, #ec4899, #8b5cf6, #3b82f6)' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
