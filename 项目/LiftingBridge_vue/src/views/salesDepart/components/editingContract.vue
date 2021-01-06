<template>
  <!--生成合同一览的新增+编辑组件-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="新增/编辑" :before-close="close_add_edit" width="85%">
    <el-table border ref="multipleTable" :data="list" style="width: 100%" >
      <el-table-column prop="hue" :label="$t('salesOrder.hue')">
        <template slot-scope="scope">{{ scope.row.hue }}</template>
      </el-table-column>
      <el-table-column prop="generateOrderNumber" :label="$t('salesOrder.generateOrderNumber')">
         <template slot-scope="scope">{{ scope.row.generateOrderNumber }}</template>
      </el-table-column>
      <el-table-column prop="placeDelivery" :label="$t('salesOrder.placeDelivery')" show-overflow-tooltip>
         <template slot-scope="scope">{{ scope.row.placeDelivery }}</template>
      </el-table-column>
       <el-table-column prop="shippingWay" :label="$t('salesOrder.shippingWay')" >
        <template slot-scope="scope">{{ scope.row.shippingWay }}</template>
      </el-table-column>
       <el-table-column prop="numbe" :label="$t('salesOrder.numbe')">
        <template slot-scope="scope">{{ scope.row.numbe }}</template>
      </el-table-column>
       <el-table-column prop="totalPrice" :label="$t('salesOrder.totalPrice')">
        <template slot-scope="scope">{{ scope.row.totalPrice }}</template>
      </el-table-column>
       <el-table-column prop="comment" :label="$t('salesOrder.comment')">
        <template slot-scope="scope">{{ scope.row.comment }}</template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button >取 消</el-button>
      <el-button type="primary" @click="confirmSubmit()">确 定</el-button>
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
            hue: '红色',
            generateOrderNumber: '001',
            placeDelivery: '上海',
            shippingWay: '物流',
            numbe:'20',
            totalPrice:'10000',
            comment: '***',
          }, {
            hue: '红色',
            generateOrderNumber: '001',
            placeDelivery: '上海',
            shippingWay: '物流',
            numbe:'20',
            totalPrice:'10000',
            comment: '***',
          }, {
            hue: '红色',
            generateOrderNumber: '001',
            placeDelivery: '上海',
            shippingWay: '物流',
            numbe:'20',
            totalPrice:'10000',
            comment: '***',
          }, {
            hue: '红色',
            generateOrderNumber: '001',
            placeDelivery: '上海',
            shippingWay: '物流',
            numbe:'20',
            totalPrice:'10000',
            comment: '***',
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
