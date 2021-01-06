# 1.选择器

## 1.选择元素

### CSS选取第一个、最后一个、偶数、奇数、第n个标签元素

1、**first-child**

first-child表示选择列表中的第一个标签。例如：li:first-child{background:#fff}

2、**last-child**

last-child表示选择列表中的最后一个标签，例如：li:last-child{background:#fff}

3、**nth-child(3)**

表示选择列表中的第3个标签，例如：li:nth-child(3){background:#fff}，代码中的3也可以改成其它数字，如4、5等。想选择第几个标签，就填写几。

4、**nth-child(2n)** 

这个表示选择列表中的偶数标签，即选择 第2、第4、第6…… 标签，例如：li:nth-child(2n){background:#fff}

5、**nth-child(2n-1)**

这个表示选择列表中的奇数标签，即选择 第1、第3、第5、第7……标签，例如：li:nth-child(2n-1){background:#fff}

6、**nth-child(n+3)**

这个表示选择列表中的标签从第3个开始到最后。

7、**nth-child(-n+3)**

这个表示选择列表中的标签从0到3，即小于3的标签。

8、**nth-last-child(3)**

这个表示选择列表中的倒数第3个标签。

```
.ce:nth-child(1){
    grid-column-start: span 2;
  }
```

```
input[e="ccc"] >>> 标签里面有属性是e="ccc"的input

input[type="text"] >>> 文本类型的input
```

## 2.CSS 选择器参考手册

| 选择器                  | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| [*attribute*]           | 用于选取带有指定属性的元素。                                 |
| [*attribute*=*value*]   | 用于选取带有指定属性和值的元素。                             |
| [*attribute*~=*value*]  | 用于选取属性值中包含指定词汇的元素。                         |
| [*attribute*\|=*value*] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| [*attribute*^=*value*]  | 匹配属性值以指定值开头的每个元素。                           |
| [*attribute*$=*value*]  | 匹配属性值以指定值结尾的每个元素。                           |
| [*attribute**=*value*]  | 匹配属性值中包含指定值的每个元素。                           |



# 2.光标样式的改变

```
cursor: pointer; //手型
```

# 3.根据浏览器大小变换样式

```
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```

#  4.background-blend-mode 属性定义了背景层的混合模式（图片与颜色）。 

```
div { 
    width: 290px;
    height: 69px;
    background-size: 290px 69px;
    background-repeat:no-repeat;
    background-image: linear-gradient(to right, 颜色 0%, white 100%), url('图片路径');
    background-blend-mode: color-dodge;
}
```

**CSS语法：**

```
background-size: length|percentage|cover|contain;
```

# ----- 基点

- transform-origin: bottom center;	/* 旋转元素的基点位置 */ 

# 5.背景

## vue使用

```
 <img :src="require('@/assets/img/renYuan.png')" class="user-avatar">
```

## 背景图片属性值

```
background-size: cover;
```

| 值         | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| length     | 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 auto(自动) |
| percentage | 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)" |
| cover      | 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。 |
| contain    | 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小 |

## Filter 函数亮度模糊

**注意:** 滤镜通常使用百分比 (如：75%), 当然也可以使用小数来表示 (如：0.75)。

```
filter: blur(3px);
```

| Filter          | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| none            | 默认值，没有效果。                                           |
| blur(*px*)      | 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；  如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。 |
| brightness(*%*) | 给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。 |

## 背景图片移动

**ps：是background不是background-img**

```
background: url("../assets/img/6tu.png") no-repeat -1px 0;
```

## 背景图片透明度

```
background-color:rgba(0,0,0,0~1)来设置背景颜色透明。
```

## 渐变

```
			/* 纵向 */
			background: linear-gradient(90deg, #ff0000 20%, transparent 40%, transparent 80%, #000000 );
			/* 横向变化 90deg旋转90度  第一个百分比是从百分之几开始渐变 ，第二个百分比是第一段渐变到百分之几结束，和第二段的开始依次*/
```



# 6.阴影

```
box-shadow:0 0 50px #1890ff;
```

## 字体阴影

```
text-shadow: #1890ff;
```

## 内阴影

​		ps:  	inset(重点)

```
box-shadow:0 0 50px #1890ff inset
```

## 根据div背景设置背景

```
.text1::before{
    content: "";
    display: block;
    background: inherit;
    filter: blur(2px);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3px;
    left: 3px;
    z-index: -1;
    opacity: 0.4;
    transform-origin: 0 0;
    border-radius: inherit;
    transform: scale(1, 1);
  }
```



# 7.样式优先!important

```
background-color: #1890ff!important;
```

# 8.@media根据浏览器的变化而改变元素

```
  // 根据分辨率调整大小

  @media screen and (min-width: 1400px) {
   .el-dialog__body {
     max-height: 76vh;
   }
  }
```

# 9.空格

```
&nbsp;
```



# 10.超出部分隐藏

```
overflow: hidden;
```

## 超出部分更换为...

```
white-space: nowrap;/*内容超宽后禁止换行显示*/
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/*文字超出部分以省略号显示*/
```

# 

|      |      |
| :--- | :--- |
|      |      |
|      |      |
|      |      |
|      |      |
|      |      |
|      |      |
|      |      |

# 12.伪元素加动画

```
 .van-tabbar-item:before{
  /* 重要 */
  content:' ';
  
  position: absolute;
  border-radius: 50%;
  width: 0px;
  height: 0px;
  background: #1678ff;
  animation: loading 0.68s ease-in-out 1;
}

@keyframes loading{
	0%{
		/* transform: scaleY(0.1); */
    width: 0px;
    height: 0px;
		background: #fff;
	}50%{
		/* transform: scaleY(1); */
		background: rgba(207, 207, 207,0.5);
	}100%{
		/* transform: scaleY(0.1); */
    width: 70px;
    height: 70px;
		background: transparent;/* 背景透明。实际上background默认的颜色就是透明的属性 */
	}
}
```

# 13.position

position 属性规定元素的定位类型。 

**可能的值**

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| fixed    | 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| relative | 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。 |
| static   | 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。 |
| inherit  | 规定应该从父元素继承 position 属性的值。                     |

# 字体

## 1.字体居中

```
 line-height: 30px;
 text-align: center;
```

## 2.字体阴影

```
text-shadow: #1890ff;
```

## 3.修改字体

```css
font-family:'myFirstFont';

@font-face{
    font-family:'myFirstFont';
    src:url('./ziYuan/text01.ttf') format('truetype')
  }
```

# 一些样式上的问题

## 1.当内容不确定高度，背景固定不住的问题

​	i.在最上方创建一个div有以下属性

```
.bac{
  height: 100vh;
  width: 100%;
  position: absolute;
  background: #f5f5f5;
}
```

# 特殊样式

```
position: sticky;
top: 10px;
```

## 塌陷处理

```

```



## 粘性定位

```
 position: sticky;
 top: 0;
```

 粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。 

 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。 

 ![img](https://user-gold-cdn.xitu.io/2020/5/24/1724700dcb525bb5?imageslim) 

父级元素不能有任何 `overflow:visible` 以外的 `overflow` 设置，否则没有粘滞效果。如果你设置的 `sticky` 没有效果，可以看看父级元素们有没有设置 `overflow:hidden`，去掉就可以了。

必须指定 `top`、`bottom`、`left`、`right` 4 个值之一，否则只会处于相对定位。

父元素的高度不能低于 `sticky` 元素的高度（参考上面原理解释）

`sticky` 元素仅在其父元素内生效（参考上面原理解释）

## 渐变色

 background: linear-gradient(#ff0000, #00ff00); 

				/* 纵向 */
				background: linear-gradient(90deg, #ff0000 20%, transparent 40%, transparent 80%, #000000 );
				/* 横向变化 90deg旋转90度  第一个百分比是从百分之几开始渐变 ，第二个百分比是第一段渐变到百分之几结束，和第二段的开始依次*/

## 等比缩小

```
-webkit-transform-origin-x: 0;
-webkit-transform: scale(0.80);
```

## 合并table边框

```
border-collapse:collapse;
```

## css3加减乘数+-*/

```
width:calc(100% - 100px);
```

## 瀑布流布局

```
div
	li
	
容器
	//分成三列
    column-count:3;
    column-gap: 30px;
	
内容
	//
    height: 55px;
    overflow: auto;	
	
```

## 叠加git

属性描述了元素的内容应该与元素的<!--直系父元素-->的内容和元素的背景如何混合

> **mix-blend-mode: normal;          //正常**

> **mix-blend-mode: multiply;        //正片叠底**

> **mix-blend-mode: screen;          //滤色**

> **mix-blend-mode: overlay;         //叠加**

> **mix-blend-mode: darken;          //变暗**

> **mix-blend-mode: lighten;         //变亮**

> **mix-blend-mode: color-dodge;     //颜色减淡**

> **mix-blend-mode: color-burn;      //颜色加深**

> **mix-blend-mode: hard-light;      //强光**

> **mix-blend-mode: soft-light;      //柔光**

> **mix-blend-mode: difference;      //差值**

> **mix-blend-mode: exclusion;       //排除**

> **mix-blend-mode: hue;             //色相**

> **mix-blend-mode: saturation;      //饱和度**

> **mix-blend-mode: color;           //颜色**

> **mix-blend-mode: luminosity;      //亮度**

> **mix-blend-mode: initial;         //初始**

> **mix-blend-mode: inherit;         //继承**

> **mix-blend-mode: unset;           //复原**

# 高大上

## color

```
字体颜色 
color ： hsla(0, 0%, 40%, 0.486); 灰色
40% 越小颜色越浅 
0.486 透明度
```

## flex

```

```

```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
}
```

# 表格

```
合并单元格
<td colspan="2" rowspan="2">row 1, cell 1</td>
td{
    height: 40px;
    margin: 0;
    padding: 0px 10px;
    /* 合并边框 */
    border-collapse: collapse;
}
```

# div转input

ps：下面的那个样式有用到

```
contenteditable='plaintext-only'
```

# htnl高度100%

```

  .tbInput{
    position: relative;
    height: 100%;
  }
  
  .tbInput div{
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #858585;
    padding:0pt 5.4pt;

    
    display: flex;
    flex-direction: row;
    align-items: center;
  }
```

```
.org-framework{
  display: flex;
  flex-direction: column;
  // 填充剩下的空间
  .flex1{
    flex: 1;
    position: relative;
  }
  .flex1 .el-col{
    position: relative;
    height: 100%;
  }
  // 行
  .absolute1{
    height: 100%;
  }
}
```

