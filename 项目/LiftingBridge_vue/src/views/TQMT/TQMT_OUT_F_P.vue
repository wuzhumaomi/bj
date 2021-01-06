<template>
  <!--弹出加工工厂-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="外发工厂" :before-close="close_add_edit" width="85%" append-to-body>
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="out" :model="out" :inline="true" class="form-float" label-width="110px" label-position="right">
            <el-form-item label="外发工厂编号">
               <el-input v-model="out.outFactoryCd" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="外发工厂名称">
               <el-input v-model="out.outFactoryNm" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="英文名称">
               <el-input v-model="out.outFactoryNmEn" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="简称">
               <el-input v-model="out.outFactoryJc" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="外发工厂种类">
              <el-select v-model="out.outFactoryType" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in outType"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="评价等级">
              <el-select v-model="out.levelNm" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in levelId"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="国家">
              <el-select v-model="out.cntryCd" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in cntryCd"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="结算方式">
              <el-select v-model="out.paymentType" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in paymentType"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button>
          </el-form>
          
        </el-col>
        
    </el-row>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.outFactoryCd')" prop="outFactoryCd" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryNm')" prop="outFactoryNm" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryNmEn')" prop="outFactoryNmEn" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryJc')" prop="outFactoryJc" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryType')" prop="outFactoryType" align="left" width="140px" sortable>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.integral')" prop="integral" align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.levelId')" prop="levelNm" align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.outFactoryQc')" prop="outFactoryQc" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.addr')" prop="addr" align="left" width="200px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.zipCode')" prop="zipCode" align="left" width="100px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.tel')" prop="tel"  align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.fax')" prop="fax"  align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.eMail')" prop="eMail"  align="left" width="200px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.cntryCd')" prop="cntryCd" align="left" width="100px" sortable>
      </el-table-column>    
      <el-table-column :label="$t('outFactoryManagement.contactsNm')" prop="contactsNm" align="left" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.contactsPos')" prop="contactsPos" align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.contactsTel')" prop="contactsTel" align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.contactsFax')" prop="contactsFax" align="left" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.contactsMail')" prop="contactsMail" align="left" width="150px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.paymentType')" prop="paymentType" align="left" width="100px" sortable>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.ownUserNm')" prop="ownUserNm" align="left" width="140px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.acceptNm')" prop="acceptNm" align="left" width="140px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.remarks')" prop="remarks" align="left" width="150px" sortable/>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="confirmSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { apiProTasks } from '@/api'
import moment from 'moment'

export default {
  components: {
  },
  data() {
    let validateNull = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('不能为空'));
      }else{
          callback();
      }
    };
    return {
    outType: [
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
        { id: '02', value: '日本' },
      ],
      levelId:[
        { id: '01', value: '一星' },
        { id: '02', value: '二星' },
        { id: '03', value: '三星' },
        { id: '04', value: '四星' },
        { id: '05', value: '五星' },
      ],
        typeList: [
          { id: '001', value: '粮食' },
          { id: '002', value: '日用品' }
        ],
        list:[
          {
            cntrCd:'上海提桥',
            outFactoryCd:'0001',
            outFactoryNm:'外发工厂A',
            outFactoryNmEn:'outFactoryA',
            outFactoryJc:'ofa',
            outFactoryType:'针织',
            levelId:'四星',
            outFactoryQc:'ISO9002',
            integral:'50',
            addr:'上海市普陀区xx路xx号',
            zipCode:'200000',
            tel:'021-88888888',
            fax:'021-66666666',
            eMail:'123@abc.com',
            cntryCd:'中国',
            contactsNm:'庞六',
            contactsPos:'主管',
            contactsTel:'18066666666',
            contactsFax:'18088888888',
            contactsMail:'234@aa.com',
            paymentType:'月结',
            ownUserId:'李四',
            acceptId:'张三',
            remarks:'备注',
          }, {
            cntrCd:'上海提桥',
            outFactoryCd:'0001',
            outFactoryNm:'外发工厂A',
            outFactoryNmEn:'outFactoryA',
            outFactoryJc:'ofa',
            outFactoryType:'针织',
            levelId:'四星',
            outFactoryQc:'ISO9002',
            integral:'50',
            addr:'上海市普陀区xx路xx号',
            zipCode:'200000',
            tel:'021-88888888',
            fax:'021-66666666',
            eMail:'123@abc.com',
            cntryCd:'中国',
            contactsNm:'庞六',
            contactsPos:'主管',
            contactsTel:'18066666666',
            contactsFax:'18088888888',
            contactsMail:'234@aa.com',
            paymentType:'月结',
            ownUserId:'李四',
            acceptId:'张三',
            remarks:'备注',
          }, {
            cntrCd:'上海提桥',
            outFactoryCd:'0001',
            outFactoryNm:'外发工厂A',
            outFactoryNmEn:'outFactoryA',
            outFactoryJc:'ofa',
            outFactoryType:'针织',
            levelId:'四星',
            outFactoryQc:'ISO9002',
            integral:'50',
            addr:'上海市普陀区xx路xx号',
            zipCode:'200000',
            tel:'021-88888888',
            fax:'021-66666666',
            eMail:'123@abc.com',
            cntryCd:'中国',
            contactsNm:'庞六',
            contactsPos:'主管',
            contactsTel:'18066666666',
            contactsFax:'18088888888',
            contactsMail:'234@aa.com',
            paymentType:'月结',
            ownUserId:'李四',
            acceptId:'张三',
            remarks:'备注',
          }
        ],
        listLoading: false,
        orderTypes:[],
        out:{
          prodType:'',
          orderType:'',
        },
        dialogVisible: false,
        rules: {
          startDate: [
            { required: true, message: this.$t('common.required'),  trigger: 'blur' }
          ]
        },
        multipleSelection: [],
        dataVal:[]
    };
  },
  methods:{
    //选中
    handleSelectionChange(val) {
      this.dataVal = val;
      this.multipleSelection = val;
    },
    // 保存提交
    confirmSubmit(){
       this.$emit('func',this.dataVal);
       this.dialogVisible = false;
    },

    open() {//只能开始一次。
      this.dialogVisible = true
    },

    close_add_edit(){
      this.customer={
        orderNumber:'',
        orderType:'',
      },
      this.dialogVisible = false;
    },

  }
};
</script>
<style>
</style>
