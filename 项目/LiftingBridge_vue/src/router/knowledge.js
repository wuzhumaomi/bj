import Layout from '@/views/layout'

 const basicDataRouter = {
  path: '',
  component: Layout,
  name: 'Knowledge',
  meta: { title: 'knowledgeManage', icon: 'nested', noCache: true},
  children: [
    // {
    //   path: '/knowledge',
    //   name: 'KnowledgeManage',
    //   component: () => import('@/views/system/knowledge'),
    //   meta: { title: 'knowledgeManage', icon: 'nested', noCache: true}
    // },
    // {
    //   path: '/knowledgePerson/:id',
    //   name: 'LookKnowledgeInfo',
    //   hidden: true,
    //   component: () => import('@/views/system/components/personDetailed'),
    //   meta: { title: 'lookKnowledgeInfo', icon: 'component'}
    // }
  ]
}
export default basicDataRouter
