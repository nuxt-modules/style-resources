const consola = require('consola')
const getPort = require('get-port')
const nuxtStable = require('nuxt')
const nuxtEdge = require('nuxt-edge')
jest.setTimeout(60 * 1000)

let nuxt, port

const url = route => 'http://localhost:' + port + route

const setupNuxtFn = ({ Nuxt, Builder }) => async (config) => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)

  return nuxt
}

describe('nuxt-style-resources', () => {
  describe.each([['nuxt', nuxtStable], ['nuxt-edge', nuxtEdge]])('%s', (_, nuxtImpl) => {
    let log

    const setupNuxt = setupNuxtFn(nuxtImpl)

    beforeEach(() => {
      log = jest.fn()
      consola.clear().add({ log })
    })

    describe('scss', () => {
      test('properly import variables', async () => {
        nuxt = await setupNuxt(require('./fixture/sass/nuxt.config'))

        const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
        const headHtml = window.document.head.innerHTML
        expect(headHtml).toContain('.ymca{color:#333')
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

        const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
        const headHtml = window.document.head.innerHTML
        expect(headHtml).toContain('.ymca{color:#333')
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

        const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
        const headHtml = window.document.head.innerHTML
        expect(headHtml).toContain('h1{color:#0f0}')
        expect(headHtml).toContain('.ymca{color:#333')
      })

      afterEach(async () => {
        if (nuxt) {
          await nuxt.close()
        }
      })
    })
  })
})
