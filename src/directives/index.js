import store from '@/store'
//自定义指令集合
export const imgError = {
  // 图片插入页面时候触发
  inserted(ele, { value }) {
    if (!ele.src) {
      ele.src = value
    } else {
      //监听图片加载失败事件
      ele.onerror = () => {
        ele.src = value
      }
    }
  },

  //元素更新时候触发
  update(ele, { value }) {
    if (!ele.src) {
      ele.src = value
    }
  },
}

//自定义指令处理动态按钮权限
export const isHasBtnPermission = {
  inserted(el, binding) {
    // console.log(el, binding)
    //判断权限列表是否存该在权限
    const isHas = store.state.permission.points.includes(binding.value)
    if (!isHas) {
      //如果不存在就删除该元素
      el.remove()
    }
    //如果存在不处理
  },
}
