/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Box, Stack, Grid, StackProps } from "@phobon/base";

import { SlideLink } from "../SlideLink";
import { Paragraph, Span } from "../Markdown";

const links = [
  { label: "Dribbble", url: "https://dribbble.com/phobon" },
  { label: "Github", url: "https://github.com/phobon" },
  { label: "Instagram", url: "http://instagram.com/thenoumenon" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ben-mccormick-a373304/",
  },
  { label: "Twitter", url: "https://twitter.com/thenoumenon" },
];

export const Footer: React.FunctionComponent<
  StackProps & React.HTMLAttributes<HTMLDivElement>
> = ({ ...props }) => (
  <Stack
    as="footer"
    id="contact"
    fullWidth
    alignItems="flex-start"
    justifyContent="flex-start"
    pt={[0, 6]}
    pb={3}
    space={5}
    {...props}
  >
    <Paragraph
      color="grayscale.3"
      mb={0}
      css={(theme) => ({
        "> * + *": {
          marginLeft: theme.space[1],
        },
      })}
    >
      <span>You'll often find me enjoying time with my</span>
      <span>
        <SlideLink href="https://www.instagram.com/thestudiophysio/">
          amazing partner
        </SlideLink>
        ,
      </span>
      <span>and my</span>
      <span>
        <SlideLink href="https://www.instagram.com/kodi_lab/">
          best friend
        </SlideLink>
        ;
      </span>
      <span>or</span>
      <Span color="inherit" css={{ textDecoration: "line-through" }}>
        shitposting
      </Span>
      <span>online</span>
    </Paragraph>

    <Grid
      as="ul"
      gridTemplateColumns={["1fr", `repeat(${links.length}, 1fr)`]}
      gridTemplateRows={[`repeat(${links.length}, auto)`, "auto"]}
      gridGap={[2, 5]}
      css={(theme) => ({
        placeItems: "start",
      })}
    >
      {links.map((l) => (
        <Box as="li" key={l.label} mr={5} mb={3}>
          <SlideLink href={l.url} fontSize={[3, 5]}>
            {l.label}
          </SlideLink>
        </Box>
      ))}
    </Grid>
  </Stack>
);
