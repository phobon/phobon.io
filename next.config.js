const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  target: 'serverless'
})