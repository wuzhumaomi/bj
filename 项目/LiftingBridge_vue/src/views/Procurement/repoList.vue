<template>
  <!-- 仓库界面一览 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <!--中心编号-->
            <el-form-item :label="$t('repoList.CNTR_CD')">
               <el-select v-model="query.orderType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <!--仓库编号-->
            <el-form-item :label="$t('repoList.WH_CD_DIS')">
               <el-input v-model="msgFormSon"  clearable :placeholder="$t('placeholders.content')" >
               </el-input>
            </el-form-item>
            <!--仓库名称-->
            <el-form-item :label="$t('repoList.WH_NM')">
              <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <!--仓库类型-->
            <el-form-item :label="$t('repoList.WH_TYPE')">
              <el-select v-model="query.salesType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-plus" style="float:right" @click="goCreateOrder()">新增</el-button>
            <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="clickRow" v-loading="listLoading">
      <el-table-column :label="$t('repoList.CNTR_CD')" prop="CNTR_CD">
        <template slot-scope="scope">
          <span>{{ scope.row.CNTR_CD }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.WH_CD_DIS')" show-overflow-tooltip  prop="WH_CD_DIS">
        <template slot-scope="scope">
          <span>{{ scope.row.WH_CD_DIS }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.WH_NM')" show-overflow-tooltip  prop="WH_NM">
        <template slot-scope="scope">
          <span>{{ scope.row.WH_NM }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.WH_NM_DIS')" prop="WH_NM_DIS">
        <template slot-scope="scope">
          <span>{{scope.row.WH_NM_DIS}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.WH_TYPE')" prop="WH_TYPE">
        <template slot-scope="scope">
          <span>{{scope.row.WH_TYPE}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.PLACE')" prop="PLACE">
        <template slot-scope="scope">
          <span>{{scope.row.PLACE}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.ACCEPT_ID')" show-overflow-tooltip  prop="ACCEPT_ID">
        <template slot-scope="scope">
          <span>{{ scope.row.ACCEPT_ID }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('repoList.REMARKS')" prop="REMARKS">
        <template slot-scope="scope">
          <span>{{scope.row.REMARKS}}</span>
        </template>
      </el-table-column>
       <el-table-column  fixed="right" :label="$t('channel.operation')" width="170">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="goCreateOrder(scope.$index, scope.row)"></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-close" size="mini" circle  type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button><!-- 取消 -->
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

    <customer_order @func="getMsgFormSon" ref="customerOrders" />
  </div>
</template>

<script>

import customer_order from '../salesDepart/components/customerOrder'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    customer_order,
  },
  data() {
    return {
      input:'',
      total: 3,
      list: [
        {
          ID: '111111',
          CNTR_CD: '001',
          WH_CD_DIS: 'repo001',
          WH_NM: '仓库1',
          WH_NM_DIS: '仓库1',
          WH_TYPE: '坯纱',
          PLACE: '总部',
          ACCEPT_ID: '10001',
          REMARKS: '备注'
        },
        {
          ID: '222222',
          CNTR_CD: '002',
          WH_CD_DIS: 'repo002',
          WH_NM: '仓库2',
          WH_NM_DIS: '仓库2',
          WH_TYPE: '染化料助剂',
          PLACE: '总部',
          ACCEPT_ID: '10002',
          REMARKS: '备注2'
        },
        {
          ID: '333333',
          CNTR_CD: '003',
          WH_CD_DIS: 'repo003',
          WH_NM: '仓库3',
          WH_NM_DIS: '仓库3',
          WH_TYPE: '坯纱',
          PLACE: '毛坯布',
          ACCEPT_ID: '10003',
          REMARKS: '备注3'
        }
      ],
      listLoading: false,
      dialogVisible: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        isPublish: '',
        orderType:'',
        salesType:'',
        orderNumber:'',
        customer:'',
      },
      projectList: [],
      priority: [],
      msgFormSon:'',
    }
  },
  created() {
    // this.personList()
  },
  computed: {
  },
  methods: {
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },
    //详情跳转
    clickRow(row){
      this.$router.push({
        // path: '/createOrderChild/'+ row.id,
        path: '/createOrderChild/'+ 'xxx',
      })
    },


    // 获取数据
    personList() {
      console.log('刷新');
      this.$router.go(0);
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

    //客户组件
    customerOrder() {
      this.$refs.customerOrders.open()
    },

    //删除列表
    handleDelete(index, row) {
      this.list.splice(index, 1);
    },
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
