import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export type LayoutProps = {
  title?: string;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  title,
  children,
}) => (
  <>
    <Header key="header" title={title} maxWidth={["none", 1400]} px={5} />
    {children}
    <Footer key="footer" px={5} maxWidth={1400} />
  </>
);
