import React from 'react';
import Head from 'next/head';
// import { Helmet } from 'react-helmet';

const Meta = ({ title, description, url, image, twitterCard }) => {
  const t = title || `phbn | ${description}`;
  return (
    <Head lang="en">
      <title>{t}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content={t} />
      <meta name="description" content={description} />

      <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/static/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={t} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

    </Head>
    // <Helmet
    //   htmlAttributes={{ lang: 'en' }}
    //   title={t}
    //   meta={[
    //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //     { name: 'title', content: t },
    //     { name: 'description', content: description },
    //     { property: 'og:type', content: 'website' },
    //     { property: 'og:url', content: url },
    //     { property: 'og:title', content: t },
    //     { property: 'og:description', content: description },
    //     { property: 'og:image', content: image },
    //     { property: 'twitter:card', content: twitterCard },
    //     { property: 'twitter:url', content: url },
    //     { property: 'twitter:title', content: t },
    //     { property: 'twitter:description', content: description },
    //     { property: 'twitter:image', content: image },
    //   ]}
    //   link={[
    //     { rel: 'icon', href: '/static/favicon.svg', type: 'image/svg+xml' },
    //     { rel: 'icon', href: '/static/favicon.ico'},
    //   ]} />
  );
};

Meta.defaultProps = {
  title: null,
  url: 'https://phobon.io',
  image: 'https://phobon.io/static/phbn.webp',
  description: 'Personal website for developer and designer, Ben McCormick',
  twitterCard: 'summary_large_image',
};

export default Meta;