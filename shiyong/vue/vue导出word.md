ps：wodr文档可以导出html的文档样式

ps：编辑的时候输入框直接用element的组件就行了，如下

```
<td ... class="tbInput">  
<el-input type="text" :rows="2" placeholder="规模" class="input2" v-model="data.scale"></el-input>
<!-- {{data.scale}} -->
</td>
```

```

/* 包含input的tb标签用到的属性 */
.tbInput{
  position: relative;
}
/* 文本框，文本域  */
.input2{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding:0;
}
/* 最上面的那个没有在表格里面的输入框 */
.danWeiText{
  position: absolute;
  height: 18px;
  width: 300px;
  display: inline-block;
}
/* 文本框，文本域 */
.input2 .el-input__inner,.input2 .el-textarea__inner{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 0pt solid transparent;
  color: black;
}
/* 多选框 */
.el-checkbox{
  margin-left: 5px;
  margin-right: 0px;
}
```



# 一、下载依赖

```
-- 安装 docxtemplater
cnpm install docxtemplater pizzip  --save

-- 安装 jszip-utils
cnpm install jszip-utils --save 

-- 安装 jszip
cnpm install jszip --save

-- 安装 FileSaver
cnpm install file-saver --save

```

# 二、模板

***ps:文件资源应该放到这些地方
使用vue-cli2的时候，放在static目录下。
使用vue-cli3的时候，放在public目录下***

```
<template>
  <div>
    <!-- <button @click="exportclick(data)">点击导出文件</button> -->
  </div>
</template>

<script>
  import docxtemplater from 'docxtemplater'
  import PizZip from 'pizzip'
  import JSZipUtils from 'jszip-utils'
  import {
    saveAs
  } from 'file-saver'
  export default {
    data() {
      return {
        // 默认数据
        modr001:{remark: "《企业领导施工现场带班检查记录》",data: {
        unit_name:' ',
        project_name:' ',
        scale:' ',
        // 经理名字
        projectManager:' ',
        // 现场情况
        sceneInfo:' ',
        // 措施
        measure:' ',
        i1:false,
        i2:false,
        i3:false,
        i4:false,
        i5:false,
        i6:false,
        i7:false,
        i8:false,
        i9:false,
        i10:false,
        i11:false,
        i12:false,
        i13:false,
        i14:false,
        i15:false,
        i16:false,
        i17:false,
        i18:false,
        i19:false,
        i20:false,
        i21:false,
        i22:false,
        i23:false,
      }}
      }
    },
    methods: {
      exportclick(e) {
        let _t = this
        console.log(e)
        let docxsrc = "/CheckMode.docx"; //模板文件的位置
        let docxname = e?e.remark?e.remark:_t.modr001.remark:_t.modr001.remark; //导出文件的名字
        // 读取并获得模板文件的二进制内容
        JSZipUtils.getBinaryContent(docxsrc, function(error, content) {
          // docxsrc是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docx templater实例对象
          let doc = new docxtemplater().loadZip(zip);
          let obj = {
            ..._t.modr001.data,
            ...e?e.data?e.data:{}:{}
          }
          // 把true换成☑ false换成□
          let sz = Object.keys(obj)
          sz.forEach(value => {
            if(obj[value] == true){
              obj[value] = '☑'
            }
            if(obj[value] == false && typeof obj[value] != 'string'){
              obj[value] = '□'
            }
            console.log(obj[value]);
          });
          // debugger
          // 设置模板变量的值
          doc.setData(obj);

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties
            };
            console.log(JSON.stringify({
              error: e
            }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, docxname);
        });
      }
    }
  }
</script>

<style>
</style>

```

# 三、调用方法

ps：特殊符号直接放里面类似于搜狗的特殊符号就好了	ifTrue3:'☑',ifTrue4:'□',

```
 // 下载默认模板
    modelDownload(){
    	//输入修改的信息
      	this.$refs.ExportWord.exportclick({remark: "《企业领导施工现场带班检查记录》",data: {
        unit_name:'本单位不缺人',
        project_name:'缺人的项目',
        scale:'老大一个口子',
        //搜狗符号
        ifTrue3:true,
        ifTrue4:false,
      }})
      //导出默认模板
      this.$refs.ExportWord.exportclick()
    },
```

