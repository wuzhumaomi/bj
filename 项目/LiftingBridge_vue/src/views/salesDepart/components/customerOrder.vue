<template>
    <!--销售订单--客户组件-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="客户" :before-close="close_add_edit" width="85%">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="customer" :model="customer" :inline="true" class="form-float">
            <el-form-item :label="$t('salesOrder.orderNumber')">
               <el-input v-model="customer.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item :label="$t('salesOrder.orderType')">
              <el-select v-model="customer.orderType" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                <el-option v-for="item in orderTypes"  :key="item.id" :label="item.proNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="客户" width="120">
      </el-table-column>
      <el-table-column prop="orderId" label="订单号" show-overflow-tooltip>
      </el-table-column>
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
        list:[
          {
            date: '2016-05-02',
            name: '王小虎',
            orderId: '00000001'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            orderId: '00000002'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            orderId: '00000003'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            orderId: '00000004'
          }
        ],
        listLoading: false,
        orderTypes:[
          {id:'00',proNm:'其他'},
          {id:'01',proNm:'预制批'},
          {id:'02',proNm:'大货'},
          {id:'03',proNm:'版单'},
          {id:'04',proNm:'加工单'},
          {id:'05',proNm:'备库'},
        ],
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
