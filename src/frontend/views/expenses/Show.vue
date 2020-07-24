<template>
  <div>
    <v-alert
      v-if="budgetUsed > 100"
      type="error"
      prominent>
      <v-row align="center">
        <v-col class="grow">
          You've exceeded daily budget by {{ budgetUsed - 100 }}%.
          You can click "Edit Category" button, to adjust it.
          And if you still struggle to stay within the budget, how about buying that expensive thing another time
          (or giving it up entirely)...
        </v-col>
        <v-col class="shrink">
          <router-link
            :to="`/categories/${categoryId}/edit`"
            tag="button">
            <v-btn>Edit category</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-alert>
    <h5 class="text-h5 mb-6">{{ name }}</h5>
    <router-link
      :to="`/categories/${$route.params.categoryId}/expenses/add`"
      tag="button">
      <v-btn
        class="mb-6"
        color="green"
        raised
        dark>
        Add expense
      </v-btn>
    </router-link>
    <v-data-table
      :headers="headers"
      :items="expenses"
      :loading="loading"
      :options.sync="options"
      :server-items-length="maxItems"
      class="elevation-3">
      <template v-slot:item.dateAdded="{ item }">
        <span>
          {{ new Date(item.dateAdded) | dateFormat('YYYY-MM-DD') }}
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <span class="ml-lg-n3">
          <router-link
            :to="`/categories/${categoryId}/expenses/${item._id}/edit`"
            tag="button">
            <v-btn icon>
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </router-link>
          <v-btn icon @click.stop="selectExpenseToRemove(item._id)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </span>
      </template>
    </v-data-table>
    <v-dialog
      persistent
      v-model="dialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline">Remove expense</v-card-title>
        <v-card-text>
          Are you sure you want to remove this expense?
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
            @click="removeExpense">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import environment from '../../environment/index'

export default {
  name: 'ShowExpenses',
  data () {
    return {
      name: '',
      dialog: false,
      loading: true,
      options: {},
      expenseToRemove: null,
      maxItems: 0,
      budgetUsed: 0,
      categoryId: this.$route.params.categoryId,
      expenses: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Date added',
          value: 'dateAdded',
          sortable: false
        },
        {
          text: 'Value',
          value: 'value',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  watch: {
    options: {
      async handler () {
        await this.fetchData()
      }
    },
    deep: true
  },
  methods: {
    async fetchData () {
      this.loading = true

      const { page, itemsPerPage } = this.options
      const data = await (
        await fetch(
          `${environment.apiURL}/categories/${this.categoryId}/expenses?currentPage=${page}&pageSize=${itemsPerPage}`
        )
      ).json()

      this.name = data.name
      this.budgetUsed = data.budgetUsed
      this.maxItems = data.maxExpenses
      this.expenses = data.expenses
      this.loading = false
    },
    selectExpenseToRemove (id) {
      this.expenseToRemove = id
      this.dialog = true
    },
    async removeExpense () {
      await fetch(
        `${environment.apiURL}/categories/${this.categoryId}/expenses/${this.expenseToRemove}`,
        { method: 'DELETE' }
      )

      this.dialog = false
      this.fetchData()
    }
  }
}
</script>
