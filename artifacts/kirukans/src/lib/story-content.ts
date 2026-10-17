export type StoryContent = {
  intro: string[];
  sections: { title: string; body: string[] }[];
  facts: { label: string; value: string }[];
  video?: {
    id: string;
    title: string;
    caption: string;
    kind: 'project' | 'related' | 'event';
    platform?: 'youtube' | 'instagram';
    thumbnail?: string;
  };
  photoCaptions: Record<string, string>;
};

// Project facts come from the supplied Kirukans deck and the trust's own
// YouTube descriptions. These are intentions and documented activities,
// not measured educational outcomes or invented testimonials.
export const storyContent: Record<string, StoryContent> = {
  'krishna-home-pongal': {
    intro: [
      'For Pongal 2025, Kirukans Charitable Trust celebrated the festival at Krishna Home in Thiruvalarai, Trichy, alongside elders and youngsters.',
      'The day brought everyone together through cultural traditions, singing, games and dance. The elders’ smiles made it especially memorable for the team.',
    ],
    sections: [
      {
        title: 'Culture, colour and connection',
        body: [
          'The celebration began with traditional Kolam preparation, setting up the Pongal pot and decorating the space. Singing and ice-breaking activities helped everyone feel comfortable and joyful.',
          'Elders and youngsters joined in the celebration, sharing a day shaped by tradition, fun and time together.',
        ],
      },
      {
        title: 'Games, music and shared memories',
        body: [
          'Activities included a Tamil-letter lucky game (Uyir Ezhuthu), a soda bottle filling challenge, a lemon-and-spoon game and a ball-passing game. The day also included dance performances and the traditional Uriyadi game.',
          'Everyone took part and enjoyed the activities. Seeing the elders’ happiness made the Pongal celebration a particularly special day for the Kirukans team.',
        ],
      },
      {
        title: 'A contribution to Krishna Home',
        body: [
          'Along with celebrating, Kirukans Charitable Trust donated 10 fans and lights for the home.',
          'The trust thanks everyone who supported the celebration directly and indirectly. Together, the day became a beautiful memory filled with culture, fun and humanity.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'Krishna Home · Thiruvalarai, Trichy' },
      { label: 'When', value: 'Pongal 2025' },
      { label: 'Together', value: 'Elders and youngsters' },
      { label: 'Donated', value: '10 fans and lights for the home' },
      { label: 'Organized by', value: 'Kirukans Charitable Trust' },
    ],
    video: {
      id: 'wswz2AB6FFc',
      title: 'Pongal Celebration at Krishna Home | Kirukans Charitable Trust | Pongal 2025',
      caption: 'The event video published on the official Kirukans YouTube channel.',
      kind: 'event',
    },
    photoCaptions: {
      'pongal-krishna-home-group-hero.webp': 'Children, residents and volunteers gathered at Krishna Home for Pongal.',
      'pongal-krishna-home-mic.webp': 'A volunteer speaks with children during the event.',
      'pongal-krishna-home-pot.webp': 'The Pongal pot cooking over a fire.',
      'pongal-krishna-home-residents.webp': 'Residents spending time together outdoors.',
      'pongal-krishna-home-group-wide.webp': 'Children, residents and volunteers gather beneath the trees.',
      'pongal-krishna-home-activity-1.webp': 'A child joins a playful activity.',
      'pongal-krishna-home-activity-2.webp': 'Children take part in an outdoor group activity.',
      'pongal-krishna-home-gift.webp': 'A gift is shared during the gathering.',
      'pongal-krishna-home-gathering.webp': 'Residents, children and volunteers share time together.',
      'pongal-krishna-home-volunteer-group.webp': 'Kirukans volunteers and Krishna Home residents pose together.',
    },
  },
  'trans-pongal': {
    intro: [
      'On 13 January 2024, Kirukans Charitable Trust brought together more than 30 transgender people at St Joseph’s Church in Trichy for Trans Pongal.',
      'The community prepared Pongal in the traditional way, joined in festival games and shared a joyful day together. Kirukans also provided one month of groceries to the participants.',
    ],
    sections: [
      {
        title: 'A Pongal celebration with everyone',
        body: [
          'The gathering began with traditional Pongal preparation at St Joseph’s Church. Cooking and celebrating together made space for the community to share in the festival and its traditions.',
          'In many village settings, transgender people are often left out of games and group activities. Trans Pongal was created as an inclusive celebration where everyone could take part.',
        ],
      },
      {
        title: 'Games, laughter and time together',
        body: [
          'After preparing Pongal, participants and volunteers enjoyed Pongal games and activities together. The day brought people together through play, conversation and celebration.',
          'The Kirukans team remembers the gathering as a joyful day shared with the community.',
        ],
      },
      {
        title: 'Practical support for the month ahead',
        body: [
          'As part of the celebration, Kirukans Charitable Trust gave the participants one month of groceries.',
          'Trans Pongal brought tradition, inclusion and practical support together in one memorable day.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'St Joseph’s Church, Trichy' },
      { label: 'When', value: '13 January 2024' },
      { label: 'Together', value: '30+ transgender people' },
      { label: 'Activities', value: 'Traditional Pongal and festival games' },
      { label: 'Shared support', value: 'One month of groceries' },
      { label: 'Organized by', value: 'Kirukans Charitable Trust' },
    ],
    video: {
      id: 'C2QPNgmBSm6',
      title: 'Trans Pongal at St Joseph’s Church, Trichy',
      caption: 'Instagram Reel from the Trans Pongal celebration.',
      kind: 'event',
      platform: 'instagram',
      thumbnail: 'trans-pongal-group-hero.webp',
    },
    photoCaptions: {
      'trans-pongal-group-hero.webp': 'More than 30 community members and volunteers gather for Trans Pongal on 13 January 2024.',
      'trans-pongal-traditional-preparation.webp': 'Community members prepare Pongal in the traditional way at St Joseph’s Church.',
      'trans-pongal-pot-group.webp': 'Participants gather around the Pongal pot as it cooks.',
      'trans-pongal-kolam-pot.webp': 'A Kolam and decorated Pongal pot mark the traditional celebration.',
      'trans-pongal-pot-detail.webp': 'A participant tends the Pongal pot during the gathering.',
      'trans-pongal-dance.webp': 'Participants dance together during the Pongal celebration.',
      'trans-pongal-traditional-game.webp': 'A participant takes part in a Pongal game.',
      'trans-pongal-games-intro.webp': 'A volunteer speaks with participants during the celebration.',
      'trans-pongal-community-gathering.webp': 'Community members gather inside St Joseph’s Church.',
      'trans-pongal-grocery-gift-1.webp': 'A grocery packet is presented to a community member.',
      'trans-pongal-grocery-gift-2.webp': 'Participants gather with a grocery packet during the distribution.',
      'trans-pongal-grocery-gift-3.webp': 'A volunteer presents groceries to a community member.',
      'trans-pongal-grocery-gift-4.webp': 'A grocery packet is shared at the gathering.',
      'trans-pongal-grocery-gift-5.webp': 'A community member receives a grocery packet from a volunteer.',
      'trans-pongal-grocery-gift-6.webp': 'Community members and volunteers share a moment during grocery distribution.',
      'trans-pongal-community-portrait.webp': 'A participant enjoys the Trans Pongal gathering.',
      'trans-pongal-community-moment-1.webp': 'Participants and volunteers share a joyful moment at the event.',
      'trans-pongal-community-moment-2.webp': 'Community members take part in the celebration.',
      'trans-pongal-community-moment-3.webp': 'Participants share a moment during Trans Pongal.',
      'trans-pongal-group-evening.webp': 'Participants and volunteers gather outside St Joseph’s Church after the celebration.',
    },
  },
  nangavaram: {
    intro: [
      'A computer lab is a place to discover new possibilities. At P.U.M Government School in Nangavaram, Kirukans brought that sense of discovery onto the walls surrounding the High Tech Lab.',
      'Across two nights and three days, volunteers worked alongside local villagers to paint murals on all four sides of the building. The intention was simple: give students a more inspiring space in which to learn.',
    ],
    sections: [
      {
        title: 'A learning space with something to say',
        body: [
          'The finished artwork draws on science, technology and imagination. Rockets, an astronaut, wind turbines and a young reader turn the exterior of the lab into a colourful invitation to be curious.',
          'Rather than treating the building as a blank backdrop, the project connected the art to the purpose of the space: a computer lab where students encounter ideas, tools and possibilities.',
        ],
      },
      {
        title: 'Made together, not just painted for them',
        body: [
          'This was a shared effort. Kirukans volunteers and local villagers worked shoulder to shoulder through the two-night, three-day transformation.',
          'The group photograph is part of the story too. It brings the people behind the painted walls into view, alongside the mural itself. Kirukans thanks every volunteer and supporter who took part in making the project possible.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'Nangavaram · Kulithalai, Karur district' },
      { label: 'When', value: 'March 2026' },
      { label: 'The work', value: 'Murals on all four sides of the lab' },
      { label: 'The effort', value: 'Two nights · three days' },
    ],
    video: {
      id: 'NxySEYkMHRA',
      title: 'We Transformed a Government School Computer Lab',
      caption: 'The Nangavaram mural project, documented on the official Kirukans YouTube channel.',
      kind: 'project',
    },
    photoCaptions: {
      'nangavaram-community.webp': 'Kirukans volunteers and the local community beside the transformed lab.',
      'nangavaram-mural.webp': 'Science, imagination and learning brought onto the walls of the computer lab.',
    },
  },
  nakkasalem: {
    intro: [
      'At Nakkasalem Government Higher Secondary School, Kirukans brought a message about dreaming and learning into the students’ everyday surroundings.',
      'A large mural of Dr A.P.J. Abdul Kalam anchors the project, while playful educational doodles extend the colour and imagination across the children’s block.',
    ],
    sections: [
      {
        title: 'Dreams, drawn at school',
        body: [
          'Dr Kalam’s message of dreaming big shaped the intention behind the mural. The artwork was created to offer a visible reminder of possibility in a place students return to every day.',
          'Alongside the portrait, educational doodles make room for a lighter, more playful expression of learning. Together, the paintings connect inspiration with the school environment.',
        ],
      },
      {
        title: 'The work behind the wall',
        body: [
          'Kirukans’ project video documents four days and three nights of work, showing the making of the mural rather than only the finished result.',
          'The photographs capture different parts of the project: the portrait, the painted building, the corridor, the doodles and the artists at work. Each view tells another part of how the space came together.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'Nakkasalem Government Higher Secondary School' },
      { label: 'When', value: 'October 2025' },
      { label: 'The work', value: 'Dr A.P.J. Abdul Kalam mural and educational doodles' },
      { label: 'The effort', value: 'Four days · three nights' },
    ],
    video: {
      id: 'NWP75AneA4Q',
      title: 'Turning Dreams into Art | Abdul Kalam Mural at Nakkasalem School',
      caption: 'Watch the working process behind the Nakkasalem mural, filmed across four days and three nights.',
      kind: 'project',
    },
    photoCaptions: {
      'page-7-image-3.webp': 'The Dr A.P.J. Abdul Kalam mural at Nakkasalem.',
      'page-7-image-2.webp': 'Colour across the school building.',
      'page-7-image-4.webp': 'The painted school corridor.',
      'page-7-image-5.webp': 'Playful educational artwork in the children’s block.',
      'page-7-image-6.webp': 'Kirukans artists at work on the school project.',
    },
  },
  'blind-school': {
    intro: [
      'At the Blind School in Trichy, the project brought together mural painting, the students’ own creativity and the joy of a Diwali celebration.',
      'Kirukans worked with the children to create a handprint wall, alongside a Braille-inspired mural. Music, drama, dance and sweets were part of the time spent together.',
    ],
    sections: [
      {
        title: 'A wall the children helped make',
        body: [
          'The children’s handprints became part of the artwork itself. Their participation made the painted wall a shared creation rather than something simply delivered to the school.',
          'Bright colours and strong visual elements shaped the intention of the project for students, including those with partial vision. The aim was a lively, welcoming environment where the students could share in the art-making.',
        ],
      },
      {
        title: 'More than a painting day',
        body: [
          'The visit also made space for celebration. Students shared songs, dances and performances, while the team brought sweets and joined in the Diwali festivities.',
          'The photographs and film keep both parts of the visit together: the making of the murals and the time shared with the students. Kirukans thanks everyone who supported the effort.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'Blind School, Trichy' },
      { label: 'When', value: 'November 2024' },
      { label: 'The work', value: 'Braille-inspired mural and children’s handprint wall' },
      { label: 'Together', value: 'Art-making and a Diwali celebration' },
    ],
    video: {
      id: 'Dx39tY4eIZI',
      title: 'Diwali Joy at Trichy’s Blind School',
      caption: 'The handprint murals, performances and Diwali celebration, shared by Kirukans on its official channel.',
      kind: 'project',
    },
    photoCaptions: {
      'page-6-image-3.webp': 'Volunteers and students together at the Blind School.',
      'page-6-image-5.webp': 'The children making their handprints on the wall.',
      'page-6-image-6.webp': 'A wider view of the completed painted wall.',
    },
  },
  anganvadi: {
    intro: [
      'For very young children, a school environment is part of the experience of learning. At the Anganvadi School in Thalakudi, Kirukans brought colour, stories and imagination into that everyday space.',
      'The educational mural was built around a simple invitation: “Read, Read, Read.” The intention was to make the surroundings feel joyful and welcoming as children discover reading and learning.',
    ],
    sections: [
      {
        title: 'An invitation to discover',
        body: [
          'The project used a colourful mural to bring a reading theme into the space where children spend their days. The artwork puts that invitation within their everyday surroundings.',
          'Rather than a separate event that ends when the volunteers leave, the painted wall remains part of the school environment. Its purpose is to encourage curiosity and imagination.',
        ],
      },
      {
        title: 'Creativity in an everyday place',
        body: [
          'This is one of Kirukans’ ways of turning art into action: working with the places people already use, and using creativity to make them more welcoming.',
          'The project photograph records the volunteers at the school. You can also explore the trust’s official YouTube channel for more of its mural work, creative workshops and community activities.',
        ],
      },
    ],
    facts: [
      { label: 'Where', value: 'Thalakudi, Trichy' },
      { label: 'When', value: 'April 2024' },
      { label: 'The work', value: 'A colourful educational mural' },
      { label: 'The theme', value: 'Read, Read, Read' },
    ],
    video: {
      id: 'bhIgRA4YO2M',
      title: 'Kirukans creative workshop at a children’s home in Chennai',
      caption: 'A related film from the Kirukans channel: this documents a creative workshop in Chennai, not the Anganvadi School project in Thalakudi.',
      kind: 'related',
    },
    photoCaptions: {
      'page-5-image-1.webp': 'Kirukans volunteers at the Anganvadi School mural project in Thalakudi.',
    },
  },
};
