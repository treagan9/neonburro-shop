// src/pages/Checkout/components/CheckoutSuccess.jsx
// SENTINEL: NB_SHOP_CHECKOUT_SUCCESS_V3
//
// The order confirmed screen. Rendered by Checkout/index.jsx once the payment
// is in, on the in page path, the round trip from a redirect rail, and the
// direct Solana rail.
//
// orderData comes from Checkout/index.jsx finalizeOrder:
//   orderNumber     derived from the PaymentIntent id (or the Solana signature
//                   on the direct rail), stable across refresh
//   email           where the receipt went, may be empty on the direct rail
//   total, items    the cart as paid
//   paymentMethod   'card', 'apple_pay', 'google_pay', 'link', 'crypto',
//                   'cashapp', 'amazon_pay', 'solana', ...
//   processing      true when Stripe reported the intent as processing rather
//                   than succeeded, which happens on stablecoins while the
//                   chain confirms. The copy softens to "received, settling"
//                   so nobody reads "confirmed" and then gets a failure email.
//   solana          { signature, payer, currency, amountToken } on the direct
//                   rail. The signature links to Solscan, the record IS the
//                   receipt when no email was left.
//
// V3 rewrote the screen in the house voice (V2 said "Order Confirmed!" and
// "What's Next?" in weight 800, none of which is ours) and added the direct
// rail case: no exclamation points, no promise of an email nobody asked for,
// the chain record shown plainly, Cypher named once.
//
// No oxford commas, no em dashes.

import { Box, Container, VStack, HStack, Text, useClipboard } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiCopy, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../theme/colors';
import { EASE, RAIL, MEASURE } from '../../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const kicker = {
  fontFamily: 'mono', fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase',
};

const methodLabel = (method) => {
  switch (method) {
    case 'crypto': return 'Stablecoin via Stripe';
    case 'solana': return 'Direct on Solana';
    case 'apple_pay': return 'Apple Pay';
    case 'google_pay': return 'Google Pay';
    case 'link': return 'Link';
    case 'cashapp': return 'Cash App Pay';
    case 'amazon_pay': return 'Amazon Pay';
    case 'card': return 'Card';
    default: return null;
  }
};

const Row = ({ label, children, last }) => (
  <HStack justify="space-between" align="baseline" py={3} borderBottom={last ? 'none' : '1px solid'} borderColor={colors.ui.border}>
    <Text fontSize="sm" color={colors.text.secondary}>{label}</Text>
    <Box textAlign="right" minW={0}>{children}</Box>
  </HStack>
);

const CheckoutSuccess = ({ orderData }) => {
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(orderData.orderNumber);
  const settling = !!orderData.processing;
  const direct = orderData.paymentMethod === 'solana';
  const method = methodLabel(orderData.paymentMethod);
  const email = (orderData.email || '').trim();
  const digitalOnly = orderData.items.every((i) => i.delivery === 'digital' || i.category === 'Digital');
  const sig = orderData.solana?.signature || '';

  const title = direct ? 'Landed.' : settling ? 'Received, settling.' : 'Yours.';
  const lede = direct
    ? `This one came straight to the wallet. ${orderData.solana?.amountToken || ''} ${orderData.solana?.currency || ''} in, no processor between you and us. Cypher watched it land and the record is on chain.`
    : settling
      ? 'Your stablecoin payment is confirming on chain. That usually takes a few minutes and needs nothing from you.'
      : 'Thank you. The order is in the yard and the receipt is on its way.';

  return (
    <Box minH="100vh" bg={colors.dark.black} pt={{ base: 28, md: 40 }} pb={{ base: 16, md: 24 }}>
      <Container maxW="1680px" px={RAIL} mx={0}>
        <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} maxW={MEASURE}>
          <HStack spacing={3} mb={5}>
            <Box w="30px" h="30px" borderRadius="full" bg="rgba(197,217,87,0.10)" border="1px solid" borderColor="rgba(197,217,87,0.35)"
              display="grid" placeItems="center" color={LIME} boxShadow={`0 0 24px rgba(197,217,87,0.25)`}>
              {settling && !direct ? <FiClock size={14} /> : <FiCheck size={14} />}
            </Box>
            <Text {...kicker} color={LIME}>{direct ? 'Direct on Solana · verified on chain' : settling ? 'Payment received' : 'Order placed'}</Text>
          </HStack>

          <Text as="h1" fontSize={{ base: '40px', md: '56px' }} fontWeight="600" letterSpacing="-0.035em" lineHeight="1" color={colors.text.primary} mb={4}>
            {title}
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={colors.text.secondary} lineHeight="1.6" mb={8}>
            {lede}
          </Text>

          <Box borderTop="1px solid" borderColor={colors.ui.border}>
            <Row label="Order">
              <HStack as="button" type="button" onClick={onCopy} spacing={2} justify="flex-end" role="group">
                <Text fontFamily="mono" fontSize="md" fontWeight="600" color={colors.text.primary}>{orderData.orderNumber}</Text>
                <Box color={hasCopied ? LIME : colors.text.muted} transition={`color 220ms ${EASE}`} _groupHover={{ color: LIME }}>
                  {hasCopied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                </Box>
              </HStack>
            </Row>
            <Row label={settling ? 'Total' : 'Paid'}>
              <Text fontFamily="mono" fontSize="lg" fontWeight="600" color={LIME}>${Number(orderData.total).toFixed(2)}</Text>
            </Row>
            <Row label="Items">
              <Text fontSize="sm" color={colors.text.primary} fontWeight="600">{String(orderData.items.length).padStart(2, '0')}</Text>
            </Row>
            {method && (
              <Row label="Paid with">
                <Text fontSize="sm" color={colors.text.primary} fontWeight="600">{method}</Text>
              </Row>
            )}
            {direct && sig && (
              <Row label="On chain">
                <HStack as="a" href={`https://solscan.io/tx/${sig}`} target="_blank" rel="noopener noreferrer" spacing={2} justify="flex-end"
                  color={colors.text.primary} _hover={{ color: LIME }} transition={`color 220ms ${EASE}`}>
                  <Text fontFamily="mono" fontSize="sm">{sig.slice(0, 8)}…{sig.slice(-8)}</Text>
                  <FiExternalLink size={13} />
                </HStack>
              </Row>
            )}
            <Row label={direct && !email ? 'Contact' : 'Receipt'} last>
              <Text fontSize="sm" color={email ? colors.text.primary : colors.text.muted} fontWeight={email ? '600' : '400'} noOfLines={1}>
                {email || 'none left, by choice'}
              </Text>
            </Row>
          </Box>

          <VStack align="start" spacing={2} mt={8}>
            <Text {...kicker} color={colors.text.muted} mb={1}>What happens now</Text>
            {settling && !direct && (
              <Text fontSize="sm" color={colors.text.secondary}>The chain confirms, Stripe settles it in dollars, we email you the moment it does.</Text>
            )}
            {digitalOnly ? (
              <Text fontSize="sm" color={colors.text.secondary}>
                {email
                  ? `Every piece carries float. It arrives at ${email}, usually within the hour.`
                  : 'Every piece carries float, and float goes by email. You left none, so nothing can be sent. If that was a slip, write to hello@neonburro.com with the order number and the tx and we will put it right.'}
              </Text>
            ) : (
              <Text fontSize="sm" color={colors.text.secondary}>
                {direct && !orderData.solana?.address && !email
                  ? 'Something in this order ships, and it needs somewhere to go. Write to hello@neonburro.com with the order number and where to send it.'
                  : 'Packed by hand in Ridgway, small runs, out the door inside two or three working days. Digital float, if any, arrives by email first.'}
              </Text>
            )}
            <Text fontSize="sm" color={colors.text.secondary}>Final sale. What you find is yours to keep.</Text>
          </VStack>

          <HStack spacing={5} mt={10} flexWrap="wrap" rowGap={4}>
            <Box as="button" type="button" onClick={() => navigate('/')} display="inline-flex" alignItems="center" gap="8px" h="48px" px={7}
              borderRadius="full" bg={colors.text.primary} color={colors.dark.black} fontWeight="700" fontSize="sm"
              transition={`background 220ms ${EASE}, transform 220ms ${EASE}`} _hover={{ bg: LIME, transform: 'translateY(-2px)' }}>
              Back to the shop <FiArrowRight size={14} />
            </Box>
            <Box as="a" href="/the-blind-lead/" color={colors.text.muted} fontSize="sm" fontWeight="500" _hover={{ color: LIME }} transition={`color 220ms ${EASE}`}>
              How the hunt works
            </Box>
          </HStack>

          <Text mt={12} {...kicker} color={colors.text.muted}>
            questions · <Box as="a" href="mailto:hello@neonburro.com" color={colors.text.secondary} _hover={{ color: LIME }}>hello@neonburro.com</Box>
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CheckoutSuccess;
