import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/healthy',
      name: 'Healthy',
      component: () => import('@/views/health/healthy.vue')
    },
    {
      path: '/center',
      name: 'Center',
      component: () => import('@/views/center.vue')
    }
  ]
})

export default router