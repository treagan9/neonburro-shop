import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  Divider,
  Box
} from '@chakra-ui/react';
import { FiMinus, FiPlus, FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen, cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={() => setIsOpen(false)} size="md">
      <DrawerOverlay />
      <DrawerContent bg="rgba(10, 10, 10, 0.95)" backdropFilter="blur(20px)">
        <DrawerCloseButton color="white" />
        <DrawerHeader color="white">
          <HStack spacing={2}>
            <FiShoppingBag />
            <Text>Your Cart ({cart.length})</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          {cart.length === 0 ? (
            <VStack spacing={8} justify="center" height="100%">
              <Text fontSize="6xl">🛒</Text>
              <Text color="gray.400">Your cart is empty</Text>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/');
                }}
                variant="outline"
                colorScheme="whiteAlpha"
              >
                Continue Shopping
              </Button>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              {cart.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  bg="whiteAlpha.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <HStack justify="space-between" mb={2}>
                    <Text color="white" fontWeight="600" fontSize="sm">
                      {item.name}
                    </Text>
                    <IconButton
                      size="xs"
                      icon={<FiX />}
                      onClick={() => removeFromCart(item.id)}
                      variant="ghost"
                      colorScheme="red"
                    />
                  </HStack>
                  
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <IconButton
                        size="xs"
                        icon={<FiMinus />}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        variant="outline"
                        colorScheme="whiteAlpha"
                      />
                      <Text color="white" fontSize="sm" minW="30px" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        size="xs"
                        icon={<FiPlus />}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        variant="outline"
                        colorScheme="whiteAlpha"
                      />
                    </HStack>
                    <Text color={item.color} fontWeight="700">
                      ${item.price * item.quantity}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {cart.length > 0 && (
          <DrawerFooter borderTop="1px solid" borderColor="whiteAlpha.100">
            <VStack width="100%" spacing={4}>
              <HStack justify="space-between" width="100%">
                <Text color="white" fontSize="lg" fontWeight="700">Total</Text>
                <Text color="#39FF14" fontSize="xl" fontWeight="800">
                  ${getCartTotal()}
                </Text>
              </HStack>
              
              <HStack width="100%" spacing={3}>
                <Button
                  flex={1}
                  variant="outline"
                  colorScheme="whiteAlpha"
                  onClick={handleViewCart}
                >
                  View Cart
                </Button>
                <Button
                  flex={1}
                  bg="#39FF14"
                  color="black"
                  fontWeight="700"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
