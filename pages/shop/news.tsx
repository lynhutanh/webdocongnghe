import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Newspaper, Clock, Eye, Tag, ArrowRight, Search, TrendingUp } from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'vi', ['common'])) }
});

const newsCategories = ['Tất cả', 'Tin tức', 'Đánh giá', 'Hướng dẫn', 'Khuyến mãi'];

const articles = [
  {
    id: 1, category: 'Đánh giá',
    title: 'iPhone 15 Pro Max: Đánh giá chi tiết sau 3 tháng sử dụng',
    excerpt: 'Sau 3 tháng trải nghiệm thực tế, chúng tôi đưa ra đánh giá toàn diện về chiếc flagship mới nhất của Apple...',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop',
    date: '20/06/2024', views: 12847, readTime: '8 phút', featured: true,
    tags: ['iPhone', 'Apple', 'Review']
  },
  {
    id: 2, category: 'Tin tức',
    title: 'Samsung Galaxy S25 Ultra lộ diện với thiết kế hoàn toàn mới',
    excerpt: 'Những hình ảnh render đầu tiên của Galaxy S25 Ultra đã xuất hiện, hé lộ thiết kế đột phá...',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=400&fit=crop',
    date: '18/06/2024', views: 8234, readTime: '5 phút', featured: false,
    tags: ['Samsung', 'Galaxy', 'Tin tức']
  },
  {
    id: 3, category: 'Hướng dẫn',
    title: 'Top 10 mẹo tối ưu pin iPhone giúp dùng được cả ngày',
    excerpt: 'Những mẹo đơn giản nhưng hiệu quả giúp bạn kéo dài thời lượng pin iPhone lên đến 30%...',
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&h=400&fit=crop',
    date: '15/06/2024', views: 15632, readTime: '6 phút', featured: false,
    tags: ['iPhone', 'Tips', 'Pin']
  },
  {
    id: 4, category: 'Đánh giá',
    title: 'MacBook Pro M3 Max: Hiệu năng đỉnh cao cho dân sáng tạo',
    excerpt: 'Chip M3 Max mang đến hiệu năng xử lý đồ họa vượt trội, biến MacBook Pro thành công cụ lý tưởng...',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
    date: '12/06/2024', views: 9876, readTime: '10 phút', featured: false,
    tags: ['MacBook', 'Apple', 'Review']
  },
  {
    id: 5, category: 'Khuyến mãi',
    title: 'Flash Sale cuối tuần: Giảm đến 50% hàng ngàn sản phẩm',
    excerpt: 'Chương trình Flash Sale đặc biệt cuối tuần với hàng ngàn sản phẩm công nghệ giảm giá sâu...',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
    date: '10/06/2024', views: 21453, readTime: '3 phút', featured: false,
    tags: ['Sale', 'Khuyến mãi']
  },
  {
    id: 6, category: 'Hướng dẫn',
    title: 'Cách chọn laptop phù hợp cho sinh viên năm 2024',
    excerpt: 'Hướng dẫn chi tiết giúp sinh viên chọn được chiếc laptop phù hợp với nhu cầu và ngân sách...',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    date: '08/06/2024', views: 18765, readTime: '7 phút', featured: false,
    tags: ['Laptop', 'Hướng dẫn', 'Sinh viên']
  },
];

const trending = articles.sort((a, b) => b.views - a.views).slice(0, 4);

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'Tất cả' || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find(a => a.featured) ?? filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <ShopLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-orange-500" />
            Tin tức công nghệ
          </h1>
          <p className="text-gray-500 mt-1">Cập nhật tin tức mới nhất về công nghệ</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {newsCategories.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured article */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-xl">
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-xl font-black mb-2 line-clamp-2">{featured.title}</h2>
                  <div className="flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.views.toLocaleString()}</span>
                    <span>{featured.readTime} đọc</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {featured.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">#{tag}</span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:gap-2 transition-all">
                    Đọc thêm <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2 py-1 rounded-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition">{article.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.date}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString()}</span>
                    </div>
                    <span className="text-orange-500 font-medium">{article.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Bài viết nổi bật
            </h3>
            <div className="space-y-4">
              {trending.map((article, i) => (
                <div key={article.id} className="flex items-start gap-3 group cursor-pointer">
                  <span className="text-2xl font-black text-gray-200 w-8 flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition line-clamp-2">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()} lượt xem
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" />
              Tags phổ biến
            </h3>
            <div className="flex flex-wrap gap-2">
              {['iPhone', 'Samsung', 'MacBook', 'Android', 'Gaming', 'Review', 'Tips', 'Sale', 'Apple', 'Laptop', '5G', 'AI'].map(tag => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 text-xs font-medium rounded-xl transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white">
            <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
            <p className="text-white/80 text-sm mb-4">Nhận ngay tin tức công nghệ mới nhất mỗi ngày</p>
            <input
              type="email"
              placeholder="Email của bạn..."
              className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 text-sm mb-3"
            />
            <button className="w-full py-2.5 bg-white text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition text-sm">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
