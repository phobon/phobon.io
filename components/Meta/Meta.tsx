import React, { FunctionComponent } from "react";
import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterCard: "summary" | "summary_large_image";
}

export const Meta: FunctionComponent<MetaProps> = ({
  title,
  description,
  url,
  image,
  twitterCard,
}) => {
  const metaTitle = title || `phbn | ${description}`;
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content={metaTitle} />
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

Meta.defaultProps = {
  url: "https://phobon.io",
  image: "https://phobon.io/phbn.webp",
  description: "Personal website for developer and designer, Ben McCormick",
  twitterCard: "summary_large_image",
};
