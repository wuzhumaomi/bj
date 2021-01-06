**ColorUI**

​	一款别人写好 js + css + html的样式集合

​	虽然想吐槽，但是人家的样式什么的都是很好的，总而言之就是很好看

​	你如果想使用它里面好看的框架，我，我说我，我是去他的dome里面一个个复制过来代码

一部分组件很方便导入他的css就好了，直接复制相应的html代码到你想要放的地方就好了

如：

![1588053020648](..\..\shiyong\img\wx动画.png)

一、导入

官方的github

​	https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Fgithub.com%2Fweilanwl%2FColorUI

一、导入css

​		<!--文档大概也许可能是少导了一个@import "colorui/animation.wxss";，导致我的上面那个特效有问题-->

​		下载源码解压获得`/demo`，复制目录下的 `/colorui` 文件夹到你的项目根目录

```
App.wxss` 引入关键Css `main.wxss` `icon.wxss
@import "colorui/main.wxss";
@import "colorui/icon.wxss";
@import "colorui/animation.wxss";
```

二、找到他相对应的代码

如那个星星，我只需要复制这一小段代码到我想要放的位置即可

```
 <view class="bg-black flex-sub margin-right radius shadow-lg">
    <image src="https://image.weilanwl.com/gif/loading-black.gif" mode="aspectFit" class="gif-black response" style="height:240rpx"></image>
  </view>
```

当然也有像轮播图略微复杂的动画还需要复制他的js代码

![1588051888785](..\..\shiyong\img\轮播.png)

如果遇见其他坑我再回来填坑