export default {
  namespaced: true,

  state: {
    configs: []
  },

  getters: {
    get: (state) => state.configs
  },

  actions: {
    async get({ commit }) {
      const res = await window.Axios.get('/config')
      commit('SET_CONFIGS', res.data.data)
    },
  },

  mutations: {
    SET_CONFIGS(state, configs) {
      state.configs = configs;
    },
  }
}
