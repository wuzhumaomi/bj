# VUE

## ps：标签自动读取data的数据，不需要绑定

**vue标签会有复用现象，解决方法加key（**标识**）**

# v-最好不要用 ' : ' 会没有用

key = ” 123“

key的值一样的可以复用，不复用就将值写成不一样的

```vue
 <div v-if="bool"> {{t}} </div>
 <div v-else v-on:click="bool = true"> </div>

 <text01 @click="onclickcell(0,$event)" :n="i"/>
 <text01 v-on:click="onclickcell(0,$event)" v-bin:n="i"/>

 <div v-for="item in items"  v-bind:key="item.id">
    {{ item.message }}
 </div>


```

## v-once

#### 初始化之后，内容将不会改变，不会进行编译

```vue
<div>{{i}}</div>
<div v-once>{{i}}</div>
```

## v-html

#### 可以将 ccc以HTML标签的形式编译出来

```vue
//   ccc:"<b>123</b>"
<div >{{ccc}}</div>
<div v-html="ccc"></div>
```

#### v-html使用过滤器

```html
<div  v-html="$options.filters.guo(buginfo.remark)"></div>
```



## v-pre

#### 将内容不做处理，原封不动的直接显示

```vue
 <div v-pre> {{ccc}}</div>
 // 显示为{{ccc}}
```

## v-cloak

译为：斗篷

#### 可以将未加载完vue之前将标签隐藏，当加载完成在显示出来

```vue
<div v-cloak>老王敲钟</div>
```

## v-bind

#### 动态绑定： 将这个元素节点href的特性和 Vue 实例aHerf的属性保持一致 

如给v-bind:href="aHerf"	》》》》》	给href赋予aHref的值

```vue
1.更换地址/链接-------------------------------------------------------
html >>>>>> <a v-bind:href="aHerf">跳转</a>
可以简写为 <a :href="aHerf">跳转</a>

data >>>>>> aHerf:"https://mp.csdn.net/postlist"

2.更换class----------------------------------------------------------
html >>>>>> <div class="aaa" :class="{ccc:isClass,bbb:!isClass}"></div>
		   <button @click="cli">换色</button>
			
		3. 优化
		   <div class="aaa" :class="getcla()"></div>
		   <button @click="cli">换色</button>
		   methods:{
               getcla(){
                 return {ccc:this.isClass,bbb:!this.isClass};
               },

data >>>>>> isClass:true,

methods >>>>>> 
            cli(){
            this.isClass = ! this.isClass;
            },

class >>>>>> .aaa{
            width: 60px;
            height: 50px;
            }
            .bbb{
            background-color: aqua;
            }
            .ccc{
            background-color: blue;
            }
4.<div class="aaa" :style="{color:'red',属性值:值}"></div>
```

## v-show

#### 是否显示div

```css
v-show=false; ====》display = none;
```

## v-for

最好用下    -----------------     :key 这样如果添加列表元素，可以高效的更新

不加key会报错

```
		遍历数组 index 索引
        tt:["10","12"]
		

          <div v-for="(i,index) in tt">
            {{ index+" "+i}}
          </div>
          
          <div v-for="i in tt" >
            {{i}}
          </div>
          
          遍历对象 key 属性名
           user:
          {
            user:"laoWang",
            pwd:"123",
            name:"老王"
          },
          
            <div v-for="(vue,key) in user">
            {{key+" "+vue}}
          </div>
             <div v-for="(vue,key，index) in user">
            {{key+" "+vue}}
          </div>
```

##  v-model

#### 1.双向绑定 ：其中一方发生改变另外一方也会发生改变

```
data
	name02:"02"
html
	<input type="text"  v-model="name02" />
```

2.给input设置初始默认值

​	ps：当input为多选时请，用数组接受	

3.修饰符

​	I. .lazy当加上这个修饰符时，不在会边输入边改边，只会在你敲回车，或者失去焦点时改变值

​	II. .number设置 v-model 的绑定值的属性不再为String类型，而是number类型

​			ps：input标签type为number时输入的值只能是数字

​	III. .trim 除去绑定值两边的空格

​	使用方法

```

```

## @input 	标签的值改变时触发

```
布局:<select name="buJu" v-model="buJu"  @input="inp">
							<option value="flex">flex</option>
							<option value="grid">grid</option>
							<option value="puBu">瀑布</option>
						</select>
						
methods:{
					inp(i){
						console.log(i.target.value);
					}
				}
```

#  html

## <!-- contenteditable让此元素以及涵盖的元素内容也可以修改 -->

```
<div id="result" contenteditable></div>
```

# element

当超出div长度则转换为 . . .

```
:show-overflow-tooltip="true"
```

