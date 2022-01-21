export default {
  namespaced: true,

  state: {
    packs: []
  },

  getters: {
    packs: (state) => state.packs
  },

  actions: {
    async fetch({ commit }) {
      const res = await window.Axios.get('/packs')
      commit('SET_PACKS', res.data)
    },
    
    async create({ commit }, pack) {
      const res = await window.Axios.post('/packs', pack);
      if (res.status === 200) {
        commit('ADD_PACK', res.data)
      }
      return res.status;
    },

    async edit(_, pack) {
      console.log('PACK from store', pack);
      if (pack.id) {
        const res = await window.Axios.put(`/packs/${pack.id}`, pack);
        return res.status;
      }
    },

    async delete({ commit }, packId) {
      const res = await window.Axios.delete(`/packs/${packId}`);
      if (res.status === 200) {
        commit('DELETE_PACK', packId)
      }
      return res.status;
    }
  },

  mutations: {
    SET_PACKS(state, packs) {
      state.packs = packs;
    },
    ADD_PACK(state, pack) {
      state.packs.push(pack);
    },
    DELETE_PACK(state, packId) {
      state.packs = state.packs.filter((u) => u.id !== packId)
    }
  }
}
