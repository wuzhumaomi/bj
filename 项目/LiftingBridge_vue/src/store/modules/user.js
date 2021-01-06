import { apiLogin } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'


const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    person: undefined,
    introduction: '',
    roles: [],
    userInfo: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_PERSON: (state, person) => {
      state.person = person
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // apiLogin.login({ username, password: userInfo.password }).then(response => {
          var response2 = {"id":"32d24fdce63611e8a5362c4d54bf6856"
          ,"loginName":"admin"
          ,"password":"admin"
          ,"realName":"管理员"
          ,"nickname":"管理员"
          ,"email":"admin@mail.com"
          ,"userType":"admin"
          ,"headimg":"headimg.jpg"
          ,"url":"url"
          ,"isEnabled":"1"
          ,"creator":""
          ,"updater":"admin"
          ,"createTime":"2019-01-03 14:19:11"
          ,"updateTime":"2019-07-18 10:11:13"
          ,"remark":"prrrrr"
          ,"person":{"id":"0068282822c611e9a97450e549c2854e"
          ,"personNo":"01"
          ,"fullname":"张三"
          ,"sex":"1"
          ,"birthdate":"1985-06-19 00:00:00"
          ,"address":"徐汇区"
          ,"education":"01"
          ,"professional":""
          ,"school":"克莱登大学"
          ,"marital":"01"
          ,"political":"01"
          ,"phone":"15656585630"
          ,"nationaloty":""
          ,"nation":"汉"
          ,"email":"15656585630@qq.com"
          ,"isEnabled":"1"
          ,"creator":"admin"
          ,"updater":"admin"
          ,"createTime":"2019-01-28 14:37:05"
          ,"updateTime":"2019-07-18 10:02:18"
          ,"picture":""
          ,"remark":"123"}
          ,"token":"8b2a7604-eea2-48ec-bdb3-53e466e1f7b9"
          ,"roles":[{"code":"BasicDataManagement"
          ,"type":"00"
          ,"children":[{"code":"OrganizatDepartment"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"PromptInformationOverview","type":"00"
          ,"children":[]}
          ,{"code":"LogManagement","type":"00"
          ,"children":[]}
          ,{"code":"LogManagementOver","type":"00"
          ,"children":[]}
          ,{"code":"ClassificationGoodsOver","type":"00"
          ,"children":[]},{"code":"PersonnelManagement"
          ,"type":"00"
          ,"children":[]},{"code":"PersonnelManagementOver"
          ,"type":"00"
          ,"children":[]},{"code":"ClassificationGoods"
          ,"type":"00"
          ,"children":[]},{"code":"GeneralConfiguratOverview"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"CommodityManagement"
          ,"type":"00"
          ,"children":[]},{"code":"PositionManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CommodityManagementOver"
          ,"type":"00"
          ,"children":[]},{"code":"LogisticsCoManagement"
          ,"type":"00"
          ,"children":[]},{"code":"LevelManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CaseManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CaseManagementOver"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"OutFactoryManagementOver","type":"00","children":[]}
          ,{"code":"OutFactoryManagement","type":"00","children":[]}
          ,{"code":"WhList","type":"00","children":[]}
          ,{"code":"LocationList","type":"00","children":[]}
          ,{"code":"customerlist","type":"00","children":[]}
          ,{"code":"supplierlist","type":"00","children":[]}
          ,{"code":"LevelManagementOver","type":"00","children":[]}
          ,{"code":"LogisticsCoManagementOver"
          ,"type":"00"
          ,"children":[]}]},{"code":"Home"
          ,"type":"00"
          ,"children":[{"code":"WorkPlatform"
          ,"type":"00"
          ,"children":[{"code":"createToDo"
          ,"type":"00"
          ,"children":[]}]},{"code":"MyMission"
          ,"type":"00"
          ,"children":[{"code":"start"
          ,"type":"00"
          ,"children":[]},{"code":"finish"
          ,"type":"00"
          ,"children":[]},{"code":"cancel"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]}]},{"code":"Knowledge"
          ,"type":"00"
          ,"children":[{"code":"KnowledgeManage"
          ,"type":"00"
          ,"children":[]},{"code":"LookKnowledgeInfo"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectManage"
          ,"type":"00"
          ,"children":[{"code":"ProjectTasks"
          ,"type":"00"
          ,"children":[{"code":"finish"
          ,"type":"00"
          ,"children":[]},{"code":"cancel"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"createTask"
          ,"type":"00"
          ,"children":[]},{"code":"start"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectModule"
          ,"type":"00"
          ,"children":[]},{"code":"LookTasksInfo"
          ,"type":"00"
          ,"children":[]},{"code":"ProjectDocumentation"
          ,"type":"00"
          ,"children":[{"code":"create"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"delete"
          ,"type":"00"
          ,"children":[]}]},{"code":"EditProject"
          ,"type":"00"
          ,"children":[]},{"code":"requirementsDetail"
          ,"type":"00"
          ,"children":[]},{"code":"CreateProject"
          ,"type":"00"
          ,"children":[]},{"code":"QualityAssuranceDetail"
          ,"type":"00"
          ,"children":[]},{"code":"projectRequirements"
          ,"type":"00"
          ,"children":[{"code":"addingRequirements"
          ,"type":"00"
          ,"children":[]},{"code":"confirmDemand"
          ,"type":"00"
          ,"children":[]},{"code":"closingRequirements"
          ,"type":"00"
          ,"children":[]},{"code":"aecompositionTasks"
          ,"type":"00"
          ,"children":[]},{"code":"addingTestcases"
          ,"type":"00"
          ,"children":[]}]},{"code":"BugManage"
          ,"type":"00"
          ,"children":[{"code":"createBug"
          ,"type":"00"
          ,"children":[]},{"code":"confirm"
          ,"type":"00"
          ,"children":[]},{"code":"solution"
          ,"type":"00"
          ,"children":[]},{"code":"close"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]},{"code":"bugDetail"
          ,"type":"00"
          ,"children":[]},{"code":"ProjectOverview"
          ,"type":"00"
          ,"children":[{"code":"Delay"
          ,"type":"00"
          ,"children":[]},{"code":"Close"
          ,"type":"00"
          ,"children":[]},{"code":"activation"
          ,"type":"00"
          ,"children":[]},{"code":"ModuleManagement"
          ,"type":"00"
          ,"children":[]},{"code":"EditingProjects"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectTeam"
          ,"type":"00"
          ,"children":[{"code":"create"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"delete"
          ,"type":"00"
          ,"children":[]}]},{"code":"DocumentLibraryFile"
          ,"type":"00"
          ,"children":[]},{"code":"projectsList"
          ,"type":"00"
          ,"children":[{"code":"createProject"
          ,"type":"00"
          ,"children":[]},{"code":"createProjectTasks"
          ,"type":"00"
          ,"children":[]}]},{"code":"qualityassurance"
          ,"type":"00"
          ,"children":[{"code":"TestCases"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]},{"code":"editBug"
          ,"type":"00"
          ,"children":[]}]},{"code":"BasicManage"
          ,"type":"00"
          ,"children":[{"code":"PersonInfo"
          ,"type":"00"
          ,"children":[{"code":"CreatePersonInfo"
          ,"type":"00"
          ,"children":[]},{"code":"EditPersonInfo"
          ,"type":"00"
          ,"children":[]},{"code":"LookPersonInfo"
          ,"type":"00"
          ,"children":[]}]},{"code":"PersonGroup"
          ,"type":"00"
          ,"children":[]}]},{"code":"SalesDepart"
          ,"type":"00"
          ,"children":[{"code":"SalesOrder"
          ,"type":"00"
          ,"children":[{"code":"CreateOrder"
          ,"type":"00"
          ,"children":[]}]},{"code":"ContractSale"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProcurementCommitteeManagement"
          ,"type":"00"
          ,"children":[{"code":"PurchaseOrder"
          ,"type":"00"
          ,"children":[]},{"code":"PurchaseSale"
          ,"type":"00"
          ,"children":[]}]},
          {"code":"System","type":"00"
            ,"children":[
                {"code":"UserManage","type":"00","children":[]}
                ,{"code":"ModuleManage","type":"00","children":[]}
                ,{"code":"RightsManagement","type":"00","children":[]}
              ]
          }
        ]
          ,"avatar":""}
          const data = response2
          commit('SET_TOKEN', data.token)
          setToken(response2.token)
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // apiLogin.getUserInfo({ token: state.token }).then(response => {
          var response2 = {"id":"32d24fdce63611e8a5362c4d54bf6856"
          ,"loginName":"admin"
          ,"password":"admin"
          ,"realName":"管理员"
          ,"nickname":"管理员"
          ,"email":"admin@mail.com"
          ,"userType":"admin"
          ,"headimg":"headimg.jpg"
          ,"url":"url"
          ,"isEnabled":"1"
          ,"creator":""
          ,"updater":"admin"
          ,"createTime":"2019-01-03 14:19:11"
          ,"updateTime":"2019-07-18 10:11:13"
          ,"remark":"prrrrr"
          ,"person":{"id":"0068282822c611e9a97450e549c2854e"
          ,"personNo":"01"
          ,"fullname":"张三"
          ,"sex":"1"
          ,"birthdate":"1985-06-19 00:00:00"
          ,"address":"徐汇区"
          ,"education":"01"
          ,"professional":""
          ,"school":"克莱登大学"
          ,"marital":"01"
          ,"political":"01"
          ,"phone":"15656585630"
          ,"nationaloty":""
          ,"nation":"汉"
          ,"email":"15656585630@qq.com"
          ,"isEnabled":"1"
          ,"creator":"admin"
          ,"updater":"admin"
          ,"createTime":"2019-01-28 14:37:05"
          ,"updateTime":"2019-07-18 10:02:18"
          ,"picture":""
          ,"remark":"123"}
          ,"token":"32d24fdce63611e8a5362c4d54bf6856"
          ,"roles":[{"code":"BasicDataManagement"
          ,"type":"00"
          ,"children":[{"code":"OrganizatDepartment"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"PromptInformationOverview"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"LogManagement","type":"00"
          ,"children":[]}
          ,{"code":"LogManagementOver","type":"00"
          ,"children":[]}
          ,{"code":"ClassificationGoodsOver"
          ,"type":"00"
          ,"children":[]},{"code":"PersonnelManagement"
          ,"type":"00"
          ,"children":[]},{"code":"PersonnelManagementOver"
          ,"type":"00"
          ,"children":[]},{"code":"ClassificationGoods"
          ,"type":"00"
          ,"children":[]},{"code":"GeneralConfiguratOverview"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"CommodityManagement"
          ,"type":"00"
          ,"children":[]},{"code":"PositionManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CommodityManagementOver"
          ,"type":"00"
          ,"children":[]},{"code":"LogisticsCoManagement"
          ,"type":"00"
          ,"children":[]},{"code":"LevelManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CaseManagement"
          ,"type":"00"
          ,"children":[]},{"code":"CaseManagementOver"
          ,"type":"00"
          ,"children":[]}
          ,{"code":"OutFactoryManagementOver","type":"00","children":[]}
          ,{"code":"OutFactoryManagement","type":"00","children":[]}
          ,{"code":"WhList","type":"00","children":[]}
          ,{"code":"LocationList","type":"00","children":[]}
          ,{"code":"customerlist","type":"00","children":[]}
          ,{"code":"supplierlist","type":"00","children":[]}
          ,{"code":"LevelManagementOver"
          ,"type":"00"
          ,"children":[]},{"code":"LogisticsCoManagementOver"
          ,"type":"00"
          ,"children":[]}]},{"code":"Home"
          ,"type":"00"
          ,"children":[{"code":"WorkPlatform"
          ,"type":"00"
          ,"children":[{"code":"createToDo"
          ,"type":"00"
          ,"children":[]}]},{"code":"MyMission"
          ,"type":"00"
          ,"children":[{"code":"start"
          ,"type":"00"
          ,"children":[]},{"code":"finish"
          ,"type":"00"
          ,"children":[]},{"code":"cancel"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]}]},{"code":"Knowledge"
          ,"type":"00"
          ,"children":[{"code":"KnowledgeManage"
          ,"type":"00"
          ,"children":[]},{"code":"LookKnowledgeInfo"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectManage"
          ,"type":"00"
          ,"children":[{"code":"ProjectTasks"
          ,"type":"00"
          ,"children":[{"code":"finish"
          ,"type":"00"
          ,"children":[]},{"code":"cancel"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"createTask"
          ,"type":"00"
          ,"children":[]},{"code":"start"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectModule"
          ,"type":"00"
          ,"children":[]},{"code":"LookTasksInfo"
          ,"type":"00"
          ,"children":[]},{"code":"ProjectDocumentation"
          ,"type":"00"
          ,"children":[{"code":"create"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"delete"
          ,"type":"00"
          ,"children":[]}]},{"code":"EditProject"
          ,"type":"00"
          ,"children":[]},{"code":"requirementsDetail"
          ,"type":"00"
          ,"children":[]},{"code":"CreateProject"
          ,"type":"00"
          ,"children":[]},{"code":"QualityAssuranceDetail"
          ,"type":"00"
          ,"children":[]},{"code":"projectRequirements"
          ,"type":"00"
          ,"children":[{"code":"addingRequirements"
          ,"type":"00"
          ,"children":[]},{"code":"confirmDemand"
          ,"type":"00"
          ,"children":[]},{"code":"closingRequirements"
          ,"type":"00"
          ,"children":[]},{"code":"aecompositionTasks"
          ,"type":"00"
          ,"children":[]},{"code":"addingTestcases"
          ,"type":"00"
          ,"children":[]}]},{"code":"BugManage"
          ,"type":"00"
          ,"children":[{"code":"createBug"
          ,"type":"00"
          ,"children":[]},{"code":"confirm"
          ,"type":"00"
          ,"children":[]},{"code":"solution"
          ,"type":"00"
          ,"children":[]},{"code":"close"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]},{"code":"bugDetail"
          ,"type":"00"
          ,"children":[]},{"code":"ProjectOverview"
          ,"type":"00"
          ,"children":[{"code":"Delay"
          ,"type":"00"
          ,"children":[]},{"code":"Close"
          ,"type":"00"
          ,"children":[]},{"code":"activation"
          ,"type":"00"
          ,"children":[]},{"code":"ModuleManagement"
          ,"type":"00"
          ,"children":[]},{"code":"EditingProjects"
          ,"type":"00"
          ,"children":[]}]},{"code":"ProjectTeam"
          ,"type":"00"
          ,"children":[{"code":"create"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]},{"code":"delete"
          ,"type":"00"
          ,"children":[]}]},{"code":"DocumentLibraryFile"
          ,"type":"00"
          ,"children":[]},{"code":"projectsList"
          ,"type":"00"
          ,"children":[{"code":"createProject"
          ,"type":"00"
          ,"children":[]},{"code":"createProjectTasks"
          ,"type":"00"
          ,"children":[]}]},{"code":"qualityassurance"
          ,"type":"00"
          ,"children":[{"code":"TestCases"
          ,"type":"00"
          ,"children":[]},{"code":"edit"
          ,"type":"00"
          ,"children":[]}]},{"code":"editBug"
          ,"type":"00"
          ,"children":[]}]},{"code":"BasicManage"
          ,"type":"00"
          ,"children":[{"code":"PersonInfo"
          ,"type":"00"
          ,"children":[{"code":"CreatePersonInfo"
          ,"type":"00"
          ,"children":[]},{"code":"EditPersonInfo"
          ,"type":"00"
          ,"children":[]},{"code":"LookPersonInfo"
          ,"type":"00"
          ,"children":[]}]},{"code":"PersonGroup"
          ,"type":"00"
          ,"children":[]}]},{"code":"SalesDepart"
          ,"type":"00"
          ,"children":[{"code":"SalesOrder"
          ,"type":"00"
          ,"children":[{"code":"CreateOrder"
          ,"type":"00"
          ,"children":[]}]},{"code":"ContractSale"
          ,"type":"00"
          ,"children":[]}]},
          {"code":"ProcurementCommitteeManagement","type":"00"
          ,"children":[{"code":"PurchaseOrder","type":"00","children":[]}
          ,{"code":"PurchaseSale","type":"00","children":[]}]},
          {"code":"System","type":"00"
            ,"children":[
                {"code":"UserManage","type":"00","children":[]}
                ,{"code":"ModuleManage","type":"00","children":[]}
                ,{"code":"RightsManagement","type":"00","children":[]}
              ]
          }
          ]
          ,"avatar":""}
          if (!response2) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response2
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            // debugger
            // commit('SET_ROLES', 'admin')
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USER_INFO', data)
          commit('SET_PERSON', data.person)
          resolve(response2)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.token)
    //       setToken(response.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // apiLogin.logout({ token: state.token }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        // apiLogin.getUserInfo({ role }).then(response => {
          var response2 = {"id":"32d24fdce63611e8a5362c4d54bf6856"
      ,"loginName":"admin"
      ,"password":"admin"
      ,"realName":"管理员"
      ,"nickname":"管理员"
      ,"email":"admin@mail.com"
      ,"userType":"admin"
      ,"headimg":"headimg.jpg"
      ,"url":"url"
      ,"isEnabled":"1"
      ,"creator":""
      ,"updater":"admin"
      ,"createTime":"2019-01-03 14:19:11"
      ,"updateTime":"2019-07-18 10:11:13"
      ,"remark":"prrrrr"
      ,"person":{"id":"0068282822c611e9a97450e549c2854e"
      ,"personNo":"01"
      ,"fullname":"张三"
      ,"sex":"1"
      ,"birthdate":"1985-06-19 00:00:00"
      ,"address":"徐汇区"
      ,"education":"01"
      ,"professional":""
      ,"school":"克莱登大学"
      ,"marital":"01"
      ,"political":"01"
      ,"phone":"15656585630"
      ,"nationaloty":""
      ,"nation":"汉"
      ,"email":"15656585630@qq.com"
      ,"isEnabled":"1"
      ,"creator":"admin"
      ,"updater":"admin"
      ,"createTime":"2019-01-28 14:37:05"
      ,"updateTime":"2019-07-18 10:02:18"
      ,"picture":""
      ,"remark":"123"}
      ,"token":"32d24fdce63611e8a5362c4d54bf6856"
      ,"roles":[{"code":"BasicDataManagement"
      ,"type":"00"
      ,"children":[{"code":"OrganizatDepartment"
      ,"type":"00"
      ,"children":[]}
      ,{"code":"PromptInformationOverview","type":"00"
      ,"children":[]}
      ,{"code":"LogManagement","type":"00"
      ,"children":[]}
      ,{"code":"LogManagementOver","type":"00"
      ,"children":[]}
      ,{"code":"ClassificationGoodsOver"
      ,"type":"00"
      ,"children":[]},{"code":"PersonnelManagement"
      ,"type":"00"
      ,"children":[]},{"code":"PersonnelManagementOver"
      ,"type":"00"
      ,"children":[]},{"code":"ClassificationGoods"
      ,"type":"00"
      ,"children":[]},{"code":"GeneralConfiguratOverview"
      ,"type":"00"
      ,"children":[]}
      ,{"code":"CommodityManagement"
      ,"type":"00"
      ,"children":[]},{"code":"PositionManagement"
      ,"type":"00"
      ,"children":[]},{"code":"CommodityManagementOver"
      ,"type":"00"
      ,"children":[]},{"code":"LogisticsCoManagement"
      ,"type":"00"
      ,"children":[]},{"code":"LevelManagement"
      ,"type":"00"
      ,"children":[]},{"code":"CaseManagement"
      ,"type":"00"
      ,"children":[]},{"code":"CaseManagementOver"
      ,"type":"00"
      ,"children":[]},{"code":"OutFactoryManagementOver"
      ,"type":"00"
      ,"children":[]},{"code":"OutFactoryManagement"
      ,"type":"00"
      ,"children":[]},{"code":"LevelManagementOver"
      ,"type":"00"
      ,"children":[]},{"code":"LogisticsCoManagementOver"
      ,"type":"00"
      ,"children":[]}]},{"code":"Home"
      ,"type":"00"
      ,"children":[{"code":"WorkPlatform"
      ,"type":"00"
      ,"children":[{"code":"createToDo"
      ,"type":"00"
      ,"children":[]}]},{"code":"MyMission"
      ,"type":"00"
      ,"children":[{"code":"start"
      ,"type":"00"
      ,"children":[]},{"code":"finish"
      ,"type":"00"
      ,"children":[]},{"code":"cancel"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]}]}]},{"code":"Knowledge"
      ,"type":"00"
      ,"children":[{"code":"KnowledgeManage"
      ,"type":"00"
      ,"children":[]},{"code":"LookKnowledgeInfo"
      ,"type":"00"
      ,"children":[]}]},{"code":"ProjectManage"
      ,"type":"00"
      ,"children":[{"code":"ProjectTasks"
      ,"type":"00"
      ,"children":[{"code":"finish"
      ,"type":"00"
      ,"children":[]},{"code":"cancel"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]},{"code":"createTask"
      ,"type":"00"
      ,"children":[]},{"code":"start"
      ,"type":"00"
      ,"children":[]}]},{"code":"ProjectModule"
      ,"type":"00"
      ,"children":[]},{"code":"LookTasksInfo"
      ,"type":"00"
      ,"children":[]},{"code":"ProjectDocumentation"
      ,"type":"00"
      ,"children":[{"code":"create"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]},{"code":"delete"
      ,"type":"00"
      ,"children":[]}]},{"code":"EditProject"
      ,"type":"00"
      ,"children":[]},{"code":"requirementsDetail"
      ,"type":"00"
      ,"children":[]},{"code":"CreateProject"
      ,"type":"00"
      ,"children":[]},{"code":"QualityAssuranceDetail"
      ,"type":"00"
      ,"children":[]},{"code":"projectRequirements"
      ,"type":"00"
      ,"children":[{"code":"addingRequirements"
      ,"type":"00"
      ,"children":[]},{"code":"confirmDemand"
      ,"type":"00"
      ,"children":[]},{"code":"closingRequirements"
      ,"type":"00"
      ,"children":[]},{"code":"aecompositionTasks"
      ,"type":"00"
      ,"children":[]},{"code":"addingTestcases"
      ,"type":"00"
      ,"children":[]}]},{"code":"BugManage"
      ,"type":"00"
      ,"children":[{"code":"createBug"
      ,"type":"00"
      ,"children":[]},{"code":"confirm"
      ,"type":"00"
      ,"children":[]},{"code":"solution"
      ,"type":"00"
      ,"children":[]},{"code":"close"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]}]},{"code":"bugDetail"
      ,"type":"00"
      ,"children":[]},{"code":"ProjectOverview"
      ,"type":"00"
      ,"children":[{"code":"Delay"
      ,"type":"00"
      ,"children":[]},{"code":"Close"
      ,"type":"00"
      ,"children":[]},{"code":"activation"
      ,"type":"00"
      ,"children":[]},{"code":"ModuleManagement"
      ,"type":"00"
      ,"children":[]},{"code":"EditingProjects"
      ,"type":"00"
      ,"children":[]}]},{"code":"ProjectTeam"
      ,"type":"00"
      ,"children":[{"code":"create"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]},{"code":"delete"
      ,"type":"00"
      ,"children":[]}]},{"code":"DocumentLibraryFile"
      ,"type":"00"
      ,"children":[]},{"code":"projectsList"
      ,"type":"00"
      ,"children":[{"code":"createProject"
      ,"type":"00"
      ,"children":[]},{"code":"createProjectTasks"
      ,"type":"00"
      ,"children":[]}]},{"code":"qualityassurance"
      ,"type":"00"
      ,"children":[{"code":"TestCases"
      ,"type":"00"
      ,"children":[]},{"code":"edit"
      ,"type":"00"
      ,"children":[]}]},{"code":"editBug"
      ,"type":"00"
      ,"children":[]}]},{"code":"BasicManage"
      ,"type":"00"
      ,"children":[{"code":"PersonInfo"
      ,"type":"00"
      ,"children":[{"code":"CreatePersonInfo"
      ,"type":"00"
      ,"children":[]},{"code":"EditPersonInfo"
      ,"type":"00"
      ,"children":[]},{"code":"LookPersonInfo"
      ,"type":"00"
      ,"children":[]}]},{"code":"PersonGroup"
      ,"type":"00"
      ,"children":[]}]},{"code":"SalesDepart"
      ,"type":"00"
      ,"children":[{"code":"SalesOrder"
      ,"type":"00"
      ,"children":[{"code":"CreateOrder"
      ,"type":"00"
      ,"children":[]}]},{"code":"ContractSale"
      ,"type":"00"
      ,"children":[]}]},
      {"code":"ProcurementCommitteeManagement","type":"00"
      ,"children":[{"code":"PurchaseOrder","type":"00","children":[]}
      ,{"code":"PurchaseSale","type":"00","children":[]}]},
      {"code":"System","type":"00"
        ,"children":[
            {"code":"UserManage","type":"00","children":[]}
            ,{"code":"ModuleManage","type":"00","children":[]}
            ,{"code":"RightsManagement","type":"00","children":[]}
          ]
      }
      ]
      ,"avatar":""}
          const data = response2
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        // })
      })
    }
  }
}

export default user
