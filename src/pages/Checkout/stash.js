// src/pages/Checkout/stash.js
// SENTINEL: NB_SHOP_CHECKOUT_STASH_V1
//
// The contact and shipping fields a shopper typed, parked in sessionStorage
// for the length of a payment that leaves the site and comes back.
//
// Stripe's stablecoin rail (and any future redirect rail) sends the customer
// to crypto.stripe.com and returns them to /checkout/ with a client secret in
// the URL. By then the React tree that held the form is gone. CheckoutForm
// writes the stash immediately before stripe.confirmPayment, Checkout/index.jsx
// reads it back on return and drops it once the order is finalised.
//
// sessionStorage, not localStorage, on purpose. It dies with the tab, so a
// shared machine does not carry somebody's address into the next visit, and
// it is not needed for anything longer lived than one round trip. If the
// stash is missing on return the page falls back to the shipping and email the
// server wrote onto the PaymentIntent, so losing it costs nothing but a name
// split heuristic.
//
// Both files import the key from here. Do not inline the string in either.
//
// No oxford commas, no em dashes.

export const CHECKOUT_STASH_KEY = 'nb-shop-checkout';

export const readStash = () => {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_STASH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writeStash = (data) => {
  try {
    sessionStorage.setItem(CHECKOUT_STASH_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable. The intent still carries shipping and email.
  }
};

export const dropStash = () => {
  try {
    sessionStorage.removeItem(CHECKOUT_STASH_KEY);
  } catch {
    // Nothing to drop.
  }
};
