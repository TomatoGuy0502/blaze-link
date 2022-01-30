import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/links', component: Home, alias: '/' },
  { path: '/appearance', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
