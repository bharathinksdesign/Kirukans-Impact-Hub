import { Palette, HeartHandshake, HandHeart, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { StoryCard } from '@/components/story-card';
import { allStories, HOME_STORY_COUNT } from '@/lib/stories';
import { Reveal } from '@/components/reveal';
import { img, type Project } from '@/lib/site-data';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      <Reveal>
        <div className="relative">
          <img src={img('page-2-image-3.webp')} alt="Kirukans mural volunteers together" className="rounded-3xl w-full aspect-[5/4] object-cover border-4 border-plum" />
          <img src={img('page-2-image-2.webp')} alt="An artist painting the Kalam mural" className="absolute -bottom-8 -right-3 w-2/5 rounded-2xl border-4 border-sun rotate-3 aspect-square object-cover shadow-xl" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <p className="font-hand text-3xl text-tangerine">Who we are</p>
        <h2 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight">Art, but make it useful.</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Kirukans is a creative community turning art into action. We bring people together to transform schools, hospitals, and communities through murals,
          workshops, and meaningful initiatives, creating brighter spaces, spreading kindness, and inspiring positive change through creativity,
          collaboration, and compassion.
        </p>
      </Reveal>
    </section>
  );
}

const pillars = [
  { icon: Palette, t: 'Create', d: 'Making space for imagination: art, craft, creativity and hands-on experiences that encourage self-expression.', c: 'bg-sun' },
  { icon: HeartHandshake, t: 'Connect', d: 'Bringing people closer through community gatherings, collaborations and inclusive experiences that build meaningful connections.', c: 'bg-teal' },
  { icon: HandHeart, t: 'Contribute', d: 'Outreach, volunteering and initiatives that channel community energy toward meaningful causes.', c: 'bg-tangerine' },
];

export function Approach() {
  return (
    <section id="approach" className="bg-cream py-20 md:py-28 border-y-4 border-plum">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl">Three words we paint by.</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-12 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 100} className={i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-4 md:mt-12' : 'md:col-span-3'}>
              <div className={`${p.c} text-plum h-full rounded-3xl p-7 border-4 border-plum`}>
                <p.icon className="size-9" aria-hidden />
                <h3 className="mt-5 text-3xl font-extrabold">{p.t}</h3>
                <p className="mt-3 font-medium">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stories({ onOpen }: { onOpen: (p: Project) => void }) {
  const shown = allStories.slice(0, HOME_STORY_COUNT);
  return (
    <section id="stories" className="bg-plum text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-hand text-3xl text-sun">Fresh off the wall</p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Where we have painted</h2>
          </div>
          <Link href="/stories" className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-bold text-plum motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 hover:bg-teal" data-testid="link-view-all-stories">
            View all stories <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 100} className={i === 0 ? 'md:col-span-2' : ''}>
              <StoryCard project={p} onOpen={onOpen} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
