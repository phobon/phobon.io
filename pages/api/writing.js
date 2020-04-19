const writing = [
  // {
  //   "key": "signal-design-system",
  //   "title": "Signal Design System",
  //   "href": "writing/signal-design-system",
  //   "published": "23 December 2019",
  //   "category": "Agworld",
  //   "description": "A modern, scalable design system built with React, Styled-components and Styled-system",
  //   "tags": [
  //     "Design",
  //     "Research",
  //     "Front-end Development",
  //     "Design System"
  //   ]
  // },
  {
    "key": "building-a-better-buying-experience-at-agworld",
    "title": "Building a Better Buying Experience at Agworld",
    "href": "writing/building-a-better-buying-experience-at-agworld",
    "src": "static/writing/building-a-better-buying-experience-at-agworld/index",
    "published": "23 December 2019",
    "category": "Agworld",
    "description": "Improving the experience of buying subscriptions for Agworld's customers",
    "tags": [
      "Design",
      "Research",
      "Front-end Development"
    ]
  },
  {
    "key": "aligning-agworlds-platform-experiences",
    "title": "Aligning Agworld's Platform Experiences",
    "href": "writing/aligning-agworlds-platform-experiences",
    "src": "static/writing/aligning-agworlds-platform-experiences/index",
    "published": "17 August 2019",
    "category": "Agworld",
    "description": "Helping to align Agworld's web product and its highly rated and widely adopted mobile apps",
    "tags": [
      "Design",
      "Front-end Development"
    ]
  }
];

export default function handle(req, res) {
  res.json(writing);
};