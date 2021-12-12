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
    DELETE_USER(state, userId) {
      state.users = state.users.filter((u) => u.id !== userId)
    }
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
      return res.status;
    },

    async edit (_, user) {
      if (user.id) {
        const res = await window.Axios.put(`/users/${user.id}`, user);
        return res.status;
      }
    },

    async deleteUser ({ commit }, userId) {
      const res = await window.Axios.delete(`/users/${userId}`);
      console.log('del', res);
      if (res.status === 200) {
        commit('DELETE_USER', userId)
      }
      return res.status;
    }
  }
}
