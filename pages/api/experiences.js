const experiences = [{
    key: 1,
    employ: 'Agworld',
    href: 'https://agworld.com',
    title: 'Senior UX Engineer',
    timeframe: '2018 - current',
    description: "I was hired to help drive design at Agworld in 2018. I'm now responsible for creating and maintaining design systems, designing thoughtful, accessible digital experiences; & mentoring others in design & front-end development",
    achievements: [
      {
        key: 'created-signal',
        title: 'Signal',
        description: 'Design system',
        href: 'http://signal.agworld.com',
      },
      {
        key: 'research-design-process',
        title: 'User research & design',
        description: 'Implementing processes',
      },
      {
        key: 'agworld-product-design',
        title: 'Product design',
        description: 'Multiple projects',
        href: '/',
      },
    ],
  },
  {
    key: 2,
    employ: 'acQuire',
    href: 'https://acquire.com.au',
    title: 'Full Stack Engineer & Designer',
    timeframe: '2005 - 2017',
    description: "I worked closely with a talented team over 11 years to build and ship acQuire's core products. Focused on building and maintaining front-end architecture & systems; as well as designing the user experience and visual design of their products",
    achievements: [
      {
        key: 'created-blip',
        title: 'Blip',
        description: 'Functional CSS library',
        href: 'https://github.com/phobon/blip',
      },
      {
        key: 'created-opal',
        title: 'Opal',
        description: 'Chrome extension',
        href: 'https://dribbble.com/shots/3946014-Opal',
      },
      {
        key: 'created-shell',
        title: 'Shell',
        description: 'Modular frontend framework',
      },
      {
        key: 'acquire-product-design',
        title: 'Product design',
        description: 'Design and development',
        href: 'https://dribbble.com/shots/3970129-Security-dashboard',
      },
    ],
    colour: 'purples.5',
  },
];

export default function handle(req, res) {
  res.json(experiences);
};