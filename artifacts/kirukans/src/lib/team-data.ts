/** Names, roles and portraits supplied by the trust; do not invent biographies. */
export type TeamMember = {
  id: string; name: string; role: string; photo: string; bio?: string;
};
export const TEAM_PREVIEW_COUNT = 3;
export const teamMembers: TeamMember[] = [
  { id: 'sundar', name: 'Sundar', role: 'Founder', photo: 'team-sundar-extended.webp' },
  { id: 'shishira', name: 'Shishira', role: 'Co-founder', photo: 'team-shishira-extended.webp' },
  { id: 'bharathi-raja', name: 'Bharathi Raja', role: 'Secretary & Co-founder', photo: 'team-bharathi-raja-extended.webp' },
  { id: 's-monica', name: 'S Monica', role: 'Core member', photo: 'team-s-monica-office.webp' },
  { id: 'ramesh-kumar-m-k', name: 'Ramesh Kumar M K', role: 'Core member', photo: 'team-ramesh-kumar-extended.webp' },
  { id: 'durga-sri', name: 'Durga Sri', role: 'Core member', photo: 'team-durga-sri.webp' },
  { id: 'sibi-bharathy', name: 'Sibi Bharathy', role: 'Core member', photo: 'team-sibi-bharathy.webp' },
  { id: 'bhavadharani-r', name: 'Bhavadharani R', role: 'Core member', photo: 'team-bhavadharani-professional.webp' },
  { id: 'aparna-g', name: 'Aparna G', role: 'Core member', photo: 'team-aparna-g.webp' },
  { id: 'shailesh', name: 'Shailesh', role: 'Core member', photo: 'team-shailesh.webp' },
  { id: 'ar-praveen', name: 'AR.Praveen', role: 'Core member', photo: 'team-ar-praveen.webp' },
  { id: 'arenganayagi-s', name: 'Arenganayagi S', role: 'Core member', photo: 'team-arenganayagi-extended.webp' },
  { id: 'francis-stephen-j', name: 'Francis Stephen J', role: 'Core member', photo: 'team-francis-stephen-j.webp' },
  { id: 'nandha-kumar', name: 'Nandha Kumar', role: 'Core member', photo: 'team-nandha-kumar.webp' },
  { id: 'sakthi-vel', name: 'Sakthi Vel', role: 'Core member', photo: 'team-sakthi-vel.webp' },
  { id: 'shyam-sankar', name: 'Shyam Sankar', role: 'Core member', photo: 'team-shyam-sankar.webp' },
  { id: 'kkrish', name: 'Kkrish', role: 'Core member', photo: 'team-kkrish.webp' },
  { id: 'aditya-srinivas-b', name: 'Aditya Srinivas B', role: 'Core member', photo: 'team-aditya-srinivas-b.webp' },
  { id: 'sathiyavel-b', name: 'Sathiyavel B', role: 'Core member', photo: 'team-sathiyavel-b.webp' },
];
