import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/closing-sections';
import { Reveal } from '@/components/reveal';
import { useDocumentMeta } from '@/lib/stories';

function useOg(title: string, description: string) {
  useEffect(() => {
    const made: HTMLMetaElement[] = [];
    const prev: [HTMLMetaElement, string][] = [];
    for (const [p, v] of [['og:title', title], ['og:description', description]] as const) {
      let t = document.querySelector<HTMLMetaElement>(`meta[property="${p}"]`);
      if (t) prev.push([t, t.content]);
      else { t = document.createElement('meta'); t.setAttribute('property', p); document.head.appendChild(t); made.push(t); }
      t.content = v;
    }
    return () => { made.forEach((m) => m.remove()); prev.forEach(([m, c]) => { m.content = c; }); };
  }, [title, description]);
}

export function PageShell({ title, description, kicker, heading, intro, children }: {
  title: string; description: string; kicker: string; heading: string; intro: string; children: ReactNode;
}) {
  useDocumentMeta(title, description);
  useOg(title, description);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="grain min-h-[100dvh]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-5 pt-10 pb-14 md:pb-20">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-plum hover:text-tangerine" data-testid="link-back-home">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Link>
          <Reveal className="mt-8 max-w-3xl">
            <p className="font-hand text-3xl text-tangerine">{kicker}</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight">{heading}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
          </Reveal>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageCta({ href, children, testid }: { href: string; children: ReactNode; testid: string }) {
  return (
    <Link href={href} className="cta-feedback inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-bold text-plum" data-testid={testid}>
      {children}
    </Link>
  );
}
