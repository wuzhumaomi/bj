import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    loginName: '@name',
    password: 'a111',
    realName: '@first',
    nickname: '@first',
    email: 'admin@mail.com',
    user_type: 'admin',
    headimg: 'headimg.jpg',
    url: 'url',
    person:'11e',
    isEnabled: '是',
    remark: '1111111',
    creator:'admin',
    updater: 'admin',
    createTime: Mock.Random.date(),
    update_time: Mock.Random.date(),
    })
  )}
  
export default {
  userList: () => {
    return {
      total: List.length,
      data: List,
      errcode: 0
    }
  },
  createUser: () => ({
    data: 'success',
    errcode: 0
  }),
  updateUser: () =>({
    data: 'success',
    errcode: 0
  })
}
