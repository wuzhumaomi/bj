1.创建vue.config.js,并输入以下代码

```
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-dome-1/dist/'
      : '/'
  }
```

2.在终端输入yarn build,进行打包

3.打开Github，进行上传

​	1.上传文件

​	2.如果有问题就调整提交更改的第一个选项

​	3.地址在Settings-GitHub pages-中有网页地址，还有要选择一个下拉菜单，选第一个