import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  useClipboard
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMail, FiCopy, FiArrowRight, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const CheckoutSuccess = ({ orderData }) => {
  const navigate = useNavigate();
  const { hasCopied, onCopy } = useClipboard(orderData.orderNumber);

  return (
    <Box minH="100vh" bg="#0A0A0A" display="flex" alignItems="center" py={20}>
      <Container maxW="700px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} textAlign="center">
            {/* Success Icon */}
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <Box
                p={4}
                borderRadius="full"
                bg="rgba(57, 255, 20, 0.1)"
                border="2px solid"
                borderColor="#39FF14"
              >
                <FiCheckCircle size={48} color="#39FF14" />
              </Box>
            </MotionBox>

            {/* Success Message */}
            <VStack spacing={4}>
              <Heading
                fontSize={{ base: "2xl", md: "4xl" }}
                color="white"
                fontWeight="800"
              >
                Order Confirmed!
              </Heading>
              <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} maxW="500px">
                Thank you for your order. We've sent a confirmation email to{' '}
                <Text as="span" color="#00E5E5" fontWeight="600">
                  {orderData.email}
                </Text>
              </Text>
            </VStack>

            {/* Order Details */}
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
                      _hover={{ color: '#00E5E5', bg: 'whiteAlpha.100' }}
                    >
                      {hasCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </HStack>
                </VStack>

                <Divider borderColor="whiteAlpha.200" />

                <HStack justify="space-between" width="100%">
                  <Text color="gray.400">Total Paid</Text>
                  <Text
                    color="#39FF14"
                    fontSize="2xl"
                    fontWeight="800"
                    fontFamily="mono"
                  >
                    ${orderData.total}
                  </Text>
                </HStack>

                <HStack justify="space-between" width="100%">
                  <Text color="gray.400">Items</Text>
                  <Text color="white" fontWeight="600">
                    {orderData.items.length}
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* What's Next */}
            <Box
              width="100%"
              p={6}
              bg="rgba(0, 229, 229, 0.05)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(0, 229, 229, 0.2)"
            >
              <VStack spacing={4}>
                <HStack spacing={2}>
                  <FiMail color="#00E5E5" />
                  <Heading size="md" color="white">
                    What's Next?
                  </Heading>
                </HStack>
                <VStack spacing={2} align="start" width="100%">
                  <HStack spacing={3} align="start">
                    <Box
                      mt={1}
                      width="6px"
                      height="6px"
                      borderRadius="full"
                      bg="#00E5E5"
                      flexShrink={0}
                    />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      You'll receive an order confirmation email shortly
                    </Text>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Box
                      mt={1}
                      width="6px"
                      height="6px"
                      borderRadius="full"
                      bg="#00E5E5"
                      flexShrink={0}
                    />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      We'll send you shipping updates as your order moves
                    </Text>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Box
                      mt={1}
                      width="6px"
                      height="6px"
                      borderRadius="full"
                      bg="#00E5E5"
                      flexShrink={0}
                    />
                    <Text color="gray.300" fontSize="sm" textAlign="left">
                      Your order will ship within 2-3 business days
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* Action Buttons */}
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
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
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
                  color="#00E5E5"
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
