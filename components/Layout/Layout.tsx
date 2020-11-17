import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

import { maxWidth, horizontalPadding } from "@/data/constants";

export type LayoutProps = {
  title?: string;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  title,
  children,
}) => (
  <React.Fragment>
    <Header
      key="header"
      title={title}
      maxWidth={maxWidth}
      px={horizontalPadding}
    />
    {children}
    <Footer key="footer" maxWidth={maxWidth} px={horizontalPadding} />
  </React.Fragment>
);
