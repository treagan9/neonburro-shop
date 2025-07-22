// theme/colors.js
export const colors = {
  // Primary Brand Colors - Your unique teal/cyan
  brand: {
    primary: '#00E5E5',      // Unique teal - between cyan and turquoise
    primaryDark: '#00B8B8',  // Darker teal for hover states
    primaryLight: '#4DFFFF', // Lighter teal for glows
    primaryAlpha: {
      10: 'rgba(0, 229, 229, 0.1)',
      20: 'rgba(0, 229, 229, 0.2)',
      30: 'rgba(0, 229, 229, 0.3)',
      50: 'rgba(0, 229, 229, 0.5)',
      70: 'rgba(0, 229, 229, 0.7)',
    }
  },
  
  // Accent Colors - Enhanced palette
  accent: {
    neon: '#39FF14',         // Neon green for energy/success
    neonAlpha: {
      10: 'rgba(57, 255, 20, 0.1)',
      20: 'rgba(57, 255, 20, 0.2)',
      30: 'rgba(57, 255, 20, 0.3)',
      50: 'rgba(57, 255, 20, 0.5)',
    },
    warm: '#FF6B00',         // Orange for CTAs and warmth
    warmAlpha: {
      10: 'rgba(255, 107, 0, 0.1)',
      20: 'rgba(255, 107, 0, 0.2)',
      30: 'rgba(255, 107, 0, 0.3)',
      50: 'rgba(255, 107, 0, 0.5)',
    },
    banana: '#FFE500',       // Neon yellow/banana accent
    bananaLight: '#FFF044',  // Lighter banana
    bananaDark: '#E6CE00',   // Darker banana
    bananaAlpha: {
      10: 'rgba(255, 229, 0, 0.1)',
      20: 'rgba(255, 229, 0, 0.2)',
      30: 'rgba(255, 229, 0, 0.3)',
      50: 'rgba(255, 229, 0, 0.5)',
    },
    cool: '#00B8E6',         // Secondary blue-teal
    purple: '#8B5CF6',       // Purple for variety
    purpleAlpha: {
      10: 'rgba(139, 92, 246, 0.1)',
      20: 'rgba(139, 92, 246, 0.2)',
      30: 'rgba(139, 92, 246, 0.3)',
      50: 'rgba(139, 92, 246, 0.5)',
    }
  },
  
  // Neutral Colors
  dark: {
    void: '#000000',         // Pure black
    black: '#0A0A0A',        // Background black
    gray: '#1A1A1A',         // Card backgrounds
    slate: '#2A2A2A',        // Lighter elements
  },
  
  // Semantic Colors
  semantic: {
    success: '#39FF14',      // Using neon green
    warning: '#FFE500',      // Using banana yellow
    error: '#FF3366',        // Red-pink for errors
    info: '#00B8E6',         // Using cool blue
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8B8',
    muted: '#808080',
    inverse: '#0A0A0A',
  },
  
  // UI Colors
  ui: {
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(0, 229, 229, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    overlay: 'rgba(0, 0, 0, 0.8)',
    glass: {
      light: 'rgba(255, 255, 255, 0.02)',
      medium: 'rgba(255, 255, 255, 0.05)',
      heavy: 'rgba(255, 255, 255, 0.1)',
    }
  },
  
  // Utility colors for special effects
  effects: {
    glow: {
      cyan: '0 0 20px rgba(0, 229, 229, 0.5)',
      neon: '0 0 20px rgba(57, 255, 20, 0.5)',
      banana: '0 0 20px rgba(255, 229, 0, 0.5)',
      warm: '0 0 20px rgba(255, 107, 0, 0.5)',
    },
    shadow: {
      sm: '0 10px 20px rgba(0, 0, 0, 0.3)',
      md: '0 20px 40px rgba(0, 0, 0, 0.4)',
      lg: '0 30px 60px rgba(0, 0, 0, 0.5)',
    }
  },
  
  // Gradients
  gradients: {
    brand: 'linear(to-r, brand.primary, brand.primaryLight)',
    neon: 'linear(to-r, brand.primary, accent.neon)',
    warm: 'linear(to-r, accent.warm, accent.banana)',
    dark: 'linear(to-b, dark.black, dark.void)',
    rainbow: 'linear(to-r, brand.primary, accent.neon, accent.banana, accent.warm)',
  }
};

export default colors;