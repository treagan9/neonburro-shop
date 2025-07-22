// theme/index.js
import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  ...typography,
  styles: {
    global: {
      'html, body': {
        bg: 'dark.black',
        color: 'text.primary',
        fontFamily: 'body',
        lineHeight: 'base',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
      },
      '*::selection': {
        bg: 'brand.primaryAlpha.50',
        color: 'brand.primaryLight',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        bg: 'dark.void',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'brand.primaryAlpha.30',
        borderRadius: '4px',
        '&:hover': {
          bg: 'brand.primaryAlpha.50',
        }
      },
      // Focus styles for accessibility
      'button:focus-visible, a:focus-visible': {
        outline: '2px solid',
        outlineColor: 'brand.primary',
        outlineOffset: '2px',
      },
      // Heading styles
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
        lineHeight: 'tight',
      },
      // Code and mono elements
      'code, pre, .mono': {
        fontFamily: 'mono',
      },
      // Smooth transitions
      '*': {
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      },
      // Better link styles
      'a': {
        color: 'brand.primary',
        textDecoration: 'none',
        transition: 'all 0.2s',
        '&:hover': {
          color: 'brand.primaryLight',
          textDecoration: 'underline',
        }
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          boxShadow: 'none',
        },
        _focusVisible: {
          boxShadow: '0 0 0 3px brand.primaryAlpha.50',
        }
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4,
          py: 2,
        },
        md: {
          fontSize: 'md',
          px: 6,
          py: 3,
        },
        lg: {
          fontSize: 'md',
          px: 8,
          py: 4,
        }
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'dark.black',
          _hover: {
            bg: 'brand.primaryDark',
            transform: 'translateY(-2px)',
            boxShadow: 'effects.glow.cyan',
          },
          _active: {
            transform: 'translateY(0)',
          }
        },
        outline: {
          borderColor: 'brand.primary',
          borderWidth: '2px',
          color: 'brand.primary',
          _hover: {
            bg: 'brand.primaryAlpha.10',
            transform: 'translateY(-2px)',
          },
        },
        ghost: {
          color: 'text.secondary',
          _hover: {
            bg: 'whiteAlpha.100',
            color: 'text.primary',
          },
        },
        neon: {
          bg: 'transparent',
          color: 'accent.neon',
          borderWidth: '2px',
          borderColor: 'accent.neon',
          _hover: {
            bg: 'accent.neonAlpha.20',
            boxShadow: 'effects.glow.neon',
            transform: 'translateY(-2px)',
          },
        },
        banana: {
          bg: 'accent.banana',
          color: 'dark.black',
          _hover: {
            bg: 'accent.bananaDark',
            transform: 'translateY(-2px)',
            boxShadow: 'effects.glow.banana',
          },
        }
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'base',
      },
      variants: {
        label: {
          fontSize: 'xs',
          fontWeight: 'semibold',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'text.muted',
        },
        body: {
          fontSize: 'md',
          lineHeight: 'relaxed',
          color: 'text.secondary',
        }
      }
    },
    Container: {
      baseStyle: {
        maxW: '1400px',
        px: { base: 4, md: 8 },
      },
    },
    Box: {
      baseStyle: {
        // Custom box variants can be added here
      },
      variants: {
        glass: {
          bg: 'ui.glass.light',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'ui.border',
        },
        card: {
          bg: 'ui.glass.medium',
          backdropFilter: 'blur(20px)',
          borderRadius: 'xl',
          border: '2px solid',
          borderColor: 'ui.border',
          p: { base: 4, md: 6 },
        }
      }
    }
  },
  // Custom breakpoints matching your design system
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  // Spacing scale
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
  },
  // Radii
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
});

export default theme;