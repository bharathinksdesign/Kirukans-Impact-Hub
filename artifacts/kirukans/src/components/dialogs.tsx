import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { img, gallery, type Project } from '@/lib/site-data';

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-plum/80 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed z-50 inset-x-3 top-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(56rem,92vw)] overflow-y-auto rounded-3xl bg-cream text-plum border-4 border-sun data-[state=open]:animate-in data-[state=open]:zoom-in-95">
          {project && (
            <div>
              <div className={`${project.tone} p-7 pr-16`}>
                <p className="font-bold uppercase tracking-wider text-sm">{project.date} / {project.place}</p>
                <Dialog.Title className="text-3xl md:text-5xl font-extrabold leading-tight mt-1">{project.title}</Dialog.Title>
              </div>
              <Dialog.Close className="absolute top-4 right-4 rounded-full bg-cream text-plum p-2 border-2 border-plum" aria-label="Close story" data-testid="button-close-project">
                <X className="size-5" />
              </Dialog.Close>
              <div className="p-7 grid md:grid-cols-2 gap-8">
                <Dialog.Description asChild>
                  <div>
                    <h3 className="font-hand text-3xl text-tangerine">The idea</h3>
                    <p className="text-lg">{project.idea}</p>
                  </div>
                </Dialog.Description>
                <div>
                  <h3 className="font-hand text-3xl text-tangerine">Our contribution</h3>
                  <ul className="space-y-2 text-lg list-disc pl-5 marker:text-teal">
                    {project.contribution.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {project.photos.length > 0 && (
                <div className="px-7 pb-7 columns-1 sm:columns-2 gap-4 [&>img]:mb-4">
                  {project.photos.map((ph) => (
                    <img key={ph.src} src={img(ph.src)} alt={ph.alt} className="w-full rounded-2xl border-2 border-plum" loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Lightbox({ index, setIndex }: { index: number | null; setIndex: (i: number | null) => void }) {
  const n = gallery.length;
  const g = index !== null ? gallery[index] : null;
  return (
    <Dialog.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-plum/95" />
        <Dialog.Content
          className="fixed z-50 inset-0 flex flex-col items-center justify-center p-4 text-cream"
          onKeyDown={(e) => {
            if (index === null) return;
            if (e.key === 'ArrowRight') setIndex((index + 1) % n);
            if (e.key === 'ArrowLeft') setIndex((index - 1 + n) % n);
          }}
        >
          <Dialog.Title className="sr-only">Gallery photo</Dialog.Title>
          <Dialog.Description className="sr-only">Use arrow keys or buttons to browse photos.</Dialog.Description>
          {g && index !== null && (
            <>
              <img src={img(g.src)} alt={g.alt} className="max-h-[78dvh] max-w-full rounded-2xl border-4 border-sun object-contain" />
              <p className="mt-4 font-hand text-3xl text-sun">{g.cap}</p>
              <p className="text-sm">{index + 1} / {n}</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => setIndex((index - 1 + n) % n)} className="rounded-full bg-sun text-plum p-3" aria-label="Previous photo" data-testid="button-lightbox-prev"><ChevronLeft /></button>
                <button onClick={() => setIndex((index + 1) % n)} className="rounded-full bg-sun text-plum p-3" aria-label="Next photo" data-testid="button-lightbox-next"><ChevronRight /></button>
              </div>
            </>
          )}
          <Dialog.Close className="absolute top-4 right-4 rounded-full bg-cream text-plum p-2" aria-label="Close gallery" data-testid="button-close-gallery"><X /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
