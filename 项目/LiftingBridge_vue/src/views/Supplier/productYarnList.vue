<template>
    <!--供应商--商品选择弹出画面-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="纱线选择" :before-close="close_add_edit" :append-to-body="true" width="800px" style=";padding:0px">
    <el-form ref="productYarnForm"  :model="productYarnForm" >
    <!-- <el-row :gutter="20">
      <el-col :span="24" style="padding-bottom: 0px;margin:0px;">      
        <el-form-item :label="$t('outFactoryManagement.cntrCd')" width="80%">
            <el-select v-model="productYarnForm.cntrCd" :disabled="true" :placeholder="$t('personInfo.choose')" style="width:200px">
              <el-option
                v-for="item in cntrOptions"
                :key="item.code"
                :label="item.text"
                :value="item.code"/>
            </el-select>
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col :span="9" style="padding: 0 0 0 0;border:10px;margin:0px;">      
        <el-form-item label-position="left" label-width="80px" :label="$t('warehouseYarn.yarnGnre')" />
        <el-table ref="gnreList" :data="gnreList" tooltip-effect="dark" border style="border-radius:6px;width: 100%;height:220px;overflow-y:auto;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40%">
          </el-table-column>
          <el-table-column :label="$t('warehouseYarn.yarnNm')" align="center" width="150%">
            <template slot-scope="scope">{{ scope.row.yarnNm }}</template>
          </el-table-column>
          <el-table-column :label="$t('warehouseYarn.yarnJc')" align="center" width="100%">
            <template slot-scope="scope">{{ scope.row.yarnJc }}</template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14" style="padding: 2 0 0 0;margin:0px;">      
        <el-form-item label-position="left" label-width="100px" :label="$t('warehouseYarn.tipChooseYarn')" >
          <el-button type="primary"  icon="el-icon-check" style="float:right;" @click="close_add_edit()" >选 择</el-button>
          <el-button icon="el-icon-close" style="float:right;margin-right:20px" @click="confirmSubmit()">返回</el-button>
        </el-form-item>
        <el-table ref="brandList" :data="brandList" tooltip-effect="dark" border style="border-radius:6px;width: 550px;height:220px;overflow-y:auto;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40%"/>
          <el-table-column :label="$t('warehouseYarn.yarnNm')" align="center" width="190">
            <template slot-scope="scope">{{ scope.row.yarnNm }}</template>
          </el-table-column>
          <el-table-column :label="$t('warehouseYarn.yarnBrand')" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.yarnBrand }}</template>
          </el-table-column>
          <el-table-column :label="$t('warehouseYarn.yarnRate')" align="center" width="84">
            <template slot-scope="scope">{{ scope.row.yarnRate }}</template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <el-row >
      <el-divider content-position="right"></el-divider>
      <el-col :span="8" style="padding-bottom: 0px;margin:0px;">
        <el-form-item :label="$t('warehouseYarn.tipNewYarn')" />
      </el-col>
      <el-col :span="8" style="padding-bottom: 0px;margin:0px;">
        <el-form-item :label="$t('warehouseYarn.yarnGnre')" >
          <el-input type="text" maxlength="20" disabled v-model="productYarnForm.yarnGnre" style="width:180px"/>
        </el-form-item>
      </el-col>
      <el-col :span="7" style="padding-bottom: 0px;margin:0px;">
        <el-button type="primary" icon="el-icon-check" style="float:right" @click="confirmSubmit()">{{$t('warehouseYarn.btnNewAndChose')}}</el-button>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="7" style="padding-bottom: 0px;margin:0px;">
        <el-form-item :label="$t('warehouseYarn.yarnBrand')" >
          <el-input type="text" maxlength="20" v-model="productYarnForm.yarnBrand" style="width:160px"/>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="padding-bottom: 0px;margin:0px;">
        <el-form-item label-width="70px" label-position="right" :label="$t('warehouseYarn.yarnRate')" >
          <el-input type="text" maxlength="20" v-model="productYarnForm.yarnRate"/>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>

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
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      gnreList:[
          {
            id: '1',
            cntrCd: '1',
            yarnNm: '涤纶',
            yarnJc: 'D',
          }, {
            id: '2',
            cntrCd: '1',
            yarnNm: '腈纶',
            yarnJc: 'AY',
          }, {
            id: '3',
            cntrCd: '1',
            yarnNm: '锦纶',
            yarnJc: 'J',
          }, {
            id: '4',
            cntrCd: '1',
            yarnNm: '棉',
            yarnJc: 'C',
          }
        ],
        brandList:[
          {
            id: '1',
            yarnNm: '腈纶/有机棉纱',
            yarnBrand: '32S/1',
            yarnRate: '60/40',
          }, {
            id: '2',
            yarnNm: '腈纶/有机棉纱',
            yarnBrand: '30S/1',
            yarnRate: '40/60',
          }, {
            id: '3',
            yarnNm: '腈纶/有机棉纱',
            yarnBrand: '30S/1',
            yarnRate: '40/60',
          }, {
            id: '4',
            yarnNm: '腈纶',
            yarnBrand: '28S/2',
            yarnRate: '100',
          }
        ],
        productYarnForm: {
          cntrCd: '1',
          yarnGnre: '腈纶/有机棉纱',
          yarnBrand: '30S/1',
          yarnRate: '40/60',
        },
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
