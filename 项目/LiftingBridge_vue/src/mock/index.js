import bugAPI from './bug'

const Mock = require("mockjs")
import projectAPI from './project'
// Mock.mock(/\/project\/getAllProjects/, 'get', projectAPI.getAllProjects)
Mock.mock(/\/project\/getOngoingProjects/, 'get', projectAPI.getOngoingProjects)
// Mock.mock(/\/project\/getMyMissions/, 'get', projectAPI.getMyMissions)
// Mock.mock(/\/project\/getRequirements/, 'get', projectAPI.getRequirements)
Mock.mock(/\/project\/getProjectTeam/, 'get', projectAPI.getProjectTeam)
//查询项目任务列表
import apiProTasks from './proTasksMock'
// Mock.mock(/\/tasks\/getTasksList/, 'get', apiProTasks.getTasksList)
// Mock.mock(/\/tasks\/getTaskDetails/, 'post', apiProTasks.getTaskDetails)
//查询人员日历列表
import apiStaffCalendar from './staffCalendarMock'
Mock.mock(/\/staff\/getStaffCalendarList/, 'get', apiStaffCalendar.getStaffCalendarList)

//查询Bug列表
// Mock.mock(/\/bug\/list/, 'get', bugAPI.getbugList)
//查询Bug详情
// Mock.mock(/\/bug\//, 'post', bugAPI.getBugDetails)
// 添加bug
// Mock.mock(/\/bug\/createBug/, 'post', bugAPI.createBug)
// 确认bug
// Mock.mock(/\/bug\/comfirmBug/, 'post', bugAPI.comfirmBug)
// 解决bug
// Mock.mock(/\/bug\/solveBug/, 'post', bugAPI.solveBug)
export default Mock
