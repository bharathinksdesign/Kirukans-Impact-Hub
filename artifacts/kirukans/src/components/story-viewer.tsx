import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play, RotateCcw, X } from 'lucide-react';
import { allStories, storyHref } from '@/lib/stories';
import { img } from '@/lib/site-data';

const DURATION = 8000;

type Props = { startIndex: number; onClose: (index: number) => void; onSeen: (id: string) => void };

export default function StoryViewer({ startIndex, onClose, onSeen }: Props) {
  const total = allStories.length;
  const [index, setIndex] = useState(startIndex);
  const [ended, setEnded] = useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [auto, setAuto] = useState(!reduced);
  const [held, setHeld] = useState(false);
  const [hiddenTab, setHiddenTab] = useState(false);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const suppressTap = useRef(false);
  const pressedAt = useRef(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const story = allStories[index];
  const running = auto && !held && !hiddenTab && !ended;

  useEffect(() => { onSeen(story.id); }, [story.id, onSeen]);

  const go = useCallback((dir: 1 | -1) => {
    setProgress(0);
    if (ended) { if (dir === -1) setEnded(false); return; }
    const n = indexRef.current + dir;
    if (n >= total) { setEnded(true); return; }
    if (n < 0) return;
    setIndex(n);
  }, [ended, total]);

  const close = useCallback(() => onCloseRef.current(indexRef.current), []);

  // Auto-advance timer
  useEffect(() => {
    if (!running) return;
    let start = performance.now() - progress * DURATION;
    let frame = 0;
    const tick = (t: number) => {
      const p = (t - start) / DURATION;
      if (p >= 1) { go(1); return; }
      setProgress(p);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); start = 0; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, index, go]);

  useEffect(() => {
    const v = () => setHiddenTab(document.hidden);
    document.addEventListener('visibilitychange', v);
    return () => document.removeEventListener('visibilitychange', v);
  }, []);

  // Scroll lock + initial focus + inert background
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter((el) => el.tabIndex >= 0);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, close]);

  // Preload only the next story's lead photo
  useEffect(() => {
    const next = allStories[index + 1]?.photos[0];
    if (next) { const i = new Image(); i.src = img(next.src); }
  }, [index]);

  const photo = story.photos[0];
  const btn = 'grid size-11 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur-sm hover:bg-sun hover:text-plum transition-colors';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ocean/90 sm:p-6" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-viewer-title"
        aria-describedby="story-viewer-idea"
        className="relative flex h-[100dvh] w-full flex-col overflow-y-auto bg-plum text-cream sm:h-[min(88dvh,820px)] sm:max-w-[460px] sm:rounded-[28px_8px_28px_8px] sm:shadow-[8px_8px_0_hsl(var(--sun))]"
        data-testid="dialog-story-viewer"
        onTouchStart={(e) => { suppressTap.current = false; touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={(e) => {
          const s = touch.current; touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
            suppressTap.current = true;
            go(dx < 0 ? 1 : -1);
          }
        }}
      >
        {/* Progress segments */}
        <div className="absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-3" aria-hidden="true">
          {allStories.map((s, i) => (
            <span key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/25">
              <span
                className="block h-full origin-left bg-sun"
                style={{ transform: `scaleX(${ended || i < index ? 1 : i === index ? (auto ? progress : 1) : 0})` }}
              />
            </span>
          ))}
        </div>

        {/* Top bar */}
        <div className="absolute inset-x-0 top-5 z-30 flex items-center justify-between gap-2 px-3">
          <p className="rounded-full bg-ocean/60 px-3 py-1 text-xs font-semibold tabular-nums backdrop-blur-sm" aria-live="polite" data-testid="text-story-position">
            {ended ? 'All caught up' : `Story ${index + 1} of ${total}`}
          </p>
          <div className="flex gap-2">
            {!ended && (
              <button type="button" className={btn} onClick={() => setAuto((a) => !a)} aria-label={auto ? 'Pause auto-play' : 'Play stories automatically'} aria-pressed={auto} data-testid="button-story-pause">
                {auto ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
            )}
            <button ref={closeRef} type="button" className={btn} onClick={close} aria-label="Close stories" data-testid="button-story-close">
              <X className="size-5" />
            </button>
          </div>
        </div>

        {ended ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-5 bg-sun px-7 text-plum">
            <span className="font-hand text-3xl text-pink">Every story makes a difference</span>
            <h2 id="story-viewer-title" className="text-3xl font-extrabold leading-tight">You've seen all {total} Kirukans projects.</h2>
            <p id="story-viewer-idea" className="text-base leading-relaxed">Explore the full stories of our murals, celebrations and community initiatives, or join us for what comes next.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`${import.meta.env.BASE_URL}stories`} className="cta-feedback inline-flex items-center gap-2 rounded-full bg-plum px-5 py-3 font-bold text-cream" data-testid="link-story-all">All stories <ArrowUpRight className="size-4" /></a>
              <a href={`${import.meta.env.BASE_URL}volunteer`} className="cta-feedback inline-flex items-center gap-2 rounded-full border-2 border-plum px-5 py-3 font-bold" data-testid="link-story-volunteer">Volunteer</a>
            </div>
            <button type="button" onClick={() => { setEnded(false); setIndex(0); setProgress(0); }} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4" data-testid="button-story-restart">
              <RotateCcw className="size-4" /> Start again from the newest
            </button>
          </div>
        ) : (
          <>
            <div
              className="relative min-h-[180px] flex-1 bg-ocean"
              onPointerDown={() => { pressedAt.current = performance.now(); suppressTap.current = false; setHeld(true); }}
              onPointerUp={() => { if (performance.now() - pressedAt.current > 350) suppressTap.current = true; setHeld(false); }}
              onPointerLeave={() => setHeld(false)}
              onPointerCancel={() => setHeld(false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              {photo && (
                <img key={photo.src} src={img(photo.src)} alt={photo.alt} decoding="async" className="absolute inset-0 size-full object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 select-none" draggable={false} />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ocean/70 via-transparent to-transparent" />
              {/* Tap zones (photo area only — never over CTA) */}
              <button type="button" tabIndex={-1} aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize" onClick={() => { if (!suppressTap.current) go(-1); }} />
              <button type="button" tabIndex={-1} aria-hidden="true" className="absolute inset-y-0 right-0 w-2/3 cursor-e-resize" onClick={() => { if (!suppressTap.current) go(1); }} />
              {held && auto && <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/70 px-3 py-1 text-xs font-semibold">Paused</span>}
            </div>

            <div key={story.id} className="relative z-10 bg-plum px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 motion-safe:animate-in motion-safe:slide-in-from-bottom-2 motion-safe:fade-in motion-safe:duration-300">
              <span aria-hidden="true" className="absolute -top-4 left-5 rotate-[-4deg] bg-sun px-3 py-1 text-sm font-bold text-plum">{story.date}</span>
              <h2 id="story-viewer-title" className="mt-1 text-2xl font-extrabold leading-tight text-cream">{story.title}</h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-teal"><MapPin className="size-4 shrink-0" aria-hidden="true" /><span className="sr-only">{story.date}, </span>{story.place}</p>
              <p id="story-viewer-idea" className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-cream/90">{story.idea}</p>
              <div className="mt-4 flex items-center gap-2">
                <a href={storyHref(story.id)} className="cta-feedback inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sun px-5 py-3 font-bold text-plum" data-testid={`link-story-full-${story.id}`}>
                  Read full story <ArrowUpRight className="size-4" />
                </a>
                <button type="button" className={btn} onClick={() => go(-1)} disabled={index === 0} aria-label="Previous story" data-testid="button-story-prev" style={index === 0 ? { opacity: 0.35 } : undefined}>
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" className={btn} onClick={() => go(1)} aria-label={index === total - 1 ? 'Finish stories' : 'Next story'} data-testid="button-story-next">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
