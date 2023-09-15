module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
    '@nuxt/eslint-config'
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  }
}
