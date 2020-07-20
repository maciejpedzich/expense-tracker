<template>
  <div>
    <h1 class="mb-4">Expenses: {{ name }}</h1>
    <v-data-table
      :headers="headers"
      :items="expenses"
      :loading="loading"
      :server-items-length="expenses.length"
      class="elevation-1">
      <template v-slot:item.dateAdded="{ item }">
        <span>
          {{ new Date(item.dateAdded) | dateFormat('YYYY-MM-DD') }}
        </span>
      </template>
    </v-data-table>
    <router-link :to="`/categories/${$route.params.categoryId}/expenses/add`">
      <v-btn
        color="green"
        class="mb-4 mr-n3"
        fab
        dark
        absolute
        bottom
        right>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import environment from '../../environment/index'

export default {
  name: 'ShowCategory',
  data () {
    return {
      name: '',
      loading: true,
      expenses: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Date added',
          value: 'dateAdded'
        },
        {
          text: 'Value',
          value: 'value'
        }
      ]
    }
  },
  async created () {
    const categoryId = this.$route.params.categoryId
    const data = await (
      await fetch(
        `${environment.apiURL}/categories/${categoryId}/expenses`
      )
    ).json()

    this.name = data.name
    this.expenses = data.expenses
    this.loading = false
  }
}
</script>
