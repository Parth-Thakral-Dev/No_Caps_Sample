import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DemoCheckoutModal } from './components/DemoCheckoutModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { AboutPage } from './pages/AboutPage';
import { useTheme } from './context/ThemeContext';
import { FASHION_EASING } from './utils/motion';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated route transitions with luxury easing
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: FASHION_EASING }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ShopPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
          isDark
            ? 'bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black'
            : 'bg-[#fafaf8] text-[#09090b] selection:bg-black selection:text-white'
        }`}>
          {/* Global Minimal Fixed Header */}
          <Navbar />

          {/* Main Animated Route Content */}
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Interactive Demo Checkout Modal */}
          <DemoCheckoutModal />

          {/* Global Notification Toast */}
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
