// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
const service = axios.create({
  //请求优化，定义环境变量实现开发/生产阶段的请求。
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例

function isTimeout() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

//请求拦截器
service.interceptors.request.use(
  // 每次请求的网络配置
  async (config) => {
    //获取token
    const token = store.state.user.token
    //如果有token 说明是登录之后，才给headers加token
    if (token) {
      //登录之后判断是否token过期，主动处理token过期
      if (isTimeout()) {
        //如果token过去，返回登录页
        // console.log('delu')
        //清除token
        await store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('登录过期'))
      } else {
        //如果token没过期，携带token
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config //config 需要return
  },
  // 请求失败的fanhui
  (error) => {
    return Promise.reject(error)
  },
) // 响应拦截器
service.interceptors.response.use(
  (response) => {
    //成功
    const { data, message, success } = response.data
    if (success) {
      return data //如果成功，返回成功数据
    }
    //全局弹窗提示信息
    //如果失败，抛出错误，
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async (error) => {
    //被动处理token过期
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    //错误
    // console.dir(error)
    return Promise.reject(error)
  },
) // 响应拦截器
export default service // 导出axios实例
