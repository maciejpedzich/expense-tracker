<template>
  <div>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-else>
      <h5 class="text-h5">Edit</h5>
      <v-form
        class="ml-n3"
        v-model="valid"
        @submit.prevent="onSubmit"
        ref="form">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                label="Name"
                v-model="model.name"
                :rules="rules.name"
                required>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                type="number"
                label="Value"
                v-model="model.value"
                :rules="rules.value"
                required
                min="0">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="model.dateAdded"
                transition="scale-transition"
                offset-y
                min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.dateAdded"
                    label="Date added"
                    readonly
                    v-bind="attrs"
                    v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="model.dateAdded"
                  no-title
                  scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(model.dateAdded)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            color="indigo"
            raised
            dark>
            Confirm
          </v-btn>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import environment from '../../environment/index'

export default {
  name: 'EditExpense',
  data () {
    return {
      categoryId: this.$route.params.categoryId,
      expenseId: this.$route.params.expenseId,
      loading: true,
      valid: false,
      menu: false,
      model: null,
      rules: {
        name: [v => !!v || 'This field is required'],
        value: [
          v => !!v || 'This field is required',
          v => v >= 0 || 'Value cannot be lower than 0'
        ]
      }
    }
  },
  async created () {
    const data = await (
      await fetch(
        `${environment.apiURL}/categories/${this.categoryId}/expenses/${this.expenseId}`
      )
    ).json()

    data.dateAdded = new Date(data.dateAdded).toISOString().substr(0, 10)
    this.model = data
    this.loading = false
  },
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        const body = JSON.stringify(this.model)

        await fetch(
          `${environment.apiURL}/categories/${this.categoryId}/expenses/${this.expenseId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body
          }
        )
        this.$router.push(`/categories/${this.$route.params.categoryId}/expenses`)
      }
    }
  }
}
</script>
