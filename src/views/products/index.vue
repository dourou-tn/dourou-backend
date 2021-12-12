<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="id"
      class="elevation-0"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            <v-icon class="mb-1">mdi-cube-outline</v-icon>
            Liste des Produits
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
              <v-card-title class="text-h5">
                Supprimer?
              </v-card-title>
              <v-card-text>
                <div>{{ productToDelete.name }}</div>
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
          </v-dialog>

        </v-toolbar>
      </template>

      <!-- <template v-slot:item.avatar="{item}">
        <v-avatar v-if="item.image_url" size="32">
          <img :src="`http://localhost:5000/${item.image_url}`" />
        </v-avatar>
      </template> -->

      <!-- <template v-slot:item.name="{item}">
        <span>{{ item.lastname }} {{ item.firstname }}</span>
      </template>

      <template v-slot:item.role_id="{item}">
        <v-chip small :color="item.role_id === 1 ? 'primary' : 'secondary' ">
          {{ item.role_id === 1 ? 'Admin' : 'User' }}
        </v-chip>
      </template> -->

      <!-- <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editUser(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteUser(item)"
        >
          mdi-delete
        </v-icon>
      </template> -->

    </v-data-table>
  </div>
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
          text: 'Nom',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Image',
          align: 'left',
          sortable: true,
          value: 'img'
        },
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
    // editUser (user) {
    //   this.edit = user;
    //   this.createUserForm = true;
    // },
    closeForm () {
      this.edit = null;
      this.createForm = false;
    },
    // deleteUser (user) {
    //   this.userToDelete = user;
    // },
    async confirmDelete () {
      this.loading = true;
      await this.$store.dispatch('products/delete', this.productToDelete.id);
      this.userToDelete = null;
      this.loading = false;
    },
  }
}
</script>
