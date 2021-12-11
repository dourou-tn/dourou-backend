<template>
  <v-card>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item class="px-2">
          <v-avatar
            color="primary"
            size="32"
          >
            <span class="white--text">
              {{ currentUser.firstname[0]}}
              {{ currentUser.lastname[0]}}
            </span>
          </v-avatar>
          <!-- <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar> -->
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ currentUser.firstname }} {{ currentUser.lastname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="{ name: link.to }"
          link
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
       
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DrawerComponent',
  data () {
    return {
      links: [
        { text: 'Dashboard', to: 'HomePage', icon: 'mdi-home' },
        { text: 'Produits', to: 'ProductsPage', icon: 'mdi-cube-outline' },
        { text: 'Enchères', to: 'AuctionsPage', icon: 'mdi-creation' },
        { text: 'Utilisateurs', to: 'UsersPage', icon: 'mdi-account-multiple' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      'currentUser': 'auth/getUser',
    })
  },
}
</script>

<style scoped>
  .scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
  }
</style>