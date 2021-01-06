<template>
  <!-- 仓库界面一览 -->
  <div class="administrator-list project-tasks">
    <el-row >
        <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <!--中心编号-->
            <el-form-item :label="$t('warehouse.cntrCd')" >
               <el-select disabled v-model="query.cntrCd" :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in cntrList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <!--仓库编号-->
            <el-form-item :label="$t('warehouse.whCdDis')" >
               <el-input v-model="query.cntrCd" maxlength="10" clearable :placeholder="$t('placeholders.content')" >
               </el-input>
            </el-form-item>
            <!--仓库名称-->
            <el-form-item :label="$t('warehouse.whNm')" >
              <el-input v-model="query.whNm" maxlength="50" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <!--仓库简称-->
            <el-form-item :label="$t('warehouse.whNmJc')" >
              <el-input v-model="query.whNmJc" maxlength="50" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <!--仓库类型-->
            <el-form-item :label="$t('warehouse.whType')" >
              <el-select v-model="query.whType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in whList"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" icon="el-icon-plus" style="float:right" @click="productList()">新增</el-button>
              <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
           </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="productList()" v-loading="listLoading" border>
      <el-table-column :label="$t('warehouse.whCdDis')" show-overflow-tooltip  prop="whCdDis">
        <template slot-scope="scope">
          <span>{{ scope.row.whCdDis }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.whNm')" show-overflow-tooltip  prop="whNm">
        <template slot-scope="scope">
          <span>{{ scope.row.whNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.whNmJc')" prop="whNmDis">
        <template slot-scope="scope">
          <span>{{scope.row.whNmJc}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.whType')" prop="whType">
        <template slot-scope="scope">
          <span>{{scope.row.whType}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.place')" prop="place">
        <template slot-scope="scope">
          <span>{{scope.row.place}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.accept')" show-overflow-tooltip  prop="accept">
        <template slot-scope="scope">
          <span>{{ scope.row.accept }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('warehouse.remarks')" prop="remarks">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="100">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="productList()"></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-delete" size="mini" circle type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button><!-- 取消 -->
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
    <wh_Edit @func="getMsgFormSon" ref="whEdit" />
  </div>
</template>

<script>

// import customer_order from '../salesDepart/components/customerOrder'
import wh_Edit from '@/views/Warehouse/whEdit'
// import wh_Edit from './whEdit'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    wh_Edit,
  },
  data() {
    return {
      input:'',
      total: 3,
      list: [
        {
          id: '111111',
          cntrCd: '001',
          whCdDis: '#1',
          whNm: '筒纱毛坯仓',
          whNmJc: '筒纱毛坯仓',
          whType: '坯纱',
          place: '江苏题桥',
          accept: '张三',
          remarks: '备注'
        },
        {
          id: '222222',
          cntrCd: '002',
          whCdDis: '#2',
          whNm: '短纤毛坯纱仓',
          whNmJc: '短纤毛坯纱仓',
          whType: '坯纱',
          place: '江苏题桥',
          accept: '张三',
          remarks: '备注2'
        },
        {
          id: '333333',
          cntrCd: '003',
          whCdDis: '#3',
          whNm: '长纤毛坯纱仓',
          whNmJc: '长纤毛坯纱仓',
          whType: '坯纱',
          place: '江苏题桥',
          accept: '李思',
          remarks: '备注3'
        }
      ],
      // list:[],
      dialogVisible: false,
      cntrList: [
        { id: '001', proNm: '上海提桥' },
        { id: '002', proNm: '江苏提桥' }
      ],
      whList: [
        { id: '01', proNm: '坯纱' },
        { id: '02', proNm: '染化料助剂' },
        { id: '03', proNm: '毛坯布' },
        { id: '04', proNm: '成品' },
        { id: '05', proNm: '五金' },
        { id: '06', proNm: '样品间' },
        { id: '07', proNm: '档案室' }  
      ],
      listLoading: false,
      dialogVisible: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        // isPublish: '',
        // orderType:'',
        // salesType:'',
        // orderNumber:'',
        // customer:'',
        cntrCd:'',
        whCdDis:'',
        whNm:'',
        whType:''
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
        path: '/createOrderChild/'+ '0',
      })
    },

    // add新增+update编辑
    goCreateOrder(row) {
      if(row != undefined){
        this.$router.push({ path: '/whdetail'})
      }else{
        this.$router.push({ path: '/whdetail'})
      }

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
    //客户组件
    productList() {
      debugger
      this.$refs.whEdit.open()
      // this.varChangeColor = true;
    },

    //删除列表
    handleDelete(index, row) {
      this.list.splice(index, 1);
    },
        // 获取数据
    personList() {
      debugger
      this.listLoading = true;
      let me = this;
      apiProTasks.getMWhList({ page: me.query.page,limit: me.query.limit,cntrCd : me.query.cntrCd,whId : me.query.whCdDis,whNm : me.query.whNm,whType : me.query.whType}).then(response => {
        // console.log('获取成功',response);
        this.page = response.pages
        this.list = response.list
        this.total = response.total
        this.listLoading = false;
      }).catch((err) => {
        console.log('err...',err)
        this.listLoading = false;
      })
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
