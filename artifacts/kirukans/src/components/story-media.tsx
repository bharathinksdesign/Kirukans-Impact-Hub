import { useCallback, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Play, X, ExternalLink } from 'lucide-react';
import { img, YOUTUBE } from '@/lib/site-data';

export type StoryPhoto = { src: string; alt: string; cap: string };

export function PhotoGallery({ photos }: { photos: StoryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  const cur = open === null ? null : photos[open];
  return (
    <Dialog.Root open={open !== null} onOpenChange={(value) => { if (!value) setOpen(null); }}>
      <div className={`grid gap-6 ${photos.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {photos.map((p, i) => (
          <figure key={p.src} className={`${i === 0 && photos.length % 2 === 1 ? 'md:col-span-2' : ''}`}>
            <button
              onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}
              className="block w-full overflow-hidden rounded-2xl border-4 border-plum bg-plum/5 cursor-zoom-in"
              aria-label={`Enlarge photo: ${p.cap}`}
              data-testid={`button-story-photo-${i}`}
            >
              <img src={img(p.src)} alt={p.alt} loading="lazy" className="block w-full h-auto" />
            </button>
            <figcaption className="mt-3 text-sm md:text-base text-muted-foreground border-l-4 border-sun pl-3">{p.cap}</figcaption>
          </figure>
        ))}
      </div>
      {cur && (
        <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-plum/95" />
        <Dialog.Content
          className="fixed inset-0 z-[70] flex flex-col"
          onClick={() => setOpen(null)}
          onCloseAutoFocus={(e) => { e.preventDefault(); lastFocus.current?.focus(); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
          }}
        >
          <Dialog.Title className="sr-only">Project photo viewer</Dialog.Title>
          <Dialog.Description className="sr-only">Use the arrow keys or buttons to browse photos. Press Escape to close.</Dialog.Description>
          <div className="flex justify-end p-3">
            <button onClick={() => setOpen(null)} aria-label="Close photo" className="p-3 text-cream rounded-full hover:bg-cream/10" data-testid="button-lightbox-close"><X /></button>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center px-3 md:px-16 relative">
            {photos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-1 md:left-4 p-3 rounded-full bg-sun text-plum z-10" data-testid="button-lightbox-prev"><ChevronLeft /></button>
                <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-1 md:right-4 p-3 rounded-full bg-sun text-plum z-10" data-testid="button-lightbox-next"><ChevronRight /></button>
              </>
            )}
            <img src={img(cur.src)} alt={cur.alt} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full object-contain rounded-lg" />
          </div>
          <p className="text-cream text-center p-4 text-sm md:text-base" onClick={(e) => e.stopPropagation()}>{cur.cap}</p>
        </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}

export type StoryVideoData = {
  id: string;
  title: string;
  caption: string;
  kind: 'project' | 'related' | 'event';
  platform?: 'youtube' | 'instagram';
  thumbnail?: string;
};

export function StoryVideo({ video }: { video: StoryVideoData }) {
  const [play, setPlay] = useState(false);
  const instagram = video.platform === 'instagram';
  const related = video.kind === 'related';
  const heading = related ? 'A related film from Kirukans' : video.kind === 'event' ? 'The event film' : 'The project film';
  const embedUrl = instagram
    ? `https://www.instagram.com/reel/${video.id}/embed/`
    : `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
  const watchUrl = instagram
    ? `https://www.instagram.com/reel/${video.id}/`
    : `https://www.youtube.com/watch?v=${video.id}`;
  const thumbnail = instagram
    ? video.thumbnail ? img(video.thumbnail) : undefined
    : `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  return (
    <div>
      <p className="font-hand text-3xl text-tangerine">{heading}</p>
      <div className={`mt-3 ${instagram ? 'mx-auto aspect-[9/16] max-w-[420px]' : 'aspect-video'} w-full overflow-hidden rounded-2xl border-4 border-plum bg-plum`}>
        {play ? (
          <iframe
            className="size-full"
            src={embedUrl}
            title={video.title}
            referrerPolicy="strict-origin-when-cross-origin"
            allow={instagram ? 'clipboard-write; encrypted-media; picture-in-picture; web-share' : 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'}
            allowFullScreen
            data-testid="iframe-story-video"
          />
        ) : (
          <button onClick={() => setPlay(true)} className="relative size-full flex flex-col items-center justify-center gap-4 p-6 text-center text-cream group" aria-label={`Play video: ${video.title}`} data-testid="button-play-video">
            {thumbnail && <img src={thumbnail} alt="" className="absolute inset-0 size-full object-cover opacity-45" />}
            <span className="relative grid place-items-center size-20 rounded-full bg-sun text-plum group-hover:scale-105 transition-transform motion-reduce:transition-none"><Play className="size-9 ml-1" fill="currentColor" aria-hidden /></span>
          </button>
        )}
      </div>
      <p className="mt-3 text-muted-foreground">{video.caption}</p>
      <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-bold underline underline-offset-4 hover:text-tangerine" data-testid={instagram ? 'link-watch-instagram' : 'link-watch-youtube'}>
        {instagram ? 'Watch on Instagram' : 'Watch on YouTube'} <ExternalLink className="size-4" aria-hidden />
      </a>
    </div>
  );
}

export function ChannelNote() {
  return (
    <div className="rounded-2xl border-4 border-plum bg-sun text-plum p-6 md:p-8">
      <p className="font-hand text-3xl">More from Kirukans</p>
      <p className="mt-2 text-lg font-semibold max-w-2xl">There isn’t a video link for this story yet. Visit the official Kirukans channel for murals, workshops and community activities.</p>
      <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-plum text-sun px-5 py-3 font-bold" data-testid="link-channel">
        Visit the Kirukans YouTube channel <ExternalLink className="size-4" aria-hidden />
      </a>
    </div>
  );
}
