const glob = require('glob-all')

export default function nuxtStyledResources(moduleOptions) {
  const resolver = (this.nuxt.resolver || this.nuxt)

  const stylusLoaderOptions = this.options.build.loaders.stylus
  const options = { ...moduleOptions, ...this.options.build.styleResources, ...this.options.styleResources }

  const styleResourcesEntries = Object.entries(options)

  if (!styleResourcesEntries.length) {
    // No resources set
    return
  }

  const retrieveStyleArrays = styleResourcesEntries =>
    styleResourcesEntries.reduce((normalizedObject, [key, value]) => {
      const wrappedValue = Array.isArray(value) ? value : [value]
      normalizedObject[key] = wrappedValue.reduce((acc, path) => {
        const possibleModulePath = resolver.resolveModule(path)
        if (possibleModulePath) {
          // Path is mapped to module
          return acc.concat(possibleModulePath)
        }
        // Try to resolve alias, if not possible join with srcDir
        path = resolver.resolveAlias(path)
        // Try to glob (if it's a glob
        path = glob.sync(path)
        // Flatten this (glob could produce an array)
        return acc.concat(path)
      }, [])
      return normalizedObject
    }, {})

  const { scss = [], sass = [], less = [], stylus = [] } = retrieveStyleArrays(styleResourcesEntries)

  if (sass.length) {
    this.extendBuild(extendSass(sass))
  }

  if (scss.length) {
    this.extendBuild(extendScss(scss))
  }

  if (stylus.length) {
    // Use stylus-loader for imports as he supports that :+1: ;)
    stylusLoaderOptions.import = stylusLoaderOptions.import
      ? [].concat(stylusLoaderOptions.import).concat(stylus) /* Looks like you know what you are doing! That's good */
      : stylus
  }

  if (less.length) {
    this.extendBuild(extendLess(less))
  }
}

const extendWithSassResourcesLoader = matchRegex => resources => (config) => {
  // Yes, using sass-resources-loader is **intended here**
  // Despite it's name it can be used for less as well!
  const sassResourcesLoader = {
    loader: 'sass-resources-loader', options: { resources }
  }

  // Gather all loaders that test against scss or sass files
  const matchedLoaders = config.module.rules.filter(({ test = '' }) => {
    return test.toString().match(matchRegex)
  })

  // push sass-resources-loader to each of them
  matchedLoaders.forEach((loader) => {
    loader.oneOf.forEach(rule => rule.use.push(sassResourcesLoader))
  })
}

const extendSass = extendWithSassResourcesLoader(/sass/)
const extendScss = extendWithSassResourcesLoader(/scss/)
const extendLess = extendWithSassResourcesLoader(/less/)

module.exports.meta = require('../package.json')
