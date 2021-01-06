# 对象

## 删除对象一个属性

```
delete 对象.属性
```



# 数组

## 数组语法

```vue
html >>>>>> <div class="aaa" :class="[变量名,'字符串']"></div>
		   <div class="aaa" :class="{getcla()}"></div>
script >>>>>> methods:{
               getcla(){
                 return [this.isClass,'Class'];
               },
js添加
 this.getcla.push("123");
 this.getcla.push("123","456","789");

js修改
this.getcla[0] = "w" 不是响应式的
Vue.set(this.getcla,0,"sadf"); 是响应式的，但可能有问题所以推荐用下面的那些


.pop() 删除最后一个元素

.shift() 删除第一个元素

.unshift() 在第一个元素之前添加

.splice(从哪一个开始【，删除几个，替换的东西】)
~~~~~~只写一个是删除哪一位后面的所有元素
~~~~~~第二个写 0 是不删，然后插入字符
如
ff["q","w","e"]
ff.splice(1,1,"s","d","f")
从第二个开始删除一个，然后再添加三个字符
q s d f e 


arr.sort(sortNumber) 对数字排序
function sortNumber(a,b)
    {
    	return a - b
    }
1 5 6 4 3 2 》》》》》》1 2 3 4 5 6
.sort() 对字符排序
a b c e d f 》》》》 a b c d e f

.reverse() 将数组元素掉一个头，反过来
 1 2 3 4 5 6>>>>>>>6 5 4 3 2 1 

.join(' - ')
 1 2 3 4 5 6 >>>>>>> '6 - 5 - 4 - 3 - 2 - 1' 
```

### includes() 查是否有这个值

includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。

```
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

### slice定义和用法

**ps: 包前不包后**

slice() 方法可从已有的数组中返回选定的元素。

语法
arrayObject.slice(start,end)

| 参数  | 描述                                                         |
| :---- | :----------------------------------------------------------- |
| start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。 |
| end   | **可选**。规定从何处结束选取。该参数是数组片断结束处的数组下标。**如果没有指定该参数**，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |

### 数组去重

```
new Set()，用来去重数组。

let arr = [1, 2, 2, 3];
let set = new Set(arr);
let newArr = Array.from(set);
console.log(newArr); // [1, 2, 3]

Set类似于数组，区别在于它所有的成员都是唯一的，不能有重复的值
```

### 计算数组的和

```jsx
  let array = [2,3,4];
  let result= array.reduce((pre,cur)=>{
      return pre+cur;
  },1)
  console.log(result);//2+3+4
```

### 数组去重

```jsx
    var arr = [1,2,3,3,4,4,2,1,5]
    var newArr = arr.reduce(function (prev, cur,index,curarr) {
        console.log('curarr:',curarr)//[1,2,3,3,4,4,2,1,5]
        prev.indexOf(cur) === -1 && prev.push(cur);
        //这里表示prev第一次去设置的init值[]，当满足当前的新数组没有cur（当前元素）时才执行push
        return prev;
    },[]);
    console.log(newArr);//[1,2,3,4,5]
```

### 计算数组最大值

```jsx
var max = arr.reduce(function (prev, cur) {
    return Math.max(prev,cur);
});
```

## 高阶函数

 ***若在函数内部给n进行· n = n+1;类似的的操作时会影响原本的那个数组；*** 

### 1.	数组.filter(function(n){  return cc; })	 

筛选出符合条件的元素，然后返回一个新数组

```vue
 computed: {	
    chongFuBenShu(){
         console.log("以调用chong");

         let cc = this.server01.filter(function(n){
           return n.shu>=2;
         });
         console.log(cc);

          return cc;
       }


server01[5,1,1,2,3,4,5,1,1,1,1] >>>>>>>> cc[5,2,3,4,5]

```

### 2. 数组.map(function(n){return cc; })

对内部数据进行处理，然后返回一个新数组

```
daZhe(){
     console.log("d打折");
     
     let cc = this.server01.map(function(n){
       n.shu =n.shu*2;
       return n;
     });
     console.log(cc);
     
      return cc;
   }

```

### 3. 数组.reduce(function(p , n){  return p + n.shu; },0); 

0是初始p 的值， 然后p 是上一次循环遍历返回的值

**类似于汇总**，然后返回一个值，**返回的不是一个数组**

```
huiZong(){
     console.log("汇总");
     
     let cc = this.server01.reduce(function(p , n){
     
       return p + n.shu;
     },0);
     console.log(cc);
     
      return cc;
   }
p (上一次return的值)   n         return（p+n）
0 (初始化的))		  1			  1
1				     2			3
3				     3			6
6				     4			10
```

## 两个数组有没有一样的

```
permissionRoles = [1,2,3]    roles = [2,4]
const hasPermission = roles.some(role => {
 	return permissionRoles.includes(role)
 })
```

## .some方法用于检测数组中的元素是否满足指定条件

some() 方法会依次执行数组的每个元素：

- 如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。
- 如果没有满足条件的元素，则返回false。

```
var ages = [3, 10, 18, 20];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.some(checkAdult);
}

》》》》true
```

## 检测数组 是否包含一个字符串

```
let site = ['runoob', 'google', 'taobao'];
 
site.includes('runoob'); 
// true 
 
site.includes('baidu'); 
// false
```

# 字符串

## 字符串的截取

​			根据空格分割为一个一个的数组

```js
newValue = "kfjsdfa kjfdsakjfkj lkjdflkesalk"

let name = newValue.split(' ');

name[0] ==>>> "kfjsdfa"
```

## 触发其他元素的点击事件

```js
 cli(){
        let img = document.getElementById("cliText");
        img.click();
      },
```

## 截取文件后缀名

```
var str = 			file.name.substring(file.name.lastIndexOf('.')+1);
```

## 遍历对象属性

```
var cc = {
    name:"123",
    pwd:"123"
}
console.log(Object.keys(cc));
```

## 获得对象的实际高宽

```
document.getElementsByClassName("evnK")[0].offsetHeight
document.getElementsByClassName("evnK")[0].offsetWidth
```

## 删除设置的属性

```
document.getElementsByClassName('refresh')[0].removeAttribute('height');
```

## 设置一个列表的高

```
setH(){
      console.log(document.getElementById("listMain").offsetHeight);
      if (document.getElementById("listMain").offsetHeight>=document.documentElement.clientHeight - 46 -50) {
        document.getElementById("listMain").classList.remove("h100");
      }else{
        document.getElementById("listMain").classList.add("h100");
      }
    }
```



# 缓存

https://www.cnblogs.com/liangye/p/13437294.html

```
    document.cookie = "id=18";
    document.cookie = "name=liangye";
    alert(document.cookie); //id=18; name=liangye 由于没有设置有效期expires,浏览器关闭后会自动来清理cookie（并非关闭标签）
```

## cookie和storage的区别

1.cookie兼容所有的浏览器（本地cookie谷歌不支持），storage不支持IE6~8;

2.二者对存储的内容均有大小限制，前者同源情况写一般不能存储4kb的内容，后者同源一般能存储只能存储5MB的数据

3.cookie有过期时间，localStorage是永久存储（如果你不手动去删除的话）

4.一些浏览器处于安全的角度可能会禁用cookie,但无法禁用localStorage

### 实际项目中本地缓存都能来存储什么？

cookie：记住用户名密码以便下次自动登录等等：当用户登录成功后，存储用户的部分信息，便可以在项目的任何页面知道当前的用户是谁了。

storage：存储一些不容易过期的数据（如从api接口中接收的用于渲染页面的数据），在存储时一般加入一个存储时间(time:Date.now()),以便在下次

刷新页面的时候判断存储的事件有没有超过预定的时间；也可以用来存储一些页面的源代码，比如css样式或者html等等（有必要的时候需要来结合前台的数据）；

**注意：**本地存储一般是明文存储，对于重要的信息不要直接存储在本地，如果非要存储的话，记得要对存储的信息进行加密。

加密方法：

a.可逆转加密（一般都是自己来设置自规则）

b.不可逆转加密：（一般都是基于MD5来进行加密，可能会把MD5加密后的数据二次加密）

- > 想要了解加密的可参考这两个入门链接：https://www.jianshu.com/p/650a6d29c134；https://www.jianshu.com/p/c256ffba7c62

### 一、Cookie

**Cookie是什么：**

简单地说，cookie 就是浏览器储存在用户电脑上的一小段文本文件。cookie 是纯文本格式，不包含任何可执行的代码。一个 Web 页面或服务器告知浏览器按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，Web 服务器就可以使用这些信息来识别不同的用户。大多数需要登录的网站在用户验证成功之后都会设置一个 cookie，只要这个 cookie 存在并可以，用户就可以自由浏览这个网站的任意页面。再次说明，cookie 只包含数据，就其本身而言并不有害。

设置Cookie的失效时间：

如果Cookie没有设置expires属性，那么 cookie 的生命周期只是在当前的会话中，

关闭浏览器意味着这次会话的结束，此时 cookie 随之失效。

```
//封装函数的使用  如果不设置时间的话关闭浏览器时所存储的数据就会过期
//存储cookie 修改cookie也可调用次方法，覆盖
function setCookie(name, value, iTime) { //name是cookie中的名，value是其值，iTime来预定过期的时间（以天为单位）
    var iDate = new Date();
    iDate.setDate(iDate.getDate() + iTime); //以天为单位,存储是需要将Date对象存储为格林威治时间形式的字符串
    document.cookie = name + '=' + value + ';expires=' + iDate.toGMTString();
}

//获取cookie
function getCookie(name) {
    //web中cookie是以分号+空格隔开的
    var res = document.cookie.split('; ');
    for (let i = 0; i < res.length; i++)
        if (res[i].split('=')[0] === name) return res[i].split('=')[1];
        //未找到
    return '';
}


//移除cookie 通过设置过期时间 再次打开浏览器会发现过期的cookie已经被清除
function rmCookie(name) {
    setCookie(name, '', -1);
}
```

### 二、localStorage

```
 			var storage=window.localStorage;//初始化
 			
 			//JSON.stringify(res.data) 添加对象就直接json吧
 			//var jsonObj=JSON.parse(json);
 			
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.a=1;
            //写入c字段
            storage.setItem("c",3);
            console.log(typeof storage["a"]);
            console.log(typeof storage["b"]);
            console.log(typeof storage["c"]);
            //第一种方法读取
            var a=storage.a;
            console.log(a);
            //第二种方法读取
            var b=storage["b"];
            console.log(b);
            //第三种方法读取
            var c=storage.getItem("c");
            console.log(c);
            
            storage.a=4;//增改一样
            
            storage.removeItem("a");//删除a
            storage.clear();//全部删除
```

封装的localStorage

```
const foowwLocalStorage = {
		set: function (key, value, ttl_ms) {
				var data = { value: value, expirse: new Date(ttl_ms).getTime() };
				localStorage.setItem(key, JSON.stringify(data));
		},
		get: function (key) {
				var data = JSON.parse(localStorage.getItem(key));
				if (data !== null) {
						if (data.expirse != null && data.expirse < new Date().getTime()) {
								localStorage.removeItem(key);
						} else {
								return data.value;
						}
				}
				return null;
		}
}

var date = new Date().getTime();
//设置localStorage的值
// 86400000 1天 1000 一秒
foowwLocalStorage.set("test", "你好", date + 86400000);
//获取localStorage的值
var data = foowwLocalStorage.get("test");

console.log(data)
```

## js常用语句

```
 document.getElementById("text").onblur=function () {}
 document.getElementById("text").onkeydown=function (e) {}
```

### 保留小数点后两位

```
Math.round(i.dataValue*100)/100

-- 扩展
System.out.println("绝对值：" + Math.abs(-521));

//521

System.out.println("向上取整再转double" + Math.ceil(23.991)+ Math.ceil(-23.002));

//24.00 -23.00

System.out.println("向下取整再转double" + Math.floor(23.001)+ Math.floor(-23.99));

//23.00 -24.00

System.out.println("最大值:" + Math.max(25, 52) +"最小值:"+ Math.min(12, 21));

//最大值：52 最小值：12

System.out.println("次方:" + Math.pow(5, 2));

//25

System.out.println("100-500的随机数:" +(int)(400*Math.random()+100));

System.out.println("四舍五入:" + Math.round(3.12) +"\t"+ Math.round(5.56));

//3 6

System.out.println("开方:" + (int)Math.sqrt(9));

//3
```

### 匹配字符段

```
var str = "Visit W3School";
var patt1 = new RegExp("W3School");

var result = patt1.test(str);
```

 如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。 

```
alertContent.indexOf('123')!=-1
是否包含123
包含 返回所在位置 0 1 2 3 4 5 
不包含 返回 -1
```

### 截取字符串

```
str=”jpg|bmp|gif|ico|png”; 
arr=theString.split(”|”); 
//arr是一个包含字符值”jpg”、”bmp”、”gif”、”ico”和”png”的数组 
```

```
函数：substring() 
功能：字符串截取，比如想从"MinidxSearchEngine”中得到"Minidx”就要用到substring(0,6) 
```

### 点击按钮

```
 <button onclick="copyText()">点击</button>
 
 function copyText(){
    alert("1234566");
    try {
      cordova.plugins.barcodeScanner.scan(
          function (result) {
              document.getElementsByClassName("text").in
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

```
 y.getElementById('playWind').onclick = this.twoCli()
```



### 改变文本

```
             document.getElementsByClassName("text").innerHTML=result.text;
```

​	

## 回到顶点

```
<a onclick="window.scrollTo(0,0);">top</a>

<a href="javascript:scroll(0,0);">top</a>
```

## forEach循环

```
forEach
var numbers = [4, 9, 16, 25];
numbers.forEach(myFunction(item, index) {
})
```

## 添加删除class

```
添加：节点.classList.add("类名")；

删除：节点.classList.remove("类名")；
```

## 更换class

1. 直接设置style的属性 某些情况用这个设置 !important值无效

如果属性有’-'号，就写成驼峰的形式（如textAlign） 如果想保留 - 号，就中括号的形式 element.style[‘text-align’] = ‘100px’;

```javascript
element.style.height = '100px';
```

1. 直接设置属性（只能用于某些属性，相关样式会自动识别）

```javascript
element.setAttribute('height', 100);
element.setAttribute('height', '100px');
```

1. 设置style的属性

```javascript
element.setAttribute('style', 'height: 100px !important');
```

1. 使用setProperty 如果要设置!important，推荐用这种方法设置第三个参数

```javascript
element.style.setProperty('height', '300px', 'important');
```

1. 改变class 比如JQ的更改class相关方法

因JS获取不到css的伪元素，所以可以通过改变伪元素父级的class来动态更改伪元素的样式

```javascript
element.className = 'blue';
element.className += 'blue fb';
```

1. 设置cssText

```javascript
element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';
```

1. 创建引入新的css样式文件

    **appendChild** 

   方法向节点添加最后一个子节点。 

```javascript
  function addNewStyle(newStyle) {
            var styleElement = document.getElementById('styles_js');

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = 'styles_js';
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            
            styleElement.appendChild(document.createTextNode(newStyle));
        }

        addNewStyle('.box {height: 100px !important;}');
```

1. 使用addRule、insertRule

   **addRule(selector,style,index)**

   方法向样式表插入一条规则，该方式是特定于 IE 的方法。

   | 参数     | 描述                                                         |
   | :------- | :----------------------------------------------------------- |
   | selector | 必需。规则的 CSS 选择器。                                    |
   | style    | 必需。应用于匹配该选择器的元素的样式。这个样式字符串是一个分号隔开的属性：值对的列表。并没有使用花括号开始或结束。 |
   | index    | 可选。规则数组中插入或附加规则的位置。如果这个可选参数被省略掉，则新的规则会增加到规则数组的最后。 |

    

   **insertRule**

   在样式表 `myStyle` 的顶部插入一条新规则

```javascript
// 在原有样式操作
        document.styleSheets[0].addRule('.box', 'height: 100px');
        document.styleSheets[0].insertRule('.box {height: 100px}', 0);

        // 或者插入新样式时操作
        var styleEl = document.createElement('style'),
            styleSheet = styleEl.sheet;

        styleSheet.addRule('.box', 'height: 100px');
        styleSheet.insertRule('.box {height: 100px}', 0);

        document.head.appendChild(styleEl);    
```

## 自己使用的js更换样式

 	**appendChild** 

​	方法向节点添加最后一个子节点。 

```
 	<!-- 放calss文件的 -->
      <div id="div">

      </div>
      
 		document.getElementById('div').innerHTML = `<style>.area{height:28px} </style>`
        let divs =  document.getElementById('div')
        y.body.appendChild(divs) 
```

## 随机数

```
Math.ceil(Math.random() * 3)
1 2 3
Math.floor(Math.random()*(3+1))
0 1 2 3
```

## 时间戳转string类型

```
 setTimeData(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h=h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second=date.getSeconds();
      second=second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    
    
    

```

## 往前往后推时间

```
 function getDay(day){
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
    }
```

# 事件

## 事件的绑定，与解绑

```
 let me = this;
    function houtui(){
      if (me.ImagePreview!=null) {
        me.ImagePreview.close();
        me.ImagePreview=null;
      }else if (me.show && me.show==true) {
        me.show = false;
      }else{
        document.removeEventListener('backbutton',houtui,false);
        me.$router.go(-1);
      }
    }
    document.addEventListener('backbutton',houtui,false);
```

## 手机横放监控事件

```
window.addEventListener("resize", this.renderResize, false)

methods: {
    renderResize() {
        // 判断横竖屏
        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight
        if(width > height) {
            alert('横屏')
        }
        // 做页面适配
        // 注意：renderResize 方法执行时虚拟 dom 尚未渲染挂载，如果要操作 vue 实例，最好在this.$nextTick()里进行。
    }
}
```

## 鼠标滑轮监控事件

```
    OnHuaLu(){
      //判断鼠标滚轮滚动方向
      if (window.addEventListener)//FF,火狐浏览器会识别该方法
          window.addEventListener('DOMMouseScroll', wheel, false);
      window.onmousewheel = document.onmousewheel = wheel;//W3C
      //统一处理滚轮滚动事件
      function wheel(event){
          var delta = 0;
          if (!event) event = window.event;
          if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
              delta = event.wheelDelta/120; 
              if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
          } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
              delta = -event.detail/3;
          }
          if (delta)
              handle(delta);
      }
      //上下滚动时的具体处理函数
      function handle(delta) {
      if (delta <0){//向下滚动
              // alert("向下")
          }else{//向上滚动
              // alert("向上")
              
          }
      }
    }
```

# document

## onclick点击事件

```
document.getElementById("text123").onclick=function(){
      console.log('点击图标');
    }
```

# 判断类型

### **1、typeof**

typeof 是一个操作符，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 7 种：number、boolean、symbol、string、object、undefined、function 等。

```
typeof   ''  ;  // string 有效
  typeof   1;  // number 有效
  typeof   Symbol();  // symbol 有效
  typeof   true  ;  //boolean 有效
  typeof   undefined;  //undefined 有效
  typeof   null  ;  //object 无效
  typeof   [] ;  //object 无效
  typeof   new   Function();  // function 有效
  typeof   new   Date();  //object 无效
  typeof   new   RegExp();  //object 无效
```

有些时候，typeof 操作符会返回一些令人迷惑但技术上却正确的值：

- 对于基本类型，除 null 以外，均可以返回正确的结果。
- 对于引用类型，除 function 以外，一律返回 object 类型。
- 对于 null ，返回 object 类型。
- 对于 function 返回  function 类型。

其中，null 有属于自己的数据类型 Null ， 引用类型中的 数组、日期、正则 也都有属于自己的具体类型，而 typeof 对于这些类型的处理，只返回了处于其原型链最顶端的 Object 类型，没有错，但不是我们想要的结果。