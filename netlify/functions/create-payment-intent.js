// netlify/functions/create-payment-intent.js
// SENTINEL: NB_SHOP_PAYMENT_INTENT_V2
//
// Creates the Stripe PaymentIntent for a shop order (and, for the older
// service invoice path, an invoice payment). The browser calls this from
// src/pages/Checkout/components/CheckoutForm.jsx after the customer has filled
// the Payment Element, then confirms the returned client secret client side.
//
// ── rails ───────────────────────────────────────────────────────────────────
// automatic_payment_methods is on and payment_method_types is deliberately not
// sent. That means the Stripe Dashboard decides which methods the Payment
// Element shows: card, Apple Pay, Google Pay, Link and, once "Stablecoins and
// Crypto" is approved and enabled in Dashboard > Settings > Payment methods,
// USDC on Solana, Base, Ethereum or Polygon settled to us in dollars. No code
// change and no redeploy is needed to turn a rail on here. That is different
// from neonburro.com's hosted Checkout functions, which list types explicitly
// and gate crypto behind an env var, because hosted Checkout 400s on a type the
// account is not approved for while the Payment Element simply hides it.
//
// ── why shipping and contact live on the intent ─────────────────────────────
// Some rails redirect the customer off our site (stablecoins go to
// crypto.stripe.com and come back). If the browser is lost on the way back the
// only durable copy of the order is what Stripe holds. So the customer's name,
// phone and address are written to `shipping` and to metadata here, at intent
// creation, before any redirect can happen. The Netlify form post in
// Checkout/index.jsx is a convenience copy, Stripe is the record.
//
// Stripe metadata is 50 keys and 500 characters per value. items_json is
// truncated defensively, the per item keys cover the first five for the
// Dashboard's benefit, and the full cart is on the Netlify form.
//
// No oxford commas, no em dashes.

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const clip = (value, max = 480) => {
  const s = String(value ?? '');
  return s.length > max ? s.slice(0, max) : s;
};

const shopMetadata = ({ customerEmail, items, customer }) => {
  const metadata = {
    type: 'shop_order',
    customer_email: clip(customerEmail, 200),
    items_count: String(items.length),
    items_json: clip(JSON.stringify(items.map((i) => ({
      id: i.id,
      n: i.name,
      p: i.price,
      q: i.quantity,
      s: i.selectedSize || undefined,
      d: i.selectedDesign || undefined,
      t: i.selectedTier || undefined,
    })))),
  };

  if (customer) {
    if (customer.name) metadata.customer_name = clip(customer.name, 200);
    if (customer.phone) metadata.customer_phone = clip(customer.phone, 40);
    const line = [customer.address, customer.city, customer.state, customer.zip].filter(Boolean).join(', ');
    if (line) metadata.ship_to = clip(line, 400);
  }

  items.slice(0, 5).forEach((item, index) => {
    const prefix = `item_${index + 1}`;
    metadata[`${prefix}_name`] = clip(item.name, 120);
    metadata[`${prefix}_quantity`] = String(item.quantity);
    metadata[`${prefix}_price`] = String(item.price);
    if (item.selectedSize) metadata[`${prefix}_size`] = clip(item.selectedSize, 40);
    if (item.selectedDesign) metadata[`${prefix}_design`] = clip(item.selectedDesign, 80);
    if (item.selectedTier) metadata[`${prefix}_tier`] = clip(item.selectedTier, 40);
  });

  return metadata;
};

const shippingFor = (customer) => {
  if (!customer || !customer.name || !customer.address) return undefined;
  return {
    name: clip(customer.name, 200),
    phone: customer.phone ? clip(customer.phone, 40) : undefined,
    address: {
      line1: clip(customer.address, 200),
      city: clip(customer.city, 100),
      state: clip(customer.state, 40),
      postal_code: clip(customer.zip, 20),
      country: 'US',
    },
  };
};

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const isShopOrder = body.type === 'shop';

    if (isShopOrder) {
      const { amount, customerEmail, items, customer } = body;

      if (!amount || !customerEmail || !Array.isArray(items) || items.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      const cents = Math.round(Number(amount) * 100);
      if (!Number.isFinite(cents) || cents < 50) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid amount' }),
        };
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: cents,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        receipt_email: customerEmail,
        description: `Neon Burro Shop · ${items.length} item${items.length === 1 ? '' : 's'}`,
        shipping: shippingFor(customer),
        metadata: shopMetadata({ customerEmail, items, customer }),
        statement_descriptor_suffix: 'NEONBURRO',
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id }),
      };
    }

    // Older service invoice path. Left as it was, nothing on the shop calls it
    // today but the endpoint is public and something may.
    const { amount, firstName, projectName, hours } = body;

    if (!amount || !firstName || !projectName || !hours) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        type: 'service_invoice',
        firstName: clip(firstName, 100),
        projectName: clip(projectName, 200),
        hours: String(hours),
      },
      statement_descriptor_suffix: 'NEONBURRO',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id }),
    };
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Payment processing failed',
        details: error.message,
      }),
    };
  }
};
