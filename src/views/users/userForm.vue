<template>
  <v-card :loading="loading">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>
        <v-icon class="mb-1">mdi-account-multiple</v-icon>
        {{ edit ? `${edit.id} - ${edit.firstname} ${edit.lastname}` : 'Nouvel utilisateur' }}
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

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.lastname"
                label="Nom"
                :rules="rules.required"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.firstname"
                label="Prénom"
                :rules="rules.required"
              />
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.username"
                label="Username"
                type="text"
                :rules="rules.required"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              
              <v-text-field
                v-model="user.email"
                label="Email"
                type="email"
                :rules="rules.email"
              />
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.password"
                label="Mot de passe"
                type="password"
                :rules="edit ? [] : rules.password"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.password_confirmation"
                label="Confirmation du mot de passe"
                type="password"
                :rules="edit ? [] : rules.password_confirmation"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.phone"
                label="Téléphone"
                :rules="rules.required"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="[
                  { value: 1, text: 'Administrateur' },
                  { value: 2, text: 'Utilisateur' }
                ]"
                label="Role"
                v-model="user.role_id"
                :rules="rules.required"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-image-input
                v-model="user.image"
                :image-quality="1"
                clearable
                image-format="png"
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
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import VImageInput from 'vuetify-image-input/a-la-carte';

export default {
  name: 'UsersForm',
  components: {
    VImageInput
  },
  props: {
    edit: {
      type: Object,
      default: () => {}
    },
  },
  mounted() {
    if (this.edit && this.edit.id) {
      this.user = this.edit
    }
  },
  data () {
    return {
      valid: false,
      loading: false,
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 2,
        phone: '',
        image: null,
      },
      rules: {
        required: [v => !!v || 'Ce champ est requis'],
        email: [value => /.+@.+\..+/.test(value) || 'Veuillez entrer une adresse email valide'],
        password: [value => (value && value.length >= 8) || 'Le mot de passe doit contenir au moins 8 caractères'],
        password_confirmation: [value => !!value || value === this.user.password || 'Les mots de passe ne correspondent pas']
      },
    }
  },
  methods: {
    closeModal () {
      this.loading = true
      this.user = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 2,
        phone: '',
        image: '',
      }

      this.$emit('modal:close')
      this.loading = false
    },
    async save () {
      this.loading = true
      if (!this.$refs.form.validate()) return

      const action = this.edit ? 'edit' : 'create'

      try {
        await this.$store.dispatch(`users/${action}`, this.user)
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