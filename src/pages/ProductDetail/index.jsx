import { Box, Container, VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduct } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductHero from './components/ProductHero';
import ProductStory from './components/ProductStory';
import RelatedProducts from './components/RelatedProducts';
import FloatBand from '../../components/blindlead/FloatBand';

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
      <Box minH="100vh" bg="#0B0B0C" display="flex" alignItems="center" justifyContent="center">
        <Box color="#C5D957" fontSize="lg">Loading...</Box>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box minH="100vh" bg="#0B0B0C" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Box color="white" fontSize="lg">Product not found</Box>
          <Box
            as="button"
            color="#C5D957"
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
    <Box minH="100vh" bg="#0B0B0C">
      <VStack spacing={{ base: 16, md: 20 }}>
        <ProductHero 
          product={product}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
        <ProductStory product={product} />

        {/* Object, then story, then the quiet line that says this one carries a
            clue. It goes after the story on purpose. You should want the thing
            before you find out it is also a map. */}
        <Box w="100%" maxW="1180px" px={{ base: 5, md: 10 }} mx="auto">
          <FloatBand productId={product.id} />
        </Box>

        <RelatedProducts currentProductId={product.id} />
      </VStack>
    </Box>
  );
};

export default ProductDetail;
