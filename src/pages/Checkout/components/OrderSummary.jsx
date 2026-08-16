// src/pages/Checkout/components/OrderSummary.jsx
// SENTINEL: NB_SHOP_ORDER_SUMMARY_V2
//
// The right hand column of checkout. Reuses SaddlebagLine so the lines look
// the way they did in the drawer the shopper just came from, read only here,
// no stepper. The one job this panel has beyond listing is to say how the
// order arrives: by post for physical goods, by email for digital, both when
// the saddlebag holds both. It used to say "Free US Shipping" over a two
// dollar email, and it carried an em dash. Both gone.
//
// Tax is "calculated at checkout" because Stripe Tax is not on yet. When it
// is, the amount comes back on the PaymentIntent and this line becomes a
// number. Do not fake one.
//
// No oxford commas, no em dashes.

import { Box, VStack, HStack, Text, Divider } from '@chakra-ui/react';
import { FiMail, FiTruck } from 'react-icons/fi';
import { colors } from '../../../theme/colors';
import { isDigitalItem } from '../../../context/CartContext';
import { SaddlebagLine, money } from '../../../components/cart/SaddlebagLines';

const LIME = colors.accent.signal;

const OrderSummary = ({ cart, total }) => {
  const digital = cart.filter(isDigitalItem).length;
  const physical = cart.length - digital;
  const digitalOnly = cart.length > 0 && physical === 0;

  return (
    <Box p={{ base: 6, md: 8 }} bg="rgba(255, 255, 255, 0.02)" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
      <VStack spacing={5} align="stretch">
        <HStack spacing={3} align="center">
          <Text fontFamily="mono" fontSize="11px" fontWeight="500" letterSpacing="0.2em" textTransform="uppercase" color={colors.text.primary}>
            Saddlebag
          </Text>
          <Text fontFamily="mono" fontSize="11px" letterSpacing="0.1em" color={LIME}>
            {String(cart.reduce((n, i) => n + i.quantity, 0)).padStart(2, '0')}
          </Text>
        </HStack>

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

        <Divider borderColor="whiteAlpha.200" />

        <HStack justify="space-between" align="baseline">
          <Text color={colors.text.primary} fontSize="lg" fontWeight="700">Total</Text>
          <Text color={LIME} fontSize="2xl" fontWeight="800" fontFamily="mono">{money(total)}</Text>
        </HStack>

        <Box p={4} bg="rgba(197, 217, 87, 0.05)" borderRadius="lg" border="1px solid" borderColor="rgba(197, 217, 87, 0.2)">
          <HStack spacing={3} align="start">
            <Box color={LIME} mt="2px" flexShrink={0}>
              {digitalOnly ? <FiMail size={16} /> : <FiTruck size={16} />}
            </Box>
            <VStack spacing={1} align="start">
              <Text color={LIME} fontSize="sm" fontWeight="700">
                {digitalOnly ? 'Arrives by email' : physical > 0 && digital > 0 ? 'Some by post, some by email' : 'Free US shipping'}
              </Text>
              <Text color={colors.text.secondary} fontSize="xs" lineHeight="1.6">
                {digitalOnly
                  ? 'Usually within the hour, to the address you enter on the left. Every piece carries float. No returns on digital, what you find is yours.'
                  : 'Small runs, packed by hand in Ridgway. Every piece carries float. Final sale, what you find is yours to keep.'}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
