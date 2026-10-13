import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { img, PHONE_HREF } from '@/lib/site-data';
import { homeHash } from '@/lib/stories';

const links = [
  ['About', '#about'],
  ['Approach', '#approach'],
  ['Stories', '#stories'],
  ['Gallery', '#gallery'],
  ['Impact', '#impact'],
  ['Join', '#join'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-plum text-cream border-b-4 border-sun">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <a href={homeHash("#top")} className="shrink-0" aria-label="Kirukans home" data-testid="link-home">
          <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-10 w-auto" />
        </a>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {links.map(([l, h]) => (
            <a key={h} href={homeHash(h)} className="hover:text-sun transition-colors" data-testid={`link-nav-${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-sun text-plum px-4 py-2 hover:bg-teal transition-colors" data-testid="link-nav-call">
            <Phone className="size-4" aria-hidden /> Call us
          </a>
        </nav>
        <button
          className="md:hidden p-2"
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
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden px-5 pb-6 pt-2 flex flex-col gap-1 text-2xl font-extrabold">
          {links.map(([l, h]) => (
            <a key={h} href={homeHash(h)} onClick={() => setOpen(false)} className="py-2 hover:text-sun">
              {l}
            </a>
          ))}
          <a href={PHONE_HREF} className="mt-3 rounded-full bg-sun text-plum px-5 py-3 text-lg text-center">
            Call +91 89390 18125
          </a>
        </nav>
      )}
    </header>
  );
}
