<template>
  <!--弹出物流公司-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="外发工厂" :before-close="close_add_edit" width="85%" append-to-body>
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="carrier" :model="carrier" :inline="true" class="form-float" label-width="110px" label-position="right">
            <el-form-item label="物流公司编号">
               <el-input v-model="carrier.carrierCd" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="物流公司名称">
               <el-input v-model="carrier.carrierNm" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="英文名称">
               <el-input v-model="carrier.carrierNmEn" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="简称">
               <el-input v-model="carrier.carrierJc" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label="物流公司种类">
              <el-select v-model="carrier.carrierType" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in outType"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="评价等级">
              <el-select v-model="carrier.levelNm" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in levelId"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="国家">
              <el-select v-model="carrier.cntryCd" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in cntryCd"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="结算方式">
              <el-select v-model="carrier.paymentType" :placeholder="$t('personInfo.choose')" >
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
      <el-table-column :label="$t('logisticsCoManagement.carrierCd')" prop="carrierCd" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.carrierNm')" prop="carrierNm" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.list.carrierNmEn')" prop="carrierNmEn" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.list.carrierJc')" prop="carrierJc" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.list.carrierType')" prop="carrierType" align="left" width="140px" sortable>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.integral')" prop="integral" align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.levelId')" prop="levelNm" align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.carrierQc')" prop="carrierQc" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.addr')" prop="addr" align="left" width="200px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.zipCode')" prop="zipCode" align="left" width="100px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.tel')" prop="tel"  align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.fax')" prop="fax"  align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.eMail')" prop="eMail"  align="left" width="200px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.cntryCd')" prop="cntryCd" align="left" width="100px" sortable>
      </el-table-column>    
      <el-table-column :label="$t('logisticsCoManagement.contactsNm')" prop="contactsNm" align="left" width="160px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.contactsPos')" prop="contactsPos" align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.contactsTel')" prop="contactsTel" align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.contactsFax')" prop="contactsFax" align="left" width="120px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.contactsMail')" prop="contactsMail" align="left" width="150px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.paymentType')" prop="paymentType" align="left" width="100px" sortable>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.ownUserNm')" prop="ownUserNm" align="left" width="140px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.acceptNm')" prop="acceptNm" align="left" width="140px" sortable/>
      <el-table-column :label="$t('logisticsCoManagement.remarks')" prop="remarks" align="left" width="150px" sortable/>
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
      carrierType: [
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
            {id:"1",
            carrierNm: '1',
            carrierNm:'顺丰物流',
            carrierNmEn:'sfexpress',
            carrierJc:'顺丰',
            carrierType:'01',
            levelId:'四星',
            carrierQc:'ISO9002',
            integral:'50',
            addr:'上海',
            zipCode:'200000',
            tel:'021-55555555',
            fax:'021-55555666',
            eMail:'123@abc.com',
            cntryCd:'01',
            contactsNm:'峰哥',
            contactsPos:'主管',
            contactsTel:'18088888888',
            contactsFax:'18066666666',
            contactsMail:'245@aaa.com',
            paymentType:'02',
            ownUserId:'李四',
            acceptId:'张三',
            remarks:'备注',
            },
            {id:"1",
            carrierNm: '1',
            carrierNm:'圆通物流',
            carrierNmEn:'sfexpress',
            carrierJc:'圆通',
            carrierType:'01',
            levelId:'四星',
            carrierQc:'ISO9002',
            integral:'50',
            addr:'上海',
            zipCode:'200000',
            tel:'021-55555555',
            fax:'021-55555666',
            eMail:'123@abc.com',
            cntryCd:'01',
            contactsNm:'峰哥',
            contactsPos:'主管',
            contactsTel:'18088888888',
            contactsFax:'18066666666',
            contactsMail:'245@aaa.com',
            paymentType:'02',
            ownUserId:'李四',
            acceptId:'张三',
            remarks:'备注',
            },
            {id:"1",
            carrierNm: '1',
            carrierNm:'申通物流',
            carrierNmEn:'sfexpress',
            carrierJc:'申通',
            carrierType:'01',
            levelId:'四星',
            carrierQc:'ISO9002',
            integral:'50',
            addr:'上海',
            zipCode:'200000',
            tel:'021-55555555',
            fax:'021-55555666',
            eMail:'123@abc.com',
            cntryCd:'01',
            contactsNm:'峰哥',
            contactsPos:'主管',
            contactsTel:'18088888888',
            contactsFax:'18066666666',
            contactsMail:'245@aaa.com',
            paymentType:'02',
            ownUserNm:'李四',
            acceptNm:'张三',
            remarks:'备注',
            }
        ],
        listLoading: false,
        orderTypes:[],
        carrier:{
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
