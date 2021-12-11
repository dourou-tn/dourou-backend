<template>
  <v-card :loading="loading">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>Nouvel utilisateur</v-toolbar-title>
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
                :rules="rules.password"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.password_confirmation"
                label="Confirmation du mot de passe"
                type="password"
                :rules="rules.password_confirmation"
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
        @click="saveUser"
      >
        Save
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'UsersForm',
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
        phone: ''
      },
      rules: {
        required: [v => !!v || 'Ce champ est requis'],
        email: [value => /.+@.+\..+/.test(value) || 'Veuillez entrer une adresse email valide'],
        password: [value => value.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'],
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
        phone: ''
      }

      this.$emit('modal:close')
      this.loading = false
    },
    async saveUser () {
      this.loading = true
      if (!this.$refs.form.validate()) return

      try {
        await this.$store.dispatch('users/create', this.user)
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