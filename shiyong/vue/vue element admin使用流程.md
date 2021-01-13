

# 使用方针

一、本就以方便来，那就以方便来用，不如直接用集成的

二、在他原来的基础上扩展保证不影响他原有功能的基础上做修改

三、在别人的使用基础上满足自己的需求，不要去乱改参数条件

## 一、打包使用

### 修改内容

正常vue项目是要修改 config文件夹下的index.js 可是vue-element-admin项目没有这个文件
 那就找到并且打开vue.config.js

将  publicPath: '/',改成  publicPath: './',

### 打包

```
npm run build:prod
```

# 使用

## LOGO

 settings 里的 sidebarLogo 控制用不用

```
// 左上方logo
  sidebarLogo: true,
```

src\layout\components\Sidebar\Logo.vue

```
 data() {
    return {
      title: 'Vue Element Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png' ,
      // logo: require('@/assets/img/logo.png') 
    }
  }
```

## 侧边栏展开不收缩

```
//找到store/modules/app.js文件
const app = {
  state: {
    sidebar: {
      // opened: !+Cookies.get('sidebarStatus'),        //原值
      opened:true,                                      //默认展开（false是隐藏）
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {            //点击收缩功能触发
      // if (state.sidebar.opened) {
      //   Cookies.set('sidebarStatus', 1)
      // } else {
      //   Cookies.set('sidebarStatus', 0)
      // }
      // state.sidebar.opened = !state.sidebar.opened
      state.sidebar.opened = true
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {        //自适应触发
      Cookies.set('sidebarStatus',1)
      state.sidebar.opened = true
      state.sidebar.withoutAnimation = withoutAnimation
    }
    //......后面的就不展示了
}
```

## 头部路由栏修改

src\layout\components\Navbar.vue

```

```

## 浏览器图标与标头

### 标头

两个地方可以改

1.settings.js

```
module.exports = {
  title: '施工企业管理平台',
```

2.vue.config.js

```
const name = defaultSettings.title || 'vue Element Admin' // page title
```

### 图标

更换public/favicon.ico

```
 <link rel="icon" href="<%= BASE_URL %>favicon.ico">
```



## 固钉

```
  settings里的 tagsView控制用不用
  
  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,
  
  

谁用 就加上affix: true

 {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard',affix: true }
    }]
  },

```

## 权限

1. mock的user里面返回权限在，在信息请求里面有个

2. res/permission 里面时跳转路由时候的一些东西

   ```
   
   ```

3. res/setting 里面是一些功能的开启关闭

   ```
   module.exports = {
     title: 'Vue Element Admin',
   
     /**
      * @type {boolean} true | false
      * @description Whether show the settings right-panel
      */
     // 旁边的系统样式设置按钮
     showSettings: false,
   
     /**
      * @type {boolean} true | false
      * @description Whether need tagsView
      */
     // 固钉 快捷路由
     tagsView: true,
   
     /**
      * @type {boolean} true | false
      * @description Whether fix the header
      */
     fixedHeader: false,
   
     /**
      * @type {boolean} true | false
      * @description Whether show the logo in sidebar
      */
     // 左上方logo
     sidebarLogo: false,
   
     /**
      * @type {boolean} true | false
      * @description Whether support pinyin search in headerSearch
      * Bundle size minified 47.3kb,minified + gzipped 63kb
      */
     supportPinyinSearch: true,
   
     /**
      * @type {string | array} 'production' | ['production', 'development']
      * @description Need show err logs component.
      * The default is only used in the production env
      * If you want to also use it in dev, you can pass ['production', 'development']
      */
     errorLog: 'production'
   }
   
   ```



## 登录

permission.js 路由要配置一下关于权限（登录获得权限，人员信息等等）的问题

## 问题

### 无法使用post请求

request请求体是流式数据，如果在其他地方消费过，不做特殊处理的话，后面的应用就消费不到了。

到mock-server.js注释掉

```
  // 清掉对post的影响
  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }))
```

# 样式

## 表单

```
vue剩下的空间 屏幕自适应大小
.dashboard-container{
  // 固钉34 + 外边距60 + 最上面的50 = 144px
  height: calc(100vh - 144px)!important; 
}
```

## 改变输入框的高

在创建一个什么都不带的

```
<style>
```

```
<style>
  .leftDiv .el-input--medium .el-input__inner{
    /* background-color: red!important; */
    width: 360px!important; height: 50px!important;
  }
</style>
```

# 开始使用

## 1.配置代理

vue.config.js 》》 devServer 》》proxy

```
   // 它支持webPack-dev-server的所有选项
   devServer: {
    // localhost:9529
    host: "localhost",
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
```

# 封装

## 选择框

```
<template>
  <div>
    <el-select v-if="selectType == 'option'" v-model="selectValue" placeholder="请选择">
      <el-option
        v-for="item in select[name]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <div  v-if="selectType == 'text'" >
      {{value|getValue(name,select)}}
    </div>
  </div>
</template>

<script>
//这里可以引入其他文件（比如组件，工具js，第三方插件js，json文件，图片文件等等）
//列如：import <<组件名称>> from '《组件路径》';
export default {
//import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // 哪一个选项
    name:null,
    // option 显示下拉框 text 显示文字
    selectType:null,
    // 绑定值 
    value:null,
  },
  data() {
//这里存放数据
      return {
        selectValue:this.value,
        select:{
          // 检查状态,1为通过,2为口头警告,3为书面整改
          checkResultStatus: [{
            value: 1,
            label: '通过'
          }, {
            value: 2,
            label: '口头警告'
          }, {
            value: 3,
            label: '书面整改'
          }],
          // 选择框
          options: [{
            value: '选项1',
            label: '选项1-1'
          }, {
            value: '选项2',
            label: '选项2-1'
          }],
          // 使用状态,0为未使用过,1未使用过
          useStatus: [{
            value: 0,
            label: '未使用过'
          }, {
            value: 1,
            label: '使用过'
          }],
          

        }

      };
  },
//监控data中的数据变化
  watch: {
    selectValue:{	//editForm》》》》》》》》》》》》属性名
      handler:function(val,oldval){
              //val》》》》》》》》》》》》新的值
          // this.value = this.selectValue
          this.$emit('update:value', this.selectValue) // 父组件中的show会被同步更改成true
      },
      deep:true//对象内部的属性监听，也叫深度监听
    }
  },
  filters:{
    getValue(selectValue,name,select){ 
     for (const item of select[name]) {
        if (item.value == selectValue ){
          return item.label
        }
     }
     
    },
    guo(value){
      return "$" + value
    }
  },
//计算属性，类似于data概念
  computed: {
   
  },
//方法集合
  methods: {},
//生命周期，创建完成（可以访问当前this实例）
  created() {},
//生命周期，挂载完成（可以访问dom元素）
  mounted() {},
  beforeCreate(){},//生命周期-创建之前
  beforeMount(){}, //生命周期 - 挂载之前
  beforeUpdate(){}, //生命周期 - 更新之后
  updated(){}, //生命周期 - 更新之后
  beforeDestroy(){}, //生命周期 - 销毁之前
  destroy(){}, //生命周期 - 销毁完成
  activated(){}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>
```

