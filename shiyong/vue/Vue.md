# 项目开始 cli

```vue
下载node.js http://nodejs.cn/download/
node -v

//安装yarn
npm install -g yarn

//可视化
vue ui

npm == yarn

//安装vue，vue-cli
npm install -g @vue/cli
或
yarn global add @vue/cli

//卸载vue以及vue-cli
npm uninstall @vue/cli -g 
或 
yarn global remove @vue/cli

//查看vue
vue --version
或
大写的V
vue -V

//安装路由
yarn add vue-router
//安装mock
yarn add mockjs
//安装element
npm i element-ui -S

//创建项目
vue create .

c: >>>到c盘
cd >>>>直接复制地址，到这个盘里的那个地方

//运行项目
yarn serve

//打包项目
 yarn build

//更新vue
npm install vue@2.6.11 --save
```

ps:

Vue packages version mismatch:

- vue@2.6.10 (C:\Users\Administrator\node_modules\vue\dist\vue.runtime.common.js)
- vue-template-compiler@2.6.11 (C:\Users\Administrator\AppData\Roaming\npm\node_modules\@vue\cli\node_modules\vue-template-compiler\package.json)

**版本不匹配将vue更新到和下面那个一样的版本就行了**

**//更新vue**
**npm install vue@2.6.11 --save**

## vue的基础属性

```
vue 
	1.el 》》》声明  》》》》》》name: 'app',一样
	2.data(){	》》》》初始化属性（类似于数据仓库）
					return{
						name:"laoSun"
					}
				}
	3. methods:{   》》》》》》方法
             cc(i){
              console.log(i);
             },
     4.computed: {	》》》》》》计算
           zong:function(){
            let zong = 0;
             for(let i of this.server01){
             zong +=  i.shu*i.jiaGe;
             }
             return zong;
           },
           
5.  <td>{{i.jiaGe | guo[(num)]}}</td>		》》》》过滤器
 ps：forEach异步 return无用
 
  filters:{
    guo(shu[,num]){
      return "$"+shu.toFixed(2);
    }
  },
	85 =>>> 85.00

              
    6.components 			》》》》》》组件
    	components:{
					cpn:npc01
				}
	7.watch:{ //>>>>>>>>监听>>>>>> 当属性发生变化时调用里面的方法
        editForm:{	//editForm》》》》》》》》》》》》属性名
          handler:function(val,oldval){
          				//val》》》》》》》》》》》》新的值
             console.log("mounted >>>>>>>> ")
          },
          deep:true//对象内部的属性监听，也叫深度监听
        }
      },
      	watch: {
            'cityName.name': { 》》》》对象里的某一个属性
              handler(newName, oldName) {
              // ...
              },
              deep: true,
              immediate: true
            }
          }
	  //string类型
      watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        fileName: function (newQuestion, oldQuestion) {
          alert(">>>>>>>>>>>>>>>>>> "+newQuestion);
        }
      },
	8.props: ['searchVal'], 《《《《 接收值
```

### 使用 this 

    1.	<script>
        var tht;
        export default {
    
    2.  beforeCreate: function () { 
    		tht = this;        
    	},
## vue生命周期

### 0.beforeCreate（创建前的时候）

```
beforeCreate: function () { 
	tht = this;        
},
```

### 1.created（创建完成的时候）

```
在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
	
	created:function(){
            this.name="唐浩益"
            this.age = "12"
            this.fangFa01
        }
```

### 2.mounted（渲染的时候）

```
在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
```

### 3.updated（界面更新的时候）

```
updated(){
		页面发生更新时调用
	}
```

在created的时候，视图中的html并没有渲染出来，所以此时如果直接去操作html的dom节点，一定找不到相关的元素

而在mounted中，由于此时html已经渲染出来了，所以可以直接操作dom节点，故输出了结果“唐浩益”。

1.向一个组件内添加属性

```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

 activated钩子则不受缓存的影响，每次重新回到主页都会执行。 

# 基础模板

```
<template>
  <div class="workingTable">
    
  </div>
</template>
<script>
export default {
  name:"workingTable",
  data() {
    return {
    }
  },
    // 渲染之后
  mounted:function () {
  },
  created:function () {
    
  },
 
  methods:{
  }
}
</script>
<style  lang="scss">
  .workingTable{
   
  }
</style>
```



# 常用

### 		1.定时器

js 定时器有以下两个方法：

- setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
- setTimeout() ：在指定的毫秒数后调用函数或计算表达式。

```
 //只运行一次
 setTimeout(() => {
   document.getElementById("DOW2").submit();
 },500)
 //循环调用
 setInterval(() => {
   this.getInfo()
 }, 1000)
  
```

### 2.FOR （关键字entries）

​			

```
for(let index of [‘a’,‘b’,‘c’].keys()) //遍历数组的元素索引

index = 0 1 2 

for(let value of [‘a’,‘b’,‘c’].values()) //遍历数组的元素值

value = a b c 

for(let [index,value] of [‘a’,‘b’,‘c’].entries()) //遍历数组的index和value
index  value
  0      a
  1      b
  3      c

在标签里	v-for="vue of videoList" :key='vue.id'
```

### 3.JSON

例子：

```
var employees = [
{ "firstName":"Bill" , "lastName":"Gates" },
{ "firstName":"George" , "lastName":"Bush" },
{ "firstName":"Thomas" , "lastName": "Carter" }
];
```

可以像这样访问 JavaScript 对象数组中的第一项：

```
employees[0].lastName;
```

#### json文本和json对象的互相转换

```
文本转对象： 
JSON.parse(str)  
对象转文本：
JSON.stringify()
```

### 4.获得标签里面的东西

​		标签的点击事件

```
 @click='clickfun($event)'
```

```
alert(e.target.innerHTML);
alert(e.target.innerText);
alert(e.target.getAttribute("fileId"));
```

### 5.img src

```
surl:require('../assets/logo.png')
```

## 6.vue全局数据

```
在.evn文件里面写上
属性名必须VUE_APP_开头
VUE_APP_变量名 = 值

process.env.VUE_APP_变量名 用这个就哪里都可以读到这个变量了
```



# 使用对象以及数组对class进行操作

## 对象语法

```vue
html >>>>>> <div  :class="{ccc:isClass}"></div>
		   <div  :class="{ccc:isClass,bbb:!isClass}"></div>
		   <div class="aaa" :class="{ccc:isClass,bbb:!isClass}"></div>
		   <div class="aaa" :class="{getcla()}"></div>
script >>>>>>   methods:{
               getcla(){
                 return {ccc:this.isClass,bbb:!this.isClass};
               },
```

```
 this.$set(对象,属性,值)
```

## 计算属性（computed）

```vue
{{fullname}} 调用方法

computed: {
    fullname: function () {
        return this.c01 +" "+this.c02;
    }
  }


```

#### 变量.toFixed(2)

85 =>>> 85.00

## 强转

```
1. 转换函数

/*整数*/parseInt(string)

/*分数*/parseFloat(string)

/*Number*/Number(val)

保留几位小数在方法后面加.toFixed()，比如去分数保留2位小数parseFloat(string).toFixed(2)；

2. 强制类型转换  

Boolean(value)——把给定的值转换成Boolean型 

Number(value)——把给定的值转换成数字（可以是整数或浮点数） 

String(value)——把给定的值转换成字符串

3. 利用js变量弱类型转换 

举个小例子，一看，就会明白了。 

复制代码 代码如下:

var str= '012.345 '; var x = str-0; x = x*1;

```



## methods

```
 methods:{
               getcla(){
                 return {ccc:this.isClass,bbb:!this.isClass};
               },
               
```

## 计算属性和methods区别

1.computed不管在那个地方调用，调用多少次，只要内容不变，每次加载只调用一次，而methods，调用一次，就执行一次，相比之下methods 要浪费不少资源

## 三元运算

```vue
 {{user.name=="老王"?"yes":"no"}}
```

## 悬浮其上

```
 @mouseover="text03()"  @mouseout="text02()"
```

## 点击

```vue
@click = "click(indext)"
事件			传参

i 接收
click(i){
	console.log(i);
}

等于true时点击事件不可以用
 v-bind:disabled="false" 


 @click='clickfun($event)' 》》》》传递元素本身
	alert(e.target.innerHTML);
	alert(e.target.getAttribute("url"));

 	alert(e.target.innerHTML);读取标签“里”的一切原始模样包括标签
    alert(e.target.innerText);读取标签 里 的文本
    alert(e.target.getAttribute("url"));读取属性
    alert(e.target.setAttribute("名字","url"));设置属性

```

## input

```HTML
<input type="number" name="kuan" v-model="daXiao.kuan" @input="kuan01"/>
```

type="number"	只能输入数字的输入框

@input="kuan01"	当内容发生改变时触发kuan01事件

```js
methods:{
		kuan01(i){
						var div01 = document.getElementById("neiRong").childNodes;
						console.log(getComputedStyle(div01[0], null)['height']);
						console.log(i.target.value);
					}
```

i.target.value	改变后的值

# 组件化 

**ps：一个组件应该只有一个根元素（如：一个div包住所有的东西）**

新建一个VUE文件，把你需要的东西放里面

在需要的文件里引用

1. 引用

   ```
   improt COMPONENT from '路径'
   ```

2. 注册

   ```
   components:{
   	COMPONENT
   }
   ```

3. 使用

   ```
   <COMPONENT></COMPONENT>
   ```

***ps:搭配插槽使用更佳***

## 组件全局化

1.在components下创建一个文件，这个文件中写自己想写的组件。

2.组件写完后要进行引入和全局注册方法

main中

```javascript
import Message from './components/Message.vue'
Vue.component('Message', Message) //参数1为组件名，参数2为使用的组件
```

3.main引入后就可以在文件中使用了

```javascript
<template>
    <div class="h-main home">
        <Message></Message>
    </div>
</template>
```

4.组件肯定有自己的属性，要如何设置属性呢....  ⬇

Ⅰ，在我们子组件data中定义属性名，在父组件使用的时候传值这里接收

```javascript
props: [
    'place'
],
```

Ⅱ，父组件使用

```javascript
<template>
    <div class="h-main home">
        <Message place="left"></Message>
    </div>
</template>
```



------

***（下面的老的一批的东西，没怎么用过，学习记录）***

## 基础，数据的传入传出

```js
		1.基础	
			const cpnC = Vue.extend({
				template:`
				<div>
					<h2>我就是不一样</h2>
					<i>老王不在家</i>
				</div>
					`
			});
		2.全局main
            写法一
            	Vue.component("ha",cpnC);	》》》》》全局声明	
            写法二
            	 Vue.component("ha",{
				template:`
                        <div>
                            <h2>我就是不一样</h2>
                            <i>老王不在家</i>
                        </div>
					`
				});
		3.局部
            let vue01 = new Vue({
                el:"#app",
                components:{
                	cpn:cpnC		》》》局部声明，只能在#app范围内使用
                }
            })
         4.接收传值
             传递
                <div is="cpn" :name01 = "name" 
             接收
                在构建组件时，在template:后面写上	
                  props: ['name01']
             使用
                {{name01}}
         	
         5.接受方法
             传递
                <div is="cpn" :name01 = "name"   v-on:cc="nameJia()">
             接收并使用
                 @click="$emit('cc')"
                 
         6.传出
         	传出
            	@click="$emit('cli',4)"
            标签接收
            	v-on:cli="nameJia($event)"
            使用
            	nameJia(i){
						this.name +=	i;
					},
```

## 关于props

```js
const cpnC = Vue.extend({
				template:"#npc01",
				// props:['name01','na02']//数据接收方法一
				props:{						//数据接收方法二
					na001:String,
					na02:Number,
					name01:{
						type:String,//属性
						required:true,//是否必须传输
						default:"01",//默认值
						validator(value){//规定必须是那些值的其中一个
							return ['laoSun','02','01','03'].indexOf(value)!=-1;
						}
					},
					name02:{ //---------------------------/特例
						type:Array,//属性
						default(){//属性为数组/对象的默认值要写成方法的样子
							return []
						},
						
					}
				}
			});
```



## 分离模板

```html
		<template id="npc01">//方法一
			<div >
				。。。。。。。
			</div>
		</template>
		
		<script type="text/x-template" id="npc01">//方法二
			<div >
				。。。。。。。。
			</div>
		</script>
		
		
		<script type="text/javascript">
			const cpnC = Vue.extend({
				late:"#npc01",
```



# 路由

​	**意思:写个地址跳转过去**

​	**ps**：有一次没有用是因为是从网上复制过去的

```
meta: { title: 'editBug', icon: 'component' ,noCache: true }
```

## 实现步骤

### 一、下载vue-router

```
D:\test\book>yarn add vue-router
```

### 二、在模块化工程中使用它（因为它是一个插件所以要通过Vue.use()来安装路由这个插件）

​		第一步、**导入**路由对象，并**调用Vue.use(VueRouter)**

​		创建src/router文件夹、在里面创建index.js文件用来**配置路由相关信息**

```
import Vue from 'vue'》》》》》》》》》》导入vue
import Router from 'vue-router'》》》》导入路由

Vue.use(Router)》》》》》》》》》》》》》》1.安装router插件
```

​		第二步、创建**路由实例**，并转入路由**映射配置**

​		**ps : routers不能变，变了得写成 routers:'    '**

```
import Vue from 'vue'
import Router from 'vue-router'

//1.通过Vue.use()来安装路由这个插件
Vue.use(Router)

//2.1配置路由和组件之间的映射关系
var routes = [
 {
  	//path: '/login', 
    //component: Login
    //redirect: '/index'
  }
]

//2.》》》》》》》》》》》创建VueRouter对象
const router = new Router({
   routes,
   mode: 'history' //配置路由模式，配置history后url上不会多出#/
})


//3.导出router对象，（然后到mian.js里面进行挂载）
export default router
```

### 		第三步、在**Vue实例**中**挂载**创建**路由实例**

​		main.js

​		**ps : router不能变，变了得写成 router:'    '**

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'//》》》》》》》》》》》导入router
//》》》》》》》》》》》》》》》》》ps:./router == ./router/index
Vue.config.productionTip = false

new Vue({
  router,//》》》》》》》》》》》》》》》》》》》》》》》挂载
  render: h => h(App),
}).$mount('#app')
```

## 使用路由

### 		第一步、创建普通.vue文件

### 		第二步、配置映射关系

```
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Detail from '../views/Detail.vue'//》》》导入.vue组件

Vue.use(Router)

//》》》》》》》》》》》创建VueRouter对象
var routes = [
//》》》》》》》》》》》一个{}就是一个对象
 {
 	//默认路径
    path: '/',//可以不写/(这叫缺省)
    //》》》》》》》》》》redirect重定向到index
    redirect: '/index'
  }, {
    //》》》》》》》》》》》》path和component映射，当出现path时显示component组件
    path: '/login', 
    component: Login
    //>>>>>>>>>>>>>>>>>>>>ps: url 是要 协议头：//组件名
    
    name: 'Login',
  }, {
    path: '/index',
    name: 'Index',
    component: Index
  }, {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }
]

//配置路由和组件之间的应用关系
const router = new Router({
  routes,
  mode: 'history' //配置mode（模式），配置history后url上不会多出
  				  //默认hash模式，会出现 #/
})

export default router


  //也可以这样写
  // path: '/view1',
  // name: 'View1',
  // component: () => import('../views/view1.vue')
```

### 	 第三步、使用路由:通过router-view和router-link

​		router-view好像只在app.vue有用 router-link哪里都可以跳

```
<template>
<router-view></router-view>//》》》》》》显示组件的地方(占位)
<router-link to="/login">第二页</router-link>//》》用来显示到路由/login映射的那个vue文件到router-view上
//》》》》》》》》》》ps:router-link 最终被渲染成a标签
</template>
<style>
</style>
<script>
export default {//>>>>>>>>>导出组件
 name: 'Index',
}
</script>
```

## 嵌套路由

### 	 一、路由

```

, {
    path: '/binding/:userId',
    name: 'Binding',
    component: Binding
    ,children:[ 》》》》》》》》》》关键字，里面内容像正常那样写
      {
        path:"",
        redirect:"404"
      },
      {
        path:"401",
        component:Page401
      },
      {
        path:"404",
        component:Page404
      }
    ]
  },
```

### 二、使用

```
<router-link to="/binding/404" tag="button">返回</router-link>
```

​		如果有传过来的值就这样写

```
<router-link :to="'/binding/'+this.$route.params.userId+'/404'" tag="button">返回</router-link>
```

### 三、要在第二层路由页面写一个router-view

## 扩展

### 1.router-link渲染成什么

```
<!-- tag="button" 渲染成按钮  tag="li" 就是li标签了 -->

  <!-- <router-link to="/page401" replace> 添加replace这个后跳转后不可以返回，但可以返回到前一个页面 -->
  <!-- 这个可能是跟 栈结构 的先进后出有关 -->
  
  <!-- active-class="css名" 处于活跃状态的 样式 或者在创建路由对象的时候与映射关系同级处添加linkActiveClass:"css名"，可以统一改成 -->
  
  <router-link to="/page401" tag="button">返回</router-link>
```

### 2.用js代码进行跳转，或者说触发link按钮

#### 一、js使用路由

​		this.$router 和下面的this.$route不一样这个代表整个大的new 出来的douter对象 处

```
methods:{
        cli(){
            this.$router.push("/page404");
            //不可以返回上一页的
            this.$router.replace("/page404");
        }
     }     
```

#### 二、js使用路由并传参

```
 js使用
 this.$router.push({
 	path: `/describe/${id}`,
 })
 
 路由配置
  {
     path: '/describe/:id',
     name: 'Describe',
     component: Describe
   }

获取参数
this.$route.params.id
```

```
js使用
this.$router.push({
    path: '/describe',
    query: {
    	id: id
    }
})

or

this.$router.push({
    name: 'Describe',
    params: {
    	id: id
    }
})

配置
{
    path: '/describe',
    name: 'Describe',
    component: Describe
}
   
获取参数
this.$route.query.id
		or
this.$route.params.id
```



### 3.传递数据（用路由传递数据）

#### 3.1、path: '/binding/:userId',

​		this.$route 于活跃状态的那个路由映射哪里的（ {} 这一个 ）

```
, {
    path: '/binding/:userId',
    name: 'Binding',
    component: Binding
  }
  
<router-link to="/binding/laowang" tag="button">返回</router-link>
   
   
 浏览器显示的地址
 http://192.168.2.214:8080/binding/laowang
 
 vue界面中获得id
 this.$route.params.userId
 this.$route》》》》》》处于活跃状态的那个路由映射哪里的
 .params	》》》》》》参数
 .userId	》》》》》》 path: '/binding/:userId',的userID自己定义名字
```

#### 3.2、query

​		**传递**

​		用 "{path:"地址",query:{名:"值",名:"值"}}"

```
1. 
this.$router.replace({path:"/binding/laowang",query:{name:"sun",age:"20"}});

2.
<router-link
:to="{path:"/binding/laowang",query:{name:"sun",age:"20"}}"  tag="button">返回</router-link>
```

​		**接收**

```
   {{$route.query}}
   {{$route.query.name}}
```

### 4.全局导航守卫（跳转页面时更换title）

router/index.js

```
	{
        path:"404",
        component:Page404,
        meta:{	》》》》》》》》》》》》》》》	源数据
          title:"404.真"
        }
      }

router.beforeEach((to,from,next)=>{
  console.log(to);
  document.title = to.meta.title; 》》》》 更换网页title
  next();
})

```

### 5.当前路由

```
this.$route.path
```

### 6.方法的调用和父子组件同样

```
父组件
<router-view 
		:searchVal="searchVal" 	值
		@isLoginTrue="loginFalser" 方法
		/>
		
子组件
props: ['searchVal'], 《《《《 接收值
this.$emit('方法名'[, “传给父组件的值”]); 《《《 触发父组件方法



```

### 7.子组件绑定父组件的值

```
<!-- 父组件 -->
<template>
  <div>
    <Child show.sync="show"></Child>
    <!-- 会被扩展成 -->
    <!-- <Child :show="bar" @update:show="val => bar = val"></Child> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<!-- 子组件 -->
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      changeValue(){
        this.$emit('update:show', true) // 父组件中的show会被同步更改成true
      }
    }
  }
</script>
```



## 跳转

```vue
//跳转
this.$router.push({path:"/warningSEC",query:this.device});
//接受跳转传送的信息
this.device = this.$route.query;

//跳转
this.$router.push("/");
```

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <router-link to="/">[跳转到主页]</router-link>
    <router-link to="/login">[登录]</router-link>
    <router-link to="/logout">[登出]</router-link>
 
    <!-- javascript跳转页面 -->
    <button @click="goHome">[跳转到主页]</button>
 
    <!-- 回到上一页 -->
    <button @click="upPage">[上一页]</button>
    <button @click="downPage">[下一页]</button>
 
    <!-- 回到下一页 -->
 
  </div>
</template>
 
<script>
  export default {
    name: "App",
    methods: {
      // 跳转页面方法
      goHome() {
        this.$router.push("/");
          
      },
      upPage() {
        //  后退一步记录，等同于 history.back()
        this.$router.go(-1);
      },
      downPage() {
        // 在浏览器记录中前进一步，等同于 history.forward()
        this.$router(1);
      }
    }
  };
</script>
```

## 刷新页面

**ps：刷新的不是路由**

```
location.reload();

this.$router.go(0);

直接跳转一次

还有你到底是想干什么啊，刷新数据，直接调用方法啊
```



# List

### 看上明的数组语法

# 调用接口



## **引用**

```
import { apiBug, apiClass, apiProTasks } from '@/api'
```

## 使用

```
fileDow.du()
        .then(data => {
           console.log(data);
        })
        .catch((err) => {
           console.log(err, 'error');
        });
```

## 使用中遇到的一个坑

```
在传递对象，数组型的属性的时候要使用
	JSON.stringify(line)//转成json的格式
```

| 函数                                                         | 描述                                           |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [JSON.parse()](https://www.runoob.com/js/javascript-json-parse.html) | 用于将一个 JSON 字符串转换为 JavaScript 对象。 |
| [JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) | 用于将 JavaScript 值转换为 JSON 字符串。       |

# mock

```
import text from './text'

const Mock = require('mockjs')

Mock.mock(/\/statistics\/statisticsManagement1/, 'post', text.tesxt03)

export default Mock
```

**我也不知道为啥突然需要写err...这些东西**

```
 tesxt03: (options) => {
    // let data = JSON.parse(options.body)
    console.log('tesxt03',options.body)
    var cc = {
      errcode: 0,
      success: true,
      message: "",
      data: {
        name: "123"
      }
    }
    return cc;
  },
```

代理

```
如果提示代理有问题:

$ npm config set proxy http://xx@xx.com:xxxx
$ npm config set https-proxy=http://xx@xx.com:xxxx

取消代理设置

$ npm config set proxy null
$ npm config set https-proxy null

```

# 打包地址

```
vue.config.xml

module.exports = {
  outputDir: '../www',
```

# 杂项

## 更换class

直接设置style的属性 某些情况用这个设置 !important值无效

如果属性有’-'号，就写成驼峰的形式（如textAlign） 如果想保留 - 号，就中括号的形式 element.style[‘text-align’] = ‘100px’;

```javascript
element.style.height = '100px';
```

直接设置属性（只能用于某些属性，相关样式会自动识别）

```javascript
element.setAttribute('height', 100);
element.setAttribute('height', '100px');
```

设置style的属性

```javascript
element.setAttribute('style', 'height: 100px !important');
```

使用setProperty 如果要设置!important，推荐用这种方法设置第三个参数

```javascript
element.style.setProperty('height', '300px', 'important');
```

改变class 比如JQ的更改class相关方法

因JS获取不到css的伪元素，所以可以通过改变伪元素父级的class来动态更改伪元素的样式

```javascript
element.className = 'blue';
element.className += 'blue fb';
```

设置cssText

```javascript
element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';
```

创建引入新的css样式文件

```javascript
  function addNewStyle(newStyle) {
            var styleElement = document.getElementById('styles_js');

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = 'styles_js';
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            
            styleElement.appendChild(document.createTextNode(newStyle));
        }

        addNewStyle('.box {height: 100px !important;}');
```

使用addRule、insertRule

```javascript
// 在原有样式操作
        document.styleSheets[0].addRule('.box', 'height: 100px');
        document.styleSheets[0].insertRule('.box {height: 100px}', 0);

        // 或者插入新样式时操作
        var styleEl = document.createElement('style'),
            styleSheet = styleEl.sheet;

        styleSheet.addRule('.box', 'height: 100px');
        styleSheet.insertRule('.box {height: 100px}', 0);

        document.head.appendChild(styleEl);    
```

## 

## 图片地址

```
     <img class="cc" :src="require('D:/GD/csems/src/src/img/PM2.5 Copy.png')" alt="">

//绝对地址
require('D:/GD/csems/src/src/img/PM2.5 Copy.png')

//相对地址
'../img/PM2.5 Copy.png'

```

## 从服务器拿地址

```
//后台代码
@SystemLog("获取人脸库（场景图）图片")
@GetMapping(value = "getFaceCompLibSceneImg/{id}")
public void getFaceCompLibSceneImg(HttpServletResponse response, HttpServletRequest request, @PathVariable("id") String id) {
    try {
        FaceCompLib faceCompLib = faceCompLibService.selectByPrimaryKey(id);
        if(faceCompLib != null){
            commonService.responseFile(response,faceCompLib.getPassengerFilePath());
        } else {
            return;
        }
    } catch (Exception ex) {
        LOGGER.error(ex);
    }
}
public void responseFile(HttpServletResponse response,String path){
    try {
            byte[] b  =  FileUtils.read(path);
            if( b==null ){
                return;
            }
            OutputStream out = response.getOutputStream();
            out.write(b);
            out.flush();
            out.close();
    } catch (Exception ex) {
        LOGGER.error("当前路径文件读取失败:"+ path,ex);
    }
}


前端代码
< img src="后台请求接口/{参数1}/{参数2}"/>
```

# 页面缓存

## 路由

```
// 实时数据一览
  {
    path: '/real',
    name: 'Real',
    component: () => import( '../views/real.vue'),
   	meta: {
      keepAlive: true, //此组件需要被缓存
      deepth: 1
    }
  },
```

## 页面

```
 <-----template----->
 <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
  </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
```

## app.vue

```
  watch: {
    $route(to, from) {
      // debugger
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      // 页面需要 先缓存 到了跳转的时候在缓存就完了
      // 正常跳转
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 点的是下面导航栏的时候调用刷新事件
      if (to.meta.deepth == from.meta.deepth && to.meta.deepth) {
       try {
        //  this.$router.go(0)
        setTimeout(() => {
          this.$refs.routerView.getDeviceList(0);
        }, 100);
       } catch (error) {
        console.log(error);
       }
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退：
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
```

# 插槽

抽取共性，保留不同

## 基本使用

vue1

```
1. 放到插槽内部所有没有名字的插槽
<SLOT><button @click="click"></button></SLOT>
2. 多个也是
<SLOT><i>6666</i><i>77777</i><i>8888888</i></SLOT>

import SLOT from './slots'

components:{
	SLOT
},
```

vue2

```
<template>
     <div>
        <h1 class="top0">dome</h1>
        <i>1</i><br/><br/><br/><br/><hr/>
        
        <!--重要 无默认-->
        <slot></slot>
    </div>
</template>

<template>
     <div>
        <h1 class="top0">dome</h1>
        <i>1</i><br/><br/><br/><br/><hr/>
        
        <!--重要 加默认值-->
        <slot></slot>
    </div>
</template>
```

## 具名插槽

如搜索栏位置可能出现不同的功能

所以要把它封装成一个功能需要多个插槽

vue1

```
<SLOT>
	<!--slot="center" 替換名字是center 的插槽-->
	<i slot="center">6666</i>
	<i slot="right">888</i>
</SLOT>
```

vue2

```
<template>
    <div>
        <h1 class="top0">dome</h1>
        <i>1</i><br/><br/><br/><br/><hr/>
        
        <!--重要-->
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
    </div>
</template>
```

## 作用域插槽

展示的外貌由父组件来定义，而数据还是子组件的

vue1

1. slot-scope="slot"

   ​	ps：定义之后不使用会报错

2. slot.abc 子作用域的数据

```
<SLOT>
  <div name="left" slot-scope="slot" >
  	<span>{{slot.abc.join(' - ')}}</span>
  </div>
</SLOT>
```

vue2

1. :abc="list"

```
 <slot name="left" :abc="list">
   <ul>
     <li v-for="item in list" :key="item">
     		{{item}}
     </li>
   </ul>
 </slot>
```

# Token

## 页面

```
this.accessToken = res.accessToken
window.localStorage.setItem('Token', res.accessToken)
console.log(window.localStorage.getItem('Token'));
```

## 请求axios

```
// 请求拦截器
axios.interceptors.request.use(    
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      // const token = store.state.token;        
      // token && (config.headers.Authorization = token); 
      if (window.localStorage.getItem('Token')){
        config.headers['accessToken'] = window.localStorage.getItem('Token')      
      }
     
      return config;    
  },    
  error => {        
      return Promise.error(error);    
  })

```

# 配置

## .env

**文件(在项目根目录新建)**

- `.env` 无论开发环境还是生成环境都会加载
- `.env.development` 开发环境加载这个文件
- `.env.production` 生成环境加载这个文件

**注意**

> env 文件需要声明运行的环境

- `.env.development`

```
NODE_ENV = development
```

- `.env.production`

```
NODE_ENV = production
```

> 定义变量需要以 `VUE_APP_` 作为前缀

- `.env.development`

```
NODE_ENV = development



VUE_APP_BASE_URL = http://dev.myhost.com
```

- `.env.production`

```
NODE_ENV = production



VUE_APP_BASE_URL = http://www.myhost.com
```

> 测试变量是否生效, 可直接在 `main.js` 中打印测试

```
console.log(process.env.VUE_APP_BASE_URL);
```

## 跨域

vue.config.js

找到devServer替换

```
   devServer: {
    // localhost:9529
    // host: "localhost", // 本地
    host: "192.168.1.126", // 自己的端口号，复制网页链接可以让别人访问
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // 配置多个代理
    proxy: {
        "/apis": {
            target: "http://superadmin.anjyzn.cn/",// 要访问的接口域名
            ws: true,// 是否启用websockets
            changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite: {
                '^/apis': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
            }
        }
    },
    // 他们的
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
  },
```

配置axios请求的时候看是不是测试环境，如果是那么就用上面配置的/apis

```
const service = axios.create({
  //请求路径 重要------------------
  baseURL: process.env.NODE_ENV == 'development'?'/apis':'生产环境的 如http://superadmin.anjyzn.cn/',
  timeout:10000,
  headers:{
  }
})
```

