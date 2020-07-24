import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    component: () => import('../views/categories/Index.vue'),
    children: [
      {
        path: '',
        name: 'ShowCategories',
        component: () => import('../views/categories/Show.vue')
      },
      {
        path: 'add',
        name: 'AddCategory',
        component: () => import('../views/categories/Add.vue')
      },
      {
        path: ':categoryId/edit',
        name: 'EditCategory',
        component: () => import('../views/categories/Edit.vue')
      }
    ]
  },
  {
    path: '/categories/:categoryId/expenses',
    component: () => import('../views/expenses/Index.vue'),
    children: [
      {
        path: '',
        name: 'ShowExpenses',
        component: () => import('../views/expenses/Show.vue')
      },
      {
        path: 'add',
        name: 'AddExpense',
        component: () => import('../views/expenses/Add.vue')
      },
      {
        path: ':expenseId/edit',
        name: 'EditExpense',
        component: () => import('../views/expenses/Edit.vue')
      }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
