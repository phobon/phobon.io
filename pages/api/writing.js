const writing = [
  {
    "key": "building-a-better-buying-experience-at-agworld",
    "title": "Building a Better Buying Experience at Agworld",
    "href": "writing/building-a-better-buying-experience-at-agworld",
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