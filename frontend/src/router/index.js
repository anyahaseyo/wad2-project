import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/loginpage.vue'
import Dashboard from '@/views/dashboard.vue'
import Profile from '@/views/profile.vue'
import Progress from '@/views/progress.vue'

const routes = [
  { path: '/', redirect: { name: 'Login' } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }, // ⬅️ add this
  { path: '/progress', name: 'Progress', component: Progress, meta: { requiresAuth: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') return next()
  const authed = !!localStorage.getItem('demo_user')
  if (to.meta?.requiresAuth && !authed) return next({ name: 'Login' })
  next()
})

export default router
