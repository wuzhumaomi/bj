import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: 1111,
    level: 'A',
    bugTitle: '页面格式错误',
    creator: '@first',
    Assignor: '@first',
    Solver: '@first',
    subordinateProject: 'A',
    subordinateModule: 'A',
    relatedDemand: 'A',
    assignedTo: 'A',
    bugType: 'A',
    bugState: 'A',
    remark: '慎重操作，出现问题概不负责',
    activationTimes: 'A',
    currentAssignment: 'A',
    closingDate: 'A',
    operatingSystem: 'A',
    operating: 'A',
    browser: 'A',
    Operating:'删除',
    Operating: [
      {
      "label": '1:2019-06-03 13:13:57, 由 guest 创建。',
      }, 
      {
      "label": '2:2019-06-03 13:14:38, 由 guest 启动。',
      children: [{
          "label": '修改了 实际开始，旧值为 "0000-00-00"，新值为 "2019-06-03"。',
      }, {
          "label": '修改了 总消耗 ，旧值为 "0"，新值为 "1"。',
      }, {
          "label": '修改了 预计剩余，旧值为 "0"，新值为 "1"。',
      }, {
          "label": '修改了 指派给 ，旧值为 "dev2"，新值为 "guest"。',
      }, {
          "label": '修改了 任务状态，旧值为 "wait"，新值为 "doing"。',
      }]
      }
    ],
  })
)}
  
export default {
  getbugList: () => {
    return {
      total: List.length,
      data: List,
      errcode: 0
    }
  },
  // getBugDetails: () => {
  //   return {
  //     total: List.length,
  //     data: List,
  //     errcode: 0
  //   }
  // },
  createBug: () => ({
    data: 'success',
    errcode: 0
  }),
  // comfirmBug: () =>({
  //   data: 'success',
  //   errcode: 0
  // }),
  // comfirmBug: () =>({
  //   data: 'success',
  //   errcode: 0
  // }),
  // solveBug:() =>({
  //   data: 'success',
  //   errcode: 0
  // })
}
