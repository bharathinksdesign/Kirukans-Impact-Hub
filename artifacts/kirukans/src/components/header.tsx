import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { img } from '@/lib/site-data';
import { homeHash } from '@/lib/stories';
import { ContactStrip } from '@/components/contact-strip';

const links = [
  ['About us', '/about'],
  ['Impact stories', '/stories'],
  ['Our team', '/team'],
  ['Volunteer', '/volunteer'],
];

const navHref = (path: string) => path.startsWith('#')
  ? homeHash(path)
  : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
      if (open || y <= Math.max(96, headerRef.current?.offsetHeight ?? 96)) {
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
      ref={headerRef}
      className={`sticky top-0 z-40 bg-[#ffffff] text-plum border-b border-plum/10 shadow-none transition-transform duration-300 ease-out motion-reduce:transition-none ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      onFocusCapture={() => setHidden(false)}
      data-scroll-hidden={hidden && !open}
    >
      <ContactStrip />
      <div className="mx-auto max-w-7xl px-5 h-20 lg:h-24 flex items-center justify-between">
        <a href={homeHash("#top")} className="shrink-0" aria-label="Kirukans home" data-testid="link-home">
          <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-14 lg:h-16 w-auto" />
        </a>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm xl:text-base font-semibold">
          {links.map(([l, h]) => (
            <a key={h} href={navHref(h)} className="hover:text-plum hover:underline underline-offset-4 transition-colors" data-testid={`link-nav-${l.toLowerCase().replaceAll(' ', '-')}`}>
              {l}
            </a>
          ))}
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
            <a key={h} href={navHref(h)} onClick={() => setOpen(false)} className="py-2 hover:text-plum hover:underline underline-offset-4">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
