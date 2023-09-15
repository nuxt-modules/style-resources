import {
  defineNuxtModule,
  resolveModule,
  resolveAlias,
  resolveFiles,
  resolvePath,
  extendWebpackConfig,
} from "@nuxt/kit";

export interface ModuleOptions {
  sass?: string | string[];
  scss?: string | string[];
  less?: string | string[];
  stylus?: string | string[];
  hoistUseStatements?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@nuxtjs/style-resources",
    configKey: "styleResources",
  },
  defaults: {
    hoistUseStatements: false,
  },
  async setup(options, nuxt) {
    const {
      webpack: {
        loaders: { stylus: stylusLoaderOptions },
      },
    } = nuxt.options;
    const { hoistUseStatements, ...styleResources } = options;
    const styleResourcesEntries = Object.entries(styleResources);

    if (!styleResourcesEntries.length) {
      return;
    }

    const basePath = await resolvePath(".");

    const retrieveStyleArrays = async (
      styleResourcesEntries: [string, string | string[]][]
    ) => {
      const normalizedObject: Record<string, string[]> = {};

      for (const [key, value] of styleResourcesEntries) {
        const wrappedValue = Array.isArray(value) ? value : [value];

        const promises = await Promise.all(
          wrappedValue.map(async (path) => {
            let possibleModulePath;
            try {
              possibleModulePath = resolveModule(path);
              // eslint-disable-next-line no-empty
            } catch (e) {}
            if (possibleModulePath) {
              return possibleModulePath;
            }

            let _path: string | string[] = path;
            try {
              _path = resolveAlias(path);
              // eslint-disable-next-line no-empty
            } catch (error) {}
            _path = await resolveFiles(basePath, _path);

            return _path;
          })
        );

        normalizedObject[key] = promises.flat();
      }

      return normalizedObject;
    };

    const {
      scss = [],
      sass = [],
      less = [],
      stylus = [],
    } = await retrieveStyleArrays(styleResourcesEntries);

    if (sass.length) {
      extendWebpackConfig(extendSass({ resources: sass, hoistUseStatements }));
    }

    if (scss.length) {
      extendWebpackConfig(extendScss({ resources: scss, hoistUseStatements }));
    }

    if (stylus.length) {
      if (!stylusLoaderOptions.stylusOptions) {
        stylusLoaderOptions.stylusOptions = { import: stylus };
      } else {
        stylusLoaderOptions.stylusOptions.import = stylusLoaderOptions
          .stylusOptions.import
          ? // @ts-ignore
            [].concat(stylusLoaderOptions.stylusOptions.import).concat(stylus)
          : stylus;
      }
    }

    if (less.length) {
      extendWebpackConfig(extendLess({ resources: less, hoistUseStatements }));
    }
  }
})


const extendWithSassResourcesLoader =
  (matchRegex: RegExp) => (options: any) => (config: any) => {
    const sassResourcesLoader = {
      loader: "sass-resources-loader",
      options,
    };

    const matchedLoaders = config.module.rules.filter(({ test = "" }) => {
      return test.toString().match(matchRegex);
    });

    matchedLoaders.forEach((loader: any) => {
      loader.oneOf.forEach((rule: any) => rule.use.push(sassResourcesLoader));
    });
  };

const extendSass = extendWithSassResourcesLoader(/sass/);
const extendScss = extendWithSassResourcesLoader(/scss/);
const extendLess = extendWithSassResourcesLoader(/less/);
