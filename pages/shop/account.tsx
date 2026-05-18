import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import {
  User, Package, Heart, MapPin, CreditCard, Bell, Shield,
  ChevronRight, Star, Clock, Check, Edit3, Camera
} from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import { products } from '@/data/mockData';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

const menuItems = [
  { icon: Package, label: 'Đơn hàng của tôi', count: 12, color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Heart, label: 'Sản phẩm yêu thích', count: 8, color: 'text-red-500', bg: 'bg-red-50' },
  { icon: MapPin, label: 'Địa chỉ giao hàng', count: 3, color: 'text-green-500', bg: 'bg-green-50' },
  { icon: CreditCard, label: 'Phương thức thanh toán', count: 2, color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Bell, label: 'Thông báo', count: 5, color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Shield, label: 'Bảo mật tài khoản', count: null, color: 'text-gray-500', bg: 'bg-gray-50' },
];

const orders = [
  { id: '#TH001234', date: '20/06/2024', status: 'delivered', total: 28990000, items: [products[0]] },
  { id: '#TH001235', date: '18/06/2024', status: 'shipping', total: 6990000, items: [products[2]] },
  { id: '#TH001236', date: '15/06/2024', status: 'processing', total: 24990000, items: [products[1]] },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  delivered: { label: 'Đã giao', color: 'text-green-600', bg: 'bg-green-50', icon: Check },
  shipping: { label: 'Đang giao', color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  processing: { label: 'Đang xử lý', color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock },
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <ShopLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 p-6 text-center"
          >
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-100">
                <img src="https://i.pravatar.cc/80?img=5" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <h3 className="font-black text-gray-900 text-lg">Nguyễn Văn A</h3>
            <p className="text-sm text-gray-500 mb-3">nguyenvana@email.com</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-500 ml-1">Khách hàng VIP</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { val: '12', label: 'Đơn hàng' },
                { val: '8', label: 'Yêu thích' },
                { val: '4.9', label: 'Đánh giá' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl py-2">
                  <p className="font-black text-gray-900">{stat.val}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Menu */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = (i === 0 && activeTab === 'orders') || (i === 1 && activeTab === 'wishlist');
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i === 0 ? 'orders' : i === 1 ? 'wishlist' : 'profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition border-b border-gray-50 last:border-0 ${isActive ? 'bg-orange-50' : ''}`}
                >
                  <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className={`flex-1 text-sm font-medium text-left ${isActive ? 'text-orange-600' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  {item.count !== null && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.count}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-gray-900">Đơn hàng của tôi</h2>
                <div className="flex items-center gap-2">
                  {['Tất cả', 'Đang xử lý', 'Đang giao', 'Đã giao'].map(s => (
                    <button key={s} className="px-3 py-1.5 text-xs font-medium rounded-xl bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {orders.map((order, i) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-bold text-gray-800">{order.id}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {order.date}
                          </p>
                        </div>
                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${status.bg} ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>

                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 mb-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">Màu: Titan Đen • 256GB</p>
                          </div>
                          <p className="font-black text-orange-500 flex-shrink-0">{item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Tổng: <span className="font-black text-gray-900">{order.total.toLocaleString('vi-VN')}đ</span>
                        </p>
                        <div className="flex items-center gap-2">
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-orange-50 text-orange-500 font-semibold rounded-xl text-sm hover:bg-orange-100 transition">
                              Đánh giá
                            </button>
                          )}
                          <button className="px-4 py-2 bg-gray-100 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-200 transition">
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-black text-gray-900 mb-5">Sản phẩm yêu thích</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-2">{product.name}</p>
                      <p className="text-sm font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</p>
                      <button className="mt-2 w-full py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-gray-900">Thông tin cá nhân</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-500 font-semibold rounded-xl text-sm hover:bg-orange-100 transition">
                  <Edit3 className="w-4 h-4" /> Chỉnh sửa
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                {[
                  { label: 'Họ và tên', value: 'Nguyễn Văn A' },
                  { label: 'Email', value: 'nguyenvana@email.com' },
                  { label: 'Số điện thoại', value: '0901 234 567' },
                  { label: 'Ngày sinh', value: '01/01/1995' },
                  { label: 'Giới tính', value: 'Nam' },
                ].map((field, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500 w-36 flex-shrink-0">{field.label}</span>
                    <span className="text-sm font-semibold text-gray-800">{field.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
}
