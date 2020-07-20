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
    path: '/categories/add',
    name: 'AddCategory',
    component: () => import('../views/categories/Add.vue')
  },
  {
    path: '/categories/:categoryId',
    name: 'ShowCategory',
    component: () => import('../views/categories/Show.vue')
  },
  {
    path: '/categories/:categoryId/expenses/add',
    name: 'AddExpense',
    component: () => import('../views/expenses/Add.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
