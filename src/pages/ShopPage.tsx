import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw, LayoutGrid, Grid3X3, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { Category, Size } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES: Category[] = ['All', 'Oversized', 'Heavyweight', 'Graphic', 'Acid Wash', 'Minimalist'];
const SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'All', hex: '' },
  { name: 'Washed Obsidian', hex: '#141416' },
  { name: 'Chalk Bone', hex: '#e5e3dc' },
  { name: 'Mineral Grey', hex: '#4a494d' },
  { name: 'Pitch Black', hex: '#08080a' },
  { name: 'Vintage Moss', hex: '#3d443a' },
  { name: 'Raw Concrete', hex: '#525257' },
  { name: 'Solar Bleach', hex: '#685d56' },
];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();
  const { isDark } = useTheme();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceTier, setPriceTier] = useState<string>('All'); // 'All' | 'under-3000' | '3000-3500' | 'above-3500'
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState(searchParams.get('filter') === 'wishlist');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with searchParams if category changed via URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    if (searchParams.get('filter') === 'wishlist') setShowWishlistOnly(true);
  }, [searchParams]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Wishlist filter
      if (showWishlistOnly && !wishlist.includes(item.id)) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesColor = item.color.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesColor && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Size
      if (selectedSize !== 'All' && !item.sizes.includes(selectedSize as Size)) {
        return false;
      }

      // Color
      if (selectedColor !== 'All' && item.color !== selectedColor) {
        return false;
      }

      // Price Tier
      if (priceTier === 'under-3000' && item.price >= 3000) return false;
      if (priceTier === '3000-3500' && (item.price < 3000 || item.price > 3500)) return false;
      if (priceTier === 'above-3500' && item.price <= 3500) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'NEW DROP' ? 1 : 0) - (a.badge === 'NEW DROP' ? 1 : 0);
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedColor, priceTier, sortBy, showWishlistOnly, wishlist]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setPriceTier('All');
    setSortBy('featured');
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    priceTier !== 'All' ||
    showWishlistOnly;

  return (
    <div className={`min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'bg-[#09090b] text-white' : 'bg-[#fafaf8] text-[#09090b]'
    }`}>
      {/* 1. Header & Description */}
      <div className={`border-b pb-8 pt-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              <span>ARCHIVE CATALOGUE</span>
              <span>//</span>
              <span className={isDark ? 'text-zinc-300' : 'text-zinc-600'}>DROP 04: DISTORTION</span>
            </div>
            <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>
              {showWishlistOnly ? 'YOUR ARCHIVE WISHLIST' : 'HEAVYWEIGHT COLLECTION'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
              {showWishlistOnly
                ? `You have saved ${wishlist.length} silhouettes to your personal archive wishlist.`
                : 'Engineered boxy streetwear silhouettes crafted from custom-milled 300–350 GSM organic cotton. Hand-finished seams, reinforced collars, and limited production runs.'}
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-400 flex items-center gap-4">
            <span className="bg-zinc-900 border border-white/10 px-3 py-1.5">
              SHOWING <strong className="text-white">{filteredProducts.length}</strong> OF{' '}
              <strong className="text-white">{PRODUCTS.length}</strong> PIECES
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="py-6 border-b border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH BY NAME, GSM, CUT OR COLOR..."
              className="w-full bg-zinc-950 border border-white/10 pl-10 pr-10 py-2.5 text-xs font-mono uppercase text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Controls (Sort & Layout & Mobile Filter Trigger) */}
          <div className="flex items-center gap-3 justify-between lg:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-xs font-mono text-white"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTERS {hasActiveFilters && '•'}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 border border-white/10 bg-zinc-950 px-3 py-2 text-xs font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-500 hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer uppercase text-xs"
              >
                <option value="featured" className="bg-zinc-900">Featured Drops</option>
                <option value="newest" className="bg-zinc-900">Newest First</option>
                <option value="price-asc" className="bg-zinc-900">Price: Low to High</option>
                <option value="price-desc" className="bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900">Top Rated</option>
              </select>
            </div>

            {/* Grid Column Toggles (Desktop only) */}
            <div className="hidden sm:flex items-center border border-white/10 p-1 bg-zinc-950">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 transition-colors ${gridCols === 3 ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 transition-colors ${gridCols === 4 ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Filter Pills */}
        <div className="hidden lg:flex flex-col gap-3 pt-2">
          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-500 uppercase w-20">SILHOUETTE:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono text-xs uppercase border transition-all ${
                  selectedCategory === cat
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-500 uppercase w-20">SIZE:</span>
            <button
              onClick={() => setSelectedSize('All')}
              className={`px-2.5 py-1 font-mono text-xs uppercase border transition-all ${
                selectedSize === 'All'
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
              }`}
            >
              ALL
            </button>
            {SIZES.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-2.5 py-1 font-mono text-xs uppercase border transition-all ${
                  selectedSize === sz
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                }`}
              >
                {sz}
              </button>
            ))}

            {/* Price Filter Pills */}
            <span className="text-[11px] font-mono text-zinc-500 uppercase ml-6 mr-1">PRICE:</span>
            {[
              { id: 'All', label: 'ANY' },
              { id: 'under-3000', label: '< ₹3,000' },
              { id: '3000-3500', label: '₹3,000 - ₹3,500' },
              { id: 'above-3500', label: '> ₹3,500' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceTier(p.id)}
                className={`px-2.5 py-1 font-mono text-xs uppercase border transition-all ${
                  priceTier === p.id
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Colorways */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-zinc-500 uppercase w-20">COLORWAY:</span>
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`px-2.5 py-1 font-mono text-xs uppercase border flex items-center gap-1.5 transition-all ${
                  selectedColor === c.name
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {c.hex && (
                  <span
                    className="w-2 h-2 rounded-full border border-white/20 inline-block"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-2 font-mono text-xs">
            <span className="text-zinc-500 text-[11px]">ACTIVE:</span>

            {searchQuery && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                QUERY: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            {selectedSize !== 'All' && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                SIZE: {selectedSize}
                <button onClick={() => setSelectedSize('All')}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            {selectedColor !== 'All' && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                COLOR: {selectedColor}
                <button onClick={() => setSelectedColor('All')}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            {priceTier !== 'All' && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                TIER: {priceTier}
                <button onClick={() => setPriceTier('All')}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            {showWishlistOnly && (
              <span className="bg-white/10 border border-white/20 px-2 py-0.5 text-white flex items-center gap-1.5">
                WISHLIST ONLY
                <button onClick={() => setShowWishlistOnly(false)}><X className="w-3 h-3 hover:text-red-400" /></button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-zinc-400 hover:text-white underline ml-2 flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET ALL</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Product Grid or Empty State */}
      <div className="pt-8">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-24 text-center border border-white/10 bg-zinc-950/50 p-8 max-w-lg mx-auto space-y-4"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">NO PIECES MATCH YOUR FILTER</h3>
            <p className="font-sans text-xs text-zinc-400">
              We couldn't find any silhouettes matching your current search or filter combination.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-mono font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET ALL FILTERS</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-6`}
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* 4. Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-full max-w-xs bg-[#09090b] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-display font-bold text-lg text-white">CATALOGUE FILTERS</h3>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-zinc-400 hover:text-white p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Mobile */}
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">SILHOUETTE</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-2 font-mono text-xs border text-center transition-colors ${
                          selectedCategory === cat
                            ? 'bg-white text-black border-white font-bold'
                            : 'border-white/10 bg-zinc-900 text-zinc-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Mobile */}
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">SIZE</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedSize('All')}
                      className={`p-2 font-mono text-xs border text-center ${
                        selectedSize === 'All' ? 'bg-white text-black border-white font-bold' : 'border-white/10 bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      ALL
                    </button>
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`p-2 font-mono text-xs border text-center ${
                          selectedSize === sz ? 'bg-white text-black border-white font-bold' : 'border-white/10 bg-zinc-900 text-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Mobile */}
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">PRICE TIER</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'All', label: 'ALL PRICING' },
                      { id: 'under-3000', label: 'UNDER ₹3,000' },
                      { id: '3000-3500', label: '₹3,000 - ₹3,500' },
                      { id: 'above-3500', label: 'ABOVE ₹3,500' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPriceTier(p.id)}
                        className={`w-full p-2 font-mono text-xs border text-left ${
                          priceTier === p.id ? 'bg-white text-black border-white font-bold' : 'border-white/10 bg-zinc-900 text-zinc-400'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-white text-black py-3 font-mono font-bold text-xs uppercase"
                >
                  APPLY FILTERS ({filteredProducts.length})
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="w-full bg-zinc-900 text-zinc-400 py-2.5 font-mono text-xs uppercase"
                  >
                    RESET ALL
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
