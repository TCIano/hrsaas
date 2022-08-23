//路由权限
import router, { asyncRoutes } from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  //获取用户信息
  if (token) {
    //等待
    if (!store.state.user.userInfo.userId) {
      //拿到h获取到的用户信息里面的 当前用户的权限
      const res = await store.dispatch('user/getUserInfo')
      console.log(res)
      //动态权限处理
      //进行用户的权限处理，把当前用户的路由权限传递给vuex进行过滤
      await store.dispatch('permission/filterRoutes', res.roles)
      //存储按钮权限
      await store.dispatch('permission/setPointAction', res.roles)
      //当处理完成自己维护的路由之后进行下一步跳转
      //防止刷新之后丢失页面，重新触发路由守卫
      next(to.path)
    }
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
