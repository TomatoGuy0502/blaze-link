import { createRouter, createWebHistory } from 'vue-router'
import Links from '../pages/Links.vue'
import Appearance from '../pages/Appearance.vue'

const routes = [
  { path: '/links', component: Links, alias: '/', name: 'Links', meta: { headingChinese: '連結' } },
  { path: '/appearance', component: Appearance, name: 'Appearance', meta: { headingChinese: '外觀' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
