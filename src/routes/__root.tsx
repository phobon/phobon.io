/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MDXProvider } from '@mdx-js/react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import Footer from '@/components/layout/footer'
import markdownComponents from '@/components/markdown'
import { NotFoundPage } from '@/components/not_found'
import NavigationEvents from '@/utils/navigation_events'

import '@/global.css'

const defaultTitle = 'Ben McCormick — Design engineer'
const siteUrl = 'https://phobon.io'
const defaultImage = 'https://phobon.io/phbn.webp'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, minimum-scale=1, initial-scale=1.0' },
      { title: defaultTitle },
      { name: 'description', content: defaultTitle },
      { name: 'language', content: 'english' },
      { httpEquiv: 'content-type', content: 'text/html' },
      { name: 'author', content: 'Ben McCormick https://phobon.io' },
      {
        property: 'og:title',
        content: defaultTitle,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: siteUrl,
      },
      {
        property: 'og:image',
        content: defaultImage,
      },
      {
        property: 'og:site_name',
        content: defaultTitle,
      },
      {
        property: 'og:description',
        content: defaultTitle,
      },
      { name: 'theme-color', content: '#000' },
    ],
    links: [
      { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
      { rel: 'mask-icon', color: '#000000', href: '/icons/safari-pinned-tab.svg' },
      { rel: 'apple-touch-startup-image', href: '/startup.png' },
      { rel: 'shortcut icon', href: '/icons/favicon.ico' },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <>
        <MDXProvider components={markdownComponents}>
          <Header />

          <Main debug>
            <Outlet />
          </Main>

          <Footer />
        </MDXProvider>
        <NavigationEvents />
        <Analytics />
        <SpeedInsights />
      </>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body className='phbn__body'>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
