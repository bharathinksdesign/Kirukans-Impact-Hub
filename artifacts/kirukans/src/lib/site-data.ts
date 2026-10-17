export const img = (name: string) => /^https?:\/\//i.test(name) ? name : `${import.meta.env.BASE_URL}images/${name}`;

export const PHONE_HREF = 'tel:+918939018125';
export const PHONE_TEXT = '+91 89390 18125';
export const YOUTUBE = 'https://www.youtube.com/@kirukans_trust';

export type Project = {
  id: string;
  n: string;
  title: string;
  place: string;
  date: string;
  idea: string;
  contribution: string[];
  photos: { src: string; alt: string }[];
  tone: string;
};

export const projects: Project[] = [
  {
    id: 'anganvadi',
    n: '01',
    title: 'Anganvadi School',
    place: 'Thalakudi, Trichy',
    date: 'April 2024',
    idea: 'A vibrant, joyful school environment that encourages very young children to discover reading and learning.',
    contribution: [
      'A colourful educational mural themed "Read, Read, Read".',
      'Stories, imagination and learning, brought into the everyday space where the children spend their days.',
    ],
    photos: [{ src: 'page-5-image-1.webp', alt: 'Kirukans volunteers at the Anganvadi school mural project' }],
    tone: 'bg-sun text-plum',
  },
  {
    id: 'blind-school',
    n: '02',
    title: 'Blind School',
    place: 'Trichy',
    date: 'November 2024',
    idea: 'Bright colours and strong visual elements for students, many with partial vision, so the environment feels lively and accessible.',
    contribution: [
      'A Braille-inspired mural.',
      'A wall covered in the children\'s own handprints.',
      'A Diwali celebration with music, drama, dance, sweets and joy.',
    ],
    photos: [
      { src: 'page-6-image-3.webp', alt: 'Group photo of volunteers and students at the Blind School' },
      { src: 'page-6-image-5.webp', alt: 'Children making handprints on the wall' },
      { src: 'page-6-image-6.webp', alt: 'Wide view of the finished painted wall' },
    ],
    tone: 'bg-teal text-plum',
  },
  {
    id: 'nakkasalem',
    n: '03',
    title: 'Nakkasalem Government Higher Secondary School',
    place: 'Nakkasalem',
    date: 'October 2025',
    idea: 'An inspiring environment that tells students to dream big, learn, and believe in their potential.',
    contribution: [
      'A large Dr A.P.J. Abdul Kalam mural.',
      'Playful educational doodles painted across the children\'s block.',
    ],
    photos: [
      { src: 'page-7-image-3.webp', alt: 'The Dr A.P.J. Abdul Kalam mural' },
      { src: 'page-7-image-2.webp', alt: 'The painted school building' },
      { src: 'page-7-image-4.webp', alt: 'A painted corridor' },
      { src: 'page-7-image-5.webp', alt: 'Playful educational mural' },
      { src: 'page-7-image-6.webp', alt: 'Kirukans artists at work' },
    ],
    tone: 'bg-tangerine text-ink',
  },
  {
    id: 'nangavaram',
    n: '04',
    title: 'P.U.M Government School',
    place: 'Nangavaram',
    date: 'March 2026',
    idea: 'An inspiring and engaging High Tech Computer Lab for the school.',
    contribution: [
      'Murals on all four sides of the lab.',
      'Two nights and three days of work, shoulder to shoulder with Kirukans volunteers and local villagers.',
    ],
    photos: [
      { src: 'nangavaram-community.webp', alt: 'Kirukans volunteers and local community at the painted Nangavaram lab' },
      { src: 'nangavaram-mural.webp', alt: 'Space and science mural at the Nangavaram computer lab' },
    ],
    tone: 'bg-plum text-sun',
  },
  {
    id: 'krishna-home-pongal',
    n: '05',
    title: 'Pongal at Krishna Home',
    place: 'Krishna Home',
    date: 'Pongal 2025',
    idea: 'A Pongal celebration at Krishna Home, documented in a Kirukans Charitable Trust event video.',
    contribution: [
      'A Pongal gathering at Krishna Home in 2025.',
      'Children, residents and volunteers came together for the celebration.',
    ],
    photos: [
      {
        src: 'pongal-krishna-home-group-hero.webp',
        alt: 'Children, residents and volunteers gather at Krishna Home for Pongal.',
      },
      {
        src: 'pongal-krishna-home-mic.webp',
        alt: 'A volunteer speaks with children during the gathering.',
      },
      {
        src: 'pongal-krishna-home-pot.webp',
        alt: 'A traditional Pongal pot cooks over a fire.',
      },
      {
        src: 'pongal-krishna-home-residents.webp',
        alt: 'Residents sit together outdoors during the celebration.',
      },
      {
        src: 'pongal-krishna-home-group-wide.webp',
        alt: 'Children, residents and volunteers gathered beneath the trees.',
      },
      {
        src: 'pongal-krishna-home-activity-1.webp',
        alt: 'A child takes part in a playful activity during the event.',
      },
      {
        src: 'pongal-krishna-home-activity-2.webp',
        alt: 'Children take part in an outdoor group activity.',
      },
      {
        src: 'pongal-krishna-home-gift.webp',
        alt: 'A gift is shared with a resident during the gathering.',
      },
      {
        src: 'pongal-krishna-home-gathering.webp',
        alt: 'Residents, children and volunteers share time together outdoors.',
      },
      {
        src: 'pongal-krishna-home-volunteer-group.webp',
        alt: 'Kirukans volunteers and Krishna Home residents pose together.',
      },
    ],
    tone: 'bg-sun text-plum',
  },
];

export const gallery = [
  { src: 'page-1-image-7.webp', alt: 'Kirukans community workshop', cap: 'Community workshop' },
  { src: 'page-2-image-3.webp', alt: 'Mural volunteer group', cap: 'The mural crew' },
  { src: 'page-2-image-2.webp', alt: 'Artist painting the Kalam mural', cap: 'Painting Kalam' },
  { src: 'page-5-image-1.webp', alt: 'Anganvadi school project', cap: 'Anganvadi, Thalakudi' },
  { src: 'page-6-image-3.webp', alt: 'Blind School group photo', cap: 'Blind School, together' },
  { src: 'page-6-image-5.webp', alt: 'Handprinting at the Blind School', cap: 'Handprints' },
  { src: 'page-6-image-6.webp', alt: 'Blind School wall panorama', cap: 'The finished wall' },
  { src: 'page-7-image-3.webp', alt: 'Kalam mural at Nakkasalem', cap: 'Kalam, Nakkasalem' },
  { src: 'page-7-image-2.webp', alt: 'Painted building at Nakkasalem', cap: 'A school repainted' },
  { src: 'page-7-image-4.webp', alt: 'Painted corridor', cap: 'The corridor' },
  { src: 'page-7-image-5.webp', alt: 'Playful educational mural', cap: 'Doodles that teach' },
  { src: 'page-7-image-6.webp', alt: 'Artists at work', cap: 'Artists at work' },
];
