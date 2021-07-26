import { asyncRouterMap, constantRouterMap, itsmRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterAsyncRouterOpcc(routerMap, menus) {
  let mode = process.env.NODE_ENV;
  // 生产环境下 进行匹配处理
  if (mode && (mode === 'production' || mode === 'testccb' || mode === 'testccbvt') && menus && menus.length > 0) {
    let opccMenuList = getMenusList(menus);
    // console.log('服务端所有的菜单路由信息（横向）如下');
    // console.log(opccMenuList);
    // console.log('服务端所有的菜单路由信息（树状）如下');
    // console.log(menus);
    // console.log('本地路由表信息如下');
    // console.log(routerMap);
    let accessedRoutersOpcc = routerMap.filter(route => {
      if (isEnableMenuOpcc(route, opccMenuList)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouterOpcc(route.children, menus)
        }
        return true
      }
      return false
    });
    return accessedRoutersOpcc;
  }
  // 开发模式下 直接返回全部菜单
  // 这句很危险 后期一定要处理掉 !
  // 否则会导致没有服务端菜单信息会刷出所有的菜单信息
  if (mode && mode === 'development' || mode === 'testhx') {
    console.log('当前环节为', mode);
    return routerMap;
  }
}

function getMenusList(menus) {
  let returnMenuList = [];
  menus.map((item, index) => {
    if (item) {
      returnMenuList.push(item.menuUrl);
      if (item.children) {
        returnMenuList = returnMenuList.concat(getMenusList(item.children));
      }
    }
  });
  return returnMenuList;
};

const testArrs = [
  { menuUrl: '/', children: [ { menuUrl: '/index0' }, { menuUrl: '/index1', children: [ { menuUrl: '/index1/index1' } ] } ] },
  { menuUrl: '/', children: [ { menuUrl: '/index2', children: [ { menuUrl: '/index2/index2' } ] } ] },
  { menuUrl: '/', children: [ { menuUrl: '/index3', children: [ { menuUrl: '/index3/index3' } ] } ] }
]

function isEnableMenuOpcc(route, menus) {
  let returnFlag = false;
  menus.map((item, index) => {
    if (item === route.path) {
      returnFlag = true;
    }
  });
  return returnFlag;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERS_OPCC: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
      // console.log('state中的路由如下');
      // console.log(state.addRouters);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    // 根据传入的菜单列表 动态调整路由加载
    GenerateRoutesOpcc({ commit }, menus) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouterOpcc(asyncRouterMap, menus)
        // console.log('形成的菜单路由如下');
        // console.log(accessedRouters);
        commit('SET_ROUTERS_OPCC', accessedRouters)
        resolve()
      })
    },
    GenerateRoutesItsm({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', itsmRouterMap);
        resolve()
      })
    }
  }
}

export default permission
