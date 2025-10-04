import { Box, Container, VStack, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduct } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductHero from './components/ProductHero';
import ProductSpecs from './components/ProductSpecs';
import ProductGallery from './components/ProductGallery';
import AddToCart from './components/AddToCart';
import RelatedProducts from './components/RelatedProducts';
import ProductStory from './components/ProductStory';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      const foundProduct = getProduct(productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 300);
  }, [productId]);

  const handleAddToCart = (productData) => {
    addToCart(productData, productData.quantity || 1);
    toast({
      title: 'Added to Cart',
      description: `${productData.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleBuyNow = (productData) => {
    addToCart(productData, productData.quantity || 1);
    navigate('/checkout/');
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
        <VStack spacing={4}>
          <Box color="white" fontSize="lg">Product not found</Box>
          <Box
            as="button"
            color="#00E5E5"
            onClick={() => navigate('/')}
            _hover={{ textDecoration: 'underline' }}
          >
            Return to shop
          </Box>
        </VStack>
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
          <AddToCart 
            product={product} 
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
          <ProductStory product={product} />
          <RelatedProducts currentProductId={product.id} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductDetail;
