<template>
  <div class="mb-6">
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate>
    </v-progress-circular>
    <div v-else>
      <h5 v-if="value.length >= 2" class="text-h5 text-center mb-10">Last week's total expenses</h5>
      <v-sparkline
        type="bar"
        show-labels
        :labels="labels"
        :value="value"
        :label-size="4.5"
        :smooth="2"
        :line-width="10">
      </v-sparkline>
    </div>
  </div>
</template>

<script>
import environment from '../environment/index'

export default {
  name: 'ExpensesChart',
  props: {
    categoryId: String
  },
  data () {
    return {
      loading: true,
      labels: [],
      value: []
    }
  },
  async created () {
    const data = await (
      await fetch(
        `${environment.apiURL}/categories/${this.categoryId}/weekly-chart`
      )
    ).json()

    this.labels = Object.keys(data)
    this.value = Object.values(data)
    this.loading = false
  }
}
</script>
