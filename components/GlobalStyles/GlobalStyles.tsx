import React from "react";
import { Global } from "@emotion/react";

export const GlobalStyles = (): React.ReactElement => {
  const styles: any = {
    ":root, body": {
      width: "100%",
      margin: 0,
      padding: 0,
      fontSize: 8,
    },
    body: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    "*, ::before, ::after": {
      boxSizing: "border-box",
    },
    "a, a:hover, a:visited": {
      textDecoration: "none",
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },
    "code, kbd": {
      fontFamily:
        "'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Courier, monospace",
    },
    template: {
      display: "none",
    },
    "article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section": {
      display: "block",
    },
    "html, body, p, div, h1, h2, h3, h4, h5, h6, ul, ol, dl, img, pre, form, fieldset": {
      margin: 0,
      padding: 0,
    },
    "img, fieldset": {
      border: 0,
    },
    figure: {
      margin: 0,
    },
    "#__next": {
      width: "100%",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      backgroundColor: "var(--c-background)",
      position: "relative",
    },
  };
  return <Global styles={styles} />;
};
