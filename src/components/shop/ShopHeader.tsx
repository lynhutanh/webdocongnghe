'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, User, Menu, X, ChevronDown,
  Smartphone, Laptop, Headphones, Watch, Tablet, Camera, Gamepad2, Zap, Bell, Heart
} from 'lucide-react';
import { products } from '@/data/mockData';
import DarkModeToggle from './DarkModeToggle';

const navLinks = [
  { label: 'Trang chủ', href: '/shop' },
  {
    label: 'Sản phẩm', href: '/shop/products',
    sub: [
      { label: 'Điện thoại', href: '/shop/products?cat=phone', icon: Smartphone },
      { label: 'Laptop', href: '/shop/products?cat=laptop', icon: Laptop },
      { label: 'Tai nghe', href: '/shop/products?cat=headphone', icon: Headphones },
      { label: 'Đồng hồ', href: '/shop/products?cat=watch', icon: Watch },
      { label: 'Máy tính bảng', href: '/shop/products?cat=tablet', icon: Tablet },
      { label: 'Camera', href: '/shop/products?cat=camera', icon: Camera },
      { label: 'Gaming', href: '/shop/products?cat=gaming', icon: Gamepad2 },
      { label: 'Phụ kiện', href: '/shop/products?cat=accessory', icon: Zap },
    ]
  },
  { label: 'Khuyến mãi', href: '/shop/sale' },
  { label: 'Bestseller', href: '/shop/bestseller' },
  { label: 'Tin tức', href: '/shop/news' },
  { label: 'Liên hệ', href: '/shop/contact' },
];

interface ShopHeaderProps {
  cartCount?: number;
}

export default function ShopHeader({ cartCount = 3 }: ShopHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchResults = searchQuery.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>🚚 Miễn phí vận chuyển cho đơn hàng từ 500.000đ</span>
            <span className="hidden md:inline">🔄 Đổi trả trong 7 ngày</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Hỗ trợ khách hàng:</span>
            <span className="font-bold">1900 1234</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20 dark:border-gray-800/50'
            : 'bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/shop" className="flex items-center gap-2 flex-shrink-0 group">
              <motion.div
                className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 relative"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Zap className="w-5 h-5 text-white" />
                {/* Neon pulse */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-orange-400"
                  animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                TechHub
              </span>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-xl relative hidden md:block">
              <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
                {/* Glow effect when focused */}
                {searchFocused && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-2xl blur-md opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                  />
                )}
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Bạn cần tìm gì?"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="relative w-full pl-4 pr-12 py-2.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:border-orange-400 focus:outline-none transition-all text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 z-10"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-xl hover:opacity-90 transition z-10">
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Search dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {searchResults.map(p => (
                      <Link
                        key={p.id}
                        href={`/shop/product/${p.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition"
                        onClick={() => setSearchQuery('')}
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{p.name}</p>
                          <p className="text-xs text-orange-500 font-semibold">
                            {p.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              {/* Mobile search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="hidden md:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition relative">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Dark mode toggle */}
              <div className="hidden md:block">
                <DarkModeToggle />
              </div>

              {/* Wishlist */}
              <button className="hidden md:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Account */}
              <Link href="/shop/account" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">Tài khoản</span>
              </Link>

              {/* Cart */}
              <Link href="/shop/cart" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 transition relative group">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden md:inline text-sm text-orange-600 font-medium">Giỏ hàng</span>
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-1 h-11">
              {/* Danh mục button */}
              <button
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition mr-2"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Menu className="w-4 h-4" />
                Danh mục
                <ChevronDown className="w-3 h-3" />
              </button>

              {navLinks.map(link => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub ? setActiveDropdown(link.label) : null}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-500 transition rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10"
                  >
                    {link.label}
                    {link.sub && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {link.sub && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-2 z-50"
                      >
                        {link.sub.map(sub => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition group"
                            >
                              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-500/30 transition">
                                <Icon className="w-4 h-4 text-orange-500" />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 font-medium">{sub.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-4 pr-12 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-orange-400 focus:outline-none text-sm"
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-xl">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 overflow-hidden bg-white"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
