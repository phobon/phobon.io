const studies = [
  {
    "title": "Aligning Agworld's Platform Experiences",
    "href": "studies/aligning-agworlds-platform-experiences",
    "published": "17 August 2019",
    "tags": [
      "Design",
      "Front-end Development"
    ]
  }
];

export default function handle(req, res) {
  res.json(studies);
};