1.错误 一、uni-app，Error: read EBADF at Pipe.onStreamRead (internal/stream_base_commons.js:183:27)

微信开发者工具》设置 》 安全设置 》打开服务端口

![image-20201229134728516](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201229134728516.png)

# 配置

## 1.pages.json 全局配置

`pages.json` 文件用来对 uni-app 进行全局配置，决定页面 

1. 文件的路径
2. 窗口样式
3. 原生的导航栏
4. 底部的原生tabbar

等。

它类似微信小程序中`app.json`的**页面管理**部分。注意定位权限申请等原属于`app.json`的内容，在uni-app中是在manifest中配置。

链接:

https://uniapp.dcloud.io/collocation/pages?id=%e9%85%8d%e7%bd%ae%e9%a1%b9%e5%88%97%e8%a1%a8

# 组件问题

## 横向滚动

```

.scroll-view_H{
    // 必须要这个属性，否则不能出现横线滚动
    white-space: nowrap; 
    
    height: 30rpx;
    width: $width100-20;
    border-radius: 30rpx;
    .scroll-view-item_H{
    	// 必须要这个属性，否则不能出现横线滚动
        display: inline-block; 
        width: 180rpx;
        background-color: #007AFF;
    }
}
```

## 带箭头的白板列表

```
<uni-list>
	<uni-list-item  title="列表文字" link="reLaunch"></uni-list-item>
</uni-list>
```

## 宽高样式无用

```
// 列表
.list{
    display: inline-block;
    width: $width100-40;
}
```

## 加载

	uni.showNavigationBarLoading();// 加载
			
	setTimeout(()=>{
	      uni.hideNavigationBarLoading();//关闭加载动画
	},5000)
# vue使用方面

## for

```
	<text class="label-name" v-for="(item,index) in listTypecont" :key="index">
					{{item.name }}
				</text>		
```

## 上拉加载，下拉刷新

ps：data同级，类似于生命周期

```
 	onPullDownRefresh() { //下拉刷新
     
    },
    onReachBottom() { //滚动到底翻页
        // this.$refs.udb.loadMore()
        this.listTypecont=[
            ...this.listTypecont,
            ...this.listTypecont
        ]
    },
```



# 请求

```
uni.request({
		url: 'http://entapi.anjyzn.cn/api/oauth/login/enterprise',
		method:'post',
		data: {
				username: 'ceshi',
				password: 'jy666888.',
				type:'password',
		},
		header: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' //自定义请求头信息
		},
		success: (res) => {
				console.log(res.data);
				this.text = 'request success';
		}
});

```

