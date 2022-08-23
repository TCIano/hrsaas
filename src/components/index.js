import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import fullScreen from '@/components/fullScreen'
import SvgIcon from '@/components/SvgIcon'
import ToggleLang from '@/components/ToggleLang'
const components = [
  PageTools,
  UploadExcel,
  UploadImg,
  Calendar,
  fullScreen,
  SvgIcon,
  ToggleLang,
]
export default {
  install(Vue) {
    //遍历注册自定义组件
    components.forEach((components) => {
      //components.name 是每个组件的名字，需要给自定义组件设置那么属性
      Vue.component(components.name, components)
    })
  },
}
