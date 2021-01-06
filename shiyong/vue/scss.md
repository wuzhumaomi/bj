# SCSS

安装

第一步，gitbash进入到项目目录

```
npm install node-sass --save-dev
npm install sass-loader --save-dev
```

 第二步：打开webpack.base.config.js在loaders里面加上**(不配也可以用)**

```
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }
    
```

第三步，在需要用到scss的地方写上

```
<style lang="scss">

</style>
```

##  变量引用

 你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。 

```scss
$highlight-color: #F90;
.selected {
  border: 1px solid $highlight-color;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```

```scss
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

//编译后

nav {
  width: 100px;
  color: #F90;
}
```

## `$link-color`和`$link_color`其实指向的是同一个变量 

## 嵌套功能

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

## 父选择器的标识符&

```scss
article a {
  color: blue;
  &:hover { color: red }
}
```

同时父选择器标识符还有另外一种用法，你可以在父选择器之前添加选择器。举例来说，当用户在使用IE浏览器时，你会通过`JavaScript`在``标签上添加一个ie的类名，为这种情况编写特殊的样式如下：

```scss
#content aside {
  color: red;
  body.ie & { color: green }
}
```

## 群组选择器的嵌套

```
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```

非常幸运，`sass`的嵌套特性在这种场景下也非常有用。当`sass`解开一个群组选择器规则内嵌的规则时，它会把每一个内嵌选择器的规则都正确地解出来：

```
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

首先`sass`将`.container`和`h1``.container`和`h2``.container`和`h3`分别组合，然后将三 者重新组合成一个群组选择器，生成你前边看到的普通`css`样式。对于内嵌在群组选择器内的嵌 套规则，处理方式也一样：

```
nav, aside {
  a {color: blue}
}
```

首先`sass`将`nav`和`a``aside`和`a`分别组合，然后将二者重新组合成一个群组选择器：

```
nav a, aside a {color: blue}
```

## 子组合选择器和同层组合选择器：>、+和~

 子组合选择器`> `、 同层全体组合选择器`~` 、 同层相邻组合选择器`+` 

```
article section { margin: 5px }
article > section { border: 1px solid #ccc }
```

你可以用子组合选择器>选择一个元素的**直接子元素**。上例中，第一个选择器会选择article下的所有命中section选择器的元素。第二个选择器只会选择article下紧跟着的子元素中命中section选择器的元素。

在下例中，你可以用同层相邻组合选择器`+`选择`header`元素后紧跟的`p`元素：

```
header + p { font-size: 1.1em }
```

你也可以用同层全体组合选择器`~`，选择所有跟在`article`后的同层`article`元素，不管它们之间隔了多少其他元素：

```
article ~ article { border-top: 1px dashed #ccc }
```

这些组合选择器可以毫不费力地应用到`sass`的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边：

```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

`sass`会如你所愿地将这些嵌套规则一一解开组合在一起：

```
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

## 属性嵌套

```scss
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

```scss
border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
```

```scss
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

​	**ps: border: {  中间有一个空格**

## 静默注释 

 `sass`另外提供了一种不同于`css`标准注释格式`/* ... */`的注释语法，即静默注释 

## 混合器中的CSS规则

混合器中不仅可以包含属性，也可以包含`css`规则，包含选择器和选择器中的属性，如下代码:

```
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```

当一个包含`css`规则的混合器通过`@include`包含在一个父规则中时，在混合器中的规则最终会生成父规则中的嵌套规则。举个例子，看看下边的`sass`代码，这个例子中使用了`no-bullets`这个混合器：

```
ul.plain {
  color: #444;
  @include no-bullets;
}
```

`sass`的`@include`指令会将引入混合器的那行代码替换成混合器里边的内容。

还可以**传参**

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

当混合器被`@include`时，你可以把它当作一个`css`函数来传参。如果你像下边这样写：

```scss
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

```scss
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```

## 加减

**注意事项('-' 前后需要空格！！！)**

```
min-height: calc(100vh - 84px);
```

## 整个旋转90度并填充整个屏幕

```
  position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%,-50%);
  width:100vh;
  height:100vw;

  top: calc(50vh - 50vw);
  left: calc(-50vh + 50vw);

  background: rgb(255, 255, 255);
  transform: rotate(90deg); 
```

