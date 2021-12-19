<template>
  <v-app>
    <Snackbar />
    <v-app-bar app dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>DOUROU</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>


    <v-main>
      <v-container fluid>
        <v-layout column>
          <slot />
        </v-layout>
      </v-container>
    </v-main>

    <v-footer padless inset app dark>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>DOUROU</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '../components/Snackbar.vue';

export default {
    name: "DefaultLayout",
    componens: { Snackbar },
    mounted() {
    },
    components: { Snackbar }
}
</script>