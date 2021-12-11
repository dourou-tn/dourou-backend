import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import users from './users'

const persistedStateOptions = {
  paths: [
    'auth',
  ]
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users
  },
  plugins: [createPersistedState(persistedStateOptions)]
})
