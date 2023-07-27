import {
  constantRoutes
} from '@/router'
import {
  routeSource
} from '@/router/menuConfig'
import ParentView from '@/components/ParentView';
import InnerLink from '@/layout/components/InnerLink';
import {
  deepClone
} from '@/utils';
import Layout from "@/layout"
// require.context参数：1. 文件夹所在位置  2. 是否加载子目录true/false  3. 加载的正则匹配(以.vue为结尾的文件)
const referComponent = require.context('../../view', true, /\.vue$/)
const state = {
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  GenerateRoutes({
    commit
  }) {
    return new Promise(resolve => {
      let accessedRoutes
      //有单独个性化配置的路由
      let clientMap = {};
      const rewriteRoutes = genFrontRouter(routeSource, false, true, clientMap);
      let router = {
        path: '',
        component: Layout,
        redirect: getFirstChildRouterPath(
          JSON.parse(JSON.stringify(routeSource))
        ),
      };
      commit('SET_ROUTES', rewriteRoutes.push(router));
      console.log('rewriteRoutes>>>>>>>>>>>', rewriteRoutes)
      console.log('referComponent>>>>>>>>>>>', referComponent.keys())

      // commit('SET_ROUTES', accessedRoutes)
      resolve(rewriteRoutes)
    })
  }
}

function genFrontRouter(
  asyncRouterMap,
  lastRouter = false,
  type = false,
  clientMap
) {
  //遍历 接口返回来的树结构
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = gentChildren(route.children, false, clientMap);
    }
    //有单独个性化配置的路由
    if (clientMap[route.path]) {
      //转换为个性化的路由
      route.path = clientMap[route.path];
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout;
      } else if (route.component === 'ParentView') {
        route.component = ParentView;
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
        // route.component = route.component
      }
    }
    if (route.meta) {
      route.meta.hidden = route.hidden;
    } else {
      route.meta = {
        hidden: route.hidden,
      };
    }
    if (lastRouter) {
      route.meta.parentPath = lastRouter.path;
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = genFrontRouter(route.children, route, type, clientMap);
      route.redirect = getFirstChildRouterPath(route.children, clientMap);
    } else {
      delete route['children'];
      if (route.saveRedirect) {
        delete route['saveRedirect'];
      } else {
        delete route['redirect'];
      }
    }
    return true;
  });
}

function gentChildren(childrenMap, lastRouter = false, clientMap) {
  let children = [];
  childrenMap.forEach((child, index) => {
    //有单独个性化配置的路由
    if (clientMap[child.path]) {
      //转换为个性化的路由
      child.path = clientMap[child.path];
    }
    if (child.children && child.children.length) {
      if (child.component === 'ParentView' && !lastRouter) {
        child.children.forEach((c) => {
          if (c.children && c.children.length) {
            children = children.concat(gentChildren(c.children, c, clientMap));
            return;
          }
          children.push(c);
        });
        let temp = deepClone(child);
        children.push({
          ...temp,
          ...{
            children: [],
            redirect: getFirstChildRouterPath(temp.children),
            saveRedirect: true,
          },
        });
        return;
      }
    }
    children = children.concat(child);
  });
  return children;
}
/**
 * 获取第一个显式子路由
 * @param children
 * @returns {{path: *, query: any|string}|*}
 */
function getFirstChildRouterPath(children) {
  for (let i = 0; i < children.length; i++) {
    let item = children[i];
    if (
      item.component !== 'Layout' &&
      item.component !== 'ParentView' &&
      item.component !== 'InnerLink' &&
      item.hidden !== true
    ) {
      return {
        path: item.path,
        query: item.query ? JSON.parse(item.query) : '',
      };
    } else if (item.children && item.children.length) {
      return getFirstChildRouterPath(item.children);
    }
  }
}

// export const loadView = (view) => {
//   let res;
//   for (const path in modules) {
//     const dir = path.split('views/')[1].split('.vue')[0];
//     if (dir === view) {
//       res = () => modules[path]();
//     }
//   }
//   return res;
// };
export const loadView = (view) => {
  console.log('view>>>', view)
  let res;
  referComponent.keys().forEach(path => {
    console.log('path>>>', path)
    const dir = path.split('./')[1].split('.vue')[0];
    // res = () => import(`@/view/${view}.vue`)
    res = () => import(`@/view/${dir}.vue`)
    // if (dir === view) {
    //   res = () => import(`@/view/${view}.vue`)
    // }
  })
  console.log('res>>>>>>>>', res)
  // for (const path in modules) {
  //   const dir = path.split('views/')[1].split('.vue')[0];
  //   if (dir === view) {
  //     res = () => modules[path]();
  //   }
  // }
  return res;
};
export default {
  //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
  namespaced: true,
  state,
  mutations,
  actions
}