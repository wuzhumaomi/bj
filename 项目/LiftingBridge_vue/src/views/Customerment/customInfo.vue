<template>
  <!-- 客户界面一览 -->
  <div class="administrator-list project-tasks">
    <el-form ref="query" :model="query" :inline="true" label-width="100px" label-position="right">
      <div class="queryContent">
        <!-- <el-form-item :label="$t('customInfo.cntrCd')">
           <el-select disabled v-model="query.cntrCd"  @change="getAllProjects(MyData.proId,'change')">
            <el-option v-for="item in cntrList"  :key="item.id" :label="item.cntrNm" :value="item.id"/>
          </el-select>
        </el-form-item> -->
        <!--客户表示用编号-->
        <el-form-item :label="$t('customInfo.customerCdDis')" class="form-item">
           <el-input v-model="query.customerCdDis"  clearable>
           </el-input>
        </el-form-item>
        <el-form-item :label="$t('customInfo.customerNm')" class="form-item">
           <el-input v-model="query.customerNm"  clearable/>
        </el-form-item>
        <el-form-item :label="$t('customInfo.customerJc')" class="form-item">
           <el-input v-model="query.customerJc"  clearable/>
        </el-form-item>
        <el-form-item :label="$t('customInfo.customerNmEn')" class="form-item">
           <el-input v-model="query.customerNmEn"  clearable/>
        </el-form-item>
        <el-form-item :label="$t('customInfo.customerType')" class="form-item">
          <el-select v-model="query.customerType"  clearable>
            <el-option v-for="item in customerType"  :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('customInfo.levelId')" class="form-item">
          <el-select v-model="query.levelId"  clearable>
            <el-option v-for="item in levelId"  :key="item.id" :label="item.levelNm" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('customInfo.cntryCd')" class="form-item">
          <el-select v-model="query.cntryCd"  clearable>
            <el-option v-for="item in cntryCd"  :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('customInfo.paymentType')" class="form-item" prop="paymentType">
          <el-select v-model="query.paymentType"   clearable>
              <el-option v-for="item in paymentType"  :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
            </el-select>
          </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="personList">{{ $t('operation.query') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addOrder()">{{ $t('operation.newlyAdded') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="customerEdit()" v-loading="listLoading" border>
      <el-table-column :label="$t('customInfo.customerCdDis')" prop="priorityLevel">
        <template slot-scope="scope">
          <span>{{ scope.row.customerCdDis }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.customerNm')" prop="priorityLevel">
        <template slot-scope="scope">
          <span>{{ scope.row.customerNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.customerNmEn')" width="120" prop="customerNmEn">
        <template slot-scope="scope">
          <span>{{ scope.row.customerNmEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.customerJc')" show-overflow-tooltip  prop="customerJc">
        <template slot-scope="scope"><span>{{ scope.row.customerJc }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.customerType')" show-overflow-tooltip  prop="customerType">
        <template slot-scope="scope"><span>{{ scope.row.customerType }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.levelId')" prop="levelId">
        <template slot-scope="scope">
          <span>{{scope.row.levelId}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('customInfo.point')" prop="point">
        <template slot-scope="scope">
          <span>{{scope.row.point}}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('customInfo.addr')" prop="deliveryDate">
        <template slot-scope="scope">
          <span>{{scope.row.addr}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.zipCode')" prop="shippingWay" >
        <template slot-scope="scope">
          <span>{{scope.row.zipCode}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.tel')" show-overflow-tooltip width="130px" prop="sheetProofingGenerated">
        <template slot-scope="scope"><span>{{ scope.row.tel }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.fax')" prop="fax" width="90px">
        <template slot-scope="scope">
          <span>{{scope.row.fax}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.e_mail')" prop="e_mail" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.e_mail}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.cntryCd')" prop="cntryCd">
        <template slot-scope="scope">
          <span>{{scope.row.cntryCd}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.contactsNm')" prop="contactsNm" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.contactsPos')" prop="contactsPos" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsPos}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.contactsTel')" prop="contactsTel" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsTel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.contactsFax')" prop="contactsFax" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsFax}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.contactsMail')" prop="contactsMail" width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsMail}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.paymentType')" prop="paymentType">
        <template slot-scope="scope">
          <span>{{scope.row.paymentType}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.ownUserNm')" prop="ownUserNm" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.ownUserNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.acceptNm')" prop="acceptNm">
        <template slot-scope="scope">
          <span>{{scope.row.acceptNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customInfo.remarks')" prop="remarks">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="130">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="customerEdit()"></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-delete" size="mini" circle  type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button><!-- 取消 -->
          </el-tooltip>
          <!-- 取消 -->
          <!-- <el-tooltip :content="$t('customInfo.check')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-tickets" size="mini" circle  type="primary" plain @click="customerAppraise()"></el-button>
          </el-tooltip> -->
            <!-- <el-button size="mini" circle  type="primary" round @click="customerAppraise()">查看评价</el-button>查看 -->
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
    <customer_Edit @func="getMsgFormSon" ref="customerEdits" />
    <customer_Appraise @func="getMsgFormSon" ref="customerAppraises" />
  </div>
</template>

<script>
import customer_Edit from '@/views/Customerment/customeDetail'
import customer_Appraise from '@/views/Customerment/customerAppraise'
import { debug, debuglog } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    customer_Edit,
    customer_Appraise
  },
  data() {
    return {
      input:'',
      total: 3,
      list: [
        {
          customerCdDis:'CU000001',
          customerNm:'客户1',
          customerNmEn:'san',
          customerJc:'客户1',
          customerType:'最终买家',
          levelId:'三星',
          point:'50',
          addr:'浦东新区',
          zipCode:'201703',
          tel:'123341564545',
          fax:'13153534',
          e_mail:'1231243@163.com',
          cntryCd:'中国',
          contactsNm:'张三',
          contactsPos:'主管',
          contactsTel:'12364634786',
          contactsFax:'3123315',
          contactsMail:'123123443@163.com',
          paymentType:'现结',
          ownUserNm:'李思',
          acceptNm:'李思',
          remarks:'备注',
        },
        {
          customerCdDis:'CU000002',
          customerNm:'客户2',
          customerNmEn:'hui',
          customerJc:'客户2',
          customerType:'结算客户',
          levelId:'三星',
          point:'56',
          addr:'江苏',
          zipCode:'201703',
          tel:'123341564545',
          fax:'13153534',
          e_mail:'1231243@163.com',
          cntryCd:'中国',
          contactsNm:'李柳',
          contactsPos:'主管',
          contactsTel:'12364634786',
          contactsFax:'3123315',
          contactsMail:'123123443@163.com',
          paymentType:'季结',
          ownUserNm:'李柳',
          acceptNm:'李柳',
          remarks:'备注',
        },
        {
          customerCdDis:'CU000003',
          customerNm:'客户3',
          customerNmEn:'san',
          customerJc:'客户3',
          customerType:'结算客户',
          levelId:'四星',
          point:'65',
          addr:'浦东新区',
          zipCode:'201703',
          tel:'123341564545',
          fax:'13153534',
          e_mail:'1231243@163.com',
          cntryCd:'中国',
          contactsNm:'张三',
          contactsPos:'主管',
          contactsTel:'12364634786',
          contactsFax:'3123315',
          contactsMail:'123123443@163.com',
          paymentType:'年结',
          ownUserNm:'李思',
          acceptNm:'李思',
          remarks:'备注',
        }
      ],
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      comList: [
        { id: '01', value: '最终买家' },
        { id: '02', value: '结算客户' },
        { id: '09', value: '全类型' }
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
      debugger
      if(row != undefined){
        this.$router.push({ path: 'customeDetail/' + 1})
      }else{
        this.$router.push({ path: 'customeDetail/'+ 0})
      }

    },

    //详情跳转
    clickRow(row){
      this.$router.push({
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
    customerEdit() {
      this.$refs.customerEdits.open()
    },

    //查看评价
    customerAppraise() {
      this.$refs.customerAppraises.open()
    },
    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
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
