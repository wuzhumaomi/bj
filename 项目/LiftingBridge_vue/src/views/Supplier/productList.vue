<template>
    <!--供应商--商品选择弹出画面-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="商品选择" :before-close="close_add_edit" width="85%" append-to-body>
    <el-form ref="customer" label-position="right" label-width="100px" :model="customer" :inline="true">
      <div class="queryContent">
        <!--中心编号-->
        <!-- <el-form-item :label="$t('warehouse.cntrCd')" prop="cntrCd" class="form-item">
          <el-select disabled v-model="query.cntrCd" >
            <el-option
              v-for="item in cntrOptions"
              :key="item.id"
              :label="item.cntrNm"
              :value="item.id"/>
          </el-select>
        </el-form-item> -->
        <!-- 商品编号 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.prodCdDis')" prop="prodCdDis" class="form-item">
          <el-input v-model="query.prodCdDis" clearable />
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item :label="$t('product.prodNm')" prop="prodNm" class="form-item">
          <el-input v-model="query.prodNm" clearable />
        </el-form-item>
        <!-- 商品简称 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.prodJc')" prop="prodJc" class="form-item">
          <el-input v-model="query.prodJc" clearable />
        </el-form-item>
        <!-- 英文名称 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.prodNmEn')" prop="prodNmEn" class="form-item">
          <el-input v-model="query.prodNmEn" clearable />
        </el-form-item>
        <!-- 商品种类 -->
        <el-form-item :label="$t('product.prodType')" prop="prodType" class="form-item">
          <el-select v-model="query.prodType" clearable >
            <el-option v-for="item in typeList"
              :key="item.generalCd"
              :label="item.generalNm"
              :value="item.generalCd"/>
          </el-select>
        </el-form-item>
        <!-- 规格型号 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.assetModel')" prop="assetModel" class="form-item">
          <el-input v-model="query.assetModel" clearable />
        </el-form-item>
        <!-- 纱支 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.yarnCount')" prop="yarnCount" class="form-item">
          <el-input v-model="query.yarnCount" clearable />
        </el-form-item>
        <!-- 成分比例 --><!-- TODO:未测试 -->
        <el-form-item :label="$t('product.ratio')" prop="ratio" class="form-item">
          <el-input v-model="query.ratio" clearable />
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" @click="getProductList">{{ $t('operation.query') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table ref="multipleTable" border :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
     <el-table-column type="selection" width="55" >
      </el-table-column>
      <!-- <el-table-column label="选择" width="65" >
        <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
        </template>
      </el-table-column> -->
      <el-table-column  :label="$t('product.prodCdDis')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.prodCdDis }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.prodNm')" align="center" width="120" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.prodNm }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.prodJc')" align="center" width="120" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.prodJc }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.prodNmEn')"  align="center" width="120" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.prodNmEn }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.prodType')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.prodType }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.prodClassId')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.prodClassId }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.assetModel')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.assetModel }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.yarnCount')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.yarnCount }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.ratio')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.ratio }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.consumeDt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.consumeDt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.unit')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.unit }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceGrossWgt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceGrossWgt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceNetWgt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceNetWgt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceVol')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceVol }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceHeight')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceHeight }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceWidth')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceWidth }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.pieceDepth')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.pieceDepth }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseUnitNum')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseUnitNum }}</template>
      </el-table-column>
      
      <el-table-column :label="$t('product.caseGrossWgt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseGrossWgt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseNetWgt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseNetWgt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseVol')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseVol }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseheight')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseheight }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseWidth')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseWidth }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.caseDepth')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.caseDepth }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.warningWgt')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.warningWgt }}</template>
      </el-table-column>
      <el-table-column :label="$t('product.remarks')" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer" >
      <el-button icon="el-icon-check" type="primary" @click="confirmSubmit()">保存</el-button>
      <el-button icon="el-icon-close"  @click="back()">返回</el-button>
      
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
      radio: false,
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      typeList: [
        // { id: '001', value: '粮食' },
        // { id: '002', value: '日用品' }
        {id:'01',value:'纱线'},
        {id:'02',value:'布料'},
        {id:'03',value:'染料'},
        {id:'04',value:'助剂'},
        {id:'05',value:'包装材料'},
        {id:'06',value:'零配件'},
        {id:'07',value:'其他'}
      ],
      query: {
        page: 1,
        limit: 10,
        isPublish: '',
        orderType:'',
        salesType:'',
        orderNumber:'',
        customer:'',
      },
        list:[
          {
            prodCdDis:'PR000001',
            prodNm: '40s/1TK+30DOP 汗布',
            prodJc: '40s/1TK+30DOP 汗布',
            prodNmEn: 'hb',
            prodType: '面料',
            prodClassId: '汗布',
            prodType:'染料',
            assetModel: '1000',
            yarnCount: '32S/1',
            ratio: '60/40',
            consumeDt: '200',
            unit: '克',
            pieceGrossWgt: '100',
            pieceNetWgt: '100',
            pieceVol: '200',
            pieceHeight: '10',
            pieceWidth: '10',
            pieceDepth: '10',
            caseUnitNum: '5',
            caseGrossWgt: '200',
            caseNetWgt: '150',
            caseVol: '130',
            caseheight: '20',
            caseWidth: '12',
            caseDepth: '40',
            warningWgt: '290',    
            remarks: '备注',
          }, {
            prodCdDis:'PR000002',
            prodNm: '32s/1 腈纶 60/40 +吸湿排汗',
            prodNmEn: 'dl',
            prodJc: '32s/1 腈纶 60/40 +吸湿排汗',
            prodType: '纱线',
            prodClassId: '晴纶',
            assetModel: '9000',
            yarnCount: '30S/1',
            ratio: '40/60',
            consumeDt: '200',
            unit: '克',
            pieceGrossWgt: '100',
            pieceNetWgt: '100',
            pieceVol: '200',
            pieceHeight: '10',
            pieceWidth: '10',
            pieceDepth: '10',
            caseUnitNum: '5',
            caseGrossWgt: '200',
            caseNetWgt: '150',
            caseVol: '130',
            caseheight: '20',
            caseWidth: '12',
            caseDepth: '40',
            warningWgt: '290',    
            remarks: '备注',
          }, {
            prodCdDis:'PR000003',
            prodNm: '32s/1 有机棉纱 60/40 +吸湿排汗',
            prodJc: '32s/1 有机棉纱 60/40 +吸湿排汗',
            prodNmEn: 'yjms',
            prodType: '纱线',
            prodClassId: '涤纶',
            assetModel: '2000',
            yarnCount: '30S/1',
            ratio: '100',
            consumeDt: '200',
            unit: '克',
            pieceGrossWgt: '100',
            pieceNetWgt: '100',
            pieceVol: '200',
            pieceHeight: '10',
            pieceWidth: '10',
            pieceDepth: '10',
            caseUnitNum: '5',
            caseGrossWgt: '200',
            caseNetWgt: '150',
            caseVol: '130',
            caseheight: '20',
            caseWidth: '12',
            caseDepth: '40',
            warningWgt: '290',    
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
    getCurrentRow(index) {
　　　　　　　　this.radio = index　　　
　　　　　　},
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
      debugger
      this.dialogVisible = true
    },
    back() {//只能开始一次。
      this.dialogVisible = false
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

.dialog-footer{
  text-align: left;
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
