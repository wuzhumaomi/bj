<template>
  <el-dialog  :close-on-click-modal="false" :visible.sync="dialogVisible"  :before-close="close_add_edit" width="43%">
    <!--销售订单详情--打样联系单-->
    <div id="pdfContact">
      <el-form>
        <el-row :gutter="24" >
          <el-col :span="24">
            <div style="font-weight: 800;margin-bottom: 13px;text-align: center;">
             打样联系单
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" >
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesOrder.customer')"  prop="customer">
                {{ salesForm.customer }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.hopeDelivery')" prop="hopeDelivery">
                {{ salesForm.hopeDelivery }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.ofTheGoods')" prop="ofTheGoods">
                {{ salesForm.ofTheGoods }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.operator')" prop="operator">
                {{ salesForm.operator }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.merchandiser')" prop="merchandiser">
                  {{ salesForm.merchandiser }}
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-table  border ref="multipleTable" :data="list">
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">{{ scope.row.serialNumber }}</template>
          </el-table-column>
          <el-table-column label="标样" width="120">
            <template slot-scope="scope">{{ scope.row.prototype }}</template>
          </el-table-column>
          <el-table-column label="色别" width="120">
            <template slot-scope="scope">{{ scope.row.colorNo }}</template>
          </el-table-column>
          <el-table-column label="投染数" width="120">
            <template slot-scope="scope">{{ scope.row.dyeSeveral }}</template>
          </el-table-column>
          <el-table-column label="批号" width="120">
            <template slot-scope="scope">{{ scope.row.batchNumber }}</template>
          </el-table-column>
        </el-table>
        <el-form-item :label="$t('salesOrder.comment')" prop="description">
          <el-input v-model="contactTest" type="textarea" rows="6" cols="50"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="padding: 0 20px 20px 20px;">
      <el-row :gutter="24" >
        <el-col :span="24">
            <el-button  type="primary" @click="getPdf('pdfContact','打样联系单')">导出pdf</el-button>
            <el-button >取 消</el-button>
            <el-button type="primary" @click="confirmSubmit()">确 定</el-button>
        </el-col>
      </el-row>
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
        contactTest:"",
        salesForm:{
          ofTheGoods:'xxx',
          customer:'xxx',
          contract:'xxx',
          merchandiser:'xxx',
          operator:'xxx',
          hopeDelivery:''
        },
        list:[
          {
            serialNumber: '0001',
            prototype: '标样001',
            colorNo: '色别1',
            dyeSeveral: '1',
            batchNumber: '批号1',
          }, {
            serialNumber: '0002',
            prototype: '标样002',
            colorNo: '色别2',
            dyeSeveral: '2',
            batchNumber: '批号2',
          }, {
            serialNumber: '0003',
            prototype: '标样003',
            colorNo: '色别3',
            dyeSeveral: '3',
            batchNumber: '批号3',
          }, {
            serialNumber: '0004',
            prototype: '标样004',
            colorNo: '色别4',
            dyeSeveral: '4',
            batchNumber: '批号4',
          }
        ],
        listLoading: false,
        orderTypes:[],
        customer:{
          orderNumber:'',
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
    // 保存提交
    confirmSubmit(){
      //  this.$emit('func',this.dataVal);
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
#pdfContact .el-form{
  padding: 0px 20px 0px;
}
.el-dialog__body{
  padding: 0;
}
.taskCs{
  text-align: left;
}
.cardCss .el-card__body{
  height: 100%;
}
.cardCss .treeCss .el-tree{
    max-height: 185px;
    overflow: auto;
    border-radius: 2px;
}
</style>
