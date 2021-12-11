import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// layouts
import DefaultLayout from './layouts/Default.vue';
import BackendLayout from './layouts/Backend.vue';

Vue.component('backend-layout', BackendLayout)
Vue.component('default-layout', DefaultLayout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
