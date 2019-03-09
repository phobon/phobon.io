import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Normalize } from '@phobon/base';

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Karla|Rubik" rel="stylesheet" />
          <style jsx global>{`
            #__next {
              width: 100%;
              height: 100%;
            }

            body {
              font-family: 'Karla', sans-serif;
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: 'Rubik', sans-serif;
            }
          `}
          </style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Normalize />
        </body>
      </html>
    )
  }
}