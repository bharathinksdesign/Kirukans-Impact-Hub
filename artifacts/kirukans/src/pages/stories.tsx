import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/closing-sections';
import { StoryCard } from '@/components/story-card';
import { Reveal } from '@/components/reveal';
import { allStories, storyYear, storyYears, useDocumentMeta } from '@/lib/stories';

export default function StoriesPage() {
  useDocumentMeta('All stories | Kirukans', 'Every wall Kirukans has painted in and around Trichy: school murals, hospital walls and community projects, with the volunteers behind them.');
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [q, setQ] = useState('');
  const [year, setYear] = useState('all');

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return allStories.filter((p) => {
      if (year !== 'all' && storyYear(p) !== year) return false;
      if (!t) return true;
      return [p.title, p.place, p.date, p.idea, ...p.contribution].join(' ').toLowerCase().includes(t);
    });
  }, [q, year]);
  const reset = () => { setQ(''); setYear('all'); };
  const chip = (active: boolean) => `rounded-full px-4 py-2 text-sm font-bold border-2 motion-safe:transition-colors ${active ? 'bg-plum text-sun border-plum' : 'border-plum/20 text-plum hover:border-plum'}`;

  return (
    <div className="grain min-h-[100dvh]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-5 pt-10 pb-20 md:pb-28">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-plum hover:text-tangerine" data-testid="link-back-home">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Link>
          <Reveal className="mt-8 max-w-3xl">
            <p className="font-hand text-3xl text-tangerine">The whole collection</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">Every wall, every story</h1>
            <p className="mt-5 text-lg text-muted-foreground">Murals, handprints and long nights with volunteers, newest first. Open any story for the idea, what we made and the photos.</p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative block md:w-96">
              <span className="sr-only">Search stories</span>
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by school, place or idea"
                className="w-full rounded-full bg-card py-3 pl-11 pr-4 ring-1 ring-plum/20 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
                data-testid="input-search-stories"
              />
            </label>
            {storyYears.length > 1 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
                <button onClick={() => setYear('all')} aria-pressed={year === 'all'} className={chip(year === 'all')} data-testid="filter-year-all">All years</button>
                {storyYears.map((y) => (
                  <button key={y} onClick={() => setYear(y)} aria-pressed={year === y} className={chip(year === y)} data-testid={`filter-year-${y}`}>{y}</button>
                ))}
              </div>
            )}
          </div>
          <p className="mt-6 text-sm font-semibold text-muted-foreground" aria-live="polite" data-testid="text-story-count">
            Showing {results.length} of {allStories.length} {allStories.length === 1 ? 'story' : 'stories'}
          </p>

          {results.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <StoryCard project={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] bg-cream ring-1 ring-plum/10 px-6 py-16 text-center" data-testid="empty-stories">
              <p className="font-hand text-4xl text-tangerine">Nothing on this wall yet</p>
              <p className="mt-2 text-muted-foreground">No story matches {q.trim() ? `"${q.trim()}"` : 'that year'}. Try another word or clear the filters.</p>
              <button onClick={reset} className="cta-feedback mt-6 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 font-bold text-sun" data-testid="button-clear-filters">
                <X className="size-4" aria-hidden /> Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
