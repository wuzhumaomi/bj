import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout'
import salesDepartRouter from './salesDepart'
import procurementRouter from './procurement'
import basicDataRouter from './basicData'
import systemRouter from './system'
// import knowledgeRouter from './knowledge'
// import userRouter from './user'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
   {
    path: '',
    component: Layout,
    redirect: 'salesOrder'
   },
  salesDepartRouter,
  procurementRouter,
  basicDataRouter,
  // knowledgeRouter,
  // userRouter,
  systemRouter,
]
