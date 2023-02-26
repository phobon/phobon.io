const withPlugins = require("next-compose-plugins");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withPlugins([
  withMDX({
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  }),
]);
