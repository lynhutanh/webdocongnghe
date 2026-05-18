'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredBanners } from '@/data/mockData';

export default function FeaturedBanners() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredBanners.map((banner, i) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, x: i === 0 ? -30 : i === 2 ? 30 : 0, y: i === 1 ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bg} p-6 cursor-pointer group`}
            style={{ minHeight: 140 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-white font-black text-lg leading-tight">{banner.title}</h3>
              <p className="text-white/80 text-sm font-semibold mt-1">{banner.subtitle}</p>
              <button className="mt-3 flex items-center gap-1 text-white text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition group-hover:gap-2">
                {banner.cta} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Product image */}
            <motion.img
              src={banner.image}
              alt={banner.title}
              className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: '55%' }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
