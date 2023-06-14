import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Home',
        //如果没有在.d.ts文件中定义，在这里引入路径时加后缀名.vue是会报错的
        component: () => import("../view/home.vue"), 
        children: [
            {
                path: '/news',
                name: 'Hews',
                component: () => import("../view/news/index.vue")
            }
        ]
    },
 
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;