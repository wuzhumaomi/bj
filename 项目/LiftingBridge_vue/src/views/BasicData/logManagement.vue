<template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :offset="0" :model="query" :inline="true">
      <el-row class="toolbar">
        <el-col :span="24"  style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.cntrCd')" width="80%">
                <el-select v-model="query.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')" style="width:200px">
                  <el-option
                    v-for="item in cntrOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="20" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.optDt')">
               <el-date-picker v-model="query.optStartDt" type="date" clearable :placeholder="$t('placeholders.content')" style="width:200px" />~
               <el-date-picker v-model="query.optEndDt" type="date" clearable :placeholder="$t('placeholders.content')" style="width:200px" />
            </el-form-item>
        </el-col>
        <el-col :span="8" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.logStatus')">
               <el-input v-model="query.logStatus" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
            </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.logComment')">
               <el-input v-model="query.logComment" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
            </el-form-item>
        </el-col>
        <el-col :span="8" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.syriKbn')">
              <el-select v-model="query.syriKbn" clearable :placeholder="$t('personInfo.choose')" style="width:200px">
                <el-option
                  v-for="item in shryKbnOptions"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="90px" :label="$t('logManagement.pgmId')">
               <el-input v-model="query.pgmId" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
            </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list"  style="width: 100%"  border class="operationCss" >
      <el-table-column :label="$t('logManagement.id')" prop="id" v-if="1===2" />
      <el-table-column :label="$t('logManagement.cntrCd')" prop="cntrCd" v-if="1===2" />
      <el-table-column :label="$t('logManagement.syriKbn')" prop="syriKbn" />
      <el-table-column :label="$t('logManagement.pgmId')" prop="pgmId" />
      <el-table-column :label="$t('logManagement.optStartDt')" prop="optStartDt" width="140px"/>
      <el-table-column :label="$t('logManagement.optEndDt')" prop="optEndDt" width="140px"/>
      <el-table-column :label="$t('logManagement.objStartDt')" prop="objStartDt" width="140px"/>
      <el-table-column :label="$t('logManagement.objEndDt')" prop="objEndDt" width="140px"/>
      <el-table-column :label="$t('logManagement.logStatus')" prop="logStatus" >
        <!-- R:处理中､0:正常终了､A:异常终了､!:注意､C:翌日継続､I:情報､?:再检讨 -->
        <template slot-scope="scope">
         <span v-if = "scope.row.logStatus == 'R'" >处理中</span>
         <span v-else-if = "scope.row.logStatus == '0'">正常终了</span>
         <span v-else-if = "scope.row.logStatus == 'A'">异常终了</span>
         <span v-else-if = "scope.row.logStatus == '!'">注意</span>
         <span v-else-if = "scope.row.logStatus == 'C'">持续到次日</span>
         <span v-else-if = "scope.row.logStatus == 'I'">信息</span>
         <span v-else-if = "scope.row.logStatus == '?'">再检查</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('logManagement.logComment')" prop="logComment"  width="160px"/>
      <el-table-column :label="$t('logManagement.newType')" prop="newType" />
    </el-table>
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
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
      shryKbnOptions:[{code:'00',text:'WEB端'},
      {code:'01',text:'客户端'},
      {code:'02',text:'服务器'},
      {code:'03',text:'数据库'},
      {code:'04',text:'移动端'}],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total: 0,
      list: [
        {cntrCd:'1',
          id:'1',
          syriKbn:'WEB端',
          pgmId:'SA01',
          optStartDt:'2019/03/10 10:01:00',
          optEndDt:'2019/03/10 10:02:00',
          objStartDt:'2019/03/10 10:01:00',
          objEndDt:'2019/03/10 10:02:00',
          logStatus:'!',
          logComment:'内容comment',
          newType :'最新数据',

        }
      ],
      detailList: [
        {
          cntrCd:'1',
          logId:'1',
          logLineNo:'1',
          syriKbn: '客户端',
          pgmId:'SA01',
          optStartDt:'2019/03/10 10:01:00',
          managNm:'管理A',
          subOptStartDt:'2019/03/10 10:01:00',
          subOptEndDt:'2019/03/10 10:02:00',
          dataNum:'1',
          logStatus:'1情報',
        }
      ],
      logManagementForm: {
          cntrCd:'1',
          id:'1',
          syriKbn:'1',
          pgmId:'SA01',
          optStartDt:'2019/03/10 10:01:00',
          optEndDt:'2019/03/10 10:02:00',
          objStartDt:'2019/03/10 10:01:00',
          objEndDt:'2019/03/10 10:02:00',
          logStatus:'!',
          logComment:'内容comment',
          newType :'最新数据',
      },
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
      listLoading: false,
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
        optStartDt:'',
        optEndDt:'',
        logStatus:'',
        logComment:'',
        syriKbn:'',
        pgmId:'',
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
    // resetDialog() {
    //   this.$refs['logManagementForm'].resetFields()
    // },
    // handleCreate() {
    //   // this.$router.push({ path: 'caseManagementOver'})
    //   this.dialogVisible = true
    //   this.dialogTitle = this.$t('route.logManagementOver')
    // },
    //根据项目id 获取项目状态（限制所有按钮disable）项目开始日期+结束日期（限制所有日期的地方有限制）
    projectInformation(){
        let proIds = this.query.isPublish;
        // apiProTasks.getProject({progressID:proIds}).then(response => {
        //   if(response.status == '0'){//项目状态关闭
        //     // console.log('项目状态关闭',response);
        //     this.clickable = true;
        //   }else{//项目状态没关闭
        //     this.clickable = false;
        //     // console.log('项目状态未关闭');
        //   }
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
    //详情跳转
    projectDelete(index,row){
      console.log('row',row);
      this.$router.push({ path: 'caseManagementOver'})
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
