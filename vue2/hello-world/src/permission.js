import router from './router';
import store from './store';
import { ElMessage } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  showSpinner: false, // 是否显示加载ico
});
const whiteList = [];

router.beforeEach((to, from, next) => {
  console.log('to>>>>>>>>>>>>>',to)
  console.log('store>>>>>>>>>>>>>',store)
  if (store.state.permission.addRoutes.length === 0) {
    store.dispatch('permission/GenerateRoutes').then((accessRoutes) => {
      console.log('accessRoutes>>>',accessRoutes)
      accessRoutes.forEach((route) => {
        console.log('route>>>routerouterouteroute》》》》》》》》》》》》》》',route)
        router.addRoute(route); // 动态添加可访问路由表
        router.options.routes.push(route);  //（2），添加后才能用模板
        console.log('router》》》》》》》》》》》》》》router',router)
      });
      next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
      console.log('router>>>router>>>>>>>>>>>>>',router)
      next()
    });
  }else{
    next()
  }
});

router.afterEach(() => {
  NProgress.done();
});
