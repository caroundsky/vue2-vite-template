import { RouteConfig } from 'vue-router'

const staticRoutes: RouteConfig[] = [
  {
    path: '/401',
    meta: { noAuthRequired: true },
    name: '401',
    component: () => import('@/components/ErrorPage.vue'),
    props: { type: '401' },
  },
  {
    path: '/403',
    meta: { noAuthRequired: true },
    name: '403',
    component: () => import('@/components/ErrorPage.vue'),
    props: { type: '403' },
  },
  {
    path: '/404',
    meta: { noAuthRequired: true },
    name: '404',
    component: () => import('@/components/ErrorPage.vue'),
    props: { type: '404' },
  },
]

export default staticRoutes
