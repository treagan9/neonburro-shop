// src/data/products-digital.js
// SENTINEL: NB_SHOP_DIGITAL_V2
//
// The two things in the Sent room. Both are delivered by email, neither needs
// a shipping address, and both are marked delivery: 'digital' so the cart and
// the checkout can tell. CartContext.isDigitalItem reads category, room and
// delivery, keep all three set here.
//
// ── the $2 clue, four floats ────────────────────────────────────────────────
// One envelope, four kinds of float, each sealed by a different burro from the
// yard's roster (src/data/burros.js on neonburro.com is the canon, the names
// and titles below are copied from it, do not invent new ones here):
//
//   bearing   Pitch, the Lead Scout        a direction from a named place
//   distance  Dock, the Dream Courier      how far, and along what
//   marker    Bloom, the Euphoric Botanist what you will see when you are close
//   place     Bao, the Dream Chef          the local name for where you stand
//
// One float on its own is a fragment. All four together are a route. That is
// the reason to sell four for two dollars each rather than one for eight: the
// hunt wants people to collect and compare, and the board publishes each float
// free thirty days after release, so the price is for the head start.
//
// The four envelope images are the four designs. covers.js picks the grid
// cover from them by hash, so nobody has to choose which burro is the face of
// the product. If a fifth float is ever added, add its envelope to
// public/images/shop/digital and a fifth entry below, nothing else changes.
//
// ── the pay card, reloadable ────────────────────────────────────────────────
// A balance toward studio work. Two modes on the product page: a new card,
// which mints a code and emails it, or a reload, which adds to an existing
// balance and needs the code from that email. The mode and the code travel on
// the cart line (reloadCode) and onto the PaymentIntent metadata, which is
// where the fulfilment side reads them. The card ledger itself (codes,
// balances, redemptions) is Pulse's, not the shop's, and is the next build.
// Until it lands a reload is recorded on the payment and applied by hand.
//
// No oxford commas, no em dashes.

const ENVELOPE = (n) => `/images/shop/digital/clue-envelope-0${n}.webp`;

export const CLUE_FLOATS = [
  {
    id: 'bearing',
    name: 'Bearing',
    kind: 'A bearing',
    character: 'Pitch',
    characterTitle: 'The Lead Scout',
    image: ENVELOPE(1),
    description: 'A direction from a named place. Pitch drew it with the map still rolled on his back, which tells you how well he knows the ground.',
  },
  {
    id: 'distance',
    name: 'Distance',
    kind: 'A distance',
    character: 'Dock',
    characterTitle: 'The Dream Courier',
    image: ENVELOPE(2),
    description: 'How far, and along what. Dock carries envelopes for a living and counts his steps without meaning to.',
  },
  {
    id: 'marker',
    name: 'Marker',
    kind: 'A marker',
    character: 'Bloom',
    characterTitle: 'The Euphoric Botanist',
    image: ENVELOPE(3),
    description: 'What you will see when you are close. A plant, a creek, a stone the light hits wrong. Bloom knows a place by what grows on it.',
  },
  {
    id: 'place',
    name: 'Place',
    kind: 'A place',
    character: 'Bao',
    characterTitle: 'The Dream Chef',
    image: ENVELOPE(4),
    description: 'The local name for where you are standing, and what to bring. Bao feeds the herd and has never once packed too little.',
  },
];

export const PAY_CARD_TIERS = [
  {
    id: 'solo',
    label: 'Solo',
    subtitle: 'A balance of $999',
    price: 999,
    stripePriceId: 'price_1SEc3AGWJVsbrWy8oqi3ix3g',
    description: 'Enough for a small build or a focused fix. One developer, daily updates.',
  },
  {
    id: 'team',
    label: 'Team',
    subtitle: 'A balance of $1,999',
    price: 1999,
    stripePriceId: 'price_1SEc4rGWJVsbrWy8RUpd8wZo',
    description: 'A designer and a developer working together, weekly sprint reviews.',
    featured: true,
  },
  {
    id: 'accelerated',
    label: 'Accelerated',
    subtitle: 'A balance of $2,999',
    price: 2999,
    stripePriceId: 'price_1SEc56GWJVsbrWy8peaOhfB4',
    description: 'A full team with a project manager on it. Built for a deadline.',
  },
  {
    id: 'unlimited',
    label: 'Unlimited',
    subtitle: 'A balance of $5,000',
    price: 5000,
    stripePriceId: 'price_1SEc5TGWJVsbrWy8zdk6DecO',
    description: 'The whole yard on call. Continuous sprints for a vision that keeps moving.',
  },
];

export const DIGITAL_PRODUCTS = {
  'two-dollar-clue': {
    id: 'two-dollar-clue',
    name: 'The $2 Clue',
    subtitle: 'Four kinds of float',
    category: 'Digital',
    room: 'sent',
    delivery: 'digital',
    floatWeight: 1,
    price: 2,
    stripePriceId: 'price_1SFcYuGWJVsbrWy8yx8X1odc',
    stripeProductId: 'prod_TC0aVdlDPDax9c',
    color: '#C8893B',
    description: 'Two dollars. One envelope. Four kinds of float, each sealed by a different burro. Bearing, distance, marker, place. One is a fragment. All four are a route.',
    story: 'The cheapest door into The Blind Lead, and the one that explains the rules. Each envelope carries one kind of float and is sealed by the burro who wrote it. Pitch gives you a bearing. Dock gives you a distance. Bloom gives you a marker. Bao gives you the name of the place. Any one of them is a fragment. Read all four together and you are holding a route. The envelope arrives by email the same day. Where it points is on public land, in daylight, beside a trail, and every float here is published free on the board thirty days after it ships. Two dollars buys the month, not the map.',
    materials: ['Delivered by email', 'Opens the same day', 'One of four floats', 'Collect all four for a route'],
    inStock: true,
    featured: false,
    hasVariants: true,
    variantType: 'design',
    designLabel: 'Choose your float',
    designs: CLUE_FLOATS,
  },

  'digital-gift-card': {
    id: 'digital-gift-card',
    name: 'The Pay Card',
    subtitle: 'A reloadable studio balance',
    category: 'Digital',
    room: 'sent',
    delivery: 'digital',
    floatWeight: 0,
    price: 999,
    featuredImage: '/images/shop/rewards-cards/pay-card.webp',
    color: '#A6B84A',
    description: 'A balance toward real work with a real team, redeemable against anything the studio builds. Give it, or keep it and reload it as the project grows.',
    story: 'Somebody you know has a project sitting in a notes app. This moves it to a calendar. The balance applies to any build, and whoever redeems it gets a named team and a schedule rather than a queue position. It is a card, not a coupon. Reload it whenever the scope grows, the balance carries, and nothing on it expires.',
    materials: ['Delivered by email', 'Reloadable', 'Never expires', 'Redeemable against any build'],
    inStock: true,
    featured: true,
    hasVariants: true,
    variantType: 'tier',
    tierLabel: 'Choose a balance',
    priceOptions: PAY_CARD_TIERS,
    reloadable: true,
    reload: {
      newLabel: 'New card',
      reloadLabel: 'Reload a card',
      codeLabel: 'Card code',
      codeHint: 'It is in the email the card arrived in. Reloads add to the balance on that card.',
      codePlaceholder: 'NB-CARD-XXXX-XXXX',
    },
  },
};
