const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname),
  css: ['@/assets/a.scss', '@/assets/a.sass'],
  render: {
    resourceHints: false
  },
  styleResources: {
    scss: ['@/assets/nested/index.scss', 'mathsass'],
    sass: ['@/assets/nested/index.sass']
  },
  buildModules: ['@@'],
  build: {
    quiet: false,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
}
