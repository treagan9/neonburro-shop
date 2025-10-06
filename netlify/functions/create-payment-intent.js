import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event, context) => {
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
    
    // Handle both shop orders and service invoices
    const isShopOrder = body.type === 'shop';
    
    if (isShopOrder) {
      const { amount, customerEmail, items } = body;

      if (!amount || !customerEmail || !items) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      // Build metadata with variant details for order tracking
      const metadata = {
        type: 'shop_order',
        customer_email: customerEmail,
        items_count: items.length.toString(),
        items_json: JSON.stringify(items),
      };

      // Add individual item metadata for easier Stripe dashboard viewing
      items.forEach((item, index) => {
        if (index < 5) { // Stripe metadata has limits, so only first 5 items
          const prefix = `item_${index + 1}`;
          metadata[`${prefix}_name`] = item.name;
          metadata[`${prefix}_quantity`] = item.quantity.toString();
          metadata[`${prefix}_price`] = item.price.toString();
          if (item.selectedSize) metadata[`${prefix}_size`] = item.selectedSize;
          if (item.selectedDesign) metadata[`${prefix}_design`] = item.selectedDesign;
          if (item.selectedTier) metadata[`${prefix}_tier`] = item.selectedTier;
        }
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        receipt_email: customerEmail,
        metadata,
        statement_descriptor_suffix: 'NEONBURRO',
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } else {
      // Handle service invoice (existing logic)
      const { amount, firstName, projectName, hours } = body;

      if (!amount || !firstName || !projectName || !hours) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: {
          type: 'service_invoice',
          firstName,
          projectName,
          hours: hours.toString(),
        },
        statement_descriptor_suffix: 'NEONBURRO',
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    }
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Payment processing failed',
        details: error.message 
      }),
    };
  }
};
