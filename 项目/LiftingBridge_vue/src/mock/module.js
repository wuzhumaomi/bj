import Mock from 'mockjs'

const List = []
const count = 7

// for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
    "success": true,
    "errcode": 0,
    "message": "获取角色模块成功",
    "data": [
        {
            "id": "b5bf3b6e1fb611e9a97345e549c2854e",
            "code": "BasicManage",
            "text": "生产作业",
            "type": "00",
            "url": "",
            "icon": null,
            "iconCls": null,
            "parentId": null,
            "sort": 0,
            "isEnabled": "1",
            "remark": "",
            "creator": "admin",
            "updater": "admin",
            "createTime": "2019-01-24T09:09:59.000+0000",
            "updateTime": "2019-01-24T09:21:52.000+0000",
            "children": [
                {
                    "id": "26952e7e237111e9a97450e549c2454e",
                    "code": "PersonManage",
                    "text": "用户人员管理",
                    "type": "00",
                    "url": "",
                    "icon": null,
                    "iconCls": null,
                    "parentId": "b5bf3b6e1fb611e9a97450e549c2854e",
                    "sort": 0,
                    "isEnabled": "1",
                    "remark": "",
                    "creator": "admin",
                    "updater": "admin",
                    "createTime": "2019-01-29T03:02:22.000+0000",
                    "updateTime": "2019-01-29T03:02:22.000+0000",
                    "children": [
                        {
                            "id": "358b800e237111e9a97450e549c2854e",
                            "code": "PersonInfo",
                            "text": "查看人员信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:02:47.000+0000",
                            "updateTime": "2019-01-29T03:02:47.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d6003c6b3eed11e989b250e549c2854e"
                        },
                        {
                            "id": "5225597d237111e9a97450e549c2854e",
                            "code": "CreatePersonInfo",
                            "text": "创建人员信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:03:35.000+0000",
                            "updateTime": "2019-01-29T03:03:35.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d5f46b713eed11e989b250e549c2854e"
                        },
                        {
                            "id": "5c3aa049237111e9a97450e549c2854e",
                            "code": "EditPersonInfo",
                            "text": "修改人员信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:03:52.000+0000",
                            "updateTime": "2019-01-29T03:03:52.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d5e548753eed11e989b250e549c2854e"
                        },
                        {
                            "id": "efec794b245b11e9b6fc50e549c2854e",
                            "code": "LookPersonInfo",
                            "text": "删除人员信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-30T07:02:48.000+0000",
                            "updateTime": "2019-01-30T07:02:48.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d607454c3eed11e989b250e549c2854e"
                        }
                    ],
                    "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                    "roleRelationId": "d5d6088a3eed11e989b250e549c2854e"
                },
                {
                    "id": "26952e7e237111e9a97450e549c2854e",
                    "code": "PersonManage",
                    "text": "知识库管理",
                    "type": "00",
                    "url": "",
                    "icon": null,
                    "iconCls": null,
                    "parentId": "b5bf3b6e1fb611e9a97450e549c2854e",
                    "sort": 0,
                    "isEnabled": "1",
                    "remark": "",
                    "creator": "admin",
                    "updater": "admin",
                    "createTime": "2019-01-29T03:02:22.000+0000",
                    "updateTime": "2019-01-29T03:02:22.000+0000",
                    "children": [
					    {
                            "id": "efec794b245b11e9b6fc50e549c2854e",
                            "code": "LookPersonInfo",
                            "text": "查看知识库信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-30T07:02:48.000+0000",
                            "updateTime": "2019-01-30T07:02:48.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d607454c3eed11e989b250e549c2854e"
                        },
                        {
                            "id": "5c3aa049237111e9a97450e549c2854e",
                            "code": "EditPersonInfo",
                            "text": "修改知识库信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:03:52.000+0000",
                            "updateTime": "2019-01-29T03:03:52.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d5e548753eed11e989b250e549c2854e"
                        },
                        {
                            "id": "5225597d237111e9a97450e549c2854e",
                            "code": "CreatePersonInfo",
                            "text": "创建知识库信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:03:35.000+0000",
                            "updateTime": "2019-01-29T03:03:35.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d5f46b713eed11e989b250e549c2854e"
                        },
                        {
                            "id": "358b800e237111e9a97450e549c2854e",
                            "code": "PersonInfo",
                            "text": "删除知识库信息",
                            "type": "00",
                            "url": "",
                            "icon": null,
                            "iconCls": null,
                            "parentId": "26952e7e237111e9a97450e549c2854e",
                            "sort": 0,
                            "isEnabled": "1",
                            "remark": "",
                            "creator": "admin",
                            "updater": "admin",
                            "createTime": "2019-01-29T03:02:47.000+0000",
                            "updateTime": "2019-01-29T03:02:47.000+0000",
                            "children": [],
                            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                            "roleRelationId": "d6003c6b3eed11e989b250e549c2854e"
                        }
                    ],
                    "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                    "roleRelationId": "d5d6088a3eed11e989b250e549c2854e"
                },
                {
                    "id": "uuid-03dd59f3-ccad-11e8-b158-525400db2b92",
                    "code": "RoleManage",
                    "text": "角色管理",
                    "type": "00",
                    "url": "",
                    "icon": null,
                    "iconCls": null,
                    "parentId": "uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92",
                    "sort": 4,
                    "isEnabled": "",
                    "remark": "1",
                    "creator": "",
                    "updater": "2018-10-11 00:53:31",
                    "createTime": "2019-01-29T09:35:47.000+0000",
                    "updateTime": "2018-10-10T16:53:31.000+0000",
                    "children": [],
                    "roleCode": "29b3bc50208a11e9a97450e549c2854e",
                    "roleRelationId": "d6e0316b3eed11e989b250e549c2854e"
                }
            ],
            "roleCode": "29b3bc50208a11e9a97450e549c2854e",
            "roleRelationId": "d6a667353eed11e989b250e549c2854e"
        }
    ]
    }))


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
