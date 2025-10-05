export const DIGITAL_PRODUCTS = {
  'digital-gift-card': {
    id: 'digital-gift-card',
    name: 'Neon Burro Digital Gift Card',
    subtitle: 'Give Creativity & Momentum',
    category: 'Digital',
    price: 999,
    featuredImage: '/images/products/the-burro-gift-card.png',
    color: '#39FF14',
    description: 'More than a balance, an introduction to a team that listens, designs with care and brings ideas to life.',
    story: 'Sometimes the best gift is potential itself. Our gift cards open doors to creative possibilities and meaningful digital transformation.',
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
