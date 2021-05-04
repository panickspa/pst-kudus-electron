import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Screensaver.vue')
  },
  {
    path: '/survey',
    name: 'Survey Kepuasan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Survey.vue')
  },
  {
    path: '/option',
    name: 'Option',
    component: () => import(/* webpackChunkName: "option" */ '../views/Option.vue')
  },
  {
    path: '/bpskudus',
    name: 'BPS Kudus',
    component: () => import(/* webpackChunkName: "option" */ '../views/BpsKudus.vue')
  },
  {
    path: '/perpustakaan',
    name: 'Perpustakaan BPS',
    component: () => import(/* webpackChunkName: "option" */ '../views/BukuTamu.vue')
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
