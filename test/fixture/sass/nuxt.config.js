const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname),
  css: ['~assets/a.scss'],
  render: {
    resourceHints: false
  },
  styleResources: {
    scss: ['./assets/variables.scss']
  },
  modules: ['@@'],
  build: {
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
}
