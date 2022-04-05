import { createRouter, createWebHistory } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useAuthStore } from '../store/auth'
const Home = () => import('../pages/Home.vue')
const Links = () => import('../pages/Dashboard/Links/Links.vue')
const Appearance = () => import('../pages/Dashboard/Appearance.vue')
const Dashboard = () => import('../pages/Dashboard/Dashboard.vue')
const Register = () => import('../pages/Register.vue')
const Login = () => import('../pages/Login.vue')
const Provider = () => import('../pages/Provider.vue')

const routes = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    redirect: { name: 'Links' },
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'links', component: Links, name: 'Links', meta: { headingChinese: '連結' } },
      {
        path: 'appearance',
        component: Appearance,
        name: 'Appearance',
        meta: { headingChinese: '外觀' }
      }
    ]
  },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/auth/provider', component: Provider, name: 'Provider' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const progress = useNProgress()

router.beforeEach(async (to) => {
  progress.start()
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn && to.matched.some((record) => record.meta.requiresAuth)) {
    return { name: 'Login' }
  }
  if (authStore.isLoggedIn && ['Login', 'Register'].includes(to.name as string)) {
    return { name: 'Links' }
  }
})

router.afterEach(() => {
  progress.done()
})

export default router
