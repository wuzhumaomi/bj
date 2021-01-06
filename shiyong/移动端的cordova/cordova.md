# 1.全局安装

**ps:正常来说安装人家都没有的错，就换一下网络什么的**

## 1.安装（管理者模式）

```
npm install -g cordova
```

安装过了直接创建项目就好了

## 2.查看

```
cordova -v
```

### 查看安装的插件

```
cordova plugin list
```

## 3.帮助（运行一次）

```
cordova help
```

**ps：之前说不认识我输入的创建项目命令，运行一次就好了**

# 2.创建项目

cd 到自己创建项目的位置

## 1.创建

```
cordova create myapp //创建项目
```

## 2.添加支持

**cd进创建好的项目**

##### 	i.添加浏览器支持

```
cordova platform add browser
```

##### 	i.添加Android支持

```
cordova platform add android


cordova build android --prod 加快启动的速度
```

**ps：**1.当报地址或者名字错误时

​				**解决方案：**重新npm install -g cordova

## 2.运行

```
cordova run browser
```

**ps：ctrl+c == 终止运行**

# 打包

***打包要有安卓支持***

## 查看是否能打包

```
cordova requirements
```

ps：gradle不能用就下载一下，然后在环境变量path中加上gradle/bin的地址就行了

## 打包安卓

```
cordova build android
```

## 运行安卓

```
cordova run android
```

**ps：打包好了的地址，   C:\Users\19844\Desktop\cordova\mApp\platforms\android\app\build\outputs\apk\debug\app-debug.apk**



**ps：安卓手机高版本的不能请求**

​	https://blog.csdn.net/ouyangli2011/article/details/103478148

 	android目录下AndroidManifest.xml 配置文件的application节点显示加上 

```
 	android:usesCleartextTraffic="true" 
```

# 基础设置

## cordova命令

```
add 添加
remove 删除
list 查看


cordova platform remove android
```

## config.xml  包名 图标

```
id 》》》 包名
 <icon src="./www/img/logo2.png" platform="android" width="57" height="57" density="mdpi" />《《《《《《图标
 <icon src="www/img/an.png" platform="android" width="57" height="57" density="mdpi" />
    <icon src="www/img/an.png" platform="android" width="57" height="57" density="ldpi" />
    <icon src="www/img/an.png" platform="android" width="57" height="57" density="xhdpi" />
    <icon src="www/img/an.png" platform="android" width="57" height="57" density="hdpi" />
<platform name="android">
        <allow-intent href="market:*" />
        
</platform>
```

Android 

# 事件（js）

## 基础事件

## 解绑

```
document.addEventListener('backbutton',houtui,false);

document.removeEventListener('backbutton',houtui,false);
```



```
document.addEventListener('deviceready', f1);
		
function f1(){
	alert("加载成功");
	document.addEventListener('backbutton', function(){
		alert("返回");
	});
	document.addEventListener('menubutton', function(){
		alert("菜单");
	});
	document.addEventListener('searchbutton', function(){
		alert("搜索");
	});
	document.addEventListener('volumedownbutton', function(){
		alert("减音量");
	});
	document.addEventListener('volumeupbutton', function(){
		alert("加音量");
	});
}
```

## 电池事件

```
cordova plugin add cordova-plugin-battery-status // 安装

window.addEventListener("batterystatus", function(status){
	    alert("电量: " + status.level + " 是否在充电: " + status.isPlugged);
	}, false);
	
	window.addEventListener("batterylow", function(status) {
	    alert("电量低于了 " + status.level + "%");
	}, false);
	
	window.addEventListener("batterycritical", function(status) {
	    alert("电量到了临界点 " + status.level + "%\请充电!");
	}, false);

```

## 定位

```
cordova plugin add cordova-plugin-geolocation //安装

   function onSuccess(position) {
        alert('维度: '          + position.coords.latitude          + '\n' +
              '经度: '         + position.coords.longitude         + '\n' +
              '海拔: '          + position.coords.altitude          + '\n' +
              '精度: '          + position.coords.accuracy          + '\n' +
              '海拔精度: ' + position.coords.altitudeAccuracy  + '\n' +
              '方向: '           + position.coords.heading           + '\n' +
              '速度: '             + position.coords.speed             + '\n' +
              '时间戳: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

   
function Text(){
	alert('tianjia')
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


```

## 启动页面

```
  <platform name="android">

        <!-- 启动屏 -->
        <splash density="land-hdpi" src="www/img/qiDong.jpg" />  
        <splash density="land-ldpi" src="www/img/qiDong.jpg" />  
        <splash density="land-mdpi" src="www/img/qiDong.jpg" />  
        <splash density="land-xhdpi" src="www/img/qiDong.jpg" />  
        <splash density="port-hdpi" src="www/img/qiDong.jpg" />  
        <splash density="port-ldpi" src="www/img/qiDong.jpg" />  
        <splash density="port-mdpi" src="www/img/qiDong.jpg" />  
        <splash density="port-xhdpi" src="www/img/qiDong.jpg" /> 
    </platform>
    
    
    
    
    
    <!-- 配置 -->
    //自动隐藏启动页面
    <preference name="AutoHideSplashScreen" value="true" />
    //显示启动页面的时间长度SplashScreenDelay(默认为：3000)
    <preference name="SplashScreenDelay" value="5000" />
    //是否显示淡入淡出效果FadeSplashScreen(默认为：true)
    <preference name="FadeSplashScreen" value="false"/>
    //淡入淡出效果的执行时间长度FadeSplashScreenDuration(默认为：500)
     <preference name="FadeSplashScreenDuration" value="750"/>
     //	<!-- 启动页中间位置会有个菊花状的旋转进度条 -->
     <preference name="ShowSplashScreenSpinner" value="false"/>
     <!-- 保持启动页面图片的长宽比 -->
    <preference name="SplashMaintainAspectRatio" value="true" />
     
```



# 错误

​	Cordova is not defind

```
在头部添加 <script type="text/javascript" src="cordova.js"></script>
```

## 