// src/theme/index.js
// SENTINEL: NB_SHOP_THEME_V2
//
// ── WHAT THIS FILE IS ───────────────────────────────────────────────────────
//
// The shop's Chakra theme, assembled from colors.js (the shop's older key
// names carrying the brand values), typography.js (a copy of the studio scale)
// and layout.js (a copy of the studio geometry plus the saddlebag dock). This
// file only wires them together and sets the global and component defaults.
// The canon for every value is neonburro.com/src/theme, this file follows it.
//
// ── WHAT CHANGED IN V2, AND WHY ─────────────────────────────────────────────
//
// V1 was the 2025 template: a global transition on every element, links
// coloured lime with an underline on hover, lime on lime selection, neon and
// banana button variants nobody called, glass and card Box variants nobody
// called, a hand copied spacing scale identical to Chakra's own, and radii a
// step smaller than the studio's. All of it gone. Every shop component that
// mattered had already been overriding these globals inline, which is the
// surest sign a global is wrong.
//
// ── THE SHOP'S LICENCE ──────────────────────────────────────────────────────
//
// On the studio the solid button is warm white and turns lime on hover, lime
// being spent once per screen. In the shop the whole store is lime, so the
// solid button is lime at rest, dark text, and lifts on hover. That is the one
// deliberate difference from the studio theme and it is written here on
// purpose. Do not import the studio's Button block over it.
//
// Colour mode is LOCKED to dark, useSystemColorMode false. No OS setting
// repaints the shop.
//
// No oxford commas, no em dashes.

import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';
import { EASE } from './layout';

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
        lineHeight: 'relaxed',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },
      '*::selection': {
        bg: 'brand.primaryAlpha.20',
        color: 'text.primary',
      },
      '::-webkit-scrollbar': { width: '8px', bg: 'dark.void' },
      '::-webkit-scrollbar-thumb': {
        bg: 'whiteAlpha.300',
        borderRadius: '4px',
        '&:hover': { bg: 'brand.primaryAlpha.50' },
      },
      'button:focus-visible, a:focus-visible': {
        outline: '2px solid',
        outlineColor: 'brand.primary',
        outlineOffset: '2px',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
        lineHeight: 'tight',
      },
      'code, pre, .mono': { fontFamily: 'mono' },
      // Links inherit. A lime default was colouring every anchor styled Box in
      // the shop and every one of them was overriding it back.
      'a': {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': { textDecoration: 'none' },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
        letterSpacing: 'normal',
        transition: `background 220ms ${EASE}, color 220ms ${EASE}, border-color 220ms ${EASE}, transform 220ms ${EASE}, opacity 220ms ${EASE}`,
        _focus: { boxShadow: 'none' },
        _focusVisible: { boxShadow: 'none' },
        _active: { opacity: 0.92 },
      },
      sizes: {
        xs: { fontSize: 'sm', h: '36px', px: 4 },
        sm: { fontSize: 'sm', h: '42px', px: 6 },
        md: { fontSize: 'sm', h: '46px', px: 6 },
        lg: { fontSize: 'sm', h: '52px', px: 7 },
      },
      variants: {
        // Lime at rest. The shop's licence, see the header.
        solid: {
          bg: 'brand.primary',
          color: 'dark.black',
          _hover: {
            bg: 'brand.primaryLight',
            transform: 'translateY(-2px)',
            _disabled: { bg: 'brand.primary', transform: 'none' },
          },
          _active: { transform: 'translateY(0)' },
        },
        outline: {
          borderColor: 'ui.border',
          borderWidth: '1px',
          color: 'text.primary',
          bg: 'transparent',
          _hover: {
            borderColor: 'brand.primary',
            color: 'brand.primary',
            bg: 'transparent',
          },
        },
        ghost: {
          color: 'text.secondary',
          _hover: { bg: 'whiteAlpha.100', color: 'text.primary' },
        },
      },
      defaultProps: { variant: 'solid' },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
        color: 'text.primary',
      },
    },
    Text: {
      baseStyle: { lineHeight: 'relaxed' },
      variants: {
        // The house kicker. Same values as textStyles.kicker in typography.js.
        label: {
          fontFamily: 'mono',
          fontSize: '10px',
          fontWeight: 'medium',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          lineHeight: 'normal',
          color: 'text.muted',
        },
        body: {
          fontSize: 'md',
          lineHeight: 'relaxed',
          color: 'text.secondary',
        },
      },
    },
    // The inner page column for the long form pages (about, legal). NOT the
    // sheet. Product pages and the home page use RAIL and SHEET from layout.js.
    Container: {
      baseStyle: { maxW: '1400px', px: { base: 4, md: 8 } },
    },
  },
  breakpoints: {
    sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
  },
  // Same steps as the studio. Pills for buttons and counts, 12px cards and
  // wells, 24px plates.
  radii: {
    none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem',
    xl: '1rem', '2xl': '1.5rem', full: '9999px',
  },
});

export default theme;
