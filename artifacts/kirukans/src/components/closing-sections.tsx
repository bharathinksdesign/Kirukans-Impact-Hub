import { FaFacebook, FaYoutube, FaLinkedin, FaMediumM } from 'react-icons/fa';
import { Reveal } from '@/components/reveal';
import { gallery, img, PHONE_HREF, PHONE_TEXT, YOUTUBE } from '@/lib/site-data';
import { homeHash } from '@/lib/stories';
export { Impact } from '@/components/impact-section';

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
              <li><a href={`${import.meta.env.BASE_URL}about`}>About us</a></li>
              <li><a href={`${import.meta.env.BASE_URL}our-work`}>Our work</a></li>
              <li><a href={homeHash("#stories")}>Impact stories</a></li>
              <li><a href={`${import.meta.env.BASE_URL}gallery`} data-testid="link-explore-gallery">Gallery</a></li>
              <li><a href={`${import.meta.env.BASE_URL}team`} data-testid="link-explore-team">Our team</a></li>
              <li><a href={`${import.meta.env.BASE_URL}volunteer`}>Volunteer</a></li>
              <li><a href={`${import.meta.env.BASE_URL}admin/inbox`} data-testid="link-team-inbox">Team inbox</a></li>
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
