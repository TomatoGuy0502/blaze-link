import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../pages/Home.vue')
const Links = () => import('../pages/Dashboard/Links/Links.vue')
const Appearance = () => import('../pages/Dashboard/Appearance.vue')
const Dashboard = () => import('../pages/Dashboard/Dashboard.vue')
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')

const routes = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/dashboard',
    component: Dashboard,
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

export default router
