<template>
  <v-card :loading="loading">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>
        <v-icon class="mb-1">mdi-cube-outline</v-icon>
        Nouveau Produit
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
      >

        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="product.name"
                label="Nom du produit"
                :rules="[rules.required]"
                validate-on-blur
              />
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                v-model="slug"
                label="Slug"
                :rules="[rules.required]"
                validate-on-blur
                readonly
              />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                type="number"
                v-model="product.price"
                label="Prix du produit"
                :rules="[rules.required]"
                validate-on-blur
                prefix="TND"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6" v-if="edit" class="d-flex flex-column">
              <v-btn
                text
                color="white"
                small
                @click="toggleUpdateImage"
              >
                {{ updateImage ? `Reprendre l'original` : 'Modifier image' }}
              </v-btn>
              <v-img
                v-if="!updateImage"
                :src="`http://localhost:5000/${product.image_path}`"
                aspect-ratio="1"
                max-width="350"
              />
              <v-image-input
                v-else
                v-model="product.image"
                :image-quality="1"
                clearable
                image-format="png"
              />
            </v-col>
            <v-col cols="12" sm="12" md="6" v-else>
              <v-image-input
                v-model="product.image"
                :image-quality="1"
                clearable
                image-format="png"
              />
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="product.price"
                    label="Vendeur"
                    :rules="[rules.required]"
                    validate-on-blur
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <Editor
                v-model="product.description"
              />
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
        @click="saveProduct"
      >
        Save
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import Editor from '@/components/Editor.vue';
import VImageInput from 'vuetify-image-input/a-la-carte';

export default {
  name: 'ProductForm',
  components: {
    VImageInput,
    Editor
  },
  props: {
    edit: {
      type: Object,
      default: () => {}
    },
  },
  mounted() {
    if (this.edit && this.edit.id) {
      this.product = this.edit
    }
  },
  data () {
    return {
      valid: false,
      loading: false,
      product: {
        name: '',
        slug: '',
        description: '',
        image: '',
      },
      rules: {
        required: v => !!v || 'Ce champ est requis',
      },
      updateImage: false,
    }
  },
  methods: {
    closeModal () {
      this.loading = true
      this.product = {
        name: '',
        slug: '',
        description: '',
        image: '',
      }

      this.$emit('modal:close')
      this.loading = false
    },
    async saveProduct () {
      this.loading = true
      if (!this.$refs.form.validate()) return

      const action = this.edit ? 'edit' : 'create'

      try {
        this.product.slug = this.slug
        await this.$store.dispatch(`products/${action}`, this.product)
        this.closeModal()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    toggleUpdateImage () {
      this.product.image = '';
      this.updateImage = !this.updateImage;
    },
  },
  computed: {
    slug () {
      return this.product.name.toLowerCase().replace(/ /g, '-')
    }
  }
}
</script>
