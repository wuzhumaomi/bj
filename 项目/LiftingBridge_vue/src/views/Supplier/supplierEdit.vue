<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="供应商-编辑新增"  width="85%" append-to-body>
   <!--供应商-编辑新增 -->
  <div class="app-container">
    <el-form ref="edit"  :model="edit" :rules="rules" >
      <div class="editContent">
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--中心编号-->
              <!-- <el-form-item  disabled :label="$t('warehouse.cntrCd')"  prop="cntrCd" label-width="90px">
                <el-select disabled v-model="cntrList.value" :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item> -->
              <!--供应商编号-->
              <el-form-item :label="$t('supplier.supplierCdDis')" prop="supplierCdDis" label-width="90px">
                <el-input v-model="edit.supplierCdDis" clearable :placeholder="$t('placeholders.content')" maxlength="400">
                </el-input>
              </el-form-item>
              <!--供应商名称-->
              <el-form-item :label="$t('supplier.supplierNm')" prop="supplierNm" label-width="100px">
                <el-input  clearable   v-model="edit.supplierNm" :placeholder="$t('placeholders.content')"  maxlength="400"/>
              </el-form-item>
              <!--供应商种类-->
              <el-form-item :label="$t('supplier.supplierType')" prop="shortOverShipped" label-width="100px">
                <el-select v-model="edit.supplierType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in supType"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('supplier.fax')" prop="fax" label-width="90px">
                <el-input  clearable  v-model="edit.fax"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- 联系人名称 -->
              <el-form-item :label="$t('supplier.contactsNm')" prop="contactsNm" label-width="90px">
                <el-input  clearable  v-model="edit.contactsNm"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('supplier.contactsFax')" prop="contactsFax" label-width="90px">
                <el-input  clearable  v-model="edit.contactsFax"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- 资质认证 -->
              <el-form-item :label="$t('supplier.supplierQc')" prop="supplierQc" label-width="90px">
                <el-input  clearable  v-model="edit.supplierQc"  :placeholder="$t('placeholders.content')"  maxlength="400"/>
              </el-form-item>
              <!-- 地址 -->
              <el-form-item :label="$t('supplier.addr')" prop="addr" label-width="90px">
                <el-input clearable v-model="edit.addr" :placeholder="$t('placeholders.content')" style="width:260%;" maxlength="100">
                </el-input>
              </el-form-item>
              <!-- 备注 -->
              <el-form-item :label="$t('location.remarks')" prop="remarks" label-width="90px">
                <el-input clearable v-model="edit.remarks" rows="2" cols="100" type="textarea" style="width:260%;" maxlength="400">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--供应商英文名-->
              <el-form-item :label="$t('supplier.supplierNmEn')" prop="supplierNmEn" label-width="90px">
                <el-input v-model="edit.supplierNmEn" @click="checkEn()"  clearable :placeholder="$t('placeholders.content')" maxlength="400">
                </el-input>
              </el-form-item>
              <!-- 结算方式 -->
              <el-form-item :label="$t('supplier.paymentType')" prop="paymentType" label-width="90px">
                <el-select v-model="edit.paymentType"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in paymentType"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
                <!-- <el-input  clearable  v-model="edit.paymentType"  :placeholder="$t('placeholders.content')"  maxlength="200"/> -->
              </el-form-item>
              <el-form-item :label="$t('supplier.tel')" prop="tel" label-width="100px">
                <el-input  clearable  v-model="edit.tel"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item  :label="$t('supplier.zipCode')" prop="zipCode" label-width="100px">
                  <el-input  clearable  v-model="edit.zipCode"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- 联系人电话 -->
              <el-form-item :label="$t('supplier.contactsTel')" prop="contactsTel" label-width="100px">
                <el-input  clearable  v-model="edit.contactsTel"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- 联系人职位 -->
              <el-form-item :label="$t('supplier.contactsPos')" prop="contactsPos" label-width="100px">
                <el-input  clearable  v-model="edit.contactsPos"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('supplier.ownUserNm')" prop="ownUserNm" label-width="100px">
                <el-input  v-model="edit.ownUserIdNm"  clearable  disabled maxlength="200">
                  <!-- 本公司联络人 按钮-->
                  <el-button slot="append"  icon="el-icon-more" @click="personList()" type="primary"></el-button>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--供应商简称-->
              <el-form-item :label="$t('supplier.supplierJc')" prop="supplierJc" label-width="100px">
                <el-input v-model="edit.supplierJc"  clearable :placeholder="$t('placeholders.content')" maxlength="100">
                </el-input>
              </el-form-item>
              <!-- 评价等级 -->
              <el-form-item :label="$t('supplier.levelId')" prop="merchandiser" label-width="100px">
                <!-- <el-input v-model="edit.levelId"  clearable :placeholder="$t('placeholders.content')" maxlength="50">
                </el-input> -->
                <el-select v-model="edit.levelId"  :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')" >
                    <el-option v-for="item in levelId"  :key="item.id" :label="item.value" :value="item.id"/>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('supplier.email')" prop="email" label-width="100px">
                <el-input  clearable  v-model="edit.email"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- 国家编号 -->
              <el-form-item :label="$t('supplier.cntryCd')" prop="cntryCd" label-width="100px">
                <!-- <el-input  clearable  v-model="edit.cntryCd"  :placeholder="$t('placeholders.content')"  maxlength="20"/> -->
                <el-select v-model="edit.cntryCd"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in cntryCd"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('supplier.contactsMail')" prop="contactsMail" label-width="100px">
                <el-input  clearable  v-model="edit.contactsMail"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('supplier.point')" prop="point" label-width="100px" >
                <el-input :disabled="true" clearable  v-model="edit.point"  :placeholder="$t('placeholders.content')" />
              </el-form-item>
              <el-form-item :label="$t('supplier.acceptNm')" prop="acceptNm" label-width="100px">
                <el-input  clearable  v-model="edit.acceptNm"  :placeholder="$t('placeholders.content')"  maxlength="400"/>
              </el-form-item>

            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <hr> -->
      <el-card shadow="always" class="tab_border">
          <el-form-item  prop="description">
            <el-col :span="24">
              <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(1)">{{ $t('common.addAline') }}</el-button>
              <el-table
                :data="list"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                class="intervalRows">
                <!--el-table-column :label="$t('supplierDetail.supplierLineNum')" align="center" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.supplierLineNum }}</span>
                    <el-input v-model="scope.row.supplierLineNum" class="module" maxlength="4" type="text"/> 
                  </template>
                </el-table-column-->
                <!-- <el-table-column :label="$t('supplierDetail.prodNm')" align="center" width="300">
                  <template slot-scope="scope"> 
                    <el-row>
                      <el-col :span="18"><el-input v-model="scope.row.prodNm" class="module" maxlength="100" type="text"/></el-col>
                      <el-col :span="6"><el-button icon="el-icon-search" v-if="scope.$index % 2 == 0" @click="productList()" style=" background: #1890ff; color: #ffffff;border-radius: inherit;"></el-button></el-col>
                      <el-col :span="6"><el-button icon="el-icon-search" v-if="scope.$index % 2 == 1" @click="productYarnList()" style=" background: #1890ff; color: #ffffff;border-radius: inherit;"></el-button></el-col>
                    </el-row>
                  </template>
                </el-table-column> -->
                <el-table-column :label="$t('supplierDetail.prodNm')" width="300px" align="center">
                  <template slot-scope="scope">{{ scope.row.prodNm }}
                    <el-button v-if="scope.$index % 2 == 0" circle icon="el-icon-more" type="primary" style="float:right" @click="productList()" ></el-button>
                    <el-button v-if="scope.$index % 2 == 1" circle icon="el-icon-more" type="primary" style="float:right" @click="productYarnList()" ></el-button>
                  </template>
                </el-table-column>
                <!-- el-table-column :label="$t('supplierDetail.colorCd')" align="center" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.colorCd }}</span>
                    <el-input v-model="scope.row.colorCd" class="module" maxlength="100"  type="text"/> 
                  </template>
                </el-table-column -->
                <el-table-column :label="$t('supplierDetail.prodQc')" align="center" width="180">
                  <template slot-scope="scope">
                    <!-- <span>{{ scope.row.prodQc }}</span> -->
                    <el-input v-model="scope.row.prodQc" class="module" maxlength="400"  type="text"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('supplier.acceptNm')" align="center" width="180">
                  <template slot-scope="scope">
                    <!-- <span>{{ scope.row.acceptId }}</span> -->
                    <el-input v-model="scope.row.acceptId" class="module" maxlength="200"  type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('supplier.remarks')" align="center" width="180">
                  <template slot-scope="scope">
                    <!-- <span>{{ scope.row.remarks }}</span> -->
                    <el-input v-model="scope.row.remarks" class="module" type="text" maxlength="400"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('channel.operation')" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delete')" placement="bottom">
                      <el-button  type="danger" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,1)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
      </el-card>
      <!-- <el-form-item :label="$t('salesOrder.comment')" prop="description">
        <el-input type="textarea" rows="6" cols="100"></el-input>
      </el-form-item> -->
      <div class="Btnfooter" >
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
    <person_List  @func="getMsgFormSon" ref="personLists" />
    <product_list @func="getMsgFormSon" ref="productLists" />
    <productYarn_list @func="getMsgFormSon" ref="productYarnLists" />
  </div>
</el-dialog>
</template>

<script>
// import { apiProject, apiProTasks } from '@/api'
import person_List from '@/views/dialogs/TQMT_USER_P'
import product_list from '@/views/Supplier/productList'
import productYarn_list from '@/views/Supplier/productYarnList'
import {validateEN,validateDecimal,validateFax,validatezipCode,validateEmail,validatePhone} from '@/filters/validator'
export default {
  name:'productList',
  components: {
    product_list,
    productYarn_list,
    person_List,
  },
  data() {
    return {
    list: [
        {
          supplierLineNum: '001',
          prodNm: '40s/1TK+30DOP 汗布',
          colorCd: '色号1',
          prodQc: 'ISO9002',
          acceptId: '李思',
          remarks: '备注',
        },
        {
          supplierLineNum: '002',
          prodNm: '32s/1 有机棉纱 60/40 +吸湿排汗',
          colorCd: '色号2',
          prodQc: 'ISO9002',
          acceptId: '李思',
          remarks: '备注',
        },
        {
          supplierLineNum: '003',
          prodNm: '32s/1 有机棉纱 60/40 +吸湿排汗',
          colorCd: '色号3',
          prodQc: 'ISO9002',
          acceptId: '李思',
          remarks: '备注',
        }
      ],
      levelId:[
        { id: '01', value: '一星' },
        { id: '01', value: '二星' },
        { id: '01', value: '三星' },
        { id: '01', value: '四星' },
        { id: '01', value: '五星' },
      ],
      cntryCd:[
        { id: '01', value: '中国' },
        // { id: '02', value: '002' },
      ],
    edit:{
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
    cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      supplierList: [
        { id: '001', value: '供应商1' },
        { id: '002', value: '供应商2' }
      ],
      supType: [
        { id: '01', value: '纱线' },
        { id: '02', value: '染化料助剂' },
        { id: '03', value: '包装材料' },
        { id: '04', value: '五金' },
        { id: '05', value: '特殊' },
        { id: '09', value: '全类型' },
      ],
      paymentType:[
        { id: '01', value: '现结' },
        { id: '02', value: '月结' },
        { id: '03', value: '季结' },
        { id: '04', value: '半年结'},
        { id: '05', value: '年结' },
      ],
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
      salesForm:{
        orderNumber:'',
        customer:'',
        dateOrder:'',
        salesType:'',
        orderType:'',
        shippingWay:'',
        shortOverShipped1:'',
        shortOverShipped2:'',
        modifyNumberTimes:' 2次',
        modificationDate:'2018-03-08'
      },
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      dialogVisible: false,
      rules:{
        supplierNm:[{required: true,message:'供应商名称不能为空'}],
        tel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        email: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        contactsTel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        contactsMail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        supplierNmEn:[{required: false,validator: validateEN, trigger: 'blur'}],
        fax: [{ required: false, validator: validateFax, trigger: 'blur' }],
        contactsFax: [{ required: false, validator: validateFax, trigger: 'blur' }],
      }
    }
  },
  created() {

  },
  methods: {
    checkNo(value){
      console.log('ss');
      let reg = /^[1-9]\d*$/;
      if (value) {
        if (value > 999999 || new RegExp(reg).test(value) == false) {
          setTimeout(() => {
             return 0;
          }, 200);
        }
      }
    },
    checkEN(value){
      debugger
      let reg = /[a-zA-Z]+/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.edit.supplierNmEn="";
        }
      }
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

    //客户组件
    supplierEdit() {
      this.$refs.supplierEdits.open()
    },
    //客户组件
    productList() {
      //this.dialogVisible=false,
      this.$refs.productLists.open()
    },
        //客户组件
    productYarnList() {
      //this.dialogVisible=false,
      this.$refs.productYarnLists.open()
    },

    onSubmit1() {
    },
    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
    },

    // 返回
    backPoject() {
      this.dialogVisible=false
      //this.$router.push({ path: '/salesOrder'})
    },
    // 新增模块增加一行
    addRow(index) {
      if(index === 1){
        this.rowBranches(this.list);
      }else if(index === 2){
        this.rowBranches(this.tableData2);
      }else if(index === 3){
        this.rowBranches(this.tableData3);
      }else{
        console.log('error',index);
      }
    },
    rowBranches(datas) {
      if(datas.length > 4) {
          this.$message({
            message: '一次性最多可以添加五条数据',
            type: 'warning'
          })
          return false
        }
      var newValue = {
        modNm: '',
        modSm: ''
      };
      //添加新的行数
      datas.push(newValue)
    },

    customerOrder() {
      this.$refs.customerOrders.open()
    },

    // 新增模块减少一行
    reduceRow(val,number) {
      if(number === 1){
        this.list.splice(val, 1)
      }else if(number ===2){
        this.tableData2.splice(val, 1)
      }else if(number ===3){
        this.tableData3.splice(val, 1)
      }else{
        console.log('error',number);
      }
    },
    //弹出人员选择画面
    personList() {
      debugger
      let search={
        cntrCd:this.edit.cntrCd,
      }
      setTimeout(()=>{
        this.$refs.personLists.dateIs(search)
      })
    },
    //商品组件
    productList() {
      this.$refs.productLists.open()
    },
  }
}
</script>
<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px
  /* border: 0ch */
}
/* .Btnfooter{
  text-align: left;
} */
.tab_border{
  margin: 12px 10px;
}
.tab_border .el-card__body{
  height: auto;
}
.inputTextarea textarea{
  resize:none;
}
.but_bottom{
  float:right;margin-bottom:16px
}

.intervalRows{
  margin-bottom: 10px
}

</style>
