/** Names, roles and portraits supplied by the trust; do not invent biographies. */
export type TeamMember = {
  id: string; name: string; role: string; photo: string; bio?: string; linkedin?: string;
};
export const TEAM_PREVIEW_COUNT = 3;
export const teamMembers: TeamMember[] = [
  { id: 'sundar', name: 'Sundar', role: 'Founder', photo: 'team-sundar-extended.webp', linkedin: 'https://www.linkedin.com/in/sundar-sm-offi/' },
  { id: 'shishira', name: 'Shishira', role: 'Co-founder', photo: 'team-shishira-extended.webp', linkedin: 'https://www.linkedin.com/in/shishira-rams-aia-562550161/' },
  { id: 'bharathi-raja', name: 'Bharathi Raja', role: 'Secretary & Co-founder', photo: 'team-bharathi-raja-extended.webp', linkedin: 'https://www.linkedin.com/in/bharathi-raja-productdesigner' },
  { id: 's-monica', name: 'S Monica', role: 'Core member', photo: 'team-s-monica-update.webp', linkedin: 'https://www.linkedin.com/in/monicas20/' },
  { id: 'ramesh-kumar-m-k', name: 'Ramesh Kumar M K', role: 'Core member', photo: 'team-ramesh-kumar-extended.webp', linkedin: 'https://www.linkedin.com/in/rameshkumarmk/' },
  { id: 'durga-sri', name: 'Durga Sri', role: 'Core member', photo: 'team-durga-sri.webp', linkedin: 'https://www.linkedin.com/in/durgasri-r-0318b7199/' },
  { id: 'sibi-bharathy', name: 'Sibi Bharathy', role: 'Core member', photo: 'team-sibi-bharathy.webp', linkedin: 'https://www.linkedin.com/in/sibi-bharathy-s/' },
  { id: 'bhavadharani-r', name: 'Bhavadharani R', role: 'Core member', photo: 'team-bhavadharani-professional.webp', linkedin: 'https://www.linkedin.com/in/bhavadharani-ravi-0321121b4/' },
  { id: 'aparna-g', name: 'Aparna G', role: 'Core member', photo: 'team-aparna-g.webp' },
  { id: 'shailesh', name: 'Shailesh', role: 'Core member', photo: 'team-shailesh.webp', linkedin: 'https://www.linkedin.com/in/shailesh-k-88122a371/' },
  { id: 'ar-praveen', name: 'AR.Praveen', role: 'Core member', photo: 'team-ar-praveen.webp' },
  { id: 'arenganayagi-s', name: 'Arenganayagi S', role: 'Core member', photo: 'team-arenganayagi-extended.webp', linkedin: 'https://www.linkedin.com/in/ca-arenganayagi-s/' },
  { id: 'francis-stephen-j', name: 'Francis Stephen J', role: 'Core member', photo: 'team-francis-stephen-j.webp', linkedin: 'https://www.linkedin.com/in/francis-stephen-j-330170186/' },
  { id: 'nandha-kumar', name: 'Nandha Kumar', role: 'Core member', photo: 'team-nandha-kumar.webp', linkedin: 'https://www.linkedin.com/in/nandha-kumar-3322a821a/' },
  { id: 'sakthi-vel', name: 'Sakthi Vel', role: 'Core member', photo: 'team-sakthi-vel.webp' },
  { id: 'shyam-sankar', name: 'Shyam Sankar', role: 'Core member', photo: 'team-shyam-sankar.webp', linkedin: 'https://www.linkedin.com/in/shyam-sankar-01/' },
  { id: 'kkrish', name: 'Kkrish', role: 'Core member', photo: 'team-kkrish.webp', linkedin: 'https://www.linkedin.com/in/kkrish-na/' },
  { id: 'aditya-srinivas-b', name: 'Aditya Srinivas B', role: 'Core member', photo: 'team-aditya-srinivas-b.webp', linkedin: 'https://www.linkedin.com/in/adityasrinivasb-/' },
  { id: 'sathiyavel-b', name: 'Sathiyavel B', role: 'Core member', photo: 'team-sathiyavel-b.webp' },
];
