// src/components/cart/SaddlebagPill.jsx
// SENTINEL: NB_SHOP_SADDLEBAG_PILL_V1
//
// The floating saddlebag. Bottom right, on every page, only while there is
// something in it. It springs in on the first add, bumps on every add after
// that, flashes the name of what just went in, and opens the drawer on tap.
//
// ── why this exists ─────────────────────────────────────────────────────────
// Adding to the cart used to change one two digit counter in the top right
// corner and nothing else. Nobody saw it, so "the cart does not work". The rule
// now is that adding something has to move something the eye is already near.
// The product page's Add button is at the bottom of the fold on most screens,
// and the bottom right corner is the nearest place a fixed element can live
// without covering the button itself.
//
// ── what it does not do ─────────────────────────────────────────────────────
// It does not open the drawer for you. It does not pulse forever. It does not
// show when the saddlebag is empty, because an empty cart button is furniture,
// and it does not show on the checkout page, where the saddlebag is already the
// whole page. Above DOCK_MIN it yields to the dock, which is the same object
// living in the wide screen gap. See theme/layout.js.
//
// ── motion ──────────────────────────────────────────────────────────────────
// Appear is a spring from below. The bump on add is a scale spring keyed on
// lastAdded.at, so a second add of the same thing still bumps. The flash chip
// slides up out of the pill and fades on its own after two seconds. All three
// are short. Motion here is confirmation, not decoration.
//
// No oxford commas, no em dashes.

import { Box, HStack, Text, useMediaQuery } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import { RAIL_PX, TILE, EASE, DOCK_MIN_PX } from '../../theme/layout';
import { money } from './SaddlebagLines';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const FLASH_MS = 2200;

const SaddlebagPill = () => {
  const { pathname } = useLocation();
  const { getCartItemsCount, getCartTotal, openCart, isOpen, lastAdded } = useCart();
  const [docked] = useMediaQuery(`(min-width: ${DOCK_MIN_PX}px)`);
  const [flash, setFlash] = useState(null);

  const count = getCartItemsCount();
  const onCheckout = pathname.startsWith('/checkout');
  const show = count > 0 && !isOpen && !docked && !onCheckout;

  useEffect(() => {
    if (!lastAdded) return undefined;
    setFlash(lastAdded);
    const t = setTimeout(() => setFlash(null), FLASH_MS);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const flashLabel = flash
    ? [flash.item.name, flash.item.selectedDesign, flash.item.selectedTier].filter(Boolean).join(' · ')
    : '';

  return (
    <AnimatePresence>
      {show && (
        <MotionBox
          key="saddlebag-pill"
          position="fixed"
          right={{ base: `${RAIL_PX.base}px`, md: `${RAIL_PX.md}px` }}
          bottom={{ base: '18px', md: '26px' }}
          zIndex={1000}
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
        >
          <AnimatePresence>
            {flash && (
              <MotionBox
                key={`flash-${flash.at}`}
                position="absolute"
                right={0}
                bottom="calc(100% + 10px)"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                px={3}
                py={2}
                borderRadius="10px"
                bg={colors.dark.gray}
                border="1px solid"
                borderColor={colors.ui.border}
                whiteSpace="nowrap"
                pointerEvents="none"
              >
                <Text fontFamily="mono" fontSize="10px" letterSpacing="0.14em"
                  textTransform="uppercase" color={colors.text.secondary}>
                  <Box as="span" color={LIME}>Added</Box>
                  {' · '}{flashLabel}
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>

          <MotionBox
            key={lastAdded?.at || 'still'}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 18 }}
          >
            <HStack
              as="button"
              type="button"
              onClick={openCart}
              aria-label={`Open the saddlebag, ${count} ${count === 1 ? 'item' : 'items'}`}
              spacing={3}
              pl={4}
              pr={5}
              h={{ base: '48px', md: '52px' }}
              borderRadius="full"
              bg={TILE.bg}
              border="1px solid"
              borderColor={TILE.border}
              boxShadow={TILE.shadow}
              sx={{ backdropFilter: TILE.blur, WebkitBackdropFilter: TILE.blur }}
              transition={`border-color 260ms ${EASE}, transform 260ms ${EASE}`}
              _hover={{ borderColor: LIME, transform: 'translateY(-1px)' }}
              _active={{ transform: 'translateY(0)' }}
              _focusVisible={{ borderColor: LIME, outline: 'none' }}
            >
              <Box position="relative">
                <Box as={FiShoppingBag} boxSize="18px" color={colors.text.primary} />
                <Box position="absolute" top="-7px" right="-9px" minW="17px" h="17px" px="4px"
                  borderRadius="full" bg={LIME} color={colors.dark.black}
                  fontFamily="mono" fontSize="10px" fontWeight="700" lineHeight="17px"
                  textAlign="center">
                  {count}
                </Box>
              </Box>
              <Text fontFamily="mono" fontSize="11px" fontWeight="500" letterSpacing="0.16em"
                textTransform="uppercase" color={colors.text.primary} display={{ base: 'none', sm: 'block' }}>
                Saddlebag
              </Text>
              <Box w="1px" h="14px" bg={TILE.border} display={{ base: 'none', sm: 'block' }} />
              <Text fontFamily="mono" fontSize="12px" fontWeight="600" color={LIME}>
                {money(getCartTotal())}
              </Text>
            </HStack>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default SaddlebagPill;
