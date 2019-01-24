import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components'
import { Normalize } from 'base';

const NextStyles = createGlobalStyle`
  #__next {
    width: 100%;
    height: 100%;
  }
`;

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
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Normalize />
          <NextStyles />
        </body>
      </html>
    )
  }
}