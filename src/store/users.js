export default {
  namespaced: true,

  state: {
    users: [],
  },

  getters: {
    users: (state) => state.users,
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      const res = await window.Axios.get('/users')
      console.log('res', res)
        commit('SET_USERS', res.data)
    },

    async create ({ commit }, user) {
      const res = await window.Axios.post('/users', user);
      if (res.status === 200) {
        commit('ADD_USER', res.data)
      }
      return res.state;
    }
  }
}
