import { Phone, Youtube } from 'lucide-react';
import { FaFacebook, FaYoutube, FaLinkedin, FaMediumM } from 'react-icons/fa';
import { Reveal } from '@/components/reveal';
import { gallery, img, PHONE_HREF, PHONE_TEXT, YOUTUBE } from '@/lib/site-data';
import { homeHash } from '@/lib/stories';

export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="font-hand text-3xl text-tangerine">Paint on our hands</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">The gallery</h1>
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
    <footer id="footer" className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-brand">
            <a href={homeHash("#top")} aria-label="Kirukans home">
              <img src={img('kirukans-logo.png')} alt="Kirukans" className="footer-logo" />
            </a>
            <p className="footer-trust-name">KIRUKANS CHARITABLE TRUST</p>
            <p className="footer-motto font-hand">Madness In Doing Goodness</p>
            <div className="footer-socials" aria-label="Social channels">
              <span title="Facebook — profile link not provided" role="img" aria-label="Facebook"><FaFacebook aria-hidden /></span>
              <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="Kirukans on YouTube"><FaYoutube aria-hidden /></a>
              <span title="LinkedIn — profile link not provided" role="img" aria-label="LinkedIn"><FaLinkedin aria-hidden /></span>
              <span title="Medium — profile link not provided" role="img" aria-label="Medium"><FaMediumM aria-hidden /></span>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              <li><a href={homeHash("#about")}>Our story</a></li>
              <li><a href={homeHash("#approach")}>What we do</a></li>
              <li><a href={homeHash("#stories")}>Impact stories</a></li>
              <li><a href={`${import.meta.env.BASE_URL}gallery`} data-testid="link-explore-gallery">Gallery</a></li>
              <li><a href={homeHash("#join")}>Get involved</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="footer-heading">Let’s connect</h2>
            <p className="footer-label">Trust contact</p>
            <a href={PHONE_HREF} className="footer-phone" data-testid="link-footer-call">8939018125</a>
          </div>
          <address className="footer-address">
            <h2 className="footer-heading">Registered address</h2>
            <p>1/193 D, Kudi Street, Koothur,<br />Tiruchirapalli 621 216.</p>
            <p className="footer-registration">TP/164591346/2023</p>
            <p className="footer-registrar">Registered under Manachanallur Sub Registrar Office.</p>
          </address>
        </div>
        <div className="footer-bottom">
          <p>© Kirukans Charitable Trust. All rights reserved.</p>
          <p>Designed with love @Bharathinks</p>
        </div>
      </div>
    </footer>
  );
}
