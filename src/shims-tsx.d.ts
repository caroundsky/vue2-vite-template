import Vue, { VNode } from 'vue'
import DialogService from '@caroundsky/el-dialog-service'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  interface Window {
    $tools: any
    tab: any
    newsInstantMessaging: any
    instantMessaging_Search: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $useDialog: typeof DialogService
    $appConfig: any
    bus: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any

    ref?: string
  }
}
