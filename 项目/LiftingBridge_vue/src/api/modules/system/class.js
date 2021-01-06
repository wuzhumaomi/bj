import { factory } from '../../request'

export default {
  listClass: factory.get('/class/list'),
  listClassTree: factory.get('/class/listTree'),
  createClass: factory.postForm('/class/create'),
  updateClass: factory.postForm('/class/update'),
  deleteClass: factory.postForm('/class/delete'),
  classFilter: (options, value) => {
    const allValue = options.reduce((acc, cur) => {
      acc[cur.code] = cur.text
      return acc
    }, {})
    return allValue[value]
  },
  classProject: (options, value) => {//所属项目
    const allValue = options.reduce((acc, cur) => {
      acc[cur.id] = cur.proNm
      return acc
    }, {})
    return allValue[value]
  },
  classAssignedsHeadPens: (options, value) => {//指派//负责
    // console.log('options',options);
    const allValue = options.reduce((acc, cur) => {
    // console.log('acc',acc);
    // console.log('cur',cur);
      acc[cur.personId] = cur.name
      return acc
    }, {})
    return allValue[value]
  },
  classModules: (options, value) => {//模块
    // console.log('options',options);
    const allValue = options.reduce((acc, cur) => {
    // console.log('acc',acc);
    // console.log('cur',cur);
      acc[cur.id] = cur.modNm
      return acc
    }, {})
    return allValue[value]
  },
  classRequirements: (options, value) => {//需求
    // console.log('options',options);
    const allValue = options.reduce((acc, cur) => {
    // console.log('acc',acc);
    // console.log('cur',cur);
      acc[cur.id] = cur.demandNm
      return acc
    }, {})
    return allValue[value]
  },
  

}
