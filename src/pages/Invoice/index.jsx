// src/pages/Invoice/index.jsx
import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HourPurchaseForm from './components/HourPurchaseForm';
import InvoiceSuccess from './components/InvoiceSuccess';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Invoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [sessionId, setSessionId] = useState('');

  // Generate unique session ID for tracking
  useEffect(() => {
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(id);
  }, []);

  // SIMPLIFIED: Single form submission function
  const submitToNetlify = async (data) => {
    try {
      // Ensure ALL data is properly formatted as strings
      const formattedData = {};
      
      Object.keys(data).forEach(key => {
        const value = data[key];
        
        // Convert all values to strings, handling different types
        if (value === null || value === undefined) {
          formattedData[key] = '';
        } else if (typeof value === 'boolean') {
          formattedData[key] = value ? 'true' : 'false';
        } else if (typeof value === 'number') {
          formattedData[key] = String(value);
        } else if (typeof value === 'object') {
          formattedData[key] = JSON.stringify(value);
        } else {
          formattedData[key] = String(value);
        }
      });

      // Add session info
      formattedData.sessionId = sessionId;
      formattedData.timestamp = new Date().toISOString();

      // Submit to the single comprehensive form
      const formBody = new URLSearchParams({
        'form-name': 'payment-complete',
        ...formattedData
      });

      console.log('Submitting to Netlify:', formattedData);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      if (!response.ok) {
        console.error(`Form submission failed: ${response.status}`);
      } else {
        console.log('Successfully submitted to Netlify');
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  };

  // SIMPLIFIED: Single tracking function that handles all events
  const trackEvent = async (eventType, data) => {
    console.log(`Event: ${eventType}`, data);
    
    // Only submit complete payment data to Netlify
    if (eventType === 'payment-completed' || eventType === 'payment-complete') {
      await submitToNetlify({
        action: 'payment-success',
        ...data
      });
    }
    // For other events, just log them (remove this in production)
    // This reduces the number of form submissions and prevents errors
  };

  const handleSuccess = (data) => {
    console.log('Payment successful with data:', data);
    setFormData(data);
    onOpen();
  };

  const handleClose = () => {
    setFormData(null);
    onClose();
  };

  return (
    <Elements stripe={stripePromise}>
      <Box minH="100vh" bg="#0A0A0A">
        <Container maxW={{ base: "100%", md: "800px", lg: "900px" }} pt={32} pb={20} px={{ base: 4, md: 6 }}>
          <HourPurchaseForm 
            onSuccess={handleSuccess} 
            sessionId={sessionId}
            onTrackEvent={trackEvent}
          />
        </Container>
        
        {/* Success Modal */}
        {formData && (
          <InvoiceSuccess 
            isOpen={isOpen} 
            onClose={handleClose} 
            formData={formData}
            sessionId={sessionId}
            onTrackEvent={trackEvent}
          />
        )}
      </Box>
    </Elements>
  );
};

export default Invoice;