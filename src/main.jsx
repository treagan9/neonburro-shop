import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// Geist, the same faces the marketing site uses. The theme has been asking for
// Geist Sans and Geist Mono since it was written, index.html was loading Inter
// and JetBrains from Google Fonts, and nobody noticed the shop was rendering in
// a different typeface to neonburro.com. Self hosted, no third party request.
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
import App from './App.jsx';
import './index.css';
import { getStripeKey } from './config/stripe';

const stripePromise = loadStripe(getStripeKey());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);
