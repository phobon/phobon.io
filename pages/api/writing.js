const writing = [
  {
    "key": "building-a-better-buying-experience-at-agworld",
    "title": "Building a Better Buying Experience at Agworld",
    "href": "writing/building-a-better-buying-experience-at-agworld",
    "published": "16 December 2019",
    "category": "Agworld",
    "description": "One of the major projects I worked on at Agworld for a large part of 2019 was to improve the experience of buying subscriptions for their customers",
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
    "description": "One of my first projects at Agworld was to improve their existing web product based off the success of the company's highly rated and widely-adopted mobile apps",
    "tags": [
      "Design",
      "Front-end Development"
    ]
  }
];

export default function handle(req, res) {
  res.json(writing);
};