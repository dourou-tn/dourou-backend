export default {
  namespaced: true,

  state: {
    products: [],
  },

  getters: {
    products: (state) => state.products,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter((u) => u.id !== productId)
    }
  },

  actions: {
    async fetch({ commit }) {
      const res = await window.Axios.get('products')
      commit('SET_PRODUCTS', res.data)
    },

    async create({ commit }, product) {
      const res = await window.Axios.post('/products', product);
      if (res.status === 200) {
        commit('ADD_PRODUCT', res.data)
      }
      return res.status;
    },

    async edit(_, product) {
      if (product.id) {
        const res = await window.Axios.put(`/products/${product.id}`, product);
        return res.status;
      }
    },

    async delete({ commit }, productId) {
      const res = await window.Axios.delete(`/products/${productId}`);
      console.log('del', res);
      if (res.status === 200) {
        commit('DELETE_PRODUCT', productId)
      }
      return res.status;
    }
  }
}
