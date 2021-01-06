<template>
   <!-- 组织部门-编辑新增 -->
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="组织部门-编辑新增" width="85%">
  <div class="app-container">
    <el-form ref="List"  :model="List" :rules="rules" label-width="110px" label-position="right">
      <div class="editContent">
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.cntrCd')" prop="cntrCd" >
              <el-select v-model="List.cntrCd"   clearable>
                <el-option v-for="item in cntrList"  :key="item.code" :label="item.text" :value="item.code"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.orgCdDis')" prop="orgCdDis" >
                <el-input  v-model="List.orgCdDis"  clearable maxlength="10" @change="setOrgPath"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.higherOrgCd')" prop="higherOrgNm" >
              <el-input v-model="List.higherOrgNm"   disabled clearable  maxlength="50" >
                <!-- 上位组织  按钮-->
                  <el-button slot="append" icon="el-icon-more" @click="deptSelectMenu()" id="el-input__more"/>
              </el-input >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.orgNm')" prop="orgNm" >
                <el-input v-model="List.orgNm"   clearable  maxlength="200"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.orgAbbr')" prop="orgAbbr" >
                <el-input  v-model="List.orgAbbr"  clearable  maxlength="200"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  :label="$t('organizatDepartment.orgEngNm')" prop="orgEngNm" >
                <el-input   v-model="List.orgEngNm"  clearable maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
             <el-form-item :label="$t('organizatDepartment.orgType')" prop="orgType" >
              <el-select v-model="List.orgType"   clearable >
                <el-option v-for="item in orgType"  :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.isFinancial')" prop="isFinancial" >
              <el-radio-group v-model="List.isFinancial">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.provincialCd')" prop="provincialCd" >
              <el-input  v-model="List.provincialCd"   clearable maxlength="7" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.contactNm')" prop="contactNm" >
              <el-input  v-model="List.contactNm"   clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.tel')" prop="tel" >
              <el-input  v-model="List.tel"  clearable   maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.fax')" prop="fax" >
              <el-input  v-model="List.fax"  clearable  maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span='14'>
            <el-form-item :label="$t('organizatDepartment.adrs')" prop="adrs" >
              <el-input v-model="List.adrs" clearable maxlength="100">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.email')" prop="eMail" >
              <el-input  v-model="List.eMail"   clearable  maxlength="100"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('organizatDepartment.zipCode')" prop="zipCode" >
              <el-input  v-model="List.zipCode"  clearable  maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">  
          <el-col :span='14'>
            <el-form-item :label="$t('organizatDepartment.remarks')" prop="remarks" >
              <el-input v-model="List.remarks" rows="2" type="textarea" resize="none" maxlength="200" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row :gutter="20">
          <el-col :span='14'>
            <el-form-item :label="$t('organizatDepartment.orgPath')" prop="orgPath" >
                <el-input v-model="List.orgPath"   maxlength="100" disabled clearable />
              </el-form-item>
          </el-col>
        </el-row>       
        <el-row :gutter="20">  
          <el-col :span="14">
            <el-form-item :label="$t('organizatDepartment.whCd')" prop="whCd" >
              <el-select v-model="List.whCd"   clearable >
                <el-option v-for="item in whList"  :key="item.whCdDis" :label="item.whNm" :value="item.whCdDis" maxlength="100" />
              </el-select> 
            </el-form-item>
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
import {validatePhone,validateEmail,checkNumberpoint} from '@/filters/validator'

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
      radio: '1',
      projectList: [],
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      whNm: [
        // { id: '001', value: '仓库1' },
        // { id: '002', value: '仓库2' },
        // { id: '003', value: '仓库3' }
      ],
      orgType: [
        { id: '0', value: '公司' },
        { id: '1', value: '部门' },
        { id: '2', value: '小组' },
      ],
      paymentType:[
        { id: '01', value: '现结' },
        { id: '02', value: '月结' },
        { id: '03', value: '季结' },
        { id: '04', value: '半年结'},
        { id: '05', value: '年结' },
      ],
      List:{
        orgCdDis:'0001',
        higherOrgCd:'销售部',
        orgNm:'销售组',
        orgAbbr:'销售组',
        orgEngNm:'SalesGroup',
        orgType:'小组',
        isFinancial:'否',
        provincialCd:'110109',
        contactNm:'汪芜',
        tel:'18588888888',
        fax:'865928888777',
        adrs:'北京长宁路',
        zipCode:'201716',
        email:'1213234@qq.com',
        remarks:'备注',
        orgPath:'组织部门/组织部门1',
        whCd:'',
      },
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      dialogVisible: false,
      rules:{
        higherOrgCd:[{required: true,message:'上位组织编号不能为空'}],
        orgNm:[{required: true,message:'组织部门名称不能为空'}],
        orgPath:[{required: true,message:'组织部门路径不能为空'}],
        // contactsTel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        // e_mail: [{ required: false, validator: validateEmail, trigger: 'blur' }],
        // tel: [{ required: false, validator: validatePhone, trigger: 'blur' }],
        customerNm:[{required: true,message:'客户名称不能为空'}],
        orgType:[{required: true,message:'组织类型不能为空'}],
        // customerNmEn:[{required: false,validator: validatePhone, trigger: 'blur'}]
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
