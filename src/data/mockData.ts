export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  image: string;
  count: number;
  color: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  bg: string;
  accent: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Điện thoại',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop',
    count: 248,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    name: 'Laptop',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop',
    count: 186,
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 3,
    name: 'Tai nghe',
    icon: '🎧',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
    count: 124,
    color: 'from-orange-500 to-yellow-400'
  },
  {
    id: 4,
    name: 'Đồng hồ',
    icon: '⌚',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop',
    count: 97,
    color: 'from-green-500 to-teal-400'
  },
  {
    id: 5,
    name: 'Máy tính bảng',
    icon: '📟',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=120&fit=crop',
    count: 73,
    color: 'from-red-500 to-rose-400'
  },
  {
    id: 6,
    name: 'Camera',
    icon: '📷',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop',
    count: 58,
    color: 'from-indigo-500 to-blue-400'
  },
  {
    id: 7,
    name: 'Phụ kiện',
    icon: '🔌',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&h=120&fit=crop',
    count: 312,
    color: 'from-pink-500 to-rose-400'
  },
  {
    id: 8,
    name: 'Gaming',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=120&h=120&fit=crop',
    count: 145,
    color: 'from-violet-500 to-purple-400'
  }
];

export const banners: Banner[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Siêu phẩm công nghệ 2024',
    description: 'Chip A17 Pro mạnh nhất từ trước đến nay. Camera 48MP chuyên nghiệp.',
    cta: 'Mua ngay',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop',
    bg: 'from-slate-900 via-blue-950 to-slate-900',
    accent: '#3b82f6'
  },
  {
    id: 2,
    title: 'MacBook Pro M3',
    subtitle: 'Hiệu năng vượt trội',
    description: 'Chip M3 Pro với Neural Engine 18-core. Pin lên đến 22 giờ.',
    cta: 'Khám phá',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
    bg: 'from-gray-900 via-slate-800 to-gray-900',
    accent: '#8b5cf6'
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'AI Phone thế hệ mới',
    description: 'Galaxy AI tích hợp. Bút S Pen thông minh. Camera 200MP.',
    cta: 'Xem ngay',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=400&fit=crop',
    bg: 'from-violet-950 via-purple-900 to-slate-900',
    accent: '#a855f7'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 28990000,
    originalPrice: 34990000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    category: 'Điện thoại',
    rating: 4.9,
    reviews: 2847,
    badge: 'HOT',
    isBestseller: true
  },
  {
    id: 2,
    name: 'MacBook Air M2 2023',
    price: 24990000,
    originalPrice: 29990000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    category: 'Laptop',
    rating: 4.8,
    reviews: 1563,
    badge: 'SALE',
    isBestseller: true
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 6990000,
    originalPrice: 8990000,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Tai nghe',
    rating: 4.8,
    reviews: 3201,
    badge: '-22%'
  },
  {
    id: 4,
    name: 'Apple Watch Series 9',
    price: 8490000,
    originalPrice: 10490000,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
    category: 'Đồng hồ',
    rating: 4.7,
    reviews: 1876,
    isNew: true
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    price: 26990000,
    originalPrice: 31990000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    category: 'Điện thoại',
    rating: 4.8,
    reviews: 2134,
    badge: 'NEW'
  },
  {
    id: 6,
    name: 'iPad Pro M2 11 inch',
    price: 19990000,
    originalPrice: 23990000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    category: 'Máy tính bảng',
    rating: 4.9,
    reviews: 987,
    isNew: true
  },
  {
    id: 7,
    name: 'AirPods Pro 2nd Gen',
    price: 5490000,
    originalPrice: 6990000,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
    category: 'Tai nghe',
    rating: 4.8,
    reviews: 4521,
    badge: 'HOT',
    isBestseller: true
  },
  {
    id: 8,
    name: 'Dell XPS 15 OLED',
    price: 35990000,
    originalPrice: 42990000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    category: 'Laptop',
    rating: 4.7,
    reviews: 743,
    badge: 'SALE'
  },
  {
    id: 9,
    name: 'Xiaomi 14 Ultra',
    price: 18990000,
    originalPrice: 22990000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    category: 'Điện thoại',
    rating: 4.6,
    reviews: 1234,
    isNew: true
  },
  {
    id: 10,
    name: 'Sony Alpha A7 IV',
    price: 52990000,
    originalPrice: 59990000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    category: 'Camera',
    rating: 4.9,
    reviews: 567,
    badge: 'PRO'
  },
  {
    id: 11,
    name: 'ASUS ROG Phone 8',
    price: 22990000,
    originalPrice: 27990000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Gaming',
    rating: 4.7,
    reviews: 892,
    badge: 'GAMING'
  },
  {
    id: 12,
    name: 'Garmin Fenix 7X',
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Đồng hồ',
    rating: 4.8,
    reviews: 456,
    isNew: true
  }
];

export const flashSaleProducts = products.slice(0, 6).map(p => ({
  ...p,
  flashPrice: Math.round(p.price * 0.85),
  timeLeft: Math.floor(Math.random() * 80) + 20
}));

export const featuredBanners = [
  {
    id: 1,
    title: 'Điện thoại chính hãng',
    subtitle: 'Giảm đến 30%',
    cta: 'Xem ngay',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
    bg: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'Laptop deal sốc',
    subtitle: 'Giảm đến 40%',
    cta: 'Xem ngay',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    bg: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    title: 'Phụ kiện giá tốt',
    subtitle: 'Giảm đến 20%',
    cta: 'Xem ngay',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    bg: 'from-orange-500 to-yellow-400'
  }
];
