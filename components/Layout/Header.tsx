import React, { useCallback } from "react";
import { Box, Stack } from "@phobon/base";
import { useTheme } from "@phobon/hooks";
import { Spacer, Button } from "@phobon/grimoire";
import Link from "next/link";
import { navigationLinks } from "@/data/links";

import { getTheme } from "@/hooks/getTheme";

import { Identity } from "../Identity";
import { HamburgerGlyph, SunGlyph, MoonGlyph } from "../Glyphs";
import { NavigationLink } from "../Navigation";

export const Header = ({ px, openNavigation, ...props }) => {
  const [theme, setTheme] = useTheme("light", getTheme);
  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  );

  return (
    <Stack
      fullWidth
      css={(theme) => ({
        top: 0,
        position: "sticky",
        zIndex: 2,
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: theme.colors.background,
          opacity: 0.7,
          zIndex: -1,
        },
      })}
      {...props}
    >
      <Box
        as="header"
        fullWidth
        py={[4, 5]}
        px={px}
        justifyContent="space-between"
        display={["none", "flex"]}
      >
        <Stack
          as="nav"
          space={3}
          alignItems="center"
          fullWidth
          flexDirection="row"
        >
          <Box mr={5}>
            <Link href="/" passHref>
              <Identity as="a" aria-label="Go home" />
            </Link>
          </Box>

          {navigationLinks.slice(1).map(({ id, ...rest }) => (
            <NavigationLink key={id} id={id} fontSize={5} {...rest} />
          ))}
        </Stack>

        <Button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          size="m"
          shape="square"
        >
          {theme === "light" ? <MoonGlyph /> : <SunGlyph />}
        </Button>
      </Box>

      <Box
        as="header"
        fullWidth
        py={[4, 5]}
        px={px}
        justifyContent="space-between"
        display={["flex", "none"]}
      >
        <Button
          aria-label="Open menu"
          variant="tertiary"
          shape="square"
          onClick={() => openNavigation()}
        >
          <HamburgerGlyph />
        </Button>

        <Link href="/" passHref>
          <Identity as="a" aria-label="Go home" />
        </Link>

        <Button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          size="m"
          shape="square"
        >
          {theme === "light" ? <MoonGlyph /> : <SunGlyph />}
        </Button>
      </Box>

      <Box px={px} fullWidth>
        <Spacer length="100%" />
      </Box>
    </Stack>
  );
};
