import { Palette, HeartHandshake, HandHeart, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { img, projects, type Project } from '@/lib/site-data';

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
  return (
    <section id="stories" className="bg-plum text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="font-hand text-3xl text-sun">Four walls, four stories</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Where we have painted</h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 100}>
              <button
                onClick={() => onOpen(p)}
                className="group w-full text-left rounded-3xl overflow-hidden bg-cream text-plum border-4 border-sun hover:-translate-y-1 transition-transform"
                data-testid={`card-project-${p.id}`}
              >
                <div className={`aspect-[16/10] overflow-hidden ${p.tone} flex items-center justify-center`}>
                  {p.photos[0] ? (
                    <img src={img(p.photos[0].src)} alt={p.photos[0].alt} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <span className="text-[9rem] font-extrabold leading-none" aria-hidden>{p.n}</span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold uppercase tracking-wider text-tangerine">{p.date} / {p.place}</p>
                  <h3 className="mt-1 text-2xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground line-clamp-2">{p.idea}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold underline decoration-sun decoration-4 underline-offset-4">
                    Read the story <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
