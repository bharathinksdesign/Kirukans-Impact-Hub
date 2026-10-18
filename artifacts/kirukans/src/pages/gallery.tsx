import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Gallery, Footer } from '@/components/closing-sections';
import { Lightbox } from '@/components/dialogs';
import { useDocumentMeta } from '@/lib/stories';

export default function GalleryPage() {
  const [photo, setPhoto] = useState<number | null>(null);
  useDocumentMeta(
    'Gallery | Kirukans Charitable Trust',
    'Explore real photographs of Kirukans murals, creative workshops and community projects in and around Trichy.',
  );
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="grain min-h-[100dvh]">
      <a href="#gallery" className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:bg-sun focus:text-plum focus:p-3">Skip to gallery</a>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-plum hover:text-tangerine" data-testid="link-gallery-back-home">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Link>
        </div>
        <Gallery onOpen={setPhoto} />
      </main>
      <Footer />
      <Lightbox index={photo} setIndex={setPhoto} />
    </div>
  );
}
