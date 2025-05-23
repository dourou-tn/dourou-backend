import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    meta: {
      guest: true,
      layout: 'default-layout',
    },
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: () => import(/* webpackChunkName: "products" */ '../views/products/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/auctions',
    name: 'AuctionsPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/auctions/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/packs',
    name: 'PacksPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/packs/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/config',
    name: 'ConfigPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/config/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/jobs',
    name: 'JobsPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/jobs/index.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const authenticated = store.getters['auth/isLogged']

  if (to.matched.some(route => route.meta.auth) && !authenticated) {
    next({ name: 'AuthPage' })
  }

  if (to.matched.some(route => route.meta.guest) && authenticated) {
    next({ name: 'HomePage' })
  }

  next()
})

export default router
