import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/theme/index'
import { MDXProvider } from '@mdx-js/react'
import { AnimatePresence } from 'framer-motion'

import { markdown } from '@/components'
import { GlobalStyles } from '@/components/GlobalStyles'
import { Layout } from '@/components/layout_test/layout'

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <MDXProvider components={markdown}>
            <AnimatePresence>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </MDXProvider>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default PhobonApp
