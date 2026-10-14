import { useRef, useState } from 'react';
import { HeartHandshake, Loader2, Lock, Phone, RefreshCw } from 'lucide-react';
import {
  useCreateDonationCheckout,
  useGetDonationOptions,
  getGetDonationOptionsQueryKey,
} from '@workspace/api-client-react';
import { PHONE_HREF, PHONE_TEXT } from '@/lib/site-data';

const inr = (paise: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(paise / 100);

function isStripeUrl(u: unknown): u is string {
  if (typeof u !== 'string') return false;
  try {
    const p = new URL(u);
    return p.protocol === 'https:' && p.origin === 'https://checkout.stripe.com';
  } catch {
    return false;
  }
}

function errMessage(e: unknown): string {
  const err = e as { status?: number; data?: { error?: string } | null; message?: string };
  if (err?.data && typeof err.data.error === 'string') return err.data.error;
  if (err?.status === 429) return 'Too many tries from this connection. Please wait a little and try again.';
  if (err?.status && err.status >= 500) return 'Our server had a hiccup. No payment was started, please try again shortly.';
  return 'We could not open secure checkout. No payment was taken. Please check your connection and try again.';
}

export default function DonationCard() {
  const opts = useGetDonationOptions({ query: { queryKey: getGetDonationOptionsQueryKey(), retry: 1 } });
  const checkout = useCreateDonationCheckout();
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const req = useRef<{ priceId: string; id: string } | null>(null);
  const cancelled =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('donation') === 'cancelled';
  const [dismissed, setDismissed] = useState(false);

  const data = opts.data;
  const busy = checkout.isPending || redirecting;

  function choose(id: string) {
    if (busy) return;
    setSelected(id);
    setError(null);
    if (req.current && req.current.priceId !== id) req.current = null;
  }

  async function donate() {
    if (!selected || busy || !data?.available) return;
    if (!req.current || req.current.priceId !== selected) {
      req.current = { priceId: selected, id: crypto.randomUUID() };
    }
    setError(null);
    try {
      const r = await checkout.mutateAsync({ data: { priceId: selected, requestId: req.current.id } });
      if (!isStripeUrl(r?.url)) {
        setError('We received an unexpected response, so checkout was not opened. No payment was taken.');
        return;
      }
      setRedirecting(true);
      window.location.assign(r.url);
    } catch (e) {
      setError(errMessage(e));
    }
  }

  const prices = data?.prices ?? [];
  const selectedPrice = prices.find((p) => p.id === selected);

  return (
    <div className="h-full flex flex-col" data-testid="card-donation">
      <HeartHandshake className="size-9 text-sun" aria-hidden />
      <h3 className="mt-6 text-3xl font-extrabold">Help kindness go further.</h3>
      <p className="mt-4 text-cream/80">
        Give once towards our murals, creative workshops and community initiatives. Choose an amount and finish on Stripe's secure checkout.
      </p>

      {cancelled && !dismissed && (
        <div role="status" className="mt-5 rounded-2xl border-2 border-cream/40 px-4 py-3 text-sm" data-testid="status-donation-cancelled">
          Checkout was closed. You are welcome to choose an amount and try again whenever you like.
          <button type="button" onClick={() => setDismissed(true)} className="ml-2 underline font-semibold hover:text-sun" data-testid="button-dismiss-cancelled">
            Dismiss
          </button>
        </div>
      )}

      <div className="mt-6" aria-busy={opts.isLoading}>
        {opts.isLoading ? (
          <div className="grid grid-cols-2 gap-3" data-testid="skeleton-donation">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-2xl bg-cream/15 animate-pulse" />
            ))}
          </div>
        ) : opts.isError || !data ? (
          <div role="alert" className="rounded-2xl border-2 border-sun/70 p-4" data-testid="error-donation-options">
            <p className="font-semibold">We could not load the donation amounts.</p>
            <button type="button" onClick={() => opts.refetch()} className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-sun text-sun font-bold px-5 py-2 hover:bg-sun hover:text-plum transition-colors" data-testid="button-donation-retry">
              <RefreshCw className="size-4" aria-hidden /> Try again
            </button>
          </div>
        ) : !data.available || prices.length === 0 ? (
          <div role="status" className="rounded-2xl border-2 border-cream/40 p-4" data-testid="status-donation-unavailable">
            <p className="font-semibold">Online giving is not open right now.</p>
            <p className="mt-1 text-sm text-cream/80">No donation can be made on this page at the moment. Please call the trust to talk about supporting our work.</p>
          </div>
        ) : (
          <fieldset disabled={busy} className="border-0 p-0 m-0 min-w-0">
            <legend className="text-sm font-semibold text-cream/80 mb-3">Choose a one-time gift</legend>
            {data.testMode && (
              <p className="mb-3 rounded-xl bg-sun text-plum px-4 py-2 text-sm font-bold" data-testid="text-donation-testmode">
                Test mode: checkout is a rehearsal. No real money will be charged and no real donation is made.
              </p>
            )}
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Donation amount">
              {prices.map((p) => {
                const on = p.id === selected;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => choose(p.id)}
                    className={`rounded-2xl border-2 px-4 py-3.5 text-xl font-extrabold transition-colors disabled:opacity-60 ${on ? 'bg-sun text-plum border-sun' : 'border-cream/40 text-cream hover:border-sun hover:text-sun'}`}
                    data-testid={`button-amount-${p.id}`}
                  >
                    {inr(p.amount, data.currency)}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-cream text-destructive border-2 border-destructive px-4 py-2 text-sm font-semibold" data-testid="text-donation-error">
          {error} Your chosen amount is still selected.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={donate}
          disabled={!selected || busy || !data?.available}
          className="cta-feedback inline-flex items-center gap-2 rounded-full bg-sun text-plum font-bold px-7 py-3 disabled:opacity-60"
          data-testid="button-donate"
        >
          {busy ? (
            <><Loader2 className="size-5 animate-spin" aria-hidden /> Opening secure checkout...</>
          ) : (
            <><Lock className="size-4" aria-hidden /> {selectedPrice && data ? `Donate ${inr(selectedPrice.amount, data.currency)}` : 'Donate'}</>
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-cream/70">
          Guest checkout: no account needed. Stripe collects your email for payment confirmation. Card details stay on Stripe’s checkout.
      </p>

      <a href={PHONE_HREF} className="mt-auto pt-8 inline-flex items-center gap-2 text-sm text-cream/80 hover:text-sun" data-testid="link-join-call">
        <Phone className="size-4" aria-hidden /> Questions? Trust contact · {PHONE_TEXT}
      </a>
    </div>
  );
}
