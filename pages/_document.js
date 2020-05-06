import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

import GlobalStyles from './GlobalStyles';

export default class PhobonDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(
            <>
              <GlobalStyles />
              <App {...props} />
            </>
          )
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}