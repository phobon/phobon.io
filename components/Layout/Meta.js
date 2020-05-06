import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, url, image, twitterCard }) => {
  const t = title || `phbn | ${description}`;
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={t}
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'title', content: t },
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { property: 'og:title', content: t },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'twitter:card', content: twitterCard },
        { property: 'twitter:url', content: url },
        { property: 'twitter:title', content: t },
        { property: 'twitter:description', content: description },
        { property: 'twitter:image', content: image },
      ]}
      link={[
        { rel: 'icon', href: '/static/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/static/favicon.ico'},
      ]} />
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