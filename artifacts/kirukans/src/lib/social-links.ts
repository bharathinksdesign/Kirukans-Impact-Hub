import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaThreads,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { SOCIAL_LINKS } from '@/lib/site-data';

export const socialChannels: {
  name: string;
  icon: IconType;
  href: string;
  ariaLabel: string;
}[] = [
  { name: 'Facebook', icon: FaFacebookF, href: SOCIAL_LINKS.facebook, ariaLabel: 'Kirukans on Facebook' },
  { name: 'X', icon: FaXTwitter, href: SOCIAL_LINKS.x, ariaLabel: 'Kirukans on X' },
  { name: 'YouTube', icon: FaYoutube, href: SOCIAL_LINKS.youtube, ariaLabel: 'Kirukans on YouTube' },
  { name: 'Threads', icon: FaThreads, href: SOCIAL_LINKS.threads, ariaLabel: 'Kirukans on Threads' },
  { name: 'Medium', icon: FaMedium, href: SOCIAL_LINKS.medium, ariaLabel: 'Read a Kirukans story on Medium' },
  { name: 'Instagram', icon: FaInstagram, href: SOCIAL_LINKS.instagram, ariaLabel: 'Kirukans on Instagram' },
  { name: 'LinkedIn', icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, ariaLabel: 'Kirukans on LinkedIn' },
];
