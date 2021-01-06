<template>
   <!-- 客户-编辑 -->
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="客户-编辑新增" width="85%">
  <div class="app-container">
    <el-form ref="customer"  :model="customer" :rules="rules">
      <div class="editContent">
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!-- <el-form-item  :label="$t('customInfo.cntrCd')" prop="cntrCd" label-width="90px">
                 <el-select disabled v-model="cntrList.value"  :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')" >
                  <el-select v-model="customer.cntrCd"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                    <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                  </el-select>
              </el-form-item> -->
              <el-form-item  :label="$t('customInfo.customerCdDis')" prop="customerCdDis" label-width="90px">
                  <el-input  clearable  v-model="customer.customerCdDis"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item  :label="$t('customInfo.detail.customerJc')" prop="customerJc" label-width="90px">
                  <el-input  clearable  v-model="customer.customerJc"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item  :label="$t('customInfo.detail.levelId')" prop="levelId" label-width="90px">
                  <!-- <el-input  clearable  v-model="customer.levelId"  :placeholder="$t('placeholders.content')"  maxlength="50"/> -->
                  <el-select v-model="customer.levelId"  :placeholder="$t('上海题桥')" >
                    <el-option v-for="item in levelId"  :key="item.id" :label="item.value" :value="item.id"/>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('customInfo.fax')" prop="fax" label-width="90px">
                <el-input  clearable  v-model="customer.fax"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.contactsNm')" prop="contactsNm" label-width="90px">
                <el-input  clearable  v-model="customer.contactsNm"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.contactsFax')" prop="contactsFax" label-width="90px">
                <el-input  clearable  v-model="customer.contactsFax"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.acceptNm')" prop="acceptNm" label-width="90px">
                <el-input  clearable  v-model="customer.acceptNm"  :placeholder="$t('placeholders.content')"  maxlength="200"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.addr')" prop="addr" label-width="80px">
                <el-input clearable v-model="customer.addr" :placeholder="$t('placeholders.content')" style="width:260%;" maxlength="400">
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('customInfo.remarks')" prop="remarks" label-width="80px">
                <el-input clearable v-model="customer.remarks" rows="2" cols="100" type="textarea" style="width:260%;" maxlength="400">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('customInfo.customerNm')" prop="customerNm" label-width="100px">
                  <el-input  clearable  v-model="customer.customerNm"  :placeholder="$t('placeholders.content')"  maxlength="400"/>
              </el-form-item>
              <el-form-item  :label="$t('customInfo.customerType')" prop="customerType" label-width="100px">
                  <el-select v-model="customer.customerType"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                    <el-option v-for="item in customerType"  :key="item.id" :label="item.value" :value="item.id"/>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('customInfo.tel')" prop="tel" label-width="100px">
                <el-input  clearable  v-model="customer.tel"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item  :label="$t('customInfo.zipCode')" prop="zipCode" label-width="100px">
                  <el-input  clearable  v-model="customer.zipCode"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.contactsTel')" prop="contactsTel" label-width="100px">
                <el-input  clearable  v-model="customer.contactsTel"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.contactsPos')" prop="contactsPos" label-width="100px">
                <el-input  clearable  v-model="customer.contactsPos"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.ownUserNm')" prop="ownUserNm" label-width="100px">
                <el-input  clearable  v-model="customer.ownUserNm"  :placeholder="$t('placeholders.content')"  maxlength="200"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('customInfo.detail.customerNmEn')" prop="customerNmEn" label-width="100px">
                  <el-input  clearable  v-model="customer.customerNmEn"  :placeholder="$t('placeholders.content')"  maxlength="400"/>
              </el-form-item>
              <el-form-item :label="$t('customInfo.point')" prop="point" label-width="100px" >
                <el-input :disabled="true" clearable  v-model="customer.point"  :placeholder="$t('placeholders.content')" />
              </el-form-item>
              <el-form-item :label="$t('customInfo.paymentType')" prop="paymentType" label-width="100px">
                <el-select v-model="customer.paymentType"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in paymentType"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item :label="$t('customInfo.paymentType')" prop="paymentType" label-width="100px">
                <el-input  clearable  v-model="customer.paymentType"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item> -->
              <el-form-item :label="$t('customInfo.e_mail')" prop="e_mail" label-width="100px">
                <el-input  clearable  v-model="customer.e_mail"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
              <!-- <el-form-item :label="$t('customInfo.cntryCd')" prop="cntryCd" label-width="100px">
                <el-input  clearable  v-model="customer.cntryCd"  :placeholder="$t('placeholders.content')"  maxlength="20"/>
              </el-form-item> -->
              <el-form-item :label="$t('customInfo.cntryCd')" prop="cntryCd" label-width="100px">
                <el-select v-model="customer.cntryCd"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in cntryCd"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('customInfo.contactsMail')" prop="contactsMail" label-width="100px">
                <el-input  clearable  v-model="customer.contactsMail"  :placeholder="$t('placeholders.content')"  maxlength="100"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="Btnfooter">
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
        <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
      </el-form-item>
      </div>
    </el-form>
    <customer_order @func="getMsgFormSon" ref="customerOrders" />
  </div>
</el-dialog>
</template>

<script>
import customer_order from '@/views/salesDepart/components/customerOrder'
import {validateEN,validateDecimal,validateFax,validatezipCode,validateEmail,validatePhone} from '@/filters/validator'

export default {
  name:'CustomeDetail',
  components: {
    customer_order,
  },
  data() {
    // 验证电话号码
    // const validatePhone = (rules, value, callback) => {
    //     const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
    //     if(value==''||value==undefined||value==null){
    //       callback();
    //     }else {
    //       if ((!reg.test(value)) && value != '') {
    //         callback(new Error('请输入正确的电话号码'));
    //       } else {
    //         callback();
    //       }
    //     }
    // }
    return {
      projectList: [],
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      customerType: [
        { id: '01', value: '最终买家' },
        { id: '02', value: '结算客户' },
        { id: '03', value: '全类型' },
      ],
      paymentType:[
        { id: '01', value: '现结' },
        { id: '02', value: '月结' },
        { id: '03', value: '季结' },
        { id: '04', value: '半年结'},
        { id: '05', value: '年结' },
      ],
      cntryCd:[
        { id: '01', value: '中国' },
      ],
      levelId:[
        { id: '01', value: '一星' },
        { id: '01', value: '二星' },
        { id: '01', value: '三星' },
        { id: '01', value: '四星' },
        { id: '01', value: '五星' },
      ],
      customer:{
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
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      dialogVisible: false,
      rules:{
        customerNm:[{required: true,message:'客户名称不能为空'}],
        tel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        e_mail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        contactsTel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        contactsMail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        fax: [{ required: false, validator: validateFax, trigger: 'blur' }],
        contactsFax: [{ required: false, validator: validateFax, trigger: 'blur' }],
        //point: [{ required: false, validator: validateDecimal, trigger: 'blur' }],
        customerNmEn:[{required: false,validator: validateEN, trigger: 'blur'}]
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
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },

    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
    },
    onSubmit1() {
      this.dialogVisible=false
    },

    // 返回
    backPoject() {
      this.dialogVisible=false
      // this.$router.push({ path: '/organizatDepartment'})
    },
    // 新增模块增加一行
    addRow(index) {
      if(index === 1){
        this.rowBranches(this.tableData1);
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


    // 新增模块减少一行
    reduceRow(val,number) {
      if(number === 1){
        this.tableData1.splice(val, 1)
      }else if(number ===2){
        this.tableData2.splice(val, 1)
      }else if(number ===3){
        this.tableData3.splice(val, 1)
      }else{
        console.log('error',number);
      }
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
.Btnfooter{
  margin-top:10px;
}
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
