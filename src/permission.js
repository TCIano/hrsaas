//路由权限
import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //1.登录
    //是否进入登录页
    if (to.path === '/login') {
      //是要进入登录页,则让他保持不变，不可以跳到登录页
      next('/')
    } else {
      //要进入的不是登录页就放行
      next()
    }
  } else {
    //2.没有登录
    // 访问的是否在白名单中
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 如果访问的白名单就放行
      next()
    } else {
      //访问的不是白名单，禁止跳转
      next('/login')
    }
  }
})
