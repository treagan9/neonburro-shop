// src/pages/ProductDetail/index.jsx
// path: /product/:productId/
// SENTINEL: NB_SHOP_PRODUCT_PAGE_V2
//
// The product page. Object and buy box (ProductHero), the story and facts
// (ProductStory), the quiet line that this piece carries float (FloatBand),
// then three related pieces.
//
// The float band goes after the story on purpose. You should want the thing
// before you find out it is also a map.
//
// V2 puts the float band on the same rail as everything else. It used to sit
// in a 1180px centred wrapper, the one centred element on the page, and read
// as a banner rather than a line. The fake 300ms load is gone as well, the
// product data is a static import and there is nothing to wait for.
//
// No oxford commas, no em dashes.

import { Box, Container, VStack, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import { RAIL, SHEET } from '../../theme/layout';
import ProductHero from './components/ProductHero';
import ProductStory from './components/ProductStory';
import RelatedProducts from './components/RelatedProducts';
import FloatBand from '../../components/blindlead/FloatBand';

const LIME = colors.accent.signal;

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProduct(productId);

  const handleAddToCart = (line) => {
    addToCart(line, line.quantity || 1);
  };

  const handleBuyNow = (line) => {
    addToCart(line, line.quantity || 1);
    navigate('/checkout/');
  };

  if (!product) {
    return (
      <Box minH="100vh" bg={colors.dark.black} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text color={colors.text.primary} fontSize="lg">Product not found</Text>
          <Box as="button" color={LIME} onClick={() => navigate('/')} _hover={{ textDecoration: 'underline' }}>
            Return to shop
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={colors.dark.black}>
      <VStack spacing={{ base: 10, md: 14 }} align="stretch">
        <ProductHero product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
        <ProductStory product={product} />
        <Container maxW={SHEET} px={RAIL} mx={0}>
          <FloatBand productId={product.id} />
        </Container>
        <RelatedProducts currentProductId={product.id} />
      </VStack>
    </Box>
  );
};

export default ProductDetail;
