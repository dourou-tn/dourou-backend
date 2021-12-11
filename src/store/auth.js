// import Axios from '../service/api'

export default {
  namespaced: true,

  state: {
    isLogged: false,
    user: {},
    token: null,
  },

  getters: {
    isLogged: (state) => state.isLogged,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },

  mutations: {
    SET_AUTHENTICATED(state, payload) {
      // state.authenticated = payload.authenticated
      // state.token_type = payload.token_type
      // state.token = payload.token
      // state.user = payload.user
    },

    // LOGOUT_USER(state) {
    //   state.authenticated = false
    //   state.token_type = null
    //   state.token = null
    //   state.user = null
    // },

    // ME(state, user) {
    //   state.user = user
    // },
  },

  actions: {
    async login({ commit }, credentials) {
      await Axios.get('/sanctum/csrf-cookie')
      const res = await Axios.post('/api/login', credentials)
      if (res) {
        const { token_type, access_token, user } = res.data
        commit('SET_AUTHENTICATED', { token_type, token: access_token, user, authenticated: true })
        return res
      }
    },

    async logout({ commit, rootGetters }) {
      try {
        const user = rootGetters['auth/getUser']
        const res = await Axios.post('/api/logout', user)
        if (res) {
          commit('LOGOUT_USER')
          return res
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    async me({ commit }) {
      try {
        const res = await Axios.post('/api/me')
        if (res) {
          commit('ME', res.data)
        }
      } catch (err) {
        throw new Error(err)
      }
    },

  }
}
