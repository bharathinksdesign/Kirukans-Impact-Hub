/** Names, roles and portraits supplied by the trust; do not invent biographies. */
export type TeamMember = {
  id: string; name: string; role: string; photo: string; bio?: string;
};
export const TEAM_PREVIEW_COUNT = 3;
export const teamMembers: TeamMember[] = [
  { id: 'sundar', name: 'Sundar', role: 'Founder', photo: 'team-sundar-extended.webp' },
  { id: 'shishira', name: 'Shishira', role: 'Managing Director', photo: 'team-shishira-extended.webp' },
  { id: 'bharathi-raja', name: 'Bharathi Raja', role: 'Secretary', photo: 'team-bharathi-raja-extended.webp' },
];
