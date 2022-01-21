<template>
  <v-card :loading="loading">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>
        <v-icon class="mb-1">mdi-circle-multiple-outline</v-icon>
        {{ edit ? `${edit.id} - ${edit.name}` : 'Nouveau Pack' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="closeModal">
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

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="pack.name"
                label="Nom du pack"
                :rules="rules.required"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="pack.description"
                label="Description du pack"
                :rules="rules.required"
              />
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                type="number"
                v-model="pack.price"
                label="Prix du pack"
                :rules="rules.required"
                prefix="TND"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                type="number"
                v-model="pack.nbr_tokens"
                label="Nombre de jetons"
                :rules="rules.required"
                hint="Nombre de DOUROU dans le pack"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-color-picker
                v-model="pack.color"
                :swatches="color_swatches"
                show-swatches
                hide-canvas
                hide-inputs
                hide-mode-switch
              ></v-color-picker>
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

  </v-card>
</template>

<script>

export default {
  name: 'PackForm',
  props: {
    edit: {
      type: Object,
      default: () => {}
    },
  },
  mounted() {
    if (this.edit && this.edit.id) {
      this.pack = this.edit
    }
  },
  data () {
    return {
      valid: false,
      loading: false,
      pack: {
        name: '',
        description: '',
        price: '',
        nbr_dourou: '',
        color: '',
      },
      rules: {
        required: [v => !!v || 'Ce champ est requis'],
      },
      color_swatches: [
        ['#4d1a9b', '#15062d'],
        ['#fcd731', '#AB9018'],
        ['#1fd409', '#157908'],
        ['#790808', '#de0d0d'],
        ['#de810d', '#864f0b'],
      ]
    }
  },
  methods: {
    closeModal () {
      this.loading = true
      this.pack = {
        name: '',
        description: '',
        price: '',
        nbr_dourou: '',
        color: '',
      }

      this.$emit('modal:close')
      this.loading = false
    },
    async save () {
      this.loading = true
      if (!this.$refs.form.validate()) return

      const action = this.edit ? 'edit' : 'create'

      try {
        console.log('PACK', this.pack)
        await this.$store.dispatch(`packs/${action}`, this.pack)
        this.closeModal()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  },
}
</script>
