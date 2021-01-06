import Layout from '@/views/layout'

 const userRouter = {
    path: '/user',
    component: Layout,
    name: 'System',
    meta: { title: 'systemManage', icon: 'peoples' },
    children: [
    {
      path: '/userManage',
      name: 'UserManage',
      component: () => import('@/views/system/user'),
      meta: { title: 'userManage', icon: 'peoples' }
    },
    // {
    //   path: '/class',
    //   name: 'ClassManage',
    //   component: () => import('@/views/system/class'),
    //   meta: { title: 'classManage', icon: 'drag' }
    // },
    // {
    //   path: '/module',
    //   name: 'ModuleManage',
    //   component: () => import('@/views/system/module'),
    //   meta: { title: 'moduleManage', icon: 'example' }
    // },
    {
      path: '/role',
      name: 'RoleManage',
      component: () => import('@/views/system/role'),
      meta: { title: 'roleManage', icon: 'component' }
    }]
  }
export default userRouter
