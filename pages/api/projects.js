const projects = [
  {
    name: 'Signal',
    status: 'Live',
    description: 'A design system built with styled-components & styled-system',
    image: '/static/projects/signal',
    fallbackType: 'png',
    fallbackExtension: 'png',
    url: 'http://signal.agworld.com',
    tags: [
      'Product Design', 'Front-End Development', 'Accessibility', 'Identity'
    ]
  },
  {
    name: 'The Studio',
    status: 'Live',
    description: 'A physiotherapy and clinical pilates studio based in Perth',
    image: '/static/projects/thestudio',
    fallbackType: 'jpeg',
    fallbackExtension: 'jpg',
    url: 'https://thestudiophysio.com',
    tags: [
      'Founder', 'Identity', 'Photography'
    ]
  }
];

export default function handle(req, res) {
  res.json(projects);
};