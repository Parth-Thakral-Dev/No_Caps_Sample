export const FASHION_EASING = [0.16, 1, 0.3, 1] as const;
export const FASHION_SPRING = { type: 'spring', damping: 28, stiffness: 220 } as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: FASHION_EASING,
    },
  }),
};

export const maskReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: (delay: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: FASHION_EASING,
    },
  }),
};

export const imageCurtainReveal = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: FASHION_EASING,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: FASHION_EASING,
    },
  },
};

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: FASHION_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.22,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};
