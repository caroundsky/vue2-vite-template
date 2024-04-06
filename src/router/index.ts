import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  const noAuthRequired = to.matched.some((route) => route.meta.noAuthRequired)

  if (noAuthRequired) {
    return next()
  }

  if (store.getters['auth/loggedIn']) {
    return next()
  } else {
    const islogin = await store.dispatch('userInfo/getInfo')
    if (islogin) {
      return next()
    } else {
      return next({ name: '401' })
    }
  }
})

export default router
