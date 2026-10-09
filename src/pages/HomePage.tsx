import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { PRODUCTS, LOOKBOOK_ITEMS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FASHION_EASING, cardVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

export const HomePage: React.FC = () => {
  const { isDark } = useTheme();
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked parallax for Hero Section
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImageY = useTransform(heroScroll, [0, 1], ['0%', shouldReduceMotion ? '0%' : '18%']);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, shouldReduceMotion ? 1 : 1.06]);
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', shouldReduceMotion ? '0%' : '26%']);
  const heroBgTextY = useTransform(heroScroll, [0, 1], ['0%', shouldReduceMotion ? '0%' : '-15%']);

  // Scroll-linked parallax for Story Section (Toteme-style)
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });
  const storyImageY = useTransform(storyScroll, [0, 1], ['-10%', shouldReduceMotion ? '0%' : '10%']);

  // Scroll-linked parallax for Full-Width Campaign Section
  const campaignBannerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bannerScroll } = useScroll({
    target: campaignBannerRef,
    offset: ['start end', 'end start'],
  });
  const bannerImageY = useTransform(bannerScroll, [0, 1], ['-14%', shouldReduceMotion ? '0%' : '14%']);

  return (
    <div className={`overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#09090b] text-white selection:bg-white selection:text-black' : 'bg-[#fafaf8] text-[#09090b] selection:bg-black selection:text-white'
    }`}>
      {/* 1. CINEMATIC HERO SECTION (Inspired by Represent & Toteme references) */}
      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col justify-between pt-24 pb-10 px-4 sm:px-6 lg:px-8 border-b overflow-hidden ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}
      >
        {/* Massive Monumental Background Typography (Represent style) */}
        <motion.div
          style={{ y: heroBgTextY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: isDark ? 0.06 : 0.04, scale: 1 }}
          transition={{ duration: 1.6, ease: FASHION_EASING }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
        >
          <span className={`font-display font-black text-[15vw] sm:text-[17vw] tracking-tighter leading-none whitespace-nowrap ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            NO CAPS
          </span>
        </motion.div>

        {/* Top Editorial Metadata Row */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: FASHION_EASING }}
          className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 border-b border-white/10 pb-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
            <span className="text-white font-semibold">SS25 DROP 04: DISTORTION</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-zinc-500">
            <span>320 GSM RAW HEAVYWEIGHT</span>
            <span>•</span>
            <span>MUMBAI // BERLIN // TOKYO</span>
            <span>•</span>
            <span>LIMITED 150 PCS</span>
          </div>

          <div className="text-zinc-400 font-mono">
            COLLECTION VOL. 04
          </div>
        </motion.div>

        {/* Center Staged Hero Composition */}
        <div className="relative z-10 my-auto py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Left Column: Line-by-Line Headline Reveals & Storytelling */}
          <motion.div
            style={{ y: heroTextY }}
            className="lg:col-span-7 space-y-6 order-2 lg:order-1 will-change-transform"
          >
            {/* Eyebrow Reveal */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.2, ease: FASHION_EASING }}
                className="flex items-center gap-3"
              >
                <span className="h-[1px] w-10 bg-white/40 inline-block" />
                <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                  ABOUT // DROP 04 EDITORIAL
                </span>
              </motion.div>
            </div>

            {/* Staggered Line-by-Line Headline Mask Reveals */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.3, ease: FASHION_EASING }}
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-white uppercase"
                >
                  NOT MADE
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.45, ease: FASHION_EASING }}
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-white uppercase"
                >
                  <span className="text-stroke hover:text-white transition-colors duration-500">
                    TO BLEND
                  </span>{' '}
                  IN.
                </motion.h1>
              </div>
            </div>

            {/* Supporting Statement Mask Reveal */}
            <div className="overflow-hidden pt-2">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.65, ease: FASHION_EASING }}
                className="text-sm sm:text-base text-zinc-300 max-w-lg font-sans font-normal leading-relaxed"
              >
                Engineered silhouettes. Custom-milled 320+ GSM heavyweight ring-spun combed cotton. An uncompromising luxury streetwear collection built for the contemporary underground.
              </motion.p>
            </div>

            {/* CTAs with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.8, ease: FASHION_EASING }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/shop"
                  className="group bg-white text-black hover:bg-zinc-200 px-8 py-4 font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-white/20"
                >
                  <span>EXPLORE THE COLLECTION</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/lookbook"
                  className="border border-white/25 hover:border-white bg-zinc-950/60 backdrop-blur-md text-white px-7 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
                >
                  <span>SS25 LOOKBOOK</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Model Revealed through Moving Mask (Represent style) */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
            {/* Image Container with Moving Curtain Mask Reveal */}
            <motion.div
              style={{ y: heroImageY, scale: heroImageScale }}
              initial={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                opacity: 0,
                scale: 1.12,
              }}
              animate={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                opacity: 1,
                scale: 1,
              }}
              transition={{
                clipPath: { duration: 1.4, delay: 0.25, ease: FASHION_EASING },
                scale: { duration: 1.8, delay: 0.25, ease: FASHION_EASING },
                opacity: { duration: 0.9, delay: 0.2 },
              }}
              className="relative w-full max-w-md aspect-[3/4] bg-zinc-900 border border-white/15 overflow-hidden shadow-2xl group will-change-transform"
            >
              <img
                src="/images/hero_model.jpg"
                alt="NO CAPS® SS25 Heavyweight Silhouette"
                className="w-full h-full object-cover object-top filter contrast-110 brightness-95 transition-transform duration-700 ease-out group-hover:scale-104"
              />

              {/* Editorial Frame Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Metadata inside image frame */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-zinc-300 border-t border-white/20 pt-2 backdrop-blur-sm">
                <span>PLATE 01 // OVERSIZED BOX-CUT</span>
                <span>320 GSM FABRIC</span>
              </div>
            </motion.div>

            {/* Floating Technical Badge Card */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 24 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: FASHION_EASING }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-zinc-950/95 border border-white/20 p-4 shadow-2xl backdrop-blur-md font-mono text-xs max-w-[210px]"
            >
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
                <span>ARCHIVE RUN</span>
              </div>
              <p className="text-white font-bold text-xs mt-1">DECONSTRUCTED RAW</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Custom ring-spun cotton. True oversized drape.</p>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Bar & Continuous Ambient Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-zinc-400"
        >
          <div>
            <span className="text-white font-bold tracking-wider">NO CAPS® ARCHIVE</span>
            <p className="text-[11px] text-zinc-500 mt-0.5">EXPRESS PAN-INDIA SHIPPING // ALL PRICES IN INR (₹)</p>
          </div>

          <a
            href="#story"
            className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer group py-1"
          >
            <span className="tracking-widest">SCROLL TO DISCOVER</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white"
            >
              <ArrowDown className="w-3 h-3 text-white" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* 2. INFINITE EDITORIAL MARQUEE TICKER */}
      <div className={`py-3 overflow-hidden select-none border-y transition-colors duration-300 ${
        isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
      }`}>
        <div className="flex whitespace-nowrap animate-marquee font-display font-extrabold text-sm sm:text-base tracking-widest uppercase">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-4">
              <span>NO CAPS® ATELIER</span>
              <span>—</span>
              <span>320 GSM RING-SPUN COTTON</span>
              <span>—</span>
              <span>DROP 04 'DISTORTION'</span>
              <span>—</span>
              <span>NO RESTOCKS EVER</span>
              <span>—</span>
              <span>MUMBAI • TOKYO • BERLIN</span>
              <span>—</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. SCROLL STORYTELLING SECTION (Toteme-inspired editorial layout) */}
      <section
        id="story"
        ref={storyRef}
        className="relative py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Vertical Branding & Editorial Photography with Mask Reveal */}
          <div className="lg:col-span-6 relative flex items-center">
            {/* Rotated Vertical Typography (Toteme style) */}
            <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 select-none pointer-events-none">
              <span className="font-display font-extrabold text-sm tracking-[0.35em] text-zinc-600 uppercase whitespace-nowrap">
                NO CAPS® ATELIER 2026
              </span>
            </div>

            {/* Campaign Editorial Photograph with Fail-Safe Reveal and Secondary Texture Badge */}
            <div className="w-full relative pl-0 md:pl-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.85, ease: FASHION_EASING }}
                className={`relative aspect-[3/4] border overflow-hidden shadow-2xl group ${
                  isDark ? 'bg-zinc-900 border-white/15' : 'bg-zinc-100 border-black/15'
                }`}
              >
                <motion.img
                  style={{ y: storyImageY }}
                  src="/images/campaign_toteme.jpg"
                  alt="NO CAPS® Architectural Sculpture"
                  className="w-full h-[120%] -top-[10%] relative object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 font-mono text-[11px] text-zinc-300 flex justify-between border-t border-white/20 pt-3">
                  <span>PLATE NO. 04-B</span>
                  <span>ATELIER EDITORIAL // SCANDINAVIAN DRAPE</span>
                </div>
              </motion.div>

              {/* Floating Product Tag (Toteme style) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: FASHION_EASING }}
                className={`absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 border p-4 shadow-2xl backdrop-blur-md font-mono text-xs max-w-[210px] z-10 ${
                  isDark ? 'bg-zinc-950/95 border-white/20 text-white' : 'bg-white/95 border-black/20 text-[#09090b]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 uppercase tracking-widest mb-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  <span>FEATURED GARMENT</span>
                </div>
                <p className="font-bold text-xs mt-0.5">ECHO ARCHIVE TEE</p>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-700/30">
                  <span className="text-xs font-bold">₹3,499</span>
                  <span className="text-[10px] text-zinc-400">320 GSM</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Editorial Typography & Copy with Staggered Scroll Reveals */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: FASHION_EASING }}
              className="flex items-center gap-3"
            >
              <span className={`w-8 h-[1px] ${isDark ? 'bg-white/40' : 'bg-black/40'}`} />
              <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                THE MANIFESTO
              </span>
            </motion.div>

            {/* Manifesto Headline - Always Visible & Elegant */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.85, ease: FASHION_EASING }}
                className={`font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}
              >
                "BUILT FOR THE ONES WHO NEVER FOLLOW THE FRAME."
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "120px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: FASHION_EASING }}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl"
            >
              Streetwear was never meant to be disposable fast fashion. At NO CAPS®, we strip away the superfluous. Every T-shirt is an exercise in structural proportion: drop shoulders calculated down to the millimeter, double-stitched 32mm ribbed necklines, and custom-milled heavyweight textiles that stand away from the body rather than clinging to it.
            </motion.p>

            {/* Metric Counters with Stagger */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ staggerChildren: 0.12 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 font-mono"
            >
              <motion.div variants={cardVariant}>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-white">320+</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">GRAMS PER SQ METER</p>
              </motion.div>
              <motion.div variants={cardVariant}>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-white">100%</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">COMBED RING-SPUN</p>
              </motion.div>
              <motion.div variants={cardVariant} className="col-span-2 sm:col-span-1">
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-white">150</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">LIMITED PIECES PER RUN</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-zinc-300 border-b border-white pb-1 transition-all"
              >
                <span>READ THE FULL ATELIER ESSAY</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Dual-Image Hover & Staggered Viewport Entrance) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1.5">
              <span>SELECTED ARCHIVES</span>
              <span>//</span>
              <span className="text-zinc-400">DROP 04 HIGHLIGHTS</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, ease: FASHION_EASING }}
                className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white uppercase"
              >
                FEATURED SILHOUETTES
              </motion.h2>
            </div>
          </div>

          <Link
            to="/shop"
            className="group flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-300 transition-colors"
          >
            <span>VIEW ENTIRE CATALOGUE ({PRODUCTS.length} ITEMS)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Staggered Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariant}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. FULL-WIDTH CINEMATIC CAMPAIGN BANNER WITH PARALLAX */}
      <section
        ref={campaignBannerRef}
        className="relative py-36 sm:py-52 px-4 sm:px-6 lg:px-8 border-y border-white/10 overflow-hidden my-12"
      >
        <motion.div
          style={{ y: bannerImageY }}
          className="absolute inset-0 -top-[18%] -bottom-[18%] z-0 will-change-transform"
        >
          <img
            src="/images/streetwear_acid_wash.jpg"
            alt="NO CAPS Campaign Fullwidth"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-widest text-zinc-400 uppercase inline-block"
          >
            SS25 CAMPAIGN // BERLIN & MUMBAI
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.95, ease: FASHION_EASING }}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tighter text-white leading-tight"
            >
              NO LOGO CAN REPLACE SUPERIOR FABRIC.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed"
          >
            Experience the tactile difference of dense French Terry and organic cotton jerseys that maintain structural integrity wash after wash.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-8 py-4 font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-2xl hover:shadow-white/20"
              >
                <span>SHOP SS25 COLLECTION ↗</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. LOOKBOOK INTERACTIVE TEASER WITH HOVER ZOOM & STAGGER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              VISUAL JOURNAL
            </span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: FASHION_EASING }}
                className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase"
              >
                SS25 'DISTORTION' LOOKBOOK
              </motion.h2>
            </div>
          </div>
          <Link
            to="/lookbook"
            className="group font-mono text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-300 border-b border-white pb-0.5 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>EXPLORE INTERACTIVE LOOKS</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <motion.div key={item.id} variants={cardVariant}>
              <Link
                to="/lookbook"
                className="group relative aspect-[3/4] bg-zinc-900 border border-white/10 overflow-hidden block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-108 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 font-mono transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <span className="text-[10px] text-zinc-400">0{idx + 1} // CAMPAIGN</span>
                  <p className="text-xs font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">{item.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. ARCHITECTURAL TEXTILE BLUEPRINT (Staggered Cards with Micro-Interactions) */}
      <section className={`py-24 border-t px-4 sm:px-6 lg:px-8 transition-colors ${
        isDark ? 'bg-zinc-950 border-white/10' : 'bg-[#f4f4f0] border-black/10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              CONSTRUCTION ANATOMY
            </span>
            <div className="overflow-hidden mt-1">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: FASHION_EASING }}
                className={`font-display font-extrabold text-3xl sm:text-4xl uppercase ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}
              >
                THE 320 GSM ANATOMY
              </motion.h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
              Every detail engineered to prevent the sagging, fading, and thin draping common in commercial streetwear.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: '01', title: '320 GSM COMBED COTTON', label: 'TEXTILE', desc: 'Spun with long-staple organic fibres to yield maximum tensile strength. Zero polyester blends, guaranteeing breathable comfort even in tropical heat.' },
              { num: '02', title: '32MM HIGH-REBOUND RIB', label: 'COLLAR', desc: 'Tightly bound elastane-reinforced rib collar that rests flush against the collarbone and never stretches out, even after 50+ wash cycles.' },
              { num: '03', title: 'REACTIVE MINERAL WASH', label: 'DYEING', desc: 'Dyed in eco-certified non-toxic reactive baths. Cold tumbled with volcanic pumice to introduce subtle vintage patinas without weakening yarns.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -4, borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
                className={`border p-7 space-y-3 transition-colors duration-300 shadow-md ${
                  isDark ? 'bg-[#0e0e12] border-white/10' : 'bg-white border-black/10'
                }`}
              >
                <span className="font-mono text-xs text-zinc-500">{card.num} // {card.label}</span>
                <h3 className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-[#09090b]'}`}>{card.title}</h3>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. STRONG FINAL CTA */}
      <section className={`py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-widest text-zinc-500 uppercase inline-block"
        >
          DROP 04 ALLOCATION AVAILABLE
        </motion.span>

        <div className="overflow-hidden mt-2 mb-6">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: FASHION_EASING }}
            className={`font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tighter ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}
          >
            READY TO ELEVATE <br className="hidden sm:inline" /> YOUR WARDROBE?
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/shop"
              className={`group px-10 py-4 font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center gap-3 ${
                isDark ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-white/20' : 'bg-black text-white hover:bg-zinc-800 hover:shadow-black/20'
              }`}
            >
              <span>BROWSE THE SHOP NOW (12 PIECES)</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
