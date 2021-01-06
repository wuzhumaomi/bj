<template>
    <!--供应商评价画面-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="供应商评价" :before-close="close_add_edit" width="85%">
    <el-row>
        <el-col :span="24" class="head" style="padding-bottom: 0px;">
          <!-- <el-form ref="customer" :model="customer" :inline="true" class="form-float"> -->
            <!--供应商名称-->
            <!-- <el-form-item :label="$t('supplier.supplierNm')"> -->
              <!-- <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/> -->
              <el-row>
                <el-col :span="8"><p>供应商名称: {{ query.supplierNm }}</p></el-col>
                <el-col :span="8"><p>评价等级: {{ query.point }}</p></el-col>
                <el-col :span="8"><p>积分: {{ query.levelId }}</p></el-col>
              </el-row>
              <!-- <p>Message is: {{ message }}</p> -->
            <!-- </el-form-item> -->
            <!-- 积分 -->
            <!-- <el-form-item :label="$t('customInfo.point')"> -->
              <!-- <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/> -->
              <!-- <p style="width:100px">50</p> -->
            <!-- </el-form-item> -->
            <!-- 评价等级 -->
            <!-- <el-form-item :label="$t('customInfo.levelId')"> -->
              <!-- <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/> -->
              <!-- <p style="width:100px">一级</p> -->
            <!-- </el-form-item> -->
            <!-- <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button> -->
          <!-- </el-form> -->
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border>
      <!-- 评价部门 -->
      <el-table-column :label="$t('supplierAppraise.orgNm')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.orgNm }}</template>
      </el-table-column>
      <!-- 供应商 -->
      <el-table-column :label="$t('supplierAppraise.supplierCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.supplierCd }}</template>
      </el-table-column>
      <!-- 合同编号 -->
      <el-table-column :label="$t('supplierAppraise.commonCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.commonCd }}</template>
      </el-table-column>
      <!-- 评价 -->
      <el-table-column :label="$t('supplierAppraise.appraiseLevel')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseLevel }}</template>
      </el-table-column>
      <!-- 评价原由 -->
      <el-table-column :label="$t('supplierAppraise.appraiseType')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseType }}</template>
      </el-table-column>
      <!-- 备注 -->
      <el-table-column :label="$t('supplierAppraise.remarks')" align="center" width="420">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
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
    <!-- <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close"  @click="confirmSubmit()">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="confirmSubmit()">确 定</el-button>
    </div> -->
    <div class="appraiseClose">
        <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
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
      total: 3,
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      typeList: [
        { id: '001', value: '粮食' },
        { id: '002', value: '日用品' }
      ],
      query: {
        page: 1,
        limit: 10,
        supplierNm: '供应商1',
        point:'50',
        levelId:'三星',
        // orderNumber:'',
        // customer:'',
      },
        list:[
          {
            orgNm:'部门1',
            supplierCd: '供应商1',
            appraiseType: '质量好',
            commonCd: 'SC2019090611111111',
            appraiseLevel: '好评',
            remarks: '备注',
          }, {
            orgNm:'部门2',
            supplierCd: '供应商2',
            appraiseType: '质量好',
            commonCd: 'SC2019090611111111',
            appraiseLevel: '好评',
            remarks: '备注',
          }, {
            orgNm:'评价组织部门',
            supplierCd: '供应商',
            appraiseType: '优秀',
            commonCd: 'SC2019090611111111',
            appraiseLevel: '好评',
            remarks: '备注',
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

    // 获取数据
    personList() {
      console.log('刷新');
      this.$router.go(0);
    },
    // 返回
    backPoject() {
      this.dialogVisible=false
      //this.$router.push({ path: '/whList'})
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
    open() {//只能开始一次。
      debugger
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
.head{
	padding: 10px;
	margin: 10px 0px;
}
.appraiseClose{
  margin-top:10px;
  text-align: right;
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
