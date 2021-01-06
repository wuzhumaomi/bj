# 提交审核

## 进入官网

进入他们的官网
[https://mp.weixin.qq.com](https://link.jianshu.com/?t=https%3A%2F%2Fmp.weixin.qq.com)

进入管理 》 版本管理 》 提交审核

# css样式

ps: 使用时发现组件很多问题，发现使用view包裹这些组件就可以好好使用

```
单位 rpx
```

# app.json

07f26b7c155ac3a362196e66d29aa7de

## 导航栏"tabBar"

```
  "tabBar": {
    "selectedColor": "#1296db",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/ai.png",
      "selectedIconPath": "images/ai-o.png"
    },{
      "pagePath": "pages/index2/index2",
      "text": "设置",
      "iconPath": "images/shan-o.png",
      "selectedIconPath": "images/shan.png"
    },{
      "pagePath": "pages/logs/logs",
      "text": "帮助",
      "iconPath": "images/chaung.png",
      "selectedIconPath": "images/chaung-o.png"
    }]
  },
```

## 标题栏"window"

```
"window":{
	//下拉动作
    "enablePullDownRefresh": true,
	// 隐藏导航栏
	"navigationStyle": "custom"
	
    "backgroundTextStyle":"light",
    // 背景颜色
    "navigationBarBackgroundColor": "#00a8ff",
    // 标题栏文本
    "navigationBarTitleText": "WeChat",
    // 标题颜色
    "navigationBarTextStyle":"black"
  },
  
  
  页面属性不需要window{}
  直接在{}写就好了
```

用于设置小程序的状态栏、导航条、标题、窗口背景色。

| 属性                         | 类型     | 默认值   | 描述                                                         | 最低版本                                                     |
| :--------------------------- | :------- | :------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #000000  | 导航栏背景颜色，如 `#000000`                                 |                                                              |
| navigationBarTextStyle       | string   | white    | 导航栏标题颜色，仅支持 `black` / `white`                     |                                                              |
| navigationBarTitleText       | string   |          | 导航栏标题文字内容                                           |                                                              |
| navigationStyle              | string   | default  | 导航栏样式，仅支持以下值： `default` 默认样式 `custom` 自定义导航栏，只保留右上角胶囊按钮。参见注 2。 | 微信客户端 6.6.0                                             |
| backgroundColor              | HexColor | #ffffff  | 窗口的背景色                                                 |                                                              |
| backgroundTextStyle          | string   | dark     | 下拉 loading 的样式，仅支持 `dark` / `light`                 |                                                              |
| backgroundColorTop           | string   | #ffffff  | 顶部窗口的背景色，仅 iOS 支持                                | 微信客户端 6.5.16                                            |
| backgroundColorBottom        | string   | #ffffff  | 底部窗口的背景色，仅 iOS 支持                                | 微信客户端 6.5.16                                            |
| enablePullDownRefresh        | boolean  | false    | 是否开启全局的下拉刷新。 详见 [Page.onPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onpulldownrefresh) |                                                              |
| onReachBottomDistance        | number   | 50       | 页面上拉触底事件触发时距页面底部距离，单位为 px。 详见 [Page.onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onreachbottom) |                                                              |
| pageOrientation              | string   | portrait | 屏幕旋转设置，支持 `auto`/ `portrait` / `landscape`  详见 [响应显示区域变化](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html) | [2.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) (auto) / [2.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)(landscape) |



## 本地储存

```
//本地存储
wx.setStorageSync('userInfo', res)

wx.getStorageSync('userInfo')
```

## 获得权限

```
位置
"permission": {
    "scope.userLocation": {
    	"desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
},
```



## 按钮

```
<button type="default" size="{{defaultSize}}" loading="{{loading}}" plain="{{plain}}"
        disabled="{{disabled}}" 
        bindtap="default" 
        hover-class="other-button-hover"> default </button>
```

# **基础功能**

## html

### 属性

```
bindlongpress="handleLongPress"  长按 
bindtap="handleClick"     点击

<view wx:for="{{fortuneList}}">
{{index+" "+item}}
</view>
```

## js

```
<text>\n</text> 换行
```

### 获取应用实例

```
const app = getApp()
//用户信息	
app.globalData.userInfo
```

### 用户信息

#### 让用户登录

```

```

## 获得登录人信息

```
// 获取用户信息
wx.getSetting({
  success: res => {
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: res => {
          console.log(res);
        }
      })
    }
  }
})
```



#### 获得的数据

```
avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/sSWLfX83hLk2v3pJaXgyMcnn568MBXvX91haNibA7YZoAge9OZUfebV0IL2UROIdPVj1YJEZ4gkqbEcLrExLPbg/132"
city: "Bozhou"
country: "China"
gender: 1
language: "zh_CN"
nickName: "如若"
province: "Anhui"
```

### Page（基础数值）

```
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:''
  },
  //设置data里面属性的方法
  //  this.setData({
  //    info: "设置的值"
  //  })
  //读
  //console.log(this.data.country);
  //设置 不能触发绑定的事件
  //this.data.country = "123456"
  
  //方法
  function01: function (options) {
  },
  //调用方法
  this.function01()
```

### 弹出框

```
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```

## 小知识点

### 双向绑定

```
<textarea bindinput='userNameFn' value="{{textValue}}" placeholder="输入你想要诉求的事"/>
```

```
data: {
        textValue: '张三'
    },
userNameFn: function (event) {
    this.setData({
      textValue: event.detail.value
    })
  },
```



### 跳转

 如果在 app.json 文件中的 tabBar 选项中已经注册了跳转路径，那么跳转方法需要用 wx.switchTab 或 wx.reLaunch 方法实现跳转。 值得注意的是：

- wx.switchTab 只能跳转到 tabBar 页面，并关闭其它所有非 tabBar 页面。且路径后面不能带参数
- wx.reLaunch 关闭所有页面，打开到应用内的某个页面。既能跳转到标签页，又能跳转到非标签页，且路径后可带参数

```
  跳转tab页面
  ../home-page/index   对的
  pages/home-page/index  错的
  
  wx.switchTab({
      url:'../meInfo/meInfo'
    })
```

 "https://wx.qlogo.cn/mmopen/vi_32/PuZTVOu1fHSEwoPqrhDiaicicgtTnLbu1IibdRc6LaCpLxcoeCjIicRz3ZZ55DSj2hq6uzrxuz3IcwVAPHFe6RLPaPw/132" 

 "https://wx.qlogo.cn/mmopen/vi_32/PuZTVOu1fHSEwoPqrhDiaicicgtTnLbu1IibdRc6LaCpLxcoeCjIicRz3ZZ55DSj2hq6uzrxuz3IcwVAPHFe6RLPaPw/132" 

没有布置到tab导航栏的跳转

```
 wx.navigateTo({
      url:'../meInfo/meInfo'
    })
```

### 百度api

```
1.获得自己的位置

wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res);
  }
})

2.根据经纬度获得城市信息

var ak = "ZfsE2LqxGHqZlButOl1vqzZjsD8p0Y06";
        var url = "https://api.map.baidu.com/telematics/v3/weather?location=" + longitude + "," + latitude + "&output=json&ak=" + ak;
        wx.request({
            url: url,
            success: function(res){
                console.log(res);
            }
        });
```



# 云开发

## 一、点击开发者工具最上面的云开发,在数据库创建集合user

## 二、初始化云开发

​		app.js

```
  if (!wx.cloud) {
      console.log("微信版本过低");
    }else{
      console.log("初始化云开发");
      wx.cloud.init({
        traceUser:true
      })
    }
```

## 三、增删改查

```
db.collection('todos').doc('todo-identifiant-aleatoire')
直接根据id==todo-identifiant-aleatoire查

db.collection('user').where({
      name:"小明"
    })
根据条件name == "小明"查
```

### 		一、初始化

```
 const db = wx.cloud.database()
```

### 		二、添加

```
  1.  db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: "learn cloud database",
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        // 为待办事项添加一个地理位置（113°E，23°N）
        location: new db.Geo.Point(113, 23),
        done: false
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    
 2.  db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'xiaoMing', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        name: "小明",
        age: 18,
        friends: [
          "小红",
          "老糊涂"
        ],
        // 为待办事项添加一个地理位置（113°E，23°N）
        location: new db.Geo.Point(113, 23),
        done: false
      },
    }).then(res => {
      console.log(res);
    })
```

### 		三、查

```
_openid 数据库里的数据没有它是没有权利查询数据的
```

```
// res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
```

#### 		查全部

```
 db.collection('user').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data)
 })
```

#### 		条件查询( 有最多一次取 100 条的限制 )

```
 db.collection('user').where({
      name:"小明"
    })
    .get().then(res => {
      console.log(res.data);
    })
```

```
style: {
    color: 'yellow'
  }
  
'style.color': 'yellow'
```

#### 条件查询条件

```js
const _ = db.command
db.collection('todos').where({
  // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
  progress: _.gt(30)
})
.get({
  success: function(res) {
    console.log(res.data)
  }
})
```

API 提供了以下查询指令：

| 查询指令 | 说明                 |
| :------- | :------------------- |
| eq       | 等于                 |
| neq      | 不等于               |
| lt       | 小于                 |
| lte      | 小于或等于           |
| gt       | 大于                 |
| gte      | 大于或等于           |
| in       | 字段值在给定数组中   |
| nin      | 字段值不在给定数组中 |

```js
// and 方法用于指定一个 "与" 条件，此处表示需同时满足 _.gt(30) 和 _.lt(70) 两个条件
  progress: _.gt(30).and(_.lt(70))
```

```js
 // or 方法用于指定一个 "或" 条件，此处表示需满足 _.eq(0) 或 _.eq(100)
  progress: _.eq(0).or(_.eq(100))
```

```js
 // or 指令还可以用来接受多个（可以多于两个）查询条件，表示需满足多个查询条件中的任意一个，比如我们查询进度小于或等于 50% 或颜色为白色或黄色的待办事项：
_.or([
  {
    progress: _.lte(50)
  },
  {
    style: {
      color: _.in(['white', 'yellow'])
    }
  }
])
```

### 四、删

```
删除一条记录
对记录使用 remove 方法可以删除该条记录，比如：

db.collection('todos').doc('todo-identifiant-aleatoire').remove({
  success: function(res) {
    console.log(res.data)
  }
})
删除多条记录
如果需要更新多个数据，需在 Server 端进行操作（云函数）。可通过 where 语句选取多条记录执行删除，只有有权限删除的记录会被删除。比如删除所有已完成的待办事项：

// 使用了 async await 语法
const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('todos').where({
      done: true
    }).remove()
  } catch(e) {
    console.error(e)
  }
}

```

### 五、改

```
this.db.collection('user').where({
      name:"小明"
    }).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        done: false
      },
      success: function(res) {
        console.log("改",res.data)
      }
    })
```

