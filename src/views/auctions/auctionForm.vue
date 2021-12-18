<template>
  <v-card :loading="loading">
    <v-toolbar flat dark>
      <v-toolbar-title>
        <v-icon class="mb-1">mdi-creation</v-icon>
        Nouvelle Enchère
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        dark
        @click="closeModal"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >

        <v-container>
          <v-row class="justify-center">
            <v-col cols="6" sm="12" md="6">
              <v-date-picker
                v-model="auction.start_date"
                full-width
                locale="fr"
                first-day-of-week="1"
                color="primary"
                :rules="[rules.required]"
              ></v-date-picker>
            </v-col>
            <v-col cols="6" sm="12" md="6">
              <v-time-picker
                v-model="auction.start_time"
                format="24hr"
                full-width
                color="primary"
                :rules="[rules.required]"
              ></v-time-picker>
            </v-col>
          </v-row>


          <v-row class="justify-center">
            <v-col cols="9" sm="6" md="6">
              <v-autocomplete
                v-model="auction.product"
                :loading="loading"
                :items="products"
                label="Produit de l'enchère"
                solo-inverted
                color="primary"
                return-object
                :rules="[rules.required]"
                item-text="name"
                item-id="id"
              >
                <template v-slot:item="{ item }">
                  <v-avatar v-if="item.image_path" size="32" class="mr-3">
                    <img :src="`http://localhost:5000/${item.image_path}`" />
                  </v-avatar>
                  <span v-text="item.name"></span>
                </template>

                <template v-slot:selection="{ item }">
                  <v-avatar v-if="item.image_path" size="32" class="mr-3">
                    <img :src="`http://localhost:5000/${item.image_path}`" />
                  </v-avatar>
                  <span v-text="item.name"></span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="3">
              <v-text-field readonly solo-inverted v-model="productPrice"/>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-text-field type="number" label="Participation" v-model="auction.subscribe_price" :rules="[rules.required]"/>
            </v-col>
            <v-col cols="4">
              <v-text-field type="number" label="Prix de départ" v-model="auction.start_price" :rules="[rules.required]"/>
            </v-col>
            <v-col cols="4">
              <v-text-field type="number" label="Nbr de participants" v-model="auction.max_size" :rules="[rules.required]"/>
            </v-col>
          </v-row>
        </v-container>

      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="red darken-1"
        text
        @click="closeModal"
      >
        Cancel
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>

    <pre>
      {{ edit }}
    </pre>
  </v-card>
</template>

<script>

export default {
  name: 'AuctionForm',

  props: {
    edit: {
      type: Object,
      default: () => {}
    },
  },
  async mounted() {
    this.loading = true
    await this.$store.dispatch('products/fetch');
    if (this.edit && this.edit.id) {
      this.auction = this.edit
    }
    this.loading = false
  },
  data () {
    return {
      valid: false,
      loading: false,
      auction: {
        start_date: '',
        start_time: '',
        product: {},
        subscribe_price: '',
        start_price: '',
        max_size: '',
      },
      rules: {
        required: v => !!v || 'Ce champ est requis',
      },
    }
  },
  computed: {
    products() {
      return this.$store.getters['products/products']
    },
    productPrice () {
      if (this.auction.product) {
        console.log(this.auction.product)
        return this.auction.product.price
      }
      return 0;
    }
  },
  methods: {
    closeModal () {
      this.loading = true
      this.auction =  {
        start_date: '',
        product: null,
        subscribe_price: '',
        start_price: '',
        max_size: '',
      }

      this.edit =  {
        start_date: '',
        product: null,
        subscribe_price: '',
        start_price: '',
        max_size: '',
      }

      this.$emit('modal:close')
      this.loading = false
    },
    async save () {
      if (!this.$refs.form.validate()) return

      this.loading = true
      const action = this.edit ? 'edit' : 'create'

      try {
        await this.$store.dispatch(`auctions/${action}`, this.auction)
        this.closeModal()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
}
</script>