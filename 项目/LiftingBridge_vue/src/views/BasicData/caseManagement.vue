<template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :offset="0" :model="query" :inline="true">
      <el-row class="toolbar">
        <el-col :span="6"  style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.cntrCd')" width="80%">
                <el-select v-model="query.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')" style="width:150px">
                  <el-option
                    v-for="item in cntrOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="140px" :label="$t('caseManagement.boxNm')">
               <el-input v-model="query.boxNm" clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-plus" style="float:right" @click="handleCreate()">新增</el-button>
          <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list"  style="width: 100%"  border class="operationCss" >
      <el-table-column :label="$t('caseManagement.id')" prop="id" v-if="1==2" />
      <el-table-column :label="$t('caseManagement.cntrCd')" prop="cntrCd" v-if="1==2">
        <template slot-scope="scope">
         <span v-if = "scope.row.cntrCd == '1'" >上海提桥</span>
         <span v-else-if = "scope.row.cntrCd == '2'">江苏提桥</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('caseManagement.boxNm')" prop="boxNm" />
      <el-table-column :label="$t('caseManagement.boxHeight')" prop="boxHeight" />
      <el-table-column :label="$t('caseManagement.boxWidth')" prop="boxWidth" />
      <el-table-column :label="$t('caseManagement.boxDepth')" prop="boxDepth" />
      <el-table-column :label="$t('caseManagement.maxCapa')" prop="maxCapa" />
      <el-table-column :label="$t('caseManagement.grantCapa')" prop="grantCapa" />
      <el-table-column :label="$t('caseManagement.grantWeight')" prop="grantWeight" />
      <el-table-column :label="$t('caseManagement.caseUnitNum')" prop="caseUnitNum" />
      <el-table-column :label="$t('common.actions')" width="90px" align="center" fixed="right">
        <template slot-scope="scope">
           <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
             <el-button type="primary" size="mini" icon="el-icon-setting" circle plain @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
           <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
             <el-button size="mini" icon="el-icon-delete" type="danger" circle plain @click="projectDelete(scope.$index, scope.row)"></el-button>
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
  <!-- 箱明细界面 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="dialogTitle" width="30%" @open="resetDialog">
  <div class="app-container">
      <el-form ref="caseManagementForm" :offset="0" :model="caseManagementForm" :inline="true" >
      <div class="editContent">
      <el-row>
        <el-col :span="24"  style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.cntrCd')" width="80%">
                <el-select v-model="caseManagementForm.cntrCd" :disabled="true"  :placeholder="$t('personInfo.choose')" style="width:160px">
                  <el-option
                    v-for="item in cntrOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.boxNm')">
               <el-input v-model="caseManagementForm.boxNm" clearable :placeholder="$t('placeholders.content')" style="width:160px"/>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.maxCapa')">
               <el-input v-model="caseManagementForm.maxCapa" clearable :placeholder="$t('placeholders.pureDigital')"  style="width:160px">
                <template slot="append">L</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.grantCapa')">
               <el-input v-model="caseManagementForm.grantCapa" clearable :placeholder="$t('placeholders.pureDigital')"  style="width:160px">
                <template slot="append">L</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.grantWeight')">
               <el-input v-model="caseManagementForm.grantWeight" clearable :placeholder="$t('placeholders.pureDigital')" style="width:160px">
                <template slot="append">kg</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.boxHeight')">
               <el-input v-model="caseManagementForm.boxHeight" clearable :placeholder="$t('placeholders.pureDigital')" style="width:160px">
                <template slot="append">m</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.boxWidth')">
               <el-input v-model="caseManagementForm.boxWidth" clearable :placeholder="$t('placeholders.pureDigital')"  style="width:160px">
                <template slot="append">m</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.boxDepth')">
               <el-input v-model="caseManagementForm.boxDepth" clearable :placeholder="$t('placeholders.pureDigital')" style="width:160px">
                <template slot="append">m</template>
               </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="80px" :label="$t('caseManagement.caseUnitNum')">
               <el-input v-model="caseManagementForm.caseUnitNum" clearable :placeholder="$t('placeholders.pureDigital')" style="width:160px">
                <template slot="append">pcs/c</template>
               </el-input>
            </el-form-item>
        </el-col>
        </el-row>
        </div>
        <div class="Btnfooter">
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="close_add_edit">{{ $t('common.save') }}</el-button>
            <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
          </el-form-item>
        </div>
    </el-form>
  </div>
  </el-dialog>

  </div>
</template>

<script>

import tasks_addEdit from '../BasicData/components/ODtasksAddEdit'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'caseManagement',
  components: {
    tasks_addEdit,
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
        {cntrCd:'1',
          id:'1',
          boxNm:'15号箱',
          boxHeight:'0.231',
          boxWidth:'0.106',
          boxDepth:'0.080',
          maxCapa:'2L',
          grantCapa:'1.8L',
          grantWeight:'9kg',
          caseUnitNum:'12pcs',
          acceptId:'审批人id',
          remarks:'备注',
        }
      ],
      caseManagementForm:{
          cntrCd:'1',
          id:'1',
          boxNm:'15号箱',
          boxHeight:'0.231',
          boxWidth:'0.106',
          boxDepth:'0.080',
          maxCapa:'2',
          grantCapa:'1.8',
          grantWeight:'9',
          caseUnitNum:'12',
          acceptId:'审批人id',
          remarks:'备注',
      },
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
      listLoading: false,
      dialogVisible: false,
      dialogTitle:'',
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
        boxNm:'',
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
    resetDialog() {
      this.$refs['caseManagementForm'].resetFields()
    },
    handleCreate(type,row) {
    //   this.$router.push({ path: 'caseManagementOver'})
      if (type != undefined && type == 'edit') {
        this.dialogVisible = true
        this.dialogTitle = '编辑'
      } else {
        this.dialogVisible = true
        this.dialogTitle = '新建'
      }
    },
    // handleCreate() {
    // },
    //根据项目id 获取项目状态（限制所有按钮disable）项目开始日期+结束日期（限制所有日期的地方有限制）
    projectInformation(){
        let proIds = this.query.isPublish;
        // apiProTasks.getProject({progressID:proIds}).then(response => {
          if(response.status == '0'){//项目状态关闭
            // console.log('项目状态关闭',response);
            this.clickable = true;
          }else{//项目状态没关闭
            this.clickable = false;
            // console.log('项目状态未关闭');
          }
        // }).catch(() => {
        //   console.log('获取项目信息失败。');
        // });
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
      // for(let i of arrTmp){
      //   apiClass.listClass({ parentCode: i }).then(response => {
      //     if(i == 'IS_PRIORITY'){
      //       this.priority = response
      //     }else if(i == 'IS_STATE'){
      //       this.states = response
      //     }else{
      //        console.log('啥都没');
      //     }
      //   })
      // }
    },
    enabledFilter(row,name) {
      // if(name == 'priority'){//优先级
      //   return apiClass.classFilter(this.priority, row)
      // }else if(name == 'state'){//项目状态
      //   return apiClass.classFilter(this.states, row)
      // }else if(name == 'subProject'){//所属项目
      //   return apiClass.classProject(this.projectList, row)
      // }else if(name == 'assigned'){//指派
      //   return apiClass.classAssignedsHeadPens(this.assigneds, row)
      // }else if(name == 'responsible'){//负责
      //   return apiClass.classAssignedsHeadPens(this.headPens, row)
      // }

    },
    //删除
    projectDelete(index,row){
      // this.$router.push({ path: 'caseManagementOver'})
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // apiRole.deleteRole(row.id).then(responce => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.list.splice(index, 1);
          // this.personList()
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    },
    // 项目查询下拉框
    getAllProjects(val) {
      // apiProject.getAllProjects().then(response =>{
      //   this.projectList = response
      //   if(val == 'jz'){//加载
      //     if(response.length != '0'){
      //       this.query.isPublish = response[0].id
      //     }
      //   }
      //   this.projectInformation();
      //   if(this.userId){
      //      this.personList();
      //   }else{
      //     console.log('用户权限获取失败');
      //   }

      // })
    },
    //指派+负责人获取
    // getAssignedsHeadPens(){
    //   let term = this.query.isPublish;
    //   console.log('this.query.isPublish',this.query.isPublish);
    //   apiProject.getProjectTeam({id:term}).then(response =>{
    //     if(response.length != 0){//不为空处理
    //       this.assigneds = response.list
    //       this.headPens = response.list
    //     }else{//模块ID不存在，清空指派给+负责人
    //       this.assigneds = '';
    //       this.headPens = '';
    //     }
    //   })
    // },

    // 获取数据
    personList() {
      // this.listLoading = true;
      let me = this;
      // apiProTasks.getTasksList({ page: me.query.page,limit: me.query.limit,proId : me.query.isPublish}).then(response => {
      //   // console.log('获取成功',response);
      //   this.page = response.pages
      //   this.list = response.list
      //   this.total = response.total
      //   this.listLoading = false;
      // }).catch((err) => {
      //   console.log('err...',err)
      //   this.listLoading = false;
      // })
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
      this.dialogVisible = true
      if(index === undefined){
        this.titleName = '添加'
        let addProIds = this.query.isPublish;//获取项目
        setTimeout(()=>{
            this.$refs.tasksAddEdits.addProject(addProIds);
        })
      }else{
        this.titleName = '编辑';
        setTimeout(()=>{
            this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        })
      }

    },

    //关闭
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
      this.$refs.tasksAddEdits.empty();
    },

  }
}
</script>
<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding-top: 10px;
}
.Btnfooter{
  margin-top:10px;
}

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
	/* background: #f2f2f2; */
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
