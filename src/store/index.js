import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const persistedStateOptions = {
  paths: [
    'auth',
  ]
}

import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [createPersistedState(persistedStateOptions)]
})

