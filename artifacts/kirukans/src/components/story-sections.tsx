import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { StoryCard } from '@/components/story-card';
import { allStories, HOME_STORY_COUNT } from '@/lib/stories';
import { Reveal } from '@/components/reveal';
import { Approach } from '@/components/approach';
import { AboutPhotoGallery } from '@/components/about-photo-gallery';

export function About() {
  return (
    <section id="about" className="bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      <Reveal>
        <AboutPhotoGallery />
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
      </div>
    </section>
  );
}

export function Stories() {
  const shown = allStories.slice(0, HOME_STORY_COUNT);
  return (
    <section id="stories" className="bg-plum text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-hand text-3xl text-sun">Fresh off the wall</p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Where we have painted</h2>
          </div>
          <Link href="/stories" className="cta-feedback inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-bold text-plum" data-testid="link-view-all-stories">
            View all stories <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 100} className={i === 0 ? 'md:col-span-2' : ''}>
              <StoryCard project={p} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Approach };
