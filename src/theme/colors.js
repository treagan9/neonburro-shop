// theme/colors.js
// NeonBurro Shop — repainted to brand canon.
// SENTINEL: NB_SHOP_COLORS_V2
//
// Same discipline as the Pulse repaint: every existing key keeps its SHAPE so
// no component breaks. Values move from the 2025 cyan/neon-green system to
// Topo Lime, warmed near-blacks and off-white ink. Marketing aliases (signal,
// brown ramp, alpenglow) are ADDED on top, opt-in.

export const colors = {
  // Primary Brand — repainted from teal #00E5E5 to Topo Lime.
  brand: {
    primary: '#C5D957',      // Topo Lime  (was #00E5E5)
    primaryDark: '#A6B84A',  // pressed / dim  (was #00B8B8)
    primaryLight: '#D2E26B', // hover / glow   (was #4DFFFF)
    primaryAlpha: {
      10: 'rgba(197, 217, 87, 0.1)',
      20: 'rgba(197, 217, 87, 0.2)',
      30: 'rgba(197, 217, 87, 0.3)',
      50: 'rgba(197, 217, 87, 0.5)',
      70: 'rgba(197, 217, 87, 0.7)',
    }
  },

  // Accent
  accent: {
    neon: '#C5D957',         // success / energy  (was #39FF14)
    neonAlpha: {
      10: 'rgba(197, 217, 87, 0.1)',
      20: 'rgba(197, 217, 87, 0.2)',
      30: 'rgba(197, 217, 87, 0.3)',
      50: 'rgba(197, 217, 87, 0.5)',
    },
    warm: '#C8893B',         // Heat Thread amber, CTAs  (was #FF6B00)
    warmAlpha: {
      10: 'rgba(200, 137, 59, 0.1)',
      20: 'rgba(200, 137, 59, 0.2)',
      30: 'rgba(200, 137, 59, 0.3)',
      50: 'rgba(200, 137, 59, 0.5)',
    },
    banana: '#FFE500',       // unchanged, still brand
    bananaLight: '#FFF044',
    bananaDark: '#E6CE00',
    bananaAlpha: {
      10: 'rgba(255, 229, 0, 0.1)',
      20: 'rgba(255, 229, 0, 0.2)',
      30: 'rgba(255, 229, 0, 0.3)',
      50: 'rgba(255, 229, 0, 0.5)',
    },
    cool: '#6C6F97',         // Horizon Relay  (was #00B8E6)
    purple: '#8B5CF6',       // unchanged
    purpleAlpha: {
      10: 'rgba(139, 92, 246, 0.1)',
      20: 'rgba(139, 92, 246, 0.2)',
      30: 'rgba(139, 92, 246, 0.3)',
      50: 'rgba(139, 92, 246, 0.5)',
    },

    // Marketing aliases. New work reads accent.signal so intent is legible.
    signal: '#C5D957',
    signalBright: '#D2E26B',
    signalDim: '#A6B84A',
  },

  // Neutral — warmed a few degrees toward the marketing browns, no pure black.
  dark: {
    void: '#070708',         // deepest  (was #000000)
    black: '#0B0B0C',        // canvas, matches marketing surface.base
    gray: '#141416',         // card backgrounds
    slate: '#252420',        // lighter elements
  },

  semantic: {
    success: '#C5D957',
    warning: '#FFE500',
    error: '#FF3366',
    info: '#6C6F97',
  },

  // Text — off-white, never pure #FFF. Matches marketing text roles.
  text: {
    primary: '#F4F3F1',
    secondary: '#A8A7A4',
    muted: '#6E6E6B',
    inverse: '#0B0B0C',
  },

  ui: {
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(197, 217, 87, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    overlay: 'rgba(0, 0, 0, 0.8)',
    glass: {
      light: 'rgba(255, 255, 255, 0.02)',
      medium: 'rgba(255, 255, 255, 0.05)',
      heavy: 'rgba(255, 255, 255, 0.1)',
    }
  },

  effects: {
    glow: {
      cyan: '0 0 20px rgba(197, 217, 87, 0.5)',   // legacy key name, now lime
      signal: '0 0 20px rgba(197, 217, 87, 0.5)', // preferred alias
      neon: '0 0 20px rgba(197, 217, 87, 0.5)',
      banana: '0 0 20px rgba(255, 229, 0, 0.5)',
      warm: '0 0 20px rgba(200, 137, 59, 0.5)',
    },
    shadow: {
      sm: '0 10px 20px rgba(0, 0, 0, 0.3)',
      md: '0 20px 40px rgba(0, 0, 0, 0.4)',
      lg: '0 30px 60px rgba(0, 0, 0, 0.5)',
    }
  },

  gradients: {
    brand: 'linear(to-r, brand.primary, brand.primaryLight)',
    // neon and brand.primary are the same lime now, so this ramps lime -> amber
    // instead of collapsing into one flat color.
    neon: 'linear(to-r, brand.primary, accent.warm)',
    warm: 'linear(to-r, accent.warm, accent.banana)',
    dark: 'linear(to-b, dark.black, dark.void)',
    rainbow: 'linear(to-r, brand.primary, accent.banana, accent.warm, accent.purple)',
  },

  // ---- MARKETING-ALIGNED ADDITIONS (opt-in, additive) ----
  // Burro material ramp, identical to marketing and Pulse.
  brown: {
    900: '#241A16',
    800: '#4A382F',
    700: '#6B5245',
    600: '#8A6857',
    500: '#A8846E',
    400: '#C39D7F',
  },

  // Alpenglow warm-light surfaces, for editorial / print / light moments.
  alpenglow: {
    base:   '#F3EDE3',
    raised: '#DDD2C2',
    sunken: '#E8E0D4',
    ink:    '#241A16',
    inkSecondary: '#4A382F',
    inkMuted: '#6B5245',
  },
};

export default colors;
