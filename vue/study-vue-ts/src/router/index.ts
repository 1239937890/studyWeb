import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/healthy',
      name: 'Healthy',
      component: () => import('@/views/healthy/healthy.vue'),
    },{
      path: '/center',
      name: 'Center',
      component: () => import('@/views/center/center.vue'),
    },{
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/search.vue'),
    },
  ],
});

export default router;
