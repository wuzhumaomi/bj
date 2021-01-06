## 封装的axios请求的文件

```
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,// request timeout
  headers:{
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // debugger
    // store.getters.token
    // getToken()
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      // 自己用的token
      config.headers['accessToken'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code != 200 && res.code !== 20000) {
      Message({
        message: res.message || res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg?error.msg:error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

// 自己封装的请求事件
export const Request = {
  get: url => params =>{
    // console.log('get请求 ------',params);
    return service.get(url, { params }).then(res => res.data)
  },
  getById: url => (id,params) =>{
    // console.log('get请求 ------',id,params);
    let path = url + ''
    path = path.replace(/\{id\}/g, id);  
    return service.get(path,{ params }).then(res => res.data)
  },
  postFrom: url => data =>{
    // console.log('post请求 参数为表单方式 ------', data);
    return service.post(url,QS.stringify(data)).then(res => res.data)
  },
}
```

## 总的接口导出

```
export  {default as LoginApi} from '@/api/components/login/index' 

export  {default as DisclosureApi} from '@/api/components/disclosure' 
// export  {default as UserApi} from '@/api/components/user' 
```

## 一个模块的所有接口

```
import {Request} from '@/utils/request'

export default {
  login:Request.get('/api/app/auth/department/login')
}
```

