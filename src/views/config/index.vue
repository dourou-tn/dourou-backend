<template>
  <v-data-table
    :headers="headers"
    :items="configs"
    sort-by="id"
    class="elevation-0 rounded-tl-xl"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        class="rounded-tl-xl"
      >
        <v-toolbar-title>
          <v-icon class="mb-1">mdi-config</v-icon>
          Configuration
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <!-- <v-dialog
          v-model="createUserForm"
          fullscreen
          persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Ajouter
            </v-btn>
          </template>

          <UsersForm v-if="createUserForm" @modal:close="closeForm" :edit="edit" />

        </v-dialog> -->

        <!-- <v-dialog
          v-if="userToDelete"
          v-model="userToDelete"
          persistent
          max-width="393"
        >
          <v-card>
            <v-card-title class="text-h5">
              Supprimer?
            </v-card-title>
            <v-card-text>
              <div>{{ userToDelete.lastname }} {{ userToDelete.firstname }}</div>
              <div>{{ userToDelete.email }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="userToDelete = null"
              >
                Annuler
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="confirmDelete"
              >
                Confirmer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->

      </v-toolbar>
    </template>


    <template v-slot:item.key="{item}">
      <span>{{ item.key }}</span>
    </template>

    <template v-slot:item.value="{item}">
      {{ JSON.parse(item.value).value }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editConfig(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="item.role_id !== 1"
        @click="deleteConfig(item)"
        small
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
// import UsersForm from './userForm.vue';
import moment from 'moment';

export default {
  name: 'ConfigPage',
  // components: { UsersForm },
  data() {
    return {
      moment: moment,
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id',
          width: 32,
        },
        {
          text: 'Key',
          align: 'left',
          value: 'key',
        },
        {
          text: 'Valeur',
          align: 'left',
          sortable: true,
          value: 'value'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      createUserForm: false,
      edit: null,
      userToDelete: null,
      loading: false,
    }
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch('config/get');
    this.loading = false;
  },

  computed: {
    configs () {
      console.log(this.$store.getters['config/get'])
      return this.$store.getters['config/get'];
    }
  },

  methods: {
    // editUser (user) {
    //   this.edit = user;
    //   this.createUserForm = true;
    // },
    // async closeForm () {
    //   this.loading = true;
    //   await this.$store.dispatch('users/fetch')
    //   this.edit = null;
    //   this.createUserForm = false;
    //   this.loading = false;
    // },
    // deleteUser (user) {
    //   this.userToDelete = user;
    // },
    // async confirmDelete () {
    //   this.loading = true;
    //   await this.$store.dispatch('users/deleteUser', this.userToDelete.id);
    //   this.userToDelete = null;
    //   this.loading = false;
    // },
  }
}
</script>
