import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'English',
  dashboard: {
    calendar: 'Work Calendar',
  },
  ...enLocale,
  routes: {
    Dashboard: 'dashboard',
    审批: 'approvals',
    考勤: 'attendances',
    组织架构: 'departments',
    员工: 'employees',
    权限管理: 'permissions',
    工资: 'salarys',
    公司设置: 'settings',
    社保: 'social_securitys',
  },
}
