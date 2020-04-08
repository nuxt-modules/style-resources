const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname),
  css: ['~assets/a.less'],
  render: {
    resourceHints: false
  },
  buildModules: ['@@'],
  build: {
    styleResources: {
      less: './assets/vars/*.less'
    },
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
}
