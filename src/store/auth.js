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
      state.token = payload.token
      state.user = payload.user
      state.isLogged = true
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
      const res = await window.Axios.post('/auth/login', credentials)
      if (res.status === 200) {
        const { token, user } = res.data
        commit('SET_AUTHENTICATED', { token, user })
        return res.status
      }
    },

    // async logout({ commit, rootGetters }) {
    //   try {
    //     const user = rootGetters['auth/getUser']
    //     const res = await Axios.post('/api/logout', user)
    //     if (res) {
    //       commit('LOGOUT_USER')
    //       return res
    //     }
    //   } catch (err) {
    //     throw new Error(err)
    //   }
    // },

    // async me({ commit }) {
    //   try {
    //     const res = await Axios.post('/api/me')
    //     if (res) {
    //       commit('ME', res.data)
    //     }
    //   } catch (err) {
    //     throw new Error(err)
    //   }
    // },

  }
}
