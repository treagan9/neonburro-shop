import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack, 
  HStack,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

const MotionBox = motion(Box);

const AddToCart = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const toast = useToast();

  const handleAddToCart = async () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: 'Please select a size',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsAdding(true);
    
    setTimeout(() => {
      onAddToCart({
        ...product,
        selectedSize,
        quantity
      });
      setIsAdding(false);
    }, 500);
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: 'Please select a size',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    onBuyNow({
      ...product,
      selectedSize,
      quantity
    });
  };

  return (
    <Box width="100%" py={{ base: 8, md: 12 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12} alignItems="start">
            <GridItem>
              <VStack spacing={8} align="stretch">
                <VStack spacing={2} align="start">
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="white"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    Add to Your Collection
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    Select your preferences and add this piece to your cart
                  </Text>
                </VStack>

                {product.sizes && (
                  <VStack align="start" spacing={3}>
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Size
                    </Text>
                    <Select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      placeholder="Select size"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.02)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ borderColor: 'whiteAlpha.300' }}
                      _focus={{ borderColor: product.color, boxShadow: `0 0 0 1px ${product.color}` }}
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size} style={{ background: '#1A1A1A', color: 'white' }}>
                          {size}
                        </option>
                      ))}
                    </Select>
                  </VStack>
                )}

                <VStack align="start" spacing={3}>
                  <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                    Quantity
                  </Text>
                  <NumberInput
                    value={quantity}
                    onChange={(valueString) => setQuantity(parseInt(valueString) || 1)}
                    min={1}
                    max={10}
                    size="lg"
                    maxW="120px"
                  >
                    <NumberInputField
                      bg="rgba(255, 255, 255, 0.02)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ borderColor: 'whiteAlpha.300' }}
                      _focus={{ borderColor: product.color, boxShadow: `0 0 0 1px ${product.color}` }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="gray.400" _hover={{ color: product.color }} />
                      <NumberDecrementStepper color="gray.400" _hover={{ color: product.color }} />
                    </NumberInputStepper>
                  </NumberInput>
                </VStack>

                <Box
                  p={6}
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text color="gray.300" fontSize="md">
                        Price per item:
                      </Text>
                      <Text color="white" fontSize="md" fontWeight="600">
                        ${product.price}
                      </Text>
                    </HStack>
                    {quantity > 1 && (
                      <HStack justify="space-between">
                        <Text color="gray.300" fontSize="md">
                          Quantity: {quantity}
                        </Text>
                        <Text color="white" fontSize="md" fontWeight="600">
                          ${product.price * quantity}
                        </Text>
                      </HStack>
                    )}
                    <Box height="1px" bg="whiteAlpha.200" />
                    <HStack justify="space-between">
                      <Text color="white" fontSize="lg" fontWeight="700">Total</Text>
                      <Text color={product.color} fontSize="xl" fontWeight="800" fontFamily="mono">
                        ${product.price * quantity}
                      </Text>
                    </HStack>
                    <Text color="gray.500" fontSize="sm" textAlign="center">
                      Free worldwide shipping included
                    </Text>
                  </VStack>
                </Box>

                <VStack spacing={4} align="stretch">
                  <Button
                    size="lg"
                    bg={product.color}
                    color="#0A0A0A"
                    fontWeight="700"
                    fontSize="md"
                    height="56px"
                    leftIcon={<FiShoppingCart />}
                    onClick={handleAddToCart}
                    isLoading={isAdding}
                    loadingText="Adding..."
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${product.color}44`
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    borderRadius="full"
                    transition="all 0.3s"
                  >
                    Add to Cart
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    borderColor={product.color}
                    color={product.color}
                    fontWeight="600"
                    fontSize="md"
                    height="56px"
                    onClick={handleBuyNow}
                    _hover={{
                      bg: `${product.color}11`,
                      transform: 'translateY(-2px)'
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    borderRadius="full"
                    transition="all 0.3s"
                  >
                    Buy Now
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    color="gray.400"
                    fontWeight="500"
                    fontSize="md"
                    height="48px"
                    leftIcon={<FiHeart />}
                    _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                    borderRadius="full"
                  >
                    Add to Wishlist
                  </Button>
                </VStack>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={6} align="stretch">
                <Heading fontSize="xl" color="white" fontWeight="700">
                  Why Choose Neon Burro
                </Heading>

                <VStack spacing={4} align="stretch">
                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiTruck size={20} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        Free Worldwide Shipping
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        Fast, secure delivery to your door. No hidden fees.
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiShield size={20} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        Lifetime Craftsmanship Guarantee
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        If it breaks due to craftsmanship, we'll replace it.
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiRefreshCw size={20} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        30-Day Return Policy
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        Not completely satisfied? Full refund, no questions.
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

                <Box
                  p={4}
                  bg={`${product.color}08`}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={`${product.color}20`}
                >
                  <VStack spacing={2}>
                    <Text color="white" fontSize="sm" fontWeight="600" textAlign="center">
                      Handcrafted in the San Juan Mountains
                    </Text>
                    <Text color="gray.400" fontSize="xs" textAlign="center" lineHeight="1.5">
                      Each piece is individually made by skilled artisans in our Ridgway, Colorado studio.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AddToCart;
