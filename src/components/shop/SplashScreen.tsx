'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Single orbit ring */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border border-blue-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />

          {/* Tech orbit rings */}
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full border border-cyan-500/15"
            style={{ borderStyle: 'dashed' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[550px] h-[550px] rounded-full border border-purple-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {/* Dot on ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
          </motion.div>
          <motion.div
            className="absolute w-[680px] h-[680px] rounded-full border border-blue-400/5"
            style={{ borderStyle: 'dotted' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
          </motion.div>

          {/* Arc segments */}
          <svg className="absolute w-[500px] h-[500px] opacity-20" viewBox="0 0 200 200">
            <motion.circle
              cx="100" cy="100" r="90"
              fill="none" stroke="url(#grad1)" strokeWidth="0.5"
              strokeDasharray="40 60"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: 'center' }}
            />
            <motion.circle
              cx="100" cy="100" r="75"
              fill="none" stroke="url(#grad2)" strokeWidth="0.3"
              strokeDasharray="20 80"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: 'center' }}
            />
            <defs>
              <linearGradient id="grad1"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
              <linearGradient id="grad2"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Real phone image */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ rotateY: [0, 6, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=250&h=500&fit=crop"
                  alt="iPhone"
                  className="w-32 h-60 object-cover rounded-[2rem] shadow-2xl border-2 border-gray-700/50"
                />

                {/* Screen reflection */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none"
                  animate={{ opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-blue-500/20 blur-3xl scale-[1.6]" />

              {/* Floating icons */}
              {[
                { x: -60, y: -20, delay: 0.5 },
                { x: 60, y: -30, delay: 0.8 },
                { x: 0, y: 60, delay: 1.1 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-7 h-7 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x: item.x, y: item.y }}
                  transition={{ delay: item.delay, duration: 0.5, ease: 'easeOut' }}
                >
                  {i === 0 && (
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Logo & text */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  TechHub
                </span>
              </div>

              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">
                Công nghệ • Đẳng cấp • Tương lai
              </p>

              {/* Loading bar */}
              <div className="mt-5 w-40 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
