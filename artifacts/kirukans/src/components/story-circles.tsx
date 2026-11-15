import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { allStories } from '@/lib/stories';
import { img } from '@/lib/site-data';

const StoryViewer = lazy(() => import('@/components/story-viewer'));

const SEEN_KEY = 'kirukans-stories-seen';
function readSeen(): Set<string> {
  try { return new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]')); } catch { return new Set(); }
}

const ringColors = ['hsl(var(--sun))', 'hsl(var(--teal))', 'hsl(var(--pink))'];

export function StoryCircles() {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<string>>(readSeen);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef(0);

  const markSeen = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try { sessionStorage.setItem(SEEN_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const close = useCallback((index: number) => {
    setOpenAt(null);
    const el = triggers.current[index] ?? triggers.current[lastIndex.current];
    window.setTimeout(() => {
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }, 0);
  }, []);

  if (!allStories.length) return null;

  return (
    <section aria-labelledby="story-circles-title" className="relative bg-cream border-b border-plum/10" data-testid="section-story-circles">
      <div className="mx-auto max-w-7xl px-5 pt-3 pb-2 sm:pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="story-circles-title" className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-plum/80">
            Our stories <span className="font-hand normal-case tracking-normal text-lg text-pink ml-2">tap to explore</span>
          </h2>
          <span className="text-[11px] text-plum/60 tabular-nums shrink-0">{allStories.length} stories</span>
        </div>
      </div>
      <ul
        className="flex gap-3 sm:gap-5 overflow-x-auto overscroll-x-contain px-5 pb-3 pt-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-7xl mx-auto"
        aria-label="Project stories, newest first"
      >
        {allStories.map((s, i) => {
          const isSeen = seen.has(s.id);
          const photo = s.photos[0];
          return (
            <li key={s.id} className="snap-start shrink-0">
              <button
                ref={(el) => { triggers.current[i] = el; }}
                type="button"
                onClick={() => { lastIndex.current = i; setOpenAt(i); }}
                className="group flex w-[76px] sm:w-[88px] flex-col items-center gap-1.5 rounded-xl py-1 text-plum"
                aria-label={`Preview story: ${s.title}, ${s.date}${isSeen ? ' (viewed)' : ''}`}
                data-testid={`button-story-circle-${s.id}`}
              >
                <span
                  className="relative grid size-[66px] sm:size-[76px] place-items-center rounded-full p-[3px] transition-transform duration-200 motion-safe:group-hover:-rotate-6 motion-safe:group-active:scale-95"
                  style={{
                    background: isSeen
                      ? 'hsl(var(--plum) / 0.18)'
                      : `conic-gradient(from 200deg, ${ringColors[i % 3]}, ${ringColors[(i + 1) % 3]}, ${ringColors[i % 3]})`,
                  }}
                >
                  <span className="block size-full overflow-hidden rounded-full border-[3px] border-cream bg-plum/10">
                    {photo && (
                      <img
                        src={img(photo.src)}
                        alt=""
                        loading={i < 5 ? 'eager' : 'lazy'}
                        decoding="async"
                        width={76}
                        height={76}
                        className={`size-full object-cover ${isSeen ? 'opacity-70 saturate-50' : ''}`}
                      />
                    )}
                  </span>
                  {i === 0 && !isSeen && (
                    <span className="absolute -bottom-1 rounded-full bg-plum px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-sun">Latest</span>
                  )}
                </span>
                <span className="w-full truncate text-center text-[11px] sm:text-xs font-semibold leading-tight">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {openAt !== null && (
        <Suspense fallback={<div className="fixed inset-0 z-[80] bg-ocean/80" role="status" aria-label="Opening story" />}>
          <StoryViewer startIndex={openAt} onClose={close} onSeen={markSeen} />
        </Suspense>
      )}
    </section>
  );
}
