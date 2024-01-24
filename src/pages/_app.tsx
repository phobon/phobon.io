import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/theme/index'
import { MDXProvider } from '@mdx-js/react'
import { AnimatePresence } from 'framer-motion'

import markdownComponents from '@/components/markdown'

const markdown: any = {
  ...markdownComponents,
  a: SlideLink,
}

import './global.css'
import dynamic from 'next/dynamic'
import SlideLink from '@/components/slide_link'

const Header = dynamic(() => import('@/components/layout/header'), { ssr: false })
const Main = dynamic(() => import('@/components/layout/main'), { ssr: false })
const Footer = dynamic(() => import('@/components/layout/footer'), { ssr: false })

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Main>
        <MDXProvider components={markdown}>
          <AnimatePresence>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MDXProvider>
      </Main>

      <Footer />
    </ThemeProvider>
  )
}

export default PhobonApp
