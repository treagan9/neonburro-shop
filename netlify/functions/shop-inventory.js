// netlify/functions/shop-inventory.js
// SENTINEL: NB_SHOP_INVENTORY_FN_V1
//
// Reads on hand counts out of the same Supabase project Pulse writes to, so the
// shop and the back office cannot disagree about what is on the shelf.
//
// KEY RESOLUTION, DO NOT SIMPLIFY THIS
// Supabase issued a new key generation (sb_secret_ / sb_publishable_) and the
// legacy service_role and anon JWTs still exist in a lot of dashboards while no
// longer being the ones that work. The main site lost three months of form
// submissions to exactly this. The chain below tries the new format first and
// falls back, so a project on either generation works without a code change.
//
// This endpoint is public and read only. It returns counts and nothing else, no
// cost, no supplier, no customer. Do not widen the select.
//
// No oxford commas, no em dashes.

const supabaseUrl = () => process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || null;

const supabaseKey = () =>
  process.env.SUPABASE_SECRET_KEY
  || process.env.SUPABASE_SERVICE_ROLE_KEY
  || process.env.SUPABASE_PUBLISHABLE_KEY
  || process.env.SUPABASE_ANON_KEY
  || null;

const json = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: {
    'content-type': 'application/json',
    'cache-control': 'public, max-age=30, stale-while-revalidate=120',
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

export const handler = async () => {
  const url = supabaseUrl();
  const key = supabaseKey();

  // No credentials is not an error the customer should see. An empty item list
  // makes every product fall back to its static inStock flag, which is closed.
  if (!url || !key) {
    return json(200, { items: [], source: 'unconfigured' });
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/shop_inventory?select=product_id,variant_id,on_hand,updated_at`,
      { headers: { apikey: key, authorization: `Bearer ${key}` } }
    );

    if (!res.ok) {
      return json(200, { items: [], source: 'upstream-error', status: res.status });
    }

    const rows = await res.json();
    return json(200, {
      source: 'supabase',
      fetchedAt: new Date().toISOString(),
      items: rows.map((r) => ({
        productId: r.product_id,
        variantId: r.variant_id || null,
        onHand: Number(r.on_hand) || 0,
        updatedAt: r.updated_at || null,
      })),
    });
  } catch (err) {
    return json(200, { items: [], source: 'exception', message: String(err.message || err) });
  }
};

export default handler;
