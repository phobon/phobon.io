import React, { Suspense } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { GeistSans } from 'geist/font/sans'
import dynamic from 'next/dynamic'
import markdownComponents from '@/components/markdown'

const markdown: any = {
  ...markdownComponents,
}

import './global.css'

const Header = dynamic(() => import('@/components/layout/header'), { ssr: false })
const MainScene = dynamic(() => import('@/components/layout/main'), { ssr: false })
const Loader = dynamic(() => import('@/components/canvas/loader'), { ssr: false })

const PhobonApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Header />

      <MainScene screenSizeCamera className={GeistSans.className}>
        <Suspense fallback={null}>
          <MDXProvider components={markdown}>
            <Component {...pageProps} key={router.route} />
          </MDXProvider>
        </Suspense>
      </MainScene>

      <Loader className='phbn__loader' />
    </>
  )
}

export default PhobonApp
