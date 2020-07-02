const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname),
  css: ['@/assets/a.pcss', '@/assets/a.postcss'],
  render: {
    resourceHints: false
  },
  styleResources: {
    pcss: ['@/assets/variables.pcss'],
    postcss: ['@/assets/variables.postcss']
  },
  buildModules: ['@@'],
  build: {
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    },
    postcss: {
      plugins: {
        'postcss-simple-vars': {}
      }
    }
  }
}
