<template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :model="query" :inline="true" label-width="100px" label-position="right">
      <div class="queryContent">
        <!--中心编号-->
        <!-- <el-form-item :label="$t('warehouse.cntrCd')" class="form-item">
          <el-select v-model="query.cntrCd"  clearable disabled  >
            <el-option v-for="item in cntrList"  :key="item.id" :label="item.cntrNm" :value="item.id"/>
          </el-select>
        </el-form-item> -->
        <!--名称-->
        <el-form-item :label="$t('levelManagement.levelNm')" class="form-item">
          <el-input v-model="query.levelNm"  clearable/>
        </el-form-item>
        <!--类型-->
        <el-form-item :label="$t('levelManagement.levelType')" class="form-item">
          <el-select v-model="query.levelType"  clearable>
            <el-option v-for="item in levelOptions" :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
          </el-select>
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="personList">{{ $t('operation.query') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addOrder()">{{ $t('operation.newlyAdded') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list" border style="width: 100%"  class="operationCss" >
      <el-table-column :label="$t('levelManagement.levelNm')" prop="levelNm" />
      <el-table-column :label="$t('levelManagement.levelType')" prop="levelType" >
        <template slot-scope="scope">
         <span v-if = "scope.row.levelType == '01'" >客户</span>
         <span v-else-if = "scope.row.levelType == '02'">供应商</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('levelManagement.pointUpperLimit')" prop="pointUpperLimit" />
      <el-table-column :label="$t('levelManagement.pointLowerLimit')" prop="pointLowerLimit" />
      <el-table-column :label="$t('levelManagement.remarks')" prop="remarks" />
      <el-table-column label="操作" width="120px" align="center" fixed="right">
        <template slot-scope="scope">
           <el-tooltip :content="$t('operation.edit')" effect="dark" placement="bottom">
             <el-button type="primary" size="mini" icon="el-icon-setting" plain circle @click="handleCreate('edit', scope.row)"></el-button>
          </el-tooltip>
           <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
             <el-button size="mini" icon="el-icon-delete" type="danger" plain circle @click="projectDelete(scope.$index, scope.row)"></el-button>
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
  <!-- 评价界面 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="dialogTitle" width="50%" @open="resetDialog" >
  <div class="app-container">
    <el-form ref="levelManagementForm"  :model="levelManagementForm" >
      <div class="editContent">
      <el-row >
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="120px" :label="$t('levelManagement.levelNm')">
               <el-input v-model="levelManagementForm.levelNm" clearable :placeholder="$t('placeholders.content')" style="width:390px"/>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;margin:0px;">
          <el-form-item label-position="right" label-width="120px" :label="$t('levelManagement.levelType')">
              <el-select v-model="levelManagementForm.levelType" clearable :placeholder="$t('personInfo.choose')" style="width:120px">
                <el-option
                  v-for="item in levelOptions"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code"/>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="120px" :label="$t('levelManagement.pointUpperLimit')">
               <el-input v-model="levelManagementForm.pointUpperLimit" clearable :placeholder="$t('placeholders.pureDigital')" style="width:120px"/>
            </el-form-item>
        </el-col>
        <el-col :span="10" style="padding-bottom: 0px;margin:0px;">
            <el-form-item label-position="right" label-width="120px" :label="$t('levelManagement.pointLowerLimit')">
               <el-input v-model="levelManagementForm.pointLowerLimit" clearable :placeholder="$t('placeholders.pureDigital')" style="width:120px"/>
            </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-bottom: 0px;">
          <el-form-item label-position="right" label-width="120px" :label="$t('levelManagement.remarks')">
            <el-input type="textarea" v-model="levelManagementForm.remarks"  clearable :placeholder="$t('placeholders.content')" style="width:390px"/>
          </el-form-item>
        </el-col>
      </el-row>
      </div>
      <!-- <el-row :gutter="20">
        <el-col :span="24" style="padding-bottom: 0px;">
          <el-form-item>
            <el-button icon="el-icon-close" style="margin-top:10px;float:left;margin-right:5px" @click="close_add_edit">{{ $t('operation.cancel') }}</el-button>
            <el-button icon="el-icon-check" type="primary" style="margin-top:10px;float:right" @click="close_add_edit">{{ $t('operation.save') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row> -->
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
  name:'levelManagement',
  components: {
    tasks_addEdit,
  },
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      levelOptions: [{code:'01',text:'客户'},{code:'02',text:'供应商'},{code:'03',text:'外发工厂'},{code:'04',text:'物流公司'}],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total: 0,
      levelManagementForm:{
        id:"1",
        cntrCd:'1',
        levelNm:'三星',
        levelType:'01',
        pointUpperLimit:'60',
        pointLowerLimit:'41',
        remarks:'备注',
      },
      list: [
        {id:"1",
        cntrCd:'1',
        levelNm:'五星',
        levelType:'01',
        pointUpperLimit:'100',
        pointLowerLimit:'81'},
        {id:"2",
        cntrCd:'1',
        levelNm:'四星',
        levelType:'01',
        pointUpperLimit:'80',
        pointLowerLimit:'61',
        },
        {id:"3",
        cntrCd:'1',
        levelNm:'三星',
        levelType:'01',
        pointUpperLimit:'60',
        pointLowerLimit:'41',
        },
        {id:"4",
        cntrCd:'1',
        levelNm:'二星',
        levelType:'01',
        pointUpperLimit:'40',
        pointLowerLimit:'21',
        },
        {id:"5",
        cntrCd:'1',
        levelNm:'一星',
        levelType:'01',
        pointUpperLimit:'20',
        pointLowerLimit:'0',
        },
      ],
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
      listLoading: false,
      dialogVisible: false,
      dialogTitle: '',
      // varChangeColor: false,
      titleName:'',
      // tasksData:'',
      query: {
        page: 1,
        limit: 10,
        cntrCd:'1',
        levelNm:'',
        levelType:'',
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
      this.$refs['levelManagementForm'].resetFields()
    },
    handleCreate(type) {
      // this.$router.push({ path: 'levelManagementOver'})
      if (type != undefined && type == 'edit') {
        this.dialogVisible = true
        this.dialogTitle = '编辑'
      } else {
        this.dialogVisible = true
        this.dialogTitle = '新建'
      }
    },
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
    padding: 0;
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
