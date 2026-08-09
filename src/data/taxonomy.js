// src/data/taxonomy.js
// SENTINEL: NB_SHOP_TAXONOMY_V1
//
// The shop's vocabulary, in one file, because a word that means one thing on a
// product card and another thing on the board is how a brand stops being real.
//
// WORN, CARRIED, SENT
// Apparel, Craft and Digital are warehouse words. These are three past
// participles and they never need a fourth, because anything we will ever make
// is worn, carried or sent. A room is entered, not filtered. That distinction
// is the whole difference between a boutique and a catalogue and it should
// survive into the markup.
//
// HEAVY FLOAT IS NOT A FEATURED FLAG
// Float is loose ore found downstream, proving a vein exists uphill. HEAVY
// float is the dense material that did not travel far, which means the vein is
// close. So heaviness here is a real claim about proximity to the lead, not a
// merchandising slot dressed up in costume.
//
// The consequence, and it is the important one: heavy float ROTATES on the
// hunt, never on what we would like to sell this month. If a piece is on that
// rail because inventory is long, the word has been spent and it does not come
// back. Cue owns which pieces are heavy. Tender owns the price. Those are two
// different burros for exactly this reason.
//
// GRUBSTAKE
// Money advanced to a prospector before there is any ore, against a share of
// what gets found. That is a pre order described precisely, and it keeps the
// published rule intact: a grubstaker gets their float thirty days early, which
// is time. It is never access. See blindLead.js FREE_DELAY_DAYS.
//
// No oxford commas, no em dashes.

import { FREE_DELAY_DAYS } from './blindLead';

// ── the two things we say before the sale ───────────────────────────────────
// Both belong here rather than on a policy page, because a policy page is where
// a shop puts the thing it hopes you do not read. Every product record carries
// them and every product page prints them above the button.

export const DYE_NOTE =
  'Dyed naturally in small runs, so your shade will sit a little off the photograph. Two shirts out of the same bath are not the same shirt. That is the product, not a defect.';

// The honest version of no returns. The reason is real, so it gets said.
export const RETURNS_NOTE =
  'No returns. Every piece leaves here carrying a clue, and a clue somebody has already read is not a clue. Anything we got wrong we will fix. Anything you have already looked inside stays yours.';

// The whole shop in nine words. Use it once per page, never twice.
export const HOUSE_LINE = 'Sizes run boxy. Colours run honest. Nothing runs back.';

export const ROOMS = [
  {
    id: 'worn',
    name: 'Worn',
    line: 'Things that go on a body.',
    note: 'Cotton to the thread. Organic dye, organic ink, nothing else on it.',
    accent: '#C5D957',
  },
  {
    id: 'carried',
    name: 'Carried',
    line: 'Things that go in a pack.',
    note: 'Metal and wood. Built to be used somewhere other than a kitchen.',
    accent: '#C8893B',
  },
  {
    id: 'sent',
    name: 'Sent',
    line: 'Things that arrive without a box.',
    note: 'Delivered the moment you buy them. Nothing to ship, nothing to wait for.',
    accent: '#6C6F97',
  },
];

export const ROOM_BY_ID = Object.fromEntries(ROOMS.map((r) => [r.id, r]));

// Legacy category strings still live on the product records. Map rather than
// rewrite, so nothing breaks if an old record surfaces from a branch.
const LEGACY_ROOM = { Apparel: 'worn', Craft: 'carried', Digital: 'sent' };

export const roomFor = (product) => {
  if (!product) return null;
  const id = product.room || LEGACY_ROOM[product.category] || null;
  return id ? ROOM_BY_ID[id] || null : null;
};

export const productsInRoom = (products, roomId) =>
  products.filter((p) => roomFor(p)?.id === roomId);

// ── heavy float ─────────────────────────────────────────────────────────────
// weight is 0 to 3. 0 means the piece carries float like everything else does.
// 3 means this one sits closest to the lead right now. Only weight >= 2 reaches
// the rail, and the rail is capped, because six featured items is zero featured
// items.

export const HEAVY_FLOAT_MIN_WEIGHT = 2;
export const HEAVY_FLOAT_MAX_ON_RAIL = 3;

export const floatWeight = (product) => Number(product?.floatWeight || 0);

export const isHeavyFloat = (product) => floatWeight(product) >= HEAVY_FLOAT_MIN_WEIGHT;

export const heavyFloat = (products) =>
  products
    .filter(isHeavyFloat)
    .sort((a, b) => floatWeight(b) - floatWeight(a))
    .slice(0, HEAVY_FLOAT_MAX_ON_RAIL);

// What the rail says about a piece. Deliberately never says "buy this".
export const PROXIMITY_LINE = {
  3: 'Nearest the lead of anything we have made.',
  2: 'Heavy. It did not travel far from the vein.',
};

export const proximityLine = (product) => PROXIMITY_LINE[floatWeight(product)] || null;

// ── grubstake ───────────────────────────────────────────────────────────────

export const GRUBSTAKE = {
  verb: 'Grubstake this run',
  noun: 'grubstake',
  person: 'grubstaker',
  definition:
    'Money advanced to a prospector before there is any ore, against a share of what gets found. Nobody has invented a better word for ordering something that has not been made yet, so we did not try.',
  promise: `A grubstaker gets their float ${FREE_DELAY_DAYS} days before it publishes free on the board. That is time. It is never access.`,
  // Nothing ships until a run closes, so say the true thing rather than a date
  // we would have to walk back.
  shipping:
    'A run closes when it fills, not on a calendar. You get told the day it closes and the day it ships, and you can pull out any time before the first one.',
};

export default { ROOMS, roomFor, heavyFloat, GRUBSTAKE, DYE_NOTE, RETURNS_NOTE, HOUSE_LINE };
