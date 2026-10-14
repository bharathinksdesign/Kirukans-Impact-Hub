import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/closing-sections';
import { Reveal } from '@/components/reveal';
import { TeamCard } from '@/components/team-portrait';
import { teamMembers } from '@/lib/team-data';
import { useDocumentMeta } from '@/lib/stories';

export default function TeamPage() {
  useDocumentMeta('Team Kirukans | Kirukans Charitable Trust', 'Meet the founder, managing director and secretary of Kirukans Charitable Trust.');
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="grain min-h-[100dvh]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-5 pt-10 pb-20 md:pb-28">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-plum hover:text-tangerine" data-testid="link-back-home">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Link>
          <Reveal className="mt-8 max-w-3xl">
            <p className="font-hand text-3xl text-tangerine">Team Kirukans</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">Ordinary people, extra paint</h1>
            <p className="mt-5 text-lg text-muted-foreground">Meet the people behind Kirukans Charitable Trust and our work turning creativity into goodness.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 80}><TeamCard m={m} /></Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
