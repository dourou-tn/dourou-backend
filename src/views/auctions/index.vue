<template>
  <v-data-table
    :headers="headers"
    :items="auctions"
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
          <v-icon class="mb-1">mdi-creation</v-icon>
          Enchères
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="createForm"
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

          <AuctionForm v-if="createForm" @modal:close="closeForm" :edit="edit" />

        </v-dialog>

        <v-dialog
          v-if="auctionToDelete"
          v-model="auctionToDelete"
          persistent
          max-width="393"
        >
          <v-card>
            <v-card-title class="text-h5">
              Supprimer?
            </v-card-title>
            <v-card-text>
              <div>{{ auctionToDelete.id }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="auctionToDelete = null"
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

    <template v-slot:item.product="{item}">
      <span>{{ item.product.name }}</span>
    </template>

     <template v-slot:item.start_date="{item}">
      <span>{{ $moment(item.start_date).format('DD/MM/YYYY HH:mm:ss') }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>


  </v-data-table>
</template>

<script>
import AuctionForm from './auctionForm.vue';

export default {
  name: 'AuctionsIndex',
  components: { AuctionForm },
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
          text: 'Date',
          align: 'left',
          sortable: true,
          value: 'start_date',
        },
        {
          text: 'Produit',
          align: 'left',
          sortable: true,
          value: 'product',
        },
        {
          text: 'Inscription',
          align: 'left',
          sortable: true,
          value: 'subscribe_price'
        },
        {
          text: 'Départ',
          align: 'left',
          sortable: true,
          value: 'start_price'
        },
        {
          text: 'Taille',
          align: 'left',
          sortable: true,
          value: 'max_size'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      createForm: false,
      edit: null,
      auctionToDelete: null,
      loading: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('auctions/fetch');
  },

  computed: {
    auctions () {
      return this.$store.getters['auctions/auctions'];
    }
  },

  methods: {
    editItem (auction) {
      this.edit = auction;
      this.createForm = true;
    },
    closeForm () {
      this.edit = null;
      this.createForm = false;
    },
    deleteItem (auction) {
      this.auctionToDelete = auction;
    },
    async confirmDelete () {
      this.loading = true;
      await this.$store.dispatch('auctions/delete', this.auctionToDelete.id);
      this.auctionToDelete = null;
      this.loading = false;
    },
  }
}
</script>
