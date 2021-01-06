import Layout from '@/views/layout'
 const salesDepartRouter = {
    path: '/salesDepart',
    component: Layout,
    name: 'SalesDepart',
    redirect: 'noredirect',
    meta: { title: 'SalesDepart', icon: 'nested'},
    children: [
    {
      path: '/salesOrder',
      name: 'SalesOrder',
      component: () => import('@/views/salesDepart/salesOrder'),
      meta: { title: 'salesOrder', icon: 'nested' }
    },
    {
      path: '/createOrder/:0',
      hidden: true,
      name: 'CreateOrder',
      component: () => import('@/views/salesDepart/salesOrderOperation/create'),
      meta: { title: 'createOrder', icon: 'component' }
    },
    {
      path: '/createOrder/:1',
      hidden: true,
      name: 'CreateOrder',
      component: () => import('@/views/salesDepart/salesOrderOperation/create'),
      meta: { title: 'createOrder', icon: 'component' }
    },
    {
      // path: '/createOrderChild/:id',
      path: '/createOrderChild/:xxx',
      name: 'CreateOrderInfo',
      hidden: true,
      component: () => import('@/views/salesDepart/components/createOrderChild'),
      meta: { title: 'createOrderInfo', icon: 'component'}
    },
    {
      path: '/generateContact/:xxx',
      name: 'GenerateContact',
      hidden: true,
      component: () => import('@/views/salesDepart/salesOrderOperation/generateContact'),
      meta: { title: 'generateContact', icon: 'component'}
    },
    {
      path: '/generateContactChild/:xxx',
      name: 'GenerateContactInfo',
      hidden: true,
      component: () => import('@/views/salesDepart/salesOrderOperation/components/generateContactChild'),
      meta: { title: 'generateContactInfo', icon: 'component'}
    },
    {
      path: '/contractSale',
      name: 'ContractSale',
      component: () => import('@/views/salesDepart/contractSale'),
      meta: { title: 'contractSale', icon: 'nested' }
    },
    {
      path: '/salesSampleRoom',
      name: 'SalesSampleRoom',
      component: () => import('@/views/salesDepart/salesSampleRoom'),
      meta: { title: 'salesSampleRoom', icon: 'nested' }
    },

    ]
  }
export default salesDepartRouter
