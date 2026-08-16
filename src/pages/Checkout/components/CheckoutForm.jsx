// src/pages/Checkout/components/CheckoutForm.jsx
// SENTINEL: NB_SHOP_CHECKOUT_FORM_V2
//
// Contact and shipping fields, the Stripe Payment Element, the terms gate and
// one pay button. Lives inside the <Elements> provider that Checkout/index.jsx
// mounts with the cart total.
//
// ── what changed and why ────────────────────────────────────────────────────
// This used to be three separate card elements, a radio group and a
// PaymentRequestButtonElement for Apple Pay and Google Pay, confirmed with
// stripe.confirmCardPayment. That API can only ever take a card. It could not
// show Link, it could not show a bank, and it could not show Stripe's
// stablecoin rail (USDC on Solana, Base, Ethereum or Polygon, settled to us in
// dollars), which is the reason for the rewrite.
//
// The Payment Element renders every method the Stripe Dashboard has enabled
// for the account, including Apple Pay and Google Pay when the device has
// them, and stripe.confirmPayment handles whichever one the shopper picked. So
// there is one form, one submit path and one terms check, instead of three of
// each. Turning a new rail on is a Dashboard switch, not a deploy.
//
// ── the submit sequence, and the order matters ──────────────────────────────
//   1. our own validation (required fields, terms)
//   2. elements.submit()   validates the Payment Element and, for wallets,
//                          opens the sheet. Stripe requires this to run before
//                          the intent is created when using deferred intents.
//   3. writeStash()        park the typed fields in sessionStorage in case
//                          step 5 leaves the site. See stash.js.
//   4. create the PaymentIntent server side, sending contact and shipping so
//                          Stripe holds the order before any redirect.
//   5. stripe.confirmPayment with redirect: 'if_required'
//        card, wallets, Link   resolve here with a succeeded intent, onSubmit
//        stablecoins           browser leaves for crypto.stripe.com and comes
//                              back to /checkout/ with a client secret, and
//                              Checkout/index.jsx finishes the order.
//
// ── billing details ─────────────────────────────────────────────────────────
// fields.billingDetails is 'never' for name, email, phone and address, because
// we already collect all of them above the element and asking twice is how a
// shopper leaves. The trade is that Stripe then REQUIRES them in
// confirmParams.payment_method_data.billing_details, every time, for every
// method. If a field is ever made optional above, it must still be sent here
// or confirmPayment fails with a missing billing detail error. Country is
// always US, the shop only ships domestically.
//
// ── the pay button copy ─────────────────────────────────────────────────────
// The Payment Element's onChange tells us which method is selected. For a
// method that leaves the site the button says so and a line under it says
// what happens next. A shopper who is told they are about to be redirected
// completes the payment. One who is not closes the tab.
//
// No oxford commas, no em dashes.

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Link,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiLock, FiAlertCircle } from 'react-icons/fi';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { writeStash } from '../stash';

const MotionBox = motion(Box);

const colors = {
  teal: '#C5D957',
  green: '#A6B84A',
  copper: '#C8893B',
};

const REQUIRED = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip'];

// Methods that take the shopper off the site before the intent settles.
const REDIRECT_TYPES = new Set(['crypto']);

const buttonCopy = (type, total) => {
  const amount = `$${Number(total).toFixed(2)}`;
  if (type === 'crypto') return `Continue to Stripe · ${amount}`;
  if (type === 'apple_pay') return `Pay with Apple Pay · ${amount}`;
  if (type === 'google_pay') return `Pay with Google Pay · ${amount}`;
  return `Complete Payment · ${amount}`;
};

const railNote = (type) => {
  if (type === 'crypto') return 'You will connect a wallet on Stripe and come straight back here. Settles in USD.';
  return 'Secure checkout powered by Stripe';
};

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
    country: 'United States',
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const [selectedType, setSelectedType] = useState('card');

  const paymentElementOptions = useMemo(() => ({
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: true,
    },
    wallets: { applePay: 'auto', googlePay: 'auto' },
    fields: {
      billingDetails: {
        name: 'never',
        email: 'never',
        phone: 'never',
        address: 'never',
      },
    },
  }), []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!stripe || !elements || isLoading || isProcessing) return;

    const missing = REQUIRED.filter((k) => !String(formData[k] || '').trim());
    if (missing.length > 0) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in your name, email and shipping address',
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
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      writeStash({ ...formData, paymentType: selectedType });

      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const address = {
        line1: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zip,
        country: 'US',
      };

      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'shop',
          amount: total,
          customerEmail: formData.email,
          customer: {
            name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize || null,
            selectedDesign: item.selectedDesign || null,
            selectedTier: item.selectedTier || null,
            stripePriceId: item.stripePriceId,
          })),
        }),
      });

      const { clientSecret, error } = await response.json();
      if (error || !clientSecret) throw new Error(error || 'Could not start the payment');

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/`,
          receipt_email: formData.email,
          payment_method_data: {
            billing_details: {
              name,
              email: formData.email,
              phone: formData.phone || undefined,
              address,
            },
          },
          shipping: {
            name,
            phone: formData.phone || undefined,
            address,
          },
        },
        redirect: 'if_required',
      });

      if (confirmError) throw new Error(confirmError.message);

      // Redirect rails never reach this line, the browser has left. Everything
      // else resolves with the intent.
      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
        onSubmit({
          ...formData,
          paymentMethod: selectedType,
          paymentIntentId: paymentIntent.id,
          processing: paymentIntent.status === 'processing',
        });
        return;
      }

      throw new Error('The payment was not completed. Please try again.');
    } catch (err) {
      toast({
        title: 'Payment failed',
        description: err.message,
        status: 'error',
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  const inputStyles = {
    bg: 'rgba(255, 255, 255, 0.02)',
    border: '2px solid',
    borderColor: 'whiteAlpha.200',
    color: 'white',
    _hover: { borderColor: 'whiteAlpha.300' },
    _focus: {
      borderColor: colors.teal,
      boxShadow: `0 0 0 1px ${colors.teal}`,
    },
  };

  const leaving = REDIRECT_TYPES.has(selectedType);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      noValidate
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
                  autoComplete="given-name"
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
                  autoComplete="family-name"
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
                autoComplete="email"
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
                autoComplete="tel"
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
                autoComplete="shipping street-address"
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
                  autoComplete="shipping address-level2"
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
                  autoComplete="shipping address-level1"
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
                  autoComplete="shipping postal-code"
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

          {!elementReady && (
            <VStack spacing={3} align="stretch" mb={3}>
              <Skeleton height="56px" borderRadius="lg" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
              <Skeleton height="56px" borderRadius="lg" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
            </VStack>
          )}

          <Box display={elementReady ? 'block' : 'none'}>
            <PaymentElement
              options={paymentElementOptions}
              onReady={() => setElementReady(true)}
              onChange={(event) => {
                if (event?.value?.type) setSelectedType(event.value.type);
              }}
            />
          </Box>
        </Box>

        <Box id="terms-section">
          <Box
            p={4}
            bg={termsError && !agreeToTerms ? `${colors.copper}10` : 'transparent'}
            border="2px solid"
            borderColor={termsError && !agreeToTerms ? colors.copper : 'transparent'}
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
                  },
                },
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

        <Button
          type="submit"
          size="lg"
          bg={colors.green}
          color="black"
          width="100%"
          isLoading={isLoading || isProcessing}
          isDisabled={!stripe || !elements || !elementReady}
          loadingText={leaving ? 'Sending you to Stripe...' : 'Processing...'}
          fontWeight="800"
          borderRadius="full"
          height="56px"
          leftIcon={<FiLock />}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: `0 15px 50px ${colors.green}40`,
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.3s"
        >
          {buttonCopy(selectedType, total)}
        </Button>

        <HStack justify="center" spacing={2}>
          <FiLock size={14} color="#6B7280" />
          <Text color="gray.400" fontSize="xs" textAlign="center">
            {railNote(selectedType)}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CheckoutForm;
