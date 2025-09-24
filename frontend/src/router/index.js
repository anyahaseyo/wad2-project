import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '@/views/dashboard.vue'
import habits from '@/views/habits.vue'
import timer from '@/views/timer.vue'
import calendar from '@/views/calendar.vue'
import friends from '@/views/friends.vue'
import login from '@/views/loginpage.vue' 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: login, meta: { public: true } }, // optional
    { path: '/dashboard', component: dashboard },
    { path: '/habits', component: habits },
    { path: '/timer', component: timer },
    { path: '/calendar', component: calendar },
    { path: '/friends', component: friends },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
