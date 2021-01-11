https://segmentfault.com/a/1190000011744210

## 代码实例

```
<template>
  <div class="about">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    {{input}}{{return666()}}
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})



export default class HelloWorld extends Vue {
  msg!: string
 input: number = 1

 return666(){
   return '666666'
 }
}
</script>
```

