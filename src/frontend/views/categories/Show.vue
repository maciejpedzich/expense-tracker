<template>
  <div>
    <router-link to="/categories/add" tag="button">
      <v-btn
        class="mb-6"
        color="green"
        raised
        dark>
        Add category
      </v-btn>
    </router-link>
    <v-expansion-panels v-if="categories.length > 0">
      <v-expansion-panel
        v-for="(category, i) in categories"
        :key="i">
        <v-expansion-panel-header>
          {{ category.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <WeeklyChart :categoryId="category._id" />
          <router-link
            :to="`/categories/${category._id}/expenses`"
            tag="button">
            <v-btn
              color="indigo"
              small
              dark
              raised>
              Expenses
            </v-btn>
          </router-link>
          <router-link
            :to="`/categories/${category._id}/edit`"
            tag="button">
            <v-btn
              class="ml-2"
              color="orange"
              small
              dark
              raised>
              Edit
            </v-btn>
          </router-link>
          <v-btn
            class="ml-2 mt-xs-2"
            color="red"
            @click.stop="selectCategoryToRemove(category._id)"
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
      Click the "Add Category" button, to add one.
    </p>
    <v-dialog
      persistent
      v-model="dialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline">Remove category</v-card-title>
        <v-card-text>
          Are you sure you want to remove this category?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="removeCategory">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import environment from '../../environment/index'
import WeeklyChart from '../../components/WeeklyChart'

export default {
  name: 'ShowCategories',
  components: {
    WeeklyChart
  },
  data () {
    return {
      dialog: false,
      loading: true,
      categories: [],
      categoryToRemove: null
    }
  },
  async created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const data = await (
        await fetch(`${environment.apiURL}/categories`)
      ).json()

      this.categories = data
      this.loading = false
    },
    selectCategoryToRemove (id) {
      this.categoryToRemove = id
      this.dialog = true
    },
    async removeCategory () {
      await fetch(
        `${environment.apiURL}/categories/${this.categoryToRemove}`,
        { method: 'DELETE' }
      )

      this.dialog = false
      this.fetchData()
    }
  }
}
</script>
