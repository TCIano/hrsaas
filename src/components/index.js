import PageTools from '@/components/PageTools'
const components = [PageTools]
export default {
  install(Vue) {
    //遍历注册自定义组件
    components.forEach((components) => {
      //components.name 是每个组件的名字，需要给自定义组件设置那么属性
      Vue.component(components.name, components)
    })
  },
}
