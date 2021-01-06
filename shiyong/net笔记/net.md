# 编辑逻辑

1.双击组件就会到达逻辑编辑界面

# 声明数据类型

```
 		Dim a,d As Integer 	整数
        Dim b As Single		小数
        Dim c As String		字符串
```

# 事件

## if判断

```
        If shuChu.Text = "" Then
            shuChu.Text = "null"
        【Else/ElseIf】
        	
        End If
```

## 字符串操作

### 切割

```
’第二种

        Dim a1() As String = Split("D:\项目\0913 \test.text", ".") '以.分割内容

        'a1(0)为需要获取的字符串，路径中不能存在两个点或以上

‘第三种

        Dim a2 As String = "D:\项目\0913 \test.text"

        a2 = a2.Substring(0, a2.Length - 5) '扩展名长度固定，路径中可以存在多个点

        ' a2 = a2.Substring(0, InStr(a2, ".") - 1) '不知扩展名的长度，路径中不能存在多个点
```

### 是否包含某个字符串

```
InStr(a, ".") 有为2 无为0
```

## 强转

```
int.ToString 转文本
Val(a) 转数字
```

## 操作符

```
<>
=

```

## 出现弹窗

```
 MsgBox("被除数不能为0", vbOKOnly, "提示")
 			内容        类型好像  提示框头
 			
 			
 Dim x = MsgBox("123", vbOKOnly, "张三李四")
```

## 快捷键

```
(&A) 在text里加 触发点击事件
```

