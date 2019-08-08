import mod from '@@'
const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  css: ['~assets/a.less'],
  render: {
    resourceHints: false
  },
  modules: [mod],
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
