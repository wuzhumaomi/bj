<template>
  <!--弹出人员画面-->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="人员选择" :before-close="close_add_edit2" width="85%" append-to-body>
      <el-col :span="24">
        <el-form ref="query" label-width="100px" label-position="right" :model="query" :inline="true">
          <div class="queryContent">
            <!-- 中心编号 -->
            <el-form-item  :label="$t('dlgUSER.cntrCd')" prop="cntrCd" class="form-item">
              <el-select v-model="query.cntrCd" :disabled="true" :placeholder="$t('personInfo.choose')" >
                <el-option v-for="item in cntrList"  :key="item.id" :label="item.cntrNm" :value="item.id"/>
              </el-select>
            </el-form-item>
            <!-- 人员编号 -->
            <el-form-item :label="$t('dlgUSER.userId')" prop="userId" class="form-item">
              <el-input clearable  v-model="query.userId" :placeholder="$t('placeholders.content')" maxlength="10"></el-input>
            </el-form-item>
            <!-- 人员名称 -->
            <el-form-item :label="$t('dlgUSER.userNm')"  prop="userNm" class="form-item">
              <el-input clearable  v-model="query.userNm" :placeholder="$t('placeholders.content')" maxlength="50"></el-input>
            </el-form-item>
            <!-- 英文名称 --><!-- TODO:未测试 -->
            <el-form-item :label="$t('dlgUSER.userNmEn')" prop="userNmEn" class="form-item">
              <el-input clearable  v-model="query.userNmEn" :placeholder="$t('placeholders.content')" maxlength="50"></el-input>
            </el-form-item>
            <!-- 登录帐号 -->
            <el-form-item :label="$t('dlgUSER.loginId')"  prop="loginId" class="form-item">
              <el-input clearable  v-model="query.loginId" :placeholder="$t('placeholders.content')" maxlength="50"></el-input>
            </el-form-item>
          </div>
          <el-row type="flex" justify="end">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="personList">{{ $t('operation.query') }}</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    <el-table 
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      class="operationCss"
      stripe
      border 
      fit
      @select="handleSelectionChange"
      @select-all="handleSelectionChange">
    <!-- <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @select="handleSelectionChange" @select-all="handleSelectionChange"> -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="userId" :label="$t('dlgUSER.userId')" width="120">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <!-- <el-table-column :label="$t('customInfo.customerCdDis')" show-overflow-tooltip prop="customerCdDis">
        <template slot-scope="scope">
          <span>{{ scope.row.customerCdDis }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="userNm" :label="$t('dlgUSER.userNm')" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userNmEn" :label="$t('dlgUSER.userNmEn')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="loginId" :label="$t('dlgUSER.loginId')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sexCdNm" :label="$t('dlgUSER.sexCd')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="workId" :label="$t('dlgUSER.workId')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userKbnNm" :label="$t('dlgUSER.userKbn')"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="idCard" :label="$t('dlgUSER.idCard')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="birth" :label="$t('dlgUSER.birth')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="cellPhone" :label="$t('dlgUSER.cellPhone')"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tel" :label="$t('dlgUSER.tel')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="eMail" :label="$t('dlgUSER.eMail')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="adrs" :label="$t('dlgUSER.adrs')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="zipCode" :label="$t('dlgUSER.zipCode')" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remarks" :label="$t('dlgUSER.remarks')"  show-overflow-tooltip>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" @click="confirmSubmit()">{{ $t('common.save') }}</el-button>
      <el-button icon="el-icon-close" @click="close_add_edit2">{{ $t('common.back') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { apiBasic } from '@/api'
import { debug } from 'util';
import moment from 'moment'

export default {
  components: {
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        cntrCd: '',
        userId: '',
        userNm: '',
        loginId: '',
      },
      total: 0,
            list: [
        {userId:'UCN00001',cntrCd:"1",userNm:"张三",userNmEn:"zhangsan",sexCdNm:"男",workId:"JTA1912010001"
        ,loginId:"C000001",userKbn:"临时工",idCard:"310107199911111111",birth:'19931111',userKbnNm:'临时工'
        ,cellPhone:"18000000000",tel:"52738654",eMail:"zs@tqt.com",adrs:"江苏省连云港市",zipCode:"200000",remarks:"备注1"
        ,disableFlg:"正常",picId:"60001",pid:'60001',approvalClsM:"退回后待修改"},
        {userId:'UCN00002',cntrCd:"1",userNm:"李四",userNmEn:"lisi",sexCdNm:"女",workId:"JTA1912010002"
        ,loginId:"C000002",userKbn:"临时工",idCard:"310107199912122222",birth:'19931111',userKbnNm:'临时工'
        ,cellPhone:"18000000000",tel:"52738654",eMail:"ls@tqt.com",adrs:"江苏省盐城市",zipCode:"200000",remarks:"备注2"
        ,disableFlg:"停用",picId:"60008",pid:"60008",approvalClsM:"修改后待计划组经理审批"},
        {userId:'UCN00003',cntrCd:"1",userNm:"冯五",userNmEn:"fengwu",sexCdNm:"男",workId:"JTA1912010003"
        ,loginId:"C000003",userKbn:"临时工",idCard:"310107199912133333",birth:'19931111',userKbnNm:'临时工'
        ,cellPhone:"18000000000",tel:"52738654",eMail:"fw@tqt.com",adrs:"江苏省黄桥市",zipCode:"200000",remarks:"备注3"
        ,disableFlg:"锁定",picId:"60012",pid:"60012",approvalClsM:"通过"},
        {userId:'UCN00004',cntrCd:"1",userNm:"庞六",userNmEn:"pangliu",sexCdNm:"男",workId:"JTA1912010004"
        ,loginId:"C000004",userKbn:"临时工",idCard:"310107199912134444",birth:'19931111',userKbnNm:'临时工'
        ,cellPhone:"18000000000",tel:"52738654",eMail:"pl@tqt.com",adrs:"江苏省启东市",zipCode:"200000",remarks:"备注4"
        ,disableFlg:"新建",picId:"60025",pid:"60025",approvalClsM:"通过"},
      ],
      cntrList:[],//中心编号
      listLoading: false,
      dialogVisible: false,
      dataVal:[],
    };
  },
  created() {
    this.dataInit()
  },
  methods:{
    //画面初始化
    dataInit(){
      //获取中心编码
      this.query.cntrCd=this.$store.state.user.userinfo.cntrCd;
      let cntrCode=this.query.cntrCd
      //获取中心编码下拉框
      // apiBasic.getMCenterList().then(response => {
      //     this.cntrList=response
      //   }).catch(() => {
      //       this.$message({
      //         message: this.$t('common.message.info_operation_error'),
      //         type: 'error'
      //       });
      // });
    },

    //获取一览数据
    personList() {
      debugger
      // this.listLoading = true;
      // let me = this;
      // apiBasic.getMUserList({page: me.query.page,limit: me.query.limit,cntrCd : me.query.cntrCd,userId : me.query.userId,userNm : me.query.userNm,loginId : me.query.loginId}).then(response => {
      //   this.page = response.pages
      //   this.list = response.list
      //   this.total = response.total
      //   this.listLoading = false;
      // }).catch((err) => {
      //   console.log('err...',err)
      //   this.listLoading = false;
      // })
    },
    //选中
    handleSelectionChange(selection,row) {
      this.dataVal = selection;
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 保存提交
    confirmSubmit(){
      debugger
       this.$emit('func',this.dataVal);
       this.dialogVisible = false;
    },

    //只能开始一次。
    // open() {
    //   this.dialogVisible = true
    //   this.personList()
    // },

    dateIs(search) {
      debugger
      this.dialogVisible = true
      this.query.cntrCd=search.cntrCd
      this.personList()
    },

    close_add_edit2(){
      this.query={
        cntrCd: this.$store.state.user.userinfo.cntrCd,
        userId: '',
        userNm: '',
        loginId: '',
      },
      this.dialogVisible = false;
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
.operationCss .active{
  background: red !important;
}
</style>
