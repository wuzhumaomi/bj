# 很多是我在各各地方找的，所以如有雷同，你说我去看加原文链接，加注释

## ES6来源

​			 ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。 是JavaScript核心语言标准。或者说就是最新版本的JS。

# 一、关键字

| 关键字 |    作用域    | 变量/常量 |
| :----: | :----------: | :-------: |
|  let   |  块级作用域  |   变量    |
| const  |  块级作用域  |   常量    |
|  var   | 非块级作用域 |   变量    |

ps： **块级作用域**只是它定义的变量被限定在了特定范围内才能使用，而离开这个范围则无效。 

ps： **常量**即无法被更改值的变量。 

ps: 	注意**同域重名**会报错，**const** 更改会报错

# 二、箭头函数

```
一个参数只有一个返回值
1.var cc = function(p){
	return x;
}
相等于
var cc= p => x
		
两个参数只有一个返回值
2.var cc = function(p,p2){
	return x;
}
相等于
var cc= (p,p2) => x

一个参数只有两个返回值
3.var cc = function(p){
	xx逻辑一xx
	return x;
}
相等于
var cc= p => {
	xx逻辑一xx
	return x;
}

两个参数只有两个返回值
3.var cc = function(p,px){
	xx逻辑一xx
	return x;
}
相等于
var cc= (p,px) => {
	xx逻辑一xx
	return x;
}

```

**箭头函数影响this指向，可以在最外层函数 里用 let me =  this解决**

# 三、FOR循环，及关键字

## in 得到下标

```
for(let val in [‘a’,‘b’,‘c’])

val == 0 1 2
```

## of 得到那个数组的对象

```
for(let val of [‘a’,‘b’,‘c’])

val == 'a' 'b' 'c'
```

## 关键字 得到下标及对象的方法

```

for(let index of [‘a’,‘b’,‘c’].keys()) //遍历数组的元素索引

index = 0 1 2 

for(let value of [‘a’,‘b’,‘c’].values()) //遍历数组的元素值

value = a b c 

for(let [index,value] of [‘a’,‘b’,‘c’].entries()) //遍历数组的index和value
index  value
  0      a
  1      b
  3      c

```

**.entries()贼好用**

### .entries()

​		entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。

​		迭代对象中数组的索引值作为 key， 数组元素作为 value。

```
 var fruits = ["Banana", "Orange", "Apple", "Mango"]; 
 fruits.entries();
 
 [0, "Banana"]
[1, "Orange"]
[2, "Apple"]
[3, "Mango"]
 
 for (let [index, val] of arr1.entries()) {
  console.log(index, val);
}

0 'a'
1 'b'
2 'c'
3 'd'
4 'e'
5 'f'
6 'g'
7 'h'
8 'i'
9 'j'
10 'k'
 

```

# forEach

## forEach方法中的回调有三个参数：

第一个参数是遍历的数组内容，
第二个参数是对应的数组索引，
第三个参数是数组本身

**foreach 语法：**

```
　[ ].forEach(function(value,index,array){
　
　　　　//code something
　　　　
　　});

var arr = [1,2,3,4];
var sum =0;
arr.forEach(function(value,index,array){

 array[index] == value; //结果为true

 sum+=value; 

 });

console.log(sum); //结果为 10
```

## 参数扩展

重点 是这三个点 ...

```
sun(20,45,15);

...sun == 20,45,15

[...sun,...sun] == [20,45,15,20,45,15]

function sun(...num){
	console.log(num);
}
输出的
	20,45,15,54,55,66,44,77,88,99,789
```

## 模块化开发

js1

```
function get(){
    console.log('登陆成功');
    console.log('登陆成功 + 1');
}

export default {
    get:get
}
```

js2

```
export {default as LoginApi} from './login/login'
```

vue3

```
 {{get()}}
 
import {LoginApi} from '../api'

 methods:{
   get(){
   		LoginApi.get()
   }
 }
```

