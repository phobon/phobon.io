import React from "react";
import { Grid, Stack, Text, text, grid } from "@/components/primitives";

import { SlideLink } from "../SlideLink";
import { css, cn } from "@/design";

const headingStyles = css({
  color: "$gray1",
  fontWeight: "light",
  textAlign: "left",
  lineHeight: "$snug",
  fontSize: "$6",
  "@bp1": {
    fontSize: "$4",
  },
});

const Heading = ({ children, ...props }) => (
  <h3 className={cn(text(), headingStyles())} {...props}>
    {children}
  </h3>
);

export const Experience: React.FunctionComponent<any> = ({
  employ,
  href,
  title,
  timeframe,
  description,
  achievements,
  color: '$accent5',
  ...props
}) => (
  <Grid
    as="article"
    css={{
      alignItems: "flex-start",
      gridTemplateColumns: "1fr 2fr",
      gridGap: 0,
      gridTemplateRows: "auto",
      "@bp1": {
        gridTemplateColumns: "1fr",
        gridGap: "$4",
      },
    }}
    {...props}
  >
    <Stack
      css={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "$2",
        "@bp1": {
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          gap: 0,
        },
      }}
    >
      <Heading mr={[2, 0]} color="foreground">
        <SlideLink href={href}>{employ}</SlideLink>
      </Heading>
      <Text
        color="$gray3"
        css={{
          fontSize: "$5",
        }}
      >
        {timeframe}
      </Text>
    </Stack>

    <Stack
      css={{
        width: "100%",
        alignItems: "flex-start",
        gap: "$4",
      }}
    >
      <Heading color="foreground">{title}</Heading>
      <p className={(cn(text()), paragraphStyles())}>{description}</p>

      {achievements && (
        <ul className={cn(grid(), gridStyles())}>
          {achievements.map(({ key, title, description, href }) => (
            <Stack as="li" key={key} alignItems="flex-start">
              {href ? (
                <SlideLink href={href} fontSize={[4, 5]}>
                  {title}
                </SlideLink>
              ) : (
                <Text css={{
                  fontSize: '$5',
                  '@bp1': {
                    fontSize: '$4',
                  }
                }}>
                  {title}
                </Text>
              )}
              <Text css={{
                  fontSize: '$5',
                  color: '$gray3',
                  '@bp1': {
                    fontSize: '$4',
                  }
                }}>
                {description}
              </Text>
            </Stack>
          ))}
        </ul>
      )}
    </Stack>
  </Grid>
);

const paragraphStyles = css({
  fontSize: "$5",
  color: "$gray3",
  marginTop: "$2",
  "@bp1": {
    fontSize: "$4",
  },
});

const gridStyles = css({
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",
  gridAutoRows: "auto",
  alignItems: "flex-start",
  gridGap: "$4",
  "@bp1": {
    gridTemplateColumns: "1fr",
  },
});
