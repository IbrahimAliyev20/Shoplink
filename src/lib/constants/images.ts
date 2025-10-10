/**
 * Centralized image paths for better management and type safety
 * All static images should be referenced from here
 */

export const STATIC_IMAGES = {
  // Brand logos
  logo: '/images/Logo.svg',
  logoFooter: '/images/logofooter.png',
  shoplinkInfo: '/images/shoplinkinfo.webp',
  
  // Advantages
  advantages: {
    advan1: '/images/advan1.svg',
    advan2: '/images/advan2.svg',
    advan3: '/images/advan3.svg',
  },
  
  // Order status icons
  orderStatus: {
    preparing: '/images/hazirlanir.svg',
    inTransit: '/images/yoldadir.svg',
    delivered: '/images/catdirildi.svg',
    watching: '/images/gozlemeicon.svg',
  },
  
  // Carousel images
  carousel: {
    carusel1: '/images/carusel1.png',
    carusel2: '/images/carusel2.jpg',
    carusel3: '/images/carusel3.jpg',
    carusel4: '/images/carusel4.jpg',
  },
  
  // UI elements
  ui: {
    card: '/images/Card.svg',
    ctaBackground: '/images/ctabg.png',
    profileAvatar: '/images/profilavatar.svg',
  },
  
  // Team members
  team: {
    team1: '/images/team1.webp',
    team2: '/images/team2.webp',
    team3: '/images/team3.webp',
    team4: '/images/team4.jpg',
    team5: '/images/team5.jpg',
  },
  
  // Market images
  market: {
    hero: '/marketimg/hero.png',
    heroLogo: '/marketimg/herologo.svg',
    marketAbout: '/marketimg/marketabout.jpg',
    marketAbout2: '/marketimg/marketabout2.jpg',
    sport: '/marketimg/sport.png',
  },
  
  // Placeholders
  placeholders: {
    product: '/images/placeholder-product.png',
    user: '/images/profilavatar.svg',
  },
} as const;

// Type helper to get image paths
export type ImagePath = typeof STATIC_IMAGES;

// Helper function to get image with fallback
export function getImage(path: string, fallback?: string): string {
  return path || fallback || STATIC_IMAGES.placeholders.product;
}

