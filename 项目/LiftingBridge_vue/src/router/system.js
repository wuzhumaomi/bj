import Layout from '@/views/layout'

 const systemRouter = {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: 'systemManage', icon: 'component' },
    children: [
    // 人员管理
    {
      path: '/personnelManagement',
      name: 'PersonnelManagement',
      component: () => import('@/views/BasicData/personnelManagement'),
      meta: { title: 'personnelManagement', icon: 'nested'}
    },
    {
      path: '/personnelManagementOver',
      name: 'PersonnelManagementOver',
      component: () => import('@/views/BasicData/personnelManagementOver'),
      meta: { title: 'personnelManagementOver', icon: 'component' },
      hidden: true
    },

    // 角色管理
    {
      path: '/rightsManagement',
      name: 'RightsManagement',
      component: () => import('@/views/system/rightsManagement'),
      meta: { title: 'rightsManagement', icon: 'peoples' }
    },
    // 模块管理
    {
      path: '/moduleManagement',
      name: 'ModuleManagement',
      component: () => import('@/views/system/module'),
      meta: { title: 'moduleManage', icon: 'component' }
    },
    // 组织部门
    {
      path: '/organizatDepartment',
      name: 'OrganizatDepartment',
      component: () => import('@/views/BasicData/organizatDet'),
      meta: { title: 'organizatDepartment', icon: 'component' }
    },
    // 通用配置一览
    {
      path: '/generalConfiguratOverview',
      name: 'GeneralConfiguratOverview',
      component: () => import('@/views/BasicData/generalConfiguratOver'),
      meta: { title: 'generalConfiguratOverview', icon: 'component' }
    },
    // 提示信息一览
    {
      path: '/promptInformationOverview',
      name: 'PromptInformationOverview',
      component: () => import('@/views/BasicData/promptInformationOver'),
      meta: { title: 'promptInformationOverview', icon: 'component' }
    },
    // 日志一览
    {
      path: '/logManagement',
      name: 'LogManagement',
      component: () => import('@/views/BasicData/logManagement'),
      meta: { title: 'logManagement', icon: 'component' }
    },
    {
      path: '/logManagementOver',
      name: 'LogManagementOver',
      component: () => import('@/views/BasicData/logManagementOver'),
      meta: { title: 'logManagementOver', icon: 'component' },
      hidden: true
    },
    // 评价等级一览
    {
      path: '/levelManagement',
      name: 'LevelManagement',
      component: () => import('@/views/BasicData/levelManagement'),
      meta: { title: 'levelManagement', icon: 'component' }
    },
    {
      path: '/levelManagementOver',
      name: 'LevelManagementOver',
      component: () => import('@/views/BasicData/levelManagementOver'),
      meta: { title: 'levelManagementOver', icon: 'component' },
      hidden: true
    },    
    // 箱一览
    {
      path: '/caseManagement',
      name: 'CaseManagement',
      component: () => import('@/views/BasicData/caseManagement'),
      meta: { title: 'caseManagement', icon: 'component' }
    },
    ]
  }
export default systemRouter
