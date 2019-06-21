import NuxtConfiguration from '@nuxt/config'

declare module '@nuxt/config/types/index' {
  export default interface NuxtConfiguration {
    styleResources?: {
      sass?: string[] | string
      scss?: string[] | string
      less?: string[] | string
      stylus?: string[] | string
    }
  }
}
