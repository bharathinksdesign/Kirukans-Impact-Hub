/** DEMO DATA: fictional sample profiles. Replace this array with real members later. */
import { BRAND_PALETTE as palette } from '@/lib/brand-palette';
export type TeamMember = {
  id: string; name: string; role: string; bio: string;
  skin: string; hair: string; shirt: string; bg: string; hairStyle: 'long' | 'short' | 'bun' | 'curly';
};
export const TEAM_PREVIEW_COUNT = 3;
export const teamMembers: TeamMember[] = [
  { id: 'meera', name: 'Meera Alagappan', role: 'Lead muralist (sample)', bio: 'Sketches the first outline on every wall and keeps the brush-washing rota fair.', skin: palette.light, hair: palette.black, shirt: palette.navy, bg: palette.yellow, hairStyle: 'long' },
  { id: 'karthik', name: 'Karthik Rangan', role: 'Volunteer coordinator (sample)', bio: 'Turns a Saturday idea into forty volunteers, tiffin boxes and a school gate pass.', skin: palette.light, hair: palette.black, shirt: palette.pink, bg: palette.teal, hairStyle: 'short' },
  { id: 'sowmya', name: 'Sowmya Dharman', role: 'Colour and design (sample)', bio: 'Mixes palettes with children and picks the shade everyone secretly wanted.', skin: palette.light, hair: palette.black, shirt: palette.teal, bg: palette.pink, hairStyle: 'bun' },
  { id: 'imran', name: 'Imran Basha', role: 'Wall prep and safety (sample)', bio: 'Scrapes, primes and checks every ladder so the painting day stays calm.', skin: palette.light, hair: palette.gray, shirt: palette.blue, bg: palette.teal, hairStyle: 'curly' },
  { id: 'janani', name: 'Janani Velu', role: 'Workshops with children (sample)', bio: 'Runs the handprint corner and has a story ready for every nervous first-timer.', skin: palette.light, hair: palette.navy, shirt: palette.yellow, bg: palette.pink, hairStyle: 'long' },
  { id: 'arjun', name: 'Arjun Selvam', role: 'Photos and stories (sample)', bio: 'Captures the before and after and writes the story you read on this site.', skin: palette.light, hair: palette.black, shirt: palette.navy, bg: palette.yellow, hairStyle: 'short' },
];
