<template>
  <div>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-else>
      <div v-if="expenses.length > 0">
        <h1>Welcome back!</h1>
        <p class="subtitle-1 mb-6">
          Here's an overview of today's expenses so far:
        </p>
        <v-data-table
          :headers="headers"
          :items="expenses"
          :hide-default-footer="true"
          :disable-pagination="true"
          class="elevation-3">
        </v-data-table>
        <h3 class="mt-3">Total value: {{ total }}</h3>
      </div>
      <div v-else>
        <h1 class="mb-2">Welcome!</h1>
        You haven't added any expenses so far today.
        Once you add some, you'll see their overview on this page
      </div>
    </div>
  </div>
</template>

<script>
import environment from '../environment/index'

export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      total: 0,
      expenses: null,
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Value',
          value: 'value',
          sortable: false
        }
      ]
    }
  },
  async created () {
    const data = await (
      await fetch(`${environment.apiURL}/daily-overview`)
    ).json()

    this.total = data.total
    this.expenses = data.expenses
    this.loading = false
  }
}
</script>
