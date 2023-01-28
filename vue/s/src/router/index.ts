import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/todo',
            component: () => import('../pages/todo/index.vue')
        }
    ]
})


export default router
