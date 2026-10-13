import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useGetDonationConfirmation, getGetDonationConfirmationQueryKey } from '@workspace/api-client-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/closing-sections';
import { homeHash } from '@/lib/stories';

const POLL_MS = 3000;
const TIMEOUT_MS = 60000;

const inr = (paise: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(paise / 100);

export default function DonationResultPage() {
  const sessionId = (() => {
    const s = new URLSearchParams(window.location.search).get('session_id') ?? '';
    return /^cs_[A-Za-z0-9_]{4,250}$/.test(s) ? s : '';
  })();
  const [timedOut, setTimedOut] = useState(false);
  const timedRef = useRef(false);
  timedRef.current = timedOut;

  useEffect(() => {
    document.title = 'Thank you for your support | Kirukans Charitable Trust';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (timedOut) return;
    const t = window.setTimeout(() => setTimedOut(true), TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [timedOut]);

  const q = useGetDonationConfirmation(sessionId, {
    query: {
      queryKey: getGetDonationConfirmationQueryKey(sessionId),
      enabled: !!sessionId,
      retry: 1,
      refetchInterval: (query) =>
        !timedRef.current && query.state.data?.status === 'pending' ? POLL_MS : false,
    },
  });

  const d = q.data;
  const supportHref = homeHash('#support');
  const pill = 'inline-flex items-center gap-2 rounded-full font-bold px-6 py-3 transition-colors';

  let body;
  if (!sessionId) {
    body = (
      <Box title="This link looks incomplete" testid="status-donation-incomplete">
        <p>We could not find a checkout reference in this link, so we cannot confirm a donation. Nothing has been assumed.</p>
        <a href={supportHref} className={`${pill} bg-plum text-sun hover:bg-teal hover:text-plum`} data-testid="link-result-support">Go to giving options</a>
      </Box>
    );
  } else if (q.isLoading) {
    body = (
      <Box title="Checking with Stripe..." testid="status-donation-loading">
        <div className="h-4 w-64 max-w-full rounded bg-plum/15 animate-pulse" />
        <div className="h-4 w-48 rounded bg-plum/15 animate-pulse" />
      </Box>
    );
  } else if (q.isError || !d) {
    body = (
      <Box title="We could not confirm your donation yet" testid="error-donation-confirmation" alert>
        <p>The check did not go through. If you completed checkout, your receipt from Stripe is the record. You can try the check again.</p>
        <button type="button" onClick={() => q.refetch()} className={`${pill} bg-plum text-sun hover:bg-teal hover:text-plum`} data-testid="button-result-retry">
          <RefreshCw className="size-4" aria-hidden /> Check again
        </button>
      </Box>
    );
  } else if (d.status === 'paid') {
    body = (
      <Box title={d.testMode ? 'Your test payment is confirmed.' : 'Thank you. Your gift has arrived.'} testid="status-donation-paid" hand>
        <p>
          Payment of <strong data-testid="text-result-amount">{inr(d.amount, d.currency)}</strong> was confirmed by Stripe.
          {!d.testMode && ' It will go towards our murals, workshops and community work in Trichy.'}
        </p>
        {d.testMode && (
          <p className="rounded-xl bg-sun px-4 py-2 font-bold" data-testid="text-result-testmode">
            Test mode: this was a rehearsal payment. No real money moved and no real donation was made.
          </p>
        )}
        <a href={homeHash('#top')} className={`${pill} bg-plum text-sun hover:bg-teal hover:text-plum`} data-testid="link-result-home">Back to home</a>
      </Box>
    );
  } else if (d.status === 'pending') {
    body = timedOut ? (
      <Box title="Still waiting on confirmation" testid="status-donation-timeout">
        <p>Stripe has not confirmed this payment yet. We have stopped checking for now. This is not a confirmation that a donation was made.</p>
        <button type="button" onClick={() => { setTimedOut(false); q.refetch(); }} className={`${pill} bg-plum text-sun hover:bg-teal hover:text-plum`} data-testid="button-result-recheck">
          <RefreshCw className="size-4" aria-hidden /> Check again
        </button>
      </Box>
    ) : (
      <Box title="Confirming your payment" testid="status-donation-pending">
        <p className="inline-flex items-center gap-2"><Loader2 className="size-5 animate-spin" aria-hidden /> Waiting for Stripe to confirm. This page updates by itself.</p>
      </Box>
    );
  } else {
    body = (
      <Box title={d.status === 'expired' ? 'This checkout expired' : 'No payment was completed'} testid={`status-donation-${d.status}`}>
        <p>No donation was made through this checkout. You are welcome to try again whenever you like.</p>
        <a href={supportHref} className={`${pill} bg-plum text-sun hover:bg-teal hover:text-plum`} data-testid="link-result-retry">Try giving again</a>
      </Box>
    );
  }

  return (
    <div className="grain min-h-[100dvh]">
      <Header />
      <main className="bg-sun text-plum py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <a href={supportHref} className="inline-flex items-center gap-2 font-bold hover:text-tangerine" data-testid="link-result-back">
            <ArrowLeft className="size-4" aria-hidden /> Back to support
          </a>
          <p className="mt-8 font-hand text-3xl">Your donation</p>
          <div className="mt-2" aria-live="polite">{body}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Box({ title, children, testid, alert, hand }: { title: string; children: React.ReactNode; testid: string; alert?: boolean; hand?: boolean }) {
  return (
    <div role={alert ? 'alert' : 'status'} className="rounded-3xl bg-cream border-4 border-plum p-6 md:p-9 space-y-4" data-testid={testid}>
      <h1 className={`${hand ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-tight`}>{title}</h1>
      {children}
    </div>
  );
}
