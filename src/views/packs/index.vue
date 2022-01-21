<template>
  <v-data-table
    :headers="headers"
    :items="packs"
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
          <v-icon class="mb-1">mdi-circle-multiple-outline</v-icon>
          Dourou Packs
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <!-- modal create -->
        <v-dialog
          v-model="createPackForm"
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
              Ajouter un pack
            </v-btn>
          </template>

          <PackForm v-if="createPackForm" @modal:close="closeForm" :edit="edit" />

        </v-dialog>

        <!-- modal delete -->
        <v-dialog
          v-if="packToDelete"
          v-model="packToDelete"
          persistent
          max-width="393"
        >
          <v-card>
            <v-card-title class="text-h5">
              Supprimer?
            </v-card-title>
            <v-card-text>
              <div>{{ packToDelete.name }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="packToDelete = null"
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
        </v-dialog>

      </v-toolbar>
    </template>


    <template v-slot:item.name="{item}">
      <span>{{ item.name }}</span>
    </template>

    <template v-slot:item.color="{item}">
      <div :style="`width: 20px; height:20px; background-color: ${item.color}`" ></div>
    </template>


    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editPack(item)" v-text="'mdi-pencil'" />
      <v-icon @click="deletePack(item)" small v-text="'mdi-delete'" />
    </template>

  </v-data-table>
</template>

<script>
import PackForm from './packForm.vue';

export default {
  name: 'PackPage',
  components: { PackForm },
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id',
          width: 32,
        },
        {
          text: '',
          align: 'left',
          value: 'color',
        },
        {
          text: 'Pack',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Prix',
          align: 'left',
          sortable: true,
          value: 'price'
        },
        {
          text: 'Nbr Dourou',
          align: 'left',
          sortable: true,
          value: 'nbr_tokens'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      createPackForm: false,
      edit: null,
      packToDelete: null,
      loading: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('packs/fetch');
  },

  computed: {
    packs () {
      console.log(this.$store.getters['packs/packs']);
      return this.$store.getters['packs/packs'];
    }
  },

  methods: {
    editPack (pack) {
      this.edit = pack;
      this.createPackForm = true;
    },
    async closeForm () {
      this.loading = true;
      await this.$store.dispatch('packs/fetch')
      this.edit = null;
      this.createPackForm = false;
      this.loading = false;
    },
    deletePack (user) {
      this.packToDelete = user;
    },
    async confirmDelete () {
      this.loading = true;
      await this.$store.dispatch('packs/delete', this.packToDelete.id);
      this.packToDelete = null;
      this.loading = false;
    },
  }
}
</script>
