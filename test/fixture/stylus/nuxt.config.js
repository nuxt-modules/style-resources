const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname),
  css: ['~assets/a.styl'],
  render: {
    resourceHints: false
  },
  buildModules: [
    ['@@', { stylus: ['~assets/variables.styl'] }]
  ],
  build: {
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
}
