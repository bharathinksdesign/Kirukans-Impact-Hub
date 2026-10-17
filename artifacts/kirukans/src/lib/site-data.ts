export const img = (name: string) => /^https?:\/\//i.test(name) ? name : `${import.meta.env.BASE_URL}images/${name}`;

export const PHONE_HREF = 'tel:+918939018125';
export const PHONE_TEXT = '+91 89390 18125';
export const YOUTUBE = 'https://www.youtube.com/@kirukans_trust';

export type Project = {
  id: string;
  n: string;
  title: string;
  place: string;
  placeHref?: string;
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
    place: 'Thiruvalarai, Trichy',
    placeHref: 'https://share.google/0mPGCrX49pXLnqoqz',
    date: 'Pongal 2025',
    idea: 'Kirukans Charitable Trust celebrated Pongal 2025 at Krishna Home in Thiruvalarai, Trichy, with elders and youngsters.',
    contribution: [
      'Traditional Kolam preparation, Pongal pot setup and cultural decorations.',
      'Singing, ice-breaking activities, games, dance performances and Uriyadi.',
      'Donated 10 fans and lights for Krishna Home.',
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
  {
    id: 'christian-mission-service-workshop',
    n: '07',
    title: 'Kirukans Creative Workshop',
    place: 'Christian Mission Service Children’s Home, Kilpauk, Chennai',
    date: 'October 2021',
    idea: 'A hands-on creative workshop where students explored painting, mural-making, clay and other art activities.',
    contribution: [
      'Mural painting, texture painting and poster-colour activities.',
      'Coconut-shell doll making, clay modelling and other creative activities.',
      'A day of learning, making and enjoying art together.',
    ],
    photos: [
      {
        src: 'creative-workshop-cms-02.webp',
        alt: 'Students proudly display their artwork at the Christian Mission Service workshop.',
      },
      {
        src: 'creative-workshop-cms-01.webp',
        alt: 'A student concentrates on drawing during the workshop.',
      },
      {
        src: 'creative-workshop-cms-03.webp',
        alt: 'A student paints a coconut shell as part of a hands-on activity.',
      },
      {
        src: 'creative-workshop-cms-04.webp',
        alt: 'A volunteer shares a moment with a young student during the workshop.',
      },
      {
        src: 'creative-workshop-cms-05.webp',
        alt: 'Students gather for a group activity at the children’s home.',
      },
      {
        src: 'creative-workshop-cms-06.webp',
        alt: 'Students and volunteers work with paint and materials at a table.',
      },
      {
        src: 'creative-workshop-cms-07.webp',
        alt: 'Kirukans Creative Workshop title card.',
      },
      {
        src: 'creative-workshop-cms-08.webp',
        alt: 'Students and volunteers pose in front of a mural at the workshop.',
      },
      {
        src: 'creative-workshop-cms-09.webp',
        alt: 'A student paints a mural on an outdoor wall.',
      },
      {
        src: 'creative-workshop-cms-10.webp',
        alt: 'Students experiment with texture painting together.',
      },
      {
        src: 'creative-workshop-cms-11.webp',
        alt: 'A colourful textured artwork made during the workshop.',
      },
      {
        src: 'creative-workshop-cms-12.webp',
        alt: 'Students create colourful artwork with poster paints.',
      },
      {
        src: 'creative-workshop-cms-13.webp',
        alt: 'Students’ finished paintings arranged for display.',
      },
      {
        src: 'creative-workshop-cms-14.webp',
        alt: 'Completed workshop paintings arranged together.',
      },
      {
        src: 'creative-workshop-cms-15.webp',
        alt: 'A student decorates a handmade craft during the workshop.',
      },
      {
        src: 'creative-workshop-cms-16.webp',
        alt: 'A student adds colour to a poster painting.',
      },
      {
        src: 'creative-workshop-cms-17.webp',
        alt: 'A volunteer demonstrates a painting activity to students.',
      },
      {
        src: 'creative-workshop-cms-18.webp',
        alt: 'Students and volunteers paint together during the creative workshop.',
      },
    ],
    tone: 'bg-teal text-plum',
  },
  {
    id: 'diwali-trichy-junction-bridge',
    n: '08',
    title: 'Diwali with Families at Trichy Junction Bridge',
    place: 'Trichy Junction Bridge, Trichy',
    date: 'October 2022',
    idea: 'Kirukans celebrated Diwali with families living beneath Trichy Junction Bridge, sharing festive essentials, time and conversation.',
    contribution: [
      'Grocery essentials for each family.',
      'Sweets, crackers and clothes for families and children.',
      'A shared Diwali celebration and time to listen to families’ experiences.',
    ],
    photos: [],
    tone: 'bg-sun text-plum',
  },
  {
    id: 'trans-pongal',
    n: '06',
    title: 'Trans Pongal',
    place: 'St Joseph’s Church, Trichy',
    date: 'January 2024',
    idea: 'Kirukans brought together 30+ transgender people for an inclusive Pongal celebration at St Joseph’s Church in Trichy.',
    contribution: [
      'Prepared Pongal in the traditional way together.',
      'Made space for everyone to join in Pongal games and activities.',
      'Provided one month of groceries to the participants.',
    ],
    photos: [
      {
        src: 'trans-pongal-group-hero.webp',
        alt: 'Transgender participants and Kirukans volunteers gather with the Trans Pongal event banner outside St Joseph’s Church in Trichy.',
      },
      {
        src: 'trans-pongal-traditional-preparation.webp',
        alt: 'Community members prepare Pongal in the traditional way outside the church.',
      },
      {
        src: 'trans-pongal-pot-group.webp',
        alt: 'Participants gather around a Pongal pot as it cooks over a fire.',
      },
      {
        src: 'trans-pongal-kolam-pot.webp',
        alt: 'A decorated Pongal pot and Kolam mark the traditional celebration.',
      },
      {
        src: 'trans-pongal-pot-detail.webp',
        alt: 'A participant tends the Pongal pot during the celebration.',
      },
      {
        src: 'trans-pongal-dance.webp',
        alt: 'Participants dance together during the Pongal celebration.',
      },
      {
        src: 'trans-pongal-traditional-game.webp',
        alt: 'A participant takes part in a Pongal game.',
      },
      {
        src: 'trans-pongal-games-intro.webp',
        alt: 'A volunteer speaks with participants during the event.',
      },
      {
        src: 'trans-pongal-community-gathering.webp',
        alt: 'Community members gather inside St Joseph’s Church during Trans Pongal.',
      },
      {
        src: 'trans-pongal-grocery-gift-1.webp',
        alt: 'A grocery packet is presented to a community member.',
      },
      {
        src: 'trans-pongal-grocery-gift-2.webp',
        alt: 'Participants gather with a grocery packet during the distribution.',
      },
      {
        src: 'trans-pongal-grocery-gift-3.webp',
        alt: 'A volunteer presents groceries to a community member.',
      },
      {
        src: 'trans-pongal-grocery-gift-4.webp',
        alt: 'A grocery packet is shared at the gathering.',
      },
      {
        src: 'trans-pongal-grocery-gift-5.webp',
        alt: 'A community member receives a grocery packet from a volunteer.',
      },
      {
        src: 'trans-pongal-grocery-gift-6.webp',
        alt: 'Community members and volunteers share a moment during grocery distribution.',
      },
      {
        src: 'trans-pongal-community-portrait.webp',
        alt: 'A participant enjoys the Trans Pongal gathering.',
      },
      {
        src: 'trans-pongal-community-moment-1.webp',
        alt: 'Participants and volunteers share a joyful moment at the event.',
      },
      {
        src: 'trans-pongal-community-moment-2.webp',
        alt: 'Community members take part in the celebration.',
      },
      {
        src: 'trans-pongal-community-moment-3.webp',
        alt: 'Participants share a moment during Trans Pongal.',
      },
      {
        src: 'trans-pongal-group-evening.webp',
        alt: 'Participants and volunteers gather outside St Joseph’s Church after the celebration.',
      },
    ],
    tone: 'bg-teal text-plum',
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
