const studies = [
  {
    "title": "Aligning Agworld's Platform Experiences",
    "href": "studies/aligning-agworlds-platform-experiences",
    "published": "17 August 2019",
    "tags": [
      "Design",
      "Front-end Development"
    ]
  },
  {
    "title": "Building a Better Buying Experience at Agworld",
    "href": "studies/building-a-better-buying-experience-at-agworld",
    "published": "17 August 2019",
    "tags": [
      "Design",
      "Research",
      "Front-end Development"
    ]
  }
];

export default function handle(req, res) {
  res.json(studies);
};