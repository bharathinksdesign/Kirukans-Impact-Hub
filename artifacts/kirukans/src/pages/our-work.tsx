import { ArrowRight } from 'lucide-react';
import { PageShell, PageCta } from '@/components/page-shell';
import { Approach } from '@/components/story-sections';
import { Reveal } from '@/components/reveal';
import { allStories, storyHref } from '@/lib/stories';
import { img, gallery } from '@/lib/site-data';

export default function OurWorkPage() {
  return (
    <PageShell
      title="Our work | Kirukans Charitable Trust"
      description="Murals, workshops and community projects by Kirukans volunteers across schools in and around Trichy."
      kicker="Our work"
      heading="Walls, workshops and a lot of paint"
      intro="From an Anganvadi school to a village computer lab, here is what Kirukans volunteers have made together."
    >
      <Approach />
      <section className="bg-plum text-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Projects, newest first</h2></Reveal>
          <div className="mt-10 space-y-6">
            {allStories.map((p, i) => (
              <Reveal key={p.id}>
                <article className="grid md:grid-cols-[1fr_1.1fr] gap-0 overflow-hidden rounded-3xl bg-cream text-plum border-4 border-sun" data-testid={`card-work-${p.id}`}>
                  <img src={img(p.photos[0].src)} alt={p.photos[0].alt} loading={i ? 'lazy' : undefined} className="h-64 md:h-full w-full object-cover" />
                  <div className="p-6 md:p-9">
                    <p className="font-hand text-2xl text-tangerine">{p.place} · {p.date}</p>
                    <h3 className="text-3xl font-extrabold">{p.title}</h3>
                    <p className="mt-3">{p.idea}</p>
                    <ul className="mt-4 list-disc pl-5 space-y-1 text-plum/85">{p.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
                    <a href={storyHref(p.id)} className="cta-feedback mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 font-bold text-plum" data-testid={`link-work-${p.id}`}>
                      Read the story <ArrowRight className="size-4" aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <Reveal><h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Moments from the wall</h2></Reveal>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.slice(0, 8).map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 60}>
              <figure>
                <img src={img(g.src)} alt={g.alt} loading="lazy" className="aspect-square w-full rounded-2xl object-cover border-2 border-plum" />
                <figcaption className="mt-1.5 text-sm font-semibold text-plum">{g.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <PageCta href="/gallery" testid="link-work-gallery">Full gallery <ArrowRight className="size-4" aria-hidden /></PageCta>
          <PageCta href="/volunteer" testid="link-work-volunteer">Paint with us <ArrowRight className="size-4" aria-hidden /></PageCta>
        </div>
      </section>
    </PageShell>
  );
}
