import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //因为侧边栏自带的路由规则只包含静态的路由，动态路由需要自己维护
    //因此自己维护一个包含静态和动态的路由
    points: [], //按钮权限
  },
  mutations: {
    setRoutes(state, payload) {
      //把静态 动态路由都存起来
      state.routes = [...constantRoutes, ...payload]
    },
    setPoint(state, payload) {
      state.points = payload
    },
  },
  actions: {
    filterRoutes({ commit }, roles) {
      //   console.log(roles.menus)
      //   console.log(asyncRoutes)
      //判断用户用户的权限是否包含 动态路由
      const routes = asyncRoutes.filter((item) => {
        //如果权限在menus中那么返回true 否则false,
        // 返回true 代表满足条件，添加到routes中
        return roles.menus.includes(item.meta.id)
      })
      //   console.log(routes)
      //把动态路由存储到vuex中重新维护的路由里
      commit('setRoutes', routes)
      //动态添加路由，和404
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    //按钮权限
    setPointAction({ commit }, roles) {
      commit('setPoint', roles.points)
    },
  },
}
