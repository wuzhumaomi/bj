<template>
  <!-- 生成合同一览 -->
  <div class="administrator-list project-tasks">
    <el-form ref="query" :model="query" >
      <el-row :gutter="24" style="padding:8px 12px 2px 12px">
          <el-col :span="22" >
              <el-row :span="24">
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('salesOrder.orderNumber')">
                      {{query.orderNumber}}
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('salesOrder.customer')">
                      {{query.customer}}
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('salesOrder.orderType')">
                      {{query.orderType}}
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('salesOrder.yarnFabrics')">
                      {{query.yarnFabrics}}
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('salesOrder.hue')">
                      {{query.hue}}
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="float:right" @click="goGenerateContact()">新增</el-button>
          </el-col>
      </el-row>
    </el-form>
     <hr>
    <el-table :data="list"  style="width: 100%;margin-top:20px"  class="operationCss" border="" @row-dblclick="clickRow" v-loading="listLoading">
      <!-- <el-table-column :label="$t('salesOrder.id')" show-overflow-tooltip  prop="id">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column> -->
      <el-table-column :label="$t('salesOrder.generateOrderNumber')" prop="proNm">
        <template slot-scope="scope">
          <span>{{ scope.row.generateOrderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.placeDelivery')" show-overflow-tooltip  prop="taskNm">
        <template slot-scope="scope"><span>{{ scope.row.placeDelivery }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.shippingWay')" prop="shippingWay">
        <template slot-scope="scope">
          <span>{{scope.row.shippingWay}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.numbe')" prop="numbe">
        <template slot-scope="scope">
          <span>{{scope.row.numbe}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.totalPrice')" prop="totalPrice">
        <template slot-scope="scope">
          <span>{{scope.row.totalPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesOrder.comment')" show-overflow-tooltip  prop="comment">
        <template slot-scope="scope"><span>{{ scope.row.comment }}</span></template>
      </el-table-column>
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="170">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="goGenerateContact(scope.$index, scope.row)"></el-button><!-- 编辑 -->
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

    <!-- 生成合同一览 -- 新增 + 编辑-->
    <editing_contract ref="editingContracts" />
  </div>
</template>

<script>
// import {apiProject,apiProTasks,apiClass} from '@/api'
import editing_contract from '@/views/salesDepart/components/editingContract'
export default {
  name:'',
  components: {
    editing_contract,
  },
  data() {
    return {
      input:'',
      total: 3,
      list: [
        {
          id: '12987122',
          generateOrderNumber: '001',
          placeDelivery: '上海',
          shippingWay: '物流',
          numbe:'20',
          totalPrice:'10000',
          comment: '***',
        },
        {
          id: '12987122',
          generateOrderNumber: '001',
          placeDelivery: '上海',
          shippingWay: '物流',
          numbe:'20',
          totalPrice:'10000',
          comment: '***',
        },
        {
          id: '12987122',
          generateOrderNumber: '001',
          placeDelivery: '上海',
          shippingWay: '物流',
          numbe:'20',
          totalPrice:'10000',
          comment: '***',
        }
      ],
      listLoading: false,
      dialogVisible: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        isPublish: '显示数据',
        orderType:'显示数据',
        orderNumber:'显示数据',
        customer:'显示数据',
        yarnFabrics:'显示数据',
        msgFormSon:'显示数据',
        hue: '红色',
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
    //客户组件
    customerOrder() {
      this.$refs.customerOrders.open()
      // this.varChangeColor = true;
    },
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },

    //生成合同 -- 新增+编辑
    goGenerateContact(){
      this.$refs.editingContracts.open()
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

    //删除列表
    handleDelete(index, row) {
      // console.log('删除',index,row);
      this.list.splice(index, 1);
      // this.$refs.projectCancels.open(row,this.distinguishName)
    },

    //详情跳转
    clickRow(row){
      this.$router.push({
        // path: '/createOrderChild/'+ row.id,
        path: '/generateContactChild/'+ 'xxx',
      })
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
