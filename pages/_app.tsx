import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@phobon/tokens";
import { MDXProvider } from "@mdx-js/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "jotai";

import { Layout, markdown } from "@/components";

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <Layout>
          <MDXProvider components={markdown}>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </MDXProvider>
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default PhobonApp;
