import { Box, Container, VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduct } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductHero from './components/ProductHero';
import ProductStory from './components/ProductStory';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <VStack spacing={{ base: 16, md: 20 }}>
        <ProductHero 
          product={product}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
        <ProductStory product={product} />
        <RelatedProducts currentProductId={product.id} />
      </VStack>
    </Box>
  );
};

export default ProductDetail;
