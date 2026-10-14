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
  useDocumentMeta('Team Kirukans | Kirukans Charitable Trust', 'Meet the volunteer artists of Team Kirukans in Trichy. Sample profiles shown for preview.');
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
            <p className="mt-5 text-lg text-muted-foreground">Students, parents, designers and neighbours in Trichy who show up on painting day and turn creativity into goodness.</p>
          </Reveal>
          <p className="mt-8 rounded-2xl bg-sun/40 px-5 py-4 font-semibold text-plum ring-1 ring-plum/10" data-testid="text-demo-notice">
            Demo content: the names, roles and bios below are fictional samples, and the portraits are illustrative placeholders. Real member profiles will replace them.
          </p>
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
