export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Category = 'All' | 'Oversized' | 'Heavyweight' | 'Graphic' | 'Acid Wash' | 'Minimalist';

export type BadgeType = 'NEW DROP' | 'BESTSELLER' | 'LIMITED ARCHIVE' | 'CORE ESSENTIAL';

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number; // in INR
  originalPrice?: number;
  category: Category;
  color: string;
  colorHex: string;
  sizes: Size[];
  stockBySize: Record<Size, number>;
  badge?: BadgeType;
  gsm: number;
  images: string[];
  description: string;
  details: string[];
  fit: string;
  care: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  drop: string;
  composition: string;
}

export interface CartItem {
  id: string; // generated unique id: `${productId}-${size}-${color}`
  product: Product;
  size: Size;
  color: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  purchasedSize: Size;
}

export interface FilterOptions {
  search: string;
  category: string;
  color: string;
  size: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}
