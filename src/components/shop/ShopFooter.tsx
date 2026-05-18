'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Facebook, Youtube, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
  'Về TechHub': ['Giới thiệu', 'Tuyển dụng', 'Tin tức', 'Đối tác'],
  'Hỗ trợ': ['Hướng dẫn mua hàng', 'Chính sách đổi trả', 'Bảo hành', 'FAQ'],
  'Danh mục': ['Điện thoại', 'Laptop', 'Tai nghe', 'Đồng hồ', 'Gaming'],
};

export default function ShopFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 relative overflow-hidden">
      {/* Animated circuit pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h80v80H10z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="90" cy="10" r="2" fill="currentColor" />
              <circle cx="10" cy="90" r="2" fill="currentColor" />
              <circle cx="90" cy="90" r="2" fill="currentColor" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <path d="M10 10L50 50M90 10L50 50M10 90L50 50M90 90L50 50" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" className="text-blue-400" />
        </svg>
      </div>

      {/* Animated wave top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Newsletter */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 py-10 overflow-hidden">
        {/* Animated particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="text-white text-2xl font-black">Đăng ký nhận ưu đãi</h3>
            <p className="text-white/80 text-sm mt-1">Nhận ngay voucher 100.000đ cho đơn hàng đầu tiên</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 focus:border-white/50 transition backdrop-blur-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition flex items-center gap-2 shadow-lg"
            >
              Đăng ký <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-black text-white">TechHub</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Điểm đến công nghệ hàng đầu Việt Nam. Hàng chính hãng, giá tốt nhất, giao hàng nhanh toàn quốc.
            </p>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition cursor-pointer">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition cursor-pointer">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition cursor-pointer">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@techhub.vn</span>
              </div>
            </div>

            {/* Social with neon hover */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Facebook, color: '#3b82f6' },
                { Icon: Youtube, color: '#ef4444' },
                { Icon: Instagram, color: '#ec4899' },
                { Icon: Twitter, color: '#06b6d4' },
              ].map(({ Icon, color }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors group"
                >
                  {/* Neon glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 blur-md transition-opacity"
                    style={{ background: color }}
                  />
                  <Icon className="w-4 h-4 relative z-10 group-hover:text-white transition" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition flex items-center gap-1 group">
                      <motion.span
                        className="w-0 group-hover:w-3 overflow-hidden transition-all text-orange-400"
                        initial={{ width: 0 }}
                      >
                        ›
                      </motion.span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 TechHub. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-400 transition">Chính sách bảo mật</a>
            <a href="#" className="hover:text-orange-400 transition">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
