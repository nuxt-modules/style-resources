const { resolve } = require('path')

/** @type {import('@nuxt/types').NuxtConfig} */
const config = {
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
  buildModules: [
    resolve(__dirname, '../../..')
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

module.exports = config
