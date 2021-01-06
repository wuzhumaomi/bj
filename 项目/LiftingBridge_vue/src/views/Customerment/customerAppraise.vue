<template>
    <!--客户评价画面-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="客户评价" :before-close="close_add_edit" width="85%">
    <el-row>
        <el-col :span="24" class="head" style="padding-bottom: 0px;">
           <!-- <el-form ref="customer" :model="customer" :inline="true" class="form-float"> -->
            <!--客户名称-->
            <!-- <el-form-item :label="$t('customInfo.customerNm')">
              <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item> -->
            <!-- 积分 -->
            <!-- <el-form-item :label="$t('customInfo.point')">
              <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item> -->
            <!-- 评价等级 -->
            <!-- <el-form-item :label="$t('customInfo.levelId')">
              <el-input v-model="query.orderNumber" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item> -->
            <!-- <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button> -->
          <!-- </el-form>  -->
            <el-row>
                <el-col :span="8"><p>客户名称: {{ query.customerNm }}</p></el-col>
                <el-col :span="8"><p>评价等级: {{ query.point }}</p></el-col>
                <el-col :span="8"><p>积分: {{ query.levelId }}</p></el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <!-- 评价部门 -->
      <el-table-column :label="$t('customerAppraise.orgNm')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.orgNm }}</template>
      </el-table-column>
      <!-- 客户 -->
      <el-table-column :label="$t('customerAppraise.customerCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.customerCd }}</template>
      </el-table-column>
      <!-- 合同编号 -->
      <el-table-column :label="$t('customerAppraise.sellOrdContractCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.sellOrdContractCd }}</template>
      </el-table-column>
      <!-- 评价 -->
      <el-table-column :label="$t('customerAppraise.appraiseLevel')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseLevel }}</template>
      </el-table-column>
      <!-- 评价原由 -->
      <el-table-column :label="$t('customerAppraise.appraiseType')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseType }}</template>
      </el-table-column>
      <!-- 备注 -->
      <el-table-column :label="$t('customerAppraise.remarks')" align="center" width="420">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>
    </el-table>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="confirmSubmit()">确 定</el-button>
    </div> -->
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
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
        customerNm: '客户1',
        point:'50',
        levelId:'三星',
      },
        list:[
          {
            orgNm:'部门1',
            sellOrdContractCd: 'SC2019090611111111',
            appraiseType: '质量好',
            customerCd: '客户11',
            appraiseLevel: '好评',
            remarks: '备注',
          }, {
            orgNm:'部门1',
            sellOrdContractCd: 'SC2019090611111111',
            appraiseType: '质量好',
            customerCd: '客户22',
            appraiseLevel: '好评',
            remarks: '备注',
          }, {
            orgNm:'部门1',
            sellOrdContractCd: 'SC2019090611111111',
            appraiseType: '质量好',
            customerCd: '客户3',
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

    // 返回
    backPoject() {
      this.dialogVisible=false
      //this.$router.push({ path: '/whList'})
    },
    // 获取数据
    personList() {
      console.log('刷新');
      this.$router.go(0);
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
<style scoped>
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
