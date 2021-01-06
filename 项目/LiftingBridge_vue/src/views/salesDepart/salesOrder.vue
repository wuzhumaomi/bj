<template>
  <!-- 销售订单界面一览 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <el-form-item :label="$t('salesOrder.orderNumber')">
               <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item :label="$t('salesOrder.customer')">
               <el-input v-model="msgFormSon"  clearable :placeholder="$t('placeholders.content')" >
                 <template slot="append" >
                   <el-button slot="append"  icon="el-icon-search" @click="customerOrder()" style=" background: #1890ff; color: #ffffff;border-radius: inherit;"></el-button>
                 </template>
               </el-input>
            </el-form-item>
            <el-form-item :label="$t('salesOrder.orderType')">
              <el-select v-model="query.orderType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in orderTypes"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('salesOrder.salesType')">
              <el-select v-model="query.salesType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in salesTypes"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right">
            <!-- <el-button v-power="'createTask'" type="primary" style="float:right" @click="handleEdit()">{{ $t('salesOrder.projectsAdd') }}</el-button> -->
              <el-button type="primary" icon="el-icon-plus" style="float:right" @click="goCreateOrder()">新增</el-button>
              <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="clickRow" v-loading="listLoading">
      <!-- <el-table-column :label="$t('salesOrder.id')" show-overflow-tooltip  prop="id">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column> -->
      <el-table-column :label="$t('salesOrder.orderNumber')" prop="priorityLevel">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.customer')" prop="proNm">
        <template slot-scope="scope">
          <span>{{ scope.row.customer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.orderType')" show-overflow-tooltip  prop="taskNm">
        <template slot-scope="scope"><span>{{ scope.row.orderType }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.salesType')" show-overflow-tooltip  prop="taskNm">
        <template slot-scope="scope"><span>{{ scope.row.salesType }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.dateOrder')" prop="dateOrder">
        <template slot-scope="scope">
          <span>{{scope.row.dateOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.deliveryDate')" prop="deliveryDate">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryDate}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.shippingWay')" prop="shippingWay">
        <template slot-scope="scope">
          <span>{{scope.row.shippingWay}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.sheetProofingGenerated')" show-overflow-tooltip  prop="sheetProofingGenerated" width="150">
        <template slot-scope="scope"><span>{{ scope.row.sheetProofingGenerated }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.generatedContract')" prop="generatedContract">
        <template slot-scope="scope">
          <span>{{scope.row.generatedContract}}</span>
        </template>
      </el-table-column>
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="170">
        <template slot-scope="scope">
          <!-- <el-tooltip v-power="'edit'" :content="$t('operation.edit')" placement="bottom"> -->
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="goCreateOrder(scope.$index, scope.row)"></el-button><!-- 编辑 -->
          </el-tooltip>
          <!-- <el-tooltip v-power="'cancel'" :content="$t('operation.cancel')"  effect="dark" placement="bottom"> -->
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
    <!-- <project_cancel ref="projectCancels" />
    <project_complete ref="projectCompletes" /> -->
    <!-- 项目任务 -- 新增 + 编辑-->
  </div>
</template>

<script>
// import {apiProject,apiProTasks,apiClass} from '@/api'

import customer_order from '../salesDepart/components/customerOrder'
// import project_cancel from '../system/components/projectCancel'
// import project_complete from '../system/components/projectComplete'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    customer_order,
    // project_cancel,
    // project_complete,
  },
  data() {
    return {
      input:'',
      total: 3,
      orderTypes:[
          {id:'00',proNm:'其他'},
          {id:'01',proNm:'预制批'},
          {id:'02',proNm:'大货'},
          {id:'03',proNm:'版单'},
          {id:'04',proNm:'加工单'},
          {id:'05',proNm:'备库'},
        ],
      salesTypes:[
          {id:'00',proNm:'长纤面料'},
          {id:'01',proNm:'短纤面料'},
          {id:'02',proNm:'纱线'},
        ],
      list: [
        {
          id: '12987122',
          orderNumber: '00000001',
          customer: '客户1',
          orderType: '加工单',
          salesType: '长纤面料',
          sheetProofingGenerated:'打样001',
          generatedContract:'合同1',
          dateOrder: '2019-08-01',
          deliveryDate: '2019-08-01',
          shippingWay: '陆运',
        },
        {
          id: '12987122',
          orderNumber: '00000002',
          customer: '客户2',
          orderType: '版单',
          salesType: '短纤面料',
          sheetProofingGenerated:'打样002',
          generatedContract:'合同2',
          dateOrder: '2019-08-01',
          deliveryDate: '2019-08-01',
          shippingWay: '陆运',
        },
        {
          id: '12987122',
          orderNumber: '00000003',
          customer: '客户3',
          orderType: '备库',
          salesType: '纱线',
          sheetProofingGenerated:'打样003',
          generatedContract:'合同3',
          dateOrder: '2019-08-01',
          deliveryDate: '2019-08-01',
          shippingWay: '陆运',
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
    // add新增+update编辑
    goCreateOrder(row) {
      if(row != undefined){
        this.$router.push({ path: '/createOrder/' + 1})
      }else{
        this.$router.push({ path: '/createOrder/'+ 0})
      }

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
      // this.listLoading = true;
      // let me = this;
      // apiProTasks.getTasksList({ page: me.query.page,limit: me.query.limit,proId : me.query.isPublish}).then(response => {
      //   // console.log('获取成功',response);
      //   this.page = response.pages
      //   this.list = response.list
      //   this.total = response.total
      //   this.listLoading = false;
      // }).catch((err) => {
      //   console.log('err...',err)
      //   this.listLoading = false;
      // })
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
      // this.varChangeColor = true;
    },

    //删除列表
    handleDelete(index, row) {
      // console.log('删除',index,row);
      this.list.splice(index, 1);
      // this.$refs.projectCancels.open(row,this.distinguishName)
    },

    //关闭
    // close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
    //   this.dialogVisible = false
    //   // this.$refs.tasksAddEdits.empty();
    // },

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
