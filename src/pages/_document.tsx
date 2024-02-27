import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Ben McCormick - Creative Developer</title>
        <meta property='og:title' content='Ben McCormick - Creative Developer' key='phbn__meta__title' />
        <meta
          name='description'
          content='Ben McCormick is a creative developer based in Perth, Western Australia'
          key='phbn__meta__description'
        />
      </Head>
      <body className='phbn__body'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
