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
// The latin-*.css entry points are deliberate, same as the studio's main.jsx:
// the bare 400.css files register every subset fontsource ships (cyrillic,
// vietnamese, latin-ext, symbols) and the build emits woff files nobody's
// browser asks for. Latin is the only subset the shop sets.
//
// No oxford commas, no em dashes.

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-500.css';
import '@fontsource/geist-sans/latin-600.css';
import '@fontsource/geist-sans/latin-700.css';
import '@fontsource/geist-mono/latin-400.css';
import '@fontsource/geist-mono/latin-500.css';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
