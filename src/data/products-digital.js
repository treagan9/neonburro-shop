export const DIGITAL_PRODUCTS = {
  'two-dollar-clue': {
    id: 'two-dollar-clue',
    name: 'The $2 Clue',
    subtitle: 'A Mystery Worth Finding',
    category: 'Digital',
    price: 2,
    stripePriceId: 'price_1SFcYuGWJVsbrWy8yx8X1odc',
    stripeProductId: 'prod_TC0aVdlDPDax9c',
    featuredImage: '/images/products/digital/two-dollar-mystery-envelope.png',
    color: '#C8893B',
    description: 'Two dollars. One envelope. The cheapest way into The Blind Lead and the one that explains the rules.',
    story: 'Two dollars. A curious envelope. A clue that leads somewhere unexpected. Some say it reveals a hidden path through the valley. Others claim it unlocks something forgotten. A few swear it connects to coordinates only visible under neon light. What you find depends on what you seek. The envelope arrives digitally. The mystery arrives when you open it. Where it leads is up to you.',
    materials: ['Digital Delivery', 'Instant Access', 'Mysterious Content', 'Unexpected Direction'],
    inStock: true,
    featured: false
  },

  'digital-gift-card': {
    id: 'digital-gift-card',
    name: 'Neon Burro Digital Gift Card',
    subtitle: 'Give Creativity & Momentum',
    category: 'Digital',
    price: 999,
    featuredImage: '/images/products/the-burro-gift-card.png',
    color: '#A6B84A',
    description: 'A balance toward real work with a real team, redeemable against anything the studio builds.',
    story: 'Somebody you know has a project sitting in a notes app. This moves it to a calendar. The balance applies to any build, and whoever redeems it gets a named team and a schedule rather than a queue position.',
    inStock: true,
    featured: true,
    hasVariants: true,
    variantType: 'tier',
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
