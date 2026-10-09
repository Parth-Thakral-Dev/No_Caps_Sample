import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FASHION_EASING } from '../utils/motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingAmount,
    freeShippingThreshold,
    total,
    totalItems,
    promoCode,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
  } = useCart();
  const { isDark } = useTheme();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromo(inputPromo);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputPromo('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Smooth Fade & Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className={`w-screen max-w-md border-l flex flex-col shadow-2xl transition-colors duration-300 ${
                isDark ? 'bg-[#09090b] text-white border-white/10' : 'bg-white text-[#09090b] border-black/10'
              }`}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-zinc-400" />
                  <h2 className="font-display font-bold text-lg tracking-wider">
                    SHOPPING BAG <span className="font-mono text-xs text-zinc-500 font-normal">({totalItems})</span>
                  </h2>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-zinc-900/60 px-6 py-3 border-b border-white/5">
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="text-zinc-400">
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        ✓ UNLOCKED FREE EXPRESS SHIPPING
                      </span>
                    ) : (
                      <>
                        ADD <span className="text-white font-bold">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> MORE FOR FREE EXPRESS DELIVERY
                      </>
                    )}
                  </span>
                  <span className="text-zinc-500 text-[10px]">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.6, ease: FASHION_EASING }}
                  />
                </div>
              </div>

              {/* Items List with Layout Animations and Smooth Exit */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-zinc-600"
                    >
                      <ShoppingBag className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <p className="font-display font-bold text-lg text-white">YOUR BAG IS EMPTY</p>
                      <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xs">
                        Pieces from SS25 Drop 04 are crafted in strictly limited runs of 150 units.
                      </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/shop"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                      >
                        <span>EXPLORE DROP 04 ↗</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.35, ease: FASHION_EASING }}
                        className="py-4 flex gap-4 group overflow-hidden"
                      >
                        {/* Product Thumbnail */}
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="w-20 h-24 bg-zinc-900 border border-white/5 flex-shrink-0 overflow-hidden relative block"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                          />
                        </Link>

                        {/* Info & Controls */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <Link
                                to={`/product/${item.product.id}`}
                                onClick={() => setIsCartOpen(false)}
                                className="font-heading font-semibold text-xs tracking-wider text-white hover:text-zinc-300 transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-[11px] text-zinc-400 border border-white/10 px-1.5 py-0.5">
                                SIZE: {item.size}
                              </span>
                              <span className="font-mono text-[11px] text-zinc-500">
                                {item.product.gsm} GSM
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-white/10 bg-zinc-900/80">
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="font-mono text-xs px-2.5 min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="font-mono font-bold text-xs text-white">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer / Summary if cart has items */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 px-6 py-5 bg-[#0a0a0d] space-y-4">
                  {/* Promo Code Input */}
                  <div>
                    {promoCode ? (
                      <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 border border-emerald-500/30 text-xs font-mono">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Tag className="w-3.5 h-3.5" />
                          <span>PROMO: {promoCode}</span>
                        </div>
                        <button
                          onClick={removePromo}
                          className="text-zinc-500 hover:text-white text-[11px] underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={inputPromo}
                          onChange={(e) => setInputPromo(e.target.value)}
                          placeholder="CODE: NOCAPS10 / DROP20"
                          className="flex-1 bg-zinc-900 border border-white/10 px-3 py-2 text-xs font-mono uppercase placeholder:text-zinc-600 focus:outline-none focus:border-white text-white"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 text-xs font-mono font-semibold transition-colors cursor-pointer"
                        >
                          APPLY
                        </motion.button>
                      </form>
                    )}
                    {promoMessage && !promoCode && (
                      <p className={`text-[10px] font-mono mt-1 ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Price Calculations */}
                  <div className="space-y-1.5 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>VIP DISCOUNT</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>EXPRESS SHIPPING</span>
                      <span>
                        {shippingAmount === 0 ? (
                          <span className="text-emerald-400 font-bold">FREE</span>
                        ) : (
                          `₹${shippingAmount}`
                        )}
                      </span>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex justify-between text-sm text-white font-bold">
                      <span className="font-heading">ESTIMATED TOTAL</span>
                      <span className="font-mono text-base">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="group w-full bg-white text-black hover:bg-zinc-200 py-3.5 font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-white/5"
                  >
                    <span>DEMO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>SECURE 256-BIT ENCRYPTED CHECKOUT (DEMO)</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
