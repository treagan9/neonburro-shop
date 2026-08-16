// src/theme/typography.js
// SENTINEL: NB_SHOP_TYPE_V2
//
// ── A COPY, ON PURPOSE ──────────────────────────────────────────────────────
//
// This file is a copy of neonburro.com/src/theme/typography.js. Same faces,
// same pixel scale, same weights, same tracking, same text styles. A visitor
// crossing from the studio to the shop should not be able to feel the type
// change, and the only way to guarantee that with two repos and no shared
// package is for both files to carry identical numbers.
//
// IF THE STUDIO SCALE MOVES, MOVE IT HERE IN THE SAME COMMIT.
//
// V1 was the shop's original scale (xl 20, 2xl 24, 3xl 30, 4xl 36, 5xl 48,
// relaxed 1.7, widest 0.2em, an extrabold weight and a stray '26px' key). It
// drifted a step below the studio at every size, which is exactly the kind of
// difference a customer feels without being able to name. Components that
// wrote fontSize="26px" or fontWeight="800" still work, Chakra passes raw
// values through, they just are not tokens.
//
// ── TWO FACES ───────────────────────────────────────────────────────────────
//
// Geist Sans reads, Geist Mono labels. Self hosted through @fontsource, latin
// subset, imported once in src/main.jsx. Sans 400 500 600 700, mono 400 500.
//
// ── TEXT STYLES ─────────────────────────────────────────────────────────────
//
//   kicker     mono 10px 500, uppercase, 0.2em. Above a heading, beside a dot.
//   wordmark   Sans 600 lowercase, tracking -0.035em, line height 1.
//   lede       lg to xl at relaxed. The one paragraph under a heading.
//
// No oxford commas, no em dashes.

export const typography = {
  fonts: {
    heading: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'Geist Mono', ui-monospace, monospace",
  },
  fontSizes: {
    '2xs': '11px',
    'xs': '12px',
    'sm': '14px',
    'md': '16px',    // body
    'lg': '18px',    // lede on mobile
    'xl': '21px',    // lede
    '2xl': '26px',   // h3, room names
    '3xl': '32px',   // h1 on mobile
    '4xl': '40px',   // h2
    '5xl': '52px',   // h1
    '6xl': '64px',   // display
    '7xl': '80px',
    '8xl': '96px',   // hero wordmark on md
    '9xl': '128px',  // hero wordmark on lg and up
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    none: 1,         // the wordmark
    tight: 1.08,     // display and h1
    snug: 1.18,      // h2 and h3
    normal: 1.4,     // ui copy, captions
    relaxed: 1.6,    // body
  },
  letterSpacings: {
    tighter: '-0.04em',  // the wordmark
    tight: '-0.02em',    // every heading
    normal: '0',
    wide: '0.02em',
    wider: '0.06em',
    widest: '0.14em',    // kickers start here and run to 0.24em
  },
  textStyles: {
    kicker: {
      fontFamily: "'Geist Mono', ui-monospace, monospace",
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
    },
    wordmark: {
      fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.035em',
      lineHeight: 1,
      textTransform: 'lowercase',
    },
    lede: {
      fontSize: { base: '18px', md: '21px' },
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
};

export default typography;
