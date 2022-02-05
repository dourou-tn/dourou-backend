<template>
  <v-data-table
    :headers="headers"
    :items="items"
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
          <v-icon class="mb-1">mdi-robot</v-icon>
          Jobs
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="formOpen"
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
              Créer un job
            </v-btn>
          </template>

          <FormComponent v-if="formOpen" @modal:close="closeForm" :edit="edit" />

        </v-dialog>

        <!-- <v-dialog
          v-if="itemToDelete"
          v-model="itemToDelete"
          persistent
          max-width="393"
        >
          <v-card>
            <v-card-title class="text-h5">
              Supprimer?
            </v-card-title>
            <v-card-text>
              <div>{{ itemToDelete.lastname }} {{ itemToDelete.firstname }}</div>
              <div>{{ itemToDelete.email }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="itemToDelete = null"
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


    <template v-slot:item.created_at="{item}">
      <span>{{ moment(item.created_at).format('DD/MM/YYYY HH:mm:ss') }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="openEdit(item)"
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
import FormComponent from './form.vue';
import moment from 'moment';

export default {
  name: 'JobsPage',
  components: { FormComponent },
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
          text: 'Type',
          align: 'left',
          value: 'type',
        },
        {
          text: 'State',
          align: 'left',
          sortable: true,
          value: 'state'
        },
        {
          text: 'Création',
          align: 'left',
          sortable: true,
          value: 'created_at'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      formOpen: false,
      edit: null,
      itemToDelete: null,
      loading: false,
    }
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch('jobs/get');
    this.loading = false;
  },

  computed: {
    items () {
      console.log(this.$store.getters['jobs/get'])
      return this.$store.getters['jobs/get'];
    }
  },

  methods: {
    openEdit (item) {
      this.edit = item;
      this.formOpen = true;
    },
    async closeForm () {
      this.loading = true;
      await this.$store.dispatch('jobs/get')
      this.edit = null;
      this.formOpen = false;
      this.loading = false;
    },
    openDelete (item) {
      this.itemToDelete = item;
    },
    async confirmDelete () {
      this.loading = true;
      await this.$store.dispatch('jobs/delete', this.itemToDelete.id);
      this.itemToDelete = null;
      this.loading = false;
    },
  }
}
</script>
