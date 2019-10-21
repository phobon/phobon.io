const writing = [
  {
    "key": "aligning-agworlds-platform-experiences",
    "title": "Aligning Agworld's Platform Experiences",
    "href": "writing/aligning-agworlds-platform-experiences",
    "published": "17 August 2019",
    "tags": [
      "Design",
      "Front-end Development"
    ]
  },
  {
    "key": "building-a-better-buying-experience-at-agworld",
    "title": "Building a Better Buying Experience at Agworld",
    "href": "writing/building-a-better-buying-experience-at-agworld",
    "published": "17 August 2019",
    "tags": [
      "Design",
      "Research",
      "Front-end Development"
    ]
  }
];

export default function handle(req, res) {
  res.json(writing);
};