// src/pages/Checkout/components/ExpressCheckout.jsx
// SENTINEL: NB_SHOP_EXPRESS_CHECKOUT_V1
//
// The one tap row at the top of checkout. Stripe's Express Checkout Element
// draws whatever this device can actually pay with, and nothing else: Apple
// Pay on an iPhone or a Mac in Safari with a card in Wallet, Google Pay in
// Chrome or on Android with a card saved, Link if the shopper has used it
// anywhere on the web. On a device with none of those it draws nothing and
// this component collapses to zero height, so the form below is the first
// thing seen. That is the "understand whether someone is on Apple or Google"
// part of the brief, done by the platform rather than by sniffing a user
// agent.
//
// ── what the wallet supplies ────────────────────────────────────────────────
// onClick tells the sheet what to collect: an email always, a shipping address
// (US only, one free rate) when the saddlebag has physical goods. The shopper
// picks from what their wallet already knows. onConfirm hands back
// billingDetails and shippingAddress and we build the same formData shape the
// long form builds, so Checkout/index.jsx finalises the order the same way
// for both paths. Nobody types anything.
//
// ── why this lives in its own Elements group ────────────────────────────────
// Checkout/index.jsx mounts this inside a second <Elements> provider, separate
// from the one holding the Payment Element and the address fields. On confirm
// we call elements.submit() and stripe.confirmPayment({ elements }), and
// those must not be asked to validate a half filled card form that the
// shopper has just decided to skip. Two groups, same amount and currency,
// each validated on its own.
//
// ── terms ───────────────────────────────────────────────────────────────────
// Consent is clickwrap: the line under every pay control says paying agrees
// to the terms. A checkbox before a one tap button is a one tap button with
// two taps, and the whole point of this row is that there is only one.
//
// No oxford commas, no em dashes.

import { Box, Text, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { colors } from '../../../theme/colors';
import { writeStash } from '../stash';
import { isDigitalItem } from '../../../context/CartContext';

const LIME = colors.accent.signal;

const splitName = (full = '') => {
  const parts = String(full).trim().split(/\s+/);
  return { firstName: parts.shift() || '', lastName: parts.join(' ') };
};

const label = (methods) => {
  if (!methods) return null;
  if (methods.applePay) return 'Apple Pay is ready on this device';
  if (methods.googlePay) return 'Google Pay is ready on this device';
  if (methods.link) return 'Link is ready on this device';
  return null;
};

const ExpressCheckout = ({ cart, total, onPaid, onError, onAvailability }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [available, setAvailable] = useState(null);

  const digitalOnly = cart.length > 0 && cart.every(isDigitalItem);

  const options = {
    buttonType: { applePay: 'buy', googlePay: 'buy' },
    buttonTheme: { applePay: 'white', googlePay: 'white' },
    buttonHeight: 48,
    layout: { maxColumns: 2, maxRows: 1, overflow: 'never' },
    paymentMethodOrder: ['applePay', 'googlePay', 'link'],
  };

  const onReady = ({ availablePaymentMethods }) => {
    setAvailable(availablePaymentMethods || null);
    if (onAvailability) onAvailability(availablePaymentMethods || null);
  };

  // What the sheet should ask for. Physical goods need somewhere to go.
  const onClick = ({ resolve }) => {
    const opts = {
      emailRequired: true,
      phoneNumberRequired: false,
      business: { name: 'neonburro shop' },
    };
    if (!digitalOnly) {
      opts.shippingAddressRequired = true;
      opts.allowedShippingCountries = ['US'];
      opts.shippingRates = [{ id: 'free-us', displayName: 'Free US shipping', amount: 0 }];
    }
    resolve(opts);
  };

  // Free shipping everywhere in the US, so every address and rate is fine.
  const onShippingAddressChange = ({ resolve }) => resolve();
  const onShippingRateChange = ({ resolve }) => resolve();

  const onConfirm = async (event) => {
    if (!stripe || !elements) return;
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const bd = event.billingDetails || {};
      const ship = event.shippingAddress || null;
      const name = ship?.name || bd.name || '';
      const addr = ship?.address || bd.address || {};
      const { firstName, lastName } = splitName(name);
      const formData = {
        firstName,
        lastName,
        email: bd.email || '',
        phone: bd.phone || '',
        address: addr.line1 || '',
        city: addr.city || '',
        state: addr.state || '',
        zip: addr.postal_code || '',
        country: 'United States',
      };
      writeStash({ ...formData, paymentType: event.expressPaymentType || 'wallet' });

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
            reloadCode: item.reloadCode || null,
            delivery: isDigitalItem(item) ? 'digital' : 'ship',
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
          receipt_email: formData.email || undefined,
        },
        redirect: 'if_required',
      });
      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
        onPaid({
          ...formData,
          paymentMethod: event.expressPaymentType || 'wallet',
          paymentIntentId: paymentIntent.id,
          processing: paymentIntent.status === 'processing',
        });
        return;
      }
      throw new Error('The payment was not completed. Please try again.');
    } catch (err) {
      if (event.paymentFailed) event.paymentFailed({ reason: 'fail' });
      if (onError) onError(err.message);
    }
  };

  const hasAny = available && (available.applePay || available.googlePay || available.link);

  return (
    <Box display={hasAny ? 'block' : 'none'} mb={hasAny ? 2 : 0}>
      <HStack justify="space-between" align="baseline" mb={3}>
        <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.18em" textTransform="uppercase" color={colors.text.muted}>
          Fastest
        </Text>
        {label(available) && (
          <HStack spacing={2}>
            <Box w="5px" h="5px" borderRadius="full" bg={LIME} boxShadow={`0 0 8px ${LIME}`} />
            <Text fontFamily="mono" fontSize="9px" letterSpacing="0.14em" textTransform="uppercase" color={colors.text.secondary}>
              {label(available)}
            </Text>
          </HStack>
        )}
      </HStack>

      <ExpressCheckoutElement
        options={options}
        onReady={onReady}
        onClick={onClick}
        onConfirm={onConfirm}
        onShippingAddressChange={onShippingAddressChange}
        onShippingRateChange={onShippingRateChange}
      />

      <HStack spacing={3} align="center" my={5}>
        <Box flex={1} h="1px" bg={colors.ui.border} />
        <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em" textTransform="uppercase" color={colors.text.muted}>
          or pay another way
        </Text>
        <Box flex={1} h="1px" bg={colors.ui.border} />
      </HStack>
    </Box>
  );
};

export default ExpressCheckout;
