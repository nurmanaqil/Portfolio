export const profile = {
  name: 'Nurman Aqil Wicaksono',
  shortName: 'Aqil',
  location: 'Surakarta, Indonesia',
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

// The source filename identifies an image; it is not a verified event date.
// These are collaboration imagery, never evidence of a software project's UI.
export const sessions = [
  ['Screenshot 2026-07-07 231412.png', 'An online group session from my collaboration archive.'],
  ['Screenshot 2026-07-11 001209.png', 'A shared screen of participants in an online session.'],
  ['Screenshot 2026-07-31 200029.png', 'An online gathering with fellow participants.'],
  ['Screenshot 2026-08-05 001406.png', 'Participants coming together in an online group session.'],
  ['Screenshot 2026-08-06 145906.png', 'A moment from an online team gathering.'],
  ['Screenshot 2026-08-07 174903.png', 'Participants connecting in an online session.'],
  ['Screenshot 2026-08-09 173706.png', 'An online meeting from my collaboration archive.'],
  ['Screenshot 2026-08-27 202645.png', 'A group session with shared virtual backgrounds.'],
  ['Screenshot 2026-09-20 163803.png', 'Another moment of connection in an online group session.'],
  ['Screenshot 2026-10-19 211255.png', 'A small online gathering from my collaboration archive.'],
].map(([source, alt], index) => ({
  id: `session-${String(index + 1).padStart(2, '0')}`,
  source, alt, image: `/assets/session-${String(index + 1).padStart(2, '0')}.webp`,
  caption: `Project ${index + 1}`,
  publicationApproved: false, projectId: null,
}));

export const projects = [
  {
    id: 'face-recognition', number: '01', title: 'Face recognition', category: 'Applied AI',
    stack: 'Python / Streamlit / OpenCV / NumPy',
    description: 'Exploring how a face becomes a set of features. An Eigenfaces-based recognition model with an interactive interface.',
    detail: 'An academic software project exploring face recognition through Eigenfaces. The interface makes it possible to interact with the model, connecting an image-processing concept with a usable application.',
    note: 'Explore the repository for the implementation and project documentation.',
    url: 'https://github.com/nurmanaqil/Face-Recognition',
  },
  {
    id: 'image-compression', number: '02', title: 'Less data. Same story.', category: 'Image processing',
    stack: 'Python / Flask / scikit-learn / NumPy',
    description: 'A PCA-based image reconstruction tool. Looking at the trade-off between retaining information and reducing complexity.',
    detail: 'A software exploration of principal component analysis for image compression and reconstruction, with visual comparisons to make the effect of dimensionality reduction easier to understand.',
    note: 'Explore the repository for the implementation and project documentation.',
    url: 'https://github.com/nurmanaqil/Image-Compression',
  },
  {
    id: 'oop-project', number: '03', title: 'Built on the fundamentals.', category: 'Software development',
    stack: 'Java / Object-oriented programming',
    description: 'A team programming project grounded in object-oriented principles, structure, and the fundamentals of Java.',
    detail: 'An academic team project applying object-oriented programming in Java. This is part of my technical foundation alongside my interests in project coordination and product development.',
    note: 'A team project; no sole authorship or project leadership is implied.',
    url: 'https://github.com/nurmanaqil/PBO---Team-Project-aqil-',
  },
];

export const chapters = [
  { id: 'people', number: '01', title: 'People before process.', text: 'Behind every plan are people. My interest in project management starts with understanding how teams communicate, share context, and work together.', imageIndex: 0 },
  { id: 'alignment', number: '02', title: 'A shared direction.', text: 'As Project Controlling Manager at AIESEC in UNS, my focus connects operations and coordination. Clear responsibilities and shared context give a team a place to start.', imageIndex: 5 },
  { id: 'perspective', number: '03', title: 'Room for perspective.', text: 'Working across people and technology keeps me curious. I’m developing toward AI product management, where understanding the problem matters as much as building the solution.', imageIndex: 9 },
];
