/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'nprogress'
// declare module '@caroundsky/el-plus-dialog-service'
declare module 'vuex-map-fields'
declare module 'vue-smooth-dnd'

// declare module 'vuex' {
//   export * from 'vuex/types/index.d.ts'
//   export * from 'vuex/types/helpers.d.ts'
//   export * from 'vuex/types/logger.d.ts'
//   export * from 'vuex/types/vue.d.ts'
// }
