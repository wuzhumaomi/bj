# MOCK

## 1.设置eslint

​	 打开package.json，找到`eslintConfig`项，在找到其下的rules。配置`"no-console": "off"`。就可以关闭eslint对console的限制。 

```js
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {
      "no-console": "off"
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },

```

## 2.安装

```
D:\test\book>yarn add mockjs
```

## 3.使用

 在main.js的同级目录下新建mock.js。我们在mock.js里定义刚刚我们需要的login接口。代码如下： 

```
import Mock from 'mockjs'

Mock.mock('/login', 'post', (options) => {
  // console.log('options:', options)
  let data = JSON.parse(options.body)
  let name = data.name
  let password = data.password
  if (name === 'admin' && password === 'admin') {
    return {
      status: 1,
      message: '登录成功'
    }
  } else {
    return {
      status: 0,
      message: '账号或者密码错误'
    }
  }
})
```

### 调用的地方

​		引用

```
import login from '@/api/login'
```

​		使用

​			方法

```
onSubmit() {
      //  this.$router.push("/index");
      // service.post('login',this.form )
      // var cc = login.login(this.form);
      login.login(this.form).then(res => {
        if(res.success === false){
          this.$router.push("/page401");
        }else{
          this.$router.push("/binding");
        }
      })
      
    },
```

## 4.api

```
import service from './config'
class Login {
  login(params) {
    return service.post('login', params)
  }
}
export default new Login()
```

# 项目里的

## mock(文件夹)

### 	 / index.js

```
import text from './text'

const Mock = require('mockjs')

// 查询
Mock.mock(/\/login2/, 'get', text.getbugList)
Mock.mock(/\/login2/, 'post', text.getbugList)

export default Mock

```

### 	/text.js

```
import Mock from 'mockjs'

export default {
  getbugList: (options) => {
    let data = JSON.parse(options.body)
    return {
      data
    }
  }
}

```

## main.js

```
import Mock from './mock'


function mockXHR () {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  // function XHR2ExpressReqWrap(respond) {
  //   return function(options) {
  //     let result = null
  //     if (respond instanceof Function) {
  //       const { body, type, url } = options
  //       // https://expressjs.com/en/4x/api.html#req
  //       result = respond({
  //         method: type,
  //         body: JSON.parse(body),
  //         query: param2Obj(url)
  //       })
  //     } else {
  //       result = respond
  //     }
  //     return Mock.mock(result)
  //   }
  // }
}
mockXHR()
```

api/modules/system/login02.js

```
import service from './config'

class Login {
  login (params) {
  	//发送请求到/login2
    return service.post('login2', params)
  }
}
export default new Login()
```

