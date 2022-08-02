// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  //请求优化，定义环境变量实现开发/生产阶段的请求。
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(
  // 每次请求的网络配置
  (config) => {
    // const { data } = config.data;
    // console.log(data);
    //获取token
    const token = store.state.user.token
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // console.log(config);
    return config
  },
  // 请求失败的fanhui
  (error) => {
    return Promise.reject(error)
  },
) // 请求拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response)
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
  (error) => {
    //错误
    Message.error('系统异常')
    return Promise.reject(error)
  },
) // 响应拦截器
export default service // 导出axios实例
