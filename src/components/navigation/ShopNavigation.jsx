// src/components/navigation/ShopNavigation.jsx
// SENTINEL: NB_SHOP_NAV_V2
//
// Full width bar. Same lockup, same rail, same tile surface as neonburro.com,
// and one deliberate difference in behaviour.
//
// ── WHY IT NEVER HIDES ──────────────────────────────────────────────────────
// The studio nav is a floating tile that slides away as you read. That is right
// for a studio: nothing on the page is urgent and getting out of the way is a
// courtesy. It is wrong for a shop. A cart that is one scroll position away from
// unreachable is a cart people abandon, and the moment somebody decides to buy
// is never the moment you predicted.
//
// So this one condenses instead of leaving. Past 24px it loses about twenty
// pixels of height and the house tile surface arrives across the whole band. It
// is the same information doing less shouting, rather than information leaving.
//
// ── THE ALIGNMENT, WHICH IS THE ACTUAL POINT ────────────────────────────────
// The wordmark's first glyph lands on CONTENT_LEFT, the same x as the first
// character of every heading on every page of both domains. The lockup carries
// 11px of padding and a 1px border, so the tile is pulled back by NAV_TILE_INSET
// to put the LETTERFORM on the line rather than the box. Getting this wrong by
// twelve pixels is what makes a layout look almost right.
//
// The plumb line under it is the visible proof. If a heading ever drifts, you
// see it against that hairline without measuring anything.
//
// V1 was 167 lines with its own hardcoded colour object and a Container capped
// at 1400px, so the shop and the studio disagreed about where the left edge of
// the world was. Everything geometric now comes from theme/layout.js.
//
// No oxford commas, no em dashes.

import { Box, Flex, HStack, Image, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import {
  RAIL, CONTENT_LEFT, NAV_TILE_INSET, NAV_H, NAV_H_TIGHT,
  NAV_CONDENSE_AFTER, EASE, TILE,
} from '../../theme/layout';

const LIME = colors.accent.signal;
const MAIN_DOMAIN = 'https://neonburro.com';

const ShopNavigation = () => {
  const { getCartItemsCount, setIsOpen } = useCart();
  const [condensed, setCondensed] = useState(false);
  const count = getCartItemsCount();

  // Rendered once on mount and then only when the boolean actually flips, so a
  // scroll does not re render the tree sixty times a second.
  const state = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > NAV_CONDENSE_AFTER;
      if (next !== state.current) {
        state.current = next;
        setCondensed(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* THE PLUMB LINE. Desktop only. Sits on CONTENT_LEFT rather than on the
          lockup, so it is the line the headings are measured against and not a
          decoration hanging off the logo. */}
      <Box display={{ base: 'none', md: 'block' }} position="fixed" aria-hidden="true"
        left={CONTENT_LEFT} top="120px" bottom="28px" w="1px" zIndex={999}
        pointerEvents="none"
        sx={{
          background: `linear-gradient(to bottom, ${TILE.border} 0%, transparent 82%)`,
          opacity: 0.55,
        }} />

      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1001}
        transition={`background-color 420ms ${EASE}, border-color 420ms ${EASE}, box-shadow 420ms ${EASE}`}
        bg={condensed ? TILE.bg : 'transparent'}
        borderBottom="1px solid"
        borderColor={condensed ? TILE.border : 'transparent'}
        boxShadow={condensed ? TILE.shadow : 'none'}
        sx={{
          backdropFilter: condensed ? TILE.blur : 'none',
          WebkitBackdropFilter: condensed ? TILE.blur : 'none',
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          px={RAIL}
          h={condensed ? NAV_H_TIGHT : NAV_H}
          transition={`height 420ms ${EASE}`}
        >
          {/* ── the lockup ────────────────────────────────────────────────
              Pulled back by NAV_TILE_INSET so the glyph, not the box, lands
              on the rail. */}
          <HStack spacing={{ base: 3, md: 4 }} ml={`-${NAV_TILE_INSET}px`} minW={0}>
            <Link
              href={MAIN_DOMAIN}
              display="inline-flex"
              alignItems="center"
              px="11px"
              py="8px"
              borderRadius="12px"
              border="1px solid transparent"
              transition={`opacity 260ms ${EASE}`}
              _hover={{ opacity: 0.85, textDecoration: 'none' }}
              aria-label="neonburro, back to the studio"
            >
              <Image
                src="/logo-main.png"
                alt="neonburro"
                h={condensed ? { base: '30px', md: '34px' } : { base: '34px', md: '42px' }}
                w="auto"
                objectFit="contain"
                draggable={false}
                transition={`height 420ms ${EASE}`}
              />
            </Link>

            {/* Not a badge. The studio uses mono kickers everywhere and a
                coloured pill would be the one piece of chrome on either site
                that came from somewhere else. */}
            <Box w="1px" h="14px" bg={TILE.border} display={{ base: 'none', sm: 'block' }} />
            <Text
              as={RouterLink}
              to="/"
              display={{ base: 'none', sm: 'block' }}
              fontFamily="mono"
              fontSize={{ base: '9px', md: '10px' }}
              fontWeight="500"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color={LIME}
              opacity={0.85}
              transition={`opacity 260ms ${EASE}`}
              _hover={{ opacity: 1, textDecoration: 'none' }}
            >
              shop
            </Text>
          </HStack>

          {/* ── the cart ──────────────────────────────────────────────────
              Sits on the right rail. No pulse, no glow. A counter that
              animates forever is a counter people stop reading. */}
          <HStack
            as="button"
            type="button"
            onClick={() => setIsOpen(true)}
            spacing={2.5}
            px={3}
            py={2}
            mr="-4px"
            borderRadius="10px"
            border="1px solid transparent"
            transition={`border-color 260ms ${EASE}, background-color 260ms ${EASE}`}
            _hover={{ borderColor: TILE.border, bg: 'rgba(255,255,255,0.04)' }}
            _focusVisible={{ borderColor: LIME, outline: 'none' }}
            aria-label={count > 0 ? `Cart, ${count} items` : 'Cart, empty'}
          >
            <Box as={FiShoppingBag} boxSize={{ base: '19px', md: '20px' }}
              color={colors.text.primary} />
            <Text
              fontFamily="mono"
              fontSize="11px"
              fontWeight="500"
              letterSpacing="0.1em"
              lineHeight="1"
              minW="12px"
              textAlign="left"
              color={count > 0 ? LIME : colors.text.muted}
              transition={`color 260ms ${EASE}`}
            >
              {count > 0 ? String(count).padStart(2, '0') : '00'}
            </Text>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default ShopNavigation;

/* NB · shop navigation · v2 · full width, same rail, never hides */
