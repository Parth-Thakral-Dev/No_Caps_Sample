import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product, Size } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickAdd = true }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useCart();
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent, size: Size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative flex flex-col border transition-all duration-500 overflow-hidden ${
        isDark
          ? 'bg-[#0d0d11] border-white/10 hover:border-white/30 text-white shadow-xl shadow-black/40'
          : 'bg-white border-black/10 hover:border-black/30 text-[#09090b] shadow-md shadow-black/5'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Restrained Scale & Smooth Dual-Image Crossfade */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 block"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            product.images[1] && isHovered ? 'opacity-0 scale-106' : 'opacity-100 scale-100 group-hover:scale-106'
          }`}
          loading="lazy"
        />

        {/* Secondary / Alternate Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'opacity-100 scale-106' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-black/90 text-white border border-white/20 text-[9px] font-mono tracking-widest px-2 py-0.5 uppercase backdrop-blur-sm shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-white text-black font-bold text-[9px] font-mono tracking-widest px-2 py-0.5 uppercase shadow-md">
              SAVE {discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button with Micro-Interaction */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-none border border-white/10 transition-colors z-10 backdrop-blur-sm cursor-pointer"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-300'
            }`}
          />
        </motion.button>

        {/* GSM Tag Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="font-mono text-[10px] text-zinc-300 bg-black/80 px-1.5 py-0.5 border border-white/15 backdrop-blur-sm">
            {product.gsm} GSM
          </span>
        </div>

        {/* Quick Size Bar Overlay on Hover with Smooth Slide Transition */}
        {showQuickAdd && (
          <div
            className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/95 to-transparent transition-all duration-300 ease-out z-20 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
              <span className="tracking-wider">SELECT SIZE TO ADD:</span>
              <span className="text-zinc-500">HEAVYWEIGHT</span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {product.sizes.map((sz) => {
                const inStock = product.stockBySize[sz] > 0;
                return (
                  <button
                    key={sz}
                    disabled={!inStock}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className={`py-1.5 text-center font-mono text-[11px] font-bold border transition-all duration-200 ${
                      !inStock
                        ? 'border-white/5 text-zinc-600 line-through cursor-not-allowed'
                        : 'border-white/20 bg-black/80 hover:bg-white hover:text-black hover:border-white text-white cursor-pointer transform active:scale-95'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Link>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
            <span className="tracking-wider">{product.category.toUpperCase()}</span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full border border-zinc-500/30 inline-block"
                style={{ backgroundColor: product.colorHex }}
              />
              {product.color}
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="group/title block"
          >
            <h3 className={`font-heading font-semibold text-sm tracking-wide transition-colors duration-200 line-clamp-1 ${
              isDark ? 'text-white group-hover/title:text-zinc-300' : 'text-[#09090b] group-hover/title:text-zinc-600'
            }`}>
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Link with Animated Underline & Arrow Move */}
        <div className={`flex items-baseline justify-between border-t pt-2.5 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-baseline gap-2 font-mono">
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#09090b]'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className={`group/link inline-flex items-center gap-1 text-[11px] font-mono transition-colors duration-200 ${
              isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <span className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover/link:after:w-full after:transition-all after:duration-200 ${
              isDark ? 'after:bg-white' : 'after:bg-black'
            }`}>
              VIEW
            </span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
