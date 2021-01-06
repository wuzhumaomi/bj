import Mock from 'mockjs'
// import { param2Obj } from '@/utils'


const List = []
const count = 12
const moduleList = []
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      roleNo: '01',
      roleName:  '管理员'+ Mock.Random.integer(1, 10),
      // Mock.Random.cname()
      sort: '',
      isEnabled: 1,
      remark: '备注',
      creator: 'admin',
      updater: 'admin',
      createTime: Mock.Random.date(),
      updateTime: Mock.Random.date(),
    }))
  }
  moduleList.push
  export default {
    getList: () => {
      return {
        total: List.length,
        data: List,
        errcode: 0
      }
    },
    createRole: () => ({
      errcode: 0,
      data: 'success'
    }),
    updateRole: () =>({
      errcode: 0,
      data: 'success'
    }),
    deleteRole: () =>({
      errcode: 0,
      data: 'success'
    })
  }