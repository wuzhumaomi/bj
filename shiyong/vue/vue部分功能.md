# 一、组件建成和使用

vue的app界面就是路由，其他界面里面的一切都可分为父组件和子组件

很多界面用到同一功能时可，封装到一个组件里面以便方便使用

## html代码

```
 <el-dialog title="提示"
  			:visible.sync="dialogVisible"
  			@fatherMethod="fatherMethod"
  			width="30%">
  			
     <zuJian ref="zuJian"   :value="value"/>
 </el-dialog>
```

###  <el-dialog 对话框

```
title="提示" 表头
width="30%" 对话框的宽
:visible.sync="dialogVisible" 是否显示，true显示

```

### <zuJian 自定义组件

```
ref="infoE" 绑定方便以后调用它里面的方法
:value="value" // 传的值

props: ['value'] // 接受值
用这个可以 this.$refs["infoE"].verify(); 调用里面的方法
```

**ps：发现refs初次传值调用内部方法无用**，因为DOM还没渲染，返回来的只能是undefined
所以我用了

```
 setTimeout(()=>{
          this.$refs.名.方法(row)
        },100)
```

## vue代码

```
import zuJian from '@/views/组件'

export default {
  name:'',
  //组件
  components: {
    zuJian 
  },
```

## 调用父组件方法

```
this.$emit('fatherMethod'[,可传值]);

```



# 二、路由传值以及在左侧栏找不到

```
 {
     path: '/siteUser/:id',		《《《《《《
     name: 'SiteUser',
     component: () => import('@/views/basic/siteUser'),
     meta: { title: '场地人员管理', icon: '', noCache: true },
     hidden: true		《《《《《《《《
    }
    
    
<router-link :to="'/siteUser/'+scope.row.id"> 《《《《《《《


```

# 三、长按

一、在data里加

```
Loop:'',
```

二、在要点击的元素里加上这@touchstart、@touchend两个属性

```
<div @touchstart="showDeleteButton" @touchend="clearLoop">
```

三、调用的方法

```
    showDeleteButton() {
     	console.log("刚开始按时触发");
        clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
        this.Loop=setTimeout(function(){
           console.log("按过的0.5秒后触发");
        },500);
    },
//   长按松手的时候
    clearLoop() {
        console.log("松手时触发");
        //松手就清理掉计时器
      	clearInterval(this.Loop)
    },
```

# Reduce方法

# 基本参数

```
array.reduce(function(prev, currentValue, currentIndex, arr), initialValue)
```

`prev`:表示上一次执行方法所返回的值，或者`initialValue`。（如果`initialValue`没有设置，则取`array`中的第一个元素）
`currentValue`:当前循环的`array`的元素值
`currentIndex`:当前循环的`array`的元素值所对应的下标
`arr`:表示当前所遍历的函数
`initialValue`:为`prev`指定一个初始值，可不写，则取`array`的第一个元素

# 实用小例



[JS 随记](https://www.jianshu.com/nb/39638964)



### 根据接口获得img

```
:src="[listInof.id,listInof.all] | urlFilter"
```

```
return process.env.VUE_APP_BASE_API+'/tWarningController/getFaceCompLibSceneImgSmall/'+id[0]+'/'+id[1]*1
```

