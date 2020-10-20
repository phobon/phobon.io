const withPlugins = require("next-compose-plugins");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withPlugins([
  withMDX({
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  }),
]);
