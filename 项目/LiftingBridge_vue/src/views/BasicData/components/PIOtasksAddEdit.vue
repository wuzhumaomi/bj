<template>
    <!--提示信息的 -- 新增 + 编辑-->
    <div>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form class="tasks-addEditor" ref="MyaddEditorRef"  :model="edit" :rules="rules"   label-position="right" label-width="120px" size="mini">
            <el-card shadow="never">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <!-- <el-form-item  :label="$t('promptInformationOverview.center')" prop="proId">
                    <el-select v-model="MyData.proId" :disabled="isDisabled" :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                      <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
                    </el-select>
                    </el-form-item> -->
                    <el-form-item :label="$t('common.cntrCd')" label-width="110px">
                      <el-select disabled v-model="cntrList.value" :placeholder="$t('上海题桥')">
                        <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item  :label="$t('promptInformationOverview.errId')" prop="errId">
                        <el-input  clearable v-model="edit.errId" :placeholder="$t('placeholders.content')"  maxlength="20"/>
                    </el-form-item>
                    <el-form-item  :label="$t('promptInformationOverview.errSummary')" prop="errSummary">
                      <el-input  clearable v-model="edit.errSummary" :placeholder="$t('placeholders.content')" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-form-item :label="$t('promptInformationOverview.langType')" prop="langType">
                      <el-select v-model="edit.langType"  :placeholder="$t('personInfo.choose')">
                        <el-option v-for="item in langType" :key="item.id" :label="item.value" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('promptInformationOverview.errType')" prop="errType">
                      <el-select v-model="edit.errType"  :placeholder="$t('personInfo.choose')">
                        <el-option v-for="item in errType" :key="item.id" :label="item.value" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item  :label="$t('promptInformationOverview.errInfo')" prop="errInfo">  -->
                        <!-- v-if="this.$emit('closeHide',false)" -->
                        <!-- <Editor ref="editor" v-model="MyData.remark" :disabled="false" v-if="editorVisible"/> -->
                      <!-- <el-input clearable v-model="edit.errInfo" rows="2" cols="100" type="textarea" >
                      </el-input>
                    </el-form-item> -->
                    <el-form-item  :label="$t('promptInformationOverview.errInfo')" prop="errInfo">
                      <el-input  clearable v-model="edit.errInfo" :placeholder="$t('placeholders.content')" />
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
          <div class="Btnfooter">
              <el-button type="primary" icon="el-icon-check" @click="close_add_edit">{{ $t('common.save') }}</el-button>
              <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
          </div>
          <!-- <el-button type="primary" style="margin-top:60px;float:right" @click="projectInformation()">{{ $t('operation.save') }}</el-button>
          <el-button type="info" style="margin-top:60px;float:right;margin-right:5px" @click="close_add_edit">{{ $t('operation.cancel') }}</el-button> -->
        </el-col>
      </el-row>
    </div>
</template>

<script>
// import {apiProject,apiProTasks,apiClass,apiDemand } from '@/api'
// import { baseURL } from '@/config'
// import moment from 'moment'

import Editor from '@/components/Editor'
// import { debug } from 'util';
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
        let validateNull = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('不能为空'));
          }else{
              callback();
          }
        };
        let validateNulldate = (rule, value, callback) => {
          // console.log('val',value);
          if(value != null && value.length != '0'){
              callback();
          }else{
              return callback(new Error('不能为空'));
          }

        };
        return {
            cntrList: [
              { id: '001', value: '上海提桥' },
              { id: '002', value: '江苏提桥' }
            ],
            langType: [
              { id: '01', value: '日语(JP)' },
              { id: '02', value: '英语(EN)' },
              { id: '03', value: '中文(CN)' }
            ],
            errType: [
              { id: '01', value: '提示信息(I)' },
              { id: '02', value: '报错信息(E)' },
              { id: '03', value: '警告信息(W)' }
            ],
            
            dateIsName:'',//区分是项目任务调用还是我的任务调用。
            distinguishName:'',//区分编辑跟添加的方法。
            isDisabled:false,//区别模块项目需求,有默认，可点
            projectStartDate:'',
            projectEndDate:'',
            id:'',
            edit:{
              // promptID: '0001',
              // promptContent: '请输入数字或字母',
              // wordsDistinguish:'中文',
              // promptMessageDif:'提示信息(I)',
              // promptSummary: '提示信息概要',
              // promptMessageCon: '提示信息内容',

              errId:'0001',
              langType:'中文',
              errType:'报错信息(E)',
              errSummary:'输入校验',
              errInfo:'请输入英文和数字'
            },
            // MyData: {
            //   proId:'',
            //   modId:'',
            //   demandId:'',
            //   receiver:'',
            //   personLiable:'',
            //   taskType:'',
            //   priorityLevel:'',
            //   plannedEndDate: '',//结束时间
            //   plannedStartDate: '',//开始时间
            //   // modId:'',
            //   // demandId:'',
            //   taskNm:'',

            //   // assigned:'',
            //   // priority:'',
            //   // description:'',
            //   // headPen:'',
            //   schedule:[],
            // },
            taskTypes:[],
            projectList:[],//项目
            subordinateModules:[],//模块
            relevantRequirements:[],//需求
            assigneds:[],
            headPens:[],
            priority:[],
            rules: {
                // taskType: [
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // proId:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // modId:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // demandId:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // taskNm:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // receiver:[
                // { required: true, message: this.$t('common.required'),trigger: 'blur' }
                // ],
                // personLiable:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
                // schedule:[
                //   // plannedEndDate:[
                //   { required: true, message: this.$t('common.required'),  trigger: 'blur' }
                //   // ],
                //   // plannedStartDate:[
                //   // { validator: validateNulldate, trigger: 'blur' }
                //   // ],
                // ],
                // priorityLevel:[
                // { required: true, message: this.$t('common.required'), trigger: 'blur' }
                // ],
            },
            pickerOptions:{
              disabledDate:(time) => {
                return this.dealDisabledDate(time)
              }
            },
            rules: {
                errId: [{ required: true,message:'提示信息ID不能为空'}],
                langType: [{ required: true,message:'言语区分不能为空'}],
                errSummary: [{ required: true,message:'提示信息概要不能为空'}],
                errInfo: [{ required: true,message:'提示信息内容不能为空'}],
                // zoneNm: [{ required: true,message:'区域名不能为空'}]
      },
      };
  },
  created() {

  },
  methods:{
    dealDisabledDate(time){
      if(this.projectStartDate != '' && this.projectEndDate != ''){
        let projectStartDate = new Date(this.projectStartDate);
        let projectEndDate = new Date(this.projectEndDate);
        return time.getTime() < projectStartDate.getTime()- 8.64e7  || time.getTime() > projectEndDate.getTime();
      }
    },
    //获取项目开始+结束时间
    proStatus(){
        // apiProTasks.getProject({progressID:this.MyData.proId}).then(response => {
        //   this.projectStartDate = response.startDate;
        //   this.projectEndDate = response.endDate;
        // }).catch(() => {
        //   console.log('获取项目的信息失败。');
        // });
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

    close_add_edit(){//取消的关闭
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
      // this.projectStartDate = data.projectStartDate;//项目开始日期
      // this.projectEndDate = data.projectEndDate;//项目结束日期
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
      // console.log('this指派给+负责人name',name);
      // console.log('this指派给+负责人',val);
      let term = this.MyData.proId;
      // console.log('proIdproId2',this.MyData.proId);
      // apiProject.getProjectTeam({id:term}).then(response =>{
      //   // console.log('this指派+负责response',response);
      //     this.assigneds = response.list
      //     this.headPens = response.list
      //     // for(let i of response.list){//加载进入时的select默认,现默认0，后改变的时候，
      //       if(name == 'add'){
      //         this.MyData.receiver = response.list[0].personId
      //         this.MyData.personLiable = response.list[0].personId
      //       }else if(name == 'update'){
      //         this.MyData.receiver = val.receiver
      //         this.MyData.personLiable = val.personLiable
      //       }else{//change
      //         this.MyData.receiver = response.list[0].personId
      //         this.MyData.personLiable = response.list[0].personId
      //       }
      //     // }

      // })
    },
    //根据项目，来获取所属模块
    acquisitionModule(val,name){
      // console.log('模块的val，',val);
      // console.log('this模块',val);
      // console.log('this模块name',name);
      let term = this.MyData.proId;
      // console.log('proIdproId2',this.MyData.proId);
      // apiProject.getAllProjectModules({id:term}).then(response =>{
      //   // console.log('this模块response',response);
      //     this.subordinateModules = response
      //     if(response !='' ){
      //       if(name == 'add'){
      //         this.MyData.modId = response[0].id
      //       }else if(name == 'update'){
      //         this.MyData.modId = val.modId
      //       }else if(name == 'change'){//change//项目改变
      //           this.MyData.modId = response[0].id
      //       }else if(name == 'Modulechange'){//模块改变
      //         this.MyData.modId = val;
      //       }else if(name == 'otheradd'){
      //         this.MyData.modId = val.modId;
      //       }
      //     }else{
      //       this.subordinateModules = '';
      //       this.MyData.modId = '';
      //     }

      //     if(this.MyData.modId){//先有模块id，再执行需求获取
      //       this.acquisitionDemand(val,name);
      //     }else{//模块ID不存在，清空需求。
      //       this.relevantRequirements = '';
      //       this.MyData.demandId = '';
      //     }

      // })
    },
    //根据模块，来获取所属需求
    acquisitionDemand(val,name){
      let term = this.MyData.modId;
      // console.log('this需求',val);
      // console.log('this需求name',name);
      // apiDemand.getProjectDemandt({modId:term}).then(response =>{
      //     // console.log('this需求response',response);
      //     this.relevantRequirements = response
      //       if(response !='' ){
      //         if(name == 'add'){
      //           this.MyData.demandId = response[0].id
      //         }else if(name == 'update'){
      //           this.MyData.demandId = val.demandId
      //         }else if(name == 'Modulechange' || name == 'change'){//change
      //           this.MyData.demandId = response[0].id
      //         }else if(name == 'otheradd'){
      //           this.MyData.demandId = val.id;
      //         }else{//需求改变
      //            this.MyData.demandId = val;
      //         }
      //       }else{
      //         this.relevantRequirements = '';
      //         this.MyData.demandId= '';
      //       }
      //   // console.log('demandId',this.MyData.demandId);
      // })
    },

    getEnabled(val,name) {
      let b = 'TASK_TYPES'//任务类型
      let g ='IS_PRIORITY';//优先级
      let arrTmp = [b,g];
      for(let i of arrTmp){
        // apiClass.listClass({ parentCode: i }).then(response => {
        //   if(i == 'TASK_TYPES'){
        //     // console.log('任务类型',response);
        //       this.taskTypes = response
        //       if(name == 'add'){
        //         this.MyData.taskType = response[0].code;
        //       }else{
        //         this.MyData.taskType = val.taskType;
        //       }

        //   }else if(i == 'IS_PRIORITY'){
        //     // console.log('优先级',response);
        //       this.priority = response
        //       if(name == 'add'){
        //         this.MyData.priorityLevel = response[0].code;
        //       }else{
        //         this.MyData.priorityLevel = val.priorityLevel;
        //       }

        //   }else{
        //     console.log('啥都没');
        //   }
        // })
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

    projectInformation(){
        // apiProTasks.getProject({progressID:this.MyData.proId}).then(response => {
        //   // console.log('获取项目信息成功。',response.startDate);
        //   // console.log('获取项目信息成功。',response.endDate);
        //   if(response.status == '0'){//项目状态关闭
        //     // console.log('项目状态关闭',response);
        //     this.clickable = '已关闭';
        //     this.$alert('当前数据已被修改，请重新加载！', '警告', {
        //       confirmButtonText: '确定',
        //       showClose:false,
        //       callback: action => {
        //         this.close_add_edit();
        //       }
        //     });
        //   }else{//项目状态没关闭
        //     this.clickable = '未关闭';
        //     if(this.id){//编辑
        //       this.isStatues(this.id);
        //       // console.log('项目状态未关闭');
        //     }else{//add
        //       this.savePerson();
        //     }

        //   }
        // }).catch(() => {
        //   console.log('获取项目信息失败。');
        // });
    },

    isStatues(id){//任务状态id
        // apiProTasks.getTaskDetails({taskId:id}).then(response => {
        //     this.statusId = response[0].status;
        //     if(this.statusId != '0' && this.statusId != '1'){//不相等，刷新父页面。弹框不出现，提示该状态已经更新。
        //       this.$alert('当前数据已被修改，请重新加载！', '警告', {
        //         confirmButtonText: '确定',
        //         showClose:false,
        //         callback: action => {
        //           this.close_add_edit();
        //         }
        //       });
        //     }else{
        //       this.savePerson();
        //     }
        // }).catch(() => {
        //   console.log('获取任务信息失败。');
        // });
    },
      //新增+编辑保存的方法
    savePerson() {
      // let distName = this.distinguishName;
      // this.$refs['MyaddEditorRef'].validate(valid => {
      //   if (valid) {
      //       if(distName === 'addForm'){//添加请求方法
      //           let para = this.MyData;
      //           para.plannedStartDate = moment(this.MyData.schedule[0]).format('YYYY-MM-DD HH:mm:ss')
      //           para.plannedEndDate = moment(this.MyData.schedule[1]).format('YYYY-MM-DD HH:mm:ss')
      //           para.parentId = '0';
      //           para.status = '0';
      //           para.progress = '0';
      //           para.duration = this.durationDate(para.plannedStartDate,para.plannedEndDate); // duration  任务时长
      //           //  console.log('添加参数add：',para);
      //           apiProTasks.AddInsertTask(para).then(response => {
      //             this.$message({
      //               message: this.$t('common.message.info_operation_success'),
      //               type: 'success'
      //             });
      //             if(this.isDisabled == false){//可点击区分刷新的是项目需求界面（不可点击）
      //               // console.log('项目任务界面');
      //               this.close_add_edit()
      //             }else{//项目任务界面（可点击）
      //             //  console.log('项目需求界面');
      //               this.close_add_edit()
      //               // location. reload();
      //               // this.$router.go(0)
      //             }

      //           })
      //       }else if(distName === 'editForm'){//编辑请求方法
      //         this.$confirm(this.$t('common.message.confirm_update'), this.$t('common.prompt'),{}).then(() => {
      //           let para = this.MyData;
      //           para.plannedStartDate = moment(this.MyData.schedule[0]).format('YYYY-MM-DD HH:mm:ss')
      //           para.plannedEndDate = moment(this.MyData.schedule[1]).format('YYYY-MM-DD HH:mm:ss')
      //           para.id = this.id;
      //           para.duration = this.durationDate(para.plannedStartDate,para.plannedEndDate); // duration  任务时长
      //           //  console.log('添加参数edit：',para);
      //           if(this.dateIsName === 'myMission'){//区分是项目任务的编辑？还是我的任务的编辑？  --》//我的任务界面的编辑
      //                 apiProTasks.updateMyTaskData(para).then(response => {
      //                   this.$message({
      //                     message: this.$t('common.message.info_operation_success'),
      //                     type: 'success'
      //                   });
      //                   this.close_add_edit()
      //                 })
      //           }else if(this.dateIsName === 'proTasks'){//项目任务界面的开始
      //                 apiProTasks.updateTasksData(para).then(response => {
      //                   this.$message({
      //                     message: this.$t('common.message.info_operation_success'),
      //                     type: 'success'
      //                   });
      //                   this.close_add_edit()
      //                 })
      //           }else{
      //             console.log('暂无区分方法。。');
      //           }

      //         }).catch(() => {
      //           console.log('取消修改了。。');
      //         });
      //       }else{
      //           console.log('暂无区分方法。。');
      //       }
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      // })
    },



  }
};
</script>
<style>
.Btnfooter{
  /* text-align: right; */
  margin-top:10px;
}
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
