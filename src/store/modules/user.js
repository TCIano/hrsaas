import { login, getUserInfo, getUserDetail } from '@/api'
import { resetRouter } from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '', ///用户token
    userInfo: {}, //用户信息
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    //得到用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    //获取用户token
    async getToken({ commit }, payload) {
      const res = await login(payload)
      console.log(res)
      //在响应拦截器中已经配置，错误拦截
      commit('setToken', res)
      //获取登录时间戳
      setTokenTime()
    },
    //获取用户信息
    async getUserInfo(context) {
      //q请求接口
      const userBase = await getUserInfo()
      //拿到用户基本信息里面的用户id
      const userDetail = await getUserDetail(userBase.userId)
      //榜用户信息方法一个对象里
      context.commit('setUserInfo', { ...userBase, ...userDetail })
      //传递用户信息
      return userBase
    },
    //退出
    logout({ commit }) {
      // 把内容置空
      commit('setToken', '')
      commit('setUserInfo', '')
      //退出重置路由
      resetRouter()
      //清除vuex 里面的路由规则
      //{root :true} 拿到的是全局的commit
      commit('permission/setRoutes', [], { root: true })
    },
  },
  getters: {},
}
