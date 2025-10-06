import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '@/views/dashboard.vue'
import health from '@/views/health.vue'
import loginpage from '@/views/loginpage.vue'
import profile from '@/views/profile.vue'
import progress from '@/views/progress.vue'
import socialhub from '@/views/socialhub.vue'
import tasktracker from '@/views/tasktracker.vue'
import timer from '@/views/timer.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: loginpage, meta: { public: true } },
    { path: '/dashboard', component: dashboard },
    { path: '/health', component: health },
    { path: '/profile', component: profile },
    { path: '/progress', component: progress },
    { path: '/social', component: socialhub },
    { path: '/tasks', component: tasktracker },
    { path: '/timer', component: timer },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router