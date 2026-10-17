import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from './stripeClient';
import { logger } from './lib/logger';

let ready = false;
export const donationsReady = () => ready;

export async function initializeDonations() {
  try {
    if (!process.env.DATABASE_URL) throw new Error('Database required');
    await runMigrations({ databaseUrl: process.env.DATABASE_URL });
    const sync = await getStripeSync();

    if (process.env.STRIPE_SECRET_KEY?.trim()) {
      if (!process.env.STRIPE_WEBHOOK_SECRET?.trim()) {
        throw new Error('STRIPE_WEBHOOK_SECRET is required for direct Stripe credentials');
      }
      const publicUrl = process.env.PUBLIC_APP_URL?.trim();
      if (!publicUrl) throw new Error('PUBLIC_APP_URL is required for direct Stripe credentials');
      const parsedUrl = new URL(publicUrl);
      if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
        throw new Error('PUBLIC_APP_URL must be an HTTPS origin without a path');
      }
    } else {
      const domain = process.env.REPLIT_DOMAINS?.split(',')[0]?.trim();
      if (!domain) throw new Error('Public domain required for payment webhooks');
      await sync.findOrCreateManagedWebhook(`https://${domain}/api/stripe/webhook`);
    }

    await sync.syncBackfill({ object: 'all' });
    ready = true;
    logger.info('Stripe donation sync is ready');
  } catch {
    // Payment outages must not take down the volunteer form or the public site.
    ready = false;
    logger.error('Stripe donation setup failed; donation checkout is unavailable');
  }
}
