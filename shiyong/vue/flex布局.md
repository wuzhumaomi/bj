开始

```
 display: flex; /* or inline-flex */
 
 flex-direction: row | row-reverse | column | column-reverse;
 
 justify-content: flex-start | flex-end | center | space-between | space-around;
```

## 是否允许子元素这行排列

通过设置flex-wrap来决定是否允许子元素这行排列。

```text
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap: 不折行，默认值，所有的子元素会排在一行。
- wrap: 折行，子元素会从上到下根据需求折成多行。
- wrap-reverse: 从下向上折行，子元素会从下岛上根据需求折成多行。

## 主轴方向的对齐方式

justify-content属性定义了子元素沿主轴方向的对齐方式，用来当子元素大小最大的时候，分配主轴上的剩余空间。也可以当子元素超出主轴的时候用来控制子元素的对齐方式。

- flex-start: 默认值，朝主轴开始的方向对齐。
- flex-end: 朝主轴结束的方向对齐。
- center: 沿主轴方向居中。
- space-between: 沿主轴两端对齐，第一个子元素在主轴起点，最后一个子元素在主轴终点。
- space-around: 沿主轴子元素之间均匀分布。要注意的是子元素看起来间隙是不均匀的，第一个子元素和最后一个子元素离父元素的边缘有一个单位的间隙，但两个子元素之间有两个单位的间隙，因为每个子元素的两侧都有一个单位的间隙。

```text
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

## 交叉轴方向的对齐方向

align-items定义了子元素在交叉轴方向的对齐方向，这是在每个子元素仍然在其原来所在行的基础上所说的。可以看作是交叉轴上的justify-content属性;



```text
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start: 按照交叉轴的起点对齐。
- flex-end: 按照交叉轴的终点对齐。
- center: 沿交叉轴方向居中。
- baseline: 按照项目的第一行文字的基线对齐。
- stretch: 默认值，在满足子项目所设置的min-height、max-height、height的情况下拉伸子元素使之填充整个父元素。

## 排列顺序

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
.item {
  order: <integer>;
}
```

## flex-grow属性（比重）

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](https://www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## flex-basis属性（优先级高于宽）

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。