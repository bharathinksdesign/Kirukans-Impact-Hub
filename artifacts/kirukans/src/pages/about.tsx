import { ArrowRight } from 'lucide-react';
import { PageShell, PageCta } from '@/components/page-shell';
import { About, Approach } from '@/components/story-sections';

export default function AboutPage() {
  return (
    <PageShell
      title="About Kirukans | Kirukans Charitable Trust"
      description="Our journey began with a simple belief: small acts of kindness can create meaningful change. Discover how art, service and community shape Kirukans."
      kicker="About us"
      heading="Small Acts. Lasting Impact."
      intro="Our journey began with a simple belief: small acts of kindness can create meaningful change."
    >
      <About detailed />
      <Approach />
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20 flex flex-wrap items-center justify-between gap-6">
        <p className="text-2xl md:text-3xl font-extrabold text-plum max-w-xl">Want to meet the people behind the paint, or explore the stories of our work?</p>
        <div className="flex flex-wrap gap-3">
          <PageCta href="/team" testid="link-about-team">Team Kirukans <ArrowRight className="size-4" aria-hidden /></PageCta>
          <PageCta href="/stories" testid="link-about-stories">Impact stories <ArrowRight className="size-4" aria-hidden /></PageCta>
        </div>
      </section>
    </PageShell>
  );
}
