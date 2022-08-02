import { login } from '@/api'
export default {
  namespaced: true,
  state: {
    token: '', ///用户token
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload)
      console.log(res)
      //在响应拦截器中已经配置，错误拦截
      commit('setToken', res)
    },
  },
  getters: {},
}
