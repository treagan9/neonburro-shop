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
    titanium_chopsticks: {
      id: 'titanium_chopsticks',
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
    neon_burro_sweater: {
      id: 'neon_burro_sweater',
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
    }
    // Add other products as needed
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
