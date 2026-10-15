/** Names, roles and portraits supplied by the trust; do not invent biographies. */
export type TeamMember = {
  id: string; name: string; role: string; photo: string; bio?: string;
};
export const TEAM_PREVIEW_COUNT = 3;
export const teamMembers: TeamMember[] = [
  { id: 'sundar', name: 'Sundar', role: 'Founder', photo: 'team-sundar-extended.webp' },
  { id: 'shishira', name: 'Shishira', role: 'Managing Director', photo: 'team-shishira-extended.webp' },
  { id: 'bharathi-raja', name: 'Bharathi Raja', role: 'Secretary', photo: 'team-bharathi-raja-extended.webp' },
  { id: 's-monica', name: 'S Monica', role: 'Core member', photo: 'team-s-monica-office.webp' },
  { id: 'ramesh-kumar-m-k', name: 'Ramesh Kumar M K', role: 'Core member', photo: 'team-ramesh-kumar-extended.webp' },
  { id: 'bhavadharani-r', name: 'Bhavadharani R', role: 'Core member', photo: 'team-bhavadharani-professional.webp' },
  { id: 'arenganayagi-s', name: 'Arenganayagi S', role: 'Core member', photo: 'team-arenganayagi-extended.webp' },
];
