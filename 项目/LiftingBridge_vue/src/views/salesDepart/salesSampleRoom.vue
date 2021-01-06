<template>
  <!-- 销售样品间界面一览 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <el-form-item :label="$t('salesSampleRoom.warehouseArea')">
              <el-select v-model="query.warehouseArea" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in warehouseArea"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('salesSampleRoom.location')">
              <el-select v-model="query.location" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('salesSampleRoom.productNm')">
               <el-input v-model="msgFormSon"  clearable :placeholder="$t('placeholders.content')" >
                 <template slot="append" >
                   <el-button slot="append"  icon="el-icon-search" @click="customerOrder()" style=" background: #1890ff; color: #ffffff;border-radius: inherit;"></el-button>
                 </template>
               </el-input>
            </el-form-item>
            <el-form-item :label="$t('salesSampleRoom.locationType')">
              <el-select v-model="query.locationType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked3" size="small" :label="$t('operation.lend')" border></el-checkbox>
            </el-form-item>
             <!-- <el-button v-power="'createTask'" type="primary" style="float:right" @click="handleEdit()">{{ $t('salesSampleRoom.projectsAdd') }}</el-button> -->
            <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="lendEdit()" v-loading="listLoading">
      <!-- <el-table-column :label="$t('salesSampleRoom.id')" show-overflow-tooltip  prop="id">
        <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
      </el-table-column> -->
      <el-table-column :label="$t('salesSampleRoom.warehouseArea')" prop="warehouseArea">
        <template slot-scope="scope">
          <span>{{ scope.row.warehouseArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.location')" prop="location">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.tradeName')" show-overflow-tooltip  prop="tradeName">
        <template slot-scope="scope"><span>{{ scope.row.tradeName }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.TankNo')" prop="TankNo">
        <template slot-scope="scope">
          <span>{{scope.row.TankNo}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.colorNo')" prop="colorNo">
        <template slot-scope="scope">
          <span>{{scope.row.colorNo}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.colors')" prop="colors">
        <template slot-scope="scope">
          <span>{{scope.row.colors}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.colorDont')" show-overflow-tooltip  prop="colorDont">
        <template slot-scope="scope"><span>{{ scope.row.colorDont }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('salesSampleRoom.productionNumber')" prop="productionNumber">
        <template slot-scope="scope">
          <span>{{scope.row.productionNumber}}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('salesSampleRoom.lendState')" prop="lendState">
        <template slot-scope="scope">
          <span>{{scope.row.lendState}}</span>
        </template>
      </el-table-column>
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="140">
        <template slot-scope="scope">
          <el-tooltip :content="$t('operation.borrowed')" v-if="scope.row.borrowed == '1'" effect="dark" placement="bottom">
            <el-button icon="el-icon-s-claim" circle size="mini" type="primary"   plain ></el-button><!-- 借还 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.lend')" v-if="scope.row.lend == '1'" effect="dark" placement="bottom">
            <el-button icon="el-icon-s-open" circle size="mini" type="danger"   plain  @click="lendEdit()"></el-button><!-- 借出 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.smallKind')" v-if="scope.row.smallKind == '1'"  effect="dark" placement="bottom">
            <el-button icon="el-icon-s-order" circle size="mini" type="success" plain @click="smallKindEdit()"></el-button><!-- 剪小样 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.replenishment')" v-if="scope.row.replenishment == '1'" effect="dark" placement="bottom">
            <el-button icon="el-icon-s-goods" circle size="mini" type="info"  plain ></el-button><!-- 补货 -->
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
    <Lend @func="getMsgFormSon" ref="lends" />
    <SmallKind @func="getMsgFormSon" ref="smallKinds" />
    <!-- <project_cancel ref="projectCancels" />
    <project_complete ref="projectCompletes" /> -->
    <!-- 项目任务 -- 新增 + 编辑-->
  </div>
</template>

<script>
// import {apiProject,apiProTasks,apiClass} from '@/api'

import customer_order from '../salesDepart/components/customerOrder'
import Lend from '../salesDepart/components/salesSampleRoomLend'
import SmallKind from '../salesDepart/components/salesSampleRoomSmallKind'
// import project_cancel from '../system/components/projectCancel'
// import project_complete from '../system/components/projectComplete'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    customer_order,
    Lend,
    SmallKind
    // project_cancel,
    // project_complete,
  },
  data() {
    return {
      checked3: false,
      input:'',
      total: 3,
      warehouseArea:[
          {id:'001',proNm:'其他'},
          {id:'002',proNm:'预制批'},
          {id:'02',proNm:'大货'},
          {id:'03',proNm:'版单'},
          {id:'04',proNm:'加工单'},
          {id:'05',proNm:'备库'},
        ],
      list: [
        {
          id: '12987122',
          warehouseArea: '上海',
          location: '库位001',
          tradeName: '商品001',
          TankNo:'01缸号',
          colorNo:'色号001',
          colors: '蓝色系',
          colorDont: '显示数据',
          productionNumber: '显示数据',
          lendState:'显示数据',
          borrowed:'1',
          lend:'0',
          smallKind:'0',
          replenishment:'0',
        },
        {
          id: '12987122',
          warehouseArea: '上海',
          location: '库位001',
          tradeName: '商品001',
          TankNo:'01缸号',
          colorNo:'色号001',
          colors: '蓝色系',
          colorDont: '显示数据',
          productionNumber: '显示数据',
          lendState:'显示数据',
          borrowed:'0',
          lend:'1',
          smallKind:'0',
          replenishment:'0',
        },
        {
          id: '12987122',
          warehouseArea: '上海',
          location: '库位001',
          tradeName: '商品001',
          TankNo:'01缸号',
          colorNo:'色号001',
          colors: '蓝色系',
          colorDont: '显示数据',
          productionNumber: '显示数据',
          lendState:'显示数据',
          borrowed:'0',
          lend:'0',
          smallKind:'1',
          replenishment:'1',
        }
      ],
      listLoading: false,
      dialogVisible: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        isPublish: '',
        warehouseArea:'',
        location:'',
        tradeName:'',
        locationType:''
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

    //借出弹框
    lendEdit() {
      this.$refs.lends.open()
    },
    //取小样弹框
    smallKindEdit() {
      this.$refs.smallKinds.open()
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
