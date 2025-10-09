import { 
  FiGift, 
  FiAward, 
  FiMap, 
  FiEye, 
  FiTarget, 
  FiZap,
  FiCreditCard,
  FiShoppingBag,
  FiCoffee
} from 'react-icons/fi';

export const DIGITAL_PRODUCTS = {
  'two-dollar-clue': {
    id: 'two-dollar-clue',
    name: 'The $2 Mystery',
    subtitle: 'Could Be Anything',
    category: 'Digital',
    price: 2,
    stripePriceId: 'price_1SFcYuGWJVsbrWy8yx8X1odc',
    stripeProductId: 'prod_TC0aVdlDPDax9c',
    featuredImage: '/images/products/digital/two-dollar-mystery-envelope.png',
    color: '#FF6B35',
    icon: FiGift,
    description: 'Not everything valuable costs a fortune. Sometimes the smallest spark ignites the biggest journey.',
    story: 'Two dollars. A curious envelope. A clue that leads somewhere unexpected. Some say it reveals a hidden path through the valley. Others claim it unlocks something forgotten. A few swear it connects to coordinates only visible under neon light. What you find depends on what you seek. The envelope arrives digitally. The mystery arrives when you open it. Where it leads is up to you.',
    
    // Mystery mechanics
    possibilities: [
      { icon: FiAward, label: 'Raffle Entry', chance: 'Maybe', description: 'Automatic entry into weekly holder raffle' },
      { icon: FiZap, label: 'Instant Win', chance: 'Possibly', description: 'Could unlock immediate reward' },
      { icon: FiMap, label: 'Hidden Clue', chance: 'Perhaps', description: 'Coordinates to something in the lounge' },
      { icon: FiEye, label: 'Secret Message', chance: 'Who Knows', description: 'Encrypted message or easter egg' },
      { icon: FiTarget, label: 'Quest Unlock', chance: 'Could Be', description: 'Access to exclusive quest or challenge' },
      { icon: FiGift, label: 'Digital Treasure', chance: 'Maybe', description: 'NFT, discount code, or collectible' },
    ],
    
    // Social proof teasers that rotate
    teasers: [
      'Some found coordinates to hidden lounge areas...',
      'Others unlocked exclusive quest lines...',
      'A few discovered valuable easter eggs...',
      'One person won $500 in merch credit...',
      'Several got automatic raffle entries...',
      'What will you find?'
    ],
    
    materials: ['Digital Delivery', 'Instant Access', 'Mysterious Content', 'Unexpected Direction'],
    inStock: true,
    featured: true,
    mysteryType: true, // Special flag for mystery products
    
    // Purchase settings
    shopUrl: 'https://shop.neonburro.com/products/two-dollar-clue',
    deliveryMethod: 'instant',
    refundable: false
  },

  'digital-gift-card': {
    id: 'digital-gift-card',
    name: 'Neon Burro Digital Gift Card',
    subtitle: 'Give Creativity & Momentum',
    category: 'Digital',
    price: 999,
    featuredImage: '/images/products/the-burro-gift-card.png',
    color: '#39FF14',
    icon: FiCreditCard,
    description: 'More than a balance, an introduction to a team that listens, designs with care and brings ideas to life.',
    story: 'Sometimes the best gift is potential itself. Our gift cards open doors to creative possibilities and meaningful digital transformation.',
    inStock: true,
    featured: true,
    hasVariants: true,
    variantType: 'tier',
    shopUrl: 'https://shop.neonburro.com/products/gift-card',
    
    priceOptions: [
      { 
        id: 'solo',
        label: 'Solo',
        subtitle: 'Small projects',
        price: 999,
        stripePriceId: 'price_TEMP_GIFT_CARD_SOLO',
        description: 'Perfect for small projects and straightforward builds. One dedicated developer with consistent daily progress updates.'
      },
      { 
        id: 'team',
        label: 'Team',
        subtitle: 'Growing businesses',
        price: 1999,
        stripePriceId: 'price_TEMP_GIFT_CARD_TEAM',
        description: 'Faster delivery with a small team. Designer + developer working together with daily updates and weekly sprint reviews.',
        featured: true
      },
      { 
        id: 'accelerated',
        label: 'Accelerated',
        subtitle: 'Ambitious projects',
        price: 2999,
        stripePriceId: 'price_TEMP_GIFT_CARD_ACCELERATED',
        description: 'Maximum velocity with full team. Daily updates, weekly sprints, and dedicated project management for rapid delivery.'
      },
      { 
        id: 'unlimited',
        label: 'Unlimited',
        subtitle: 'Visionary clients',
        price: 5000,
        stripePriceId: 'price_TEMP_GIFT_CARD_UNLIMITED',
        description: 'Unlimited access to our entire team. Daily collaboration and continuous sprint cycles for your evolving vision.'
      }
    ]
  }
};

// Shop portal links (external sites)
export const SHOP_PORTALS = {
  merch: {
    id: 'merch',
    title: 'Merch Store',
    description: 'Exclusive Burro holder apparel & accessories',
    url: 'https://shop.neonburro.com',
    icon: FiShoppingBag,
    color: '#00E5E5',
    features: ['Limited Edition Tees', 'Hoodies & Hats', 'Sticker Packs', 'Collector Items']
  },
  food: {
    id: 'food',
    title: 'Order Food',
    description: 'Glowbachi delivery direct to your door',
    url: 'https://order.neonburro.com',
    icon: FiCoffee,
    color: '#FFE500',
    features: ['Street Tacos', 'Burro Bowls', 'Neon Nachos', 'Zen Smoothies']
  }
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return Object.values(DIGITAL_PRODUCTS).filter(product => product.featured);
};

// Helper function to get mystery products
export const getMysteryProducts = () => {
  return Object.values(DIGITAL_PRODUCTS).filter(product => product.mysteryType);
};

export default DIGITAL_PRODUCTS;
