<template>
  <v-data-table
    :headers="headers"
    :items="products"
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
          <v-icon class="mb-1">mdi-cube-outline</v-icon>
          Produits
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

          <ProductForm v-if="createForm" @modal:close="closeForm" :edit="edit" />

        </v-dialog>

        <v-dialog
          v-if="productToDelete"
          v-model="productToDelete"
          persistent
          max-width="393"
        >
          <v-card>
            <v-card-title class="text-h2 justify-center">
              <v-icon size="50" color="red">mdi-alert</v-icon>
            </v-card-title>
            <v-card-text class="text-center">
              <div>Vous allez supprimer le produit</div>
              <div class="text-h6">{{ productToDelete.name }}</div>
              <v-avatar v-if="productToDelete.image_path">
                <img :src="`http://localhost:5000/${productToDelete.image_path}`" />
              </v-avatar>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="productToDelete = null"
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

    <template v-slot:item.image_path="{item}">
      <v-avatar v-if="item.image_path" size="32">
        <img :src="`http://localhost:5000/${item.image_path}`" />
      </v-avatar>
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
import ProductForm from './productForm.vue';

export default {
  name: 'ProductsIndex',
  components: { ProductForm },
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
          text: 'Image',
          align: 'left',
          sortable: false,
          value: 'image_path',
          width: 32,
        },
        {
          text: 'Nom',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      createForm: false,
      edit: null,
      productToDelete: null,
      loading: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('products/fetch');
  },

  computed: {
    products () {
      return this.$store.getters['products/products'];
    }
  },

  methods: {
    editItem (product) {
      this.edit = product;
      this.createForm = true;
    },
    async closeForm () {
      await this.$store.dispatch('products/fetch');
      this.edit = null;
      this.createForm = false;
    },
    deleteItem (product) {
      this.productToDelete = product;
    },
    async confirmDelete () {
      this.loading = true;
      await this.$store.dispatch('products/delete', this.productToDelete.id);
      this.userToDelete = null;
      this.loading = false;
      this.productToDelete = null;
    },
  }
}
</script>
