// src/components/cart/CartDrawer.jsx
// SENTINEL: NB_SHOP_CART_DRAWER_V2
//
// The saddlebag, opened. Slides in from the right on any width. Opened by the
// bag in the nav, by the floating pill and by "Open the saddlebag" in the dock.
//
// V1 was Chakra's default drawer with a cart emoji in it, red remove buttons
// and colours from the 2025 palette. This one is the house tile surface, the
// mono kickers and the lime accent, and its contents come from
// SaddlebagLines.jsx so the drawer, the dock and the /cart/ page cannot drift
// from one another.
//
// The drawer does not auto open on add. The pill and the nav counter do the
// announcing, and a panel that shoves itself over the product page every time
// somebody taps plus is a panel people learn to close without reading. Buy Now
// on the product page skips all of this and goes to checkout.
//
// No oxford commas, no em dashes.

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import { TILE } from '../../theme/layout';
import { SaddlebagLines, SaddlebagEmpty, SaddlebagSummary } from './SaddlebagLines';

const LIME = colors.accent.signal;

const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    isOpen, closeCart, cart, removeFromCart, updateQuantity,
    getCartTotal, getCartItemsCount, isDigitalOnly,
  } = useCart();

  const count = getCartItemsCount();

  const go = (path) => {
    closeCart();
    navigate(path);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={closeCart} size="sm">
      <DrawerOverlay bg="rgba(7, 7, 8, 0.6)" backdropFilter="blur(4px)" />
      <DrawerContent
        bg={colors.dark.black}
        borderLeft="1px solid"
        borderColor={TILE.border}
        boxShadow={TILE.shadow}
        maxW={{ base: '100%', sm: '420px' }}
      >
        <DrawerCloseButton color={colors.text.muted} top="18px" right="18px"
          _hover={{ color: colors.text.primary, bg: 'rgba(255,255,255,0.06)' }} />

        <DrawerHeader pt={5} pb={4} px={6} borderBottom="1px solid" borderColor={colors.ui.border}>
          <HStack spacing={3} align="center">
            <Box as={FiShoppingBag} boxSize="18px" color={count > 0 ? LIME : colors.text.muted} />
            <Text fontFamily="mono" fontSize="11px" fontWeight="500" letterSpacing="0.2em"
              textTransform="uppercase" color={colors.text.primary}>
              Saddlebag
            </Text>
            <Text fontFamily="mono" fontSize="11px" letterSpacing="0.1em"
              color={count > 0 ? LIME : colors.text.muted}>
              {String(count).padStart(2, '0')}
            </Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody px={6} py={2}>
          {cart.length === 0 ? (
            <SaddlebagEmpty onGo={go} />
          ) : (
            <SaddlebagLines items={cart} onRemove={removeFromCart} onQty={updateQuantity} />
          )}
        </DrawerBody>

        {cart.length > 0 && (
          <DrawerFooter px={6} pb={6} pt={2} borderTop="1px solid" borderColor={colors.ui.border}
            display="block">
            <SaddlebagSummary
              total={getCartTotal()}
              digitalOnly={isDigitalOnly()}
              onCheckout={() => go('/checkout/')}
              onView={() => go('/cart/')}
            />
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
