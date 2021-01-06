## 基础使用

```css
使用grid布局
	display: grid;

分配网格
    grid-template-columns: repeat(3,33.33%);
    grid-template-rows: repeat(2,60px);

间隔
    grid-gap: 80px;

网格内容往哪
    justify-items: center;
    align-items: center;

总体往哪挪
	justify-content: center;

先行后列(优先考虑哪个方向上的排列)
	grid-auto-flow: column dense;



```



### "跨越"

这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
.item-1 {
  grid-column-start: span 2;
}

### 从哪到哪

```css
上面代码指定，1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}

四个边框位置
 grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;

从竖着第一根线到第三根线结束
  grid-row: 1 / 3;=====》  grid-row: 1 / span 2;=====》  grid-row-start: 1;
  grid-row-end: 3;

.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```



### 指定在哪个区域

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

> ```css
> .container {
>   display: grid;
>   grid-template-columns: 100px 100px 100px;
>   grid-template-rows: 100px 100px 100px;
>   grid-template-areas: 'a b c'
>                        'd e f'
>                        'g h i';
> }
> ```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

> ```css
> grid-template-areas: 'a a a'
>                      'b b b'
>                      'c c c';
> ```

下面是一个布局实例。

> ```css
> grid-template-areas: "header header header"
>                      "main main sidebar"
>                      "footer footer footer";
> ```



`grid-area`属性指定项目放在哪一个区域。

> ```css
> .item-1 {
>   grid-area: e;
> }
> ```

### 在单个容器设置在单元格的位置

> ```css
> .item {
>   justify-self: start | end | center | stretch;
>   align-self: start | end | center | stretch;
> }
> ```

这两个属性都可以取下面四个值。

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

下面是`justify-self: start`的例子。

> ```css
> .item-1  {
>   justify-self: start;
> }
> ```

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

> ```css
> place-self: <align-self> <justify-self>;
> ```