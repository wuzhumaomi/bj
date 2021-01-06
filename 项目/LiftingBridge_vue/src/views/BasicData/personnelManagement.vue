<template>
  <!-- 人员管理界面 -->
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :model="query" label-width="80px" label-position="right" :inline="true">
      <div class="queryContent">
        <!-- 中心 -->
        <el-form-item :label="$t('personnelManagement.cntrCd')" class="form-item">
            <el-select v-model="query.cntrCd" >
              <el-option
                v-for="item in cntrOptions"
                :key="item.code"
                :label="item.text"
                :value="item.code"/>
            </el-select>
        </el-form-item>
        <!-- 人员编号 -->
        <el-form-item :label="$t('personnelManagement.userId')" class="form-item">
            <el-input v-model="query.userId" clearable />
        </el-form-item>
        <!-- 人员名称 -->
        <el-form-item :label="$t('personnelManagement.userNm')" class="form-item">
            <el-input v-model="query.userNm" clearable />
        </el-form-item>
        <!-- 人员英文名称 -->
        <el-form-item :label="$t('personnelManagement.userNmEn')" class="form-item">
            <el-input v-model="query.userNmEn" clearable />
        </el-form-item>
        <!-- 登陆账号 -->
        <el-form-item :label="$t('personnelManagement.loginId')" class="form-item">
            <el-input v-model="query.loginId" clearable />
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">{{ $t('operation.newlyAdded') }}</el-button>
          <el-button type="primary" icon="el-icon-search" @click="personList()">{{ $t('operation.query') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list" :default-sort = "{prop: 'loginId', order: 'descending'}" border style="width: 100%">
      <el-table-column prop="userId"  :label="$t('personnelManagement.userId')" width="120px" sortable>
      </el-table-column>
      <el-table-column prop="userNm"  :label="$t('personnelManagement.userNm')" width="120px" sortable>
      </el-table-column>
      <el-table-column prop="userNmEn"  :label="$t('personnelManagement.userNmEn')" width="120px" sortable>
      </el-table-column>
      <el-table-column prop="loginId"  :label="$t('personnelManagement.loginId')" >
      </el-table-column>
      <el-table-column prop="sexCd"  :label="$t('personnelManagement.sexCd')" width="80px" sortable>
      </el-table-column>
      <el-table-column prop="workId"  :label="$t('personnelManagement.workId')" width="120px" sortable>
      </el-table-column>
      <el-table-column prop="userKbn"  :label="$t('personnelManagement.userKbn')" >
      </el-table-column>
      <el-table-column prop="idCard"  :label="$t('personnelManagement.idCard')" width="160px">
      </el-table-column>
      <el-table-column prop="birth"  :label="$t('personnelManagement.birth')" width="160px">
      </el-table-column>
      <el-table-column prop="cellPhone"  :label="$t('personnelManagement.cellPhone')" width="110px">
      </el-table-column>
      <el-table-column prop="tel"  :label="$t('personnelManagement.tel')" width="110px">
      </el-table-column>
      <el-table-column prop="eMail"  :label="$t('personnelManagement.eMail')" width="160px">
      </el-table-column>
      <el-table-column prop="adrs"  :label="$t('personnelManagement.adrs')" width="200px">
      </el-table-column>
      <el-table-column prop="zipCode"  :label="$t('personnelManagement.zipCode')">
      </el-table-column>
      <el-table-column prop="remarks"  :label="$t('personnelManagement.remarks')">
      </el-table-column>
      <el-table-column :label="$t('common.actions')" width="90px"  fixed="right">
        <template slot-scope="scope">
           <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
             <el-button type="primary" size="mini" icon="el-icon-setting" circle plain @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
           <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
             <el-button type="danger" size="mini" icon="el-icon-delete" circle  plain @click="projectDelete(scope.$index, scope.row)"></el-button>
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

  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisibleMain" :title="titleName[0]" width="1000px" @open="resetDialog" style="padding-left:30px">
    <!-- 提示信息一览界面 -->
    <div class="app-container">
      <el-form ref="personnelManagementForm" label-width="100px" label-position="right"  :model="personnelManagementForm" >
        <div class="editContent">
        <el-row :gutter="20">
          <!-- 中心        -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.cntrCd')" prop="cntrCd">
              <el-select v-model="personnelManagementForm.cntrCd" >
                <el-option
                  v-for="item in cntrOptions"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 人员编号    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.userId')" prop="userId">
              <span>{{personnelManagementForm.userId}}</span>
            </el-form-item>
          </el-col>
          <!-- 人员名称    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.userNm')" prop="userNm">
              <el-input v-model="personnelManagementForm.userNm" clearable  maxlength="50"/>
            </el-form-item>
          </el-col>
          <!-- 登录帐号    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.loginId')" prop="loginId">
              <el-input v-model="personnelManagementForm.loginId"  clearable maxlength="50"/>
            </el-form-item>
          </el-col>
          <!-- 人员英文名称-->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.userNmEn')" prop="userNmEn">
              <el-input  v-model="personnelManagementForm.userNmEn" clearable  maxlength="50"/>
            </el-form-item>
          </el-col>
          <!-- 性别        -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.sexCd')" prop="sexCd">
              <el-select v-model="personnelManagementForm.sexCd" >
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.generalCd"
                    :label="item.generalNm"
                    :value="item.generalCd"/>
                </el-select>
            </el-form-item>
          </el-col>
          <!-- 工号        -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.workId')" prop="workId">
              <el-input v-model="personnelManagementForm.workId"  clearable  maxlength="50"/>
            </el-form-item>
          </el-col>
          <!-- 用户区分    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.userKbn')" prop="userKbn">
              <el-select v-model="personnelManagementForm.userKbn" >
                  <el-option
                    v-for="item in userKbnOptions"
                    :key="item.generalCd"
                    :label="item.generalNm"
                    :value="item.generalCd"/>
                </el-select>
            </el-form-item>
          </el-col>
          <!-- 身份证号    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.idCard')" prop="idCard">
              <el-input v-model="personnelManagementForm.idCard"  clearable maxlength="20"/>
            </el-form-item>
          </el-col>
          <!-- 生日        -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.birth')" prop="birth">
              <el-date-picker v-model="personnelManagementForm.birth" type="date" clearable value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <!-- 手机号码    -->     
          <el-col :span="7" >
            <el-form-item :label="$t('personnelManagement.cellPhone')" prop="cellPhone">
              <el-input v-model="personnelManagementForm.cellPhone"  clearable  maxlength="20"/>
            </el-form-item>
          </el-col>
          <!-- 电话        -->     
          <el-col :span="7" >
              <el-form-item :label="$t('personnelManagement.tel')" prop="tel">
                <el-input v-model="personnelManagementForm.tel"  clearable  maxlength="50"/>
              </el-form-item>
          </el-col>
          <!-- 邮箱        -->     
          <el-col :span="7" >
              <el-form-item :label="$t('personnelManagement.eMail')" prop="eMail">
                <el-input v-model="personnelManagementForm.eMail"  clearable  maxlength="100"/>
              </el-form-item>
          </el-col>
          <!-- 住址        -->     
          <el-col :span="21" >
              <el-form-item :label="$t('personnelManagement.adrs')" prop="adrs">
                <el-input v-model="personnelManagementForm.adrs"  clearable  maxlength="100"/>
              </el-form-item>
          </el-col>
          <!-- 邮编        -->     
          <el-col :span="7" >
              <el-form-item :label="$t('personnelManagement.zipCode')" prop="zipCode">
                <el-input v-model="personnelManagementForm.zipCode"  clearable  maxlength="10"/>
              </el-form-item>
          </el-col>
          <!-- 备注        -->
          <el-col :span="21" >
              <el-form-item :label="$t('personnelManagement.remarks')" prop="remarks">
                <el-input type="textarea" v-model="personnelManagementForm.remarks"  clearable  maxlength="200"/>
              </el-form-item>
          </el-col>
        </el-row>
        </div>
        <el-card shadow="always" class="tab_border" style="height:200px;overflow-y:auto">
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
              <el-table-column :label="$t('personnelManagement.relation.orgCd')"  width="250" hidden>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.orgNm" :readonly="true" >
                    <el-button slot="append" circle icon="el-icon-more" type="primary" id="el-input__more" @click="handleEdit('dept', scope.row, scope.$index)"/>
                  </el-input>
                  </template>
              </el-table-column>
              <el-table-column :label="$t('personnelManagement.relation.roleCd')"  width="250">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.roleNm" :readonly="true">
                    <el-button slot="append" circle icon="el-icon-more" type="primary" id="el-input__more" @click="handleEdit('role', scope.row, scope.$index)" />
                  </el-input>
                </template>
              </el-table-column>
              <!-- 默认 -->
              <el-table-column :label="$t('personnelManagement.relation.defCpyFlg')"  width="60">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.defCpyFlg" true-label="1" false-label="0" />
                </template>
              </el-table-column>
              <!-- 本公司部门 -->
              <!-- <el-table-column :label="$t('personnelManagement.relation.defOrgType')"  width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.defOrgType"  >
                    <el-option
                      v-for="item in defOrgTypeOptions"
                      :key="item.generalCd"
                      :label="item.generalNm"
                      :value="item.generalCd"/>
                  </el-select>
                </template>
              </el-table-column> -->
              <el-table-column :label="$t('common.actions')"  fixed="right">
                <template slot-scope="scope">
                  <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                    <el-button  type="danger" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,scope.row)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
                </el-table>
              </el-col>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="titleName[1]"  :visible.sync="dialogVisible"  :before-close="close_add_edit" width="60%" :append-to-body="true">
            <role_addEdit ref="rolesAddEdits"  :editorVisible="dialogVisible" @closeHide="close_add_edit" />
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :title="titleName[1]"  :visible.sync="dialogVisibleDep"  :before-close="close_add_edit2" width="70%" :append-to-body="true">
            <dept_addEdit ref="deptsAddEdits"  :editorVisible="dialogVisibleDep" @closeHide="close_add_edit2" />
        </el-dialog>
        <!-- <el-row :gutter="20">
          <el-col :span="24" style="padding-bottom: 0px;">
            <el-form-item>
              <el-button icon="el-icon-close" style="margin-top:10px;float:left;margin-right:5px" @click="close_add_editMain">{{ $t('operation.cancel') }}</el-button>
              <el-button icon="el-icon-check" type="primary" style="margin-top:10px;float:right" @click="projectInformation()">{{ $t('operation.save') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
        <div class="Btnfooter">
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="close_add_editMain">{{ $t('common.save') }}</el-button>
            <el-button icon="el-icon-close" @click="close_add_editMain">{{ $t('common.back') }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </el-dialog>
  </div>
</template>

<script>
import role_addEdit from '../BasicData/components/PMOtasksAddEdit'
import dept_addEdit from '../BasicData/components/DPtasksAddEdit'

export default {
  name:'PersonnelManagement',
  components: {
    role_addEdit,
    dept_addEdit,
  },
  data() {
    return {
      sexOptions: [{code:'1',text:'男'},{code:'2',text:'女'}],
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      userKbnOptions: [{code:'0',text:'正式工'},{code:'1',text:'临时工'}],
      total: 0,
      list: [
        {userId:'UCN00001',cntrCd:"1",userNm:"张三",userNmEn:"zhangsan",sexCd:"男",workId:"JTA1912010001"
        ,loginId:"C000001",userKbn:"临时工",idCard:"310107199911111111"
        ,cellPhone:"18000000000",tel:"52738654",eMail:"zs@tqt.com",adrs:"江苏省连云港市",zipCode:"200000",remarks:"备注1"
        ,disableFlg:"正常",picId:"60001",pid:'60001',approvalClsM:"退回后待修改"},
        {userId:'UCN00002',cntrCd:"1",userNm:"李四",userNmEn:"lisi",sexCd:"女",workId:"JTA1912010002"
        ,loginId:"C000002",userKbn:"临时工",idCard:"310107199912122222"
        ,cellPhone:"18000000000",tel:"52738654",eMail:"ls@tqt.com",adrs:"江苏省盐城市",zipCode:"200000",remarks:"备注2"
        ,disableFlg:"停用",picId:"60008",pid:"60008",approvalClsM:"修改后待计划组经理审批"},
        {userId:'UCN00003',cntrCd:"1",userNm:"冯五",userNmEn:"fengwu",sexCd:"男",workId:"JTA1912010003"
        ,loginId:"C000003",userKbn:"临时工",idCard:"310107199912133333"
        ,cellPhone:"18000000000",tel:"52738654",eMail:"fw@tqt.com",adrs:"江苏省黄桥市",zipCode:"200000",remarks:"备注3"
        ,disableFlg:"锁定",picId:"60012",pid:"60012",approvalClsM:"通过"},
        {userId:'UCN00004',cntrCd:"1",userNm:"庞六",userNmEn:"pangliu",sexCd:"男",workId:"JTA1912010004"
        ,loginId:"C000004",userKbn:"临时工",idCard:"310107199912134444"
        ,cellPhone:"18000000000",tel:"52738654",eMail:"pl@tqt.com",adrs:"江苏省启东市",zipCode:"200000",remarks:"备注4"
        ,disableFlg:"新建",picId:"60025",pid:"60025",approvalClsM:"通过"},
      ],
      dialogVisibleMain: false,
      dialogVisible: false,
      dialogVisibleDep: false,
      titleName:[],
      personnelManagementForm: 
        {cntrCd:"1",userId:'zhangsan',userNm:"张三",userNmEn:"zhangsan",sexCd:"男",workId:"JTA1912010001"
        ,loginId:"C000001",userKbn:"临时工",idCard:"310107199911111111"
        ,cellPhone:"18000000000",tel:"52738654",eMail:"zs@tqt.com",adrs:"江苏省连云港市",zipCode:"200000",remarks:"备注1"
        ,disableFlg:"正常",picId:"60001",pid:'60001',approvalClsM:"退回后待修改"},
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        loginId:'',
        cntrCd:'1',
        workId:'',
        userNm:'',
      },
      tableData1: [{
        orgCd: "1",
        orgNm: "生产部",
        roleCd: "1",
        roleNm: "主管",
        defCpyFlg: "1",
        defOrgType: "0",
      }],
    }
  },
  created() {
    return {}
  },
  computed: {
  },
  methods: {
    resetDialog() {
      // this.$refs['personnelManagementForm'].resetFields()
    },
    handleEdit(index, row) {
      if(index === undefined){
        this.dialogVisibleMain = true
        this.titleName[0] = '添加'
      }else if(index === 'edit'){
        this.dialogVisibleMain = true
        this.titleName[0] = '编辑';
      }else if(index === 'role'){
        this.dialogVisible = true
        this.titleName[1] = '角色选择'
        let addProIds = this.query.isPublish;//获取项目
        this.$refs.rolesAddEdits.addProject(addProIds);
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.addProject(addProIds);
        // })
      }else if(index === 'dept'){
        this.dialogVisibleDep = true
        this.titleName[1] = '部门选择';
        this.$refs.deptsAddEdits.dateIs(row,'');
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
      }

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
    personList() {
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
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelectorAll('.el-select__tags > span')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
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
    //关闭
    close_add_editMain(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleMain = false
      this.$refs.personnelManagementForm.empty();
    },

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
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding:10px;
}
.Btnfooter{
  margin-top:10px;
}
.el-card__body {
    height: 200px;
    padding: 0;
}

</style>
