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
      <div className="mx-auto max-w-7xl px-3 sm:px-5 py-1 flex flex-nowrap items-center justify-center gap-2 sm:justify-between">
        <ul className="flex shrink-0 items-center gap-1" aria-label="Social media">
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
        <div className="flex shrink-0 flex-nowrap items-center gap-1 sm:gap-x-4 text-xs font-medium">
          <a href="tel:+916382601992" aria-label={`Call Kirukans at ${phone}`} className="inline-flex size-7 sm:w-auto items-center justify-center gap-1.5 whitespace-nowrap hover:underline underline-offset-4" data-testid="link-strip-phone">
            <Phone className="size-3.5 shrink-0" aria-hidden="true" /> <span className="hidden sm:inline">{phone}</span>
          </a>
          <span className="hidden sm:block h-3 w-px bg-plum/30" aria-hidden="true" />
          <a href={`mailto:${email}`} aria-label={`Email Kirukans at ${email}`} className="inline-flex size-7 sm:w-auto items-center justify-center gap-1.5 whitespace-nowrap hover:underline underline-offset-4" data-testid="link-strip-email">
            <Mail className="size-3.5 shrink-0" aria-hidden="true" /> <span className="hidden sm:inline">{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
