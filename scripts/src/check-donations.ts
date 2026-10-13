import { getUncachableStripeClient } from './stripeClient';

const stripe = await getUncachableStripeClient();
const [account, balance] = await Promise.all([stripe.accounts.retrieve(), stripe.balance.retrieve()]);
console.log(JSON.stringify({
  liveMode: balance.livemode,
  country: account.country,
  chargesEnabled: account.charges_enabled,
}));
