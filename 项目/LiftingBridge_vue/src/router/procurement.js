import Layout from '@/views/layout'

const procurementRouter = {
  path: '/ProcurementCommitteeManagement',
  component: Layout,
  name: 'ProcurementCommitteeManagement',
  meta: { title: 'ProcurementCommitteeManagement', icon: 'component' },
      children: [
        {
          path: '/purchaseOrder',
          component: () => import('@/views/Supplier/supplierEdit'),
          name: 'PurchaseOrder',
          meta: { title: 'purchaseOrder', icon: '' }
        },
        {
          path: '/purchaseSale',
          name: 'PurchaseSale',
          component: () => import('@/views/Supplier/supplier'),
          meta: { title: 'purchaseSale', icon: ''}
        },
        // {
        //   path: '/whdetail',
        //   hidden: true,
        //   name: 'whdetail',
        //   component: () => import('@/views/Supplier/supplierEdit'),
        //   meta: { title: 'whdetail', icon: 'component' }
        // },
        // {
        //   path: '/customInfo',
        //   name: 'CustomInfo',
        //   component: () => import('@/views/Customerment/customInfo'),
        //   meta: { title: 'customInfo', icon: ''}
        // },
        // {
        //   path: '/customeDetail/:id',
        //   name: 'CustomeDetail',
        //   component: () => import('@/views/Customerment/customeDetail'),
        //   meta: { title: 'customeDetail', icon: ''}
        // },
      ]
}
export default procurementRouter
