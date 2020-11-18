/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Box, Stack, Grid, StackProps } from "@phobon/base";

import { SlideLink } from "../SlideLink";
import { Paragraph, Span } from "../Markdown";

import { socialLinks } from "@/data/links";

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
      gridTemplateColumns={["1fr", `repeat(${socialLinks.length}, 1fr)`]}
      gridTemplateRows={[`repeat(${socialLinks.length}, auto)`, "auto"]}
      gridGap={[2, 5]}
      css={{
        placeItems: "start",
      }}
    >
      {socialLinks.map(({ id, label, href }) => (
        <Box as="li" key={id} mr={5} mb={3}>
          <SlideLink href={href} fontSize={[3, 5]}>
            {label}
          </SlideLink>
        </Box>
      ))}
    </Grid>
  </Stack>
);
