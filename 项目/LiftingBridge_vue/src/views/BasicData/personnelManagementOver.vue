<template>
  <!-- 提示信息一览界面 -->
  <div class="administrator-list project-tasks">
    <el-form ref="personnelManagementForm"  :model="personnelManagementForm" >
      <el-row :gutter="20" style="padding:8px 12px 2px 12px;">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.cntrCd')">
                <el-select v-model="query.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')" label-width="80px">
                  <el-option
                    v-for="item in politicalOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.userNm')" >
               <el-input v-model="personnelManagementForm.userNm" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="6" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.loginId')">
               <el-input v-model="personnelManagementForm.loginId"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="6" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.workId')">
               <el-input v-model="personnelManagementForm.workId"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="12" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.userNmEn')">
               <el-input  v-model="personnelManagementForm.userNmEn" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.idCard')">
               <el-input v-model="personnelManagementForm.idCard"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.sexCd')">
              <br>
                <el-select v-model="personnelManagementForm.sexCd" :placeholder="$t('personInfo.choose')" style="width:200px">
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.eMail')">
               <el-input v-model="personnelManagementForm.eMail"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="12" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.adrs')">
               <el-input v-model="personnelManagementForm.adrs"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.cellPhone')">
               <el-input v-model="personnelManagementForm.cellPhone"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.tel')">
               <el-input v-model="personnelManagementForm.tel"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.zipCode')">
               <el-input v-model="personnelManagementForm.zipCode"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin:0px;">
            <el-form-item :label="$t('personnelManagement.remarks')">
               <el-input type="textarea" v-model="personnelManagementForm.remarks"  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
          </el-col>
        </el-row>
      <el-card shadow="always" class="tab_border">
          <el-form-item  prop="remarks">
            <el-col :span="24">
              <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(1)">{{ $t('common.addAline') }}</el-button>
              <el-table
                :data="tableData1"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                highlight-current-row	
                class="intervalRows">
                <el-table-column :label="$t('personnelManagement.relation.userCd')" align="center" width="100">
                  <template slot-scope="scope">{{ scope.row.userCd }}</template>
                </el-table-column>
                <el-table-column :label="$t('personnelManagement.relation.orgCd')" align="center" width="250" hidden>
                  <template slot-scope="scope">{{ scope.row.orgCd }}
                    <el-button icon="el-icon-more" type="primary" style="float:right" @click="handleEdit('dept', scope.$index)"></el-button></template>
                </el-table-column>
                <el-table-column :label="$t('personnelManagement.relation.roleCd')" align="center" width="250">
                  <template slot-scope="scope">{{ scope.row.roleCd }}
                    <el-button icon="el-icon-more" type="primary" style="float:right" @click="handleEdit('role', scope.$index)"></el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('personnelManagement.relation.roleNm')" align="center" width="250">
                  <template slot-scope="scope">{{ scope.row.roleNm }}</template>
                </el-table-column>
                <el-table-column :label="$t('personnelManagement.relation.defCpyFlg')" align="center" width="60">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.defCpyFlg"></el-checkbox>
                  </template>
                </el-table-column>
                <!-- <el-table-column :label="$t('personnelManagement.relation.defOrgType')" align="center" width="60">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.defOrgType"></el-checkbox>
                  </template>
                </el-table-column> -->
                <el-table-column :label="$t('personnelManagement.relation.newFlg')" align="center" width="60">
                  <template slot-scope="scope"><el-checkbox v-model="scope.row.newFlg"></el-checkbox></template>
                </el-table-column>
                <el-table-column :label="$t('personnelManagement.relation.disableFlg')" align="center" width="60">
                  <template slot-scope="scope"><el-checkbox v-model="scope.row.disableFlg"></el-checkbox></template>
                </el-table-column>
                <el-table-column :label="$t('common.actions')" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                      <el-button  type="info" plain circle icon="el-icon-minus" @click="reduceRow(scope.$index,1)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
      </el-card>
      <el-dialog :close-on-click-modal="true" :title="titleName"  :visible.sync="dialogVisible"  :before-close="close_add_edit" width="85%">
          <role_addEdit ref="rolesAddEdits"  :editorVisible="dialogVisible" @closeHide="close_add_edit" />
      </el-dialog>
      <el-dialog :close-on-click-modal="true" :title="titleName"  :visible.sync="dialogVisibleDep"  :before-close="close_add_edit2" width="85%">
          <dept_addEdit ref="deptsAddEdits"  :editorVisible="dialogVisibleDep" @closeHide="close_add_edit2" />
      </el-dialog>
      <el-row :gutter="20">
        <el-col :span="24" style="padding-bottom: 0px;">
          <el-form-item>
            <el-button type="primary" style="float:left"  @click="onSubmit1">{{ $t('common.save') }}</el-button>
            <el-button style="float:right" @click="backPoject">{{ $t('common.back') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import role_addEdit from '../BasicData/components/PMOtasksAddEdit'
import dept_addEdit from '../BasicData/components/DPtasksAddEdit'
import { debug } from 'util';
import moment from 'moment'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name:'PersonnelManagementOver',
  components: {
    role_addEdit,
    dept_addEdit,
  },
  // components: { selectPerson },
  directives: {
    waves
  },
  data() {
    return {
      personnelManagementForm:{
        cntrCd:'',
        workId:'',
        loginId:'',
        cntrCd:'',
        userNm:'',
        userNmEn:'',
        sexCd:'',
        workId:'',
        loginId:'',
        userKbn:'',
        idCard:'',
        cellPhone:'',
        tel:'',
        eMail:'',
        adrs:'',
        zipCode:'',
        remarks:'',
        disableFlg:'',
        picId:'',
        approvalClsM:'',
      },
      politicalOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      sexOptions: [{code:'1',text:'男'},{code:'2',text:'女'}],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total: 0,
      list: [],
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
      listLoading: false,
      dialogVisible: false,
      dialogVisibleDep: false,
      // varChangeColor: false,
      titleName:'',
      // tasksData:'',
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        political:'',
      },
      projectList: [],
      // assigneds: [],
      // headPens: [],
      priority: [],
      states: [],
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
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
    
    onSubmit1() {
    },

    // 返回
    backPoject() {
      this.$router.push({ path: '/personnelManagement'})
    },
    addRow(index) {
      if(index === 1){
        this.rowBranches(this.tableData1);
      }else if(index === 2){
        this.rowBranches(this.tableData2);
      }else if(index === 3){
        this.rowBranches(this.tableData3);
      }else{
        console.log('error',index);
      }
    },
        // 新增模块减少一行
    reduceRow(val,number) {
      if(number === 1){
        this.tableData1.splice(val, 1)
      }else if(number ===2){
        this.tableData2.splice(val, 1)
      }else if(number ===3){
        this.tableData3.splice(val, 1)
      }else{
        console.log('error',number);
      }
    },
    rowBranches(datas) {
      if(datas.length > 5) {
          this.$message({
            message: '一次性最多可以添加五条数据',
            type: 'warning'
          })
          return false
        }
      var newValue = {
        modNm: '',
        modSm: ''
      };
      //添加新的行数
      datas.push(newValue)
    },
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
      if(index === 'role'){
        this.dialogVisible = true
        this.titleName = '角色选择'
        let addProIds = this.query.isPublish;//获取项目
        this.$refs.rolesAddEdits.addProject(addProIds);
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.addProject(addProIds);
        // })
      }else if(index === 'dept'){
        this.dialogVisibleDep = true
        this.titleName = '部门选择';
        this.$refs.deptsAddEdits.dateIs(row,'');
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
      }

    },

    //关闭
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
      this.$refs.rolesAddEdits.empty();
    },

    close_add_edit2(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleDep = false
      this.$refs.deptsAddEdits.empty();
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
