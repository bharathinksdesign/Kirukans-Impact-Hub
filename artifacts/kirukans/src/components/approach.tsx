import './approach.css';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { homeHash, HOME_URL } from '@/lib/stories';

const pillars = [
  { t: 'Create', d: 'Making space for imagination: art, craft, creativity and hands-on experiences that encourage self-expression.', src: 'create.svg', href: 'stories', cta: 'See what we have made' },
  { t: 'Connect', d: 'Bringing people closer through community gatherings, collaborations and inclusive experiences that build meaningful connections.', src: 'connect.svg', href: 'volunteer', cta: 'Get involved' },
  { t: 'Take part', d: 'Outreach, volunteering and initiatives that channel community energy toward meaningful causes.', src: 'contribute.svg', href: 'volunteer', cta: 'Join as a volunteer' },
];

export function Approach() {
  return (
    <section id="approach" className="approach bg-cream py-20 md:py-28 border-y-4 border-plum">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="font-hand text-3xl text-tangerine">What we do</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl">Three words we paint by.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 120} className="h-full">
              <article className="approach-card h-full flex flex-col rounded-3xl border-2 border-plum bg-white overflow-hidden">
                <div className="approach-art bg-white mx-4 mt-4 aspect-[465/362]">
                  <img src={`${HOME_URL}illustrations/${p.src}`} alt={`Hand-drawn illustration for ${p.t}`} loading="lazy" className="w-full h-full object-contain object-bottom block" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-3xl font-extrabold text-plum">{p.t}</h3>
                  <p className="mt-3 text-plum/85 text-base leading-relaxed">{p.d}</p>
                  <a href={homeHash(p.href)} data-testid={`link-approach-${p.t.toLowerCase()}`} className="approach-link mt-auto pt-6 inline-flex items-center gap-2 font-bold text-plum">
                    <span className="underline decoration-sun decoration-4 underline-offset-4">{p.cta}</span>
                    <ArrowRight className="size-4 approach-arrow" aria-hidden />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
