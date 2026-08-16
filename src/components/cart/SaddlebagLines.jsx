// src/components/cart/SaddlebagLines.jsx
// SENTINEL: NB_SHOP_SADDLEBAG_LINES_V1
//
// The contents of the saddlebag, drawn once and used in three places: the
// drawer that slides in from the right, the dock that lives in the right hand
// gap on wide displays, and the /cart/ page. One component so a line looks the
// same wherever the shopper meets it and a quantity change behaves the same.
//
// ── vocabulary ──────────────────────────────────────────────────────────────
// A burro carries a saddlebag, so the cart is the saddlebag. The word appears
// in the header of every surface, never "cart" and never "bag", so the shopper
// learns it once. The context and the code still say cart, the customer never
// sees that.
//
// ── what a line shows ───────────────────────────────────────────────────────
// Thumbnail in a small well tinted with the product colour, the name, one grey
// mono line for the variant (size, colourway, tier, reload code), a stepper and
// the line total. No product description here, the shopper already read it.
// Digital lines say "by email" in the variant slot when they have nothing else
// to say, so a $2 clue does not look like it is missing information.
//
// The stepper's minus at quantity one removes the line. That is what people
// expect and it saves a separate remove control on narrow surfaces. The x is
// still there for people who want it.
//
// ── the summary ─────────────────────────────────────────────────────────────
// SaddlebagSummary is total plus the rails line plus the buttons. The rails
// line lists what the checkout will accept (Card, Apple Pay, Google Pay,
// USDC) because a shopper who sees "USDC" before checkout is a shopper who
// does not abandon at the payment step wondering whether it is possible.
//
// No oxford commas, no em dashes.

import { Box, HStack, VStack, Text, IconButton, Button, Image } from '@chakra-ui/react';
import { FiMinus, FiPlus, FiX, FiArrowRight } from 'react-icons/fi';
import { colors } from '../../theme/colors';
import { EASE } from '../../theme/layout';
import { isDigitalItem } from '../../context/CartContext';

const LIME = colors.accent.signal;

export const money = (n) => {
  const v = Number(n || 0);
  return Number.isInteger(v) ? `$${v.toLocaleString('en-US')}` : `$${v.toFixed(2)}`;
};

const variantLine = (item) => {
  const bits = [];
  if (item.selectedSize) bits.push(item.selectedSize);
  if (item.selectedDesign) bits.push(item.selectedDesign);
  if (item.selectedTier) bits.push(item.selectedTier);
  if (item.reloadCode) bits.push(`reload ${item.reloadCode}`);
  if (!bits.length && isDigitalItem(item)) bits.push('by email');
  return bits.join(' · ');
};

export const SaddlebagLine = ({ item, onRemove, onQty, compact = false }) => {
  const thumb = item.selectedDesignImage || item.featuredImage;
  const tint = item.color || LIME;
  const well = compact ? '48px' : '60px';

  return (
    <HStack align="stretch" spacing={compact ? 3 : 4} py={compact ? 3 : 4}
      borderBottom="1px solid" borderColor={colors.ui.border}>
      <Box flexShrink={0} w={well} h={well} borderRadius="12px" overflow="hidden"
        border="1px solid" borderColor={colors.ui.border}
        display="flex" alignItems="center" justifyContent="center"
        background={`radial-gradient(circle at 50% 45%, ${tint}18 0%, ${colors.dark.gray} 72%)`}>
        {thumb ? (
          <Image src={thumb} alt="" maxW="82%" maxH="82%" objectFit="contain" draggable={false} />
        ) : (
          <Box w="40%" h="40%" borderRadius="sm" border="1px solid" borderColor={colors.ui.border} />
        )}
      </Box>

      <VStack align="stretch" spacing={1} flex={1} minW={0} justify="center">
        <HStack justify="space-between" align="start" spacing={2}>
          <Text color={colors.text.primary} fontWeight="600" fontSize={compact ? 'sm' : 'md'}
            letterSpacing="-0.01em" noOfLines={1}>
            {item.name}
          </Text>
          {onRemove && (
            <IconButton aria-label={`Remove ${item.name}`} icon={<FiX />} size="xs" variant="ghost"
              color={colors.text.muted} minW="22px" h="22px"
              _hover={{ color: colors.text.primary, bg: 'rgba(255,255,255,0.06)' }}
              onClick={() => onRemove(item.cartItemId)} />
          )}
        </HStack>

        {variantLine(item) && (
          <Text fontFamily="mono" fontSize="10px" letterSpacing="0.14em" textTransform="uppercase"
            color={colors.text.muted} noOfLines={1}>
            {variantLine(item)}
          </Text>
        )}

        <HStack justify="space-between" pt={1}>
          {onQty ? (
            <HStack spacing={0} border="1px solid" borderColor={colors.ui.border} borderRadius="full"
              overflow="hidden" h="28px">
              <IconButton aria-label="Fewer" icon={<FiMinus />} size="xs" variant="ghost"
                color={colors.text.secondary} borderRadius="0" h="28px" minW="28px"
                _hover={{ bg: 'rgba(255,255,255,0.06)', color: colors.text.primary }}
                onClick={() => onQty(item.cartItemId, item.quantity - 1)} />
              <Text fontFamily="mono" fontSize="12px" color={colors.text.primary} minW="26px"
                textAlign="center" lineHeight="1">
                {String(item.quantity).padStart(2, '0')}
              </Text>
              <IconButton aria-label="More" icon={<FiPlus />} size="xs" variant="ghost"
                color={colors.text.secondary} borderRadius="0" h="28px" minW="28px"
                _hover={{ bg: 'rgba(255,255,255,0.06)', color: colors.text.primary }}
                onClick={() => onQty(item.cartItemId, item.quantity + 1)} />
            </HStack>
          ) : (
            <Text fontFamily="mono" fontSize="12px" color={colors.text.muted}>
              x{String(item.quantity).padStart(2, '0')}
            </Text>
          )}
          <Text fontFamily="mono" fontSize={compact ? 'sm' : 'md'} fontWeight="500"
            color={colors.text.primary}>
            {money(item.price * item.quantity)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export const SaddlebagLines = ({ items, onRemove, onQty, compact = false }) => (
  <VStack align="stretch" spacing={0}>
    {items.map((item) => (
      <SaddlebagLine key={item.cartItemId} item={item} onRemove={onRemove} onQty={onQty} compact={compact} />
    ))}
  </VStack>
);

// Shown when the saddlebag has nothing in it. One line of the house voice and
// the cheapest door, because an empty cart is the best moment to say what a
// two dollar clue is.
export const SaddlebagEmpty = ({ onGo, compact = false }) => (
  <VStack align="start" spacing={compact ? 3 : 4} py={compact ? 4 : 8}>
    <Text fontFamily="mono" fontSize="10px" letterSpacing="0.16em" textTransform="uppercase"
      color={colors.text.muted}>
      Nothing in the saddlebag yet
    </Text>
    <Text fontSize={compact ? 'sm' : 'md'} color={colors.text.secondary} lineHeight="1.7">
      Every piece here carries a fragment of the hunt. The cheapest way in is two dollars.
    </Text>
    <Button variant="link" color={LIME} fontWeight="600" fontSize="sm" rightIcon={<FiArrowRight />}
      onClick={() => onGo && onGo('/product/two-dollar-clue/')}
      _hover={{ textDecoration: 'none', opacity: 0.85 }}>
      Start with two dollars
    </Button>
  </VStack>
);

export const SaddlebagSummary = ({ total, digitalOnly, onCheckout, onView, compact = false }) => (
  <VStack align="stretch" spacing={compact ? 3 : 4} pt={compact ? 3 : 4}>
    <HStack justify="space-between" align="baseline">
      <Text fontFamily="mono" fontSize="10px" letterSpacing="0.16em" textTransform="uppercase"
        color={colors.text.muted}>
        Total
      </Text>
      <Text fontFamily="mono" fontSize={compact ? 'lg' : 'xl'} fontWeight="600" color={LIME}>
        {money(total)}
      </Text>
    </HStack>

    <Text fontFamily="mono" fontSize="9px" letterSpacing="0.14em" textTransform="uppercase"
      color={colors.text.muted} lineHeight="1.8">
      {digitalOnly ? 'Delivered by email · ' : 'Free US shipping · '}
      Card · Apple Pay · Google Pay · USDC
    </Text>

    <Button onClick={onCheckout} bg={LIME} color={colors.dark.black} fontWeight="700"
      borderRadius="full" h={compact ? '44px' : '52px'} rightIcon={<FiArrowRight />}
      transition={`transform 260ms ${EASE}, filter 260ms ${EASE}`}
      _hover={{ transform: 'translateY(-1px)', filter: 'brightness(1.06)' }}
      _active={{ transform: 'translateY(0)' }}>
      Checkout
    </Button>
    {onView && (
      <Button onClick={onView} variant="ghost" color={colors.text.secondary} fontWeight="500"
        fontSize="sm" borderRadius="full" h="40px"
        _hover={{ color: colors.text.primary, bg: 'rgba(255,255,255,0.04)' }}>
        Open the saddlebag
      </Button>
    )}
  </VStack>
);

export default SaddlebagLines;
