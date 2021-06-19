const { resolve } = require('path')

/** @type {import('@nuxt/types').NuxtConfig} */
const config = {
  rootDir: resolve(__dirname, '../../../'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  css: ['@/assets/a.scss', '@/assets/a.sass'],
  render: {
    resourceHints: false
  },
  styleResources: {
    scss: ['@/assets/nested/index.scss', 'mathsass'],
    sass: ['@/assets/nested/index.sass'],
    hoistUseStatements: true
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
