import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useCreateVolunteerEnquiry } from '@workspace/api-client-react';
import { Reveal } from '@/components/reveal';
import DonationCard from '@/components/donation-card';
import CommunityInvite from '@/components/community-invite';

function errMessage(e: unknown): string {
  const err = e as { status?: number; data?: { error?: string } | null; message?: string };
  if (err?.data && typeof err.data.error === 'string') return err.data.error;
  if (err?.status === 429) return 'Too many tries from this connection. Please wait a little and try again.';
  if (err?.status && err.status >= 500) return 'Our server had a hiccup. Nothing was saved, please try again shortly.';
  if (err?.status === 400) return 'Please check your name and contact details and try again.';
  return err?.message || 'We could not save your details. Please check your connection and try again.';
}

const field =
  'mt-1.5 w-full rounded-xl border-2 border-plum/25 bg-white px-4 py-3 text-plum placeholder:text-plum/45 focus:border-plum outline-none';

export function Join() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    let p = phone.trim().replace(/[\s()-]/g, '');
    if (/^[6-9]\d{9}$/.test(p)) p = `+91${p}`;
    else if (/^91[6-9]\d{9}$/.test(p)) p = `+${p}`;
    if (n.length < 2 || n.length > 120) return setError('Please enter your name (2 to 120 characters).');
    if (!m && !p) return setError('Please enter either your email or your mobile / WhatsApp number.');
    if (m && (!/^\S+@\S+\.\S+$/.test(m) || m.length > 254)) return setError('Please enter a valid email address, or leave it blank and provide your number.');
    if (p && !/^\+[1-9][0-9]{6,14}$/.test(p)) return setError('Please enter a valid mobile number. Use 10 digits for India or include your country code.');
    if (!consent) return setError('Please tick the box so we know we may contact you.');
    setError(null);
    create.mutate(
      { data: { name: n, ...(m ? { email: m } : {}), ...(p ? { phone: p } : {}), consent: true, website } },
      {
        onSuccess: (r) => {
          setSaved(r.message);
          setName('');
          setEmail('');
          setPhone('');
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
                    className="cta-feedback mt-4 rounded-full border-4 border-plum px-5 py-2 font-bold"
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
                      <input className={field} value={name} onChange={(e) => { setName(e.target.value); setError(null); }} placeholder="Your name" autoComplete="name" maxLength={120} disabled={pending} data-testid="input-join-name" />
                    </label>
                    <label className="block text-sm font-semibold">
                      Email (optional)
                      <input className={field} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} placeholder="Your email address" autoComplete="email" maxLength={254} disabled={pending} data-testid="input-join-email" />
                    </label>
                  </div>
                  <label className="block text-sm font-semibold">
                    Mobile / WhatsApp number (optional)
                    <input className={field} type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(null); }} placeholder="+91 98765 43210" autoComplete="tel" maxLength={30} disabled={pending} aria-describedby="contact-help" data-testid="input-join-phone" />
                  </label>
                  <p id="contact-help" className="text-sm text-plum/75">Provide either an email or a mobile number—or both. Include a country code for numbers outside India.</p>
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>Website
                      <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={200} />
                    </label>
                  </div>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setError(null); }} disabled={pending} className="mt-0.5 size-5 accent-plum shrink-0" data-testid="checkbox-join-consent" />
                    <span>I agree that Kirukans may store my name and contact details and contact me about volunteering by email, phone or WhatsApp.</span>
                  </label>
                  {error && (
                    <p role="alert" className="rounded-xl bg-destructive/10 border-2 border-destructive px-4 py-2 text-sm font-semibold text-destructive" data-testid="text-join-error">{error}</p>
                  )}
                  <button type="submit" disabled={pending} className="cta-feedback inline-flex items-center gap-2 rounded-full bg-plum text-sun font-bold px-7 py-3.5 text-lg disabled:opacity-60" data-testid="button-join-submit">
                    {pending ? <><Loader2 className="size-5 animate-spin" aria-hidden /> Saving...</> : <>Count me in <ArrowUpRight className="size-5" aria-hidden /></>}
                  </button>
                  <p className="text-xs text-plum/70">
                  Privacy: your name, email and/or number stay in a private inbox read by the trust team, and are used only to reply about volunteering.
                  </p>
                </form>
              )}
              <CommunityInvite />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div id="support" className="h-full rounded-3xl bg-plum text-cream p-6 md:p-9 flex flex-col">
              <DonationCard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
