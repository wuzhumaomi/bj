# html

## 背景

### 渐变背景

- background-image: linear-gradient(45deg,#9fbaa8,#31354c);

### 阴影

- box-shadow: 0 0 10px darkblue;/* 阴影 X轴偏移量 Y轴偏移量阴影模糊半径 阴影扩展半径 阴影颜色*/

### 背景

- background: url(../img/01.png);
	background-size: cover;/* 背景平铺 */
- background: rgba(0,0,0,.1);阴影
- background: transparent;
	透明

## 边框

### 通过设置元素的border-radius值，可以轻松给元素设置圆角边框，甚至实现绘制圆、半圆、四分之一的圆等各种圆角图形

- 边的50%以下为圆角
- 边的一半以上为圆、椭圆
- 也可以这样

### 边框基础代码

- border: 1px solid white;

### 轮廓

- outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。
-  outline:#00FF00 dotted thick;在元素周围画虚线

## 位置

### 居中

- 	position: absolute;	
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%) ;
- 子主题 2

### 内边距

- padding: 10px 10px;

### 外边距

- margin: 10px 0;

### 字体位置

- text-alig

### 扭曲

- transform: rotate(-30deg) skew(25deg) scale(.8);

## 基础代码

### position（定位）

- position: relative;/* 相对定位 */
- position: absolute;	相对定位

### vh

- 相对于视口的高度。视口被均分为100单位的vh

### z-index属性

- 较大 number 值的对象会覆盖在较小 number 值的对象之上。

## 特效

### transition: 0.4s;

- 0.4秒完成特效，实现动画

### 翻转-隐藏背面

- background-size: cover;/* 背景平铺 */
	backface-visibility: hidden;/* 隐藏背面 转动背面时，"front"面消失，另一幅图片被展示出来*/
	transition: 0.8s;/*代表持续时间为0.8s，延迟时间为默认值0s*/
- transform: perspective(800px) rotateY(0deg);正面
- transform: perspective(800px) rotateY(180deg);反面

### 鼠标

- cursor 属性规定要显示的光标的类型（形状）。
- cursor: pointer;手指

### 透明度

- opacity: value

	- 规定不透明度。从 0.0 （完全透明）到 1.0（完全不透明）。

## js

### 轮流响应

- toggle()

  toggle() 方法用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。

  该方法也可用于切换被选元素的 hide() 与 show()

	- 切换 Hide() 和 Show()
	- 显示或隐藏元素

		- $(selector).toggle(switch)

			- 必需。布尔值，规定 toggle() 是否应只显示或只隐藏所有被选元素。true - 显示元素 false - 隐藏元素

	- 向 Toggle 事件绑定两个或更多函数

		- $(selector).toggle(function1(),function2(),functionN(),...)
		- toggle() 方法用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。

- toggleClass()

	- toggleClass() 对设置或移除被选元素的一个或多个类进行切换。

## 选择

### img:nth-child(4)

- 同一个父类的的第4个img标签

*XMind: ZEN - Trial Version*