import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Feather, Recycle, CheckCircle2 } from 'lucide-react';
import { FASHION_EASING, imageCurtainReveal, cardVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

interface CraftStep {
  step: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  specs: string[];
}

const CRAFT_STEPS: CraftStep[] = [
  {
    step: '01',
    title: 'RAW ORGANIC FIBRE HARVEST',
    subtitle: 'TIRUPPUR & GUJARAT ETHICAL FARMS',
    image: '/images/atelier_loom.jpg',
    description: 'We procure exclusively extra-long staple (ELS) combed organic cotton. Longer fibres yield extraordinary tensile durability, eliminating the fuzzing, pilling, and fiber degradation common in commodity cotton.',
    specs: ['100% GOTS Organic Certified', 'Zero synthetic polyester blending', 'Pre-conditioned for yarn twist retention'],
  },
  {
    step: '02',
    title: 'CUSTOM 320-350 GSM CIRCULAR KNITTING',
    subtitle: 'INTERLOCK HIGH-TENSION RIB',
    image: '/images/atelier_weave.jpg',
    description: 'Standard fast fashion tees weigh between 140 and 180 GSM. NO CAPS® knits double-faced 320 to 350 GSM heavyweight jersey that maintains its own architectural drop-shoulder posture rather than draping passively over the torso.',
    specs: ['320 GSM baseline minimum weight', 'Double-steamed anti-shrink treatment', '32mm high-rebound reinforced collar rib'],
  },
  {
    step: '03',
    title: 'ARCHITECTURAL PATTERN DRAFTING',
    subtitle: 'BERLIN KREUZBERG DESIGN STUDIO',
    image: '/images/campaign_toteme.jpg',
    description: 'Each pattern is engineered from scratch in our Berlin studio. Low-slung shoulder lines, widened sleeves with clean horizontal drape, and a precisely calculated boxy hem cut to prevent waist bunching.',
    specs: ['Engineered drop-shoulder geometry', 'Side hem slit vents for natural motion', 'Laser-cut fabric panels with reinforced bar-tacks'],
  },
  {
    step: '04',
    title: 'MINERAL ACID & VOLCANIC TUMBLE',
    subtitle: 'NATURAL STONE AGING',
    image: '/images/streetwear_acid_wash.jpg',
    description: 'Garments undergo cold-water enzymatic tumbling with Italian volcanic pumice stones. This breaks down surface tension to provide a buttery, lived-in feel while preserving fiber core density and structural heft.',
    specs: ['Non-toxic low-impact reactive dyes', 'Natural pumice stone agitation', 'Water-based discharge screenprints'],
  },
  {
    step: '05',
    title: 'ATELIER INSPECTION & NUMBERING',
    subtitle: 'MUMBAI CENTRAL INDUSTRIAL LAB',
    image: '/images/streetwear_distressed.jpg',
    description: 'Every single piece is individually inspected for seam straightness, collar rebound, and weight tolerance. Only 150 pieces are produced per edition, each delivered in custom silver vacuum packaging.',
    specs: ['Strict 150-unit run limit per silhouette', 'Hand-stamped batch certificate', 'Zero deadstock landfill waste guarantee'],
  },
];

export const AboutPage: React.FC = () => {
  const { isDark } = useTheme();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const pillars = [
    {
      icon: ShieldCheck,
      title: '320+ GSM CUSTOM KNIT',
      image: '/images/atelier_weave.jpg',
      tag: 'TEXTILE ANATOMY',
      description: 'Substantial structural body weight that commands an architectural drop-shoulder silhouette instead of draping passively.',
      stat: '320 GSM',
    },
    {
      icon: Feather,
      title: '100% ORGANIC COMBED',
      image: '/images/atelier_loom.jpg',
      tag: 'RAW MATERIAL',
      description: 'Long-staple ring-spun cotton fibres ensure buttery skin contact with zero synthetic polyester or cheap chemical sizing.',
      stat: 'GOTS CERTIFIED',
    },
    {
      icon: Sparkles,
      title: 'WATER-BASED DISCHARGE',
      image: '/images/streetwear_acid_wash.jpg',
      tag: 'FINISHING LAB',
      description: 'Zero-plastic reactive inks that fuse directly into the cotton matrix rather than sitting on top as a heavy rubberized layer.',
      stat: 'ZERO PLASTIC',
    },
    {
      icon: Recycle,
      title: '150 PIECE RUNS',
      image: '/images/streetwear_distressed.jpg',
      tag: 'ARCHIVE ETHOS',
      description: 'Anti-overproduction philosophy. Small batch numbering ensures extreme uniqueness and absolute zero deadstock landfill waste.',
      stat: 'NO RESTOCKS',
    },
  ];

  const studios = [
    {
      name: 'MUMBAI TEXTILE LAB',
      role: 'HEAD ATELIER & DISPATCH',
      coords: '18.9986° N, 72.8258° E',
      image: '/images/atelier_loom.jpg',
      description: 'Compound 42, Lower Parel Industrial District. Pattern drafting, small-run screen printing, garment quality testing, and worldwide express dispatch.',
    },
    {
      name: 'BERLIN KREUZBERG',
      role: 'DESIGN & SILHOUETTE STUDIO',
      coords: '52.4990° N, 13.4180° E',
      image: '/images/lookbook_plate_5.jpg',
      description: 'Architectural silhouette research, brutalist typographic artwork development, and European campaign visual direction.',
    },
    {
      name: 'TIRUPPUR KNITTING WORKS',
      role: 'ORGANIC COTTON MILLING',
      coords: '11.1085° N, 77.3411° E',
      image: '/images/campaign_toteme.jpg',
      description: 'GOTS-certified organic cotton milling, low-impact enzymatic stone washes, double-steamed pre-shrinkage, and 32mm rib collar knitting.',
    },
  ];

  const currentStep = CRAFT_STEPS[activeStepIndex];

  return (
    <div className={`min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'bg-[#09090b] text-white' : 'bg-[#fafaf8] text-[#09090b]'
    }`}>
      {/* 1. Header with Mask Reveal */}
      <div className={`border-b pb-8 pt-4 transition-colors ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">
              ATELIER ESSAY & TEXTILE RESEARCH // 2026
            </span>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: FASHION_EASING }}
                className={`font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}
              >
                NO CAPS® ATELIER
              </motion.h1>
            </div>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
              "BUILT FOR THE ONES WHO NEVER FOLLOW THE FRAME." NO CAPS® was founded as a direct revolt against the disposable culture of flimsy graphic blanks.
            </p>
          </div>
          <div className="font-mono text-xs">
            <span className={`px-3 py-1.5 border inline-block ${
              isDark ? 'bg-zinc-900 border-white/15 text-zinc-300' : 'bg-zinc-100 border-black/10 text-zinc-800'
            }`}>
              STRICTLY 150 UNITS / NO RESTOCKS
            </span>
          </div>
        </div>
      </div>

      {/* 2. Narrative Section 1: The Manifesto with Moving Mask Hero Reveal */}
      <div className={`py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-zinc-500" />
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              01 // THE MANIFESTO
            </span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: FASHION_EASING }}
              className={`font-display font-bold text-3xl sm:text-4xl leading-tight ${
                isDark ? 'text-white' : 'text-[#09090b]'
              }`}
            >
              WE DO NOT PRINT ON EXISTING BLANKS. WE BUILD TEXTILES.
            </motion.h2>
          </div>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
            Most streetwear labels buy generic 180 GSM polyester-blend t-shirts from commodity wholesalers, slap on a direct-to-garment print, and charge luxury markups. That is not fashion.
          </p>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
            Every NO CAPS® garment begins with raw organic cotton yarn. We mill our own 300 to 350 GSM jersey knit in Tiruppur and Portugal. The fabric undergoes a specialized double-steamed pre-shrinkage wash before cutting so your silhouette retains its exact boxy architectural drape across years of wear.
          </p>

          <div className="pt-2 grid grid-cols-3 gap-4 border-t border-dashed border-zinc-700/30 font-mono text-xs">
            <div>
              <p className="text-2xl font-bold font-display">320+</p>
              <p className="text-[10px] text-zinc-500 uppercase">HEAVYWEIGHT GSM</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">0%</p>
              <p className="text-[10px] text-zinc-500 uppercase">SYNTHETIC POLYESTER</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">150</p>
              <p className="text-[10px] text-zinc-500 uppercase">NUMBERED PIECES</p>
            </div>
          </div>
        </div>

        {/* Hero Atelier Visual with Mask Curtain Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={imageCurtainReveal}
          className={`lg:col-span-6 relative aspect-[4/3] border overflow-hidden group shadow-2xl ${
            isDark ? 'bg-zinc-900 border-white/15' : 'bg-zinc-100 border-black/10'
          }`}
        >
          <img
            src="/images/atelier_loom.jpg"
            alt="NO CAPS Atelier Pattern Drafting & Tailoring"
            className="w-full h-full object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-104"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-zinc-300 border-t border-white/20 pt-2">
            <span>PLATE ATELIER-01 // PATTERN DRAFTING</span>
            <span>MUMBAI CENTRAL LAB</span>
          </div>
        </motion.div>
      </div>

      {/* 3. FOUR PILLARS WITH HIGH-IMPACT EDITORIAL PHOTOGRAPHY */}
      <div className={`py-20 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
            02 // CORE STANDARDS
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: FASHION_EASING }}
              className={`font-display font-extrabold text-3xl sm:text-5xl uppercase ${
                isDark ? 'text-white' : 'text-[#09090b]'
              }`}
            >
              THE FOUR PILLARS
            </motion.h2>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans">
            Every garment must pass all four criteria before being cleared for release.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                className={`group border overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isDark ? 'bg-zinc-950 border-white/10 hover:border-white/30' : 'bg-white border-black/10 hover:border-black/30'
                }`}
              >
                {/* Photo with Moving Curtain & Hover Zoom */}
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white uppercase tracking-wider">
                    {pillar.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono font-bold text-xs text-white">
                    {pillar.stat}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                      <span className="font-mono text-[10px] text-zinc-500 uppercase">STANDARD 0{idx + 1}</span>
                    </div>
                    <h3 className={`font-display font-bold text-base uppercase leading-snug ${
                      isDark ? 'text-white' : 'text-[#09090b]'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 4. INTERACTIVE 5-STAGE ATELIER CRAFT PROCESS */}
      <div className={`py-20 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              03 // METHODOLOGY
            </span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: FASHION_EASING }}
                className={`font-display font-extrabold text-3xl sm:text-4xl uppercase ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}
              >
                THE 5-STAGE ATELIER PROCESS
              </motion.h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
              Click each phase to inspect the engineering behind every NO CAPS® silhouette.
            </p>
          </div>

          {/* Step Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {CRAFT_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? isDark
                      ? 'bg-white text-black font-bold'
                      : 'bg-black text-white font-bold'
                    : isDark
                      ? 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
                      : 'bg-zinc-100 border border-black/10 text-zinc-600 hover:text-black'
                }`}
              >
                PHASE {s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Display with Animated Crossfade */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border p-6 sm:p-10 ${
          isDark ? 'bg-zinc-950 border-white/10' : 'bg-white border-black/10'
        }`}>
          {/* Step Content */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <span>PROCESS STAGE</span>
              <span>//</span>
              <span className="font-bold text-white bg-zinc-800 px-2 py-0.5">{currentStep.step} OF 05</span>
            </div>

            <h3 className={`font-display font-bold text-2xl sm:text-3xl uppercase ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>
              {currentStep.title}
            </h3>

            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              {currentStep.subtitle}
            </p>

            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-zinc-800/40">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                TECHNICAL PROTOCOLS:
              </span>
              {currentStep.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Image with Animated Reveal */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: FASHION_EASING }}
                className={`relative aspect-[4/3] border overflow-hidden shadow-2xl ${
                  isDark ? 'bg-zinc-900 border-white/15' : 'bg-zinc-100 border-black/15'
                }`}
              >
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white">
                  <span>ATELIER ARCHIVE // PHASE {currentStep.step}</span>
                  <span className="bg-white/15 px-2 py-0.5 text-[10px] uppercase">VERIFIED PROTOCOL</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 5. ATELIER STUDIOS WORLDWIDE (With Architectural Images & Coordinates) */}
      <div className={`py-20 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
            04 // GEOGRAPHY
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: FASHION_EASING }}
              className={`font-display font-extrabold text-3xl sm:text-4xl uppercase ${
                isDark ? 'text-white' : 'text-[#09090b]'
              }`}
            >
              ATELIER LOCATIONS
            </motion.h2>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans">
            Distributed craftsmanship between specialized hubs across India and Europe.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {studios.map((studio, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              whileHover={{ y: -6 }}
              className={`group border overflow-hidden shadow-xl transition-all duration-300 ${
                isDark ? 'bg-zinc-950 border-white/10 hover:border-white/30' : 'bg-white border-black/10 hover:border-black/30'
              }`}
            >
              <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-white/20 px-2 py-0.5 font-mono text-[9px] text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE LAB</span>
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-300">
                  {studio.coords}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                  {studio.role}
                </span>
                <h4 className={`font-display font-bold text-lg uppercase ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}>
                  {studio.name}
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                  {studio.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 6. CTA */}
      <div className="pt-20 text-center space-y-6">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          DROP 04 ALLOCATION OPEN
        </span>
        <h3 className={`font-display font-extrabold text-3xl sm:text-5xl uppercase ${
          isDark ? 'text-white' : 'text-[#09090b]'
        }`}>
          ACQUIRE THE ARCHIVE
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
          Every silhouette is handcrafted in strictly limited editions of 150 pieces. Pan-India express dispatch with 7-day exchanges.
        </p>
        <div className="pt-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              to="/shop"
              className={`inline-flex items-center gap-2 px-8 py-4 font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-2xl ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              <span>ENTER DROP 04 STORE ↗</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
