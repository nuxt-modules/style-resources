jest.setTimeout(60000)

const consola = require('consola')
const getPort = require('get-port')
const { Nuxt, Builder } = require('nuxt-edge')

let nuxt, port

const url = route => 'http://localhost:' + port + route

const setupNuxt = async (config) => {
  nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)
}

describe('nuxt-style-resources', () => {
  let log

  beforeEach(() => {
    log = jest.fn()
    consola.clear().add({ log })
  })

  describe('scss', () => {
    test('properly import variables', async () => {
      await setupNuxt(require('./fixture/sass/nuxt.config'))
      const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
      const headHtml = window.document.head.innerHTML
      expect(headHtml).toContain('.ymca{color:#333;line-height:16')
      expect(headHtml).toContain('.ymca{background-color:#fff')
    })

    afterEach(async () => {
      await nuxt.close()
    })
  })
  describe('stylus', () => {
    test('properly import variables', async () => {
      await setupNuxt(require('./fixture/stylus/nuxt.config'))
      const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
      const headHtml = window.document.head.innerHTML
      expect(headHtml).toContain('.ymca{color:#333')
    })

    afterEach(async () => {
      await nuxt.close()
    })
  })
  describe('less', () => {
    test('properly import variables', async () => {
      await setupNuxt(require('./fixture/less/nuxt.config'))
      const window = await (nuxt.server || nuxt).renderAndGetWindow(url('/'))
      const headHtml = window.document.head.innerHTML
      expect(headHtml).toContain('h1{color:#0f0}')
      expect(headHtml).toContain('.ymca{color:#333')
    })

    afterEach(async () => {
      await nuxt.close()
    })
  })
})
