<template>
  <!-- 采购计划一览 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <!-- 订单号 -->
            <el-form-item :label="$t('supplier.supplierNm')">
              <el-input v-model="query.customer" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <!-- 客户 -->
            <!-- 商品 -->
            <!-- 计划状态 -->



            <el-form-item :label="$t('supplier.supplierType')">
              <el-select v-model="supType.value" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in supType"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>  
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" icon="el-icon-plus" style="float:right" @click="supplierEdit()">{{ $t('operation.newlyAdded') }}</el-button>
              <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="supplierEdit()" v-loading="listLoading" border>
      <el-table-column :label="$t('supplier.supplierNm')" prop="supplierNm" width='100px'>
        <template slot-scope="scope">
          <span>{{ scope.row.supplierNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.supplierNmEn')" show-overflow-tooltip  prop="supplierNmEn" width='80px'>
        <template slot-scope="scope">
          <span>{{ scope.row.supplierNmEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.supplierJc')" show-overflow-tooltip  prop="supplierJc">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierJc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.supplierType')" prop="supplierType" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.supplierType}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.levelId')" prop="levelId" width='80px'>
        <template slot-scope="scope">
          <span>{{scope.row.levelId}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.point')" prop="point" >
        <template slot-scope="scope">
          <span>{{scope.row.point}}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('supplier.supplierQc')" prop="supplierQc" width='120px'>
        <template slot-scope="scope">
          <span>{{scope.row.supplierQc}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.addr')" show-overflow-tooltip  prop="addr">
        <template slot-scope="scope">
          <span>{{ scope.row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.zipCode')" prop="zipCode">
        <template slot-scope="scope">
          <span>{{scope.row.zipCode}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.tel')" prop="tel">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.fax')" prop="fax">
        <template slot-scope="scope">
          <span>{{scope.row.fax}}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('supplier.email')" prop="email" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.cntryCd')" prop="cntryCd">
        <template slot-scope="scope">
          <span>{{scope.row.cntryCd}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.contactsNm')" prop="contactsNm" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.contactsPos')" prop="conractsPos" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsPos}}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('supplier.contactsTel')" prop="contactsTel" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsTel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.contactsFax')" prop="contactsFax" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsFax}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.contactsMail')" prop="contactsMail" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.contactsMail}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.paymentType')" prop="paymentType">
        <template slot-scope="scope">
          <span>{{scope.row.paymentType}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.ownUserNm')" prop="ownUserNm" width='120px'>
        <template slot-scope="scope">
          <span>{{scope.row.ownUserNm}}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('supplier.acceptNm')" prop="acceptNm">
        <template slot-scope="scope">
          <span>{{scope.row.acceptNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier.remarks')" prop="remarks">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
       <el-table-column  fixed="right" :label="$t('channel.operation')" width="170">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="supplierEdit()"></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-delete" size="mini" circle  type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button><!-- 取消 -->
          </el-tooltip>
          <el-tooltip :content="$t('customInfo.check')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-tickets" size="mini" circle  type="primary" plain @click="customerAppraise()"></el-button><!-- 取消 -->
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

    <supplier_Edit @func="getMsgFormSon" ref="supplierEdits" />
    <customer_Appraise @func="getMsgFormSon" ref="customerAppraises" />
  </div>
</template>

<script>
import supplier_Edit from '@/views/Supplier/supplierEdit'
import customer_Appraise from '@/views/Supplier/supplierAppraise'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    supplier_Edit,
    customer_Appraise
  },
  data() {
    return {
      input:'',
      total: 3,
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      // supplierList: [
      //   { id: '001', value: '供应商1' },
      //   { id: '002', value: '供应商2' }
      // ],
      supType: [
        { id: '01', value: '纱线' },
        { id: '02', value: '染化料助剂' },
        { id: '03', value: '包装材料' },
        { id: '04', value: '五金' },
        { id: '05', value: '特殊' },
        { id: '09', value: '全类型' },
      ],
      list: [
        {
          supplierNm: '供应商名称1',
          supplierNmEn: 'supname',
          supplierJc: '简称1',
          supplierType: '纱线',
          levelId: '三星',
          point: '50',
          supplierQc: 'ISO9002',
          addr: '地址1',
          zipCode: '001',
          tel: '123124',
          fax: '24123',
          email: '2141234@120.com',
          cntryCd: '中国',
          contactsNm: '李思',
          contactsPos: '职员',
          contactsTel: '123123123123',
          contactsFax: '12312',
          contactsMail: '3413w@111',
          paymentType: '年结',
          ownUserNm: '刘时',
          acceptNm: '刘时',
          remarks: '备注1',
        },
        {
          supplierNm: '供应商名称2',
          supplierNmEn: 'supname',
          supplierJc: '简称2',
          supplierType: '纱线',
          levelId: '三星',
          point: '50',
          supplierQc: 'ISO9002',
          addr: '地址2',
          zipCode: '001',
          tel: '123124',
          fax: '31231',
          email: '213453412@120.com',
          cntryCd: '002',
          contactsNm: '刘时',
          contactsPos: '职工',
          contactsTel: '1243413543654',
          contactsFax: '1243324',
          contactsMail: '123135@1123.com',
          paymentType: '季结',
          ownUserNm: '刘无',
          acceptNm: '刘无',
          remarks: '备注2',
        },
        {
          supplierNm: '供应商名称3',
          supplierNmEn: 'supname',
          supplierJc: '简称3',
          supplierType: '包装材料',
          levelId: '三星',
          point: '60',
          supplierQc: 'ISO9002',
          addr: '地址3',
          zipCode: '001',
          tel: '123124',
          fax: '24123',
          email: '2141234@120.com',
          cntryCd: '002',
          contactsNm: '张三',
          contactsPos: '主管',
          contactsTel: '12153464575',
          contactsFax: '1423531',
          contactsMail: '1244354@163.com',
          paymentType: '现结',
          ownUserNm: '刘无',
          acceptNm: '刘无',
          remarks: '备注1',
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
        path: '/createOrderChild/'+ '0',
      })
    },

    // add新增+update编辑
    goCreateOrder(row) {
      if(row != undefined){
        this.$router.push({ path: '/createOrder/' + 0})
      }else{
        this.$router.push({ path: '/createOrder/'+ 0})
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

    //查看评价
    customerAppraise() {
      this.$refs.customerAppraises.open()
    },
    //客户组件
    supplierEdit() {
      this.$refs.supplierEdits.open()
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
