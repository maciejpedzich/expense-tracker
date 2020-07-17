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
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/categories/add',
    name: 'AddCategory',
    component: () => import('../views/categories/Add.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
