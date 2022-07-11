/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { Grid, Stack, Text } from "@phobon/base";

import { SlideLink } from "../SlideLink";

const Heading = ({ children, ...props }) => (
  <Text
    as="h3"
    color="grayscale.1"
    fontWeight="light"
    textAlign="left"
    fontSize={[4, 6]}
    lineHeight={1}
    {...props}
  >
    {children}
  </Text>
);

export const Experience: React.FunctionComponent<any> = ({
  employ,
  href,
  title,
  timeframe,
  description,
  achievements,
  colour,
  ...props
}) => (
  <Grid
    as="article"
    gridTemplateColumns={["1fr", "1fr 2fr"]}
    gridGap={[4, 0]}
    gridTemplateRows="auto"
    css={{
      alignItems: "flex-start",
    }}
    {...props}
  >
    <Stack
      justifyContent={["flex-start", "center"]}
      alignItems={["center", "flex-start"]}
      flexDirection={["row", "column"]}
      fullWidth
      space={[0, 2]}
    >
      <Heading mr={[2, 0]} color="foreground">
        <SlideLink href={href}>{employ}</SlideLink>
      </Heading>
      <Text fontSize={5} color="grayscale.3">
        {timeframe}
      </Text>
    </Stack>

    <Stack fullWidth alignItems="flex-start" space={4}>
      <Heading color="foreground">{title}</Heading>
      <Text as="p" fontSize={[4, 5]} color="grayscale.3" mt={2}>
        {description}
      </Text>

      {achievements && (
        <Grid
          as="ul"
          gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
          fullWidth
          gridAutoRows="auto"
          css={{
            alignItems: "flex-start",
          }}
          gridGap={4}
        >
          {achievements.map(({ key, title, description, href }) => (
            <Stack as="li" key={key} alignItems="flex-start">
              {href ? (
                <SlideLink href={href} fontSize={[4, 5]}>
                  {title}
                </SlideLink>
              ) : (
                <Text fontSize={[4, 5]} color="foreground">
                  {title}
                </Text>
              )}
              <Text fontSize={[4, 5]} color="grayscale.3">
                {description}
              </Text>
            </Stack>
          ))}
        </Grid>
      )}
    </Stack>
  </Grid>
);

Experience.defaultProps = {
  colour: "accent.5",
};
