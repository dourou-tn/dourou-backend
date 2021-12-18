import Vue from 'vue'
import moment from 'moment'
import './plugins/axios'
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
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
