import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { AnimatePresence } from 'framer-motion'
import { GeistSans } from 'geist/font/sans'

import markdownComponents from '@/components/markdown'

const markdown: any = {
  ...markdownComponents,
  a: SlideLink,
}

import './global.css'
import dynamic from 'next/dynamic'
import SlideLink from '@/components/slide_link'

const Header = dynamic(() => import('@/components/layout/header'), { ssr: false })
const MainScene = dynamic(() => import('@/components/layout/main'), { ssr: false })

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Header />

      <MainScene debug screenSizeCamera className={GeistSans.className}>
        <MDXProvider components={markdown}>
          <AnimatePresence>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MDXProvider>
      </MainScene>
    </>
  )
}

export default PhobonApp
