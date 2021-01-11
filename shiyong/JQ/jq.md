## jq语法

### $.trim(str) 

返回：string； 

说明：去掉字符串首尾空格。 

### .html("Hello <b>world</b>!")

改变所有 <p> 元素的内容：

```
$("button").click(function(){  
	$("p").html("Hello <b>world</b>!"); 
});
```

html() 方法设置或返回被选元素的内容（innerHTML）。

当该方法用于**返回**内容时，则返回第一个匹配元素的内容。

当该方法用于**设置**内容时，则重写所有匹配元素的内容。