// src/pages/Checkout/components/OrderSummary.jsx
// SENTINEL: NB_SHOP_ORDER_SUMMARY_V4
//
// The saddlebag as it stands at checkout. Reuses SaddlebagLine so the lines
// look the way they did in the drawer the shopper just came from, read only
// here, no stepper. The one job this panel has beyond listing is to say how
// the order arrives: by post for physical goods, by email for digital, both
// when the saddlebag holds both.
//
// ── two shapes ──────────────────────────────────────────────────────────────
// On desktop it is the plate on the right, sticky, always open. On a phone it
// is a single bar above the form ("Saddlebag · 02 · $4") that opens on tap.
// A phone screen is for the form. The shopper already saw the lines in the
// drawer, and a full list above the email field pushed the email field off
// the first screen. Chakra's Collapse does the reveal, no box around it, a
// hairline above and below.
//
// V4: on desktop the body is rendered directly, not inside a Collapse. V3
// wrapped both shapes in one Collapse with in={isDesktop || openMobile}, and
// useBreakpointValue resolves after first paint, so on a wide screen the plate
// could sit open with an empty body until the Collapse animation caught up,
// and a full page capture showed the header alone. The desktop plate has
// nothing to animate. Only the phone bar collapses.
//
// Tax is "calculated at checkout" because Stripe Tax is not on yet. When it
// is, the amount comes back on the PaymentIntent and this line becomes a
// number. Do not fake one.
//
// No oxford commas, no em dashes.

import { Box, VStack, HStack, Text, Collapse, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FiMail, FiTruck, FiChevronDown, FiShoppingBag } from 'react-icons/fi';
import { colors } from '../../../theme/colors';
import { EASE } from '../../../theme/layout';
import { isDigitalItem } from '../../../context/CartContext';
import { SaddlebagLine, money } from '../../../components/cart/SaddlebagLines';

const LIME = colors.accent.signal;

const OrderSummary = ({ cart, total }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, { ssr: false });
  const [openMobile, setOpenMobile] = useState(false);

  const digital = cart.filter(isDigitalItem).length;
  const physical = cart.length - digital;
  const digitalOnly = cart.length > 0 && physical === 0;
  const count = cart.reduce((n, i) => n + i.quantity, 0);

  const Body = (
    <VStack spacing={5} align="stretch">
      <VStack spacing={0} align="stretch">
        {cart.map((item) => (
          <SaddlebagLine key={item.cartItemId || item.id} item={item} compact />
        ))}
      </VStack>

      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text color={colors.text.secondary} fontSize="sm">Subtotal</Text>
          <Text color={colors.text.primary} fontSize="md" fontWeight="600" fontFamily="mono">{money(total)}</Text>
        </HStack>
        {physical > 0 && (
          <HStack justify="space-between">
            <Text color={colors.text.secondary} fontSize="sm">Shipping</Text>
            <Text color={LIME} fontSize="sm" fontWeight="600">Free</Text>
          </HStack>
        )}
        {digital > 0 && (
          <HStack justify="space-between">
            <Text color={colors.text.secondary} fontSize="sm">Delivery</Text>
            <Text color={LIME} fontSize="sm" fontWeight="600">By email</Text>
          </HStack>
        )}
        <HStack justify="space-between">
          <Text color={colors.text.secondary} fontSize="sm">Tax</Text>
          <Text color={colors.text.muted} fontSize="sm">Calculated at checkout</Text>
        </HStack>
      </VStack>

      <HStack justify="space-between" align="baseline" pt={4} borderTop="1px solid" borderColor={colors.ui.border}>
        <Text color={colors.text.primary} fontSize="lg" fontWeight="700">Total</Text>
        <Text color={LIME} fontSize="2xl" fontWeight="700" fontFamily="mono">{money(total)}</Text>
      </HStack>

      <HStack spacing={3} align="start" pt={1}>
        <Box color={LIME} mt="2px" flexShrink={0}>
          {digitalOnly ? <FiMail size={16} /> : <FiTruck size={16} />}
        </Box>
        <VStack spacing={1} align="start">
          <Text color={colors.text.primary} fontSize="sm" fontWeight="600">
            {digitalOnly ? 'Arrives by email' : physical > 0 && digital > 0 ? 'Some by post, some by email' : 'Free US shipping'}
          </Text>
          <Text color={colors.text.secondary} fontSize="xs" lineHeight="1.6">
            {digitalOnly
              ? 'Usually within the hour. Every piece carries float. No returns on digital, what you find is yours.'
              : 'Small runs, packed by hand in Ridgway. Every piece carries float. Final sale, what you find is yours to keep.'}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );

  return (
    <Box
      p={{ base: 0, lg: 8 }}
      bg={{ base: 'transparent', lg: 'rgba(255, 255, 255, 0.02)' }}
      borderRadius={{ base: 0, lg: '2xl' }}
      border={{ base: 'none', lg: '1px solid' }}
      borderColor="whiteAlpha.100"
    >
      {/* the bar. Tappable on a phone, a plain heading on desktop */}
      <HStack as={isDesktop ? 'div' : 'button'} type={isDesktop ? undefined : 'button'}
        onClick={isDesktop ? undefined : () => setOpenMobile((v) => !v)}
        w="100%" justify="space-between" align="center" py={{ base: 4, lg: 0 }} mb={{ base: 0, lg: 5 }}
        borderTop={{ base: '1px solid', lg: 'none' }} borderBottom={{ base: '1px solid', lg: 'none' }} borderColor={colors.ui.border}
        textAlign="left" aria-expanded={isDesktop ? undefined : openMobile}>
        <HStack spacing={3} align="center">
          <Box as={FiShoppingBag} boxSize="16px" color={LIME} />
          <Text fontFamily="mono" fontSize="11px" fontWeight="500" letterSpacing="0.2em" textTransform="uppercase" color={colors.text.primary}>
            Saddlebag
          </Text>
          <Text fontFamily="mono" fontSize="11px" letterSpacing="0.1em" color={LIME}>
            {String(count).padStart(2, '0')}
          </Text>
        </HStack>
        <HStack spacing={3} display={{ base: 'flex', lg: 'none' }}>
          <Text fontFamily="mono" fontSize="md" fontWeight="600" color={LIME}>{money(total)}</Text>
          <Box as={FiChevronDown} boxSize="16px" color={colors.text.muted}
            transition={`transform 260ms ${EASE}`} transform={openMobile ? 'rotate(180deg)' : 'none'} />
        </HStack>
      </HStack>

      {isDesktop ? Body : (
        <Collapse in={openMobile} animateOpacity>
          <Box pt={4} pb={4} borderBottom="1px solid" borderColor={colors.ui.border}>
            {Body}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default OrderSummary;
