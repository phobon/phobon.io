const DEFAULT_TITLE = 'Ben McCormick — Design engineer'
const DEFAULT_URL = 'https://phobon.io'
const DEFAULT_DESCRIPTION = 'Ben McCormick — Design engineer'
const DEFAULT_AUTHOR = 'Ben McCormick https://phobon.io'
const DEFAULT_IMAGE = 'https://phobon.io/phbn.webp'

const Head = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  image = DEFAULT_IMAGE,
}) => {
  return (
    <>
      {/* Recommended Meta Tags */}
      <meta charSet='utf-8' />
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />
      <meta name='author' content={DEFAULT_AUTHOR} />
      <meta name='designer' content={DEFAULT_AUTHOR} />
      <meta name='publisher' content={DEFAULT_AUTHOR} />

      {/* Search Engine Optimization Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta
        name='keywords'
        content='physio perth,pilates perth,clinical pilates,subiaco,physiotherapists,rehabilitation,sporting,injury,spinal,musculoskeletal,'
      />
      <meta name='robots' content='index,follow' />
      <meta name='distribution' content='web' />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta name='og:title' content={title} />
      <meta name='og:type' content='site' />
      <meta name='og:url' content={url} />
      <meta name='og:image' content={image} />
      <meta name='og:site_name' content={title} />
      <meta name='og:description' content={description} />

      <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
      <link rel='apple-touch-icon' sizes='16x16' href='/icons/favicon-16x16.png' />
      <link rel='apple-touch-icon' sizes='32x32' href='/icons/favicon-32x32.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
      <link rel='mask-icon' color='#000000' href='/icons/safari-pinned-tab.svg' />
      <link rel='apple-touch-startup-image' href='/startup.png' />

      {/* Meta Tags for HTML pages on Mobile */}
      {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
      <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
      <meta name='theme-color' content='#000' />
      <link rel='shortcut icon' href='/icons/favicon.ico' />

      {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
      {/* <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content={twitter} /> */}
    </>
  )
}

export default Head
