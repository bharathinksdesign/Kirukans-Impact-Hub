import Stripe from 'stripe';

// Fetch fresh connection credentials each time. Never print or persist them.
export async function getUncachableStripeClient(): Promise<Stripe> {
  const host = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const token = process.env.REPL_IDENTITY
    ? `repl ${process.env.REPL_IDENTITY}`
    : process.env.WEB_REPL_RENEWAL ? `depl ${process.env.WEB_REPL_RENEWAL}` : null;
  if (!host || !token) throw new Error('Stripe connection is unavailable.');
  const res = await fetch(
    `https://${host}/api/v2/connection?include_secrets=true&connector_names=stripe`,
    { headers: { Accept: 'application/json', X_REPLIT_TOKEN: token }, signal: AbortSignal.timeout(10000) },
  );
  if (!res.ok) throw new Error(`Stripe connection returned HTTP ${res.status}.`);
  const data = await res.json() as { items?: Array<{ settings?: { secret_key?: string; secret?: string } }> };
  const settings = data.items?.find((item: { settings?: { secret_key?: string; secret?: string } }) => item.settings?.secret_key || item.settings?.secret)?.settings;
  const secretKey = settings?.secret_key ?? settings?.secret;
  if (!secretKey) throw new Error('Stripe connection is missing its payment key.');
  return new Stripe(secretKey, { timeout: 20000, maxNetworkRetries: 1 });
}
