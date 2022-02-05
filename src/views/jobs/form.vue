<template>
  <v-card :loading="loading">
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>
        <v-icon class="mb-1">mdi-robot</v-icon>
        {{ edit ? `${item.uiid}` : 'Nouveau Job' }}
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
        readonly
      >

        <v-container>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="item.type"
                :items="jobTypes"
                item-text="name"
                :rules="rules.required"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="item.state"
                :items="jobStates"
                item-text="name"
                :rules="rules.required"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="JOB start date"
                v-model="jobData.start_date"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="AUCTION start date"
                v-model="auction.start_date"
              >
              </v-text-field>
            </v-col>
          </v-row>

           <v-row>
            <v-col cols="12">
              <v-text-field
                label="Produit de l'enchère"
                v-model="auction.product.name"
              >
              </v-text-field>
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
import moment from 'moment';

export default {
  name: 'JobForm',
  props: {
    edit: {
      type: Object,
      default: () => {}
    },
  },
  async mounted() {
    await this.$store.dispatch('jobs/getTypes');
    await this.$store.dispatch('jobs/getStates');
    if (this.edit && this.edit.id) {
      this.item = this.edit
      this.jobData = JSON.parse(this.item.data);
      this.jobData.start_date = this.moment(this.jobData.start_date).format('DD/MM/YYYY HH:mm:ss');
      this.auction = await this.$store.dispatch('auctions/show', this.jobData.auction_id);
      this.auction.product = JSON.parse(this.auction.product);
    }
  },
  data () {
    return {
      moment: moment,
      valid: false,
      loading: false,
      item: {
        data: {},
      },
      jobData: {
        auction_id: null,
        start_date: null,
      },
      auction: {
        start_date: null,
        product: {
          name: null,
        },
      },
      rules: {
        required: [v => !!v || 'Ce champ est requis'],
      },
      
    }
  },
  computed: {
    jobTypes() {
      return this.$store.getters['jobs/getTypes'];
    },
    jobStates() {
      return this.$store.getters['jobs/getStates'];
    },
    auctions () {
      return this.$store.getters['auctions/auctions'];
    }
  },
  methods: {
    closeModal () {
      this.loading = true
      this.item = {}

      this.$emit('modal:close')
      this.loading = false
    },
    async save () {
      // this.loading = true
      // if (!this.$refs.form.validate()) return

      // const action = this.edit ? 'edit' : 'create'

      // try {
      //   console.log('PACK', this.pack)
      //   await this.$store.dispatch(`packs/${action}`, this.pack)
      //   this.closeModal()
      // } catch (e) {
      //   console.error(e)
      // } finally {
      //   this.loading = false
      // }
    }
  },
}
</script>
