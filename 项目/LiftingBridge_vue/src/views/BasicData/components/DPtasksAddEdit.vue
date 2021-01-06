<template>
  <!-- 组织部门界面 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <el-form-item label-width="100px" label-position="right" :label="$t('personnelManagement.cntrCd')">
                <el-select v-model="query.cntrCd" :disabled="true" :placeholder="$t('personInfo.choose')" style="width:200px">
                  <el-option
                    v-for="item in cntrOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('personnelManagement.relation.orgCdDis')">
               <el-input v-model="query.orgCdDis" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item label-width="100px" label-position="right" :label="$t('personnelManagement.relation.orgNm')">
               <el-input v-model="query.orgNm"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table 
      ref="personList"
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      class="operationCss"
      stripe
      border
      fit
      highlight-current-row
      @select="handleSelectionChange"
      @select-all="handleSelectionChange">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column :label="$t('personnelManagement.relation.orgCdDis')" prop="orgCdDis" width="120"/>
      <!-- <el-table-column :label="$t('personnelManagement.relation.higherOrgCd')" prop="higherOrgCd" width="100"/> -->
      <el-table-column :label="$t('personnelManagement.relation.orgNm')" prop="orgNm" width="180"/>
      <el-table-column :label="$t('personnelManagement.relation.orgAbbr')" prop="orgAbbr" width="120"/>
      <el-table-column :label="$t('personnelManagement.relation.orgEngNm')" prop="orgEngNm" width="180"/>
      <el-table-column :label="$t('personnelManagement.relation.orgType')" prop="orgType"/>
      <el-table-column :label="$t('personnelManagement.relation.isFinancial')" prop="isFinancial" width="120"/>
      <el-table-column :label="$t('personnelManagement.relation.contactNm')" prop="contactNm"/>
      <el-table-column :label="$t('personnelManagement.relation.tel')" prop="tel" width="120"/>
      <el-table-column :label="$t('personnelManagement.relation.fax')" prop="fax" width="120"/>
      <el-table-column :label="$t('personnelManagement.relation.adrs')" prop="adrs" width="180"/>
      <el-table-column :label="$t('personnelManagement.relation.zipCode')" prop="zipCode"/>
      <el-table-column :label="$t('personnelManagement.relation.eMail')" prop="eMail" width="130"/>
      <el-table-column :label="$t('personnelManagement.relation.remarks')" prop="remarks"/>
      <el-table-column :label="$t('personnelManagement.relation.orgPath')" prop="orgPath" width="130"/>
      <el-table-column :label="$t('personnelManagement.relation.whCd')" prop="whCd" width="120"/>
    </el-table>
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
      <!-- <div style="padding-top: 10px;margin:0px;">
      <el-button icon="el-icon-close" @click="close_add_edit2">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="close_add_edit2">确 定</el-button>
      </div> -->
      <div style="padding-top: 10px;margin:0px;">
          <el-button type="primary" icon="el-icon-check" @click="handleConfirm">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="handleCancel">{{ $t('common.back') }}</el-button>
      </div>
  </div>
</template>
<script>

import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
  },
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total: 0,
      list: [
        {id:'1',  
          orgCdDis:'1100001',
          higherOrgCd:'销售部',
          orgNm:'销售组1',
          orgAbbr:'so',
          orgEngNm:'salesOrg',
          orgType:'公司',
          isFinancial:'是',
          provincialCd:'020',
          contactNm:'张三',
          tel:'02066666666',
          fax:'02088888888',
          adrs:'江苏省盐城市',
          zipCode:'200000',
          eMail:'sales@tqt.com',
          remarks:'备注',
          orgPath:'1/11/1100/1100001',
          whCd:'TJWH110000111',
        },
        {id:'2',  
          orgCdDis:'1100002',
          higherOrgCd:'生产部',
          orgNm:'生产组1',
          orgAbbr:'mo',
          orgEngNm:'manufactureOrg',
          orgType:'公司',
          isFinancial:'是',
          provincialCd:'020',
          contactNm:'张三',
          tel:'02066666666',
          fax:'02088888888',
          adrs:'江苏省盐城市',
          zipCode:'200000',
          eMail:'sales@tqt.com',
          remarks:'备注',
          orgPath:'1/11/1100/1100002',
          whCd:'TJWH110000112',
        },
        {id:'3',  
          orgCdDis:'1100003',
          higherOrgCd:'生产部',
          orgNm:'生产组2',
          orgAbbr:'mo',
          orgEngNm:'manufactureOrg',
          orgType:'公司',
          isFinancial:'是',
          provincialCd:'020',
          contactNm:'张三',
          tel:'02066666666',
          fax:'02088888888',
          adrs:'江苏省盐城市',
          zipCode:'200000',
          eMail:'sales@tqt.com',
          remarks:'备注',
          orgPath:'1/11/1100/1100002',
          whCd:'TJWH110000112',
        },
        ],
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:false,
      listLoading: false,
      dialogVisible: false,
      // varChangeColor: false,
      titleName:'',
      // tasksData:'',
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        cntrCd:'1', 
        orgCdDis:'1100001',
        orgNm: '生产部',
      },
      projectList: [],
      // assigneds: [],
      // headPens: [],
      priority: [],
      states: [],
    }
  },
  created() {
    // this.personList()
    this.getEnabled()
    this.getAllProjects('jz')
  },
  computed: {
  },
  methods: {
    //根据项目id 获取项目状态（限制所有按钮disable）项目开始日期+结束日期（限制所有日期的地方有限制）
    projectInformation(){
        let proIds = this.query.isPublish;

        this.userInformation();
    },
    //获取用户信息
    userInformation(){
     this.userId = this.$store.state.user.userinfo.person.id;
    },

    //完成度
    sliders(index, row){
      let para = row;
      para.createTime = moment(para.createTime).format('YYYY-MM-DD HH:mm:ss')
      para.updateTime = moment(para.updateTime).format('YYYY-MM-DD HH:mm:ss')
      if(para.progress == '100'){//完成度100，status为已经完成。
         if(this.userId != row.receiver){//当前用户对应人员不等于这一条的指派人，完成的弹框不能弹出
            this.$message({
              message: '非指派人不可完成！',
              type: 'error'
            });
            this.personList();
         }else{//可以弹出，
           this.projectComplete(index, row);
         }
      }else{
        apiProTasks.updateTasksData(para).then(response => {
          this.$message({
            message: this.$t('common.message.info_operation_success'),
            type: 'success'
          });
          this.personList();
        }).catch(() => {
            this.$message({
              message: this.$t('common.message.info_operation_error'),
              type: 'error'
            });
        });
      }

    },
    //选中时调用的方法
    handleSelectionChange(selection,row) {
      this.selected = selection;
      this.$refs.personList.clearSelection();
      this.$refs.personList.toggleRowSelection(row);
    },

    isDefault(field){
      if(field == 3){
        return true;
      }else{
        return false;
      }
    },
    getEnabled() {
      let g ='IS_PRIORITY';//优先级
      let h = 'IS_STATE';//项目状态

      let arrTmp = [g,h];

    },
    enabledFilter(row,name) {


    },
    //详情跳转
    clickRow(row){
      this.$router.push({
        path: '/proTasksPerson/'+ row.id,
      })
    },
    // 项目查询下拉框
    getAllProjects(val) {

    },
    //指派+负责人获取


    // 获取数据
    personList() {
      // this.listLoading = true;
      let me = this;

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
   //添加
    addProject(addProIds){
      this.distinguishName = 'addForm';
      this.getEnabled(addProIds,'add');//任务类型+优先级,
      this.getAllProjects(addProIds,'add');
      this.proStatus();
      // this.projectStartDate = data.projectStartDate;//项目开始日期
      // this.projectEndDate = data.projectEndDate;//项目结束日期
    },
    empty(){//子组件关闭时
        id:undefined,
        this.query={
          id:undefined,
          cntrCd:this.$store.state.user.userinfo.cntrCd,
          orgCdDis:'',
          orgNm: '',
          roleTable:[],
        }
          // this.$parent.$parent.personList();
    },
    //编辑
    dateIs(updateDates,dateIsName) {
      this.distinguishName = 'editForm';
      this.dateIsName = dateIsName;
      if(updateDates){//编辑处理
        this.getEnabled(updateDates,'update');//任务类型+优先级
        this.getAllProjects(updateDates,'update');
        this.id = updateDates.id;
        this.MyData.remark = updateDates.remark;
        this.MyData.taskNm = updateDates.taskNm;
        this.projectStartDate = updateDates.projectStartDate;//项目开始日期
        this.projectEndDate = updateDates.projectEndDate;//项目结束日期
        this.MyData.schedule = [this.projectStartDate,this.projectEndDate]
      }else{
        this.MyData.remark = '';
        this.MyData.taskNm = '';
        this.MyData.schedule = [];
        this.proStatus();
      }
    },
    //开始
    projectStart(index, row) {
      this.$refs.projectStarts.open(row,this.distinguishName)
      this.disabled = false;
      // this.varChangeColor = true;
    },

    //取消
    projectCancel(index, row) {
      // console.log('取消');
      this.$refs.projectCancels.open(row,this.distinguishName)
    },

    //完成
    projectComplete(index, row) {
      // console.log('完成');
      this.$refs.projectCompletes.open(row,this.distinguishName)
    },

     //添加任务+编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      if(index === undefined){
        this.titleName = '添加'
        let addProIds = this.query.isPublish;//获取项目
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.addProject(addProIds);
        // })
      }else{
        this.titleName = '编辑';
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
      }

    },
    handleConfirm() {
      this.$emit('confirm', this.selected)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    //关闭
    close_add_edit2(){//取消的关闭
      // this.$emit("closeHide",false);
      // this.empty();
      // this.isDisabled = false;//可点击
      // this.$parent.$parent.close_add_edit();
      this.dialogVisibleDep= false
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
