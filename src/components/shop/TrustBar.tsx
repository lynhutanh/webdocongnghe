'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Miễn phí vận chuyển',
    desc: 'Cho đơn hàng từ 500.000đ',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    desc: 'Trong vòng 7 ngày',
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    icon: Shield,
    title: 'Thanh toán an toàn',
    desc: 'Bảo mật 100%',
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    desc: '1900 1234',
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  }
];

export default function TrustBar() {
  return (
    <section className="py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 ${f.bg} dark:bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{f.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
