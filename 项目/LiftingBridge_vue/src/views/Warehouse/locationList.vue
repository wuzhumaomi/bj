<template>
  <!-- 库位界面一览 -->
  <div class="administrator-list project-tasks">
    <el-form ref="query"  :model="query" :inline="true" label-width="100px" label-position="right">
      <div class="queryContent">
        <!--中心编号-->
        <el-form-item :label="$t('location.cntrCd')" class="form-item">
           <el-select v-model="query.cntrCd"  clearable disabled>
            <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
          </el-select>
        </el-form-item>
        <!--仓库名称-->
        <el-form-item :label="$t('location.whNm')" class="form-item">
          <el-select v-model="query.whId"  @change="getZone" clearable>
            <el-option v-for="item in whList"  :key="item.id" :label="item.whNm" :value="item.id"/>
          </el-select>
        </el-form-item>
        <!--区域名称-->
        <!-- <el-form-item v-show="query.whId!=''" :label="$t('location.zoneNm')" class="form-item">
          <el-select  v-model="query.zoneId"  clearable>
            <el-option v-for="item in zoneList"  :key="item.id" :label="item.zoneNm" :value="item.id"/>
          </el-select>
        </el-form-item> -->
        <!--库位表示用编号-->
        <el-form-item :label="$t('location.locCdDis')" class="form-item">
           <el-input v-model="query.locCdDis"  clearable>
           </el-input>
        </el-form-item>
        <!--库位名称-->
        <el-form-item :label="$t('location.locNm')" class="form-item">
          <el-input v-model="query.locNm"  clearable/>
        </el-form-item>
        <!--库位类型-->
        <el-form-item :label="$t('location.locType')" class="form-item">
          <el-select v-model="query.locType"  clearable>
            <el-option v-for="item in typeList"  :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
          </el-select>
        </el-form-item>
      </div >
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="personList">{{ $t('operation.query') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addOrder()">{{ $t('operation.newlyAdded') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list"  style="width: 100%"  class="operationCss" @row-dblclick="goLocationEdit()" v-loading="listLoading" border>
      <el-table-column :label="$t('location.whNm')" prop="locCdDis" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.whNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.zoneNm')" prop="locCdDis" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.zoneNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.locCdDis')" prop="locCdDis" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.locCdDis }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.locNm')" show-overflow-tooltip  prop="locNm">
        <template slot-scope="scope">
          <span>{{ scope.row.locNm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.locType')" show-overflow-tooltip  prop="locType">
        <template slot-scope="scope">
          <span>{{ scope.row.locType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.wgtLimit')" prop="wgtLimit" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.wgtLimit}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.heightLimit')" prop="heightLimit" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.heightLimit}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.widthLimit')" prop="widthLimit" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.widthLimit}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.depthLimit')" show-overflow-tooltip  prop="depthLimit" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.depthLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.rankForOns')" prop="rankForOns">
        <template slot-scope="scope">
          <span>{{scope.row.rankForOns}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('location.rankForIss')" prop="rankForIss">
        <template slot-scope="scope">
          <span>{{scope.row.rankForIss}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('location.allcNgCls')" prop="allcNgCls" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.allcNgCls}}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('location.remarks')" prop="remarks">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
       <el-table-column  fixed="right" :label="$t('channel.operation')" width="100">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="goLocationEdit()"></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-delete" size="mini" circle  type="danger" plain @click="handleDelete(scope.$index, scope.row)"></el-button><!-- 取消 -->
          </el-tooltip>
        </template>
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

    <customer_order @func="getMsgFormSon" ref="customerOrders" />
  </div>
</template>

<script>

import customer_order from '@/views/Warehouse/LocationEdit'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    customer_order,
  },
  data() {
    return {
      input:'',
      total: 3,
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      typeList:[
        {id:'01',value:'通用'},
        {id:'02',value:'零散'},
        {id:'03',value:'准备'},
        {id:'90',value:'临时'},
      ],
      whList: [
        { id: '001', value: '筒纱毛坯仓' },
        { id: '002', value: '短纤毛坯纱仓' },
        { id: '002', value: '长纤毛坯纱仓' }
      ],
      zoneList:[
        { id: '001', value: '散货区域' },
        { id: '002', value: '临时存放区域' },
        { id: '003', value: '普通存放区域' }
      ],
      list: [
        {
          whNm: '筒纱毛坯仓',
          zoneNm: '临时存放区域',
          locCdDis: 'A01',
          locNm: '库位1',
          locType: '临时',
          wgtLimit: '10',
          heightLimit: '10',
          widthLimit: '42',
          depthLimit: '23',
          rankForOns: '2',
          rankForIss: '1',
          allcNgCls: '可使用',
          remarks:'REMARk'
        },
        {
          whNm: '短纤毛坯纱仓',
          zoneNm: '普通存放区域',
          locCdDis: 'B01',
          locNm: '库位2',
          locType: '通用',
          wgtLimit: '10',
          heightLimit: '10',
          widthLimit: '42',
          depthLimit: '234',
          rankForOns: '1',
          rankForIss: '1',
          allcNgCls: '不可使用',
          remarks:''
        },
        {
          whNm: '短纤毛坯纱仓',
          zoneNm: '普通存放区域',
          locCdDis: 'B02',
          locNm: '库位3',
          locType: '通用',
          wgtLimit: '20',
          heightLimit: '21',
          widthLimit: '23',
          depthLimit: '12',
          rankForOns: '1',
          rankForIss: '1',
          allcNgCls: '可使用',
          remarks:''
        }
      ],
      selectWhNm: '',
      listLoading: false,
      dialogVisible: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        isPublish: '',
        orderType:'',
        salesType:'',
        orderNumber:'',
        customer:'',
        cntrCd:'001'
      },
      projectList: [],
      priority: [],
      msgFormSon:'',
    }
  },
  created() {
    // this.personList()
  },
  computed: {
  },
  methods: {
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },
    //详情跳转
    clickRow(row){
      this.$router.push({
        // path: '/createOrderChild/'+ row.id,
        path: '/createOrderChild/'+ '0',
      })
    },

    // add新增+update编辑
    goCreateOrder(row) {
      if(row != undefined){
        this.$router.push({ path: '/createOrder/' + 0})
      }else{
        this.$router.push({ path: '/createOrder/'+ 0})
      }
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

    //客户组件
    // customerOrder() {
    //   this.$refs.customerOrders.open()
    // },
    //弹出库位新增编辑画面
    goLocationEdit() {
      this.$refs.customerOrders.open()
    },
    //删除列表
    handleDelete(index, row) {
      this.list.splice(index, 1);
    },
  }
}
</script>
<style>
.project-tasks .el-table td div{
  z-index: 1;
}
.operationCss .active{
  background: red !important;
}
.form-float > div{
  float: left;
}
.el-dialog__body {
    padding: 0px 20px 20px;
}
.administrator-list{
    padding: 20px;
    padding-right: 30px
}
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
}
.page-title{
  color: rgb(77, 74, 74)
}
.icon-upload-box {
  float: right;
  margin-right: 20px;
  width:  100px;
  height: 100px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  margin-right: 35%
}
.plus-cls {
  font-size: 30px;
  color: #b7b7b7;
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 30px;
}
.el-card__body {
    height: 300px;
    padding: 20px;
}
img {
  width: 100%;
  height: 100%;
}

.icon-upload-boxs {
  width: 120px;
  height: 140px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0px auto;
}
.icon-upload-boxs:hover {
  border-color: #409eff;
}
.icon-upload-boxs .el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.icon-upload-boxs + .icon-tip {
  position: absolute;
  top: 55px;
  left: 140px;
  font-size: 12px;
  color: #777;
}
.icon-upload-boxs img {
  width: 100%;
  height: 100%;
}
</style>
