import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [{
    path: '/',
    name: 'Index',
    component: () => import('../view/index.vue'),
}, ]
const router = new VueRouter({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({
        y: 0
    }),
    routes: routes,
});

export default router;