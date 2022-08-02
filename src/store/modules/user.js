import { login, getUserInfo, getUserDetail } from '@/api'
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
    },
    //获取用户信息
    async getUserInfo(context) {
      //q请求接口
      const userBase = await getUserInfo()
      const userDetail = await getUserDetail(userBase.userId)
      //榜用户信息方法一个对象里
      context.commit('setUserInfo', { ...userBase, ...userDetail })
    },
  },
  getters: {},
}
