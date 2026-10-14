import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { img, gallery } from '@/lib/site-data';

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
