import { RouteConfig } from 'vue-router'
import routesStatic from './routes-static'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { noAuthRequired: true },
    component: () => import('@/page/home.vue'),
  },
]

export default [
  ...routes,
  ...routesStatic,
  {
    path: '*',
    redirect: { name: '404' },
  },
]
