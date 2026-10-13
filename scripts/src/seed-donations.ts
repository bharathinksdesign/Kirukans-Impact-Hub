import { getUncachableStripeClient } from './stripeClient';

const stripe = await getUncachableStripeClient();
const balance = await stripe.balance.retrieve();
if (balance.livemode) throw new Error('This seed script only creates test-mode donation options.');
const products = await stripe.products.search({ query: "metadata['kirukansDonation']:'v1' AND active:'true'" });
const product = products.data[0] ?? await stripe.products.create({
  name: 'Kirukans community donation',
  description: 'A one-time contribution towards creative workshops, murals and community initiatives.',
  metadata: { kirukansDonation: 'v1' },
}, { idempotencyKey: 'kirukans-donation-product-v1' });
for (const rupees of [500, 1000, 2500, 5000]) {
  const lookupKey = `kirukans_donation_inr_${rupees}`;
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], active: true });
  if (!existing.data.length) {
    await stripe.prices.create({
      product: product.id, unit_amount: rupees * 100, currency: 'inr',
      lookup_key: lookupKey, metadata: { kirukansDonation: 'v1' },
    }, { idempotencyKey: lookupKey });
  }
}
console.log('Test-mode INR donation options ready: 500, 1000, 2500, 5000.');
