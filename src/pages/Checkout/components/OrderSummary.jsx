import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Divider,
  Badge
} from '@chakra-ui/react';
import { FiPackage } from 'react-icons/fi';

const OrderSummary = ({ cart, total }) => {
  return (
    <Box
      p={{ base: 6, md: 8 }}
      bg="rgba(255, 255, 255, 0.02)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack spacing={2} align="center">
          <FiPackage color="#00E5E5" />
          <Heading size="md" color="white">Order Summary</Heading>
        </HStack>

        {/* Cart Items */}
        <VStack spacing={4} align="stretch">
          {cart.map((item) => (
            <HStack key={item.id} spacing={3} align="start">
              {/* Product Image */}
              <Box
                flexShrink={0}
                width="60px"
                height="60px"
                borderRadius="lg"
                overflow="hidden"
                bg="black"
                position="relative"
              >
                <Box
                  width="100%"
                  height="100%"
                  bg={`linear-gradient(135deg, ${item.color}12 0%, ${item.color}06 50%, transparent 100%)`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.featuredImage ? (
                    <Image
                      src={item.featuredImage}
                      alt={item.name}
                      maxW="70%"
                      maxH="70%"
                      objectFit="contain"
                      filter={`drop-shadow(0 3px 10px ${item.color}40)`}
                    />
                  ) : (
                    <Text
                      fontSize="xl"
                      color={item.color}
                      fontWeight="800"
                      opacity={0.3}
                    >
                      {item.name.charAt(0)}
                    </Text>
                  )}
                </Box>
              </Box>

              {/* Product Details */}
              <VStack align="start" flex={1} spacing={1}>
                <Text color="white" fontWeight="600" fontSize="sm" noOfLines={2}>
                  {item.name}
                </Text>
                <HStack spacing={2}>
                  <Text color="gray.400" fontSize="xs">
                    Qty: {item.quantity}
                  </Text>
                  {item.selectedSize && (
                    <>
                      <Text color="gray.600">•</Text>
                      <Text color="gray.400" fontSize="xs">
                        Size: {item.selectedSize}
                      </Text>
                    </>
                  )}
                </HStack>
                <Badge
                  bg={`${item.color}15`}
                  color={item.color}
                  fontSize="2xs"
                  px={2}
                  py={0.5}
                  borderRadius="md"
                >
                  {item.category}
                </Badge>
              </VStack>

              {/* Price */}
              <Text 
                color="white" 
                fontWeight="700" 
                fontSize="sm"
                fontFamily="mono"
              >
                ${item.price * item.quantity}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Pricing Breakdown */}
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">
              Subtotal
            </Text>
            <Text color="white" fontSize="md" fontWeight="600">
              ${total}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">
              Shipping
            </Text>
            <Text color="#39FF14" fontSize="sm" fontWeight="600">
              FREE
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">
              Tax
            </Text>
            <Text color="gray.400" fontSize="sm">
              Calculated at checkout
            </Text>
          </HStack>
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Total */}
        <HStack justify="space-between">
          <Text color="white" fontSize="lg" fontWeight="700">
            Total
          </Text>
          <Text 
            color="#39FF14" 
            fontSize="2xl" 
            fontWeight="800"
            fontFamily="mono"
          >
            ${total}
          </Text>
        </HStack>

        {/* Trust Badges */}
        <Box
          p={4}
          bg="rgba(0, 229, 229, 0.05)"
          borderRadius="lg"
          border="1px solid"
          borderColor="rgba(0, 229, 229, 0.2)"
        >
          <VStack spacing={2}>
            <Text color="#00E5E5" fontSize="sm" fontWeight="600" textAlign="center">
              Free Worldwide Shipping
            </Text>
            <Text color="gray.400" fontSize="xs" textAlign="center" lineHeight="1.5">
              30-Day Returns • Lifetime Guarantee
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
