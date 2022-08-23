import dayjs from 'dayjs'
//定义自定义过滤器
//过滤时间
export const filterDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
