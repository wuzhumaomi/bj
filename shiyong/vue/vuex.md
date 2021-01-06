# vuex

 	*Vuex* *是*一个专为 Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 
 	

### vue---vux详解

- [VUEX 全局状态管理器](https://blog.csdn.net/qq_34182705/article/details/107188588#VUEX___2)
- - [什么样的数据需要放在vuex中？](https://blog.csdn.net/qq_34182705/article/details/107188588#vuex_15)
  - [参数---详解](https://blog.csdn.net/qq_34182705/article/details/107188588#_20)
  - - [`state`](https://blog.csdn.net/qq_34182705/article/details/107188588#state_22)
    - [`geeters`](https://blog.csdn.net/qq_34182705/article/details/107188588#geeters_37)
    - [`mutations`](https://blog.csdn.net/qq_34182705/article/details/107188588#mutations_59)
    - [`actions`](https://blog.csdn.net/qq_34182705/article/details/107188588#actions_85)
    - [`modules`](https://blog.csdn.net/qq_34182705/article/details/107188588#modules_126)
    - - [使用](https://blog.csdn.net/qq_34182705/article/details/107188588#_132)
      - - [modules----state的使用及调用](https://blog.csdn.net/qq_34182705/article/details/107188588#modulesstate_157)
        - [modules----getters的使用及调用](https://blog.csdn.net/qq_34182705/article/details/107188588#modulesgetters_175)
        - [modules----mutations的使用及调用](https://blog.csdn.net/qq_34182705/article/details/107188588#modulesmutations_200)
        - [modules----actions的使用及调用](https://blog.csdn.net/qq_34182705/article/details/107188588#modulesactions_225)
  - [namespaced---命名空间](https://blog.csdn.net/qq_34182705/article/details/107188588#namespaced_258)
  - - [getters有命名空间](https://blog.csdn.net/qq_34182705/article/details/107188588#getters_277)
    - [mutations有命名空间](https://blog.csdn.net/qq_34182705/article/details/107188588#mutations_285)
    - [actions有命名空间](https://blog.csdn.net/qq_34182705/article/details/107188588#actions_291)
  - [问题----如何在vuex中调用vuex中的方法或事件](https://blog.csdn.net/qq_34182705/article/details/107188588#vuexvuex_301)
  - [使用映射解构的方法在组件中直接调用对应事件，数据名等](https://blog.csdn.net/qq_34182705/article/details/107188588#_305)



# VUEX 全局状态管理器

- vue的全局状态管理器
- 实现组件之间跨层传递数据
- 实现数据与视图响应式更新
- `state`
- `geeters`
- `mutations`
- `actions`
- `modules`
- `namespaced`----命名空间

## 什么样的数据需要放在vuex中？

- 需要多个组件使用的数据，或者方法

## 参数—详解

### `state`

- 相当于vue中的data，用来存储数据的,在vue组件中获取，用 `$store.state.数据名字`

```js
// 数据
state: {
	// 这个数据写死了
	goods : [{"buy_limit":5,"img_url":"\/\/i8.mifile.cn\/v1\/a1\/ef617fac-7489-436d-b74e-c43582f09633.jpg","num":1,"price":899,"name":"\u5c0f\u7c73\u7535\u89c64A 32\u82f1\u5bf8","goods_id":2172700021,"select":true},{"buy_limit":1,"img_url":"\/\/i8.mifile.cn\/v1\/a1\/65be1bac-6d3f-3766-3bac-c11b3aa13b8e.webp","num":1,"price":1199,"name":"Redmi Note 7 4GB+64GB \u68a6\u5e7b\u84dd","goods_id":2185200032,"select":true},{"buy_limit":5,"img_url":"\/\/i8.mifile.cn\/a1\/pms_1514387870.88251945.jpg","num":1,"price":3599,"name":"\u5c0f\u7c73\u7b14\u8bb0\u672cAir 12.5  4G 128G \u94f6\u8272","goods_id":2175200001,"select":true}]
}
						<!-- // 调用          goods，就是数据名字-->
<div class="good" v-for="good in $store.state.goods" :key="good.goods_id">
```

### `geeters`

```
- `getters 从现有数据获取到新的数据`，相当于vue组件中的`computed`
- `名字 : state => { 逻辑。。。 ; return 数据}`
- 在vue组件中获取：`$store.gettes.数据名字`
123
// 使用
getters : {
  goodNum : state => {
	  let num = 0;
	  state.goods.forEach( item => {
		  num += item.num;
	  })
	  return num;
  }
},
						<!-- 调用       goodNum就是已经计算过的数据名字   -->
 <van-tabbar-item to="/cart" icon="setting-o" :badge="$store.getters.goodNum">
```

### `mutations`

- `mutations` 方法，操作数据，相当于vue组件中的`methods`
- 在vue组件中使用方法：`$store.commit("传过来的事件名字",需要传递的参数);`

```js
// 使用
mutations: {
	// delGood事件名字，(state,good),state:对应state中的数据，good:对应组件传递过来的参数
	delGoodVuex(state,good) {
		var flag = window.confirm("你确定要删除码？");
		if(flag) {
			var index = state.goods.indexOf(good);
			state.goods.splice(index,1);
	}
},
// 调用
// delGood 是vue中的事件，
delGood() {
	// this.$store.commit 就是接收，vuex中的事件delGoodVuex，且传递参数this.good.num，
	this.$store.commit("delGoodVuex",this.good.num);
},
```

### `actions`

- 关于Ajax异步的方法需要放在`actions`中，执行异步的方法
- actions 方法，可以执行异步操作方法，相当于vue组件中的`methods`
- 在vue组件中使用：`$store.dispatch("方法名字",data);`
- 使用：方法名字({commit},[参数]) { ajax方法};

```js
actions: {
  // 解构mutations中的所有方法
  getCart({commit}) {
	  getCartAPI()
	  .then( res => {
		  // 已经结构了vuex中的mutations中的方法，
		  // 所以调用初始化购物车的方法只需要：commit("方法名字",需要传输过来的数据)；
		  // 这里是因为调用了vuex本身的事件方法，所以使用此写法
		  // 因为commit 是已经解构的方法，所以只需正确的找到需要的方法就行了，如果传参，就写参数
		  commit("INIT_CART",res.data);
	  })
	  .catch( err => {
		  console.log(err);
	  })
  }
},
mutations : {
	// 初始化购物车的方法
	INIT_CART(state,goods) {
		state.goods = goods;
	}
}
```

- 调用actions中的方法时
- `$store.dispatch("方法名字");`
- 方法名字：就是在actions中定义的方法的名字

```js
// 调用actions的方法 
// 在vue中调用vuex的actions中的方法
this.$store.dispatch("getCart");
```

### `modules`

- 模块
- Vuex允许将store分割成模块(module)
- 每一个模块都有vuex中的所有方法，`state`，`mutations`，`actions`，`getters`

#### 使用

- 在store文件夹下，创建modules文件夹，在其下在创建对应的vuex模块：比如：登录模块的`login.js`

```js
// 登录模块的state
const state = {}
// 登录模块的getters
const getters = {}
// 登录模块的mutations
const mutations = {}
// 登录模块的actions
const actions = {}
// 导出默认的模块方法
export default {state,getters,mutations,actions}
```

- 需要将模块导入vuex中，在注册

```js
// 导入 login模块
import login from './modules/Login.js'
// 注册到vuex中
modules : {
	login
}
```

##### modules----state的使用及调用

- state就是存储数据的
- modules中的state是每个模块私有的，有命名空间
- 调用使用：`$store.state.注册的模块名.参数等`

```js
// 使用，存储数据
const state = {
	name : "momo",
	age : 20
}
12345
<!-- 调用 -->
				<!-- 获取vuex登录模块中的名字，年龄 -->
<p>获取vuex中的模块数据 {{$store.state.login.name}}----{{$store.state.login.age}}</p>
```

##### modules----getters的使用及调用

- 对应的方法有三个参数，且它不是私有，默认没有命名空间
- 参数1：`state 自己这个模块的state`
- 参数2：`getters 全局的getters，包括模块的getters`
- 参数3：`rootState 全局的state`

```js
// 使用
const getters = {
	<!-- 参数1，参数2，参数3，参考以上 -->
	getGoods(state,getters,rootState){
		console.log(state,getters,rootState)
		return getters.goodNum;
	}
}
```

- getters没有命名空间所以直接访问vuex中的gettser就可以访问到模块中的数据
- `$store.getters.模块中的getters中的数据名字`

```html
<!--    getters没有命名空间所以直接访问vuex中的gettser就可以访问到模块中的数据 -->
<p>getter:{{$store.getters.getGoods}}</p>
```

##### modules----mutations的使用及调用

- 与vue中的正常使用一样
- 模块中的mutations也是没有命名空间的，所以也可以直接使用
- vuex中的调用mutations的方法进行调用
- `$store.commit("需要调用的模块中的方法名字",需要传递的参数)`

```js
// 使用
const mutations = {
	ADD_AGE(state,step=1) {
		state.age += step;
	}
}
```

- 调用
- `$store.commit("需要调用的模块中的方法名字",需要传递的参数)`

```html
<!-- 调用 -->
			<!-- 调用模块方法数据 -->
<button @click="$store.commit('ADD_AGE')">年龄加</button>
```

##### modules----actions的使用及调用

- 用法与vuex中的差不多
- 其中vuex中的{commit}解构vuex中的方法，模块中的{context},得到上下文中的所有方法
- 具体情况可以自行打印查看
- `方法名字({context},[参数]) { 逻辑 }`

```js
// 使用
const actions = {
	addAge(context,arg){
		// 这个是调用上下文中定义mutations的ADD_AGE事件
		context.commit("ADD_AGE",arg);
		var good = {"buy_limit":5,"img_url":"\/\/i8.mifile.cn\/v1\/a1\/ef617fac-7489-436d-b74e-c43582f09633.jpg","num":2,"price":8990,"name":"小米55","goods_id":2172700028,"select":true};
		console.log(context);
		 // 模块访问vuex中全局的方法
		 context.commit("addGood",good);
		 // 模块可以访问vuex全局的state
		 context.rootState.goods.pop();
	}
}
12345678910111213
```

- 因为没有命名空间，所以可以直接使用vuex的调用方法进行调用
- `$store.dispatch('需要调用的模块的actions方法')`

```html
<!-- 调用 -->
	<!--  -->
<button @click="$store.dispatch('addAge')">actions年龄减</button>
```

## namespaced—命名空间

- namespaced : true/false
- true：打开命名空间
- false：反之
- 在导出的时候添加模块的命名空间

```js
// 导出
export default {
	// 命名空间
	namespaced : true,
	state,
	getters,
	mutations,
	actions
}

```

### getters有命名空间

- 参数：`数据名字(state,getters,rootState,rootGetters) {逻辑; return 数据}`
- 访问：`$store.getters["模块名字/数据名字"];`
- 映射方法：`...mapGetters["模块名字/数据名字"]`

### mutations有命名空间

- 参数：`方法名字(state,参数);`
- 访问：`$store.commit("模块名字/方法名字",需要传递的数据参数)`
- 映射方法：`...mapMutations["模块名字/数据名字"]`

### actions有命名空间

- 参数：`方法名字({dispatch,commit,getters,rootGetters},参数);`
- 参数：`方法名字(context,参数);`
- 访问：`$store.dispatch("模块名字/方法名字",需要传递的数据参数)`
- 映射方法：`...mapDispatch["模块名字/数据名字"]`

## 问题----如何在vuex中调用vuex中的方法或事件

- 使用：`this.commit("需要调用的方法")`

## 使用映射解构的方法在组件中直接调用对应事件，数据名等

- 那个组件使用那个vuex中的属性就导入对应的映射方法
- 映射方法对应：`mapState`,`mapGetters`,`mapMutations`,`mapActions`
- 导入方法：`import {对应的映射方法} from 'vuex';`
- 使用方法：`...对应的映射方法(['需要调用的vuex的方法，或者数据'])`
- 原因：这样可以不用在写，`$store.state.数据名`等这种
- vuex中`getters` 映射成vue中的`computed` 就是对应的使用方法需要在对用映射成的vue的方法中才能使用
- vuex中的`actions` ，映射成vue中的`methds`
- 需要使用时，就跟使用vue中的数据，方法一样

```js
// 导入映射的vuex的方法
	// vuex中getters 映射成vue中的computed
	// vuex中的actions ，映射成vue中的methds
import {mapGetters,mapActions} from 'vuex';
import Bus from '@/utils/Bus.js';
export default{
	data(){return {
		isShow:true,
		active : 0
	}},
	computed : {
		...mapGetters(['goodNum'])
	},
	created(){
		// 因为有了映射的方法，我们就不用再使用dispatch这种了
		// this.$store.dispatch("getCart");
		this.getCart();
	},
	methods : {
		...mapActions(["getCart"])
	}
}
```

# 一、安装

```
我用的的这个
npm add vuex
人家要用的是
npm install vue --save
```

# 二、到main里面安装以及初始化一下

```
import Vue from 'vue'
// 使用vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 可以放多个{} 需要取名字如user:{},使用时如this.$store.state.user.name

const store = new Vuex.Store({
  state: {
    count: 100
  },
  //你不能直接调用一个 mutation handler。
  mutations: {
  	//不传值的
    //increment (state) {
    //传值的
    increment (state,val) {
    //这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
    //第二个是你传过来的值，可以是对象
    console.log(val);
      state.count++
    }
  }
})

new Vue({
 router,
 // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
 store,
 render: h => h(App),
}).$mount('#app')
```

# 三、到组件里使用

## 显示

```
 {{this.$store.state.count}}
```

## 提交，去改变值

```
 1.调用方法不传值得
 this.$store.commit('increment');
 2.传值得
 this.$store.commit('increment','ok,了');
```

**ps：**

​		1.'increment'   这是他的***函数名***

​		2.我直接在按钮标签里使用this.store.commit('increment');发现没用，但是在methdos里使用可以

**官方原话**

 再次强调，我们通过提交 mutation 的方式，而***非直接改变*** `store.state.count`，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。 

*所以你每commit一次，就是调用了一次他的方法而已，并不是直接的赋值*

# 四、理解vux

![vuex](https://vuex.vuejs.org/vuex.png)

- **state**，驱动应用的数据源；

- ```
  state: {
      count: 100
    },
  ```

  

- **view**，以声明方式将 **state** 映射到视图；

- ```
   {{this.store.state.count}}
  ```

- **Mutations**,提交调用的函数

- ```
  mutations: {
      increment (state) {
        state.count++
      }
    }
  ```

  

- **actions**，响应在 **view** 上的用户输入导致的状态变化。

- ```
    this.store.commit('increment');
  ```

  

# 项目中使用的Vuex存储用户相关信息

vue element admin的 vux 使用

## vux的所在文件夹

![image-20201223150203544](..\img\vue-vuex\image-20201223150203544.png)

## main.js

```js
// 导入vux的整个相关文件夹
import store from './store'

// 挂载
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

## index

```js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store

```

## getters



```js
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
```

## user

其中一个模块所用的东西

```js
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
// 登录api
import { LoginApi } from '@/api/index'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 读取用户信息 疑点commit后的数据才能用
  getInfo({ commit, state },token) {
    // debugger
    // vue添加toke
    // 我改的
    commit('SET_TOKEN', token)
    return new Promise((resolve, reject) => {
      // getInfo(token).then(response => {
      // 直接通过
      if (false){
        let data = {
          // 角色权限
          roles: ['editor', 'test', 'disclosure2'],
          // 介绍
          introduction: '我是一个程序小小白',
          // 头像
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          // 名字
          name: '前端小小白'
        }
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction)
        resolve(data)
        // return
      }

      LoginApi.userInfo().then(response => {
        let data = {
          // 角色权限
          roles: ['editor', 'test', 'disclosure2'],
          // 介绍
          introduction: '我是一个程序小小白',
          // 头像
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          // 名字
          name: response.username
        }
        const { roles, name, avatar, introduction } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    // setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

```

## 使用

```
import store from './store'
//调用方法
const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
//获取数据
store.getters.roles


挂载还可以这样使用
this.$store.state.user.name
```

ps：await可以等待异步有返回的时候在进行下一步