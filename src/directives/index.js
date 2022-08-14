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
