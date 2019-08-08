import mod from '@@'
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  css: ['~assets/a.styl'],
  render: {
    resourceHints: false
  },
  styleResources: {
    stylus: ['~assets/variables.styl']
  },
  modules: [mod],
  build: {
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
}
