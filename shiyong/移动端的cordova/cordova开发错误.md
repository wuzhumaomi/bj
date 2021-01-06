## 在build安装包的时候

```
Checking Java JDK and Android SDK versions
ANDROID_SDK_ROOT=D:\Ruan\android-sdk_r24.4.1-windows\android-sdk-windows (recommended setting)
ANDROID_HOME=D:\Ruan\android-sdk_r24.4.1-windows\android-sdk-windows (DEPRECATED)
Subproject Path: CordovaLib
Subproject Path: app
Downloading https://services.gradle.org/distributions/gradle-4.10.3-all.zip

Exception in thread "main" java.net.UnknownHostException: services.gradle.org
```

### 解决方法

#### 设置代理

```
不能进行下载，更改代理就行了

添加
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080

终端输入：
curl -vv http://www.google.com
查看响应数据即可,有则说明成功

去掉代理

```

设置虚拟机中的终端设置临时代理：

```
export http_proxy=http://主机IP:1080
export https_proxy=http://主机IP:1080
```

**在build.gradle同级目录创建gradle.properties 设置代理服务器**

```
`systemProp.http.proxyHost=127.0.0.1``systemProp.http.proxyPort=8000``systemProp.https.proxyHost=127.0.0.1``systemProp.https.proxyPort=8000``systemProp.http.nonProxyHosts=10.*|localhost`
```

## 在build ios安装包的时候需要苹果

