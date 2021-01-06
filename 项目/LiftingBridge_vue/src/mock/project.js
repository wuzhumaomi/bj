import Mock from 'mockjs'

// 项目统计
const allProjects = []
// 进行中的项目
const ongoingProjects = []
// 指派给我的任务
const myMissions = []
// 项目需求
const requirements = []
//  项目团队
const projectTeam = []
const count = 7
const counts = 12
for (let i = 0; i < count; i++) {
  allProjects.push(Mock.mock({
    id: Mock.Random.guid(),
    projectName:Mock.Random.ctitle()
  }))
}
for (let i = 0; i < count; i++) {
  ongoingProjects.push(Mock.mock({
    id: Mock.Random.guid(),
    projectName: Mock.Random.ctitle(),
    closingDate: Mock.Random.date('yyyy-MM-dd'),
    estimate: Mock.Random.natural(1, 100),
    consume: Mock.Random.natural(1, 100),
    surplus: Mock.Random.natural(1, 100)
  }))
}

var arr = ['进行中','已完成'];
for(let i = 0; i < counts; i++) {
  myMissions.push(Mock.mock({
    id: Mock.Random.natural(1000, 1900),
    priority: Mock.Random.integer(1,3),
    taskName: Mock.Random.ctitle(),
    state: Mock.Random.pick(arr)
}  ))
}
for(let i = 0; i < counts; i++) {
  requirements.push(Mock.mock({
    id: Mock.Random.natural(1000, 1900),
    priority: Mock.Random.integer(1,3),
    requirementName: Mock.Random.ctitle(),
    creator: Mock.Random.name(),
    estimatedNumber: Mock.Random.natural(1, 100),
    state: '激活',
    stage: '已立项'
  }))
}
for(let i = 0; i < counts; i++) {
  projectTeam.push(Mock.mock({
    id: Mock.Random.natural(1000, 1900),
    completed: Mock.Random.natural(1, 100),
    delay: Mock.Random.natural(1, 100),
    member: Mock.Random.name(),
    tasksAssignment: Mock.Random.natural(1, 100),
    bug: Mock.Random.natural(1, 100),
  }))
}
export default {
    getAllProjects: () => {
      return {
        total: allProjects.length,
        data: allProjects,
        errcode: 0
      }
    },
    getOngoingProjects: () =>{
      return {
        total: ongoingProjects.length,
        data: ongoingProjects,
        errcode: 0
      }
    },
    getMyMissions: () =>{
      return {
        total: myMissions.length,
        data: myMissions,
        errcode: 0
      } 
    },
    getRequirements: () =>{
      return {
        total: requirements.length,
        data: requirements,
        errcode: 0
      }
    },
    getProjectTeam: () =>{
      return {
        total: projectTeam.length,
        data: projectTeam,
        errcode: 0
      }
    }
  }