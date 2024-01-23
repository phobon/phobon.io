import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/theme/index'
import { MDXProvider } from '@mdx-js/react'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'jotai'

import { Layout, markdown } from '@/components'
import { GlobalStyles } from '@/components/GlobalStyles'

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Provider>
          <Layout>
            <MDXProvider components={markdown}>
              <AnimatePresence>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </MDXProvider>
          </Layout>
          {/* <GridHelper /> */}
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default PhobonApp
