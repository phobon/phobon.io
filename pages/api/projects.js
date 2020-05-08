const projects = [
  {
    name: 'Signal',
    status: 'Live',
    description: "Agworld's design system built with React and CSS-in-JS",
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
    fallbackType: 'png',
    fallbackExtension: 'png',
    url: 'https://thestudiophysio.com',
    tags: [
      'Founder', 'Identity', 'Photography'
    ]
  }
];

export default function handle(req, res) {
  res.json(projects);
};