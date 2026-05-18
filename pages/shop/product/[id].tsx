import React, { useState } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Share2, Star, Shield, Truck, RefreshCw,
  ChevronRight, Minus, Plus, Check, Zap, ChevronLeft
} from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import ProductCard from '@components/shop/ProductCard';
import { products } from '@/data/mockData';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map(p => ({ params: { id: String(p.id) } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = async ({ locale, params }) => ({
  props: {
    id: params?.id ?? '1',
    ...(await serverSideTranslations(locale ?? 'vi', ['common']))
  }
});

const colorOptions = ['#1a1a1a', '#f5f5f0', '#3b82f6', '#ef4444', '#8b5cf6'];
const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

const reviews = [
  { id: 1, name: 'Nguyễn Văn A', rating: 5, date: '15/06/2024', comment: 'Sản phẩm tuyệt vời, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận.', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Trần Thị B', rating: 4, date: '10/06/2024', comment: 'Chất lượng tốt, giá hợp lý. Sẽ mua lại lần sau.', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Lê Văn C', rating: 5, date: '05/06/2024', comment: 'Rất hài lòng với sản phẩm. Camera chụp đẹp, pin trâu.', avatar: 'https://i.pravatar.cc/40?img=3' },
];

export default function ProductDetailPage({ id }: { id: string }) {
  const product = products.find(p => p.id === Number(id)) ?? products[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    product.image,
    product.image.replace('w=400', 'w=401'),
    product.image.replace('w=400', 'w=402'),
    product.image.replace('w=400', 'w=403'),
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <ShopLayout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a href="/shop" className="hover:text-orange-500 transition">Trang chủ</a>
        <ChevronRight className="w-3 h-3" />
        <a href="/shop/products" className="hover:text-orange-500 transition">Sản phẩm</a>
        <ChevronRight className="w-3 h-3" />
        <a href={`/shop/products?cat=${product.category}`} className="hover:text-orange-500 transition">{product.category}</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Left: Images */}
        <div className="space-y-4">
          <motion.div
            className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden aspect-square cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={isZoomed ? {
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: 'scale(1.8)',
                transition: 'transform 0.1s ease'
              } : {}}
            />

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-red-500 text-white text-sm font-black px-3 py-1 rounded-xl">-{product.discount}%</span>
              )}
              {product.isNew && (
                <span className="bg-green-500 text-white text-sm font-black px-3 py-1 rounded-xl">MỚI</span>
              )}
            </div>

            <button onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-gray-600 transition">
              <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            <button onClick={() => setActiveImage(i => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-gray-600 transition">
              <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
          </motion.div>

          <div className="flex gap-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === i ? 'border-orange-500 shadow-lg shadow-orange-100 dark:shadow-orange-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                }`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-lg">{product.category}</span>
              {product.isBestseller && (
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-lg">Bestseller</span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} đánh giá)</span>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">• Còn hàng</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10 rounded-2xl p-5 border border-orange-100 dark:border-orange-500/20">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</span>
              <span className="text-lg text-gray-400 line-through mb-1">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-red-500 text-white font-bold px-2 py-0.5 rounded-lg">
                Tiết kiệm {(product.originalPrice - product.price).toLocaleString('vi-VN')}đ
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Giá đã bao gồm VAT</span>
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">Màu sắc: <span className="text-gray-500 dark:text-gray-400 font-normal">Titan Đen</span></p>
            <div className="flex items-center gap-2">
              {colorOptions.map((color, i) => (
                <button key={i} onClick={() => setSelectedColor(i)}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === i ? 'border-orange-500 scale-110 shadow-lg' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'}`}
                  style={{ background: color }} />
              ))}
            </div>
          </div>

          {/* Storage */}
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">Dung lượng:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {storageOptions.map((opt, i) => (
                <button key={i} onClick={() => setSelectedStorage(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    selectedStorage === i
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-300'
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">Số lượng:</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-gray-800 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Còn 142 sản phẩm</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all ${
                addedToCart ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-500/20'
              }`}>
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2"><Check className="w-5 h-5" /> Đã thêm vào giỏ</motion.span>
                ) : (
                  <motion.span key="add" className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Thêm vào giỏ hàng</motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setLiked(!liked)}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${liked ? 'border-red-400 bg-red-50 dark:bg-red-500/10 text-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-300'}`}>
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-300 transition">
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Buy now */}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="w-full py-4 rounded-2xl border-2 border-orange-500 text-orange-500 font-bold text-base hover:bg-orange-50 dark:hover:bg-orange-500/10 transition flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" /> Mua ngay
          </motion.button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Shield, label: 'Bảo hành 12 tháng', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
              { icon: Truck, label: 'Giao hàng miễn phí', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
              { icon: RefreshCw, label: 'Đổi trả 7 ngày', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`${item.bg} rounded-2xl p-3 flex flex-col items-center gap-1 text-center`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
          {[
            { key: 'description', label: 'Mô tả sản phẩm' },
            { key: 'specs', label: 'Thông số kỹ thuật' },
            { key: 'reviews', label: `Đánh giá (${product.reviews.toLocaleString()})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-base mb-4">
                <strong className="text-gray-900 dark:text-white">{product.name}</strong> là sản phẩm công nghệ hàng đầu với thiết kế tinh tế và hiệu năng vượt trội. Được trang bị những công nghệ tiên tiến nhất, sản phẩm mang đến trải nghiệm người dùng tuyệt vời.
              </p>
              <ul className="space-y-2 text-sm">
                {['Thiết kế cao cấp, sang trọng', 'Hiệu năng mạnh mẽ với chip thế hệ mới', 'Camera chuyên nghiệp với nhiều chế độ chụp', 'Pin dung lượng lớn, sạc nhanh', 'Màn hình OLED sắc nét, tần số quét cao', 'Hỗ trợ 5G, WiFi 6E'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === 'specs' && (
            <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {[
                  ['Màn hình', '6.7 inch Super Retina XDR OLED, 2796 x 1290 px'],
                  ['Chip', 'A17 Pro, 6 nhân CPU, 6 nhân GPU'],
                  ['RAM', '8GB'],
                  ['Bộ nhớ trong', '256GB / 512GB / 1TB'],
                  ['Camera sau', '48MP + 12MP + 12MP'],
                  ['Camera trước', '12MP TrueDepth'],
                  ['Pin', '4422 mAh, sạc nhanh 27W'],
                  ['Hệ điều hành', 'iOS 17'],
                  ['Kết nối', '5G, WiFi 6E, Bluetooth 5.3, NFC'],
                  ['Kích thước', '159.9 x 76.7 x 8.25 mm'],
                  ['Trọng lượng', '221g'],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex items-start gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 w-36 flex-shrink-0">{label}</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6 flex flex-col md:flex-row items-center gap-8">
                <div className="text-center">
                  <p className="text-6xl font-black text-gray-900 dark:text-white">{product.rating}</p>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.reviews.toLocaleString()} đánh giá</p>
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-4">{star}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : 3}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-8">{star === 5 ? '72%' : star === 4 ? '18%' : star === 3 ? '6%' : '3%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800 dark:text-gray-100">{review.name}</p>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </ShopLayout>
  );
}
