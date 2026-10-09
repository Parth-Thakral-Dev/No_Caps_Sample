import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Plus,
  Minus,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  ChevronDown,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';
import { PRODUCTS, SAMPLE_REVIEWS } from '../data/products';
import type { Size } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();
  const { addToCart, toggleWishlist, isInWishlist, showToast, setIsCheckoutOpen } = useCart();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  // Reset scroll and state when navigating to another product
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setSelectedSize(null);
    setSizeError(false);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-32 pb-24 px-4 text-center">
        <h2 className="font-display font-bold text-3xl mb-4">SILHOUETTE NOT FOUND</h2>
        <p className="text-zinc-400 font-sans text-sm mb-8">This piece may have been archived or removed from Drop 04.</p>
        <Link
          to="/shop"
          className="bg-white text-black px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200"
        >
          RETURN TO SHOP ↗
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select a size (S, M, L, XL, XXL) to continue', 'error');
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, product.color, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select a size to proceed to demo checkout', 'error');
      return;
    }
    addToCart(product, selectedSize, product.color, quantity);
    setIsCheckoutOpen(true);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className={`min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'bg-[#09090b] text-white' : 'bg-[#fafaf8] text-[#09090b]'
    }`}>
      {/* 1. Breadcrumbs */}
      <nav className={`font-mono text-xs py-4 border-b flex items-center gap-2 mb-8 ${
        isDark ? 'border-white/10 text-zinc-500' : 'border-black/10 text-zinc-600'
      }`}>
        <Link to="/" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>HOME</Link>
        <span>/</span>
        <Link to="/shop" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>COLLECTION</Link>
        <span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
          {product.category.toUpperCase()}
        </Link>
        <span>/</span>
        <span className={`truncate font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>{product.name}</span>
      </nav>

      {/* 2. Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Gallery: Multi-Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image with Smooth Transition */}
          <div className="relative aspect-[3/4] bg-zinc-950 border border-white/10 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} angle ${selectedImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="bg-black/90 text-white border border-white/20 text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
              <span className="bg-white/10 text-zinc-200 border border-white/20 text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase backdrop-blur-sm">
                {product.gsm} GSM FABRIC
              </span>
            </div>

            {/* Lightbox Trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-black p-2 border border-white/15 text-white transition-colors cursor-pointer"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[3/4] bg-zinc-900 border transition-all overflow-hidden cursor-pointer ${
                  selectedImageIndex === idx ? 'border-white ring-1 ring-white' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-center" />
                <span className="absolute bottom-1 right-1 font-mono text-[9px] bg-black/80 px-1 text-zinc-300">
                  0{idx + 1}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Column: Purchasing & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>{product.drop}</span>
              <span className="text-zinc-500">ID: {product.id.toUpperCase()}</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight uppercase">
              {product.name}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-1">{product.subtitle}</p>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center gap-2 mt-3 pt-2 font-mono text-xs">
              <div className="flex items-center text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                ))}
              </div>
              <span className="text-white font-bold">{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 border-y border-white/10 py-4 font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-zinc-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 border border-emerald-500/30">
                  SAVE ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              </>
            )}
            <span className="text-[11px] text-zinc-500 ml-auto">INCLUSIVE OF ALL TAXES</span>
          </div>

          {/* Color Details */}
          <div>
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="text-zinc-400">COLORWAY:</span>
              <span className="text-white font-bold">{product.color}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1 border border-white">
                <span
                  className="w-7 h-7 block border border-white/30"
                  style={{ backgroundColor: product.colorHex }}
                />
              </div>
              <span className="font-mono text-xs text-zinc-400">100% Colorfast Reactive Dye</span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">SELECT SIZE:</span>
                {sizeError && (
                  <span className="text-red-400 font-bold animate-pulse text-[11px]">
                    * PLEASE CHOOSE A SIZE
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-zinc-400 hover:text-white underline flex items-center gap-1 text-[11px]"
              >
                <Ruler className="w-3 h-3" />
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((sz) => {
                const stock = product.stockBySize[sz];
                const inStock = stock > 0;
                const isSelected = selectedSize === sz;

                return (
                  <motion.button
                    key={sz}
                    type="button"
                    disabled={!inStock}
                    whileTap={inStock ? { scale: 0.93 } : {}}
                    onClick={() => {
                      setSelectedSize(sz);
                      setSizeError(false);
                    }}
                    className={`py-3 px-2 border font-mono text-xs font-bold transition-all duration-200 relative cursor-pointer ${
                      !inStock
                        ? 'border-white/5 bg-zinc-950 text-zinc-600 line-through cursor-not-allowed'
                        : isSelected
                        ? 'border-white bg-white text-black shadow-md'
                        : sizeError
                        ? 'border-red-500/50 bg-zinc-900 text-zinc-300 hover:border-white'
                        : 'border-white/15 bg-zinc-900 text-zinc-200 hover:border-white/40'
                    }`}
                  >
                    <span>{sz}</span>
                    {inStock && stock <= 3 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-[8px] text-white px-1 font-mono rounded-none">
                        {stock} left
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <span className="font-mono text-xs text-zinc-400 block mb-2">QUANTITY:</span>
            <div className="inline-flex items-center border border-white/15 bg-zinc-950 font-mono text-xs">
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <span className="px-5 py-2.5 text-center font-bold text-white min-w-[40px]">
                {quantity}
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black hover:bg-zinc-200 py-4 font-mono font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-white/10"
              >
                <span>ADD TO BAG</span>
                <span className="hidden sm:inline">• ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-white/20 bg-zinc-950 hover:border-white text-white transition-colors cursor-pointer"
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-300'}`}
                />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="group w-full border border-white/30 bg-zinc-900/60 hover:bg-white/10 py-3.5 font-mono text-xs tracking-widest uppercase text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPRESS BUY NOW (DEMO CHECKOUT)</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-[10px] text-zinc-400">
            <div className="flex flex-col items-center text-center p-2 bg-zinc-950/60 border border-white/5">
              <Truck className="w-4 h-4 text-white mb-1" />
              <span>DISPATCH 24H</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-zinc-950/60 border border-white/5">
              <RotateCcw className="w-4 h-4 text-white mb-1" />
              <span>7-DAY EXCHANGES</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-zinc-950/60 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-white mb-1" />
              <span>100% ORGANIC</span>
            </div>
          </div>

          {/* Accordions with Smooth Animated Disclosure */}
          <div className="border-t border-white/10 divide-y divide-white/5 font-mono text-xs">
            {/* Fabric & Construction */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('fabric')}
                className="w-full py-3.5 flex items-center justify-between text-left text-white hover:text-zinc-300 cursor-pointer"
              >
                <span className="font-bold uppercase">01 // TEXTILE & DETAILS</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fabric' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordion === 'fabric' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 font-sans text-xs text-zinc-400 space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-[11px] pt-2 text-zinc-300">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fit & Sizing */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('fit')}
                className="w-full py-3.5 flex items-center justify-between text-left text-white hover:text-zinc-300 cursor-pointer"
              >
                <span className="font-bold uppercase">02 // SILHOUETTE & FIT</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fit' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordion === 'fit' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 font-sans text-xs text-zinc-400 space-y-2">
                      <p>{product.fit}</p>
                      <p className="font-mono text-[11px] text-zinc-300 pt-1">
                        Model is 6'1" (185 cm) wearing size Large for an architectural oversized drape.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping & Delivery */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-3.5 flex items-center justify-between text-left text-white hover:text-zinc-300 cursor-pointer"
              >
                <span className="font-bold uppercase">03 // SHIPPING & DISPATCH</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordion === 'shipping' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 font-sans text-xs text-zinc-400 space-y-2">
                      <p>All orders dispatched within 24 hours via BlueDart / Express Air across India. Complimentary shipping on orders above ₹2,999.</p>
                      <p>Encased in metallic matte sealable foil sleeves designed for archival garment storage.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Care */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('care')}
                className="w-full py-3.5 flex items-center justify-between text-left text-white hover:text-zinc-300 cursor-pointer"
              >
                <span className="font-bold uppercase">04 // WASH & PRESERVATION</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordion === 'care' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 font-sans text-xs text-zinc-400 space-y-1">
                      <p>{product.care}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Verified Client Reviews Section */}
      <section className="mt-24 pt-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              COLLECTOR APPRAISALS
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              VERIFIED ATELIER REVIEWS
            </h3>
          </div>
          <div className="font-mono text-xs text-zinc-400 bg-zinc-950 border border-white/10 px-3 py-1.5">
            4.9 OUT OF 5.0 RATING
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="bg-zinc-950/80 border border-white/10 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-zinc-500">{review.date}</span>
              </div>

              <h4 className="font-heading font-semibold text-sm text-white">"{review.title}"</h4>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">{review.comment}</p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span className="text-zinc-300">{review.author} ({review.location})</span>
                <span className="text-emerald-400">✓ VERIFIED PURCHASE (SZ {review.purchasedSize})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              COMPLETE THE ARCHIVE LOOK
            </h3>
            <Link
              to="/shop"
              className="font-mono text-xs font-bold text-zinc-400 hover:text-white uppercase flex items-center gap-1"
            >
              <span>EXPLORE ALL PIECES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="max-h-[85vh] max-w-[90vw] object-contain border border-white/10 shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};
