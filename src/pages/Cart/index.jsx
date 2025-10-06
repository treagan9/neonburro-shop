import { Box, Container, Heading, Text, VStack, HStack, Button, IconButton, Divider, Image, Badge } from '@chakra-ui/react';
import { FiX, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Box minH="100vh" bg="#0A0A0A" pt="100px">
        <Container maxW="600px" textAlign="center">
          <VStack spacing={8} py={20}>
            <Box fontSize="6xl">🛒</Box>
            <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
              Your cart is empty
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Time to add some mountain magic!
            </Text>
            <Button
              onClick={() => navigate('/')}
              bg="white"
              color="black"
              fontWeight="700"
              size="lg"
              px={8}
              borderRadius="full"
              leftIcon={<FiShoppingBag />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
              }}
              transition="all 0.3s"
            >
              Continue Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#0A0A0A" pt="100px" pb={20}>
      <Container maxW="900px" px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between" align="center">
            <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
              Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </Heading>
            <Button
              variant="ghost"
              onClick={clearCart}
              color="gray.400"
              size="sm"
              _hover={{ color: 'red.400' }}
            >
              Clear All
            </Button>
          </HStack>
          
          <VStack spacing={4} align="stretch">
            {cart.map((item) => (
              <Box
                key={item.cartItemId}
                p={{ base: 4, md: 6 }}
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="xl"
                transition="all 0.3s"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'whiteAlpha.200'
                }}
              >
                <HStack spacing={{ base: 3, md: 4 }} align="start">
                  {/* Product Image */}
                  <Box
                    flexShrink={0}
                    width={{ base: "80px", md: "100px" }}
                    height={{ base: "80px", md: "100px" }}
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
                      position="relative"
                    >
                      {item.featuredImage ? (
                        <Image
                          src={item.featuredImage}
                          alt={item.name}
                          maxW="75%"
                          maxH="75%"
                          objectFit="contain"
                          filter={`drop-shadow(0 5px 15px ${item.color}40)`}
                        />
                      ) : (
                        <Text
                          fontSize="3xl"
                          color={item.color}
                          fontWeight="800"
                          opacity={0.3}
                        >
                          {item.name.charAt(0)}
                        </Text>
                      )}
                    </Box>
                    
                    {item.category && (
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        bg={`${item.color}25`}
                        color={item.color}
                        fontSize="2xs"
                        px={2}
                        py={0.5}
                        borderRadius="md"
                      >
                        {item.category}
                      </Badge>
                    )}
                  </Box>

                  {/* Product Info */}
                  <VStack align="start" flex={1} spacing={2}>
                    <Text 
                      color="white" 
                      fontWeight="700" 
                      fontSize={{ base: "md", md: "lg" }}
                      noOfLines={1}
                    >
                      {item.name}
                    </Text>
                    
                    <Text 
                      color={item.color}
                      fontSize="sm"
                      fontWeight="500"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {item.subtitle}
                    </Text>
                    
                    {/* Variant Details */}
                    {(item.selectedSize || item.selectedDesign || item.selectedTier) && (
                      <HStack spacing={2} flexWrap="wrap">
                        {item.selectedSize && (
                          <>
                            <Text color="gray.500" fontSize="sm">Size:</Text>
                            <Text color="gray.300" fontSize="sm" fontWeight="600">
                              {item.selectedSize}
                            </Text>
                          </>
                        )}
                        {item.selectedDesign && (
                          <>
                            {item.selectedSize && <Text color="gray.600" fontSize="sm">•</Text>}
                            <Text color="gray.500" fontSize="sm">Design:</Text>
                            <Text color="gray.300" fontSize="sm" fontWeight="600">
                              {item.selectedDesign}
                            </Text>
                          </>
                        )}
                        {item.selectedTier && (
                          <>
                            {(item.selectedSize || item.selectedDesign) && <Text color="gray.600" fontSize="sm">•</Text>}
                            <Text color="gray.500" fontSize="sm">Tier:</Text>
                            <Text color="gray.300" fontSize="sm" fontWeight="600">
                              {item.selectedTier}
                            </Text>
                          </>
                        )}
                      </HStack>
                    )}
                    
                    {/* Quantity Controls */}
                    <HStack spacing={2} mt={2}>
                      <IconButton
                        size="sm"
                        icon={<FiMinus />}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.100' }}
                        borderRadius="md"
                      />
                      <Box
                        px={4}
                        py={1}
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="md"
                        minW="50px"
                        textAlign="center"
                      >
                        <Text color="white" fontWeight="600">
                          {item.quantity}
                        </Text>
                      </Box>
                      <IconButton
                        size="sm"
                        icon={<FiPlus />}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.100' }}
                        borderRadius="md"
                      />
                    </HStack>
                  </VStack>
                  
                  {/* Price & Remove */}
                  <VStack align="end" spacing={3}>
                    <IconButton
                      size="sm"
                      icon={<FiX />}
                      onClick={() => removeFromCart(item.cartItemId)}
                      variant="ghost"
                      color="gray.400"
                      _hover={{ color: 'red.400', bg: 'red.900' }}
                      borderRadius="md"
                    />
                    <VStack align="end" spacing={0}>
                      <Text 
                        color="white" 
                        fontWeight="800" 
                        fontSize={{ base: "lg", md: "xl" }}
                        fontFamily="mono"
                      >
                        ${item.price * item.quantity}
                      </Text>
                      {item.quantity > 1 && (
                        <Text color="gray.500" fontSize="xs">
                          ${item.price} each
                        </Text>
                      )}
                    </VStack>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>

          <Divider borderColor="whiteAlpha.200" />

          {/* Cart Summary */}
          <Box
            p={6}
            bg="rgba(255, 255, 255, 0.02)"
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <VStack spacing={4}>
              <HStack justify="space-between" width="100%">
                <Text color="gray.400" fontSize="md">
                  Subtotal
                </Text>
                <Text color="white" fontSize="lg" fontWeight="600">
                  ${getCartTotal()}
                </Text>
              </HStack>
              
              <HStack justify="space-between" width="100%">
                <Text color="gray.400" fontSize="md">
                  Shipping
                </Text>
                <Text color="#39FF14" fontSize="md" fontWeight="600">
                  FREE
                </Text>
              </HStack>
              
              <Divider borderColor="whiteAlpha.200" />
              
              <HStack justify="space-between" width="100%">
                <Text color="white" fontSize="xl" fontWeight="700">
                  Total
                </Text>
                <Text 
                  color="#39FF14" 
                  fontSize="2xl" 
                  fontWeight="800"
                  fontFamily="mono"
                >
                  ${getCartTotal()}
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Action Buttons */}
          <VStack spacing={3}>
            <Button
              width="100%"
              size="lg"
              height="56px"
              bg="#39FF14"
              color="black"
              fontWeight="700"
              fontSize="md"
              rightIcon={<FiArrowRight />}
              onClick={() => navigate('/checkout/')}
              borderRadius="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(57, 255, 20, 0.4)'
              }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.3s"
            >
              Proceed to Checkout
            </Button>
            
            <Button
              width="100%"
              variant="ghost"
              color="gray.400"
              onClick={() => navigate('/')}
              _hover={{ color: 'white', bg: 'whiteAlpha.50' }}
            >
              Continue Shopping
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Cart;
