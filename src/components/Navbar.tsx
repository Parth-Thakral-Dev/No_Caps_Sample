import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, ArrowUpRight, Search, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FASHION_EASING } from '../utils/motion';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: FASHION_EASING }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? isDark
              ? 'bg-[#09090b]/92 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/60'
              : 'bg-[#fafaf8]/95 backdrop-blur-md border-b border-black/10 py-3.5 shadow-lg shadow-black/5'
            : isDark
              ? 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
              : 'bg-gradient-to-b from-white/95 via-white/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity with Subtle Hover Micro-Interaction */}
            <div className="flex items-center gap-8">
              <Link to="/" className="group flex items-baseline gap-2">
                <span className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tighter transition-all duration-300 ${
                  isDark ? 'text-white group-hover:text-zinc-200' : 'text-[#09090b] group-hover:text-zinc-700'
                }`}>
                  NO CAPS<span className="text-xs align-super font-mono text-zinc-400 transition-colors">®</span>
                </span>
                <span className="hidden md:inline-block text-[10px] font-mono tracking-widest text-zinc-500 uppercase transition-colors">
                  DROP 04 // 320 GSM
                </span>
              </Link>

              {/* Desktop Nav Links with Animated Underline Reveal */}
              <nav className="hidden lg:flex items-center gap-8 pl-4">
                {[
                  { path: '/shop', label: 'COLLECTION' },
                  { path: '/lookbook', label: 'LOOKBOOK' },
                  { path: '/about', label: 'ATELIER' },
                ].map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative py-1 text-xs font-heading font-medium uppercase tracking-widest transition-colors duration-300 ${
                        isActive
                          ? isDark ? 'text-white font-bold' : 'text-black font-bold'
                          : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                      }`}
                    >
                      <span>{link.label}</span>
                      {/* Animated bottom line */}
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-out ${
                          isDark ? 'bg-white' : 'bg-black'
                        } ${isActive ? 'w-full' : 'w-0 hover:w-full'}`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Actions & Theme Toggle & Shop CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* THEME TOGGLE BUTTON (DARK <-> LIGHT) */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono tracking-wider border transition-all duration-300 cursor-pointer shadow-sm ${
                  isDark
                    ? 'border-white/20 hover:border-white text-zinc-300 hover:text-white bg-white/5'
                    : 'border-black/20 hover:border-black text-zinc-800 hover:text-black bg-black/5'
                }`}
                aria-label="Shift dark and light mode"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span className="hidden sm:inline text-[11px] font-bold">LIGHT</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Moon className="w-3.5 h-3.5 text-indigo-950" />
                      <span className="hidden sm:inline text-[11px] font-bold">DARK</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Search button linking to shop */}
              <Link
                to="/shop"
                className={`hidden sm:flex items-center gap-1.5 text-xs transition-colors px-2 py-1.5 group ${
                  isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                }`}
                title="Search Products"
              >
                <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden xl:inline text-[11px] font-mono tracking-wider">SEARCH</span>
              </Link>

              {/* Wishlist Link with Hover Pulse */}
              <Link
                to="/shop?filter=wishlist"
                className={`relative p-2 transition-colors group ${
                  isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-115" />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                  />
                )}
              </Link>

              {/* Bag Trigger with Subtle Bounce Micro-Interaction on item change */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 transition-colors flex items-center gap-2 group cursor-pointer ${
                  isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-black'
                }`}
                aria-label="Shopping Bag"
              >
                <motion.div
                  key={totalItems}
                  animate={totalItems > 0 ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -6, 6, 0] } : {}}
                  transition={{ duration: 0.45 }}
                  className="relative"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                  {totalItems > 0 && (
                    <span className={`absolute -top-1 -right-2 text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg ${
                      isDark ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                      {totalItems}
                    </span>
                  )}
                </motion.div>
                <span className={`hidden md:inline font-mono text-xs transition-colors ${
                  isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-black'
                }`}>
                  BAG {totalItems > 0 && `(${totalItems})`}
                </span>
              </button>

              {/* HIGHLY VISIBLE "TO SHOP ↗" LINK WITH REFINED ARROW SLIDE */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/shop"
                  className={`group flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-sm ${
                    isDark
                      ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-white/20'
                      : 'bg-black text-white hover:bg-zinc-800 hover:shadow-black/20'
                  }`}
                >
                  <span>TO SHOP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 focus:outline-none transition-colors ${
                  isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-black'
                }`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer with Refined Stagger Transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: FASHION_EASING }}
            className={`fixed inset-0 z-30 pt-24 px-6 flex flex-col justify-between pb-10 lg:hidden border-b backdrop-blur-2xl ${
              isDark
                ? 'bg-[#09090b]/98 text-white border-white/10'
                : 'bg-[#fafaf8]/98 text-[#09090b] border-black/10'
            }`}
          >
            <div className="space-y-6">
              <div className={`border-b pb-4 flex items-center justify-between ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}>
                <p className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">DIRECTORY</p>
                {/* Mobile Palette Switcher */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold uppercase border ${
                    isDark ? 'bg-zinc-900 border-white/20 text-white' : 'bg-zinc-100 border-black/20 text-black'
                  }`}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
                className="flex flex-col gap-5 text-2xl font-display font-bold"
              >
                {[
                  { path: '/', label: 'HOME', num: '01' },
                  { path: '/shop', label: 'COLLECTION // SHOP', num: '02' },
                  { path: '/lookbook', label: 'SS25 LOOKBOOK', num: '03' },
                  { path: '/about', label: 'ATELIER & CRAFT', num: '04' },
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: FASHION_EASING } },
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`transition-colors flex items-center justify-between ${
                        isDark ? 'text-white hover:text-zinc-400' : 'text-black hover:text-zinc-600'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-zinc-500">{item.num}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <Link
                  to="/shop"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 font-mono font-bold text-sm tracking-widest uppercase transition-colors ${
                    isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>EXPLORE ALL 12 PIECES ↗</span>
                </Link>
              </div>
            </div>

            <div className={`space-y-2 border-t pt-6 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex justify-between text-xs font-mono text-zinc-500">
                <span>NO CAPS® ATELIER</span>
                <span>MUMBAI // BERLIN // TOKYO</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                320 GSM HEAVYWEIGHT TEXTILES. WORLDWIDE EXPRESS SHIPPING.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
