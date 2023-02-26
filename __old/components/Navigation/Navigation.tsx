/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Stack, Box, Grid } from "@phobon/base"
import { motion } from "framer-motion"
import { Button } from "@phobon/grimoire"

import { maxWidth } from "@/data/constants"
import { navigationLinks } from "@/data/links"

import { NavigationLink } from "./NavigationLink"
import { CloseGlyph } from "@/components/Glyphs"

const MotionGrid = motion(Grid, { forwardMotionProps: true })

const ease = [0.33, 1, 0.68, 1]

export interface NavigationProps {
  closeNavigation: () => void
}

export const Navigation: React.FunctionComponent<NavigationProps & any> = ({
  px,
  color,
  closeNavigation,
  ...props
}) => {
  return (
    <MotionGrid
      as="aside"
      gridTemplateRows="auto 1fr"
      gridTemplateColumns="1fr"
      css={{
        placeItems: "center",
      }}
      {...props}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            ease,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            staggerChildren: 0.03,
            delay: 0.3,
            ease,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            staggerChildren: 0.03,
            delay: 0.3,
            ease,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {closeNavigation && (
        <Box
          py={[4, 5]}
          px={px}
          justifySelf="center"
          justifyContent="flex-start"
          fullWidth
          maxWidth={maxWidth}
        >
          <Button
            aria-label="Close menu"
            variant="tertiary"
            shape="square"
            onClick={closeNavigation}
            toggled
          >
            <CloseGlyph fill="white" />
          </Button>
        </Box>
      )}

      <Stack
        as="nav"
        maxWidth={maxWidth}
        space={3}
        alignItems="center"
        fullWidth
      >
        {navigationLinks.map(({ id, ...rest }) => (
          <NavigationLink
            key={id}
            id={id}
            {...rest}
            color={color}
            onClick={closeNavigation}
          />
        ))}
      </Stack>
    </MotionGrid>
  )
}
