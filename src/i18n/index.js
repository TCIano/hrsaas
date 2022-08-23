import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
//抽离语言包

import en from './messages/en'
import zh from './messages/zh'
Vue.use(VueI18n)
// 准备翻译的语言环境信息
export const messages = {
  en,
  zh,
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'zh', // 设置地区
  messages, // 设置地区信息
})
// console.dir(Vue.$t)
export default i18n
