import Vue from 'vue'
import VueRouter from 'vue-router'
import Sequell from '../views/Sequell.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sequell',
    component: Sequell
  }
]

const router = new VueRouter({
  routes
})

export default router
