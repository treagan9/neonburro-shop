// src/components/cart/SaddlebagDock.jsx
// SENTINEL: NB_SHOP_SADDLEBAG_DOCK_V1
//
// The saddlebag as a fixed column in the right hand gap, on displays wide
// enough to have one. Below DOCK_MIN this renders nothing and the pill takes
// over. See theme/layout.js for how DOCK_MIN is derived from the sheet.
//
// ── why put the cart in the gap ─────────────────────────────────────────────
// The sheet is left aligned and capped, which is the studio's rule and it is
// right. On a wide monitor that leaves a strip down the right that is empty by
// design. Empty is fine. Empty and useful is better. A cart that is always in
// view on the widest screens means the shopper never has to hunt for it, and
// the strip stops reading as a layout accident.
//
// ── when it is empty ────────────────────────────────────────────────────────
// It stays. An empty dock shows the state of the board (how much float is out,
// found and queued) and the two dollar door. That is the same content the
// board page opens with, kept short. It gives the column a reason to be there
// before anything is bought, and it is the one place on the site the hunt is
// visible while browsing.
//
// ── behaviour ───────────────────────────────────────────────────────────────
// Fixed under the nav, scrolls internally past the viewport height, hides on
// the checkout page where the saddlebag is the whole page. Quantity and remove
// work in place. Checkout goes to /checkout/. The nav bag still opens the
// drawer at these widths, which overlaps the dock briefly, that is fine.
//
// No oxford commas, no em dashes.

import { Box, HStack, VStack, Text, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { floatCounts, HUNT } from '../../data/blindLead';
import { colors } from '../../theme/colors';
import { RAIL_PX, TILE, DOCK_W, DOCK_MIN_PX, NAV_H, EASE } from '../../theme/layout';
import { SaddlebagLines, SaddlebagEmpty, SaddlebagSummary } from './SaddlebagLines';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const Board = () => {
  const c = floatCounts();
  const cell = (label, n) => (
    <VStack spacing={1} align="start" flex={1}>
      <Text fontFamily="mono" fontSize="20px" fontWeight="500" color={colors.text.primary} lineHeight="1">
        {String(n).padStart(2, '0')}
      </Text>
      <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em" textTransform="uppercase"
        color={colors.text.muted}>
        {label}
      </Text>
    </VStack>
  );
  return (
    <VStack align="stretch" spacing={4} pt={2} pb={4} borderBottom="1px solid" borderColor={colors.ui.border}>
      <Text fontFamily="mono" fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color={LIME}>
        {HUNT.name} · the board
      </Text>
      <HStack spacing={4}>
        {cell('out', c.out)}
        {cell('found', c.found)}
        {cell('queued', c.queued)}
      </HStack>
      <HStack as={RouterLink} to="/the-blind-lead/" spacing={2} role="group" w="fit-content"
        color={colors.text.muted} textDecoration="none"
        transition={`color 220ms ${EASE}`} _hover={{ color: LIME, textDecoration: 'none' }}>
        <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em" textTransform="uppercase">
          the board and the rules
        </Text>
        <Box as={FiArrowRight} boxSize={3} transition={`transform 220ms ${EASE}`}
          _groupHover={{ transform: 'translateX(3px)' }} />
      </HStack>
    </VStack>
  );
};

const SaddlebagDock = () => {
  const [docked] = useMediaQuery(`(min-width: ${DOCK_MIN_PX}px)`);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, isDigitalOnly,
  } = useCart();

  if (!docked || pathname.startsWith('/checkout')) return null;

  const count = getCartItemsCount();

  return (
    <MotionBox
      position="fixed"
      top={`calc(${NAV_H.md} + 20px)`}
      right={`${RAIL_PX.md}px`}
      w={DOCK_W}
      maxH={`calc(100vh - ${NAV_H.md} - 44px)`}
      zIndex={900}
      display="flex"
      flexDirection="column"
      borderRadius="18px"
      bg={TILE.bg}
      border="1px solid"
      borderColor={TILE.border}
      boxShadow={TILE.shadow}
      sx={{ backdropFilter: TILE.blur, WebkitBackdropFilter: TILE.blur }}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <HStack spacing={3} px={5} pt={4} pb={3} borderBottom="1px solid" borderColor={colors.ui.border}>
        <Box as={FiShoppingBag} boxSize="16px" color={count > 0 ? LIME : colors.text.muted} />
        <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.2em"
          textTransform="uppercase" color={colors.text.primary}>
          Saddlebag
        </Text>
        <Text fontFamily="mono" fontSize="10px" letterSpacing="0.1em"
          color={count > 0 ? LIME : colors.text.muted}>
          {String(count).padStart(2, '0')}
        </Text>
      </HStack>

      <Box px={5} overflowY="auto" flex={1} minH={0}
        sx={{ scrollbarWidth: 'thin', scrollbarColor: `${TILE.border} transparent` }}>
        {cart.length === 0 ? (
          <>
            <Board />
            <SaddlebagEmpty onGo={navigate} compact />
          </>
        ) : (
          <SaddlebagLines items={cart} onRemove={removeFromCart} onQty={updateQuantity} compact />
        )}
      </Box>

      {cart.length > 0 && (
        <Box px={5} pb={5} pt={1} borderTop="1px solid" borderColor={colors.ui.border}>
          <SaddlebagSummary
            total={getCartTotal()}
            digitalOnly={isDigitalOnly()}
            onCheckout={() => navigate('/checkout/')}
            compact
          />
        </Box>
      )}
    </MotionBox>
  );
};

export default SaddlebagDock;
