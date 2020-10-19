import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@phobon/tokens";
import { MDXProvider } from "@mdx-js/react";
import { AnimatePresence } from "framer-motion";

import { Layout, markdown } from "@/components";

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={markdown}>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default PhobonApp;
