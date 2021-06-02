const { resolve } = require('path')

/** @type {import('@nuxt/types').NuxtConfig} */
const config = {
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

module.exports = config
