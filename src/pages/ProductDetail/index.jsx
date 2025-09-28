import { Box, Container, VStack, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductHero from './components/ProductHero';
import ProductSpecs from './components/ProductSpecs';
import ProductGallery from './components/ProductGallery';
import AddToCart from './components/AddToCart';
import RelatedProducts from './components/RelatedProducts';
import ProductStory from './components/ProductStory';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Product data - in a real app this would come from an API
  const products = {
    'titanium-chopsticks': {
      id: 'titanium-chopsticks',
      name: 'Titanium, Copper & Wood Chopsticks',
      subtitle: 'with Travel Sleeve',
      price: 89,
      description: 'Metal meets wood in everyday art. Built to travel, made to last.',
      longDescription: 'Precision-crafted chopsticks that blend titanium strength with copper warmth and wood tradition. Each pair is individually finished and comes with a custom leather travel sleeve.',
      images: [
        '/images/products/chopsticks-main.jpg',
        '/images/products/chopsticks-detail-1.jpg',
        '/images/products/chopsticks-detail-2.jpg',
        '/images/products/chopsticks-sleeve.jpg'
      ],
      color: '#00E5E5',
      category: 'Craft',
      materials: ['Grade 2 Titanium', 'Pure Copper Accents', 'Sustainably Sourced Wood', 'Full Grain Leather Sleeve'],
      dimensions: 'Length: 9.5" (24cm), Weight: 1.2oz (34g)',
      care: 'Hand wash with warm water. Dry immediately. Oil wood ends monthly.',
      story: 'Born from our founders travels through Japan, these chopsticks represent the intersection of ancient craft and modern materials. Each pair takes 3 hours to complete.',
      inStock: true,
      quantity: 1
    },
    'neon-burro-sweater': {
      id: 'neon-burro-sweater',
      name: 'The Neon Burro Sweater',
      subtitle: 'Unisex Open Knit 3D',
      price: 199,
      description: 'Pure Merino wool where mountain air meets digital craft.',
      longDescription: 'Hand-knitted in a 3D open pattern using 100% Merino wool. This unisex sweater embodies our philosophy of digital innovation meeting mountain tradition.',
      images: [
        '/images/products/sweater-main.jpg',
        '/images/products/sweater-detail-1.jpg',
        '/images/products/sweater-back.jpg',
        '/images/products/sweater-lifestyle.jpg'
      ],
      color: '#FFE500',
      category: 'Apparel',
      materials: ['100% Merino Wool', 'Hand-knitted Construction', '3D Open Knit Pattern'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      care: 'Hand wash in cold water. Lay flat to dry. Do not wring.',
      story: 'Designed in our Ridgway studio and knitted by artisans in the San Juan Mountains. The 3D pattern represents data flowing through mountain valleys.',
      inStock: true,
      quantity: 1,
      featured: true
    },
    'gift-card': {
      id: 'gift-card',
      name: 'The Gift Card',
      subtitle: 'Digital Services Access',
      price: 50,
      description: 'A portal to digital services and creative possibilities.',
      longDescription: 'Give the gift of digital transformation. This card opens doors to our full range of creative services.',
      images: [
        '/images/products/giftcard-main.jpg',
        '/images/products/giftcard-detail.jpg'
      ],
      color: '#39FF14',
      category: 'Digital',
      materials: ['Digital Delivery', 'No Expiration', 'Transferable'],
      care: 'Store securely. Digital code will be emailed upon purchase.',
      story: 'Sometimes the best gift is potential itself. Our gift cards open doors to creative possibilities.',
      inStock: true,
      quantity: 1
    },
    'neon-abstract-tees': {
      id: 'neon-abstract-tees',
      name: 'Neon Abstract T-Shirts',
      subtitle: 'Bold Lines Collection',
      price: 45,
      description: 'Glowing shapes and bold lines. Everyday wear with neon pulse.',
      longDescription: 'Abstract designs that capture the essence of our digital aesthetic. Each shirt features unique neon-inspired graphics.',
      images: [
        '/images/products/abstract-tee-main.jpg',
        '/images/products/abstract-tee-back.jpg'
      ],
      color: '#FF6B35',
      category: 'Apparel',
      materials: ['100% Organic Cotton', 'Water-based Inks', 'Pre-shrunk'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      care: 'Machine wash cold. Tumble dry low. Do not iron design.',
      story: 'Art meets apparel in these bold statement pieces that bring digital energy to everyday wear.',
      inStock: true,
      quantity: 1
    },
    'burro-thoughts-tees': {
      id: 'burro-thoughts-tees',
      name: 'Burro Thoughts T-Shirts',
      subtitle: 'Conversation Starters',
      price: 42,
      description: 'Soft fabric carrying phrases that spark curiosity and conversation.',
      longDescription: 'Thoughtful phrases and ideas printed on premium fabric. Each design is chosen to inspire discussion.',
      images: [
        '/images/products/thoughts-tee-main.jpg',
        '/images/products/thoughts-tee-detail.jpg'
      ],
      color: '#8B5CF6',
      category: 'Apparel',
      materials: ['100% Organic Cotton', 'Water-based Inks', 'Pre-shrunk'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      care: 'Machine wash cold. Tumble dry low. Do not iron design.',
      story: 'Words have power. These shirts carry ideas that matter, sparking conversations that count.',
      inStock: true,
      quantity: 1
    },
    'burro-coin-gold': {
      id: 'burro-coin-gold',
      name: 'Burro Coin · 24k Gold',
      subtitle: 'Limited Edition',
      price: 299,
      description: 'Pure gold pressed into symbol. Made to keep, collect, and pass on.',
      longDescription: 'A rare collectible pressed in pure 24k gold. Each coin is individually numbered and comes with a certificate of authenticity.',
      images: [
        '/images/products/coin-gold-main.jpg',
        '/images/products/coin-gold-detail.jpg',
        '/images/products/coin-gold-certificate.jpg'
      ],
      color: '#FFE500',
      category: 'Collectible',
      materials: ['24k Gold', 'Individual Numbering', 'Certificate of Authenticity'],
      dimensions: 'Diameter: 1.5" (38mm), Weight: 1oz (28g)',
      care: 'Store in provided case. Clean with soft cloth only.',
      story: 'Some things are made to last forever. This coin represents permanence in an ephemeral digital world.',
      inStock: true,
      quantity: 1,
      limited: true
    },
    'paper-boy-cap': {
      id: 'paper-boy-cap',
      name: 'Burro Paper Boy Winter Cap',
      subtitle: '100% Wool Classic',
      price: 65,
      description: 'Classic style rebuilt in pure wool. Warmth with subtle Burro mark.',
      longDescription: 'A timeless silhouette crafted from premium wool. Classic newsboy style with modern materials.',
      images: [
        '/images/products/paperboy-cap-main.jpg',
        '/images/products/paperboy-cap-side.jpg'
      ],
      color: '#00E5E5',
      category: 'Apparel',
      materials: ['100% Merino Wool', 'Cotton Lining', 'Adjustable Sizing'],
      sizes: ['S/M', 'L/XL'],
      care: 'Spot clean only. Professional cleaning recommended.',
      story: 'Sometimes the old ways are the best ways. This classic cap brings timeless style to modern life.',
      inStock: true,
      quantity: 1
    },
    'burro-socks-pack': {
      id: 'burro-socks-pack',
      name: 'Burro Socks · Two Pack',
      subtitle: 'Merino & Alpaca',
      price: 38,
      description: 'Premium fibers in durable comfort. Never boring, always soft.',
      longDescription: 'A two-pack of premium socks crafted from the finest natural fibers. One Merino wool, one Alpaca blend.',
      images: [
        '/images/products/socks-pack-main.jpg',
        '/images/products/socks-detail.jpg'
      ],
      color: '#39FF14',
      category: 'Apparel',
      materials: ['Merino Wool Blend', 'Alpaca Blend', 'Reinforced Heel & Toe'],
      sizes: ['S', 'M', 'L', 'XL'],
      care: 'Machine wash cold. Air dry recommended.',
      story: 'Great things come in pairs. These socks prove that even the smallest details matter.',
      inStock: true,
      quantity: 1
    },
    'burro-raffle': {
      id: 'burro-raffle',
      name: 'The $9 Burro Raffle',
      subtitle: 'Ticket to Possibility',
      price: 9,
      description: 'Enter for the chance to claim a rare piece, chosen by fate.',
      longDescription: 'A unique opportunity to win exclusive Neon Burro pieces. Each raffle entry gives you a chance at items not available for purchase.',
      images: [
        '/images/products/raffle-ticket-main.jpg'
      ],
      color: '#FF00FF',
      category: 'Experience',
      materials: ['Digital Entry', 'Monthly Drawing', 'Exclusive Prizes'],
      care: 'Check email for raffle results. Winners notified monthly.',
      story: 'Sometimes the best things in life are left to chance. Take a leap and see where fate leads.',
      inStock: true,
      quantity: 1,
      special: true
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundProduct = products[productId];
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 500);
  }, [productId]);

  const handleAddToCart = (productData) => {
    // Handle add to cart logic
    toast({
      title: 'Added to Cart',
      description: `${productData.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="#0A0A0A" display="flex" alignItems="center" justifyContent="center">
        <Box color="#00E5E5" fontSize="lg">Loading...</Box>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box minH="100vh" bg="#0A0A0A" display="flex" alignItems="center" justifyContent="center">
        <Box color="white" fontSize="lg">Product not found</Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#0A0A0A">
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 12, md: 16 }} py={{ base: 8, md: 12 }}>
          <ProductHero product={product} />
          <ProductGallery images={product.images} productName={product.name} />
          <ProductSpecs product={product} />
          <AddToCart product={product} onAddToCart={handleAddToCart} />
          <ProductStory product={product} />
          <RelatedProducts currentProduct={product} allProducts={products} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductDetail;
