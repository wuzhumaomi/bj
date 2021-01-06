## 使用的经验

1. 权限

   ```
   
   ```

   

2. affix

   ```
     settings里的 tagsView控制用不用
     
     /**
      * @type {boolean} true | false
      * @description Whether need tagsView
      */
     tagsView: true,
     
     
   
   谁用 就加上affix: true
   
    {
       path: '/',
       component: Layout,
       // redirect: '/dashboard',
       children: [{
         path: 'dashboard',
         name: '首页',
         component: () => import('@/views/dashboard/index'),
         meta: { title: '首页', icon: 'dashboard',affix: true }
       }]
     },
   
   ```

   

# 问题

1. npm install 报错开管理员模式



# 1.上传判断文件类型以及大小

1.先说一下我遇到的问题 其中接受类型已经加了accept 但是当选择弹出本地选择文件时候切换到所有文件 之前的文件类型就本根过滤不掉了

![20190428142636657](.\img\20190428142636657.png)

```
<el-upload
                class="c-upload"
                ref="upload"
                :action="actions"
                :headers="myHeaders"
                :data="myData"
                :limit='limit'
                accept=".xls,.xlsx"》》》》》
                :on-exceed="onExceed"
                :on-change="onChange"
                :on-success="onSuccess"
                :on-error="onError"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :auto-upload="false"
            >
                <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                >选取文件</el-button>
                <div
                    slot="tip"
                    class="el-upload__tip"
                >只能上传xls/xlsx文件，且不超过一个</div>
            </el-upload>
```


解决办法：

上传之前:before-upload="beforeUpload"再次判断文件类型

```
beforeUpload(file) {
            console.log(file)
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xls'
            const extension2 = testmsg === 'xlsx'
            // const isLt2M = file.size / 1024 / 1024 < 10
            if(!extension && !extension2) {
                this.$message({
                    message: '上传文件只能是 xls、xlsx格式!',
                    type: 'warning'
                });
            }
            // if(!isLt2M) {
            //     this.$message({
            //         message: '上传文件大小不能超过 10MB!',
            //         type: 'warning'
            //     });
            // }
            // return extension || extension2 && isLt2M
            return extension || extension2
        },

```

 其中也可加文件大小限制 我没用到就注释掉了（isLt2M） 

# 2.列表

## 关于列表的树结构

```
        <!-- @row-dblclick="clickRow" 双击 
        
         row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
         default-expand-all 树结构 -->
```

# 3.当文本超出格子之后

## 1.把超出部分省略

```
:show-overflow-tooltip='true'//省略掉之后，鼠标放上去会显示
```

## 2.当鼠标放上去的时候提示

```
  <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>上左</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button>上边</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>上右</el-button>
    </el-tooltip>
```

# 4.事件的使用

## 如 right-check-change事件

```
 @right-check-change = "checkChange"
```

## 验证

```
 rules: {
        v1: [
          { required: true, message: '报错内容', trigger: 'blur' },	《《《《字符串
        ],
        v2: [
          { type: 'array', required: true, message: '报错内容', trigger: 'blur' }《《《《数组
        ]
      },
```

<el-form  :rules="rules"  :model="process"

 <el-form-item  prop="v1"

<el-transfer  v-model="process.v1"

###  清空验证结果

```
this.$refs["process"].clearValidate();全部
this.$refs["process"].clearValidate("v1");只有prop==v1的
```

### 重置表单

```
this.$refs["process"].resetFields();
```

### 自定义验证

```
 
 data() {
     var validatePass = (rule, value, callback) => {
        console.log('value',value);
        
        if (value === ""||value === undefined) {
           callback(new Error("请填写标准生产流程名"));
        } else {
          callback();
        }
      };
 return {
      // 没有输入的提示提示
      rules: {
        standardMpNm: [
         { validator: validatePass, trigger: 'blur' }
        ],
```

### 主动验证

```
<el-form ref="process"

this.$refs['process'].validate((valid) => {
           if (!valid) {
             console.log('error submit!!');
             return false;
           }
        });
```

# 5.控件

## 1.时间选择

```
 <el-date-picker
            v-model="date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="截止时间"
            value-format="yyyy-MM-dd"《《《值显示的形式
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
```



# 《《《《《《《错误》》》》》》》》

## element表格树结构不能收缩

数据绑定的key，要每一层都有而且唯一，不然会同时收缩



## table表格自适应 以及头部样式的改变

```
<el-table
 :height='height'
 :header-cell-style='{"background-color":"#409EFF!important", "color":"#fff","font-weight":"400"}'
    >

created(){
    // 高度设置
    this.height = window.innerHeight - 145 + "px";
  },
```

显示LOGO

```
setting.js >>> 里面设置是否显示
src\layout\components\Sidebar\Logo.vue 》》》修改样式
```

