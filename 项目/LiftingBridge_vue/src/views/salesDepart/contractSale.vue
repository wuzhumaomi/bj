<template>
  <!-- 销售合同界面 -->
  <div class="administrator-list container project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <el-form-item>
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择工作日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择计划工作时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择实际工作时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="input" placeholder="请输入投入人数"></el-input>
            </el-form-item>
            <el-form-item>
             <el-input v-model="input" placeholder="请输入开动率">%</el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="value1"   placeholder="机种代码">
                <el-option v-for="item in value1" :key="item.code" :label="item.text" :value="item.code"/>
              </el-select>
            </el-form-item>
             <el-form-item>
              <el-input v-model="input" placeholder="请输入机种名称"></el-input>
            </el-form-item>
             <el-form-item>
              <el-input v-model="input" placeholder="请输入机种TS(H)"></el-input>
            </el-form-item>
             <el-form-item>
              <el-input v-model="input" placeholder="请输入计划台数"></el-input>
            </el-form-item>
             <el-form-item>
              <el-input v-model="input" placeholder="请输入起始编号"></el-input>
            </el-form-item>
            <el-button type="primary" style="float:right" >确认</el-button>
            <el-button type="primary" style="margin-right:5px;float:right" >重置</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="modelName" label="机种名称">
      </el-table-column>
      <el-table-column prop="modelTS" label="机种TS">
      </el-table-column>
      <el-table-column prop="planNumbers" label="计划台数">
      </el-table-column>
      <el-table-column prop="startingnumber" label="起始编号">
      </el-table-column>
      <el-table-column prop="terminationNumber" label="终止编号">
      </el-table-column>
      <el-table-column prop="demandBeat" label="需求节拍">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-tooltip content="删除"  effect="dark" placement="bottom">
             <el-button type="danger" size="mini" icon="el-icon-delete" plain circle @click="projectDelete(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>

export default {
  name:'',
  components: {
  },
  data() {
    return {
      value1: '',
      input:'',
      listLoading:false,
      total: 4,
      list: [{
          date: '2016-05-02',
          modelName: '******',
          modelTS: '******',
          planNumbers: '10',
          startingnumber: '*****001',
          terminationNumber: '*****010',
          demandBeat: 'xxx',
        }, {
          date: '2016-05-03',
          modelName: '******',
          modelTS: '******',
          planNumbers: '10',
          startingnumber: '*****002',
          terminationNumber: '*****010',
          demandBeat: 'xxx',
        }, {
          date: '2016-05-04',
          modelName: '******',
          modelTS: '******',
          planNumbers: '11',
          startingnumber: '*****003',
          terminationNumber: '*****010',
          demandBeat: 'xxx',
        }, {
          date: '2016-05-05',
          modelName: '******',
          modelTS: '******',
          planNumbers: '11',
          startingnumber: '*****004',
          terminationNumber: '*****010',
          demandBeat: 'xxx',
      }],
      query: {
        page: 1,
        limit: 10,
      },
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    // 获取数据
    personList() {

    },
    //分页
    handleCurrentChange(val) {
      this.query.page = val
      this.personList()
    },
    //分页
    handleSizeChange(val) {
      this.query.limit = val
      this.personList()
    },
    //删除
    projectDelete(index,row){
      console.log('row',row);
    }

  }
}
</script>

<style>
.project-tasks .el-table td div{
  z-index: 1;
}
.operationCss .active{
  background: red !important;
}
.form-float > div{
  float: left;
}
.el-dialog__body {
    padding: 0px 20px 20px;
}
.administrator-list{
    padding: 20px;
    padding-right: 30px
}
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
}
.page-title{
  color: rgb(77, 74, 74)
}
.icon-upload-box {
  float: right;
  margin-right: 20px;
  width:  100px;
  height: 100px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  margin-right: 35%
}
.plus-cls {
  font-size: 30px;
  color: #b7b7b7;
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 30px;
}
.el-card__body {
    height: 300px;
    padding: 20px;
}
img {
  width: 100%;
  height: 100%;
}

.icon-upload-boxs {
  width: 120px;
  height: 140px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0px auto;
}
.icon-upload-boxs:hover {
  border-color: #409eff;
}
.icon-upload-boxs .el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.icon-upload-boxs + .icon-tip {
  position: absolute;
  top: 55px;
  left: 140px;
  font-size: 12px;
  color: #777;
}
.icon-upload-boxs img {
  width: 100%;
  height: 100%;
}
</style>

