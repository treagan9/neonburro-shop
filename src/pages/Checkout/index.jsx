// src/pages/Checkout/index.jsx
// path: /checkout/
// SENTINEL: NB_SHOP_CHECKOUT_PAGE_V3
//
// The checkout page. Owns the Stripe Elements providers, the order
// finalisation and the return trip from any payment rail that leaves the site.
//
// ── the shape of the page ───────────────────────────────────────────────────
// Phone: the saddlebag as one tappable bar, then the express row (Apple Pay,
// Google Pay, Link, whatever the device has), then the three numbered steps,
// then the button. Nothing is in a box. Stripe's card field gets the whole
// rail, which is the reason V3 exists, the plate in V2 squeezed it.
// Desktop: form on the left, the saddlebag on the right as a sticky plate.
//
// ── two Elements groups ─────────────────────────────────────────────────────
// ExpressCheckout and CheckoutForm are mounted in separate <Elements>
// providers with the same mode, amount and currency. On a wallet confirm we
// call elements.submit() and confirmPayment on the express group only, so an
// empty card form in the other group is never asked to validate. See
// ExpressCheckout.jsx. Both providers share stripePromise, Stripe.js loads
// once.
//
// The options object is built with useMemo on the amount alone and the
// appearance object lives at module scope. React Stripe.js diffs the options
// prop and calls elements.update for changed keys, and an unstable appearance
// object would make it re-theme the iframes on every render.
//
// ── two ways an order finishes ──────────────────────────────────────────────
//   in page    card, Link, wallets. confirmPayment resolves with a succeeded
//              intent and the child calls finalizeOrder.
//   round trip stablecoins (and any future redirect rail). confirmPayment
//              sends the customer to Stripe, Stripe sends them back to
//              /checkout/?payment_intent=...&payment_intent_client_secret=...
//              This page sees the client secret in the URL, asks Stripe for the
//              intent, and finalises from that, using the stash written before
//              the redirect (stash.js) or the intent's own shipping and email.
//
// ── what finalising means ───────────────────────────────────────────────────
// Post the order to the Netlify form 'shop-order' declared in index.html (a
// convenience copy for the inbox, Stripe holds the record), build orderData
// for the success screen, clear the cart, drop the stash. The order number is
// derived from the PaymentIntent id so both paths produce the same number for
// the same payment and a refresh cannot mint a second one. A ref guards
// finalisation so React StrictMode's double effect run cannot post twice.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, GridItem, VStack, Heading, Text, Spinner, useToast, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { getStripeKey } from '../../config/stripe';
import ExpressCheckout from './components/ExpressCheckout';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import CheckoutSuccess from './components/CheckoutSuccess';
import DirectSolana from './components/DirectSolana';
import { readStash, dropStash } from './stash';
import { colors } from '../../theme/colors';
import { RAIL, SHEET } from '../../theme/layout';

// Outside the component so Stripe.js loads once per page, not once per render.
const stripePromise = loadStripe(getStripeKey());

const LIME = colors.accent.signal;

// Shop palette. Topo Lime primary, near black surface. The iframe cannot see
// our self hosted Geist so it falls to the system stack, which is close enough
// on every platform we ship to.
const appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#C5D957',
    colorBackground: '#0F0F11',
    colorText: '#F4F3F1',
    colorTextSecondary: '#A8A7A4',
    colorTextPlaceholder: '#6E6E6B',
    colorDanger: '#FF3366',
    fontFamily: 'Geist Sans, system-ui, -apple-system, Segoe UI, sans-serif',
    fontSizeBase: '16px',
    borderRadius: '12px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': { border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(255, 255, 255, 0.02)', boxShadow: 'none', padding: '14px 16px' },
    '.Input:focus': { border: '1px solid #C5D957', boxShadow: '0 0 0 1px #C5D957' },
    '.Input--invalid': { border: '1px solid #FF3366' },
    '.Label': { color: '#A8A7A4', fontSize: '14px', fontWeight: '500' },
    '.Tab': { border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'transparent' },
    '.Tab:hover': { border: '1px solid rgba(197, 217, 87, 0.5)' },
    '.Tab--selected': { border: '1px solid #C5D957', backgroundColor: 'rgba(197, 217, 87, 0.06)' },
    '.Block': { border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'transparent' },
    '.AccordionItem': { border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(255, 255, 255, 0.02)' },
    '.AccordionItem--selected': { border: '1px solid rgba(197, 217, 87, 0.55)' },
  },
};

const orderNumberFor = (paymentIntentId) => {
  const tail = String(paymentIntentId || '').slice(-8).toUpperCase();
  return `NB-${tail || Date.now()}`;
};

// Build the same formData shape the children submit, from whatever survived
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
  // Not while returning from a rail, and not after success when we cleared it.
  useEffect(() => {
    if (cart.length === 0 && step === 'form') navigate('/cart/');
  }, [cart, step, navigate]);

  const finalizeOrder = useCallback(async (formData) => {
    if (finalised.current) return;
    finalised.current = true;
    setStep('processing');

    const items = cart.map((item) => ({
      id: item.id, name: item.name, price: item.price, quantity: item.quantity,
      selectedSize: item.selectedSize, selectedTier: item.selectedTier, selectedDesign: item.selectedDesign,
      reloadCode: item.reloadCode,
    }));

    try {
      const orderDetails = {
        'form-name': 'shop-order',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        address: [formData.address, formData.address2].filter(Boolean).join(', '),
        city: formData.city || '',
        state: formData.state || '',
        zip: formData.zip || '',
        country: formData.country || 'United States',
        paymentMethod: formData.paymentMethod || 'card',
        paymentIntentId: formData.paymentIntentId || '',
        delivery: cart.every((i) => i.delivery === 'digital' || i.category === 'Digital') ? 'digital' : 'ship',
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
      solana: formData.solana || null,
    });

    clearCart();
    dropStash();
    setStep('success');

    const direct = formData.paymentMethod === 'solana';
    toast({
      title: direct ? 'Landed' : formData.processing ? 'Payment received, settling' : 'Order placed',
      description: direct
        ? 'Direct on Solana. Cypher saw it.'
        : formData.processing
          ? 'Your payment is confirming on chain. We will email you when it settles.'
          : 'Thank you. The receipt is on its way.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }, [cart, total, clearCart, toast]);

  const onError = useCallback((message) => {
    toast({ title: 'Payment failed', description: message, status: 'error', duration: 5000, isClosable: true });
  }, [toast]);

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
        if (error || !paymentIntent) throw new Error(error?.message || 'Could not confirm the payment');

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

        toast({
          title: 'Payment not completed',
          description: 'Nothing was charged. Pick a payment method and try again.',
          status: 'warning', duration: 6000, isClosable: true,
        });
        setStep('form');
        navigate('/checkout/', { replace: true });
      } catch (err) {
        if (cancelled) return;
        toast({ title: 'Could not confirm payment', description: err.message, status: 'error', duration: 6000, isClosable: true });
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
      <Box minH="100vh" bg={colors.dark.black} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="lg" color={LIME} thickness="3px" />
          <Text color={colors.text.secondary} fontSize="sm">Confirming your payment</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={colors.dark.black} pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 24 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate('/cart/')}
          color={colors.text.muted} fontWeight="500" fontSize="sm" px={2} mb={{ base: 5, md: 8 }}
          _hover={{ color: colors.text.primary, bg: 'rgba(255,255,255,0.04)' }}>
          Back to the saddlebag
        </Button>

        <Heading as="h1" fontSize={{ base: '32px', md: '44px' }} fontWeight="600" letterSpacing="-0.035em"
          lineHeight="1" color={colors.text.primary} mb={{ base: 6, md: 10 }}>
          Checkout
        </Heading>

        <Grid templateColumns={{ base: '1fr', lg: '1.35fr 0.65fr' }} gap={{ base: 6, lg: 16 }} alignItems="start">
          {/* On a phone the saddlebag bar comes first, then the form. On desktop
              the DOM order flips with the grid so the form is left. */}
          <GridItem order={{ base: 1, lg: 2 }} position={{ lg: 'sticky' }} top={{ lg: '110px' }}>
            <OrderSummary cart={cart} total={total} />
          </GridItem>

          <GridItem order={{ base: 2, lg: 1 }} minW={0}>
            {amountCents > 0 && (
              <>
                <Elements stripe={stripePromise} options={elementsOptions}>
                  <ExpressCheckout cart={cart} total={total} onPaid={finalizeOrder} onError={onError} />
                </Elements>
                <Elements stripe={stripePromise} options={elementsOptions}>
                  <CheckoutForm onSubmit={finalizeOrder} isProcessing={step === 'processing'} cart={cart} total={total} />
                </Elements>
                {/* The direct rail. Outside Stripe on purpose, see DirectSolana.jsx. */}
                <DirectSolana cart={cart} total={total} onPaid={finalizeOrder} onError={onError} disabled={step === 'processing'} />
              </>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
