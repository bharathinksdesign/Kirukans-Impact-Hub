import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { img } from '@/lib/site-data';
import { homeHash } from '@/lib/stories';

const links = [
  ['Our story', '#about'],
  ['What we do', '#approach'],
  ['Impact stories', '#stories'],
  ['Get involved', '#join'],
];

const navHref = (path: string) => path.startsWith('#')
  ? homeHash(path)
  : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const scrollPosition = () => Math.max(0, Math.min(
      window.scrollY,
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    ));
    let lastY = scrollPosition();
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = scrollPosition();
      if (open || y <= 96) {
        setHidden(false);
        lastY = y;
        return;
      }
      // Ignore tiny scroll changes to prevent the header flickering.
      if (Math.abs(y - lastY) >= 8) {
        setHidden(y > lastY);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-teal text-plum border-0 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out motion-reduce:transition-none ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      onFocusCapture={() => setHidden(false)}
      data-scroll-hidden={hidden && !open}
    >
      <div className="mx-auto max-w-7xl px-5 h-20 lg:h-24 flex items-center justify-between">
        <a href={homeHash("#top")} className="shrink-0" aria-label="Kirukans home" data-testid="link-home">
          <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-14 lg:h-16 w-auto" />
        </a>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-base font-semibold">
          {links.map(([l, h]) => (
            <a key={h} href={navHref(h)} className="hover:text-plum/75 hover:underline underline-offset-4 transition-colors" data-testid={`link-nav-${l.toLowerCase().replaceAll(' ', '-')}`}>
              {l}
            </a>
          ))}
          <a href={homeHash('#support')} className="inline-flex items-center gap-2 rounded-xl bg-sun text-plum px-6 py-3 font-bold hover:bg-sun/90 transition-colors" data-testid="link-nav-support">
            Support us <ArrowUpRight className="size-5" aria-hidden />
          </a>
        </nav>
        <button
          className="lg:hidden p-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          data-testid="button-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden px-5 pb-6 pt-2 flex flex-col gap-1 text-2xl font-extrabold">
          {links.map(([l, h]) => (
            <a key={h} href={navHref(h)} onClick={() => setOpen(false)} className="py-2 hover:text-plum/75 hover:underline underline-offset-4">
              {l}
            </a>
          ))}
          <a href={homeHash('#support')} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-sun text-plum px-5 py-3 text-lg text-center" data-testid="link-mobile-support">
            Support us <ArrowUpRight className="size-5" aria-hidden />
          </a>
        </nav>
      )}
    </header>
  );
}
