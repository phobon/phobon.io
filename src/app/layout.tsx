import './global.css'
import { GeistSans } from 'geist/font/sans'

import { Metadata } from 'next'

import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import Loader from '@/components/canvas/loader'

export const metadata: Metadata = {
  title: 'Ben McCormick — Creative developer',
  description: 'Ben McCormick — Creative developer',
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

        <Loader className='phbn__loader' />
      </body>
    </html>
  )
}

export default RootLayout
