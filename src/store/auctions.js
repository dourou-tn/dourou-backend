export default {
  namespaced: true,

  state: {
    auctions: []
  },

  getters: {
    auctions: (state) => state.auctions,
  },

  mutations: {
    SET_AUCTIONS(state, auctions) {
      state.auctions = auctions
    },
    ADD_AUCTION(state, product) {
      state.auctions.push(product)
    },
    DELETE_AUCTION(state, auctionId) {
      state.auctions = state.auctions.filter((u) => u.id !== auctionId)
    }
  },

  actions: {
    async fetch({ commit }) {
      const res = await window.Axios.get('/auctions')
      commit('SET_AUCTIONS', res.data)
    },

    async show (_, auctionId) {
      const res = await window.Axios.get(`/auctions/${auctionId}`);
      return res.data;
    },

    async create({ commit }, auction) {
      const res = await window.Axios.post('/auctions', auction);
      if (res.status === 200) {
        commit('ADD_AUCTION', res.data)
      }
      return res.status;
    },

    async edit(_, auction) {
      if (auction.id) {
        const res = await window.Axios.put(`/auctions/${auction.id}`, auction);
        return res.status;
      }
    },

    async delete({ commit }, auctionId) {
      const res = await window.Axios.delete(`/auctions/${auctionId}`);
      if (res.status === 200) {
        commit('DELETE_AUCTION', auctionId)
      }
      return res.status;
    },

    async upcoming({ commit }) {
      const data = (await window.Axios.get('client/auctions/upcoming')).data;
      commit('SET_AUCTIONS', data);
    },

    async live({ commit }) {
      const data = (await window.Axios.get('client/auctions/live')).data;
      commit('SET_AUCTIONS', data);
    },

    async completed({ commit }) {
      const data = (await window.Axios.get('client/auctions/completed')).data;
      commit('SET_AUCTIONS', data);
    },

  }
}
