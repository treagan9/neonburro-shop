// src/pages/Checkout/components/CheckoutSuccess.jsx
// SENTINEL: NB_SHOP_CHECKOUT_SUCCESS_V2
//
// The order confirmed screen. Rendered by Checkout/index.jsx once the payment
// intent is succeeded or processing, on both the in page path and the round
// trip from a redirect rail.
//
// orderData comes from Checkout/index.jsx finalizeOrder:
//   orderNumber     derived from the PaymentIntent id, stable across refresh
//   email           where the receipt went
//   total, items    the cart as paid
//   paymentMethod   'card', 'apple_pay', 'google_pay', 'link', 'crypto', ...
//   processing      true when Stripe reported the intent as processing rather
//                   than succeeded, which happens on stablecoins while the
//                   chain confirms. The copy softens to "received, settling"
//                   so nobody reads "confirmed" and then gets a failure email.
//
// No oxford commas, no em dashes.

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  useClipboard,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiMail, FiCopy, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const methodLabel = (method) => {
  switch (method) {
    case 'crypto': return 'Stablecoin via Stripe';
    case 'apple_pay': return 'Apple Pay';
    case 'google_pay': return 'Google Pay';
    case 'link': return 'Link';
    case 'card': return 'Card';
    default: return null;
  }
};

const CheckoutSuccess = ({ orderData }) => {
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(orderData.orderNumber);
  const settling = !!orderData.processing;
  const method = methodLabel(orderData.paymentMethod);

  return (
    <Box minH="100vh" bg="#0B0B0C" display="flex" alignItems="center" py={20}>
      <Container maxW="700px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            >
              <Box
                p={4}
                borderRadius="full"
                bg="rgba(166, 184, 74, 0.1)"
                border="2px solid"
                borderColor="#A6B84A"
              >
                {settling
                  ? <FiClock size={48} color="#A6B84A" />
                  : <FiCheckCircle size={48} color="#A6B84A" />}
              </Box>
            </MotionBox>

            <VStack spacing={4}>
              <Heading
                fontSize={{ base: '2xl', md: '4xl' }}
                color="white"
                fontWeight="800"
              >
                {settling ? 'Payment Received' : 'Order Confirmed!'}
              </Heading>
              <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} maxW="500px">
                {settling
                  ? 'Your payment is confirming on chain. We will email '
                  : 'Thank you for your order. We\'ve sent a confirmation email to '}
                <Text as="span" color="#C5D957" fontWeight="600">
                  {orderData.email}
                </Text>
                {settling ? ' the moment it settles.' : ''}
              </Text>
            </VStack>

            <Box
              width="100%"
              p={6}
              bg="rgba(255, 255, 255, 0.02)"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <VStack spacing={4}>
                <VStack spacing={2}>
                  <Text color="gray.400" fontSize="sm">
                    Order Number
                  </Text>
                  <HStack spacing={2}>
                    <Text
                      color="white"
                      fontSize="xl"
                      fontWeight="700"
                      fontFamily="mono"
                    >
                      {orderData.orderNumber}
                    </Text>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onCopy}
                      leftIcon={<FiCopy />}
                      color="gray.400"
                      _hover={{ color: '#C5D957', bg: 'whiteAlpha.100' }}
                    >
                      {hasCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </HStack>
                </VStack>

                <Divider borderColor="whiteAlpha.200" />

                <HStack justify="space-between" width="100%">
                  <Text color="gray.400">{settling ? 'Total' : 'Total Paid'}</Text>
                  <Text
                    color="#A6B84A"
                    fontSize="2xl"
                    fontWeight="800"
                    fontFamily="mono"
                  >
                    ${Number(orderData.total).toFixed(2)}
                  </Text>
                </HStack>

                <HStack justify="space-between" width="100%">
                  <Text color="gray.400">Items</Text>
                  <Text color="white" fontWeight="600">
                    {orderData.items.length}
                  </Text>
                </HStack>

                {method && (
                  <HStack justify="space-between" width="100%">
                    <Text color="gray.400">Paid with</Text>
                    <Text color="white" fontWeight="600">
                      {method}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Box>

            <Box
              width="100%"
              p={6}
              bg="rgba(197, 217, 87, 0.05)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(197, 217, 87, 0.2)"
            >
              <VStack spacing={4}>
                <HStack spacing={2}>
                  <FiMail color="#C5D957" />
                  <Heading size="md" color="white">
                    What's Next?
                  </Heading>
                </HStack>
                <VStack spacing={2} align="start" width="100%">
                  {settling && (
                    <HStack spacing={3} align="start">
                      <Box mt={1} width="6px" height="6px" borderRadius="full" bg="#C5D957" flexShrink={0} />
                      <Text color="gray.300" fontSize="sm" textAlign="left">
                        Stablecoin payments usually settle within a few minutes. Nothing else is needed from you.
                      </Text>
                    </HStack>
                  )}
                  <HStack spacing={3} align="start">
                    <Box mt={1} width="6px" height="6px" borderRadius="full" bg="#C5D957" flexShrink={0} />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      You'll receive an order confirmation email shortly
                    </Text>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Box mt={1} width="6px" height="6px" borderRadius="full" bg="#C5D957" flexShrink={0} />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      We'll send you shipping updates as your order moves
                    </Text>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Box mt={1} width="6px" height="6px" borderRadius="full" bg="#C5D957" flexShrink={0} />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      Your order will ship within 2-3 business days
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            <VStack spacing={3} width="100%" pt={4}>
              <Button
                width="100%"
                size="lg"
                height="56px"
                bg="white"
                color="black"
                fontWeight="700"
                fontSize="md"
                leftIcon={<FiHome />}
                onClick={() => navigate('/')}
                borderRadius="full"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.3s"
              >
                Continue Shopping
              </Button>

              <Text color="gray.500" fontSize="sm">
                Questions? Email us at{' '}
                <Text
                  as="a"
                  href="mailto:hello@neonburro.com"
                  color="#C5D957"
                  _hover={{ textDecoration: 'underline' }}
                >
                  hello@neonburro.com
                </Text>
              </Text>
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CheckoutSuccess;
