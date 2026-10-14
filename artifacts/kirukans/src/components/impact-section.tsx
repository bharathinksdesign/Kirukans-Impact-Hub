import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { HOME_URL, homeHash } from '@/lib/stories';

const stats = [
  {
    id: 'murals', value: 25, label: 'murals across government schools and hospitals',
    detail: 'Our murals bring colour and imagination into schools and hospitals. Explore the project stories to meet the people and see the work behind the painted walls.',
    cta: 'Explore our project stories', href: homeHash('#stories'),
  },
  {
    id: 'workshops', value: 5, label: 'art and creative workshops',
    detail: 'Hands-on art, craft and creative experiences give people space to make, learn and express themselves together.',
    cta: 'See our creative moments', href: `${HOME_URL}gallery`,
  },
  {
    id: 'food-drives', value: 3, label: 'Feed the Homeless drives',
    detail: 'Food outreach is another part of our community work, bringing care and support to people experiencing homelessness.',
    cta: 'Get involved in volunteering', href: homeHash('#join'),
  },
  {
    id: 'community', value: 3, label: 'community initiatives',
    detail: 'School initiatives, community programs and seasonal celebrations bring people together beyond the painted walls.',
    cta: 'Join our volunteer community', href: homeHash('#join'),
  },
];
const acts = ['Transgender community programs', 'Government school initiatives', 'Pongal celebrations', 'Hospital murals', 'Donation drives', 'Volunteer programs'];

function ImpactCard({ stat, expanded, onToggle }: {
  stat: typeof stats[number]; expanded: boolean; onToggle: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(stat.value);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setCount(stat.value);
      return;
    }
    let frame = 0;
    let start: number | null = null;
    setCount(0);
    const tick = (time: number) => {
      start ??= time;
      const progress = Math.min((time - start) / 1100, 1);
      setCount(Math.round(stat.value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, stat.value]);

  return (
    <button
      ref={ref}
      id={`impact-trigger-${stat.id}`}
      type="button"
      aria-expanded={expanded}
      aria-controls={expanded ? `impact-detail-${stat.id}` : undefined}
      onClick={onToggle}
      className={`group flex h-full w-full cursor-pointer flex-col rounded-3xl bg-cream border-4 p-5 md:p-6 text-left motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] hover:shadow-[6px_6px_0_hsl(var(--sun))] ${expanded ? 'border-ocean shadow-[6px_6px_0_hsl(var(--sun))]' : 'border-plum'}`}
      data-testid={`button-impact-${stat.id}`}
    >
      <span className="text-6xl md:text-7xl font-extrabold text-pink tabular-nums" aria-hidden="true">{reducedMotion ? stat.value : count}+</span>
      <span className="sr-only">{stat.value}+</span>
      <span className="mt-2 font-semibold">{stat.label}</span>
      <span className="mt-auto pt-5 flex items-center gap-2 text-sm font-bold">
        {expanded ? 'Close details' : 'Learn more'}
        <ChevronDown aria-hidden="true" className={`size-4 shrink-0 motion-safe:transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </span>
    </button>
  );
}

export function Impact() {
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const active = stats.find((stat) => stat.id === selected);

  useEffect(() => {
    if (!selected) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'instant' : 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [selected, reducedMotion]);

  return (
    <section id="impact" className="bg-teal text-plum py-20 md:py-28 border-y-4 border-plum">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">What the brushes added up to</h2>
          <p className="mt-4 font-medium">Every number has people behind it. Tap a card to explore.</p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <li key={stat.id}>
              <Reveal delay={i * 80} className="h-full">
                <ImpactCard stat={stat} expanded={selected === stat.id} onToggle={() => setSelected((current) => current === stat.id ? null : stat.id)} />
              </Reveal>
            </li>
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              ref={panelRef}
              key={active.id}
              id={`impact-detail-${active.id}`}
              role="region"
              aria-labelledby={`impact-trigger-${active.id}`}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="mt-8 rounded-3xl border-2 border-plum bg-cream p-6 md:p-8"
              data-testid={`panel-impact-${active.id}`}
            >
              <h3 className="text-2xl font-extrabold">{active.label}</h3>
              <p className="mt-3 max-w-3xl leading-relaxed">{active.detail}</p>
              <a href={active.href} className="mt-5 inline-flex items-center gap-2 font-bold underline decoration-sun decoration-2 underline-offset-4" data-testid={`link-impact-${active.id}`}>
                {active.cta} <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="mt-10 flex flex-wrap gap-3">
          {acts.map((act) => <li key={act} className="rounded-full bg-plum text-sun font-bold px-5 py-2">{act}</li>)}
        </ul>
      </div>
    </section>
  );
}
