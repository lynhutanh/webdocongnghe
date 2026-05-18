'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { banners } from '@/data/mockData';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
    });
  };

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const prev = () => goTo((current - 1 + banners.length) % banners.length);
  const next = () => goTo((current + 1) % banners.length);

  const banner = banners[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 })
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl"
      style={{ height: 420 }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute inset-0 bg-gradient-to-r ${banner.bg}`}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-10"
                style={{
                  width: Math.random() * 80 + 20,
                  height: Math.random() * 80 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: banner.accent
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Grid lines effect */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(${banner.accent} 1px, transparent 1px), linear-gradient(90deg, ${banner.accent} 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 gap-8 items-center">
              {/* Text */}
              <div className="text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: `${banner.accent}33`, border: `1px solid ${banner.accent}66` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: banner.accent }} />
                  Sản phẩm nổi bật
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black mb-2 leading-tight"
                >
                  {banner.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-semibold mb-3 opacity-80"
                >
                  {banner.subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm opacity-60 mb-8 max-w-sm"
                >
                  {banner.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
                    style={{ background: banner.accent, color: 'white', boxShadow: `0 8px 24px ${banner.accent}66` }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {banner.cta}
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                    <Eye className="w-4 h-4" />
                    Xem thêm
                  </button>
                </motion.div>
              </div>

              {/* 3D Product image */}
              <motion.div
                className="relative flex items-center justify-center"
                style={{
                  perspective: 1000,
                  rotateY: mousePos.x * 10,
                  rotateX: -mousePos.y * 5
                }}
                animate={{
                  rotateY: mousePos.x * 10,
                  rotateX: -mousePos.y * 5
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{ background: banner.accent }}
                />

                {/* Floating rings */}
                <motion.div
                  className="absolute w-64 h-64 rounded-full border opacity-20"
                  style={{ borderColor: banner.accent }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute w-48 h-48 rounded-full border opacity-30"
                  style={{ borderColor: banner.accent, borderStyle: 'dashed' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                {/* Product image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="relative z-10"
                >
                  <motion.img
                    src={banner.image}
                    alt={banner.title}
                    className="w-72 h-72 object-cover rounded-2xl shadow-2xl"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      boxShadow: `0 30px 60px ${banner.accent}44, 0 0 0 1px ${banner.accent}22`
                    }}
                  />

                  {/* Sale badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-black text-xs shadow-lg"
                    style={{ background: `linear-gradient(135deg, #ff6b35, #f7c59f)` }}
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[10px]">SALE</span>
                    <span className="text-base">50%</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
          >
            <motion.div
              animate={{ width: i === current ? 24 : 8 }}
              className="h-2 rounded-full bg-white"
              style={{ opacity: i === current ? 1 : 0.5 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
