<template>
  <div>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-else>
      <h1 class="mb-3">Categories</h1>
      <v-expansion-panel v-if="loading.length > 0"></v-expansion-panel>
      <p v-else class="mt-4">
        There are no categories!
        Click the button in the bottom right corner, to add one.
      </p>
    </div>
    <router-link to="/categories/add">
      <v-btn
        color="green"
        class="mb-4"
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
import environment from '../environment/index'

export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      categories: null
    }
  },
  async created () {
    this.categories = await (
      await fetch(`${environment.apiURL}/categories`)
    ).json()
    this.loading = false
  }
}
</script>
