// src/theme/layout.js
// SENTINEL: NB_SHOP_LAYOUT_V2
//
// ── THE INVARIANT, AND IT IS THE SAME ONE ───────────────────────────────────
//
//   The first glyph of the wordmark and the first character of every heading
//   sit at the same x. At every viewport width. On every page. On both domains.
//
// This file is a deliberate copy of neonburro.com/src/theme/layout.js. Same
// rail, same sheet, same tile inset. A visitor crossing from the studio to the
// shop should not be able to feel the domain change, and the only way to
// guarantee that is for both sites to hang off identical numbers.
//
// IF THE STUDIO CHANGES ITS RAIL, CHANGE IT HERE IN THE SAME COMMIT.
// There is no shared package yet. That is a known cost and it is smaller than
// the cost of a monorepo for two sites.
//
// ── WHAT THE SHOP DOES DIFFERENTLY, AND WHY ─────────────────────────────────
//
// The studio nav is a floating tile that hides on the way down the page. A
// studio can afford to get out of your way, because nothing on the page is
// urgent and the reader is reading.
//
// A shop cannot. The cart has to be reachable at every moment of the visit, so
// the shop nav is a FULL WIDTH bar that never hides. It thins instead: on
// scroll it loses height and gains the house tile treatment across the whole
// band. Same geometry, opposite behaviour, and the difference is something a
// customer feels rather than names.
//
// ── THE SADDLEBAG, AND THE GAP IT LIVES IN ─────────────────────────────────
//
// The sheet is left aligned and capped at SHEET. On a display wider than that
// the right hand side is empty on purpose, the same way it is on the studio.
// The shop puts the cart there. Above DOCK_MIN the saddlebag is a fixed column
// in that gap, always visible, always current. Below it, the saddlebag is a
// floating pill in the bottom right that appears the moment something is added
// and opens the drawer. Same object, two homes, chosen by width alone.
//
// DOCK_MIN is SHEET plus the dock plus two rails, exactly. Change SHEET and
// this has to move with it, which is why it is derived and not typed. It works
// out to 2100, and a common wide display is 2127 CSS pixels, so do not add
// breathing room here, add it inside the dock.
//
// No oxford commas, no em dashes.

// ── the rail ────────────────────────────────────────────────────────────────
// ONE desktop value. A rail that steps again at lg cannot be matched by a fixed
// position element, which is the mistake the shop pages were making at lg:16.
export const RAIL = { base: 5, md: 10 };
export const RAIL_PX = { base: 20, md: 40 };

// ── the sheet ───────────────────────────────────────────────────────────────
// 1680, not the 1400 the shop pages were carrying. A product photograph has more
// right to a wide screen than a paragraph does.
export const SHEET = '1680px';
export const SHEET_PX = 1680;

// ── the saddlebag dock ──────────────────────────────────────────────────────
export const DOCK_W_PX = 340;
export const DOCK_W = `${DOCK_W_PX}px`;
export const DOCK_MIN_PX = SHEET_PX + DOCK_W_PX + RAIL_PX.md * 2;
export const DOCK_MIN = `${DOCK_MIN_PX}px`;
export const DOCK_MQ = `@media (min-width: ${DOCK_MIN_PX}px)`;

// ── the nav lockup ──────────────────────────────────────────────────────────
// The tile has 11px of padding and a 1px border, so its box starts 12px before
// its wordmark. Pull the tile back by that much and the LETTERFORM lands on the
// line. Aligning the box instead is what makes this look almost right, which is
// worse than looking wrong.
export const NAV_TILE_INSET = 12;
export const CONTENT_LEFT = `${RAIL_PX.md}px`;

// The bar, not the tile. It spans the viewport, so it has a height rather than a
// left and a top.
export const NAV_H = { base: '68px', md: '84px' };
export const NAV_H_TIGHT = { base: '58px', md: '64px' };

// How far down before the bar thins and the surface arrives.
export const NAV_CONDENSE_AFTER = 24;

// ── measure ─────────────────────────────────────────────────────────────────
// SHEET is a viewport constraint. MEASURE is a typographic one. Conflating the
// two is the most common way this system gets broken.
export const MEASURE = '660px';
export const LEDE = '860px';

// ── rhythm ──────────────────────────────────────────────────────────────────
export const BAND_Y = { base: 14, md: 20, lg: 28 };
export const GUTTER = { base: 6, md: 8, lg: 10 };

// ── display scale ───────────────────────────────────────────────────────────
export const DISPLAY = {
  xl: { base: '38px', md: '68px', lg: '84px' },
  lg: { base: '32px', md: '52px', lg: '64px' },
  md: { base: '26px', md: '38px', lg: '46px' },
  sm: { base: '22px', md: '28px', lg: '32px' },
};

// ── surfaces ────────────────────────────────────────────────────────────────
export const SHADES = { sunken: '#070708', base: '#0B0B0C', raised: '#141416' };

// ── motion ──────────────────────────────────────────────────────────────────
// Heavy ease out. Leaves fast, lands almost still. Material's 0.4/0/0.2/1 is the
// safe default and reads as software. This one reads as weight.
export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// The tile surface, verbatim from the studio so the two lockups are the same
// object rather than two objects that resemble each other.
export const TILE = {
  bg: 'rgba(36, 26, 22, 0.72)',
  blur: 'blur(14px) saturate(140%)',
  border: 'rgba(110,110,107,0.28)',
  shadow: '0 10px 30px rgba(0,0,0,0.34)',
};

export default {
  RAIL, RAIL_PX, SHEET, SHEET_PX, MEASURE, LEDE, BAND_Y, GUTTER, DISPLAY,
  CONTENT_LEFT, NAV_TILE_INSET, NAV_H, NAV_H_TIGHT, NAV_CONDENSE_AFTER,
  SHADES, EASE, TILE, DOCK_W, DOCK_W_PX, DOCK_MIN, DOCK_MIN_PX, DOCK_MQ,
};
