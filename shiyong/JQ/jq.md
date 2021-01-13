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

# ajax

## 同步

ajax 是异步的,但是在某些特殊的情况下,需要 ajax 支持同步请求,即先执行完 ajax 请求再执行下面的代码.

可以设置 

```javascript
 async: false 
```

```
$.ajax({
                            url: "/api/goods-number-is-exist?number=" + number + "&goods_id=" + goods_id,
                            type: 'get',
                            contentType: 'application/json',
                            dataType: 'text',
                            async: false, // 同步
                            success: function (result) {
                                var resObj = JSON.parse(result);
                                // console.log("ddd");
                                switch (resObj.code) {
                                    case "-1":
                                        alert(resObj.message);
                                        break;
                                    case "1":
                                        number_exist = true;
                                        break;
                                    default:
                                        break;
                                }
                            },
                            error: function (result) {
                            }
                        });
```

