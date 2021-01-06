<template>
    <!--角色弹窗画面-->
    <div>
      <el-row :gutter="20" class="toolbar" >        
        <el-form ref="query" :model="query" :inline="true" class="form-float">
          <el-col :span="6" style="padding-bottom: 0px;margin:0px;">
              <el-form-item :label="$t('personnelManagement.cntrCd')">
                  <el-select v-model="query.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')" style="width:100px">
                    <el-option
                      v-for="item in cntrOptions"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code"/>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="9" style="padding-bottom: 0px;margin:0px;">
              <el-form-item :label="$t('personnelManagement.relation.orgId')">
                <el-input v-model="query.orgCd" clearable :placeholder="$t('placeholders.content')" style="width:120px"/>
                <el-button icon="el-icon-more" type="primary" circle  @click="handleEdit('dept')" />
              </el-form-item>
          </el-col>
          <el-col :span="7" style="padding-bottom: 0px;margin:0px;">
              <el-form-item :label="$t('role.text')">
                <el-input v-model="query.roleNm" clearable :placeholder="$t('placeholders.content')" style="width:120px"/>
              </el-form-item>
          </el-col>
          <el-col :span="2" style="padding-bottom: 0px;margin:0px;">
            <el-button type="primary" icon="el-icon-search" style="margin-right:5px;float:right" @click="personList">{{ $t('operation.query') }}</el-button>
          </el-col>
          </el-form>
      </el-row>
      <el-table :data="gridData" border @selection-change="handleSelectionChange" style="padding:0px;margin:0px;">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column property="orgId" :label="$t('personnelManagement.relation.orgId')" width="150"></el-table-column>
        <el-table-column property="roleNm" :label="$t('personnelManagement.relation.roleNm')" width="200"></el-table-column>
        <el-table-column property="roleDis" :label="$t('personnelManagement.relation.roleDis')" width="250"></el-table-column>
        <!-- <el-table-column property="sysRetainFlg" :label="$t('personnelManagement.relation.sysRetainFlg')" width="80"></el-table-column> -->
        <!-- <el-table-column property="roleLevel" :label="$t('personnelManagement.relation.roleLevel')" width="80"></el-table-column> -->
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
      <el-button icon="el-icon-close" @click="close_add_edit">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="close_add_edit">确 定</el-button>
      </div> -->
      <div style="padding-top: 10px;margin:0px;">
          <el-button type="primary" icon="el-icon-check" @click="close_add_edit">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
      </div>
    </div>
</template>

<script>

import Editor from '@/components/Editor'
export default {
    components: {
        Editor,
    },
    props:{
      editorVisible:{
        type:Boolean,
        required:true
      }
    },
    data() {
        return {
            cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],

            gridData: [{
              cntrCd: '上海提桥',
              roleNm:'超级管理',
              roleDis:'系统数据管理者',
              orgId:'生产部',
              sysRetainFlg:'是',
              roleLevel:'1级',
            }, {
              cntrCd: '上海提桥',
              roleNm:'部门经理',
              roleDis:'生产部数据管理者',
              orgId:'生产部',
              sysRetainFlg:'是',
              roleLevel:'2级',
            }, {
              cntrCd: '上海提桥',
              roleNm:'组长',
              roleDis:'管理组员',
              orgId:'生产部',
              sysRetainFlg:'是',
              roleLevel:'3级',
            }, {
              cntrCd: '上海提桥',
              roleNm:'员工',
              roleDis:'生产者',
              orgId:'生产部',
              sysRetainFlg:'是',
              roleLevel:'4级',
            }],
            dateIsName:'',//区分是项目任务调用还是我的任务调用。
            distinguishName:'',//区分编辑跟添加的方法。
            isDisabled:false,//区别模块项目需求,有默认，可点
            projectStartDate:'',
            projectEndDate:'',
            id:'',
            query: {
              page: 1,
              limit: 10,
              status: '',
              isEnabled: '',
              isPublish: '',
              loginId:'',
              cntrCd:'1',
              workId:'',
              roleNm:'',
              orgId: '生产部',
            },
            MyData: {
              proId:'',
              modId:'',
              demandId:'',
              receiver:'',
              personLiable:'',
              taskType:'',
              priorityLevel:'',
              plannedEndDate: '',//结束时间
              plannedStartDate: '',//开始时间
              taskNm:'',

              schedule:[],
            },
            taskTypes:[],
            projectList:[],//项目
            subordinateModules:[],//模块
            relevantRequirements:[],//需求
            assigneds:[],
            headPens:[],
            priority:[],
            rules: {
                taskType: [
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                proId:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                modId:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                demandId:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                taskNm:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                receiver:[
                { required: true, message: this.$t('common.required'),trigger: 'blur' }
                ],
                personLiable:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
                schedule:[
                  // plannedEndDate:[
                  { required: true, message: this.$t('common.required'),  trigger: 'blur' }
                  // ],
                  // plannedStartDate:[
                  // { validator: validateNulldate, trigger: 'blur' }
                  // ],
                ],
                priorityLevel:[
                { required: true, message: this.$t('common.required'), trigger: 'blur' }
                ],
            },
            pickerOptions:{
              disabledDate:(time) => {
                return this.dealDisabledDate(time)
              }
            },
      };
  },
  created() {

  },
  methods:{
        // 保存提交
    confirmSubmit(){
       this.dialogVisible = false;
    },
    dealDisabledDate(time){
      if(this.projectStartDate != '' && this.projectEndDate != ''){
        let projectStartDate = new Date(this.projectStartDate);
        let projectEndDate = new Date(this.projectEndDate);
        return time.getTime() < projectStartDate.getTime()- 8.64e7  || time.getTime() > projectEndDate.getTime();
      }
    },
    //获取项目开始+结束时间
    proStatus(){
    },
    empty(){//子组件关闭时
        id:'',
        this.MyData={
          proId:'',
          modId:'',
          demandId:'',
          receiver:'',
          taskNm:'',
          personLiable:'',
          taskType:'',
          priorityLevel:'',
          duration:'',
          plannedEndDate: '',//结束时间
          plannedStartDate: '',//开始时间
          schedule:[],
        },
        this.projectStartDate='';
        this.projectEndDate='';
        this.distinguishName = '';
        this.taskTypes=[];
        this.projectList=[];
        this.subordinateModules=[];
        this.relevantRequirements=[];
        this.assigneds=[];
        this.headPens=[];
        this.isDisabled = false;//可点击、
        this.$parent.$parent.personList();
    },

    handleSelectionChange(val) {
      this.dataVal = val;
      this.multipleSelection = val;
    },
    close_add_edit(){//取消的关闭
    debugger
      this.$emit("closeHide",false);
      this.empty();
      this.isDisabled = false;//可点击
      this.$parent.$parent.personList();
    },
    //--项目需求 --添加任务->
    identifying(val,name){
      let id = val.demandId;
      this.distinguishName = 'addForm';
      if(id != ''){//需求id不为空,项目，模块，需求都不可点
        this.isDisabled = true;//不可点击
      }else{
        this.isDisabled = false;//可点击
      }
      this.getAllProjects(val,'otheradd');
      this.getEnabled('','add');//任务类型+优先级
    },
    //添加
    addProject(addProIds){
      this.distinguishName = 'addForm';
      this.getEnabled(addProIds,'add');//任务类型+优先级,
      this.getAllProjects(addProIds,'add');
      this.proStatus();
    },

     // 项目查询下拉框
    getAllProjects(val,name) {
      if(name == 'update'){//编辑
        this.MyData.proId = val.proId
      }else if(name == 'otheradd'){//分解需求的proid默认
        this.MyData.proId = val.proId
      }else{//添加 且 //选中change时
        this.MyData.proId = val
      }
      // apiProject.getAllProjects().then(response =>{
      //     this.projectList = response
      // })
      //如果我有项目id，继续往下执行
      if(this.MyData.proId){//先有项目id，再执行模块获取
          // console.log('项目的val，',val);
         this.acquisitionModule(val,name);
         this.acquisitAssignedsHeadPens(val,name);
      }else{//模块ID不存在，清空所有关联的默认id，但是不清空selcet下的内容。
        this.MyData.modId = '';
        this.MyData.demandId = '';
        this.MyData.receiver = '';
      }
    },
    //指派给+负责人
    acquisitAssignedsHeadPens(val,name){
      let term = this.MyData.proId;
    },
    //根据项目，来获取所属模块
    acquisitionModule(val,name){
      let term = this.MyData.proId;
    },
    //根据模块，来获取所属需求
    acquisitionDemand(val,name){
      let term = this.MyData.modId;
    },

    getEnabled(val,name) {
      let b = 'TASK_TYPES'//任务类型
      let g ='IS_PRIORITY';//优先级
      let arrTmp = [b,g];
      for(let i of arrTmp){
      }

    },
    //计算天数差  -》任务时长
    durationDate(startDate,endDate){
     let tempDate, cont;
      startDate = Date.parse(startDate);
      endDate = Date.parse(endDate);
      tempDate = Math.abs(endDate - startDate);
      cont = Math.floor(tempDate / (24 * 3600 * 1000));
      return cont+1
    },
    personList() {
    },

    projectInformation(){
    },

    isStatues(id){//任务状态id
    },
      //新增+编辑保存的方法
    savePerson() {
    },



  }
};
</script>
<style>
.tasks-addEditor .el-form-item{
  text-align: left;
}
.tasks-addEditor .el-card__body{
   height: 100%;
}
.tasks-addEditor .el-select{
  width: 100%;
}

.tasks-addEditor  .el-range-editor--mini.el-input__inner{
  width: 100%;
}
</style>
