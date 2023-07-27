import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export const constantRoutes = [{
    path: '/',
    name: 'Index',
    component: () => import('@/view/index.vue'),
}, ]
const createRouter = ()=> new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes,
});
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
export default router;