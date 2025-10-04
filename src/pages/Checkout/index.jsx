import { Box, Container, Grid, GridItem, VStack, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import CheckoutSuccess from './components/CheckoutSuccess';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [orderData, setOrderData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (cart.length === 0 && step === 'form') {
      navigate('/cart/');
    }
  }, [cart, step, navigate]);

  const handleCheckoutSubmit = async (formData) => {
    setStep('processing');

    try {
      // Prepare order data for Netlify form submission
      const orderDetails = {
        'form-name': 'shop-order',
        ...formData,
        items: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize
        }))),
        total: getCartTotal(),
        timestamp: new Date().toISOString()
      };

      // Submit to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(orderDetails).toString()
      });

      // Save order data for success page
      setOrderData({
        orderNumber: `NB-${Date.now()}`,
        email: formData.email,
        total: getCartTotal(),
        items: [...cart]
      });

      // Clear cart
      clearCart();
      
      // Show success
      setStep('success');
      
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your order.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      setStep('form');
      toast({
        title: 'Order Failed',
        description: 'There was an error processing your order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (step === 'success' && orderData) {
    return <CheckoutSuccess orderData={orderData} />;
  }

  return (
    <Box minH="100vh" bg="#0A0A0A" pt="100px" pb={20}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <VStack spacing={8} mb={8}>
          <VStack spacing={2} textAlign="center">
            <Heading 
              color="white" 
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="800"
            >
              Checkout
            </Heading>
            <Text color="gray.400" fontSize="md">
              Complete your order
            </Text>
          </VStack>
        </VStack>

        <Grid
          templateColumns={{ base: '1fr', lg: '1.5fr 1fr' }}
          gap={8}
          alignItems="start"
        >
          {/* Checkout Form */}
          <GridItem>
            <CheckoutForm 
              onSubmit={handleCheckoutSubmit}
              isProcessing={step === 'processing'}
            />
          </GridItem>

          {/* Order Summary */}
          <GridItem>
            <Box
              position={{ base: 'relative', lg: 'sticky' }}
              top={{ lg: '100px' }}
            >
              <OrderSummary cart={cart} total={getCartTotal()} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
