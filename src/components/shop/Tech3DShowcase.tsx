'use client';
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cpu, Wifi, Battery, Shield, Zap, Globe, ChevronRight } from 'lucide-react';

const techFeatures = [
  {
    icon: Cpu,
    title: 'Chip A17 Pro - Kiến trúc 3nm',
    subtitle: 'Hiệu năng vượt trội',
    description: 'Chip A17 Pro được sản xuất trên tiến trình 3nm tiên tiến nhất, mang đến hiệu năng CPU nhanh hơn 40% và GPU mạnh hơn 20% so với thế hệ trước. Neural Engine 16 nhân xử lý 35 nghìn tỷ phép tính mỗi giây.',
    stats: [
      { label: 'CPU nhanh hơn', value: '40%' },
      { label: 'GPU mạnh hơn', value: '20%' },
      { label: 'Neural Engine', value: '16 nhân' },
    ],
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=500&fit=crop',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Battery,
    title: 'Pin 4422 mAh - Sạc nhanh 27W',
    subtitle: 'Dùng cả ngày không lo hết pin',
    description: 'Dung lượng pin lớn kết hợp với chip tiết kiệm năng lượng cho thời gian sử dụng lên đến 29 giờ phát video. Hỗ trợ sạc nhanh 27W, sạc không dây MagSafe 15W và sạc ngược cho AirPods.',
    stats: [
      { label: 'Phát video', value: '29 giờ' },
      { label: 'Sạc nhanh', value: '27W' },
      { label: 'Sạc không dây', value: '15W' },
    ],
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&h=500&fit=crop',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-400'
  },
  {
    icon: Shield,
    title: 'Face ID & Bảo mật sinh trắc học',
    subtitle: 'An toàn tuyệt đối',
    description: 'Hệ thống nhận diện khuôn mặt TrueDepth tiên tiến với camera hồng ngoại và bộ chiếu điểm dot projector. Bảo mật dữ liệu với Secure Enclave và mã hóa đầu cuối cho mọi thông tin cá nhân.',
    stats: [
      { label: 'Xác thực', value: '<1 giây' },
      { label: 'Điểm chiếu', value: '30.000' },
      { label: 'Mã hóa', value: 'AES-256' },
    ],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=500&fit=crop',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400'
  },
  {
    icon: Globe,
    title: '5G Sub-6GHz & WiFi 6E',
    subtitle: 'Kết nối siêu tốc mọi lúc mọi nơi',
    description: 'Hỗ trợ 5G băng tần Sub-6GHz cho tốc độ download lên đến 4.5 Gbps. WiFi 6E mở rộng băng tần 6GHz giảm độ trễ và tăng tốc độ gấp 3 lần trong môi trường đông đúc.',
    stats: [
      { label: 'Download 5G', value: '4.5 Gbps' },
      { label: 'WiFi 6E', value: '6 GHz' },
      { label: 'Bluetooth', value: '5.3' },
    ],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=500&fit=crop',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-400'
  },
];

function FeatureImage({ image, color, gradient }: { image: string; color: string; gradient: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      className="relative group"
    >
      {/* Glow behind */}
      <div
        className={`absolute -inset-4 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
      />

      {/* Main image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <img
          src={image}
          alt=""
          className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center"
          style={{ background: `${color}33`, border: `1px solid ${color}55` }}
          animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className="w-7 h-7 text-white" />
        </motion.div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full opacity-30"
          style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
        />
      </div>

      {/* Floating ring */}
      <motion.div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-2 opacity-30"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

function FeatureRow({ feature, index }: { feature: typeof techFeatures[0]; index: number }) {
  const isReversed = index % 2 !== 0;
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}
    >
      {/* Image */}
      <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
        <FeatureImage image={feature.image} color={feature.color} gradient={feature.gradient} />
      </div>

      {/* Text content */}
      <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        {/* Icon badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
          style={{ background: `${feature.color}20`, color: feature.color, border: `1px solid ${feature.color}33` }}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className="w-4 h-4" />
          {feature.subtitle}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {feature.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <p className="text-lg md:text-xl font-black" style={{ color: feature.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)` }}
        >
          Tìm hiểu thêm <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Tech3DShowcase() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 rounded-3xl opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: 150 + i * 60,
            height: 150 + i * 60,
            left: `${5 + i * 18}%`,
            top: `${10 + (i % 3) * 30}%`,
            background: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Công nghệ tiên tiến
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Thông số kỹ thuật
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> vượt trội</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Khám phá những công nghệ đỉnh cao được tích hợp trong từng sản phẩm, mang đến trải nghiệm người dùng hoàn hảo
          </p>
        </motion.div>

        {/* Zig-zag features */}
        <div className="space-y-20 md:space-y-28">
          {techFeatures.map((feature, i) => (
            <FeatureRow key={i} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
          >
            Khám phá tất cả sản phẩm
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
