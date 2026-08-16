// netlify/functions/solana-pay-request.js
// SENTINEL: NB_SHOP_SOLANA_REQUEST_V1
//
// Opens a direct Solana payment. The browser posts the saddlebag and whatever
// the customer chose to tell us (all optional on this rail), we mint a
// reference, price it, write the row and hand back the Solana Pay URL. The
// browser draws that as a QR and a tap to open link, then polls
// solana-pay-status until it lands. See _solana.js for the whole rail.
//
// The amount is priced HERE and locked in the row. The browser never sends a
// token amount, only the dollar total, and the dollar total is recomputed from
// the items so a tampered client cannot pay two cents for a hoodie.
//
// No oxford commas, no em dashes.

import {
  RECIPIENT, REQUEST_TTL_MIN, newReference, payUrl, solPriceUsd, tokenAmountFor,
  formatAmount, db, json,
} from './_solana.js';

const clip = (v, n) => String(v ?? '').slice(0, n);

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  try {
    const body = JSON.parse(event.body || '{}');
    const currency = body.currency === 'SOL' ? 'SOL' : 'USDC';
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) return json(400, { error: 'Nothing in the saddlebag' });

    const amountUsd = Math.round(items.reduce((n, i) => n + Number(i.price || 0) * Number(i.quantity || 0), 0) * 100) / 100;
    if (!Number.isFinite(amountUsd) || amountUsd < 0.5) return json(400, { error: 'Invalid amount' });

    let priceUsd = 1;
    if (currency === 'SOL') {
      priceUsd = await solPriceUsd();
      if (!priceUsd) return json(503, { error: 'SOL price is unavailable right now. USDC still works.' });
    }
    const amountToken = tokenAmountFor(amountUsd, currency, priceUsd);

    const reference = newReference();
    const customer = {
      name: clip(body.customer?.name, 200) || null,
      email: clip(body.customer?.email, 200) || null,
      address: clip(body.customer?.address, 400) || null,
    };
    const expiresAt = new Date(Date.now() + REQUEST_TTL_MIN * 60 * 1000).toISOString();
    const memo = `neonburro shop ${reference.slice(0, 8)}`;
    const message = `neonburro shop · ${items.length} item${items.length === 1 ? '' : 's'} · $${amountUsd.toFixed(2)}`;

    await db('solana_payments', {
      method: 'POST',
      prefer: 'return=minimal',
      body: {
        reference,
        recipient: RECIPIENT,
        site: 'shop',
        currency,
        amount_usd: amountUsd,
        amount_token: amountToken,
        price_usd: priceUsd,
        status: 'pending',
        customer,
        items: items.slice(0, 40).map((i) => ({
          id: clip(i.id, 80), name: clip(i.name, 120), price: Number(i.price || 0), quantity: Number(i.quantity || 0),
          size: i.selectedSize || null, design: i.selectedDesign || null, tier: i.selectedTier || null,
          reloadCode: i.reloadCode || null, delivery: i.delivery === 'digital' ? 'digital' : 'ship',
        })),
        memo,
        expires_at: expiresAt,
      },
    });

    return json(200, {
      reference,
      recipient: RECIPIENT,
      currency,
      amountUsd,
      amountToken: formatAmount(amountToken, currency),
      priceUsd,
      url: payUrl({ recipient: RECIPIENT, amountToken, currency, reference, message, memo }),
      expiresAt,
    });
  } catch (err) {
    console.error('solana-pay-request failed', err);
    return json(500, { error: 'Could not open the direct payment', details: err.message });
  }
};
