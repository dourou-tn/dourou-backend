<template>
  <v-card>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
    >
      <v-list>
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
        <div v-for="(link, index) in links" :key="index">
          <!-- menu with children -->
          <v-list-group
            v-if="link.children"
          >
            <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in link.children"
              :key="child.to"
              link
              :to="{ name: child.to }"
            >
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="pl-2">{{ child.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>


          <!-- menu without children v-else -->
          <v-list-item
            v-else
            :to="{ name: link.to }"
            link
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </div>
       
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
        { text: 'Utilisateurs', to: 'UsersPage', icon: 'mdi-account-multiple' },
        { text: 'Produits', to: 'ProductsPage', icon: 'mdi-cube-outline' },
        { text: 'Enchères', to: 'AuctionsPage', icon: 'mdi-creation' },
        { text: 'Dourou Packs', to: 'PacksPage', icon: 'mdi-circle-multiple-outline' },
        { text: 'Configuration', icon: 'mdi-cog', children: [
          { text: 'Jobs', to: 'JobsPage', icon: 'mdi-robot' },
          { text: 'Variables', to: 'ConfigPage', icon: 'mdi-variable' },
        ]}
        // { text: 'Configuration', to: 'ConfigPage', icon: 'mdi-cog' },
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