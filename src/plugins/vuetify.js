import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#4d1a9b',
      },
      dark: {
        primary: '#4d1a9b',
      }
    }
  },
});
