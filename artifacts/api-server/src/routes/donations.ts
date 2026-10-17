import { Router, type IRouter } from 'express';
import { rateLimit } from 'express-rate-limit';
import { sql } from 'drizzle-orm';
import { db } from '@workspace/db';
import { CreateDonationCheckoutBody } from '@workspace/api-zod';
import { getUncachableStripeClient } from '../stripeClient';
import { donationsReady } from '../donation-setup';

const router: IRouter = Router();
const checkoutLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 15, standardHeaders: 'draft-8', legacyHeaders: false,
  message: { error: 'Too many checkout attempts. Please try again in a few minutes.' } });
const readLimit = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false,
  message: { error: 'Please wait a moment before checking again.' } });
const sessionIdPattern = /^cs_(?:test_|live_)?[A-Za-z0-9]{16,180}$/;

async function donationPrices() {
  const result = await db.execute(sql`
    SELECT pr.id, pr.unit_amount AS amount
    FROM stripe.prices pr JOIN stripe.products p ON pr.product = p.id
    WHERE p.active = true AND pr.active = true AND pr.currency = 'inr'
      AND (pr.recurring IS NULL OR pr.recurring = 'null'::jsonb)
      AND p.metadata->>'kirukansDonation' = 'v1'
      AND pr.metadata->>'kirukansDonation' = 'v1'
      AND pr.unit_amount IN (50000, 100000, 250000, 500000)
    ORDER BY pr.unit_amount, pr.id
  `);
  const seen = new Set<number>();
  return (result.rows as { id: string; amount: number }[]).filter(row => {
    if (seen.has(row.amount)) return false;
    seen.add(row.amount);
    return true;
  });
}

// Trusted runtime domains, never a user-supplied redirect URL or arbitrary Host.
function checkoutOrigin(origin: string | undefined): string | null {
  const candidates = [
    process.env.PUBLIC_APP_URL,
    process.env.REPLIT_DOMAINS,
    process.env.REPLIT_DEV_DOMAIN,
  ].flatMap(value => value?.split(',') ?? []).map(value => value.trim()).filter(Boolean);
  const trustedOrigins = candidates.flatMap(value => {
    try {
      const url = new URL(value.includes('://') ? value : `https://${value}`);
      return url.protocol === 'https:' ? [url.origin] : [];
    } catch {
      return [];
    }
  });
  if (!origin) return trustedOrigins[0] ?? null;
  try {
    const url = new URL(origin);
    return url.protocol === 'https:' && trustedOrigins.includes(url.origin) ? url.origin : null;
  } catch { return null; }
}

router.get('/donations', readLimit, async (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!donationsReady()) { res.status(503).json({ error: 'Donations are temporarily unavailable. Please try again shortly.' }); return; }
  try {
    const stripe = await getUncachableStripeClient();
    const [balance, account, prices] = await Promise.all([stripe.balance.retrieve(), stripe.accounts.retrieve(), donationPrices()]);
    res.json({ prices, currency: 'inr', testMode: !balance.livemode,
      available: prices.length > 0 && (!balance.livemode || account.charges_enabled === true) });
  } catch {
    res.status(503).json({ error: 'Unable to load donation options. Please try again.' });
  }
});

router.post('/donations/checkout', checkoutLimit, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const origin = checkoutOrigin(req.get('origin'));
  if (!origin || req.get('sec-fetch-site') === 'cross-site') {
    res.status(403).json({ error: 'Please start your donation from the Kirukans website.' }); return;
  }
  const parsed = CreateDonationCheckoutBody.safeParse(req.body);
  if (!parsed.success || !/^price_[A-Za-z0-9]+$/.test(parsed.data.priceId)) {
    res.status(400).json({ error: 'Please choose a valid donation amount.' }); return;
  }
  if (!donationsReady()) { res.status(503).json({ error: 'Donation checkout is temporarily unavailable.' }); return; }
  try {
    const prices = await donationPrices();
    if (!prices.some(price => price.id === parsed.data.priceId)) {
      res.status(400).json({ error: 'This donation option is unavailable. Please reload and choose again.' }); return;
    }
    const stripe = await getUncachableStripeClient();
    const [balance, account, price] = await Promise.all([
      stripe.balance.retrieve(), stripe.accounts.retrieve(), stripe.prices.retrieve(parsed.data.priceId),
    ]);
    if (balance.livemode && account.charges_enabled !== true) {
      res.status(503).json({ error: 'Live donations are not enabled yet.' }); return;
    }
    // Re-check the source of truth before charging, even if a mirror update is delayed.
    if (!price.active || price.currency !== 'inr' || price.recurring
      || price.metadata.kirukansDonation !== 'v1'
      || !prices.some(item => item.id === price.id && item.amount === price.unit_amount)) {
      res.status(400).json({ error: 'The selected donation option has changed. Please reload.' }); return;
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: price.id, quantity: 1 }],
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_creation: 'always',
      submit_type: 'donate',
      success_url: `${origin}/donate/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?donation=cancelled#support`,
      metadata: { kirukansDonation: 'v1' },
      payment_intent_data: { metadata: { kirukansDonation: 'v1' } },
    }, { idempotencyKey: `kirukans-donation-${parsed.data.requestId}` });
    if (!session.url || new URL(session.url).hostname !== 'checkout.stripe.com') {
      throw new Error('Checkout URL unavailable');
    }
    res.status(201).json({ url: session.url, testMode: !session.livemode });
  } catch {
    res.status(503).json({ error: 'We could not open donation checkout. Your payment has not been taken here. Please try again.' });
  }
});

router.get('/donations/confirmation/:sessionId', readLimit, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const sessionId = req.params.sessionId;
  if (typeof sessionId !== 'string' || !sessionIdPattern.test(sessionId)) { res.status(404).json({ error: 'Donation not found.' }); return; }
  if (!donationsReady()) { res.status(503).json({ error: 'Payment verification is temporarily unavailable. Please retry without making a second donation.' }); return; }
  try {
    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.kirukansDonation !== 'v1' || session.mode !== 'payment' || session.currency !== 'inr') {
      res.status(404).json({ error: 'Donation not found.' }); return;
    }
    const status = session.status === 'expired' ? 'expired'
      : session.status === 'complete' && session.payment_status === 'paid' ? 'paid'
      : session.status === 'complete' ? 'pending' : 'unpaid';
    res.json({ status, amount: session.amount_total ?? 0, currency: session.currency,
      testMode: !session.livemode });
  } catch (error) {
    if ((error as { code?: string }).code === 'resource_missing') {
      res.status(404).json({ error: 'Donation not found.' }); return;
    }
    res.status(503).json({ error: 'Unable to verify payment right now. Please retry without making a second donation.' });
  }
});

export default router;
