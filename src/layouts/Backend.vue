<template>
  <v-app>
    <v-app-bar app dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>DOUROU Backend</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon >
        <v-icon v-text="$vuetify.theme.dark ? 'mdi-brightness-7' : 'mdi-brightness-2'" />
      </v-btn>

      <v-menu
        right
        bottom
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            disabled
            @click="() => {}"
          >
            <v-list-item-title class="text-center">
              <v-btn
                outlined
              >
                {{ currentUser.email }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="$router.push({ name: 'user-profile', params: { id: currentUser.id } })"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-account'" />
            </v-list-item-icon>
            <v-list-item-title>Profil</v-list-item-title>
          </v-list-item>

          <v-list-item
            disabled
            @click="() => {}"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-chart-bar'"/>
            </v-list-item-icon>
            <v-list-item-title disabled>
                Mes Rapports
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="logout"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"/>
            </v-list-item-icon>
            <v-list-item-title disabled>
                Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
        {{ new Date().getFullYear() }} — <strong>DOUROU Backend</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultComponent',
  mounted () {
  },
  computed: {
    currentUser () {
      return this.$store.getters['auth/getUser'];
    }
  },
  methods: {
    async logout () {
      const res = await this.$store.dispatch('auth/logout')
      if (res) {
        this.$router.push({ name: 'AuthPage' })
      }
    },
  },
}
</script>