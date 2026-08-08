// src/data/products-wearable.js
// SENTINEL: NB_SHOP_WEARABLE_V2
//
// Three shirts. That is the whole apparel line right now and it is deliberate.
// The 2025 catalogue carried five wearables against artwork that did not exist,
// which is how a shop starts lying to people. Everything here has a photograph.
//
// TWO RULES THAT ARE NOT MARKETING
//   1. Every garment is 100 percent cotton down to the thread. Organic dye,
//      organic ink, nothing else on it. That claim is checkable and it stays
//      checkable, so do not soften it into "premium cotton" later.
//   2. Natural dye does not repeat. Two shirts out of the same bath land a shade
//      apart. That is stated up front on every product rather than buried in a
//      returns policy, because a customer who is surprised by it feels cheated
//      and a customer who was told feels like they got the real thing.
//
// Colorways share one vocabulary across products on purpose. Sage is Sage on
// both shirts even though the two baths landed slightly different, which is the
// point being made rather than an inconsistency to fix.
//
// Stock is false everywhere. Live counts come from inventory.js, which reads
// Pulse. Never hand edit inStock to true to make a card look better.
//
// No oxford commas, no em dashes.

const COTTON = [
  '100% Organic Cotton, thread included',
  'Organic dyes, organic inks, nothing else',
  'Mid-weight, boxy cut',
  'Naturally dyed in small runs',
];

const DYE_NOTE = 'Dyed naturally in small runs, so your shade will sit a little off the photograph. Two shirts from the same bath are not the same shirt. That is the product, not a defect.';

const CARE = 'Machine wash cold, inside out. Tumble dry low or hang. Natural dye keeps moving for the first few washes and then settles.';

const SIZES = ['Mens S', 'Mens M', 'Mens L', 'Mens XL', 'Womens S', 'Womens M', 'Womens L'];

export const WEARABLE_PRODUCTS = {
  'theburroship': {
    id: 'theburroship',
    name: 'theburroship.',
    subtitle: '100% Organic Cotton',
    category: 'Apparel',
    room: 'worn',
    floatWeight: 2,
    price: 85,
    stripePriceId: 'price_TEMP_THEBURROSHIP',
    featuredImage: '/images/products/theburroship/theburroship-wheat.webp',
    color: '#C5D957',
    description: 'The airship, printed once, on eight naturally dyed bodies. Organic ink into organic cotton, nothing sitting on top of the weave.',
    story: 'The Burroship is the thing that carries the herd between places that do not have a road between them. It is drawn the way you would draw it from underneath, which is the only angle anybody ever sees it from. The print goes in with organic ink so it sinks into the weave rather than sitting on it like a sticker, which is why it will fade with the shirt instead of cracking off it. Eight colorways, all of them plants or fruit that actually grow on the Western Slope. Look at the part of the artwork you did not notice first.',
    materials: COTTON,
    dyeNote: DYE_NOTE,
    sizes: SIZES,
    care: CARE,
    inStock: false,
    featured: true,
    hasVariants: true,
    variantType: 'design',
    designs: [
      { id: 'milk',         name: 'Milk',         image: '/images/products/theburroship/theburroship-milk.webp',         description: 'Undyed and unbleached. The closest this line gets to a white shirt.' },
      { id: 'oat',          name: 'Oat',          image: '/images/products/theburroship/theburroship-oat.webp',          description: 'Warm grain. Reads cream indoors and sand in the sun.' },
      { id: 'wheat',        name: 'Wheat',        image: '/images/products/theburroship/theburroship-wheat.webp',        description: 'Late August in a field nobody cut. Deeper than it photographs.' },
      { id: 'sage',         name: 'Sage',         image: '/images/products/theburroship/theburroship-sage.webp',         description: 'Grey green off the high desert floor. Quietest one in the run.' },
      { id: 'greengage',    name: 'Greengage',    image: '/images/products/theburroship/theburroship-greengage.webp',    description: 'A green plum, and the only loud shirt we make.' },
      { id: 'persimmon',    name: 'Persimmon',    image: '/images/products/theburroship/theburroship-persimmon.webp',    description: 'Fruit orange going toward clay. Warms up as it wears.' },
      { id: 'serviceberry', name: 'Serviceberry', image: '/images/products/theburroship/theburroship-serviceberry.webp', description: 'The blue on the berry before you rub it off. Dusty, not bright.' },
      { id: 'pinyon',       name: 'Pinyon',       image: '/images/products/theburroship/theburroship-pinyon.webp',       description: 'Pine so dark it reads black until you stand near a window.' },
    ],
  },

  'neonburro-tee': {
    id: 'neonburro-tee',
    name: 'neonburro.',
    subtitle: '100% Organic Cotton',
    category: 'Apparel',
    room: 'worn',
    floatWeight: 1,
    price: 85,
    stripePriceId: 'price_TEMP_NEONBURRO_TEE',
    featuredImage: '/images/products/neonburro/neonburro-milk.webp',
    color: '#C8893B',
    description: 'The mark, printed tonal, so it reads as texture across a room and as a burro up close.',
    story: 'A logo shirt that does not shout is a harder thing to make than one that does. This one is printed a half step off the body colour, which means from six feet away it is a shirt and from two feet away it is ours. Organic ink, organic dye, cotton thread. Seven colorways, all named after something that grows here. If you want the loud version, that is the Greengage.',
    materials: COTTON,
    dyeNote: DYE_NOTE,
    sizes: SIZES,
    care: CARE,
    inStock: false,
    featured: true,
    hasVariants: true,
    variantType: 'design',
    designs: [
      { id: 'salt',         name: 'Salt',         image: '/images/products/neonburro/neonburro-salt.webp',         description: 'The brightest we can get without bleach. Flat and clean.' },
      { id: 'milk',         name: 'Milk',         image: '/images/products/neonburro/neonburro-milk.webp',         description: 'Undyed cotton with the warmth left in it.' },
      { id: 'sage',         name: 'Sage',         image: '/images/products/neonburro/neonburro-sage.webp',         description: 'Grey green off the high desert floor. The one you will wear most.' },
      { id: 'greengage',    name: 'Greengage',    image: '/images/products/neonburro/neonburro-greengage.webp',    description: 'A green plum, and the only loud shirt we make.' },
      { id: 'serviceberry', name: 'Serviceberry', image: '/images/products/neonburro/neonburro-serviceberry.webp', description: 'Deeper than the airship blue. Closer to the berry than the bloom.' },
      { id: 'persimmon',    name: 'Persimmon',    image: '/images/products/neonburro/neonburro-persimmon.webp',    description: 'Rust with fruit still in it. Reads red in low light.' },
      { id: 'pinyon',       name: 'Pinyon',       image: '/images/products/neonburro/neonburro-pinyon.webp',       description: 'Pine so dark it reads black until you stand near a window.' },
    ],
  },

  'blanks': {
    id: 'blanks',
    name: 'blanks.',
    subtitle: '100% Organic Cotton',
    category: 'Apparel',
    room: 'worn',
    floatWeight: 1,
    price: 65,
    stripePriceId: 'price_TEMP_BLANKS',
    featuredImage: null,
    color: '#CEC0A7',
    description: 'The same shirt with nothing printed on it. Same cotton, same dye, twenty dollars less for the ink we did not use.',
    story: 'Every graphic shirt starts as this shirt. We sell it because charging you for a print you did not want is a strange way to run a store, and because the body is the part we are actually proud of. Cotton thread, organic dye, no ink at all. The clue on this one is not printed, so it is in the packaging.',
    materials: COTTON,
    dyeNote: DYE_NOTE,
    sizes: SIZES,
    care: CARE,
    inStock: false,
    comingSoon: true,
    featured: false,
  },
};

export default WEARABLE_PRODUCTS;
