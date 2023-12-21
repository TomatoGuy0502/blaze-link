import { createRouter, createWebHistory } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useAuthStore } from '../store/auth'
const Links = () => import('../pages/Dashboard/Links/Links.vue')
const Appearance = () => import('../pages/Dashboard/Appearance.vue')
const Dashboard = () => import('../pages/Dashboard/Dashboard.vue')
const Register = () => import('../pages/Register.vue')
const Login = () => import('../pages/Login.vue')
const Provider = () => import('../pages/Provider.vue')
const UserLink = () => import('../pages/UserLink.vue')

const routes = [
  { path: '/', redirect: '/dashboard' },
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
  { path: '/auth/provider', component: Provider, name: 'Provider' },
  { path: '/:userName', component: UserLink, name: 'UserLink', props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const progress = useNProgress(null, {
  minimum: 0.2,
  easing: 'ease',
  speed: 300
})

router.beforeEach(async (to) => {
  // if going to a user link, juut go
  if (to.name === 'UserLink') return

  progress.start()
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn && to.matched.some((record) => record.meta.requiresAuth)) {
    return { name: 'Login' }
  }
  if (authStore.isLoggedIn && ['Login', 'Register'].includes(to.name as string)) {
    return { name: 'Links' }
  }
  // FIXME: Even when going to /dashboard, it still redirects to /auth/provider first
  if (authStore.isLoggedIn && to.name !== 'Provider' && !authStore.userName) {
    return { name: 'Provider' }
  }
})

router.afterEach(() => {
  progress.done()
})

export default router
