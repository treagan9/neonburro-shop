import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
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
