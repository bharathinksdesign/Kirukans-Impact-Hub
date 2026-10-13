import { ArrowDown, Phone } from 'lucide-react';
import { img, PHONE_HREF } from '@/lib/site-data';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-plum text-cream">
      <div className="absolute -top-24 -right-24 size-96 rounded-full bg-teal/30 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 py-14 md:py-24 grid md:grid-cols-12 gap-10 items-center relative">
        <div className="md:col-span-7">
          <p className="font-hand text-3xl text-sun">Trichy's volunteer art crew</p>
          <h1 className="mt-2 text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
            Madness in <span className="text-sun">Doing</span>{' '}
            <span className="relative inline-block text-teal">Goodness</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-cream/85">
            Kirukans is a creative community turning art into action. We pick up brushes, walk into government schools and hospitals, and leave the walls
            brighter than we found them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#stories" className="inline-flex items-center gap-2 rounded-full bg-sun text-plum font-bold px-6 py-3 hover:bg-cream transition-colors" data-testid="link-hero-stories">
              See our stories <ArrowDown className="size-4" aria-hidden />
            </a>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border-2 border-teal text-teal font-bold px-6 py-3 hover:bg-teal hover:text-plum transition-colors" data-testid="link-hero-volunteer">
              <Phone className="size-4" aria-hidden /> Volunteer with us
            </a>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="floaty [--r:-3deg] rounded-[2rem] overflow-hidden border-4 border-sun shadow-[10px_10px_0_hsl(var(--teal))]">
            <img src={img('page-1-image-7.webp')} alt="Kirukans volunteers at a community workshop" className="w-full aspect-[4/5] object-cover" />
          </div>
          <img src={img('kirukans-logo.png')} alt="" aria-hidden className="absolute -bottom-6 -left-4 w-36 rotate-[-6deg] drop-shadow-lg hidden sm:block" />
        </div>
      </div>
      <div className="overflow-hidden bg-sun text-plum py-3 border-t-4 border-plum" aria-hidden>
        <div className="marquee flex w-max whitespace-nowrap text-xl font-extrabold">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8 pr-8">
              {['Create', 'Connect', 'Contribute', 'Murals', 'Workshops', 'Feed the Homeless', 'Pongal', 'Schools', 'Hospitals'].map((w) => (
                <span key={w}>{w} /</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
