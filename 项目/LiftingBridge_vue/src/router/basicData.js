import Layout from '@/views/layout'

 const basicDataRouter = {
    path: '/BasicDataManagement',
    component: Layout,
    name: 'BasicDataManagement',
    meta: { title: 'BasicDataManagement', icon: 'component' },
    children: [{
      path: '/classificationGoods',
      name: 'ClassificationGoods',
      component: () => import('@/views/BasicData/classificationGoods'),
      meta: { title: 'classificationGoods', icon: 'component' }
    },
    {
      path: '/classificationGoodsOver',
      name: 'ClassificationGoodsOver',
      component: () => import('@/views/BasicData/classificationGoodsOver'),
      meta: { title: 'classificationGoodsOver', icon: 'component' },
      hidden: true
    },
    {
      path: '/commodityManagement',
      name: 'CommodityManagement',
      component: () => import('@/views/BasicData/commodityManagement'),
      meta: { title: 'commodityManagement', icon: 'component' }
    },
    {
      path: '/commodityManagementOver',
      name: 'CommodityManagementOver',
      component: () => import('@/views/BasicData/commodityManagementOver'),
      meta: { title: 'commodityManagement', icon: 'component' },
      hidden: true
    },
    // {
    //   path: '/positionManagement',
    //   name: 'PositionManagement',
    //   component: () => import('@/views/BasicData/positionManagement'),
    //   meta: { title: 'positionManagement', icon: 'peoples' }
    // },
    // 仓库一览
    {
    path: '/whList',
    name: 'WhList',
    component: () => import('@/views/Warehouse/whList'),
    meta: { title: 'whlist', icon: 'component' }
    },
    // 库位一览
    {
    path: '/locationList',
    name: 'LocationList',
    component: () => import('@/views/Warehouse/locationList'),
    meta: { title: 'locationlist', icon: 'component' }
    },
    // 客户一览
    {
    path: '/customerlist',
    name: 'customerlist',
    component: () => import('@/views/Customerment/customInfo'),
    meta: { title: 'customerlist', icon: 'component' }
    },
    // 供应商一览
    {
    path: '/supplierlist',
    name: 'supplierlist',
    component: () => import('@/views/Supplier/supplier'),
    meta: { title: 'supplierlist', icon: 'component' }
    },
    {
      path: '/outFactoryManagement',
      name: 'OutFactoryManagement',
      component: () => import('@/views/BasicData/outFactoryManagement'),
      meta: { title: 'outFactoryManagement', icon: 'component' }
    },
    {
      path: '/outFactoryManagementOver',
      name: 'OutFactoryManagementOver',
      component: () => import('@/views/BasicData/outFactoryManagementOver'),
      meta: { title: 'outFactoryManagementOver', icon: 'component' },
      hidden: true
    },
    {
      path: '/logisticsCoManagement',
      name: 'LogisticsCoManagement',
      component: () => import('@/views/BasicData/logisticsCoManagement'),
      meta: { title: 'logisticsCoManagement', icon: 'component' }
    },
    {
      path: '/logisticsCoManagementOver',
      name: 'LogisticsCoManagementOver',
      component: () => import('@/views/BasicData/logisticsCoManagementOver'),
      meta: { title: 'logisticsCoManagementOver', icon: 'component' },
      hidden: true
    },

    ]
  }
export default basicDataRouter
