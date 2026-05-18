import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash2, Plus, Minus, Tag, ChevronRight,
  Shield, Truck, ArrowLeft, Gift, Zap
} from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import { products } from '@/data/mockData';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

const initialCart = [
  { ...products[0], qty: 1 },
  { ...products[1], qty: 2 },
  { ...products[2], qty: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const updateQty = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setCartItems(items => items.filter(item => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'TECH10') setCouponApplied(true);
  };

  return (
    <ShopLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <a href="/shop/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition">
          <ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm
        </a>
        <div className="h-4 w-px bg-gray-200" />
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          Giỏ hàng
          <span className="text-base font-semibold text-gray-400">({cartItems.length} sản phẩm)</span>
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-black text-gray-700 mb-3">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <a
            href="/shop/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-200 transition"
          >
            <Zap className="w-5 h-5" /> Mua sắm ngay
          </a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select all */}
            <div className="bg-white rounded-2xl border border-gray-100 px-5 py-3 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded" />
                <span className="text-sm font-semibold text-gray-700">Chọn tất cả ({cartItems.length})</span>
              </label>
              <button className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                <Trash2 className="w-4 h-4" /> Xóa đã chọn
              </button>
            </div>

            {/* Items */}
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: removingId === item.id ? 0 : 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded mt-1 flex-shrink-0" />

                    {/* Image */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-orange-500 font-medium mb-1">{item.category}</p>
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-400 mb-3">Màu: Titan Đen • 256GB</p>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        {/* Price */}
                        <div>
                          <p className="text-lg font-black text-orange-500">
                            {item.price.toLocaleString('vi-VN')}đ
                          </p>
                          <p className="text-xs text-gray-400 line-through">
                            {item.originalPrice.toLocaleString('vi-VN')}đ
                          </p>
                        </div>

                        {/* Qty + delete */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Suggested products */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Gift className="w-4 h-4 text-orange-500" />
                Có thể bạn cũng thích
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {products.slice(4, 8).map(p => (
                  <div key={p.id} className="group cursor-pointer">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-sm font-black text-orange-500">{p.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-500" />
                Mã giảm giá
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã (TECH10)"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-orange-400 focus:outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition"
                >
                  Áp dụng
                </button>
              </div>
              {couponApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1"
                >
                  ✓ Áp dụng mã giảm giá thành công! Giảm 10%
                </motion.p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính ({cartItems.reduce((s, i) => s + i.qty, 0)} sản phẩm)</span>
                  <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Giảm giá (TECH10)</span>
                    <span className="text-green-600 font-semibold">-{discount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                    {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-xl font-black text-orange-500">{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-200 transition-shadow"
              >
                Tiến hành thanh toán <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Trust */}
              <div className="mt-4 space-y-2">
                {[
                  { icon: Shield, text: 'Thanh toán bảo mật 100%' },
                  { icon: Truck, text: 'Giao hàng toàn quốc' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <Icon className="w-3.5 h-3.5 text-green-500" />
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </ShopLayout>
  );
}
