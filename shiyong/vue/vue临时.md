## vue

​		**建议在原文件修改**

​				新建一个视图文件夹，放入新复制的视图

## 经验



### 		1.查找组件信息时根据这些查找

​					 label="ID"显示的文字			 prop="id" 关于数据的

​		listQuery（列表查询） 列表相关数据

```
 listQuery: {
        page: 1,//第几页
        limit: 20,//要显示多少行数据
        
        importance: undefined,
        title: undefined,           //条件
        type: undefined,

        sort: '+id'//排序
      },
```

### 		2.list是显示的列表内容，是服务器拿到的值，在response的data里

​							**接受值的方法我放下面了**

```
		getList() {
      this.listLoading = true
      // 获取列表
      // 获取列表
      // 获取列表
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        response.data.items[0].title = 'sun';
        console.log(this.list);
        this.total = response.data.total
        
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
```



## 属性

### 		表格中的属性

```vue
<el-table-column label="Author" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
</el-table-column>


align="center"	内容居中
```

### 		输入框是否必选

```js
// 输入框是否必写，remark是输入框的prop="remark"
rules: {
        type: [{ required: true, message: '必填', trigger: 'change' }],
        timestamp: [{ required: true, message: '必填', trigger: 'change' }],
        remark: [{ required: true, message: '必填', trigger: 'change' }],
        title: [{ required: true, message: '必填', trigger: 'blur' }]
      },
```

​		隐藏设置按钮

​			app.vue

```
.handle-button[data-v-1e488bfb]{
    display: none;
  }
```

​			**ps : **想设置某一部分控件时可以再主页面app.vue改

## 错误

#### 	**vue-element-admin-master 的npm run serve不能用**

​			应该用 npm run dev

#### 	使用vue方法要用this. , 属性也是

#### 运行不起来

​		npm install

## 前端请求流程

在 `vue-element-admin` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1. UI 组件交互操作；
2. 调用统一管理的 api service 请求函数；
3. 使用封装的 request.js 发送请求；
4. 获取服务端返回；
5. 更新 data；

## 上传（与后端建立连接）

element组件的上传

新的

```
//接口
import { factory } from '../../request'

export default {
    up: factory.post('/server/upload')
}


// index.js
// export { default as apiFileHandle2 } from './modules/system/fileHandle2'

// .vue
//import { apiBug, apiClass ,apiDemand ,apiProject ,apiProTasks,fileHandle,apiFileHandle2} from '@/api'

// apiFileHandle2.up(JSON.stringify(this.delFileList)).then((data)=>{
// })
```



#### 	data

```
return {
     // 上传的文件列表
    // <!-- add by sunmengxiang in 20191211 begin -->
    // listKey:0,
    // fileList: [],
    // 上传地址
    // action:"String",
    // personal: {},
    // 上传文件是否成功
    // isUpTrue: true,
```

#### 上传触发

##### 		调用接口

```js
import text02 from '@/api/modules'
```

```js
 text02.login(formData)
            .then(data => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err, 'error');
            });
```

##### 		上传接口及其方法

```
uploadImg(item) {
      // this.$message({
      //   message: '使用上传',
      //   type: 'warning'
      // });

      // let formData = new FormData()
      this.formData.append('file', item.file)
      // formData.append('type', "add")
      // formData.append('group', 'system')
      // console.log("------------------------ 上传的东西 ----------------------------");
      // console.log(formData);
      // console.log(formData.get("file"));
      // console.log("------------------------ 上传的东西 ----------------------------");
      
      // 传送文件
      // text02.login(formData)
      // .then((data) => {
      //   console.log("------------------------得到的东西----------------------------");
      //   console.log(data.file);
      //   console.log("------------------------得到的东西----------------------------");
        
      //   // console.log(data.isTrue);
      //   if (data.isTrue) {
      //     this.$message({
      //       message: '上传成功',
      //       type: 'success'
      //     });
        
      //   this.isUpTrue = true;
      //     console.log("-------------list--------------");
      //     // 向文件列表插入数值，名字，地址
      //     this.fileList.push({key:this.listKey++,name: data.file, url: data.url})
      //     console.log(this.fileList);
          
      //     console.log("-------------list--------------");
          
      //   } else {
      //     this.isUpTrue = false;
      //     this.$message.error('错了哦，'+data.err);
      //   }
      //   console.log(data.file);
      // })
      // .catch((err) => {
      //   console.log(err, 'error');
      // });

    },
```

#### 文件判断（重要）

```
// 上传时触发的
    beforeUpload(file){
            // console.log(this.fileList);
            // console.log(file)
            // 支持的文件后缀
            var type = {
                docx :'.docx',
                xlsx :'.xlsx',
            }
            // 判断大小
            const isLt2M = file.size / 1024 / 1024/ 1024 < 1
             if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 1G!',
                    type: 'warning'
                });
                this.isUpTrue = false;
                return false;
            }

            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1);
            console.log("type[testmsg] : " +testmsg + " " + type[testmsg]);
            console.log(!(type[testmsg] !=null && type[testmsg] !=""));
            
            if(!(type[testmsg] !=null && type[testmsg] !="")) {
              console.log("出现格式不对")
            
                this.$message({
                    message: '上传文件只能是 docx、xlsx格式!',
                    type: 'warning'
                });
              this.isUpTrue = false;
              return false
            }
            // console.log('结束 '+ extension && extension2);
            return true;
            // return extension || extension2
    },
```

#### 删除列表文件

```
handleRemove(file, fileList) {
      // console.log("----------删1-------------");
      // // 删除之前的列表
      // console.log(this.fileList);
      // console.log("----------删2-------------");
      // for (let [index,value] of this.fileList.entries()) {
      //   if(index==file.key){
      //     // 从下标为index的值开始删一个
      //     this.fileList.splice(index,1);
      //   }
      //   // console.log("value: "+value.name);
      //   // console.log("index: "+index);
      // }
      // console.log(this.fileList);
      // console.log("----------删3-------------");
    },
```

## 数组类型的判断

​	

```
 classFilter: (options, value) => {
    const allValue = options.reduce((acc, cur) => {
      acc[cur.code] = cur.text
      return acc
    }, {})
    // allValue[value]
    // value  0   1 2 3 4 5
    // 值    再开 s a b c d
    return allValue[value]
  },
```

## 更换后台代理

config/index.js

```
export const baseURL = process.env.NODE_ENV === 'production'
  ? '/'
  // : 'http://192.168.2.212:8080'
  : 'http://localhost:8089'

```

vue.config.js

```
proxy: {
      '': {
        target: 'http://localhost:8089',
        // target: 'http://192.168.2.212:8080',
        ws: true, //代理的WebSockets
        changeOrigin: true//是否跨域
      }
    }
```

## for

#### 	for(let [index,value] of [‘a’,‘b’,‘c’].entries())关键字.entries()

```
for(let index of [‘a’,‘b’,‘c’].keys()) //遍历数组的元素索引
for(let value of [‘a’,‘b’,‘c’].values()) //遍历数组的元素值 需polyfill兼容
for(let [index,value] of [‘a’,‘b’,‘c’].entries()) //遍历数组的index和value

```

