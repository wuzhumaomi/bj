import Mock from 'mockjs'

const List = []
const count = 7

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      loginName: '@first',
      fullname: Mock.Random.cname(),
      isEnabled: 1,
      remark: '备注',
      createTime: Mock.Random.date(),
    }))
  }
  
  export default {
    getList: () => {
      return {
        total: List.length,
        data: List,
        errcode: 0
      }
    },
    createRole: () => ({
      data: 'success'
    }),
    updateRole: () =>({
      data: 'success'
    })
  }