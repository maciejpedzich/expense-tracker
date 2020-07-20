<template>
  <div>
    <h1 class="ml-3">Add category</h1>
    <v-form
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
              label="Daily budget"
              v-model="model.budget"
              :rules="rules.budget"
              required
              min="1">
            </v-text-field>
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
</template>

<script>
import environment from '../../environment/index'

export default {
  name: 'AddCategory',
  data () {
    return {
      valid: false,
      model: {
        name: '',
        budget: null
      },
      rules: {
        name: [v => !!v || 'This field is required'],
        budget: [
          v => !!v || 'This field is required',
          v => v >= 1 || 'Daily budget cannot be lower than 1'
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        const body = JSON.stringify(this.model)

        await fetch(
          `${environment.apiURL}/categories`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body
          }
        )
        this.$router.push('/')
      }
    }
  }
}
</script>
