<template>
  <div>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-else>
      <h1 class="mb-3">Categories</h1>
      <v-expansion-panels v-if="categories.length > 0">
        <v-expansion-panel
          v-for="(category, i) in categories"
          :key="i">
          <v-expansion-panel-header>
            {{ category.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="text-h6">Budget: {{ category.budget }}</p>
            <router-link :to="`/categories/${category._id}`" tag="button">
              <v-btn
                color="indigo"
                small
                dark
                raised>
                Expenses
              </v-btn>
            </router-link>
            <v-btn
              class="ml-2"
              color="orange"
              small
              dark
              raised>
              Edit
            </v-btn>
            <v-btn
              class="ml-2"
              color="red"
              small
              dark
              raised>
              Remove
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <p v-else class="mt-4">
        There are no categories!
        Click the button in the bottom right corner, to add one.
      </p>
    </div>
    <router-link to="/categories/add">
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
    const data = await (
      await fetch(`${environment.apiURL}/categories`)
    ).json()

    this.categories = data
    this.loading = false
  }
}
</script>
