<template>
   <!-- 销售样品间剪小样 -->
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="取小样" width="85%">
  <div class="app-container">
    <el-form ref="customer"  :model="customer" :rules="rules">
      <div class="editContent">
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('common.cntrCd')" prop="cntrCd" label-width="90px">
                 <!-- <el-select disabled v-model="cntrList.value"  :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')" >
                    <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                  </el-select> -->
                  <span>{{ customer.cntrCd }}</span>
              </el-form-item>
              <el-form-item  :label="$t('salesSampleRoom.productNm')" prop="customerJc" label-width="90px">
                  <span>{{ customer.productNm }}</span>
              </el-form-item>
              <el-form-item  :label="$t('salesSampleRoom.colors')" prop="levelId" label-width="90px">
                  <span>{{ customer.colors }}</span>
              </el-form-item>
              <el-form-item  :label="$t('salesSampleRoom.NumofSamples')" prop="levelId" label-width="90px">
                  <span>{{ customer.NumofSamples }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesSampleRoom.warehouseArea')" prop="customerNm" label-width="100px">
                  <span>{{ customer.warehouseArea }}</span>
              </el-form-item>
              <el-form-item  :label="$t('salesSampleRoom.TankNo')" prop="customerType" label-width="100px">
                  <span>{{ customer.TankNo }}</span>
              </el-form-item>
              <el-form-item :label="$t('salesSampleRoom.colorNo')" prop="tel" label-width="100px">
                <span>{{ customer.colorNo }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesSampleRoom.location')" prop="customerNmEn" label-width="100px">
                  <span>{{ customer.location }}</span>
              </el-form-item>
              <el-form-item :label="$t('salesSampleRoom.tradeName')" prop="paymentType" label-width="100px">
                <span>{{ customer.tradeName }}</span>
              </el-form-item>
              <el-form-item :label="$t('salesSampleRoom.colorDont')" prop="e_mail" label-width="100px">
                <span>{{ customer.colorDont }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="Btnfooter">
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('operation.lend') }}</el-button>
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
      customer:{
          cntrCd:'上海题桥',
          warehouseArea:'仓库区域',
          location:'库位',
          tradeName:'商品名称',
          locationType:'库位类型',
          TankNo:'缸号',
          colorNo:'色号',
          colors:'色系',
          colorDont:'色别',
          productionNumber:'生产批次号',
          lendState:'借出状态',
          productNm:'品名',
      },
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      dialogVisible: false,
      rules:{
        // customerNm:[{required: true,message:'客户名称不能为空'}],
        // tel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        // e_mail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        // contactsTel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        // contactsMail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        // fax: [{ required: false, validator: validateFax, trigger: 'blur' }],
        // contactsFax: [{ required: false, validator: validateFax, trigger: 'blur' }],
        // //point: [{ required: false, validator: validateDecimal, trigger: 'blur' }],
        // customerNmEn:[{required: false,validator: validateEN, trigger: 'blur'}]
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
