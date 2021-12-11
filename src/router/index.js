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
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      auth: true,
      layout: 'backend-layout',
    },
  },
  {
    path: '/auctions',
    name: 'AuctionsPage',
    component: () => import(/* webpackChunkName: "users" */ '../views/Auctions.vue'),
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
