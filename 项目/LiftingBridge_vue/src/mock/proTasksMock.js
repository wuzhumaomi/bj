import { param2Obj } from "@/utils"
import Mock from 'mockjs'
  
const List0 = []
const List1 = []
const List2 = []
const List3 = []

List0.push(
    Mock.mock({
      pages:'1',
      total: 4,
      dates : [
        {
            "id": 1, 
            "taskId":'001',
            "priority":'1',//1,2,3,
            "subProject":'0',//0,1,2
            "taskName":'test测试1',
            "founders":'人员张三',
            "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
            "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
            "startDate":'2019-06-05 00:00:00',
            "endDate":'2019-06-06 00:00:00',
            "completeDegree":'71%',
            "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
            "taskType":'1',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
            "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
            "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
            "relevantRequirements":'0',// 0，工资单上传需求 1，同上
            "Operating": [
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
        },{
          "id": 3, 
          "taskId":'003',
          "priority":'2',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'1%',
          "state":'3',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'0',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 5, 
          "taskId":'005',
          "priority":'1',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'0%',
          "state":'5',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'4',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 6, 
          "taskId":'006',
          "priority":'2',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'9%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'5',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        }
      ]
    })
)

List1.push(
    Mock.mock({
      pages:'1',
      total: 3,
      dates : [
        {
          "id": 2, 
          "taskId":'002',
          "priority":'2',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'7%',
          "state":'2',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'2',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
                {
                "label": '1:2019-06-03 13:13:57, 由 guest 创建。',
                }, 
                {
                "label": '2:2019-06-03 13:14:38, 由 guest 启动。',
                "children": [{
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
        },{
          "id": 7, 
          "taskId":'007',
          "priority":'1',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'71%',
          "state":'3',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'6',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 8, 
          "taskId": '008',
          "priority":'1',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'8%',
          "state":'2',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'7',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        }
      ]
    })
)

List2.push(
    Mock.mock({
      pages:'1',
      total: 3,
      dates : [
        {
          "id": 4, 
          "taskId":'004',
          "priority":'1',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'25%',
          "state":'4',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'3',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 9, 
          "taskId":'009',
          "priority":'3',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'2',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'4%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'0',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 10, 
          "taskId":'0010',
          "priority":'3',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'2',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'5%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'7',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        }
      ]
    })
)

List3.push(
    Mock.mock({
      pages:'1',
      total: 10,
      dates : [
        {
            "id": 1, 
            "taskId":'001',
            "priority":'1',//1,2,3,
            "subProject":'0',//0,1,2
            "taskName":'test测试1',
            "founders":'人员张三',
            "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
            "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
            "startDate":'2019-06-05 00:00:00',
            "endDate":'2019-06-06 00:00:00',
            "completeDegree":'71%',
            "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
            "taskType":'1',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
            "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
            "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
            "relevantRequirements":'0',// 0，工资单上传需求 1，同上
            "Operating": [
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
        },{
          "id": 2, 
          "taskId":'002',
          "priority":'2',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'7%',
          "state":'2',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'2',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 3, 
          "taskId":'003',
          "priority":'2',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'1%',
          "state":'3',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'0',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 4, 
          "taskId":'004',
          "priority":'1',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'25%',
          "state":'4',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'3',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 5, 
          "taskId":'005',
          "priority":'1',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'0%',
          "state":'5',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'4',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 6, 
          "taskId":'006',
          "priority":'3',//1,2,3,
          "subProject":'0',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'9%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'5',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 7, 
          "taskId":'007',
          "priority":'1',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'0',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'71%',
          "state":'3',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'6',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 8, 
          "taskId": '008',
          "priority":'1',//1,2,3,
          "subProject":'1',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'8%',
          "state":'2',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'7',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 9, 
          "taskId":'009',
          "priority":'3',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'3',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'2',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'4%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'0',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        },{
          "id": 10, 
          "taskId":'0010',
          "priority":'3',//1,2,3,
          "subProject":'2',
          "taskName":'test测试1',
          "founders":'人员张三',
          "assigned":'2',//0，aaa 1，bbb 2，ccc 3同上 
          "responsible":'1',//0，aaa 1，bbb 2，ccc 3同上 
          "startDate":'2019-06-05 00:00:00',
          "endDate":'2019-06-06 00:00:00',
          "completeDegree":'5%',
          "state":'1',//1，未开始，2，进行中，3，已暂停，4，已完成，5，已关闭。
          "taskType":'7',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
          "subordinateModule":'0',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
          "headPen":'2',//0，aaa 1，bb 2，ccc 3，同上
          "relevantRequirements":'0',// 0，工资单上传需求 1，同上
          "Operating": [
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
        }
      ]
    })
)


const details = []
details.push(
    Mock.mock({
        taskId:'001',
        taskName:'工资单上传',
        taskDescription:'工资单上传任务，要及时完成。',
        requirementsDescribe:'用于测试11',
        Operating: [
            {
              "label": '1:2019-06-03 13:13:57, 由 guest 创建。',
            }, 
            {
              "label": '2:2019-06-03 13:14:38, 由 guest 启动。',
              "children": [{
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
        subProject:'2',
        subordinateModule:'工资单上传',// 0，/工资单上传 1，/工资单上传/上传  2，/工资单上传/下载  3，同上
        relevantRequirements:'工资单上传需求',// 0，工资单上传需求 1，同上
        assigned:'2',//0，aaa 1，bbb 2，ccc 3同上 
        taskType:'其他',//0，设计，1，开发，2，测试，3，研究，4，讨论。5，界面。6，事物。7，其他
        taskStatus:'进行中',
        progress:'0%',
        priority:'3',//1,2,3,4
        totalTimeConsuming:'2',
        expectedStart:'2019-06-06',
        actualStart:'2019-01-09',
        asOfTheDate:'2019-06-05',
    })
)

export default {
    // getTasksList: config =>{
    //     // const { page } = param2Obj(config.url)
    //     // const { limit } = param2Obj(config.url)
    //     const { isPublish } = param2Obj(config.url)
    //     // console.log('page',page);
    //     // console.log('limit',limit);
    //     if(isPublish == '0'){
    //         return {
    //             errcode:0,
    //             success:true,
    //             message: "列表获取成功。",
    //             data: List0,
    //         }
    //     }else if(isPublish == '1'){
    //         return {
    //             errcode:0,
    //             success:true,
    //             message: "列表获取成功。",
    //             data: List1,
    //         }
    //     }else if(isPublish == '2'){
    //         return {
    //             errcode:0,
    //             success:true,
    //             message: "列表获取成功。",
    //             data: List2,
    //         }
    //     }else{
    //         // console.log('返回全部数据');
    //         return {
    //             errcode:0,
    //             success:true,
    //             message: "列表获取成功。",
    //             data: List3,
    //         }
    //     }
    //     console.log('isPublish',isPublish);
    // },
    getTaskDetails:() =>{
        return {
            errcode:0,
            success:true,
            message: "列表详情获取成功。",
            data: details,
        }
    }
}
