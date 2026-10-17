import { useEffect } from 'react';
import { useParams } from 'wouter';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/closing-sections';
import { Reveal } from '@/components/reveal';
import { PhotoGallery, StoryVideo, ChannelNote } from '@/components/story-media';
import { img, projects } from '@/lib/site-data';
import { storyContent } from '@/lib/story-content';
import { HOME_URL, homeHash, storyHref, useDocumentMeta, allStories } from '@/lib/stories';

export default function StoryPage() {
  const { id = '' } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const content = storyContent[id];
  const ok = !!project && !!content;

  useDocumentMeta(
    ok ? `${project.title}, ${project.date} | Kirukans story` : 'Story not found | Kirukans',
    ok ? project.idea : 'This Kirukans story could not be found.',
  );
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    el.style.scrollBehavior = prev;
  }, [id]);

  if (!ok) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col">
        <Header />
        <main className="flex-1 bg-plum text-cream grid place-items-center px-5 py-20" data-testid="story-not-found">
          <div className="max-w-xl text-center">
            <p className="font-hand text-4xl text-sun">This story isn’t here yet</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">We could not find that story</h1>
            <p className="mt-4 text-cream/80">The link may be mistyped, or the story has moved.</p>
            <a href={`${HOME_URL}stories`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sun text-plum px-6 py-3 font-bold" data-testid="link-back-stories">
              <ArrowLeft className="size-5" aria-hidden /> Back to all stories
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const photos = project.photos.map((p) => ({ ...p, cap: content.photoCaptions[p.src] ?? p.alt }));
  const hero = photos[0];
  const related = allStories.filter((s) => s.id !== id && storyContent[s.id]);

  return (
    <div className="min-h-[100dvh] bg-background">
      <Header />
      <main>
        <section className="bg-plum text-cream pt-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5">
            <a href={`${HOME_URL}stories`} className="inline-flex items-center gap-2 text-sm font-bold text-sun hover:underline underline-offset-4" data-testid="link-back">
              <ArrowLeft className="size-4" aria-hidden /> All impact stories
            </a>
            <div className="mt-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
              <Reveal>
                <p className="font-hand text-3xl text-sun">{project.date}</p>
                <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance" data-testid="text-story-title">{project.title}</h1>
                <p className="mt-3 text-lg font-semibold text-teal">
                  {project.placeHref ? (
                    <a href={project.placeHref} target="_blank" rel="noopener noreferrer" className="underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal" aria-label={`Open ${project.title} location in a new tab`}>
                      {project.place}
                    </a>
                  ) : project.place}
                </p>
                <p className="mt-6 text-xl text-cream/90 leading-relaxed max-w-xl">{project.idea}</p>
              </Reveal>
              <Reveal delay={120}>
                <figure className="relative">
                  <img src={img(hero.src)} alt={hero.alt} className="block w-full h-auto rounded-[55px_8px_55px_8px] md:rounded-[110px_12px_110px_12px]" />
                  <figcaption className="mt-4 text-sm text-cream/80 max-w-lg">{hero.cap}</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <Reveal>
            <p className="font-hand text-3xl text-tangerine">The story</p>
            {content.intro.map((t, i) => (
              <p key={i} className={`mt-5 max-w-2xl leading-relaxed ${i === 0 ? 'text-2xl md:text-3xl font-semibold leading-snug' : 'text-lg text-muted-foreground'}`}>{t}</p>
            ))}
          </Reveal>
          <Reveal delay={100}>
            <dl className="rounded-3xl border-4 border-plum bg-sun text-plum p-6 md:p-8 space-y-5 self-start" data-testid="story-facts">
              {content.facts.map((f) => (
                <div key={f.label} className="border-b-2 border-plum/20 pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs font-bold uppercase tracking-widest">{f.label}</dt>
                  <dd className="mt-1 text-lg font-extrabold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {content.sections.map((s, i) => (
          <section key={s.title} className={i % 2 === 0 ? 'bg-teal text-plum border-y-4 border-plum' : ''}>
            <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 grid md:grid-cols-[auto_1fr] gap-6 md:gap-14">
              <Reveal><span className={`font-hand text-7xl md:text-9xl leading-none ${i % 2 === 0 ? 'text-plum' : 'text-tangerine'}`}>{String(i + 1).padStart(2, '0')}</span></Reveal>
              <Reveal delay={80}>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance max-w-3xl">{s.title}</h2>
                {s.body.map((t, j) => <p key={j} className="mt-5 text-lg md:text-xl leading-relaxed max-w-2xl">{t}</p>)}
              </Reveal>
            </div>
          </section>
        ))}

        <section id="story-video" className="bg-background border-t-4 border-plum">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            {content.video ? <StoryVideo key={content.video.id} video={content.video} /> : <ChannelNote />}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="font-hand text-3xl text-tangerine">Look closer</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{photos.length > 1 ? 'Photographs from the project' : 'The project photograph'}</h2>
            <p className="mt-2 text-muted-foreground">Tap any photo to enlarge it.</p>
          </Reveal>
          <div className="mt-8"><PhotoGallery photos={photos} /></div>
        </section>

        <section className="bg-plum text-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-balance">Help make the next story possible.</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={homeHash('#join')} className="cta-feedback inline-flex items-center gap-2 rounded-xl bg-sun text-plum px-6 py-3 font-bold" data-testid="link-volunteer">Volunteer with Kirukans <ArrowUpRight className="size-5" aria-hidden /></a>
              <a href={homeHash('#support')} className="inline-flex items-center gap-2 rounded-xl border-2 border-sun text-sun px-6 py-3 font-bold hover:bg-sun hover:text-plum transition-colors" data-testid="link-support">Support our work</a>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section id="more-stories" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">More stories</h2>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => (
                <li key={s.id}>
                  <a href={storyHref(s.id)} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-plum/20 bg-card text-plum motion-safe:hover:-translate-y-1 motion-safe:transition-transform" data-testid={`link-related-${s.id}`}>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                      {s.photos[0] && (
                        <img src={img(s.photos[0].src)} alt={s.photos[0].alt} loading="lazy" className="size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-sm font-semibold text-muted-foreground">{s.date} · {s.place}</span>
                      <h3 className="mt-3 text-2xl font-extrabold leading-tight">{s.title}</h3>
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-bold underline decoration-sun decoration-2 underline-offset-4">Read the story <ArrowRight className="size-5" aria-hidden /></span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <a href={HOME_URL} className="mt-8 inline-block font-bold underline underline-offset-4" data-testid="link-home-bottom">Back to the Kirukans home page</a>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
