// src/pages/Checkout/components/CheckoutForm.jsx
// SENTINEL: NB_SHOP_CHECKOUT_FORM_V4
//
// The long form under the express row. Three parts, numbered: contact,
// delivery, payment. Then one button. Lives inside the <Elements> provider
// that Checkout/index.jsx mounts with the cart total (the second of two, see
// ExpressCheckout.jsx for why there are two).
//
// ── V4, Stripe draws the fields ─────────────────────────────────────────────
// V3 had nine Chakra inputs and a Payment Element in a bordered plate. On a
// phone the plate ate forty pixels of a 375 wide screen and the card number
// field wrapped. V4 has no plate on any width, and the fields that matter are
// Stripe's own:
//
//   LinkAuthenticationElement   the email. If the shopper has used Link
//                               anywhere on the web this recognises them and
//                               offers to fill everything else in one tap.
//   AddressElement              shipping, US only, name split into first and
//                               last, phone optional. Autocomplete is on by
//                               default because a Payment Element is mounted
//                               in the same group, Stripe supplies the maps
//                               key. Nobody types a full address twice.
//   PaymentElement              card, Link, and Stripe's stablecoin rail
//                               (USDC on Solana, Base, Ethereum, Polygon).
//                               Wallets are switched off here because the
//                               express row above owns them, one place for
//                               Apple Pay, not two.
//
// Digital only saddlebags skip the address by default. Two name fields and
// the email are all that is needed to send a two dollar clue, and a link
// under them opens the address element for anybody who wants a physical
// follow up. When any physical line is present the address is required.
//
// ── billing details ─────────────────────────────────────────────────────────
// Name and email are 'never' collected by the Payment Element because we
// already have them (address element or our two fields, and the Link email),
// so they are passed in confirmParams. Phone and address stay 'auto', Stripe
// collects a postal code for a card when it needs one and reuses the shipping
// address when there is one.
//
// ── terms ───────────────────────────────────────────────────────────────────
// Clickwrap. The line under the button says paying agrees to the terms and
// privacy policy. The checkbox is gone. It was the most common reason the
// button did nothing, and a checkbox does not make consent more real than a
// labelled button does.
//
// ── the submit sequence, and the order matters ──────────────────────────────
//   1. our own validation (email, name, address when required)
//   2. elements.submit()   validates every Stripe element in this group
//   3. writeStash()        park the typed fields in sessionStorage in case
//                          step 5 leaves the site. See stash.js.
//   4. create the PaymentIntent server side, sending contact, shipping when
//                          present, delivery kind and any reload codes so
//                          Stripe holds the order before any redirect.
//   5. stripe.confirmPayment with redirect: 'if_required'
//        card, Link            resolve here with a succeeded intent, onSubmit
//        stablecoins           browser leaves for crypto.stripe.com and comes
//                              back to /checkout/ with a client secret, and
//                              Checkout/index.jsx finishes the order.
//
// No oxford commas, no em dashes.

import { Box, VStack, HStack, Text, Input, Button, FormControl, FormLabel, Skeleton, Link, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiLock } from 'react-icons/fi';
import {
  useStripe, useElements, PaymentElement, AddressElement, LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { writeStash } from '../stash';
import { isDigitalItem } from '../../../context/CartContext';
import { colors } from '../../../theme/colors';
import { EASE } from '../../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

// Methods that take the shopper off the site before the intent settles.
const REDIRECT_TYPES = new Set(['crypto']);

const buttonCopy = (type, total) => {
  const amount = `$${Number(total).toFixed(2)}`;
  if (type === 'crypto') return `Continue to Stripe · ${amount}`;
  return `Pay ${amount}`;
};

const railNote = (type) => {
  if (type === 'crypto') return 'You will connect a wallet on Stripe and come straight back here. Settles in USD.';
  return 'Card details go to Stripe and never touch our servers.';
};

// The first step under the saddlebag bar has no hairline of its own on a
// phone, the bar already drew one. On desktop the bar is a plate to the right
// and the step opens the column, so it gets its line back.
const Step = ({ n, title, sub, first = false, children }) => (
  <Box as="section" pt={{ base: first ? 4 : 7, md: 8 }} pb={{ base: 2, md: 3 }}
    borderTop={first ? { base: 'none', lg: '1px solid' } : '1px solid'} borderColor={colors.ui.border}>
    <HStack align="baseline" spacing={3} mb={sub ? 1 : 4}>
      <Text fontFamily="mono" fontSize="10px" letterSpacing="0.2em" color={LIME}>{n}</Text>
      <Text color={colors.text.primary} fontSize={{ base: 'md', md: 'lg' }} fontWeight="600" letterSpacing="-0.02em">{title}</Text>
    </HStack>
    {sub && <Text color={colors.text.secondary} fontSize="sm" lineHeight="1.6" mb={4} maxW="560px">{sub}</Text>}
    {children}
  </Box>
);

const inputStyles = {
  bg: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid',
  borderColor: colors.ui.border,
  color: colors.text.primary,
  h: '48px',
  borderRadius: '12px',
  _placeholder: { color: colors.text.muted },
  _hover: { borderColor: colors.ui.borderHover },
  _focus: { borderColor: LIME, boxShadow: `0 0 0 1px ${LIME}` },
};

const CheckoutForm = ({ onSubmit, isProcessing, cart, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const digitalOnly = cart.length > 0 && cart.every(isDigitalItem);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wantsAddress, setWantsAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [selectedType, setSelectedType] = useState('card');

  const showAddress = !digitalOnly || wantsAddress;

  const paymentOptions = useMemo(() => ({
    layout: { type: 'accordion', defaultCollapsed: false, radios: true, spacedAccordionItems: true },
    wallets: { applePay: 'never', googlePay: 'never' },
    fields: { billingDetails: { name: 'never', email: 'never' } },
    terms: { card: 'never' },
    // Crypto second. Cards win on volume, stablecoins are the story, and the
    // Dashboard's default order buried the rail under Cash App and Amazon.
    paymentMethodOrder: ['card', 'crypto', 'link', 'cashapp', 'amazon_pay'],
  }), []);

  const addressOptions = useMemo(() => ({
    mode: 'shipping',
    allowedCountries: ['US'],
    fields: { phone: 'always' },
    validation: { phone: { required: 'never' } },
    display: { name: 'split' },
  }), []);

  const fail = (title, description) => toast({ title, description, status: 'error', duration: 4000, isClosable: true });

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!stripe || !elements || isLoading || isProcessing) return;

    if (!email.trim()) return fail('Email needed', digitalOnly ? 'The email is where the order goes.' : 'The receipt and shipping updates go there.');

    // Who and where. From the address element when it is on the page and
    // complete, otherwise from the two name fields.
    let name = `${firstName} ${lastName}`.trim();
    let first = firstName.trim();
    let last = lastName.trim();
    let phone = '';
    let addr = null;

    const addressEl = showAddress ? elements.getElement(AddressElement) : null;
    if (addressEl) {
      const { complete, value } = await addressEl.getValue();
      if (!digitalOnly && !complete) return fail('Shipping address needed', 'Fill in where this should go.');
      if (complete && value) {
        first = value.firstName || first;
        last = value.lastName || last;
        name = value.name || `${first} ${last}`.trim();
        phone = value.phone || '';
        addr = value.address || null;
      }
    }
    if (!name) return fail('Name needed', 'Just so the order has one.');

    setIsLoading(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const formData = {
        firstName: first,
        lastName: last,
        email: email.trim(),
        phone,
        address: addr?.line1 || '',
        address2: addr?.line2 || '',
        city: addr?.city || '',
        state: addr?.state || '',
        zip: addr?.postal_code || '',
        country: 'United States',
      };
      writeStash({ ...formData, paymentType: selectedType });

      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'shop',
          amount: total,
          customerEmail: formData.email,
          delivery: digitalOnly ? 'digital' : 'ship',
          customer: {
            name,
            phone,
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
            reloadCode: item.reloadCode || null,
            delivery: isDigitalItem(item) ? 'digital' : 'ship',
            stripePriceId: item.stripePriceId,
          })),
        }),
      });
      const { clientSecret, error } = await response.json();
      if (error || !clientSecret) throw new Error(error || 'Could not start the payment');

      const confirmParams = {
        return_url: `${window.location.origin}/checkout/`,
        receipt_email: formData.email,
        payment_method_data: { billing_details: { name, email: formData.email } },
      };
      if (addr && addr.line1) {
        confirmParams.shipping = {
          name,
          phone: phone || undefined,
          address: {
            line1: addr.line1,
            line2: addr.line2 || undefined,
            city: addr.city,
            state: addr.state,
            postal_code: addr.postal_code,
            country: 'US',
          },
        };
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams,
        redirect: 'if_required',
      });
      if (confirmError) throw new Error(confirmError.message);

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
      fail('Payment failed', err.message);
      setIsLoading(false);
    }
  };

  const leaving = REDIRECT_TYPES.has(selectedType);

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate>
      <VStack spacing={0} align="stretch">
        <Step n="01" title="Contact" first
          sub={digitalOnly ? 'The email is the delivery address, everything in the saddlebag arrives there.' : 'Receipt and shipping updates go here.'}>
          <Box mb={4}>
            <LinkAuthenticationElement
              onChange={(ev) => setEmail(ev?.value?.email || '')}
            />
          </Box>
          {digitalOnly && (
            <HStack spacing={3} align="start">
              <FormControl isRequired>
                <FormLabel color={colors.text.secondary} fontSize="sm" mb={1.5}>First name</FormLabel>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" placeholder="Pitch" {...inputStyles} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={colors.text.secondary} fontSize="sm" mb={1.5}>Last name</FormLabel>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" placeholder="Burro" {...inputStyles} />
              </FormControl>
            </HStack>
          )}
        </Step>

        <Step n="02" title={digitalOnly ? 'Mailing address' : 'Ship to'}
          sub={digitalOnly
            ? 'Optional. Some float ships a physical follow up, leave an address and it can find you.'
            : 'US only for now. Start typing and pick the address, it fills the rest.'}>
          {digitalOnly && !wantsAddress ? (
            <Button variant="link" color={LIME} fontWeight="600" fontSize="sm" onClick={() => setWantsAddress(true)}
              _hover={{ textDecoration: 'none', opacity: 0.85 }}>
              Add a mailing address
            </Button>
          ) : (
            <MotionBox initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <AddressElement options={addressOptions} />
              {digitalOnly && (
                <Button variant="link" color={colors.text.muted} fontWeight="500" fontSize="xs" mt={3}
                  onClick={() => setWantsAddress(false)} _hover={{ color: colors.text.primary, textDecoration: 'none' }}>
                  Skip the address
                </Button>
              )}
            </MotionBox>
          )}
        </Step>

        <Step n="03" title="Payment"
          sub="Card, Link or a stablecoin. USDC on Solana, Base, Ethereum or Polygon settles in dollars, no wallet on our side.">
          {!paymentReady && (
            <VStack spacing={3} align="stretch" mb={3}>
              <Skeleton height="52px" borderRadius="12px" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
              <Skeleton height="52px" borderRadius="12px" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
            </VStack>
          )}
          <Box display={paymentReady ? 'block' : 'none'}>
            <PaymentElement
              options={paymentOptions}
              onReady={() => setPaymentReady(true)}
              onChange={(ev) => { if (ev?.value?.type) setSelectedType(ev.value.type); }}
            />
          </Box>
        </Step>

        <VStack spacing={3} align="stretch" pt={{ base: 6, md: 8 }}>
          <Button type="submit" size="lg" h="56px" bg={LIME} color={colors.dark.black} fontWeight="700" borderRadius="full"
            leftIcon={<FiLock />} isLoading={isLoading || isProcessing} isDisabled={!stripe || !elements || !paymentReady}
            loadingText={leaving ? 'Sending you to Stripe...' : 'Processing...'}
            transition={`transform 260ms ${EASE}, filter 260ms ${EASE}, box-shadow 260ms ${EASE}`}
            _hover={{ transform: 'translateY(-1px)', filter: 'brightness(1.05)', boxShadow: `0 14px 36px ${LIME}33` }}
            _active={{ transform: 'translateY(0)' }}>
            {buttonCopy(selectedType, total)}
          </Button>
          <Text color={colors.text.muted} fontSize="xs" lineHeight="1.6" textAlign="center">
            {railNote(selectedType)}
          </Text>
          <Text color={colors.text.muted} fontSize="xs" lineHeight="1.6" textAlign="center">
            By paying you agree to the{' '}
            <Link href="https://neonburro.com/terms/" color={colors.text.secondary} isExternal fontWeight="600" _hover={{ color: LIME }}>Terms</Link>
            {' '}and{' '}
            <Link href="https://neonburro.com/privacy/" color={colors.text.secondary} isExternal fontWeight="600" _hover={{ color: LIME }}>Privacy Policy</Link>.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CheckoutForm;
