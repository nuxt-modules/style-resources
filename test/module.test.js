const consola = require('consola')
const getPort = require('get-port')
const { Nuxt, Builder } = require('nuxt-edge')

jest.setTimeout(60 * 1000)

let nuxt, port

describe('nuxt-style-resources', () => {
  let log

  beforeEach(() => {
    log = jest.fn()
    consola.clear().add({ log })
  })

  describe('scss', () => {
    test('properly import variables', async () => {
      nuxt = await setupNuxt(require('./fixture/sass/nuxt.config'))
      const { html } = await nuxt.server.renderRoute('/')
      expect(html).toContain('#333')
      expect(html).toMatchSnapshot()
    })

    afterEach(async () => {
      if (nuxt) {
        await nuxt.close()
      }
    })
  })
  describe('stylus', () => {
    test('properly import variables', async () => {
      nuxt = await setupNuxt(require('./fixture/stylus/nuxt.config'))
      const { html } = await nuxt.server.renderRoute('/')
      expect(html).toContain('#333')
      expect(html).toMatchSnapshot()
    })

    afterEach(async () => {
      if (nuxt) {
        await nuxt.close()
      }
    })
  })
  describe('less', () => {
    test('properly import variables', async () => {
      nuxt = await setupNuxt(require('./fixture/less/nuxt.config'))
      const { html } = await nuxt.server.renderRoute('/')
      expect(html).toContain('#333')
      expect(html).toMatchSnapshot()
    })

    afterEach(async () => {
      if (nuxt) {
        await nuxt.close()
      }
    })
  })
})

const setupNuxt = async (config) => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)

  return nuxt
}
