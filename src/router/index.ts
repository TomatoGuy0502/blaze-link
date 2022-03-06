import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useSupabase } from '../composables/useSupabase'
const Home = () => import('../pages/Home.vue')
const Links = () => import('../pages/Dashboard/Links/Links.vue')
const Appearance = () => import('../pages/Dashboard/Appearance.vue')
const Dashboard = () => import('../pages/Dashboard/Dashboard.vue')
const Register = () => import('../pages/Register.vue')
const Login = () => import('../pages/Login.vue')

const routes = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'links', component: Links, alias: '', name: 'Links', meta: { headingChinese: '連結' } },
      {
        path: 'appearance',
        component: Appearance,
        name: 'Appearance',
        meta: { headingChinese: '外觀' }
      }
    ]
  },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const { supabase } = useSupabase()
  console.log(`進入${to.name as string}, authStore.isLoggedIn:`, authStore.isLoggedIn)
  console.log('supabase user:', supabase.auth.user())
  if (!authStore.isLoggedIn && to.matched.some((record) => record.meta.requiresAuth)) {
    return { name: 'Login' }
  }
  if (authStore.isLoggedIn && ['Login', 'Register'].includes(to.name as string)) {
    return { name: 'Links' }
  }
})

export default router
