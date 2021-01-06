## 1.在cordova文件根目录里创建vue项目

  <!--路由里面不可以加不然报错 mode: 'history'-->

## vue里调用cordova的事件只需要在前面加上window.就可以了

​	例如：扫一扫组件

```
window.cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("A barcode has been scanned \n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
            }, function (error) {
                alert("Scanning failed: " + error);
            }
        );
```



## 2.vue项目里使用vant

### 1.安装

```
# 通过 npm 安装
npm i vant -S

# 通过 yarn 安装
yarn add vant

```

### 2.安装插件

```
# 安装插件
npm i babel-plugin-import -D

// 在babel.config.js中添加配置
// 注意：webpack 1 无需设置 libraryDirectory

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 新加的《《《《《《《《《《《《《
  "plugins": [
    ["import",{"libraryName":"vant","style":true}]
  ]
}

```

### 3.配置

**到main.js添加**

```
import Vue from 'vue';
import { Button } from 'vant';

Vue.use(Button);
```

# 极光+推送

## 一、发消息

​		https://www.cnblogs.com/raym/p/10281126.html

### 		1.注册极光推送，包名要一样，

### 		2.安装插件（用自己的网）

```
cordova plugin add jpush-phonegap-plugin --variable APP_KEY=xxxxxxxxx 在极光拿到软件的keyxxxxxxxxxxxx
```

### 		3.html引入js文件

​		直接弄一个js文件，把全部丢进去就行了

​		然后把这个文件放到和index.html 同级的js目录下面 并让index.html调用

```
  var _t = this;
  var onDeviceReadyS = function() {
    document.addEventListener("jpush.receiveRegistrationId", function (event) {
          // alert("receiveRegistrationId" + JSON.stringify(event));
          // $("#registrationId").html(event.registrationId);
      }, false)

    initiateUI();
  };
// 获得id
  var getRegistrationID = function() {
    window.JPush.getRegistrationID(onGetRegistrationID);
  };

  var onGetRegistrationID = function(data) {
    try {
      console.log("JPushPlugin:registrationID is " + data);

      if (data.length == 0) {
        var t1 = window.setTimeout(getRegistrationID, 1000);
      }
      // alert(data)
      // $("#registrationId").html(data);
    } catch (exception) {
      console.log(exception);
    }
  };

  var onTagsWithAlias = function(event) {
    try {
      console.log("onTagsWithAlias");
      var result = "result code:" + event.resultCode + " ";
      result += "tags:" + event.tags + " ";
      result += "alias:" + event.alias + " ";
      // $("#tagAliasResult").html(result);
    } catch (exception) {
      console.log(exception)
    }
  };

  var badgeNumb = 0;
  var onOpenNotificationM = function(event) {
    try {
      var alertContent;
      if (device.platform == "Android") {
        alertContent = event.alert;
      } else {
        alertContent = event.aps.alert;
      }

      badgeNumb = badgeNumb - 1;
      badgeNumb = badgeNumb<=0 ? 0 : badgeNumb;
      window.JPush.setBadgeNumber(badgeNumb);
      
      alert("请及时查看：" + alertContent);
    } catch (exception) {
      // alert("JPushPlugin:onOpenNotificationM" + exception);
    }
  };

  var onReceiveNotificationX = function(event) {
  	// title 头部
  	// alert 内容
    try {
      var alertContent;
      if (device.platform == "Android") {
        alertContent = event.alert;
      } else {
        alertContent = event.aps.alert;
      }
      // $("#notificationResult").html(alertContent);

      badgeNumb = badgeNumb + 1;
      window.JPush.setBadgeNumber(badgeNumb);
    } catch (exception) {
      console.log(exception)
    }
  };

  var onReceiveMessageZ = function(event) {
    try {
      var message;
      if (device.platform == "Android") {
        message = event.message;
      } else {
        message = event.content;
      }
      // $("#messageResult").html(message);

      badgeNumb = badgeNumb + 1;
      window.JPush.setBadgeNumber(badgeNumb);
    } catch (exception) {
      console.log("JPushPlugin:onReceiveMessageZ-->" + exception);
    }
  };

  var onResumeS = function(event){
    try {
        badgeNumb = 0
        window.JPush.setBadgeNumber(0);
      } catch (exception) {
        console.log("onResumeS-->" + exception);
      }
  }
// 初始化
  var initiateUI = function() {
    try {
      // alert("window.JPush1");
      // window.setTimeout(()=>{// alert(window.JPush);}, 1000);
      // 如果报init()为null的错那就卸了你的推送插件重新安装
      // cordova plugin add jpush-phonegap-plugin --variable APP_KEY=你的极光推送的key
      window.JPush.init();
      window.JPush.setDebugMode(true);
      window.setTimeout(getRegistrationID, 1000);
      // 标签的
      setTags()
      getAllTags()
      // cleanTags()
      // 别名的
      setAlias()
      getAlias()
      // deleteAlias()

      if (device.platform != "Android") {
        window.JPush.setApplicationIconBadgeNumber(0);
      }
    } catch (exception) {
      console.log(exception);
      // alert(exception);
    }
  };

  // 设置tage
  var setTags = function () {
    // alert("设置tage")
    try {
      //你可以设置多个tag  
      var tag1 = "1"
      var tag2 = "2"
      var tag3 = "3"
      var tags = []
      if (tag1) {
        tags.push(tag1)
      }
      if (tag2) {
        tags.push(tag2)
      }
      if (tag3) {
        tags.push(tag3)
      }

      window.JPush.setTags({ sequence: 1, tags: tags },
        function (result) {
          // 设置成功时
          // JSON.stringify(result.tags)
          // alert(JSON.stringify(result.tags))
          //  清除
          // _t.cleanTags()
        }, function (error) {
          // alert(error.code)
        })
    } catch (exception) {
      console.log(exception)
    }
  }

  // 获取tage
  var getAllTags = function () {
    // alert("获取tage")
    window.JPush.getAllTags({ sequence: 2 },
      function (result) {
        // 获取标签成功
        // alert(JSON.stringify(result.tags))
        //  清除
        // _t.deleteAlias()
      }, function (error) {
        // alert(error.code)
      })
  }
  // 清空tage
  var cleanTags = function () {
    // alert("清空tage")
      window.JPush.cleanTags({ sequence: 2 },
        function (result) {
          // alert(result.sequence)
        }, function (error) {
          // alert(error.code)
        }
      )
  }
  // 设置设备别名
  var setAlias = function () {
    // alert("设置别名")
    var alias = "122223"
    window.JPush.setAlias({ sequence: 1, alias: alias },
      function (result) {
        // 成功后返回别名
        // result.alias
        // alert(result.alias)
      }, function (error){
        // alert(error.code)
      })
  }
  // 获取设备别名
  var getAlias = function () {
    // alert("获取设备别名")
    window.JPush.getAlias({ sequence: 2 },
      function (result) {
        // 获取成功
        // alert(JSON.stringify(result));
      }, function (error) {
        // alert(error.code)
      }
    )
  }
  // 删除设备别名
  var deleteAlias = function () {
      window.JPush.deleteAlias({ sequence: 3 },
        function (result) {
          // 删除成功
          // alert(JSON.stringify(result));
        }, function (error) {
          // alert(error.code)
        }
      )
  }
    
  // 设备加载成功的时候 
  document.addEventListener("deviceready", onDeviceReadyS, false);
  // 获取点击状态栏中的通知内容时
  document.addEventListener("jpush.openNotification", onOpenNotificationM, false);
  // 收到消息   
  document.addEventListener("jpush.receiveNotification", onReceiveNotificationX, false);
  // 获取自定义消息
  document.addEventListener("jpush.receiveMessage", onReceiveMessageZ, false);
  // 处理恢复事件
  document.addEventListener("resume", onResumeS, false);

```

### 在vue调用这些内容需要异步一下

```
setTimeout(() => {
      alert(window.JPush);
    }, 1000);
```

**ps：Execution failed for task ':app:compileDebugJavaWithJavac'.**

```
cordova platform remove android
cordova platform add android

cordovaplatform add android@6.3.0 去掉了：APP

用自己的手机的网就可以了
```

### 错误

```
Cannot find plugin.xml for plugin "jpush-phonegap-plugin". Please try adding it again.

删掉myapp/plugins/jpush-phonegap-plugin
```

## 二、本地推送

​	https://blog.csdn.net/qq_37926711/article/details/85533017

### 	1.包名一致

### 	2.安装插件

​		 cordova plugin add cordova-plugin-local-notification 

### 	3.触发

```
cordova.plugins.notification.local.schedule({

        title: vue.title,
        text: vue.alert,
        //在某些手机上可以弹出
        foreground: true
    });
```

​	

# 萤石云

## 直接视频播放器

ps:ezopen开头的播放器要有这些

```
https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/E41606925/1.rec?begin=20200616000000&end=20200616235959&autoplay=1&accessToken=at.4rpa3tf66ihfk40r5ygc7i53bd8gkgm4-5tpa0rylcj-1ar9fh4-19wrzojry
```

## 好像直接用视频播放标签就好了

```
<video
        id="myplayer"
        :src="device.liveAddress"
        class="playVideo"
        autoplay
        controls
        playsInline
        webkit-playsinline
      >
</video>
```

## 回放

```

      <iframe
        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/E41606925/1.rec&begin=20200616000000&end=20200616235959&autoplay=1&accessToken=at.4rpa3tf66ihfk40r5ygc7i53bd8gkgm4-5tpa0rylcj-1ar9fh4-19wrzojry"
        width="600"
        height="400"
        id="ysOpenDevice"
        allowfullscreen
      >
      </iframe>
```



## **ps : 浏览器调试时用手机模拟器模式不能播放，但手机可以**

```
npm install ezuikit

然后在组件中引入：import EZUIPlayer from "ezuikit/ezuikit";
```

HTML代码：

 <!-- 在开发者手机模拟器样式的时候可能会播放不了，退出开发者模式即可 -->

```
<div class="mainClass" v-show="rtmp_url!=''">
    <video id="myPlayer" controls playsinline webkit-playsinline autoplay>
      <source type="application/x-mpegURL" :src="http_url"/>
        <source :src="rtmp_url"/>
    </video> 
</div>
```

直播地址是调用接口获取的。


    <script>
    export default {
            data(){
                return{
                    player:"",
                    rtmp_url:"",
                    http_url:"",
                    message:'加载中...',
                }
            },
            
            mounted(){   
                this.GetLiveUrl();
            },
            
            methods:{
                GetLiveUrl(){
                      //异步获取直播地址，并赋值给rtmp_url,http_url
                      this.rtmp_url = "rtmp://....."
                      this.http_url = "http://......"
         			}
        	},
        	
        	updated() {
                if(this.rtmp_url!=""){
                    //如果在mounted中声明，直播地址还未取到，导致视频不显示。所以放在了这里
                    this.player = new EZUIPlayer('myPlayer'); 
                }
        	}
        }
    </script>

# 打包

## 外网穿透

```
前端
.env 测试地址
NODE_ENV = 'development'
VUE_APP_BASE_API = 'http://192.168.2.212:8083'

打包地址
.env.production 改
NODE_ENV = 'production'
VUE_APP_BASE_API = 'http://121.41.17.171:6241'

package.json 改
"build": "vue-cli-service build --mode production",

request.js 改
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
})
```

# 地图

vue.config.js

```
https://lbs.amap.com/api/javascript-api/guide/abc/prepare
```

​		html

```
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=26d72cbe119c5e9bb6c91561b8cf1734"></script>
```

​		vue.config.js

```
configureWebpack: config => {
    config.externals = {
      'AMap': 'AMap' // 高德地图配置
    }
```

​		vue

```
// 图表页面
<template>
  <div class="mapMain">
      <div class="map" id="map"/>《《《《地图

      <div class="mapInfoList" id="mapInfoList">
        <div  @click="top" class="icon"><van-icon name="wap-nav" /></div>
        <div class="device" id="device" v-if="device!=null">
          <van-panel :title="device.name"  :desc="'坐标：'+device.position"  status="离线">
            <!-- <div>内容</div> -->
          </van-panel>
        </div>

        <van-divider dashed></van-divider>

        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>
        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>
        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>
        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>
        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>
        <van-panel title="标题" desc="描述信息" status="状态">
        </van-panel>

      </div>
  </div>
</template>
<script>

// 引入地图组件
import AMap from "AMap"
export default {
  name:"map",
  data() {
    return {
      // 每个设备的位置
      lnglats:[
        [116.368904, 39.923423],
        [116.382122, 39.921176],
        [116.387271, 39.922501],
        [116.398258, 39.914600],
        [121.427917,31.210876]
      ],

      // 选中设备
      device:null,
      // 设备列表
      deviceList:[],

    }
  },
    // 渲染之后
  mounted:function () {
   this.MapInit();
  },
  created:function () {
    
  },
 
  methods:{
    // 初始化
    MapInit () {
        let _this = this;
      
        let map = new AMap.Map("map", {
            center: [116.39, 39.9],
            // mapStyle: "amap://styles/这里放入样式ID", //设置地图的显示样式
            resizeEnable: true,
            zoom: 5
        });
      

      //初始化地图对象，加载地图
      var lnglats = this.lnglats;
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      for (var i = 0; i < lnglats.length; i++) {
        var  marker = new AMap.Marker({
              position: lnglats[i],
              map: map,
        });
        // 每个点的设备对象
        marker.obj={
          name:'北京第' + (i + 1) + '风景',
          position:lnglats[i],
        }
        marker.content = '我是第' + (i + 1) + '个Marker';
        marker.on('click', markerClick);

          // 触发点击事件
          // marker.emit('click', {target: marker});
      }
      // 点击的事件
      function markerClick(e) {
          infoWindow.setContent(e.target.obj.name);
          infoWindow.open(map, e.target.getPosition());
          // 调用设置设备
          _this.setDevice(null);
          // 点击
          _this.device = e.target.obj;
          // 改变窗体
          setTimeout(() => {
            _this.top(null);
          }, 100);
      }
      map.setFitView();

      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.MapType',
          'AMap.Geolocation',
      ], function(){
          // // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          // map.addControl(new AMap.ToolBar());

          // // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          // map.addControl(new AMap.Scale());
        
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map.addControl(new AMap.MapType());
      });
    },
    
    log(val){
      console.log(val);
    },
    // 框体的上下拉伸
    top(val){
      let height = 30;
      
      if (this.device!=null) {
        height += document.getElementById("device").offsetHeight;
      }
      // 往上去一点点
      if (val==null) {
        // 上拉动画
        if (height+'px' != document.getElementById('mapInfoList').style.height) {
          document.getElementById('mapInfoList').style.height = height + 30 + 'px';
        }
        
        setTimeout(() => {
          document.getElementById('mapInfoList').style.height = height + 'px';
        }, 700);
        return
      }

      if (document.getElementById('mapInfoList').style.height=='90vh') {
        document.getElementById('mapInfoList').style.height = height + 'px';
      }else{
        document.getElementById('mapInfoList').style.height = '90vh';
      }
    },
    // 框体内选中的设备详细信息
    setDevice(obj){
        let _this = this;
      console.log(obj);

      //根据地址搜索
      var address = "上海市虹口区长阳路235号758A室";
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder();
        geocoder.getLocation(address, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 经纬度
            var lon = result.geocodes[0].location.lng;
            var lat = result.geocodes[0].location.lat;
            // 拿到的经纬度
            console.log(lon,lat);
            _this.lnglats.push([lon,lat])
            _this.MapInit();
          } else {
            console.log('定位失败！');
          }
        });
      });

    },
  }
}
</script>
<style  lang="scss">
#map {width:100%; height: 100vh; }  
.mapInfoList{
  transition: 0.65s;
  width: 100%;
  background: white;
  position: absolute;
  bottom: 0;
  /* top: 90vh; */
  height: 4.5vh;
  z-index: 999999;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .icon{
    width: 100%;
    text-align: center;
    color: rgb(172, 172, 172);
    font-size: 20px;
  }
  .device{
    padding: 10px 10px;
  }
  .van-cell__title{
    flex: 3
  }

}


</style>
```

## 错误

```
AMap is not defined

需要网
```

# 沉浸式状态栏

```
原文链接
https://juejin.im/post/5ce838cee51d4510803ce334
```

```
cordova plugin add cordova-plugin-statusbar
```

地址

```
项目\platforms\android\app\src\main\java\org\apache\cordova\statusbar\StatusBar.java
```

代码

```
 搜索这个这个public void run()找的 { 这个文件StatusBar.java
```



```
 public void run() {
                // Clear flag FLAG_FORCE_NOT_FULLSCREEN which is set initially
                // by the Cordova.
                Window window = cordova.getActivity().getWindow();
                window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

                //添加内容start
                window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
                window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                window.setStatusBarColor(Color.TRANSPARENT);
                window.setNavigationBarColor(Color.TRANSPARENT);
                //添加内容end

                
                // Read 'StatusBarBackgroundColor' from config.xml, default is #000000.
                // 注释原本设置状态栏背景颜色的地方
             //setStatusBarBackgroundColor(preferences.getString("StatusBarBackgroundColor", "#000000"));

                // Read 'StatusBarStyle' from config.xml, default is 'lightcontent'.
                setStatusBarStyle(preferences.getString("StatusBarStyle", "lightcontent"));
            }
```

## 扫描二维码

http://www.srcmini.com/59159.html

### cmd

​		添加组件

```
cordova plugin add phonegap-plugin-barcodescanner
```

### html

```
<button onclick="copyText()">点击</button>
```

### js

```
function copyText(){
    alert("1234566");
    try {
      cordova.plugins.barcodeScanner.scan(
          function (result) {
              alert("A barcode has been scanned \n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
          }, function (error) {
              alert("Scanning failed: " + error);
          }
      );
    } catch (error) {
      alert(error)
    }
      
  }
```

### 遇见问题

​	Cordova is not defind

```
在头部添加 <script type="text/javascript" src="cordova.js"></script>
```

## 生成二维码

### 下载Qrcode 库

 **Qrcode 库及实例下载：**[qrcodejs-04f46c6.zip](http://static.runoob.com/download/qrcodejs-04f46c6.zip) 

### html

```
  <input id="text" type="text" value="http://www.runoob.com" style="width:80%" /><br />
            <div id="qrcode" style="width:100px; height:100px; margin-top:15px;"></div>
```

### js

```
try {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });

    function makeCode () {		
        var elText = document.getElementById("text");
        
        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }
        
        qrcode.makeCode(elText.value);
    }

    makeCode();

    document.getElementById("text").onblur=function () {
        console.log(123);
                makeCode();
            }
    document.getElementById("text").onkeydown=function (e) {
        // alert("456")
            if (e.keyCode == 13) {
                makeCode();
            }
        }
} catch (error) {
    alert(error)
}
```

## 热更新

#### 1、添加插件 Cordova Hot Code Push

```
cordova plugin add cordova-hot-code-push-plugin
```

#### 2、添加热更新工具 cordova-hot-code-push-cli

```
npm install -g cordova-hot-code-push-cli
```

#### 3、添加cordova-hcp.json文件（按照下面代码操作自动生成）

此文件是用于方便生成www文件下chcp.json文件的内容。

执行命令（必须在项目根目录执行更新工具的命令）

`cordova-hcp init` 生成热更新相关配置文件
生成的默认应用程序配置文件(cordova-hcp.json)在项目根文件夹中。

执行时将要求您从命令行中填写一些项目首选项：
Project name: 你现在的项目名称所需.
Amazon S3 Bucket name:亚马逊上的S3桶的名字。可以跳过。
Amazon S3 region: 亚马逊S3地区。可以跳过。
iOS app identifier: 应用程序商店的应用程序ID。App升级是跳转应用商店进行升级。
Android app identifier: 可以App在应用商城的地址，或者是apk的下载地址。

Update method: 何时执行更新。

```
start: 在启动应用程序时安装更新。

resume: 在恢复应用程序(从背景移动到前景状态)或启动时，安装更新；默认使用。

now: 从服务器加载更新后立即安装。
```

Enter full URL to directory where cordova-hcp build result will be uploaded:服务器 www 文件的地址（例子：http://123.12.72.21:8292/ougg/www/）

ps:我为了确认地址的可查看性，在里面放了一张图片，用这个链接加图片名字可以直接用外网在浏览器上读得到

**cordova 根目录的cordova-hcp.json文件内容：**

{
“name”: “”,//可为空
“autogenerated”: true,//如果不添加，热更新会不能使用
“ios_identifier”: “id123456789”,//应用在App store id(可为空)
“android_identifier”: “”,//应用在应用商城上的地址或者App的下载地址(可为空)
“update”: “start”,//在应用启动时安装
“min_native_interface”: 1,//可用以做App升级（可以不填)
“content_url”:
“http://************/cordova/www”//www文件在服务器上的地址
}
**“autogenerated”: true 这个值执行命令后是没有的需要自己手动添加，如果不添加网页内容更新将会无效。**

#### 4、在www文件下生成chcp.json 和 chcp.manifest文件（按照下面代码操作自动生成）

chcp.json: 包含发布相关信息：热更新代码版本号，应用 native side 版本号等等

chcp.manifest: 包含项目热更新代码(静态)文件信息：文件名和文件哈希值

执行命令
`cordova-hcp build`执行此命令会在chcp.json文件中增加"release":"当前时间"字段。（默认使用时间戳，格式为：yyyy.MM.dd-HH.mm.ss），插件将版本号进行字符串相等比较来判断是否存在新版本。

“release”: “2017.06.07-16.30.20”,//唯一web项目版本号,用与热更新web内容的更新。（必需，不用管）

#### ps:没有这个文档

错误提示：Error: ENOENT: no such file or directory, open 'D:\GD\csems\src\www\chcp.manifest

解决方法：需要到cordova根目录在运行更新命令

#### 5、config.xml 配置

最好写在底部方便以后配置修改（放到`widget`标签里面即可）

```c
	<chcp>
	    <auto-download enabled="true" />
	    <auto-install enabled="true" />
	    <native-interface version="1" />
	    <config-file url="https://************/cordova/www/chcp.json" />
	</chcp>
</widget>
```

config-file：配置文件 chcp.json 从服务器上加载的路径（必须的配置项）
auto-download：是否自动下载热更新代码，默认是 true
auto-install：是否自动安装热更新代码，默认是 true
native-interface：当前 native side 的版本号

#### 6、将打包具有热更新功能的sdk

运行cordova build android生成具有热更行功能的安卓app安装包。

#### 7、测试热更新

这一步我是直接将项目更改后的的www文件夹放到服务器上，在cordova项目根目录运行 cordova-hcp build， 然后重启app，就可实现App的web内容代码的热更新了。需要注意的是www文件在服务地地址一定要与"content_url":"http://************/cordova/www"和config.xml中 填写的地址一致。

大概重启两次就可以更新了，
（何时更新update属性是start，第一次打开时下载资源，第二次打开才安装
是now：则可以打开之后，就进行下载更新）

拿这两个事件可以测试一下有没有触发事件

```c
document.addEventListener('deviceready', onDeviceReady(), false);
function onDeviceReady(){
//安装成功
document.addEventListener('chcp_updateInstalled', onUpdateReady(), false);
//安装失败
document.addEventListener('chcp_updateInstallFailed', onUpdateReady2(), false);
}
```

额，两个事件都触发了我也不知道为啥，反正是能用

热更新没用去查看下连接有问题没，没有就重启Tomcat

重启tomcat文件地址

\apache-tomcat-8.5.56\bin\startup.bat

查看端口

\apache-tomcat-8.5.56\conf\server.xml



