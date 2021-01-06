# 简说MVVM

#### mvvm拆分表示

​	MVVM可分为	M( **Model（模型）** ),	V( **View（视图）**),	VM( **ViewModel （模型视图）**),这个结构是不是特别像JAVA的MVC结构

MVC的结构是M( **Model（模型）** )	V( **View（视图）** )	C( **Controller（控制器）** )

**Model（模型）**是应用程序中用于处理应用程序数据逻辑的部分。

通常模型对象负责在数据库中存取数据。

**View（视图）**是应用程序中处理数据显示的部分。

通常视图是依据模型数据创建的。

**Controller（控制器）**是应用程序中处理用户交互的部分。

通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

  ![0 (1)](..\img\0 (1).jpg)

如果你懂得话Java的MVC，那么你将会很容易明白MVVM，MVVM有着相似的结构，（打个比喻）他们的差距只是将controller控制器挪到了view视图层和model模型之间，换句话说就是视图和模型层中间加入了一个处理，不再是直接访问的了

![0](..\img\0.jpg)

如果这还是很抽象的话，那你看这张图，因为我学的是vue所以就用vue和大家讲一下，如

```
data(){
    return{
      bool:false,
      t:null
    }
  },
```

data( **Model（模型）** )里面的数据如	 t:null	要到HTML界面( **View（视图）**)以	{{t}}	的形式输出里面的值实现到页面

```
<div class="fangGE"  v-on:click="y">
   <div v-if="bool"> {{t}} </div>
   <div v-else v-on:click="bool = true"> </div>
 </div>
```

原生js是做不到的对吧，那么他就要经过Vue( **ViewModel （模型视图）**)的加工处理才能实现这一功能，反之亦然。

![011](..\img\011.png)

### 这是我的总结，如有问题也请骂的轻点，然后顺便写下自己的理解，已助新人脱坑

### 以下是一些MVVM的优点摘抄以及一些扩展可看可不看

### MVVM优点

MVVM模式和MVC模式一样，主要目的是分离视图（View）和模型（Model），有几大优点

**1. 低耦合**。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。

**2. 可重用性**。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。

**3. 独立开发**。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用[Expression](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=52918064&ss_c=ssc.citiao.link) Blend可以很容易设计界面并生成xaml代码。

**4. 可测试**。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写。