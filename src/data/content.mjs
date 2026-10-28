export const profile = {
  name: 'Nurman Aqil Wicaksono',
  github: 'https://github.com/nurmanaqil',
  linkedin: 'https://www.linkedin.com/in/nurmanaqil/',
  role: 'Project Controlling Manager',
  organization: 'AIESEC in UNS',
  period: '2026 — 2027',
  portrait: '/assets/aqil-portrait.webp',
};

export const navigation = [
  ['intro', 'Home'], ['work', 'Work'], ['approach', 'PCM'],
  ['about', 'About'], ['contact', 'Contact'],
];

export const sessions = [
  {
    id: 'session-02',
    caption: 'JAYT 2026',
    image: '/assets/session-02.webp',
    source: 'Screenshot 2026-07-11 001209.png',
    alt: 'A shared screen of participants in an online session.',
    width: 1440, height: 810,
  },
  {
    id: 'session-03',
    caption: 'Forum Muda Surakarta 2026',
    image: '/assets/session-03.webp',
    source: 'Screenshot 2026-07-31 200029.png',
    alt: 'An online gathering with fellow participants.',
    width: 1440, height: 810,
  },
  {
    id: 'session-04',
    caption: 'Growth Conference 7.0',
    image: '/assets/session-04.webp',
    source: 'Screenshot 2026-08-05 001406.png',
    alt: 'Participants coming together in an online group session.',
    width: 1440, height: 810,
  },
  {
    id: 'session-05',
    caption: 'IGV Summer 2026',
    image: '/assets/session-05.webp',
    source: 'Screenshot 2026-08-06 145906.png',
    alt: 'A moment from an online team gathering.',
    width: 1440, height: 810,
  },
  {
    id: 'session-07',
    caption: 'AFL Summer',
    image: '/assets/session-07.webp',
    source: 'Screenshot 2026-08-09 173706.png',
    alt: 'An online meeting from my collaboration archive.',
    width: 1440, height: 810,
  },
  {
    id: 'session-10',
    caption: 'OC Finlog Social Project 2026',
    image: '/assets/session-10.webp',
    source: 'Screenshot 2026-10-19 211255.png',
    alt: 'A small online gathering from my collaboration archive.',
    width: 1440, height: 810,
  },
  {
    id: 'session-11',
    caption: 'Newee FGL 2026',
    image: '/assets/session-11.webp',
    source: 'FullSizeRender.jpeg',
    alt: 'Aqil with fellow participants at an in-person gathering.',
    width: 810, height: 1440,
  },
  {
    id: 'session-12',
    caption: 'Global Village 2026',
    image: '/assets/session-12.webp',
    source: 'IMG_0243.jpg',
    alt: 'Participants posing together at a Global Village event.',
    width: 810, height: 1440,
  },
  {
    id: 'session-13',
    caption: 'National Functional Conference 2026',
    image: '/assets/session-13.webp',
    source: 'IMG_1868.jpeg',
    alt: 'A group photograph at an in-person organizational gathering.',
    width: 1080, height: 1440,
  },
  {
    id: 'session-14',
    caption: 'Join AIESEC 2026',
    image: '/assets/session-14.webp',
    source: 'IMG_6413.jpg',
    alt: 'Participants together at an AIESEC in UNS welcoming event.',
    width: 1440, height: 810,
  },
  {
    id: 'session-15',
    caption: 'Forum Muda Surakarta 2026',
    image: '/assets/session-15.webp',
    source: 'IMG_9294.jpeg',
    alt: 'A group photograph at Forum Merdeka Surakarta 2026.',
    width: 1440, height: 810,
  },
];

export const sessionsById = Object.fromEntries(sessions.map(session => [session.id, session]));

export const archiveSessions = ['session-11', 'session-04', 'session-14', 'session-12', 'session-15', 'session-03', 'session-10', 'session-13', 'session-07', 'session-02', 'session-05']
  .map(id => sessionsById[id]);

export const chapters = [
  { id: 'people', number: '01', title: 'People before process.', text: 'Behind every plan are people. My interest in project management starts with understanding how teams communicate, share context, and work together.', imageId: 'session-14' },
  { id: 'alignment', number: '02', title: 'A shared direction.', text: 'As Project Controlling Manager at AIESEC in UNS, my focus connects operations and coordination. Clear responsibilities and shared context give a team a place to start.', imageId: 'session-04' },
  { id: 'perspective', number: '03', title: 'Room for perspective.', text: 'Working across people and technology keeps me curious. I’m developing toward AI product management, where understanding the problem matters as much as building the solution.', imageId: 'session-15' },
];
