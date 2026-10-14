import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaYoutube, FaThreads, FaMedium, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { YOUTUBE } from '@/lib/site-data';

const socials: { name: string; icon: IconType; href?: string }[] = [
  { name: 'Facebook', icon: FaFacebookF },
  { name: 'X', icon: FaXTwitter },
  { name: 'YouTube', icon: FaYoutube, href: YOUTUBE },
  { name: 'Threads', icon: FaThreads },
  { name: 'Medium', icon: FaMedium },
  { name: 'Instagram', icon: FaInstagram },
  { name: 'LinkedIn', icon: FaLinkedinIn },
];

// Public contact details supplied in the user's header reference.
const email = 'kirukansfoundation@gmail.com';
const phone = '+91 6382601992';

export function ContactStrip() {
  return (
    <div className="bg-teal text-plum" data-testid="contact-strip">
      <div className="mx-auto max-w-7xl px-5 py-1 flex flex-col items-center gap-1 sm:flex-row sm:justify-between">
        <ul className="flex items-center gap-1" aria-label="Social media">
          {socials.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Kirukans on ${name}`} className="flex size-7 items-center justify-center rounded-full hover:bg-plum hover:text-sun transition-colors" data-testid={`link-social-${name.toLowerCase()}`}>
                  <Icon className="size-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span role="img" aria-label={`${name} — official profile link not yet provided`} title={`${name} — official profile link not yet provided`} className="flex size-7 items-center justify-center cursor-help">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:justify-end text-xs font-medium">
          <a href="tel:+916382601992" className="inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap hover:underline underline-offset-4" data-testid="link-strip-phone">
            <Phone className="size-3.5 shrink-0" aria-hidden="true" /> {phone}
          </a>
          <span className="hidden sm:block h-3 w-px bg-plum/30" aria-hidden="true" />
          <a href={`mailto:${email}`} className="inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap hover:underline underline-offset-4" data-testid="link-strip-email">
            <Mail className="size-3.5 shrink-0" aria-hidden="true" /> {email}
          </a>
        </div>
      </div>
    </div>
  );
}
