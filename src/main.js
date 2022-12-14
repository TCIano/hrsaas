import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import Print from 'vue-print-nb'
Vue.use(Print)
//引入全局自定义组件
import components from '@/components'
//使用全局组件
Vue.use(components)

//全部引入自定义指令
import * as directives from './directives'
//同意注册自定义指令
//自定义指令，来解决图片加载失败的问题
for (const key in directives) {
  Vue.directive(key, directives[key])
}

// 引入全部过滤器
import * as filters from '@/filters'
//同意注册全部过滤器

for (const key in filters) {
  //处理时间过滤器
  Vue.filter(key, filters[key])
}

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 通过 `i18n` 选项创建 Vue 实例
// new Vue({ i18n }).$mount('#app')
import i18n from '@/i18n'
// 设置element为当前的语言
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App),
})
