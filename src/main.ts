import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DialogService from '@caroundsky/el-dialog-service'

import App from './App.vue'
import store from './store'
import router from '@/router'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$useDialog = DialogService

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')