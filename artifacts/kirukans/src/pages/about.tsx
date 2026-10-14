import { ArrowRight } from 'lucide-react';
import { PageShell, PageCta } from '@/components/page-shell';
import { About, Approach } from '@/components/story-sections';
import { Reveal } from '@/components/reveal';

const beliefs = [
  { t: 'Spaces shape feelings', d: 'A brighter wall in a school, hospital or neighbourhood changes how it feels to walk in.' },
  { t: 'Kindness is a team sport', d: 'Murals, workshops and initiatives work best when many hands join in.' },
  { t: 'Everyone can contribute', d: 'Paint, create, lend a hand or help a cause. There is a place for your talent.' },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About us | Kirukans Charitable Trust"
      description="Kirukans is a volunteer art community in Trichy turning art into action through murals, workshops and meaningful initiatives."
      kicker="About us"
      heading="A creative community with a cause"
      intro="Kirukans brings people together in Trichy to turn creativity into goodness, one wall, workshop and helping hand at a time."
    >
      <About />
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <Reveal><h2 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl">What we hold on to</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-[1.3fr_1fr_1fr]">
          {beliefs.map((b, i) => (
            <Reveal key={b.t} delay={i * 100} className="h-full">
              <div className="h-full rounded-3xl border-2 border-plum bg-white p-6 md:p-8 motion-safe:transition-shadow hover:shadow-brand-hover">
                <h3 className="text-2xl font-extrabold text-plum">{b.t}</h3>
                <p className="mt-3 text-plum/85">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Approach />
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20 flex flex-wrap items-center justify-between gap-6">
        <p className="text-2xl md:text-3xl font-extrabold text-plum max-w-xl">Want to meet the people behind the paint, or see what we have painted?</p>
        <div className="flex flex-wrap gap-3">
          <PageCta href="/team" testid="link-about-team">Team Kirukans <ArrowRight className="size-4" aria-hidden /></PageCta>
          <PageCta href="/our-work" testid="link-about-work">Our work <ArrowRight className="size-4" aria-hidden /></PageCta>
        </div>
      </section>
    </PageShell>
  );
}
