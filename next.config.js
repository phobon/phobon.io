const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const mdx = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withPlugins([
  optimizedImages,
  [mdx, {
    pageExtensions: ['js', 'jsx', 'md', 'mdx']
  }]
]);