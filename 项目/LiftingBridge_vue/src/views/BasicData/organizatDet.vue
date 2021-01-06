<template>
  <!-- 组织部门界面 -->
  <div class="administrator-list project-tasks">
    <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form ref="query" :model="query" :inline="true" class="form-float">
            <!--中心编号-->
            <el-form-item :label="$t('common.cntrCd')">
              <el-select clearable v-model="cntrList.value" :placeholder="$t('上海题桥')">
                <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
              </el-select>
             </el-form-item>
            <el-form-item :label="$t('organizatDepartment.organizatDepartmentCode')">
               <el-input  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <el-form-item :label="$t('organizatDepartment.organizatDepartmentName')">
               <el-input  clearable :placeholder="$t('placeholders.content')"/>
            </el-form-item>
            <!-- <el-button v-power="'createTask'" type="primary" style="float:right" @click="handleEdit()">{{ $t('organizatDepartment.projectsAdd') }}</el-button> -->
            <el-button type="primary" style="float:right" @click="customerEdit()">新增</el-button>
            <el-button type="primary" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
          </el-form>
        </el-col>
    </el-row>
    <el-table :data="list" border style="width: 100%"  class="operationCss" @row-dblclick="customerEdit()" v-loading="listLoading">
      <el-table-column :label="$t('organizatDepartment.orgCdDis')" prop="organizatDepartmentCode" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.orgCdDis }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('organizatDepartment.higherOrgCd')" show-overflow-tooltip  prop="meansCodedOrganizat" width="110px">
        <template slot-scope="scope"><span>{{ scope.row.higherOrgCd }}</span></template>
      </el-table-column> -->
      <el-table-column :label="$t('organizatDepartment.orgNm')" prop="epistaticCoding" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.orgNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.orgAbbr')" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.orgAbbr}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.orgEngNm')" width="150" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.orgEngNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.orgType')" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.orgType}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.isFinancial')" prop="organizatDepartmentCode" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.isFinancial }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.provincialCd')" show-overflow-tooltip  prop="meansCodedOrganizat" width="110">
        <template slot-scope="scope"><span>{{ scope.row.provincialCd }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.contactNm')" prop="epistaticCoding">
        <template slot-scope="scope">
          <span>{{scope.row.contactNm}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.tel')" width="150" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.fax')" width="120" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.fax}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.adrs')" prop="organizatDepartmentName" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.adrs}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.zipCode')" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.zipCode}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.email')" prop="organizatDepartmentName" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.remarks')" prop="organizatDepartmentName">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.orgPath')" prop="organizatDepartmentName" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.orgPath}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('organizatDepartment.whCd')" prop="organizatDepartmentName" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.whCd}}</span>
        </template>
      </el-table-column>
      

      <!-- 按钮 -->
      <el-table-column  fixed="right" :label="$t('channel.operation')" width="170">
        <template slot-scope="scope">
          <el-tooltip  :content="$t('operation.edit')" placement="bottom">
            <el-button icon="el-icon-setting" size="mini" circle type="primary" plain @click="customerEdit() "></el-button><!-- 编辑 -->
          </el-tooltip>
          <el-tooltip  :content="$t('operation.delete')"  effect="dark" placement="bottom">
            <el-button icon="el-icon-delete" size="mini" circle type="danger" plain @click="projectCancel(scope.$index, scope.row)"></el-button><!-- 取消 -->
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
    <!-- <project_start ref="projectStarts" />
    <project_cancel ref="projectCancels" />
    <project_complete ref="projectCompletes" /> -->
    <!-- 项目任务 -- 新增 + 编辑-->
    <!-- <el-dialog :close-on-click-modal="false" :title="titleName"  :visible.sync="dialogVisible"  :before-close="close_add_edit" width="85%">
        <tasks_addEdit ref="tasksAddEdits"  :editorVisible="dialogVisible" @closeHide="close_add_edit" />
    </el-dialog> -->
    <tasks_addEdit @func="getMsgFormSon" ref="customerEdits" />
  </div>
</template>

<script>
// import {apiProject,apiProTasks,apiClass} from '@/api'

import tasks_addEdit from '../BasicData/components/organizatEdit'
// import project_start from '../system/components/projectStart'
// import project_cancel from '../system/components/projectCancel'
// import project_complete from '../system/components/projectComplete'
import { debug } from 'util';
import moment from 'moment'
export default {
  name:'',
  components: {
    tasks_addEdit,
    // project_start,
    // project_cancel,
    // project_complete,
  },
  data() {
    return {
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      politicalOptions: [],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total:2,
      list: [
       {
        orgCdDis:'0001',
        higherOrgCd:'销售部',
        orgNm:'销售组',
        orgAbbr:'销售组',
        orgEngNm:'SalesGroup',
        orgType:'小组',
        isFinancial:'否',
        provincialCd:'110109',
        contactNm:'汪芜',
        tel:'18588888888',
        fax:'865928888777',
        adrs:'北京长宁路',
        zipCode:'201716',
        email:'1213234@qq.com',
        remarks:'备注',
        orgPath:'组织部门/组织部门1',
        whCd:'',
      },
       {
        orgCdDis:'0002',
        higherOrgCd:'生产部',
        orgNm:'生产组',
        orgAbbr:'生产组',
        orgEngNm:'ProductionGroup',
        orgType:'小组',
        isFinancial:'否',
        provincialCd:'110109',
        contactNm:'吴思',
        tel:'18588888888',
        fax:'865928888777',
        adrs:'松江区',
        zipCode:'201716',
        email:'1213234@qq.com',
        remarks:'备注',
        orgPath:'组织部门/组织部门2',
        whCd:'',
      }
      ],
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
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
        political:''
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
    clickRow(row){
      this.$router.push({
        path: '/proTasksPerson/'+ row.id,
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
    //客户组件
    customerEdit() {
      this.$refs.customerEdits.open()
    },

    //查看评价
    customerAppraise() {
      this.$refs.customerAppraises.open()
    },
    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
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
