import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: { id: 'departments' },

  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      // title作为语言包routes中的key
      meta: { title: '组织架构', icon: 'tree' },
    },
  ],
}
