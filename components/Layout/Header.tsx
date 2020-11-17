/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useCallback } from "react";
import { Box, Stack } from "@phobon/base";
import { useTheme } from "@phobon/hooks";
import { Toggle, Spacer } from "@phobon/grimoire";
import Link from "next/link";

import { getTheme } from "@/hooks/getTheme";

import { Identity } from "../Identity";
import { SlideLink } from "../SlideLink";

const nav = [
  { pathname: "/#writing", label: "Writing" },
  { pathname: "/#contact", label: "Contact" },
];

export const Header = ({ title, ...props }) => {
  const [theme, setTheme] = useTheme("light", getTheme);
  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme]
  );

  const navItems = nav.map((n) => (
    <Link href={n.pathname} passHref key={n.pathname}>
      <SlideLink fontSize={[3, 5]}>{n.label}</SlideLink>
    </Link>
  ));

  return (
    <Stack
      fullWidth
      css={(theme) => ({
        top: 0,
        position: "sticky",
        zIndex: 2,
        overflow: "hidden",
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
        justifyContent="space-between"
        css={{
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" passHref>
          <Identity as="a" />
        </Link>

        <Stack as="nav" flexDirection="row" space={5} alignItems="center">
          {navItems}
          <Toggle
            toggled={theme === "dark"}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          />
        </Stack>
      </Box>
      <Spacer length="100%" />
    </Stack>
  );
};
