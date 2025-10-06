import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Link,
  useToast
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiCreditCard, FiLock, FiAlertCircle } from 'react-icons/fi';
import { 
  useStripe, 
  useElements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement,
  PaymentRequestButtonElement 
} from '@stripe/react-stripe-js';

const MotionBox = motion(Box);

const CheckoutForm = ({ onSubmit, isProcessing, cart, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });
  
  const [paymentMethodType, setPaymentMethodType] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const agreeToTermsRef = useRef(agreeToTerms);
  
  useEffect(() => {
    agreeToTermsRef.current = agreeToTerms;
  }, [agreeToTerms]);

  const colors = {
    teal: '#00E5E5',
    green: '#39FF14',
    copper: '#FF6B35'
  };

  const stripeElementStyles = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        '::placeholder': { 
          color: '#6B7280',
          fontWeight: '400'
        },
        iconColor: colors.teal,
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
  };

  // Setup Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !cart.length || paymentRequest) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Neon Burro Shop',
        amount: Math.round(total * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);

        pr.on('paymentmethod', async (ev) => {
          if (!agreeToTermsRef.current) {
            ev.complete('fail');
            setTermsError(true);
            toast({
              title: 'Terms Required',
              description: 'Please accept the terms to continue',
              status: 'error',
              duration: 4000,
            });
            return;
          }

          setIsLoading(true);
          
          try {
            const response = await fetch('/.netlify/functions/create-payment-intent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'shop',
                amount: total,
                customerEmail: ev.payerEmail,
                items: cart.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  selectedSize: item.selectedSize || null,
                  selectedDesign: item.selectedDesign || null,
                  selectedTier: item.selectedTier || null,
                  stripePriceId: item.stripePriceId
                }))
              }),
            });

            const { clientSecret, error } = await response.json();
            if (error) throw new Error(error);

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
              clientSecret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );

            if (confirmError) {
              ev.complete('fail');
              throw new Error(confirmError.message);
            }

            ev.complete('success');
            
            if (paymentIntent.status === 'requires_action') {
              const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
              if (actionError) throw new Error(actionError.message);
            }
            
            onSubmit({
              ...formData,
              email: ev.payerEmail,
              phone: ev.payerPhone || '',
              paymentMethod: 'digital_wallet',
              paymentIntentId: paymentIntent.id
            });
          } catch (error) {
            ev.complete('fail');
            toast({
              title: 'Payment failed',
              description: error.message,
              status: 'error',
              duration: 5000,
            });
            setIsLoading(false);
          }
        });
      }
    });
  }, [stripe, cart, total, onSubmit, toast]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    if (!agreeToTerms) {
      setTermsError(true);
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms to continue',
        status: 'error',
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'shop',
          amount: total,
          customerEmail: formData.email,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize || null,
            selectedDesign: item.selectedDesign || null,
            selectedTier: item.selectedTier || null,
            stripePriceId: item.stripePriceId
          }))
        }),
      });

      const { clientSecret, error } = await response.json();
      if (error) throw new Error(error);

      const cardElement = elements.getElement(CardNumberElement);
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zip,
              country: 'US',
            },
          },
        },
      });

      if (paymentError) throw new Error(paymentError.message);

      if (paymentIntent.status === 'succeeded') {
        onSubmit({
          ...formData,
          paymentMethod: 'card',
          paymentIntentId: paymentIntent.id
        });
      }
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputStyles = {
    bg: 'rgba(255, 255, 255, 0.02)',
    border: '2px solid',
    borderColor: 'whiteAlpha.200',
    color: 'white',
    _hover: { borderColor: 'whiteAlpha.300' },
    _focus: { 
      borderColor: colors.teal, 
      boxShadow: `0 0 0 1px ${colors.teal}` 
    }
  };

  return (
    <Box
      p={{ base: 6, md: 8 }}
      bg="rgba(255, 255, 255, 0.02)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
            Contact & Shipping
          </Text>
          <VStack spacing={4}>
            <HStack spacing={4} width="100%">
              <FormControl isRequired>
                <FormLabel color="gray.400" fontSize="sm">First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  size="lg"
                  {...inputStyles}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel color="gray.400" fontSize="sm">Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  size="lg"
                  {...inputStyles}
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                size="lg"
                {...inputStyles}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.400" fontSize="sm">Phone</FormLabel>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                size="lg"
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">Address</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                size="lg"
                {...inputStyles}
              />
            </FormControl>

            <HStack spacing={4} width="100%">
              <FormControl isRequired flex={2}>
                <FormLabel color="gray.400" fontSize="sm">City</FormLabel>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Denver"
                  size="lg"
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired flex={1}>
                <FormLabel color="gray.400" fontSize="sm">State</FormLabel>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="CO"
                  size="lg"
                  maxLength={2}
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired flex={1}>
                <FormLabel color="gray.400" fontSize="sm">ZIP</FormLabel>
                <Input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="80202"
                  size="lg"
                  {...inputStyles}
                />
              </FormControl>
            </HStack>
          </VStack>
        </Box>

        <Box>
          <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
            Payment Method
          </Text>
          
          <RadioGroup value={paymentMethodType} onChange={setPaymentMethodType}>
            <VStack spacing={3} align="stretch">
              <Box
                p={4}
                borderRadius="lg"
                border="2px solid"
                borderColor={paymentMethodType === 'card' ? colors.teal : 'whiteAlpha.200'}
                bg={paymentMethodType === 'card' ? `${colors.teal}10` : 'transparent'}
                cursor="pointer"
                onClick={() => setPaymentMethodType('card')}
                transition="all 0.2s"
                boxShadow={paymentMethodType === 'card' ? `0 0 20px ${colors.teal}30` : 'none'}
              >
                <HStack spacing={4}>
                  <Radio value="card" colorScheme="cyan" />
                  <FiCreditCard color={paymentMethodType === 'card' ? colors.teal : '#9CA3AF'} />
                  <Text color="white" fontWeight="600">Credit / Debit Card</Text>
                </HStack>
              </Box>

              {canMakePayment && (
                <Box
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={paymentMethodType === 'wallet' ? colors.green : 'whiteAlpha.200'}
                  bg={paymentMethodType === 'wallet' ? `${colors.green}10` : 'transparent'}
                  cursor="pointer"
                  onClick={() => setPaymentMethodType('wallet')}
                  transition="all 0.2s"
                  boxShadow={paymentMethodType === 'wallet' ? `0 0 20px ${colors.green}30` : 'none'}
                >
                  <HStack spacing={4}>
                    <Radio value="wallet" colorScheme="cyan" />
                    <Text color="white" fontWeight="600">Apple Pay / Google Pay</Text>
                  </HStack>
                </Box>
              )}
            </VStack>
          </RadioGroup>
        </Box>

        {paymentMethodType === 'card' && (
          <VStack spacing={4} align="stretch">
            <FormLabel color="gray.400" fontSize="sm" mb={0}>Card Information</FormLabel>
            
            <Box
              p={4}
              bg="rgba(255, 255, 255, 0.02)"
              border="2px solid"
              borderColor="whiteAlpha.200"
              borderRadius="lg"
              minH="56px"
              display="flex"
              alignItems="center"
              transition="all 0.2s"
              _hover={{ 
                borderColor: colors.teal,
                boxShadow: `0 0 15px ${colors.teal}20`
              }}
              _focusWithin={{ 
                borderColor: colors.teal,
                boxShadow: `0 0 20px ${colors.teal}40, 0 0 0 1px ${colors.teal}`
              }}
            >
              <Box width="100%">
                <CardNumberElement options={stripeElementStyles} />
              </Box>
            </Box>
            
            <HStack spacing={4}>
              <Box
                flex={1}
                p={4}
                bg="rgba(255, 255, 255, 0.02)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                borderRadius="lg"
                minH="56px"
                display="flex"
                alignItems="center"
                transition="all 0.2s"
                _hover={{ 
                  borderColor: colors.teal,
                  boxShadow: `0 0 15px ${colors.teal}20`
                }}
                _focusWithin={{ 
                  borderColor: colors.teal,
                  boxShadow: `0 0 20px ${colors.teal}40, 0 0 0 1px ${colors.teal}`
                }}
              >
                <Box width="100%">
                  <CardExpiryElement options={stripeElementStyles} />
                </Box>
              </Box>
              
              <Box
                flex={1}
                p={4}
                bg="rgba(255, 255, 255, 0.02)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                borderRadius="lg"
                minH="56px"
                display="flex"
                alignItems="center"
                transition="all 0.2s"
                _hover={{ 
                  borderColor: colors.teal,
                  boxShadow: `0 0 15px ${colors.teal}20`
                }}
                _focusWithin={{ 
                  borderColor: colors.teal,
                  boxShadow: `0 0 20px ${colors.teal}40, 0 0 0 1px ${colors.teal}`
                }}
              >
                <Box width="100%">
                  <CardCvcElement options={stripeElementStyles} />
                </Box>
              </Box>
            </HStack>
          </VStack>
        )}

        <Box id="terms-section">
          <Box
            p={4}
            bg={termsError && !agreeToTerms ? `${colors.copper}10` : "transparent"}
            border="2px solid"
            borderColor={termsError && !agreeToTerms ? colors.copper : "transparent"}
            borderRadius="lg"
            transition="all 0.2s"
          >
            <Checkbox
              isChecked={agreeToTerms}
              onChange={(e) => {
                setAgreeToTerms(e.target.checked);
                if (termsError) setTermsError(false);
              }}
              size="lg"
              colorScheme="cyan"
              iconColor={colors.green}
              sx={{
                '.chakra-checkbox__control': {
                  borderColor: agreeToTerms ? colors.teal : 'whiteAlpha.300',
                  bg: agreeToTerms ? colors.teal : 'transparent',
                  _checked: {
                    bg: colors.teal,
                    borderColor: colors.teal,
                  }
                }
              }}
            >
              <Text color="gray.300" fontSize="sm">
                I agree to{' '}
                <Link href="https://neonburro.com/terms/" color={colors.teal} isExternal fontWeight="600">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="https://neonburro.com/privacy/" color={colors.teal} isExternal fontWeight="600">
                  Privacy Policy
                </Link>
              </Text>
            </Checkbox>
          </Box>
          
          <AnimatePresence>
            {termsError && !agreeToTerms && (
              <MotionBox
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                mt={3}
              >
                <HStack spacing={2} justify="center">
                  <FiAlertCircle color={colors.copper} size={16} />
                  <Text color={colors.copper} fontSize="sm" fontWeight="600">
                    Please accept the terms to continue
                  </Text>
                </HStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {paymentMethodType === 'wallet' && canMakePayment && paymentRequest && (
          <Box position="relative">
            {!agreeToTerms && (
              <Box
                position="absolute"
                inset={0}
                zIndex={2}
                cursor="not-allowed"
                onClick={() => setTermsError(true)}
              />
            )}
            
            <Box 
              p={1}
              borderRadius="lg"
              border="3px solid"
              borderColor={agreeToTerms ? colors.green : 'whiteAlpha.300'}
              bg={agreeToTerms ? `${colors.green}08` : 'transparent'}
              filter={!agreeToTerms ? 'grayscale(50%) opacity(0.5)' : 'none'}
              pointerEvents={agreeToTerms ? 'auto' : 'none'}
              transition="all 0.3s"
              boxShadow={agreeToTerms ? `0 0 25px ${colors.green}30, inset 0 0 15px ${colors.green}10` : 'none'}
              _hover={agreeToTerms ? {
                boxShadow: `0 0 35px ${colors.green}40, inset 0 0 20px ${colors.green}15`
              } : {}}
            >
              <PaymentRequestButtonElement 
                options={{
                  paymentRequest,
                  style: {
                    paymentRequestButton: {
                      type: 'default',
                      theme: 'dark',
                      height: '56px',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        )}

        {paymentMethodType === 'card' && (
          <Button
            onClick={handleCardPayment}
            size="lg"
            bg={colors.green}
            color="black"
            width="100%"
            isLoading={isLoading}
            loadingText="Processing..."
            fontWeight="800"
            borderRadius="full"
            height="56px"
            leftIcon={<FiLock />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: `0 15px 50px ${colors.green}40`
            }}
            _active={{
              transform: 'translateY(0)'
            }}
            transition="all 0.3s"
          >
            Complete Payment · ${total}
          </Button>
        )}

        <HStack justify="center" spacing={2}>
          <FiLock size={14} color="#6B7280" />
          <Text color="gray.400" fontSize="xs">
            Secure checkout powered by Stripe
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CheckoutForm;
