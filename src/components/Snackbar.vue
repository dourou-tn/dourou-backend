<template>
  <v-snackbar
    v-model="snackbar.show"
    centered
    top
    :color="`${snackbar.color} accent-5`"
    elevation="24"
    :timeout="snackbar.timeout"
  >
    <v-icon v-if="snackbar.type === 'error'" v-text="'mdi-alert'" />
    <v-icon v-if="snackbar.type === 'success'" v-text="'mdi-check'" />
    <v-icon v-if="snackbar.type === 'info'" v-text="'mdi-information-outline'" />
    <span class="text-white text-weight-bold">
      {{ snackbar.msg }}
    </span>

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        text
        class="grey--text text--lighten-3"
        v-bind="attrs"
        @click="$store.commit('snackbar/closeSnackbar')"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ComponentNotification',
  data () {
    return {
      types: [ 'error', 'success', 'info' ]
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'snackbar/getSnackbar'
    })
  }
}
</script>
