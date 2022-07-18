import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "jotai";

import { Layout, markdown } from "@/components";

import "@/design";

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Provider>
        <Layout>
          <MDXProvider components={markdown}>
            <AnimatePresence>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </MDXProvider>
        </Layout>
      </Provider>
    </>
  );
};

export default PhobonApp;
