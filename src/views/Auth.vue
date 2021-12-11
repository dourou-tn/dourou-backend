<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form v-model="valid" ref="form" >
          <v-row>
            <v-col>
              <v-text-field
                label="E-mail adresse"
                v-model="user.email"
                append-icon="mdi-email"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="Mot de passe"
            v-model="user.password"
            min="8"
            append-icon="mdi-eye-off"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-layout>
            <v-btn
              @click="login"
              class="primary mt-5"
              :style="{ width: '100%' }"
            >
              Login
            </v-btn>
          </v-layout>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'AuthPage',

  data: () => ({
    valid: false,
    loading: false,
    user: { email: '', password: '' },
    errors: [],
    invalidForm: true,
    emailRules: [
      (v) => !!v || 'Le mail est obligatoire',
      /* eslint-disable no-useless-escape */
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail pas valide'
    ],
    passwordRules: [
      (v) => !!v || 'Mot de passe obligatoire',
    ],
  }),
  watch: {
    user: {
      deep: true,
      immediate: true,
      handler (nv) {
        const { email, password } = nv
        this.errors = []
        this.invalidForm = true
        if (email.length !== 0 && password.length !== 0) {
          this.invalidForm = false
        }
      }
    }
  },
  methods: {
    async login () {
      this.$refs.form.validate()
      if (!this.valid) return
      const credentials = { email: this.user.email, password: this.user.password };
      const res = await this.$store.dispatch('auth/login', credentials);
      if (res) {
        this.$router.push({ name: 'HomePage' })
      }
    }
  }
}
</script>
