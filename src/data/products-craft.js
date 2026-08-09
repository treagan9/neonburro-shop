// src/data/products-craft.js
// SENTINEL: NB_SHOP_CRAFT_V2
//
// Two objects. Both are things you carry rather than things you display, which
// is why they are named the way they are and not "Burro Titanium Tumbler".
//
// The halfway nook replaces the two separate cup records from V1. It was never
// two products, it was one object in two metals, and splitting it meant the copy
// had to explain the same shape twice and got it slightly different both times.
//
// EDITING RULE FOR THE HALFWAY NOOK
// The lid is a cup. That is the entire idea and it is the first thing the copy
// says. Do not rewrite this into thermos language, it is not insulated and
// claiming otherwise gets us a returns problem we deserve.
//
// No oxford commas, no em dashes.

export const CRAFT_PRODUCTS = {
  'nibble-wands': {
    id: 'nibble-wands',
    name: 'nibble wands.',
    subtitle: 'Titanium Copper Wood',
    category: 'Craft',
    room: 'carried',
    floatWeight: 2,
    price: 99,
    stripePriceId: 'price_TEMP_NIBBLE_WANDS',
    featuredImage: '/images/shop/nibble-wands/nibble-wands-case.webp',
    color: '#C5D957',
    description: 'Titanium, copper and wood in one pair. Heavy enough to feel deliberate, light enough to forget you are holding them.',
    story: 'Most chopsticks are an afterthought handed to you in a paper sleeve. These are an object. Grade 2 titanium for the working end, copper at the join for weight and warmth, hardwood where your fingers actually sit. They come in a case because they are meant to travel with you and get used somewhere other than a kitchen. Oil the wood once a month and they will outlive the table. The clue is on the case, not on the wands.',
    materials: ['Grade 2 Titanium', 'Pure Copper Collar', 'Sustainably Sourced Hardwood', 'Hard Travel Case'],
    dimensions: 'Length 9.5in (24cm), Weight 1.2oz (34g)',
    care: 'Hand wash warm. Dry immediately. Oil the wood monthly.',
    inStock: false,
    featured: true,
  },

  'halfway-nook': {
    id: 'halfway-nook',
    name: 'halfway nook.',
    subtitle: 'A cup whose lid is a cup',
    category: 'Craft',
    room: 'carried',
    floatWeight: 3,
    price: 75,
    stripePriceId: 'price_TEMP_HALFWAY_NOOK',
    featuredImage: '/images/shop/halfway-nook/halfway-nook-titanium.webp',
    color: '#C0C0C0',
    description: 'One vessel, split across the middle. The lid comes off and it is a second cup, which is the only feature it has and the only one it needs.',
    story: 'A thermos keeps things hot and gives you nothing to share it in. A cup gives you nothing to carry. This is the thing that sits halfway between the two, which is where the name came from and also where you will use it. Pull the top off at the halfway point and there are two vessels on the tailgate instead of one. Titanium if you want it to weigh nothing and outlive you. Copper if you want it to keep a record of everywhere it has been. Neither one is insulated and we are not going to pretend otherwise.',
    materials: ['Grade 2 Titanium or Pure Copper', 'Two vessels in one body', 'No liner, no coating, no plastic', 'Etched mark low on the wall'],
    dimensions: 'Combined 500ml, split roughly 300ml and 200ml. Titanium 3oz, copper 5oz.',
    care: 'Hand wash. Titanium will not stain. Copper will patina and that is the intent, polish it back if you would rather it did not.',
    inStock: false,
    featured: true,
    hasVariants: true,
    variantType: 'design',
    designs: [
      {
        id: 'titanium',
        name: 'Titanium',
        image: '/images/shop/halfway-nook/halfway-nook-titanium.webp',
        description: 'Three ounces, no flavour, no rust. You will lose it before you break it.',
      },
      {
        id: 'copper',
        name: 'Copper',
        image: '/images/shop/halfway-nook/halfway-nook-copper.webp',
        description: 'Warms in the hand and takes a patina. It will not look like this in a year.',
      },
    ],
  },
};

export default CRAFT_PRODUCTS;
