/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { Box, Stack } from "@phobon/base";
import { Toggle, Spacer } from "@phobon/grimoire";
import Link from "next/link";

// import { getTheme } from "@/hooks";

import { Identity } from "../Identity";
import { SlideLink } from "../SlideLink";

const nav = [
  { pathname: "/#writing", label: "Writing" },
  { pathname: "/#contact", label: "Contact" },
];

// TODO: fix theming

export const Header = ({ title, ...props }) => {
  // const [theme, setTheme] = useTheme("light", getTheme);
  // const toggleTheme = useCallback(
  //   () => setTheme(theme === "light" ? "dark" : "light"),
  //   [theme]
  // );
  const [theme, setTheme] = useState(() => "light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const navItems = nav.map((n) => (
    <Link href={n.pathname} passHref key={n.pathname}>
      <SlideLink fontSize={[3, 5]}>{n.label}</SlideLink>
    </Link>
  ));

  return (
    <Stack
      fullWidth
      css={{
        position: "sticky",
        top: 0,
        zIndex: 2,
      }}
      {...props}
    >
      <Box
        as="header"
        fullWidth
        py={[4, 5]}
        justifyContent="space-between"
        css={(theme) => ({
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.background,
            opacity: 0.9,
            backdropFilter: "blur(8px)",
            zIndex: -1,
          },
        })}
      >
        <Link href="/">
          <Identity />
        </Link>

        <Stack as="nav" flexDirection="row" space={5}>
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