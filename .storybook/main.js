const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(tsx|mdx)'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/preset-typescript',
              '@babel/react',
            ],
            plugins: [
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      ],
    })
    config.resolve.alias['@/components'] = path.join(__dirname, '../components')
    config.resolve.alias['@/hooks'] = path.join(__dirname, '../hooks')
    config.resolve.alias['@/api'] = path.join(__dirname, '../pages/api')
    config.resolve.alias['@/data'] = path.join(__dirname, '../data')

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
