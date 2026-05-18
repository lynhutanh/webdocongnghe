'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@stores/themeStore';

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full p-1 transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30'
          : 'bg-gradient-to-r from-orange-300 to-yellow-300 shadow-lg shadow-yellow-500/20'
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      {/* Background stars/sun rays */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {isDark ? (
          // Stars
          <>
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: '20%', left: '20%' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ top: '60%', left: '30%' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ top: '30%', left: '45%' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
            />
          </>
        ) : (
          // Sun rays
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-2 bg-yellow-500/30 rounded-full"
                style={{
                  top: '50%',
                  right: '25%',
                  transformOrigin: 'center',
                  rotate: `${i * 60}deg`,
                  translateY: '-50%'
                }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}
      </div>

      {/* Toggle knob */}
      <motion.div
        className="relative w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0,
          rotate: isDark ? 360 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Knob background */}
        <div className={`absolute inset-0 rounded-full ${
          isDark
            ? 'bg-gradient-to-br from-gray-100 to-gray-300'
            : 'bg-gradient-to-br from-yellow-200 to-orange-300'
        }`} />

        {/* Moon/Sun icon */}
        {isDark ? (
          // Moon
          <svg className="w-3 h-3 text-indigo-600 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          // Sun
          <svg className="w-3 h-3 text-orange-600 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        )}

        {/* Glow */}
        <motion.div
          className={`absolute inset-0 rounded-full ${isDark ? 'bg-purple-400' : 'bg-yellow-400'}`}
          animate={{ scale: [1, 1.4, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.button>
  );
}
