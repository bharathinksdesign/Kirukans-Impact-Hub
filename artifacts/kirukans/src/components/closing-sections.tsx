import { Phone, Youtube, MapPin } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { gallery, img, PHONE_HREF, PHONE_TEXT, YOUTUBE } from '@/lib/site-data';

export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="font-hand text-3xl text-tangerine">Paint on our hands</p>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">The gallery</h2>
        <p className="mt-3 text-muted-foreground">Tap any photo to look closer.</p>
      </Reveal>
      <div className="mt-10 columns-2 md:columns-3 gap-4">
        {gallery.map((g, i) => (
          <button
            key={g.src}
            onClick={() => onOpen(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border-2 border-plum"
            data-testid={`button-gallery-${i}`}
            aria-label={`Open photo: ${g.cap}`}
          >
            <img src={img(g.src)} alt={g.alt} loading="lazy" className="w-full group-hover:scale-105 transition-transform duration-700" />
            <span className="absolute inset-x-0 bottom-0 bg-plum/85 text-cream text-sm font-semibold p-2 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform">
              {g.cap}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

const stats = [
  ['25+', 'murals across government schools and hospitals'],
  ['5+', 'art and creative workshops'],
  ['3+', 'Feed the Homeless drives'],
  ['3+', 'community initiatives'],
];
const acts = ['Transgender community programs', 'Government school initiatives', 'Pongal celebrations', 'Hospital murals', 'Donation drives', 'Volunteer programs'];

export function Impact() {
  return (
    <section id="impact" className="bg-teal text-plum py-20 md:py-28 border-y-4 border-plum">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">What the brushes added up to</h2>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(([n, l], i) => (
            <Reveal key={l} delay={i * 80}>
              <div className="rounded-3xl bg-cream border-4 border-plum p-6 h-full">
                <dt className="text-6xl md:text-7xl font-extrabold text-tangerine">{n}</dt>
                <dd className="mt-2 font-semibold">{l}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <ul className="mt-10 flex flex-wrap gap-3">
          {acts.map((a) => (
            <li key={a} className="rounded-full bg-plum text-sun font-bold px-5 py-2">{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Join() {
  return (
    <section id="join" className="bg-sun text-plum py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <p className="font-hand text-4xl">Bring a brush. Bring a friend.</p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">Come be a little mad with us.</h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Volunteering, supporting a wall, or just curious? Pick up the phone and talk to a real person on the team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-plum text-sun font-bold px-7 py-4 text-lg hover:bg-teal hover:text-plum transition-colors" data-testid="link-join-call">
              <Phone className="size-5" aria-hidden /> Call {PHONE_TEXT}
            </a>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border-4 border-plum font-bold px-7 py-3.5 text-lg hover:bg-plum hover:text-sun transition-colors" data-testid="link-support-call">
              Support our work by phone
            </a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-4 border-plum font-bold px-7 py-3.5 text-lg hover:bg-plum hover:text-sun transition-colors" data-testid="link-youtube">
              <Youtube className="size-5" aria-hidden /> Watch on YouTube
            </a>
          </div>
          <p className="mt-6 text-sm">Explore our channel to view mural projects and community-driven activities.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-plum text-cream py-14">
      <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-3 gap-8">
        <div>
          <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-14 w-auto" />
          <p className="mt-3 font-hand text-2xl text-sun">Madness in Doing Goodness</p>
        </div>
        <address className="not-italic text-cream/90">
          <p className="font-bold text-sun">Kirukans Charitable Trust</p>
          <p className="mt-2 flex gap-2"><MapPin className="size-5 shrink-0 mt-0.5" aria-hidden />1/193 D, Kudi Street, Koothur, Tiruchirappalli 621 216</p>
          <p className="mt-2"><a href={PHONE_HREF} className="underline decoration-sun underline-offset-4" data-testid="link-footer-call">{PHONE_TEXT}</a></p>
        </address>
        <p className="text-sm text-cream/70">
          Registered TP/164591346/2023 under Manachanallur Sub Registrar Office.
        </p>
      </div>
    </footer>
  );
}
