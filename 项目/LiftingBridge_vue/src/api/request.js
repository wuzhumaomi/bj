import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
import moment from 'moment'
import { baseURL } from '@/config'

axios.defaults.withCredentials = true

const alert = msg => {
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}

const handleError = error => {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 401:
      case 403:
        window.localStorage.clear()
        // window.location.href = config.loginUrl
        window.location.href = '/login'
        break
      case 404:
        alert('资源不存在或已被删除！')
        break
      case 400:
        alert('请求错误！')
        break
      case 504:
        alert('网络连接失败！')
        break
      default:
        alert('服务器出现故障！')
        break
    }
    console.log(data)
    return new Promise(() => {})
  }
  return Promise.reject(error)
}

const handleResponse = response => {
  const res = response.data
  if (res.errcode !== 0) {
    alert(res.message)
    // Message({
    //   message: res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.errcode === 50008 || res.errcode === 50012 || res.errcode === 50014) {
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')
  } else {
    return response.data
  }
}

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }// ,
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if(config.url.substring(config.url.length - 5) === '-json') {
      config.headers['Content-Type']="application/json"
      config.url = config.url.substring(0, config.url.length - 5)
    }
    // if(config.url === '/project/addProject'){
    //   config.headers['Content-Type']="application/json"
    // }
    // if(config.url === '/project/editProject'){
    //   config.headers['Content-Type']="application/json"
    // }
    // if(config.url === '/mySchedule/createMySchedule'){
    //   config.headers['Content-Type']="application/json"
    // }
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['X-Token'] = getToken()
      config.headers['ACCESS_TOKEN'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(handleResponse, handleError)

export const factory = {
  get: path => params => service.get(path, { params }).then(res => res.data),
  getById: path => (id) => service.get(`${path}/${id}`).then(res => res.data),
  put: path => (id, data) => service.put(`${path}/${id}`, data).then(res => res.data),
  delete: path => (id) => service.delete(`${path}/${id}`).then(res => res.data),
  post: path => data => service.post(path, data).then(res => res.data),
  postForm: path => data => service.post(path, qs.stringify(data, {
    serializeDate: (date) => {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  })).then(res => res.data)
}

export default service
