import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { TeamCard } from '@/components/team-portrait';
import { teamMembers, TEAM_PREVIEW_COUNT } from '@/lib/team-data';

export function TeamSection() {
  return (
    <section id="team" className="bg-cream py-20 md:py-28" data-testid="section-team">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-hand text-3xl text-tangerine">Team Kirukans</p>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight">The hands behind the walls</h2>
            <p className="mt-5 text-lg text-muted-foreground">Meet the people behind Kirukans and our work in the community.</p>
          </div>
          <Link href="/team" className="cta-feedback inline-flex w-fit items-center gap-2 rounded-full bg-plum px-6 py-3 font-bold text-sun" data-testid="link-meet-team">
            Meet the whole team <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.slice(0, TEAM_PREVIEW_COUNT).map((m, i) => (
            <Reveal key={m.id} delay={i * 80}><TeamCard m={m} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
