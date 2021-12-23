export default {
  namespaced: true,

  state: {
    snackbar: {
      show: false,
      msg: '401 Unauthorized',
      color: 'red',
      type: '',
      timeout: '8000'
    }
  },

  getters: {
    getSnackbar: (state) => state.snackbar
  },

  mutations: {
    showSnackbar(state, snackbar) {

      

      if (snackbar.type) {
        switch (snackbar.type) {
          case 'success':
            snackbar.color = 'green'
            break;

          case 'error':
            snackbar.color = 'red'
            break;

          case 'info':
            snackbar.color = 'yellow'
            break;

          default:
            break;
        }
      }

      snackbar.show = true

      state.snackbar = snackbar
    },

    closeSnackbar(state) {
      state.snackbar.show = false
    }
  }
}
