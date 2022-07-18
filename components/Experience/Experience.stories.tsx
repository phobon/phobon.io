import React from "react";
import { Stack } from "@/components/primitives";

import { Experience } from "./Experience";

export default {
  component: Experience,
  title: "Components/Experience",
};

const experiences: any = [
  {
    key: 1,
    employ: "Agworld",
    href: "https://agworld.com",
    title: "Senior UX Engineer",
    timeframe: "2018 - current",
    description:
      "Driving & scaling design through making Design Systems; designing thoughtful, accessible digital experiences; & mentoring others in design & front-end development",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
      "Achievement 4",
    ],
  },
  {
    key: 2,
    employ: "Acquire",
    href: "https://acquire.com.au",
    title: "Full Stack Engineer & Designer",
    timeframe: "2005 - 2017",
    description:
      "Driving & scaling design through making Design Systems; designing thoughtful, accessible digital experiences; & mentoring others in design & front-end development",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
      "Achievement 4",
    ],
  },
];

export const withVaryingTextLengths = () => (
  <Stack gap={6} css={{ width: "100%" }}>
    {experiences.map(({ key, ...s }) => (
      <Experience key={key} {...s} />
    ))}
  </Stack>
);
