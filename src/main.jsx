// src/main.jsx
//
// Entry. Fonts, the app, nothing else.
//
// Stripe used to be mounted here as a bare <Elements stripe={...}> around the
// whole app, which is the legacy card element setup. The Payment Element needs
// an Elements provider that knows the amount and currency, and the amount is
// the cart total, so the provider now lives inside src/pages/Checkout/index.jsx
// where the cart is. Loading Stripe.js there also means the rest of the shop
// never pays for it.
//
// Geist, the same faces the marketing site uses. The theme has been asking for
// Geist Sans and Geist Mono since it was written, index.html was loading Inter
// and JetBrains from Google Fonts, and nobody noticed the shop was rendering in
// a different typeface to neonburro.com. Self hosted, no third party request.
//
// No oxford commas, no em dashes.

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
