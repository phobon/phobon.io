const projects = [
  {
    name: 'Signal',
    status: 'Live',
    description: 'A design system built with styled-components & styled-system.',
    image: null,
    url: 'http://signal.agworld.com',
    tags: [
      'Product Design', 'Front-End Development', 'Accessibility', 'Identity'
    ]
  },
  {
    name: 'The Studio',
    status: 'Live',
    description: 'A physiotherapy and clinical pilates studio based in Perth.',
    image: null,
    url: 'https://thestudiophysio.com',
    tags: [
      'Founder', 'Identity', 'Photography'
    ]
  },
  {
    name: 'Canvas',
    status: 'In Development',
    description: 'A clinical note-taking app to help people get their lives back.',
    image: null,
    url: 'https://dribbble.com/shots/4520199-Canvas-Dashboard-WIP',
    tags: [
      'Founder', 'Identity', 'Front-End Development', 'Product Design'
    ]
  }
];

export default function handle(req, res) {
  res.json(projects);
};