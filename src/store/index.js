import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import users from './users'
import products from './products'
import auctions from './auctions'
import snackbar from './snackbar'
import config from './config'
import packs from './packs'

const persistedStateOptions = {
  paths: [
    'auth',
  ]
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    products,
    auctions,
    snackbar,
    config,
    packs,
  },
  plugins: [createPersistedState(persistedStateOptions)]
})
