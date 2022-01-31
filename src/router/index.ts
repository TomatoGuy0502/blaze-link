import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/links', component: Home, alias: '/', name: 'Links', meta: { headingChinese: '連結' } },
  { path: '/appearance', component: Home, name: 'Appearance', meta: { headingChinese: '外觀' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
