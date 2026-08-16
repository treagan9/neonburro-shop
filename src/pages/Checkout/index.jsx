// src/pages/Checkout/index.jsx
// path: /checkout/
// SENTINEL: NB_SHOP_CHECKOUT_PAGE_V2
//
// The checkout page. Owns the Stripe Elements provider, the order finalisation
// and the return trip from any payment rail that leaves the site.
//
// ── why the Elements provider is here and not at the app root ───────────────
// The Payment Element has to be created with a mode, an amount and a currency,
// and the amount is the cart total. main.jsx used to wrap the whole app in a
// bare <Elements> which is the legacy card element setup and cannot host a
// Payment Element at all. So the provider lives here, gets the cart total,
// and Stripe.js is only loaded when somebody reaches checkout.
//
// The options object is built with useMemo on the amount alone and the
// appearance object lives at module scope. React Stripe.js diffs the options
// prop and calls elements.update for changed keys, and an unstable appearance
// object would make it re-theme the iframe on every render.
//
// ── two ways an order finishes ──────────────────────────────────────────────
//   in page    card, Apple Pay, Google Pay, Link. confirmPayment resolves with
//              a succeeded intent and CheckoutForm calls onSubmit. Same as it
//              always was.
//   round trip stablecoins (and any future redirect rail). confirmPayment
//              sends the customer to Stripe, Stripe sends them back to
//              /checkout/?payment_intent=...&payment_intent_client_secret=...
//              This page sees the client secret in the URL, asks Stripe for the
//              intent, and finalises from that.
//
// On the round trip the form is gone, so before confirming, CheckoutForm
// parks the contact and shipping fields in sessionStorage through stash.js.
// This page reads them back on return. If the stash is missing (new tab,
// cleared storage) the intent itself carries receipt_email and shipping,
// which the server wrote at creation, so the order still finalises.
//
// The cart lives in localStorage and CartContext reads it in its useState
// initialiser, so it is present on the first render of a return trip. That
// was not always true, see the header of src/context/CartContext.jsx, and the
// return effect below still depends on finalizeOrder (which depends on the
// cart) with a cancel flag, so if the cart ever changes under it the earlier
// run is dropped rather than finalising a stale order.
//
// ── what finalising means ───────────────────────────────────────────────────
// Post the order to the Netlify form 'shop-order' declared in index.html (a
// convenience copy for the inbox, Stripe holds the record), build orderData
// for the success screen, clear the cart, drop the stash. The order number is
// derived from the PaymentIntent id so both paths produce the same number for
// the same payment and a refresh cannot mint a second one.
//
// A ref guards finalisation so React StrictMode's double effect run cannot
// post the form twice.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, GridItem, VStack, Heading, Text, Spinner, useToast } from '@chakra-ui/react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { getStripeKey } from '../../config/stripe';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import CheckoutSuccess from './components/CheckoutSuccess';
import { readStash, dropStash } from './stash';
import { RAIL, SHEET } from '../../theme/layout';

// Outside the component so Stripe.js loads once per page, not once per render.
const stripePromise = loadStripe(getStripeKey());

// Shop palette. Topo Lime primary, near black surface. The iframe cannot see
// our self hosted Geist so it falls to the system stack, which is close enough
// on every platform we ship to.
const appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#C5D957',
    colorBackground: '#111113',
    colorText: '#FFFFFF',
    colorTextSecondary: '#9CA3AF',
    colorTextPlaceholder: '#6B7280',
    colorDanger: '#EF4444',
    fontFamily: 'Geist Sans, system-ui, -apple-system, Segoe UI, sans-serif',
    fontSizeBase: '16px',
    borderRadius: '12px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '2px solid rgba(255, 255, 255, 0.16)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      boxShadow: 'none',
      padding: '14px 16px',
    },
    '.Input:focus': {
      border: '2px solid #C5D957',
      boxShadow: '0 0 0 1px #C5D957',
    },
    '.Input--invalid': {
      border: '2px solid #EF4444',
    },
    '.Label': {
      color: '#9CA3AF',
      fontSize: '14px',
      fontWeight: '500',
    },
    '.Tab': {
      border: '2px solid rgba(255, 255, 255, 0.16)',
      backgroundColor: 'transparent',
    },
    '.Tab:hover': {
      border: '2px solid rgba(255, 255, 255, 0.3)',
    },
    '.Tab--selected': {
      border: '2px solid #C5D957',
      backgroundColor: 'rgba(197, 217, 87, 0.06)',
      boxShadow: '0 0 20px rgba(197, 217, 87, 0.18)',
    },
    '.Block': {
      border: '2px solid rgba(255, 255, 255, 0.16)',
      backgroundColor: 'transparent',
    },
  },
};

const orderNumberFor = (paymentIntentId) => {
  const tail = String(paymentIntentId || '').slice(-8).toUpperCase();
  return `NB-${tail || Date.now()}`;
};

// Build the same formData shape CheckoutForm submits, from whatever survived
// the round trip. Stash first, then the intent's own shipping and email.
const formDataFromReturn = (stash, paymentIntent) => {
  const ship = paymentIntent?.shipping || {};
  const addr = ship.address || {};
  const [firstName = '', ...rest] = String(ship.name || '').split(' ');
  return {
    firstName: stash?.firstName || firstName,
    lastName: stash?.lastName || rest.join(' '),
    email: stash?.email || paymentIntent?.receipt_email || '',
    phone: stash?.phone || ship.phone || '',
    address: stash?.address || addr.line1 || '',
    city: stash?.city || addr.city || '',
    state: stash?.state || addr.state || '',
    zip: stash?.zip || addr.postal_code || '',
    country: 'United States',
  };
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getCartTotal, clearCart } = useCart();
  const toast = useToast();

  const returnSecret = useMemo(
    () => new URLSearchParams(location.search).get('payment_intent_client_secret'),
    [location.search]
  );

  const [step, setStep] = useState(returnSecret ? 'returning' : 'form');
  const [orderData, setOrderData] = useState(null);
  const finalised = useRef(false);

  const total = getCartTotal();
  const amountCents = Math.round(total * 100);

  const elementsOptions = useMemo(() => ({
    mode: 'payment',
    amount: amountCents,
    currency: 'usd',
    appearance,
  }), [amountCents]);

  // A shopper who lands here with nothing in the cart goes back to the cart.
  // Not while returning from a rail, the cart is still there but the step is
  // not 'form', and not after success when we cleared it on purpose.
  useEffect(() => {
    if (cart.length === 0 && step === 'form') {
      navigate('/cart/');
    }
  }, [cart, step, navigate]);

  const finalizeOrder = useCallback(async (formData) => {
    if (finalised.current) return;
    finalised.current = true;
    setStep('processing');

    const items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedTier: item.selectedTier,
    }));

    try {
      const orderDetails = {
        'form-name': 'shop-order',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || '',
        zip: formData.zip || '',
        country: formData.country || 'United States',
        paymentMethod: formData.paymentMethod || 'card',
        paymentIntentId: formData.paymentIntentId || '',
        items: JSON.stringify(items),
        total,
        timestamp: new Date().toISOString(),
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(orderDetails).toString(),
      });
    } catch (error) {
      // The payment already succeeded. A failed convenience copy must not show
      // the customer an error, Stripe has the order. Log and carry on.
      console.error('shop-order form post failed', error);
    }

    setOrderData({
      orderNumber: orderNumberFor(formData.paymentIntentId),
      email: formData.email,
      total,
      items: [...cart],
      paymentIntentId: formData.paymentIntentId,
      paymentMethod: formData.paymentMethod || 'card',
      processing: !!formData.processing,
    });

    clearCart();
    dropStash();
    setStep('success');

    toast({
      title: formData.processing ? 'Payment received, settling' : 'Order Placed!',
      description: formData.processing
        ? 'Your payment is confirming on chain. We will email you when it settles.'
        : 'Thank you for your order.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }, [cart, total, clearCart, toast]);

  // The round trip. Read the intent Stripe sent us back with and finalise or
  // return the shopper to the form with a reason.
  useEffect(() => {
    if (!returnSecret) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const stripe = await stripePromise;
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(returnSecret);
        if (cancelled) return;

        if (error || !paymentIntent) {
          throw new Error(error?.message || 'Could not confirm the payment');
        }

        if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing') {
          const stash = readStash();
          await finalizeOrder({
            ...formDataFromReturn(stash, paymentIntent),
            paymentIntentId: paymentIntent.id,
            paymentMethod: stash?.paymentType || 'redirect',
            processing: paymentIntent.status === 'processing',
          });
          navigate('/checkout/', { replace: true });
          return;
        }

        // requires_payment_method, canceled, anything else. Back to the form.
        toast({
          title: 'Payment not completed',
          description: 'Nothing was charged. Pick a payment method and try again.',
          status: 'warning',
          duration: 6000,
          isClosable: true,
        });
        setStep('form');
        navigate('/checkout/', { replace: true });
      } catch (err) {
        if (cancelled) return;
        toast({
          title: 'Could not confirm payment',
          description: err.message,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
        setStep('form');
        navigate('/checkout/', { replace: true });
      }
    })();

    return () => { cancelled = true; };
  }, [returnSecret, finalizeOrder, navigate, toast]);

  if (step === 'success' && orderData) {
    return <CheckoutSuccess orderData={orderData} />;
  }

  if (step === 'returning' || (step === 'processing' && returnSecret)) {
    return (
      <Box minH="100vh" bg="#0B0B0C" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="lg" color="#C5D957" thickness="3px" />
          <Text color="gray.400" fontSize="sm">Confirming your payment</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#0B0B0C" pt="100px" pb={20}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        <VStack spacing={8} mb={8}>
          <VStack spacing={2} textAlign="center">
            <Heading
              color="white"
              fontSize={{ base: '2xl', md: '4xl' }}
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
          <GridItem>
            {amountCents > 0 && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm
                  onSubmit={finalizeOrder}
                  isProcessing={step === 'processing'}
                  cart={cart}
                  total={total}
                />
              </Elements>
            )}
          </GridItem>

          <GridItem>
            <Box
              position={{ base: 'relative', lg: 'sticky' }}
              top={{ lg: '100px' }}
            >
              <OrderSummary cart={cart} total={total} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
