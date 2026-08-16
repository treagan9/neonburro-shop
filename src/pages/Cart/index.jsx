// src/pages/Cart/index.jsx
// path: /cart/
// SENTINEL: NB_SHOP_CART_PAGE_V2
//
// The saddlebag as a page. Same lines, same summary, same words as the drawer
// and the dock, drawn by components/cart/SaddlebagLines.jsx so the three
// cannot disagree. This page exists for people who want a full width look at
// what they are about to buy and for the "Open the saddlebag" link in the
// drawer footer.
//
// V1 had a cart emoji, "Time to add some mountain magic", a white button, a
// red hover on the clear link and its own line markup with a category badge.
// None of that was the house. On a phone the lines are edge to edge with the
// rail, no boxes. On desktop the summary sits to the right and stays put.
//
// No oxford commas, no em dashes.

import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, GridItem } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import { RAIL, SHEET } from '../../theme/layout';
import { SaddlebagLines, SaddlebagEmpty, SaddlebagSummary } from '../../components/cart/SaddlebagLines';

const LIME = colors.accent.signal;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart, isDigitalOnly } = useCart();
  const count = getCartItemsCount();

  return (
    <Box minH="100vh" bg={colors.dark.black} pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 24 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate('/')}
          color={colors.text.muted} fontWeight="500" fontSize="sm" px={2} mb={{ base: 6, md: 8 }}
          _hover={{ color: colors.text.primary, bg: 'rgba(255,255,255,0.04)' }}>
          Back to the shop
        </Button>

        <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={2} mb={{ base: 6, md: 10 }}>
          <HStack spacing={4} align="baseline">
            <Heading as="h1" fontSize={{ base: '32px', md: '44px' }} fontWeight="600" letterSpacing="-0.035em"
              lineHeight="1" color={colors.text.primary}>
              Saddlebag
            </Heading>
            <Text fontFamily="mono" fontSize="12px" letterSpacing="0.14em" color={count > 0 ? LIME : colors.text.muted}>
              {String(count).padStart(2, '0')}
            </Text>
          </HStack>
          {cart.length > 0 && (
            <Button variant="link" onClick={clearCart} color={colors.text.muted} fontWeight="500" fontSize="sm"
              _hover={{ color: colors.text.primary, textDecoration: 'none' }}>
              Empty it
            </Button>
          )}
        </HStack>

        {cart.length === 0 ? (
          <Box maxW="560px" borderTop="1px solid" borderColor={colors.ui.border}>
            <SaddlebagEmpty onGo={navigate} />
          </Box>
        ) : (
          <Grid templateColumns={{ base: '1fr', lg: '1.4fr 0.6fr' }} gap={{ base: 10, lg: 16 }} alignItems="start">
            <GridItem borderTop="1px solid" borderColor={colors.ui.border}>
              <SaddlebagLines items={cart} onRemove={removeFromCart} onQty={updateQuantity} />
            </GridItem>
            <GridItem position={{ lg: 'sticky' }} top={{ lg: '110px' }}
              borderTop="1px solid" borderColor={colors.ui.border}>
              <VStack align="stretch" spacing={0} pt={2}>
                <SaddlebagSummary total={getCartTotal()} digitalOnly={isDigitalOnly()}
                  onCheckout={() => navigate('/checkout/')} />
              </VStack>
            </GridItem>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
