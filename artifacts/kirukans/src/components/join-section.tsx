import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, HeartHandshake, Loader2, Phone, Youtube } from 'lucide-react';
import { useCreateVolunteerEnquiry } from '@workspace/api-client-react';
import { Reveal } from '@/components/reveal';
import { PHONE_HREF, PHONE_TEXT, YOUTUBE } from '@/lib/site-data';

function errMessage(e: unknown): string {
  const err = e as { status?: number; data?: { error?: string } | null; message?: string };
  if (err?.data && typeof err.data.error === 'string') return err.data.error;
  if (err?.status === 429) return 'Too many tries from this connection. Please wait a little and try again.';
  if (err?.status && err.status >= 500) return 'Our server had a hiccup. Nothing was saved, please try again shortly.';
  if (err?.status === 400) return 'Please check your name and email and try again.';
  return err?.message || 'We could not save your details. Please check your connection and try again.';
}

const field =
  'mt-1.5 w-full rounded-xl border-2 border-plum/25 bg-white px-4 py-3 text-plum placeholder:text-plum/45 focus:border-plum outline-none';

export function Join() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const create = useCreateVolunteerEnquiry();
  const pending = create.isPending;

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (pending) return;
    const n = name.trim();
    const m = email.trim();
    if (n.length < 2 || n.length > 120) return setError('Please enter your name (2 to 120 characters).');
    if (!/^\S+@\S+\.\S+$/.test(m) || m.length > 254) return setError('Please enter a valid email address.');
    if (!consent) return setError('Please tick the box so we know we may contact you.');
    setError(null);
    create.mutate(
      { data: { name: n, email: m, consent: true, website } },
      {
        onSuccess: (r) => {
          setSaved(r.message);
          setName('');
          setEmail('');
          setConsent(false);
          setWebsite('');
        },
        onError: (e) => setError(errMessage(e)),
      },
    );
  }

  return (
    <section id="join" className="bg-sun text-plum py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-hand text-3xl">Be part of the goodness</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
                Your time. Your talent. A little more goodness.
              </h2>
            </div>
            <p className="text-lg md:max-w-sm md:ml-auto">
              Paint, create, lend a hand or help a cause. Let's make a brighter future together.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="h-full rounded-3xl bg-cream border-4 border-plum p-6 md:p-9">
              <h3 className="text-3xl font-extrabold">Join Kirukans</h3>
              <p className="mt-3 text-plum/75">
                Bring your creativity and care to murals, workshops, outreach and volunteer programs.
              </p>
              {saved ? (
                <div role="status" className="mt-6 rounded-2xl bg-teal/25 border-2 border-plum p-5" data-testid="status-join-saved">
                  <p className="font-hand text-3xl">Thank you!</p>
                  <p className="font-semibold">{saved || 'Your interest has been saved.'}</p>
                  <button
                    type="button"
                    onClick={() => { setSaved(null); create.reset(); }}
                    className="mt-4 rounded-full border-4 border-plum px-5 py-2 font-bold hover:bg-plum hover:text-sun transition-colors"
                    data-testid="button-join-another"
                  >
                    Submit another interest
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold">
                      Name
                      <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" maxLength={120} disabled={pending} data-testid="input-join-name" />
                    </label>
                    <label className="block text-sm font-semibold">
                      Email
                      <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" autoComplete="email" maxLength={254} disabled={pending} data-testid="input-join-email" />
                    </label>
                  </div>
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>Website
                      <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={200} />
                    </label>
                  </div>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} disabled={pending} className="mt-0.5 size-5 accent-plum shrink-0" data-testid="checkbox-join-consent" />
                    <span>I agree that Kirukans may store my name and email and contact me about volunteering.</span>
                  </label>
                  {error && (
                    <p role="alert" className="rounded-xl bg-destructive/10 border-2 border-destructive px-4 py-2 text-sm font-semibold text-destructive" data-testid="text-join-error">{error}</p>
                  )}
                  <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-plum text-sun font-bold px-7 py-3.5 text-lg hover:bg-teal hover:text-plum transition-colors disabled:opacity-60" data-testid="button-join-submit">
                    {pending ? <><Loader2 className="size-5 animate-spin" aria-hidden /> Saving...</> : <>Count me in <ArrowUpRight className="size-5" aria-hidden /></>}
                  </button>
                  <p className="text-xs text-plum/70">
                    Privacy: we keep only your name and email, in a private inbox read by the trust team, and use them only to reply about volunteering.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div id="support" className="h-full rounded-3xl bg-plum text-cream p-6 md:p-9 flex flex-col">
              <HeartHandshake className="size-9 text-sun" aria-hidden />
              <h3 className="mt-6 text-3xl font-extrabold">Help kindness go further.</h3>
              <p className="mt-4 text-cream/80">
                Support our murals, creative workshops and community initiatives. Call the trust to discuss how you can contribute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-sun text-plum font-bold px-6 py-3 hover:bg-teal transition-colors" data-testid="link-support-call">
                  Support by phone <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-sun text-sun font-bold px-6 py-3 hover:bg-sun hover:text-plum transition-colors" data-testid="link-youtube">
                  <Youtube className="size-4" aria-hidden /> Watch on YouTube
                </a>
              </div>
              <a href={PHONE_HREF} className="mt-auto pt-8 inline-flex items-center gap-2 text-sm text-cream/80 hover:text-sun" data-testid="link-join-call">
                <Phone className="size-4" aria-hidden /> Trust contact · {PHONE_TEXT}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
