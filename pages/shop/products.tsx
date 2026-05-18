import React, { useState, useMemo } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List, Search, ChevronDown, X, Star } from 'lucide-react';
import ShopLayout from '@layouts/ShopLayout';
import ProductCard from '@components/shop/ProductCard';
import { products, categories } from '@/data/mockData';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'vi', ['common']))
  }
});

const sortOptions = [
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao' },
];

const priceRanges = [
  { label: 'Dưới 2 triệu', min: 0, max: 2000000 },
  { label: '2 - 5 triệu', min: 2000000, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: 'Trên 20 triệu', min: 20000000, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter(p => p.price >= range.min && p.price <= range.max);
    }
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [selectedCategory, selectedPrice, sortBy, searchQuery, minRating]);

  const clearFilters = () => { setSelectedCategory(null); setSelectedPrice(null); setSearchQuery(''); setMinRating(0); };
  const hasFilters = selectedCategory || selectedPrice !== null || searchQuery || minRating > 0;

  return (
    <ShopLayout>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Tất cả sản phẩm</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filtered.length} sản phẩm được tìm thấy</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 sticky top-24 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                Bộ lọc
              </h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-orange-500 hover:underline">Xóa tất cả</button>
              )}
            </div>

            {/* Search */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 block">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tên sản phẩm..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 block">Danh mục</label>
              <div className="space-y-1">
                <button onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                    !selectedCategory ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}>
                  Tất cả ({products.length})
                </button>
                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat.name).length;
                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}>
                      <span>{cat.icon} {cat.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 block">Khoảng giá</label>
              <div className="space-y-1">
                {priceRanges.map((range, i) => (
                  <button key={i} onClick={() => setSelectedPrice(selectedPrice === i ? null : i)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                      selectedPrice === i
                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}>
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 block">Đánh giá</label>
              <div className="space-y-1">
                {[4, 3, 2, 0].map(rating => (
                  <button key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center gap-2 ${
                      minRating === rating && rating > 0
                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}>
                    {rating > 0 ? (
                      <>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                          ))}
                        </div>
                        <span>từ {rating} sao</span>
                      </>
                    ) : (
                      <span>Tất cả</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4" /> Lọc
              </button>

              {hasFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategory && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-medium">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {selectedPrice !== null && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-medium">
                      {priceRanges[selectedPrice].label}
                      <button onClick={() => setSelectedPrice(null)}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700/50 focus:border-orange-400 focus:outline-none cursor-pointer">
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-orange-500' : 'text-gray-400'}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-orange-500' : 'text-gray-400'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button onClick={clearFilters} className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium">Xóa bộ lọc</button>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCategory}-${sortBy}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}
              >
                {filtered.map((product, i) => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} index={i} />
                  ) : (
                    <motion.div key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all p-4 flex gap-4">
                      <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-orange-500 font-medium">{product.category}</p>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mt-0.5 mb-1">{product.name}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-orange-500">{product.price.toLocaleString('vi-VN')}đ</span>
                          <span className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                          <span className="text-xs bg-red-100 dark:bg-red-500/20 text-red-500 font-bold px-2 py-0.5 rounded-lg">-{product.discount}%</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition self-center">
                        Thêm vào giỏ
                      </button>
                    </motion.div>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ShopLayout>
  );
}
