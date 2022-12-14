import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  name: '中文',
  dashboard: {
    calendar: '工作日历',
  },
  ...zhLocale,
  routes: {
    Dashboard: '首页',
    审批: '审批',
    考勤: '考勤',
    组织架构: '组织架构',
    员工: '员工',
    权限管理: '权限管理',
    工资: '工资',
    公司设置: '公司设置',
    社保: '社保',
  },
}
