// src/pages/Invoice/components/PaymentForm.jsx
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Input, 
  Button, 
  Heading,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  Grid,
  GridItem,
  Container,
  Tooltip,
  useToast,
  Divider,
  Spinner,
  Link,
  List,
  ListItem,
  ListIcon,
  Badge,
  Image
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  FiCreditCard, 
  FiLink, 
  FiArrowLeft, 
  FiInfo, 
  FiCheck, 
  FiClock, 
  FiShield,
  FiZap,
  FiGlobe,
  FiHeadphones,
  FiCode,
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { 
  useStripe, 
  useElements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement,
  PaymentRequestButtonElement 
} from '@stripe/react-stripe-js';

const MotionBox = motion(Box);

const PaymentForm = ({ projectData, onSuccess, onBack, sessionId, onTrackEvent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  
  // Form state
  const [email, setEmail] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const agreeToTermsRef = useRef(agreeToTerms);
  
  // Update ref when agreeToTerms changes
  useEffect(() => {
    agreeToTermsRef.current = agreeToTerms;
  }, [agreeToTerms]);

  // CRITICAL: Add null check here before any usage of projectData
  if (!projectData) {
    return (
      <Container maxW="1200px" mx="auto" py={8}>
        <Box textAlign="center" py={20}>
          <Spinner size="xl" color="cyan.500" />
          <Text color="gray.400" mt={4}>Loading payment information...</Text>
        </Box>
      </Container>
    );
  }

  // Colors matching your theme
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' },
    copper: '#FF6B35',
    vip: { primary: '#D4AF37' }
  };

  // Stripe Element styling
  const stripeElementStyles = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '52px',
        '::placeholder': {
          color: '#6B7280',
        },
        iconColor: '#9CA3AF',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
      complete: {
        color: '#10B981',
        iconColor: '#10B981',
      }
    },
  };

  // Simplified tracking function
  const trackPayment = (action, status, paymentMethod, additionalData = {}) => {
    if (!onTrackEvent) return;

    // Ensure all data is properly formatted as strings
    const trackingData = {
      sessionId: sessionId || '',
      timestamp: new Date().toISOString(),
      action: action,
      paymentStatus: status,
      
      // Customer info
      firstName: String(projectData?.firstName || ''),
      projectName: String(projectData?.projectName || ''),
      email: String(additionalData.email || email || ''),
      phone: String(additionalData.phone || phone || ''),
      clientType: String(projectData?.clientType || ''),
      
      // Package details
      packageType: String(projectData?.packageType || ''),
      packageName: String(projectData?.packageName || ''),
      hours: String(projectData?.hours || ''),
      total: String(projectData?.total || 0),
      isServicePackage: String(projectData?.isServicePackage || 'false'),
      isVip: String(projectData?.isVip || 'false'),
      wantsHostingDetails: String(projectData?.wantsHostingDetails || 'false'),
      
      // Payment info
      paymentMethod: String(paymentMethod || ''),
      paymentIntentId: String(additionalData.paymentIntentId || ''),
      
      // Billing info (only for card payments)
      ...(paymentMethod === 'card' && {
        cardholderName: String(cardholderName || ''),
        address: String(address || ''),
        city: String(city || ''),
        state: String(state || ''),
        zip: String(zip || ''),
        country: String(country || '')
      })
    };

    onTrackEvent('payment-complete', trackingData);
  };

  // Setup Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !projectData) return;
    if (paymentRequest) return;

    const createPaymentRequest = async () => {
      try {
        const label = projectData?.isServicePackage === 'true'
          ? `Neon Burro - ${projectData?.packageName || 'Package'}`
          : `Neon Burro - ${projectData?.hours || 0} hours`;

        const pr = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {
            label: label,
            amount: Math.round((parseInt(projectData?.total) || 0) * 100), // Convert to cents
          },
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: true,
        });

        const canMakePaymentResult = await pr.canMakePayment();
        
        if (canMakePaymentResult) {
          setPaymentRequest(pr);
          setCanMakePayment(true);

          pr.on('paymentmethod', async (ev) => {
            if (!agreeToTermsRef.current) {
              ev.complete('fail');
              setTermsError(true);
              toast({
                title: 'Terms Required',
                description: 'Please accept the terms to continue with payment',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
              });
              return;
            }

            setIsLoading(true);
            trackPayment('payment-attempt', 'attempting', 'apple_pay', {
              email: ev.payerEmail,
              phone: ev.payerPhone
            });
            
            try {
              const response = await fetch('/.netlify/functions/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  amount: parseInt(projectData?.total) || 0,
                  firstName: projectData?.firstName || '',
                  projectName: projectData?.projectName || '',
                  hours: parseInt(projectData?.hours) || 0,
                }),
              });

              const { clientSecret, error } = await response.json();

              if (error) {
                throw new Error(error);
              }

              const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: ev.paymentMethod.id },
                { handleActions: false }
              );

              if (confirmError) {
                ev.complete('fail');
                throw new Error(confirmError.message);
              } else {
                ev.complete('success');
                
                if (paymentIntent.status === 'requires_action') {
                  const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
                  if (actionError) {
                    throw new Error(actionError.message);
                  }
                }
                
                // Track successful payment
                trackPayment('payment-success', 'succeeded', 'apple_pay', {
                  email: ev.payerEmail,
                  phone: ev.payerPhone,
                  paymentIntentId: paymentIntent.id
                });
                
                // Pass complete data to success handler
                onSuccess({
                  ...projectData,
                  paymentMethod: 'apple_pay',
                  email: ev.payerEmail || '',
                  phone: ev.payerPhone || '',
                  paymentIntentId: paymentIntent.id
                });
              }
            } catch (error) {
              ev.complete('fail');
              trackPayment('payment-error', 'failed', 'apple_pay', {
                email: ev.payerEmail
              });
              toast({
                title: 'Payment failed',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } finally {
              setIsLoading(false);
            }
          });

          pr.on('cancel', () => {
            setIsLoading(false);
          });
        } else {
          setCanMakePayment(false);
        }
      } catch (error) {
        console.error('Error creating payment request:', error);
        setCanMakePayment(false);
      }
    };

    createPaymentRequest();
  }, [stripe, projectData, onSuccess, toast, onTrackEvent, sessionId]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    // Validate required fields
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!agreeToTerms) {
      setTermsError(true);
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms to continue with payment',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setTimeout(() => {
        document.getElementById('terms-section')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
      return;
    }

    // Track payment attempt
    trackPayment('payment-attempt', 'attempting', 'card');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseInt(projectData?.total) || 0,
          firstName: projectData?.firstName || '',
          projectName: projectData?.projectName || '',
          hours: parseInt(projectData?.hours) || 0,
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const cardElement = elements.getElement(CardNumberElement);
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: email,
            phone: phone,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: zip,
              country: country,
            },
          },
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Track successful payment
        trackPayment('payment-success', 'succeeded', 'card', {
          paymentIntentId: paymentIntent.id
        });

        // Pass complete data to success handler
        onSuccess({
          ...projectData,
          paymentMethod: 'card',
          email: email,
          phone: phone || '',
          paymentIntentId: paymentIntent.id,
          cardholderName: cardholderName,
          address: address,
          city: city,
          state: state,
          zip: zip
        });
      }
    } catch (error) {
      trackPayment('payment-error', 'failed', 'card');
      toast({
        title: 'Payment failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // What's included list based on package or hours
  const getIncludedItems = () => {
    if (projectData?.isServicePackage === 'true') {
      const packageFeatures = {
        'Spark': [
          { icon: FiZap, text: 'Complete website development', highlight: true },
          { icon: FiGlobe, text: 'Blazing-fast CDN hosting included' },
          { icon: FiCode, text: 'Custom design & branding' },
          { icon: FiShield, text: 'SSL certificate & security' },
          { icon: FiHeadphones, text: 'Lifetime support & updates' }
        ],
        'Ignite': [
          { icon: FiZap, text: 'Everything in Spark, plus:', highlight: true },
          { icon: FiCode, text: 'Advanced integrations & analytics' },
          { icon: FiGlobe, text: 'Content management system' },
          { icon: FiShield, text: 'Performance optimization' },
          { icon: FiHeadphones, text: 'Priority support queue' }
        ],
        'Burro': [
          { icon: FiZap, text: 'Everything in Ignite, plus:', highlight: true },
          { icon: FiCode, text: 'Custom functionality & features' },
          { icon: FiGlobe, text: 'E-commerce capabilities' },
          { icon: FiShield, text: 'Advanced automation' },
          { icon: FiHeadphones, text: 'White-glove service' }
        ],
        'VIP': [
          { icon: FiZap, text: 'Everything in Burro, plus:', highlight: true },
          { icon: FiCode, text: 'Dedicated core team for your project' },
          { icon: FiGlobe, text: 'Direct access to founders' },
          { icon: FiShield, text: 'Weekly strategy sessions' },
          { icon: FiHeadphones, text: 'VIP lifetime support tier' }
        ]
      };
      return packageFeatures[projectData.packageName] || [];
    } else {
      // For hourly packages
      const hours = parseInt(projectData.hours);
      const features = [
        { icon: FiClock, text: `${hours} hours of expert development`, highlight: true },
        { icon: FiCode, text: 'Full-stack implementation' },
        { icon: FiZap, text: 'Agile development sprints' },
        { icon: FiShield, text: 'Code reviews & best practices' }
      ];
      
      if (hours >= 40) {
        features.push({ icon: FiHeadphones, text: 'Priority support included' });
      }
      
      return features;
    }
  };

  const includedItems = getIncludedItems();
  const isVip = projectData?.isVip === 'true';

  return (
    <Container maxW="1200px" mx="auto" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <VStack spacing={2} textAlign="center" mb={12}>
          <Heading 
            size={{ base: "2xl", md: "3xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Complete Your Payment
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            Secure checkout powered by Stripe
          </Text>
        </VStack>

        {/* Two-Column Layout */}
        <Grid 
          templateColumns={{ base: "1fr", lg: "420px 600px" }} 
          gap={{ base: 8, lg: 12 }}
          alignItems="start"
          justifyContent="center"
          mx="auto"
          maxW="1100px"
        >
          
          {/* Left Column - Enhanced Order Summary */}
          <GridItem>
            <Box
              position={{ base: "relative", lg: "sticky" }}
              top={{ base: "0", lg: "100px" }}
            >
              {/* Main Order Card */}
              <Box
                p={8}
                bg="rgba(10, 10, 10, 0.95)"
                backdropFilter="blur(20px)"
                border="1.5px solid"
                borderColor={isVip ? 'rgba(212, 175, 55, 0.3)' : 'whiteAlpha.200'}
                borderRadius="xl"
                boxShadow={isVip 
                  ? '0 20px 40px rgba(212, 175, 55, 0.2)'
                  : '0 20px 40px rgba(0,0,0,0.6)'
                }
                mb={6}
              >
                {/* Project Header */}
                <VStack align="stretch" spacing={4} mb={6}>
                  <HStack justify="space-between" align="start">
                    <Box>
                      <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider" mb={1}>
                        {projectData?.isServicePackage === 'true' ? 'PACKAGE' : 'PROJECT'}
                      </Text>
                      <Text color="white" fontSize="xl" fontWeight="700">
                        {projectData?.projectName || 'Project'}
                      </Text>
                    </Box>
                    {projectData?.isServicePackage === 'true' && (
                      <Badge
                        bg={isVip ? '#D4AF37' : colors.brand.primary}
                        color="black"
                        fontSize="xs"
                        fontWeight="800"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {projectData.packageName}
                      </Badge>
                    )}
                  </HStack>
                  
                  <Box
                    p={4}
                    bg={isVip ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0, 255, 255, 0.05)'}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={isVip ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 255, 255, 0.2)'}
                  >
                    <HStack justify="space-between">
                      <Text color="gray.300" fontSize="sm">
                        {projectData?.isServicePackage === 'true' 
                          ? `${projectData.packageName} Package`
                          : `${projectData.hours} Development Hours`
                        }
                      </Text>
                      <Text color={isVip ? '#D4AF37' : colors.brand.primary} fontSize="lg" fontWeight="700">
                        ${projectData?.total || 0}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>

                <Divider borderColor="whiteAlpha.100" mb={6} />

                {/* What's Included */}
                <Box mb={6}>
                  <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider" mb={3}>
                    WHAT'S INCLUDED
                  </Text>
                  <List spacing={3}>
                    {includedItems.map((item, idx) => (
                      <ListItem key={idx} fontSize="sm" color={item.highlight ? 'white' : 'gray.300'}>
                        <ListIcon 
                          as={item.icon} 
                          color={item.highlight ? colors.accent.green : 'gray.500'} 
                          fontSize="md"
                        />
                        {item.text}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider borderColor="whiteAlpha.100" mb={6} />

                {/* Price Breakdown */}
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.400" fontSize="sm">Subtotal</Text>
                    <Text color="gray.300">${projectData?.total || 0}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.400" fontSize="sm">Tax</Text>
                    <Text color="gray.300">$0</Text>
                  </HStack>
                  <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={4}>
                    <HStack justify="space-between">
                      <Text color="white" fontWeight="700" fontSize="lg">
                        Total Due Today
                      </Text>
                      <Text 
                        color={colors.accent.green} 
                        fontWeight="800" 
                        fontSize="2xl"
                        filter={`drop-shadow(0 0 10px ${colors.accent.green}66)`}
                      >
                        ${projectData?.total || 0}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              {/* Security Badge */}
              <Box
                p={4}
                bg="rgba(57, 255, 20, 0.05)"
                border="1px solid"
                borderColor="rgba(57, 255, 20, 0.2)"
                borderRadius="xl"
                textAlign="center"
              >
                <HStack justify="center" spacing={3}>
                  <Box color={colors.accent.green}>
                    <FiLock size={20} />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text color="white" fontSize="sm" fontWeight="600">
                      Secure Payment
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      256-bit SSL encryption
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </GridItem>

          {/* Right Column - Payment Form */}
          <GridItem>
            <form onSubmit={(e) => e.preventDefault()}>
              <VStack spacing={6} align="stretch">
                
                {/* Contact Information */}
                <Box>
                  <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
                    Contact information
                  </Text>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.15)"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ 
                      borderColor: 'rgba(255, 255, 255, 0.25)',
                      bg: 'rgba(255, 255, 255, 0.08)'
                    }}
                    _focus={{ 
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      boxShadow: 'none',
                      bg: 'rgba(255, 255, 255, 0.08)'
                    }}
                    borderRadius="lg"
                    height="52px"
                    fontSize="16px"
                    required
                    autoComplete="email"
                    name="email"
                    id="email"
                  />
                </Box>

                {/* Payment Method */}
                <Box>
                  <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
                    Payment method
                  </Text>
                  
                  <RadioGroup 
                    value={paymentMethodType} 
                    onChange={(value) => setPaymentMethodType(value)}
                  >
                    <VStack spacing={3} align="stretch">
                      
                      {/* Card Option */}
                      <Box
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                        bg={paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.03)' : 'transparent'}
                        cursor="pointer"
                        onClick={() => setPaymentMethodType('card')}
                        transition="all 0.2s"
                        _hover={{
                          borderColor: paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <HStack spacing={4}>
                          <Radio 
                            value="card" 
                            colorScheme="cyan"
                            size="lg"
                            borderColor="gray.500"
                            _checked={{
                              bg: colors.brand.primary,
                              borderColor: colors.brand.primary,
                              _before: {
                                content: '""',
                                display: 'inline-block',
                                position: 'relative',
                                width: '50%',
                                height: '50%',
                                borderRadius: '50%',
                                bg: 'black',
                              }
                            }}
                          />
                          <FiCreditCard size={20} color={paymentMethodType === 'card' ? colors.brand.primary : '#9CA3AF'} />
                          <Text color="white" fontWeight="600" fontSize="16px">Card</Text>
                          <Box ml="auto">
                            <HStack spacing={2}>
                              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" h="20px" w="32px" objectFit="contain" />
                              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" h="20px" w="32px" objectFit="contain" />
                              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" h="20px" w="32px" objectFit="contain" />
                              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" h="20px" w="32px" objectFit="contain" />
                            </HStack>
                          </Box>
                        </HStack>
                      </Box>

                      {/* Apple Pay Option - Only show if available */}
                      {canMakePayment && (
                        <Box
                          p={4}
                          borderRadius="lg"
                          border="2px solid"
                          borderColor={paymentMethodType === 'apple' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                          bg={paymentMethodType === 'apple' ? 'rgba(0, 255, 255, 0.03)' : 'transparent'}
                          cursor="pointer"
                          onClick={() => setPaymentMethodType('apple')}
                          transition="all 0.2s"
                          _hover={{
                            borderColor: paymentMethodType === 'apple' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          <HStack spacing={4}>
                            <Radio 
                              value="apple" 
                              colorScheme="cyan"
                              size="lg"
                              borderColor="gray.500"
                              _checked={{
                                bg: colors.brand.primary,
                                borderColor: colors.brand.primary,
                                _before: {
                                  content: '""',
                                  display: 'inline-block',
                                  position: 'relative',
                                  width: '50%',
                                  height: '50%',
                                  borderRadius: '50%',
                                  bg: 'black',
                                }
                              }}
                            />
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" h="20px" w="20px" />
                            <Text color="white" fontWeight="600" fontSize="16px">Apple Pay</Text>
                          </HStack>
                        </Box>
                      )}

                    </VStack>
                  </RadioGroup>

                  {/* Show message for Apple Pay */}
                  {paymentMethodType === 'apple' && (
                    <Box mt={4} p={4} bg="rgba(255, 255, 255, 0.03)" borderRadius="lg">
                      <Text color="gray.400" fontSize="sm">
                        Another step will appear after submitting your order to complete your purchase details.
                      </Text>
                    </Box>
                  )}
                </Box>

                {/* Card Details - Show only when card is selected */}
                {paymentMethodType === 'card' && (
                  <VStack spacing={5} align="stretch">
                    {/* Card Information */}
                    <Box>
                      <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                        Card information
                      </Text>
                      
                      {/* Card Number */}
                      <Box
                        p={4}
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.15)"
                        borderRadius="lg"
                        borderBottomRadius={0}
                        minH="52px"
                        display="flex"
                        alignItems="center"
                        _hover={{ 
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                          bg: 'rgba(255, 255, 255, 0.08)'
                        }}
                        _focusWithin={{ 
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                          bg: 'rgba(255, 255, 255, 0.08)'
                        }}
                        transition="all 0.2s"
                      >
                        <Box width="100%">
                          <CardNumberElement options={stripeElementStyles} />
                        </Box>
                      </Box>
                      
                      {/* Expiry & CVC */}
                      <HStack spacing={0}>
                        <Box
                          p={4}
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          borderRadius="lg"
                          borderTopRadius={0}
                          borderRightWidth={0}
                          flex={1}
                          minH="52px"
                          display="flex"
                          alignItems="center"
                          _hover={{ 
                            borderColor: 'rgba(255, 255, 255, 0.25)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          _focusWithin={{ 
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          transition="all 0.2s"
                        >
                          <Box width="100%">
                            <CardExpiryElement options={stripeElementStyles} />
                          </Box>
                        </Box>
                        <Box
                          p={4}
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          borderRadius="lg"
                          borderTopRadius={0}
                          flex={1}
                          minH="52px"
                          display="flex"
                          alignItems="center"
                          position="relative"
                          _hover={{ 
                            borderColor: 'rgba(255, 255, 255, 0.25)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          _focusWithin={{ 
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          transition="all 0.2s"
                        >
                          <Box width="100%">
                            <CardCvcElement options={stripeElementStyles} />
                          </Box>
                        </Box>
                      </HStack>
                    </Box>
                    
                    {/* Cardholder Name */}
                    <Box>
                      <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                        Cardholder name
                      </Text>
                      <Input
                        placeholder="Full name on card"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.15)"
                        color="white"
                        height="52px"
                        fontSize="16px"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ 
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                          bg: 'rgba(255, 255, 255, 0.08)'
                        }}
                        _focus={{ 
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                          boxShadow: 'none',
                          bg: 'rgba(255, 255, 255, 0.08)'
                        }}
                        borderRadius="lg"
                        required
                      />
                    </Box>
                    
                    {/* Billing Address */}
                    <Box>
                      <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                        Billing address
                      </Text>
                      <VStack spacing={4}>
                        <Select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          color="white"
                          height="52px"
                          fontSize="16px"
                          _hover={{ 
                            borderColor: 'rgba(255, 255, 255, 0.25)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          _focus={{ 
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            boxShadow: 'none',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          borderRadius="lg"
                          isDisabled
                        >
                          <option value="US">United States</option>
                        </Select>
                        
                        <Input
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          color="white"
                          height="52px"
                          fontSize="16px"
                          _placeholder={{ color: 'gray.500' }}
                          _hover={{ 
                            borderColor: 'rgba(255, 255, 255, 0.25)',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          _focus={{ 
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            boxShadow: 'none',
                            bg: 'rgba(255, 255, 255, 0.08)'
                          }}
                          borderRadius="lg"
                          required
                        />
                        
                        <Grid templateColumns={{ base: "1fr", md: "2.5fr 1fr 1.2fr" }} gap={3}>
                          <GridItem>
                            <Input
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              color="white"
                              height="52px"
                              fontSize="16px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ 
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              _focus={{ 
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                boxShadow: 'none',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              borderRadius="lg"
                              required
                            />
                          </GridItem>
                          
                          <GridItem>
                            <Input
                              placeholder="State"
                              value={state}
                              onChange={(e) => setState(e.target.value.toUpperCase())}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              color="white"
                              height="52px"
                              fontSize="16px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ 
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              _focus={{ 
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                boxShadow: 'none',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              borderRadius="lg"
                              required
                              maxLength={2}
                            />
                          </GridItem>
                          
                          <GridItem>
                            <Input
                              placeholder="ZIP"
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              color="white"
                              height="52px"
                              fontSize="16px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ 
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              _focus={{ 
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                boxShadow: 'none',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              borderRadius="lg"
                              required
                            />
                          </GridItem>
                        </Grid>
                        
                        <Text color="gray.500" fontSize="xs" mt={-2}>
                          Enter address manually
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                )}

                {/* Save info for faster checkout - Only show for card */}
                {paymentMethodType === 'card' && (
                  <Box
                    p={5}
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  >
                    <VStack align="stretch" spacing={4}>
                      <Text color="white" fontSize="md" fontWeight="600">
                        Save my information for faster checkout
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        Enter your phone number to create a Link account and pay faster on Neon Burro and everywhere Link is accepted.
                      </Text>
                      <HStack>
                        <Box flex={1}>
                          <Input
                            type="tel"
                            placeholder="(201) 555-0123"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            bg="rgba(255, 255, 255, 0.05)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.15)"
                            color="white"
                            height="48px"
                            fontSize="14px"
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{ 
                              borderColor: 'rgba(255, 255, 255, 0.25)',
                              bg: 'rgba(255, 255, 255, 0.08)'
                            }}
                            _focus={{ 
                              borderColor: 'rgba(255, 255, 255, 0.4)',
                              boxShadow: 'none',
                              bg: 'rgba(255, 255, 255, 0.08)'
                            }}
                            borderRadius="lg"
                          />
                        </Box>
                        <Text color="gray.500" fontSize="sm">Optional</Text>
                      </HStack>
                      <HStack justify="center">
                        <FiLink size={14} color="#6B7280" />
                        <Text color="gray.500" fontSize="xs">link</Text>
                      </HStack>
                    </VStack>
                  </Box>
                )}

                {/* Terms Checkbox - ABOVE Express Checkout */}
                <Box id="terms-section">
                  <Box
                    p={4}
                    bg={termsError && !agreeToTerms ? "rgba(255, 107, 53, 0.1)" : "transparent"}
                    border="2px solid"
                    borderColor={termsError && !agreeToTerms ? colors.copper : "transparent"}
                    borderRadius="lg"
                    transition="all 0.3s"
                    animation={termsError && !agreeToTerms ? "copperGlow 1.5s ease-in-out infinite" : undefined}
                    sx={{
                      '@keyframes copperGlow': {
                        '0%, 100%': { 
                          boxShadow: `0 0 10px ${colors.copper}40`,
                          borderColor: colors.copper
                        },
                        '50%': { 
                          boxShadow: `0 0 30px ${colors.copper}80, 0 0 60px ${colors.copper}40`,
                          borderColor: colors.copper
                        },
                      }
                    }}
                  >
                    <Checkbox
                      isChecked={agreeToTerms}
                      onChange={(e) => {
                        setAgreeToTerms(e.target.checked);
                        if (termsError) setTermsError(false);
                      }}
                      size="md"
                      colorScheme="green"
                      sx={{
                        '.chakra-checkbox__control': {
                          borderColor: termsError && !agreeToTerms ? colors.copper : 'rgba(255, 255, 255, 0.3)',
                          borderWidth: '2px',
                          _checked: {
                            bg: colors.accent.green,
                            borderColor: colors.accent.green,
                          }
                        }
                      }}
                    >
                      <Text color={termsError && !agreeToTerms ? "white" : "gray.400"} fontSize="sm" lineHeight="1.6">
                        I agree to Neon Burro's{' '}
                        <Link 
                          href="https://neonburro.com/terms/" 
                          color={colors.brand.primary} 
                          textDecoration="underline"
                          isExternal
                        >
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link 
                          href="https://neonburro.com/privacy/" 
                          color={colors.brand.primary} 
                          textDecoration="underline"
                          isExternal
                        >
                          Privacy Policy
                        </Link>
                        .
                      </Text>
                    </Checkbox>
                  </Box>
                  
                  {/* Error message */}
                  <AnimatePresence>
                    {termsError && !agreeToTerms && (
                      <MotionBox
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        mt={3}
                      >
                        <HStack spacing={2} justify="center">
                          <FiAlertCircle color={colors.copper} size={16} />
                          <Text 
                            color={colors.copper} 
                            fontSize="sm" 
                            fontWeight="600"
                            filter={`drop-shadow(0 0 8px ${colors.copper}66)`}
                          >
                            Please check the box to continue with payment
                          </Text>
                        </HStack>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </Box>

                {/* Express Checkout - Show when Apple Pay is selected and available */}
                {paymentMethodType === 'apple' && canMakePayment && paymentRequest && (
                  <Box>
                    <Box
                      position="relative"
                      filter={!agreeToTerms ? 'grayscale(50%)' : 'none'}
                      transition="all 0.3s"
                    >
                      {/* Invisible overlay when disabled */}
                      {!agreeToTerms && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          zIndex={1}
                          cursor="not-allowed"
                          onClick={() => {
                            setTermsError(true);
                            document.getElementById('terms-section')?.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'center' 
                            });
                            toast({
                              title: 'Terms Required',
                              description: 'Please accept the terms to continue with payment',
                              status: 'error',
                              duration: 4000,
                              isClosable: true,
                              position: 'top',
                            });
                          }}
                        />
                      )}
                      
                      {/* Apple Pay Button - Always visible but disabled functionally */}
                      <Box
                        pointerEvents={agreeToTerms ? 'auto' : 'none'}
                        opacity={agreeToTerms ? 1 : 0.7}
                      >
                        <PaymentRequestButtonElement 
                          options={{
                            paymentRequest: paymentRequest,
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
                    
                    <Text color="gray.500" fontSize="xs" textAlign="center" mt={2}>
                      Express checkout • Apple Pay & Google Pay
                    </Text>
                  </Box>
                )}

                {/* Card Payment Button */}
                {paymentMethodType === 'card' && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (!email) {
                        toast({
                          title: 'Email required',
                          description: 'Please enter your email address',
                          status: 'error',
                          duration: 3000,
                          isClosable: true,
                        });
                        return;
                      }
                      if (!agreeToTerms) {
                        setTermsError(true);
                        toast({
                          title: 'Terms Required',
                          description: 'Please accept the terms to continue with payment',
                          status: 'error',
                          duration: 4000,
                          isClosable: true,
                          position: 'top',
                        });
                        setTimeout(() => {
                          document.getElementById('terms-section')?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                          });
                        }, 100);
                        return;
                      }
                      handleCardPayment();
                    }}
                    size="lg"
                    bg={colors.accent.green}
                    color="black"
                    width="100%"
                    isLoading={isLoading}
                    loadingText="Processing..."
                    fontWeight="700"
                    borderRadius="lg"
                    height="56px"
                    fontSize="16px"
                    _hover={{
                      bg: colors.accent.green,
                      transform: 'translateY(-1px)',
                      boxShadow: `0 10px 30px ${colors.accent.green}40`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    transition="all 0.2s"
                  >
                    Complete Payment
                  </Button>
                )}

                {/* Security Note */}
                <HStack justify="center" spacing={2}>
                  <FiLock size={14} color="#6B7280" />
                  <Text color="gray.500" fontSize="xs">
                    Powered by Stripe
                  </Text>
                </HStack>

                {/* Back Button */}
                <Box textAlign="center">
                  <Button
                    onClick={onBack}
                    variant="ghost"
                    color="gray.400"
                    leftIcon={<FiArrowLeft />}
                    _hover={{ color: 'white', bg: 'transparent' }}
                    size="md"
                    fontWeight="500"
                  >
                    Back to Details
                  </Button>
                </Box>
              </VStack>
            </form>
          </GridItem>
        </Grid>
      </MotionBox>
    </Container>
  );
};

export default PaymentForm;