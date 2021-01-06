import { param2Obj } from "@/utils"
import Mock from 'mockjs'

Mock.setup({
  timeout: '350-600'
})

const List = []
List.push(
    Mock.mock({
        isPublish:0,
        dates:[
            {
            dateTime: '08:00-08:40',
            weekInfo: [
                {
                weekName: '星期一',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }, {
                    name: '张家乐',
                    age: '22',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'vue'
                    }
                ]
                }, {
                weekName: '星期二',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期三',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期四',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期五',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期六',
                lecturer: [
                ]
                }, {
                weekName: '星期日',
                lecturer: [
                ]
                }
            ]
            }, {
            dateTime: '09:00-09:40',
            weekInfo: [
                {
                weekName: '星期一',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }, {
                    name: '张家乐',
                    age: '22',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'vue'
                    }
                ]
                }, {
                weekName: '星期二',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期三',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期四',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期五',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期六',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }, {
                weekName: '星期日',
                lecturer: [
                    {
                    name: '梦元',
                    age: '18',
                    six: '男',
                    jobTitle: '主讲老师',
                    project: 'java'
                    }
                ]
                }
            ]
            }
        ]
    })
)

const details = []
details.push(
    Mock.mock({
        isPublish:1,
        dates:[
            {
            'day': '1',
            'price': '张三'
            },
            {
            'day': '2',
            'price': ''
            },
            {
            'day': '3',
            'price': ''
            },

            {
            'day': '4',
            'price': ''
            },
            {
            'day': '5',
            'price': ''
            },
            {
            'day': '6',
            'price': '李四'
            },
            {
            'day': '7',
            'price': '王五'
            },
            {
            'day': '8',
            'price': ''
            },
            {
            'day': '9',
            'price': ''
            },
            {
            'day': '10',
            'price': ''
            },
            {
            'day': '11',
            'price': ''
            },
            {
            'day': '12',
            'price': ''
            },
            {
            'day': '13',
            'price': ''
            },
            {
            'day': '14',
            'price': ''
            },
            {
            'day': '15',
            'price': ''
            },
            {
            'day': '16',
            'price': ''
            },
            {
            'day': '17',
            'price': ''
            },
            {
            'day': '18',
            'price': ''
            },
            {
            'day': '19',
            'price': ''
            }, {
            'day': '20',
            'price': '老九'
            },
            {
            'day': '21',
            'price': ''
            }, {
            'day': '22',
            'price': ''
            }, {
            'day': '23',
            'price': ''
            }, {
            'day': '24',
            'price': '老六'
            },
            {
            'day': '25',
            'price': ''
            },
            {
            'day': '26',
            'price': ''
            },
            {
            'day': '27',
            'price': ''
            },
            {
            'day': '28',
            'price': '老七'
            },
            {
            'day': '29',
            'price': ''
            }, {
            'day': '30',
            'price': ''
            }, {
            'day': '31',
            'price': ''
            }
        ]
    })
)



export default {
    getStaffCalendarList: config => {
        const { isPublish } = param2Obj(config.url)
        // console.log('aaa',isPublish);
        if (isPublish == '0') {//周
            return {
                errcode:0,
                success:true,
                message: "人员日历获取成功。",
                data: List,
            }
        } else if (isPublish == '1') {//月
            return {
                errcode:0,
                success:true,
                message: "人员日历获取成功。",
                data: details,
            }
        }else{//默认周
            return {
                errcode:0,
                success:true,
                message: "人员日历获取成功。",
                data: List,
            }
        }
       
    }
}
