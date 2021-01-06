# 不要对第三方框架产生依赖，将其封装，模块化

# 一、配置

## 一、下载

```
npm install axios --save-dev
```

## 二、挂载

1. 任何地方都可以使用

   ```
   // 导入
   import axios from 'axios'//引入axios
   
   //把axios挂载到vue上
   Vue.prototype.$axios = axios;
   
   //在任何位置使用
   this.$axios.get('http://www.yjtj.com/phalapi/public/?service=App.Examples_CURD.GetList&typeid=11')
         .then(response => (this.info = response))
   ```

   

2. 在要用的vue页面、js文件

   ```
   // 导入
   import axios from 'axios';
   //使用
   axios.get('http://www.yjtj.com/phalapi/public/?service=App.Examples_CURD.GetList&typeid=11')
         .then(response => (this.info = response))
   ```

# 二、axios使用组成

## 一、单发  -------基础

```
    import {LoginApi} from '../api'
    import axios from 'axios'
    //重要 默认get方法
    axios({url:'http://123.207.32.32:8000/home/multidata'}).then(res=>{
        console.log(res);
    })
    
    axios({
        url:'http://123.207.32.32:8000/home/data?type=pop&page=1',
         //重要
        methods: 'get',
    }).then(res=>{
        console.log(res);
    })
    
    axios({
        //请求地址
        url:'http://123.207.32.32:8000/home/data',
        // 请求类型
        methods: 'get',
        // URL查询对象 传参
        params:{type:'pop',pages:1},
        // request doby 请求体
        data:{key:'aa'}
    }).then(res=>{
        console.log(res);
    })
```



## 二、并发请求 

ps：返回结果是一个数组

```
    axios.all([
        axios({url:'http://123.207.32.32:8000/home/multidata'}),
        axios({
            url:'http://123.207.32.32:8000/home/data',
            methods: 'get',
            params:{type:'pop',pages:1}
        })
    ]).then(res=>{
        console.log(res);
    })
    
    axios.all([
        axios({url:'http://123.207.32.32:8000/home/multidata'}),
        axios({
            url:'http://123.207.32.32:8000/home/data',
            methods: 'get',
            params:{type:'pop',pages:1}
        })
        //重要 解析数组
    ]).then(axios.spread((res1,res2)=>{
        console.log(res1);
        console.log(res2);
    }))
```

## 小知识点：数组的解刨

```
const names = ['name1','name2','name3','name4']
const [name1,name2,name3] = names
name1 = 'name1'
```



# 三、全局配置 

不建议使用，用下面的实例

所有请求都会按照全局配置来

```
    axios({url:'http://123.207.32.32:8000/home/multidata'}).then(res=>{
        console.log(res);
    })
    
    ===
    
    //请求路径
    axios.defaults.baseURL = 'http://123.207.32.32:8000'
    // 超时时间
    axios.defaults.timeout = 5000
    
    +
    
    axios({url:'/home/multidata'}).then(res=>{
        console.log(res);
    })
    
 ps：url:'http://123.207.32.32:8000/home/multidata' 仍然可用
    
```

# 四、创建对应的axios实例

ps：可以针对不同的服务器端口来使用

```
//创建对应的axios实例
const axios01 = axios.create({
    //请求路径
    baseURL: 'http://123.207.32.32:8000',
    // 超时时间
    timeout: 5000
})

    axios.all([
    	// 重要
        axios01({url:'/home/multidata'}),
        axios01({
            url:'/home/data',
            methods: 'get',
            params:{type:'pop',pages:1}
        })
    ]).then(axios.spread((res1,res2)=>{
        console.log(res1);
        console.log(res2);
    }))
```

# 五、封装一个axios模块

## 1.Promise使用

```
export function requerst(url) {
        return new Promise(((resolve, reject) => {
            //创建对应的axios实例
            const axios02 = axios.create({
                //请求路径
                baseURL: 'http://123.207.32.32:8000',
                // 超时时间
                timeout: 5000
            })

            return axios02({
                url,
                methods: 'get',
                params:{type:'pop',pages:1}
            }).then(res=>{
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }))
    }

    requerst('/home/data').then(res => {
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
```

## 2.不使用Promise

因为axios的返回值本身就是一个Promise

```
    export function requerst(url) {
        const axios02 = axios.create({
            //请求路径
            baseURL: 'http://123.207.32.32:8000',
            // 超时时间
            timeout: 5000
        })
        return axios02({
            url,
            methods: 'get',
            params:{type:'pop',pages:1}
        })
    }

    requerst('/home/data')
    .then(res => {
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
```

## 3.拦截

```
    export function requerst(url) {
        const axios02 = axios.create({
            //请求路径
            baseURL: 'http://123.207.32.32:8000',
            // 超时时间
            timeout: 5000
        })
        
        // 请求 拦截器
        // 用来适配服务器，让config符合服务器，或者做一些其他操作如加载时显示加载图标
        // 是不是某些接口，来做判断
        axios02.interceptors.request.use(config => {
            console.log(config);
            //必须不然报错
            return config
        },err => {
            console.log(err);
        })
        // 响应拦截
        // 一般用于响应结果 成功返回data去掉乱七八糟的东西 失败弹出错误框提示用户
        axios02.interceptors.response.use(res => {
            console.log(res);
            return res.data
        },err => {
            console.log(err);
        })

        return axios02({
            url,
            methods: 'get',
            params:{type:'pop',pages:1}
        })
    }

    requerst('/home/data').then(res => {
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
```



## 项目在使用时

```
// 后台返回data
 getbugList: (options) => {
    debugger
    let data = JSON.parse(options.body)
    console.log(data);
    return {
      data:{
        ...options,
        data:"123456",
      }
    }
  }
//接口部分
import {Interface} from '@/api/request'

login:Interface.post('/login2')

//axios 定义方面 ps：箭头函数
export const Interface = {
  get: url => params => service.get(url, { params }).then(res => res.data),
  post: url => data => service.post(url, { data }).then(res => res.data),
}


// 登录使用
import {Login} from '@/api/index'

Login.login('66666')
 .then(params=>{
 	debugger
 	console.log(params);
 }).catch(error=>{
	 console.log(error);
 })
```



## 小知识点：回调

```
    function f(ifTrue,fun1,fun2) {
        if(ifTrue){
            fun1('true')
        }else {
            fun2('false')
        }
    }

    f(ifTrue,function () {
        console.log('true');
    },function () {
        console.log('false');
    })
```

# 六、使用

## post方式发送formdata数据

```
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到

const service = axios.create({
  //请求路径
  baseURL: process.env.NODE_ENV == 'development'?'/apis':'http://superadmin.anjyzn.cn/',
  timeout:10000,
  headers:{
  	//重要 
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  }
})

export const Interface = {
  post: url => data =>{
    console.log('post请求 ------', data);
    //重要
    return service.post(url,QS.stringify(data)).then(res => res.data)
  },
}

```

### qs概述

将url中的参数转为对象；

将对象转为url参数形式

```
import qs from 'qs';
const url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
// 转为对象
console.log(qs.parse(url));
const a = {name:'hehe',age:10};
// 转为url参数形式
console.log(qs.stringify(a))

```

## getByID

```
  getById: url => (id,params) =>{
    console.log('get请求 ------',id,params);
    let path = url + ''
    path = path.replace(/\{id\}/g, id);  
    return service.get(path,{ params }).then(res => res.data)
  },
```

