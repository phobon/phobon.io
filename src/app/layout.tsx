import './global.css'
import { GeistSans } from 'geist/font/sans'

import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import Loader from '@/components/canvas/loader'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Ben McCormick — Design engineer',
  description: 'Ben McCormick — Design engineer',
  metadataBase: new URL('https://phobon.io'),
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <head />
      <body className='phbn__body'>
        <Header />

        <Main debug showLoader>
          {children}
        </Main>

        <Footer />

        <Loader className='phbn__loader' />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
