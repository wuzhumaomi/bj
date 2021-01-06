<template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :offset="0" :model="query" :inline="true">
        <el-row class="toolbar" >
          <!-- <el-col :span="6" style="padding-bottom: 0px;">
            <el-form-item :label="$t('module.cntrCd')" >
              <el-select v-model="query.cntrCd" disabled="true" :placeholder="$t('module.chooseCntr')" style="width: 140px;" class="filter-item" >
                <el-option
                  v-for="item in cntrOptions"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code"/>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6" style="padding-bottom: 0px;">
            <el-form-item :label="$t('module.moduleCd')" >
              <el-input :placeholder="$t('module.moduleCd')" v-model="query.moduleCd" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-bottom: 0px;">
            <el-form-item :label="$t('module.moduleNm')" >
              <el-input :placeholder="$t('module.moduleNm')" v-model="query.moduleNm" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('common.create') }}</el-button>
          </el-col>
        </el-row>
    </el-form>

    <!-- <tree-table v-loading="loading" :data="data" :columns="columns" border/> -->
    <tree-table v-loading="loading" :data="data" :columns="columns" :expand-all="expandAll" border>
      <el-table-column :label="$t('common.actions')" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteData(scope.row)">{{ $t('common.delete') }}</el-button>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="handleCreate(scope.row)">{{ $t('class.childItem') }}</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <el-dialog :close-on-click-modal="false" :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" width="38%">
      <div class="app-container">
      <el-form ref="dataForm" :rules="rules" :model="editData" label-position="left" label-width="100px" style="width: 400px;">
        <div class="editContent">
        <!-- <el-form-item label-position="right" label-width="90px" :label="$t('module.cntrCd')" prop="code">
          <el-select v-model="editData.cntrCd" disabled="true" :placeholder="$t('module.chooseCntr')" style="width: 240px;" class="filter-item" >
            <el-option
              v-for="item in cntrOptions"
              :key="item.code"
              :label="item.text"
              :value="item.code"/>
          </el-select>
        </el-form-item> -->
        <el-form-item label-width="90px" label-position="right" :label="$t('module.moduleCd')" prop="code">
          <el-input v-model="editData.moduleCd"/>
        </el-form-item>
        <el-form-item label-position="right" label-width="90px" :label="$t('module.moduleNm')" prop="text">
          <el-input v-model="editData.moduleNm"/>
        </el-form-item>
        <el-form-item label-position="right" label-width="90px" :label="$t('module.moduleNmEn')" prop="text">
          <el-input v-model="editData.moduleNmEn"/>
        </el-form-item>
        <el-form-item label-position="right" label-width="90px" :label="$t('module.moduleUrl')" prop="url">
          <el-input v-model="editData.moduleUrl"/>
        </el-form-item>
        <el-form-item label-position="right" label-width="90px" :label="$t('module.remarks')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="editData.remarks" type="textarea"/>
        </el-form-item>
        <el-form-item label-position="right" label-width="90px" :label="$t('module.enabled')">
          <el-select v-model="editData.enabled" class="filter-item">
            <el-option v-for="item in optionsEnabled" :key="item.code" :label="item.text" :value="item.code"/>
          </el-select>
        </el-form-item>
        </div>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('common.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('common.confirm') }}</el-button>
      </div> -->
      </div>
      <div style="padding-top: 10px;margin:0px;">
          <el-button type="primary" icon="el-icon-check" @click="dialogFormVisible = false">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="dialogFormVisible = false">{{ $t('common.back') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTable'
// import { apiClass, apiModule } from '@/api'

const defaultEditData = {
  id: undefined,
  code: '1',
  text: 'sss',
  url: '',
  type: '00',
  parentId: undefined,
  sort: 0,
  remark: '',
  isEnabled: '1',
  creator: '',
  createTime: new Date(),
  updater: '',
  updateTime: new Date()
}

export default {
  name: 'ModuleManage',
  directives: {
    waves
  },
  components: { treeTable },
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      expandAll: true,
      loading: true,
      query: {
        cntrCd: '001',
        moduleCd: '',
        moduleNm: '',
        parentId: undefined,
        code: undefined,
        text: undefined
      },
      editData:{
        cntrCd: '1',
        moduleCd:'System',
        moduleNm:'系统模块',
        moduleNmEn:'System',
        moduleUrl:'system',
        remarks:'备注',
        enabled: '1',
      },
      optionsEnabled: [{code: "1",text: "启用"}],
      // editData: Object.assign({}, defaultEditData),
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitle: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      rules: {
        code: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        text: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        enabled: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }]
      },
      columns: [
        {
          text: this.$t('module.code'),
          value: 'code',
          width: 250
        },
        {
          text: this.$t('module.text'),
          value: 'text',
          width: 150
        },
        {
          text: this.$t('module.url'),
          value: 'url',
          width: 300
        },
        {
          text: this.$t('module.enabled'),
          value: 'enabled',
          width: 80
        },
        // {
        //   text: this.$t('module.remarks'),
        //   value: 'remarks',
        //   width: 300
        // }
      ],
      data: [{id:'023754f9a24111e9b6bf4cedfbc21591',code:'finish',text:'完成',type:'0',url:'',icon:'',icon_cls:'',parent_id:'241e993b9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8329861111',update_time:'43655.8329861111',}
    ,{id:'0683e3f9a38d11e9b6bf4cedfbc21591',code:'CreateProject',text:'创建项目',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4834259259',update_time:'43657.4834259259',children: [{id:'026c44ef9efa11e9b6bf4cedfbc21591',code:'create',text:'创建',type:'0',url:'',icon:'',icon_cls:'',parent_id:'6d36ec139ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6622569444',update_time:'43651.6622569444',}]}
    ,{id:'0a4a85c69efa11e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'6d36ec139ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6624074074',update_time:'43651.6624074074',}
    ,{id:'0bf424a9a24111e9b6bf4cedfbc21591',code:'cancel',text:'取消',type:'0',url:'',icon:'',icon_cls:'',parent_id:'241e993b9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8331712963',update_time:'43655.8478240741',}
    ,{id:'0fa71596a38d11e9b6bf4cedfbc21591',code:'EditProject',text:'编辑项目',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.483599537',update_time:'43657.483599537',}
    ,{id:'106f01a19ef211e9b6bf4cedfbc21591',code:'createRoleUser',text:'新增角色用户',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6227546296',update_time:'43651.6227546296',}
    ,{id:'11e5cdaaa24111e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'241e993b9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.833287037',update_time:'43655.8341435185',}
    ,{id:'130014bfa22d11e9b6bf4cedfbc21591',code:'createBug',text:'添加',type:'0',url:'',icon:'',icon_cls:'',parent_id:'360f0a9d9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7338888889',update_time:'43655.7338888889',}
    ,{id:'13dc124b9efa11e9b6bf4cedfbc21591',code:'delete',text:'删除',type:'0',url:'',icon:'',icon_cls:'',parent_id:'6d36ec139ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6625925926',update_time:'43651.6625925926',}
    ,{id:'1a3d7a689ee311e9b6bf4cedfbc21591',code:'ClassManage',text:'分类管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.5483912037',update_time:'43651.5483912037',}
    ,{id:'23c03f98a38d11e9b6bf4cedfbc21591',code:'ProjectModule',text:'项目模块',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4839930556',update_time:'43657.4839930556',}
    ,{id:'241e993b9ef511e9b6bf4cedfbc21591',code:'ProjectTasks',text:'项目任务',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6380555556',update_time:'43651.6380555556',}
    ,{id:'264c14829ef311e9b6bf4cedfbc21591',code:'ProjectManage',text:'项目管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6281597222',update_time:'43651.6281597222',}
    ,{id:'29aa774c9ef711e9b6bf4cedfbc21591',code:'Delay',text:'延期',type:'0',url:'',icon:'',icon_cls:'',parent_id:'886e63479ef611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6481018519',update_time:'43651.6481018519',}
    ,{id:'29b9b1229ee311e9b6bf4cedfbc21591',code:'StaffCalendar',text:'人员日历',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.5486921296',update_time:'43651.5486921296',}
    ,{id:'2a5207519efd11e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6779398148',update_time:'43651.6779398148',}
    ,{id:'31290e329efd11e9b6bf4cedfbc21591',code:'delete',text:'删除',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6780787037',update_time:'43651.6780787037',}
    ,{id:'3419d7e69ef311e9b6bf4cedfbc21591',code:'projectsList',text:'项目一览',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6284259259',update_time:'43651.6286921296',}
    ,{id:'360f0a9d9ef511e9b6bf4cedfbc21591',code:'BugManage',text:'BUG管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6384027778',update_time:'43651.6384027778',}
    ,{id:'371e6a3f9ee311e9b6bf4cedfbc21591',code:'RoleManage',text:'角色管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.5489467593',update_time:'43651.5489467593',}
    ,{id:'37d592d2a24011e9b6bf4cedfbc21591',code:'createTask',text:'添加项目任务',type:'0',url:'',icon:'',icon_cls:'',parent_id:'241e993b9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8290625',update_time:'43655.8290625',}
    ,{id:'38095eefa2b711e9b6bf4cedfbc21591',code:'editBug',text:'编辑bug',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.4206134259',update_time:'43656.4224421296',}
    ,{id:'39b361409ef711e9b6bf4cedfbc21591',code:'Close',text:'关闭',type:'0',url:'',icon:'',icon_cls:'',parent_id:'886e63479ef611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6484143519',update_time:'43651.6484143519',}
    ,{id:'3a188f3d9efd11e9b6bf4cedfbc21591',code:'createCategory',text:'添加分类项',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6782523148',update_time:'43651.6782523148',}
    ,{id:'3e826e36a22811e9b6bf4cedfbc21591',code:'Home',text:'首页',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7098726852',update_time:'43655.7098726852',}
    ,{id:'3f5b10249efb11e9b6bf4cedfbc21591',code:'create',text:'创建',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1a3d7a689ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6684143519',update_time:'43651.6732638889',}
    ,{id:'3fda29a4a9f211e9b6bf4cedfbc21591',code:'createProjectTasks',text:'添加任务',type:'0',url:'',icon:'',icon_cls:'',parent_id:'3419d7e69ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43665.6220949074',update_time:'43665.6220949074',}
    ,{id:'418e8329a38d11e9b6bf4cedfbc21591',code:'DocumentLibraryFile',text:'文档库文档',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4845717593',update_time:'43657.4845717593',}
    ,{id:'41d2039c9efc11e9b6bf4cedfbc21591',code:'createCategory',text:'添加分类项',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1a3d7a689ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6734259259',update_time:'43651.6734259259',}
    ,{id:'4303f314c7da11e9b6bf4cedfbc21591',code:'CreateOrderInfo',text:'销售订单详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'6598bcb4c26011e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43703.6805092593',update_time:'43703.6805092593',}
    ,{id:'44692fdd9ef511e9b6bf4cedfbc21591',code:'ProjectTeam',text:'项目团队',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6386805556',update_time:'43651.6386805556',}
    ,{id:'4525cc599ef711e9b6bf4cedfbc21591',code:'activation',text:'激活',type:'0',url:'',icon:'',icon_cls:'',parent_id:'886e63479ef611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6486342593',update_time:'43651.6486342593',}
    ,{id:'463f200ca22811e9b6bf4cedfbc21591',code:'WorkPlatform',text:'我的工作平台',type:'0',url:'',icon:'',icon_cls:'',parent_id:'3e826e36a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7100231481',update_time:'43655.7100231481',}
    ,{id:'486c8fd39efb11e9b6bf4cedfbc21591',code:'search',text:'搜索',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1a3d7a689ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.668587963',update_time:'43651.668587963',}
    ,{id:'4b045f059eea11e9b6bf4cedfbc21591',code:'saveRoles',text:'保存',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.5841319444',update_time:'43651.6202893518',}
    ,{id:'4b310b8f9ef311e9b6bf4cedfbc21591',code:'projectRequirements',text:'项目需求',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6288657407',update_time:'43651.6288773148',}
    ,{id:'4cf2be799ef811e9b6bf4cedfbc21591',code:'create',text:'新增',type:'0',url:'',icon:'',icon_cls:'',parent_id:'44692fdd9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6537615741',update_time:'43651.6626736111',}
    ,{id:'4cf48560a22811e9b6bf4cedfbc21591',code:'MyMission',text:'我的任务',type:'0',url:'',icon:'',icon_cls:'',parent_id:'3e826e36a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.710150463',update_time:'43655.710150463',}
    ,{id:'4ec460d2c7da11e9b6bf4cedfbc21591',code:'GenerateContact',text:'生成合同一览',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4303f314c7da11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43703.6807291667',update_time:'43703.6807291667',}
    ,{id:'51710d8a9efb11e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1a3d7a689ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6687615741',update_time:'43651.6687615741',}
    ,{id:'5da9bdf3a6e811e9b6bf4cedfbc21591',code:'QualityAssuranceDetail',text:'测试用例详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43661.7552546296',update_time:'43661.7552546296',}
    ,{id:'6598bcb4c26011e9b6bf4cedfbc21591',code:'SalesOrder',text:'销售订单',type:'0',url:'',icon:'',icon_cls:'',parent_id:'c0a2adc4c25b11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7097800926',update_time:'43696.7097800926',}
    ,{id:'67d8b985c25f11e9b6bf4cedfbc21591',code:'BasicDataManagement',text:'基础数据管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.704849537',update_time:'43696.704849537',}
    ,{id:'6867db26a22e11e9b6bf4cedfbc21591',code:'addingRequirements',text:'添加需求',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4b310b8f9ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7405092593',update_time:'43655.7405092593',}
    ,{id:'6bbbbfb0a2c411e9b6bf4cedfbc21591',code:'TestCases',text:'添加测试用例',type:'0',url:'',icon:'',icon_cls:'',parent_id:'8b0707609ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.4862384259',update_time:'43656.4862384259',}
    ,{id:'6beced92a24411e9b6bf4cedfbc21591',code:'start',text:'开始',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4cf48560a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8499537037',update_time:'43655.8499537037',}
    ,{id:'6d36ec139ef511e9b6bf4cedfbc21591',code:'ProjectDocumentation',text:'项目文档库',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6394791667',update_time:'43651.6394791667',}
    ,{id:'6f18a2949efb11e9b6bf4cedfbc21591',code:'delete',text:'删除',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1a3d7a689ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6693402778',update_time:'43651.6693402778',}
    ,{id:'71c48127a24411e9b6bf4cedfbc21591',code:'finish',text:'完成',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4cf48560a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8500694444',update_time:'43655.8500694444',}
    ,{id:'78f8ae50a24411e9b6bf4cedfbc21591',code:'cancel',text:'取消',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4cf48560a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8502083333',update_time:'43655.8502083333',}
    ,{id:'795301a8a22e11e9b6bf4cedfbc21591',code:'confirmDemand',text:'确认需求',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4b310b8f9ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7408449074',update_time:'43655.7408449074',}
    ,{id:'7f07e6cda24411e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4cf48560a22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8503240741',update_time:'43655.8503240741',}
    ,{id:'82a21fd4a22e11e9b6bf4cedfbc21591',code:'closingRequirements',text:'关闭需求',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4b310b8f9ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7410185185',update_time:'43655.7410185185',}
    ,{id:'8485cfdfa23611e9b6bf4cedfbc21591',code:'LookTasksInfo',text:'项目任务详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7808217593',update_time:'43655.7808217593',}
    ,{id:'84adc9049ef211e9b6bf4cedfbc21591',code:'search',text:'搜索',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-5159c53c-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6250115741',update_time:'43651.6250115741',}
    ,{id:'87670aa3c26511e9b6bf4cedfbc21591',code:'ClassificationGoods',text:'商品分类',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7352893519',update_time:'43696.7352893519',}
    ,{id:'886e63479ef611e9b6bf4cedfbc21591',code:'ProjectOverview',text:'项目概况',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6449768519',update_time:'43655.6928125',}
    ,{id:'8a74abd1a38c11e9b6bf4cedfbc21591',code:'requirementsDetail',text:'需求详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4810185185',update_time:'43657.4810185185',}
    ,{id:'8b0707609ef511e9b6bf4cedfbc21591',code:'qualityassurance',text:'测试用例',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6400578704',update_time:'43651.6400578704',}
    ,{id:'8bfcca5e9ef211e9b6bf4cedfbc21591',code:'create',text:'创建',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-5159c53c-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.625162037',update_time:'43651.625162037',}
    ,{id:'94fca1f0c26111e9b6bf4cedfbc21591',code:'ContractSale',text:'销售合同',type:'0',url:'',icon:'',icon_cls:'',parent_id:'c0a2adc4c25b11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7156712963',update_time:'43696.7164583333',}
    ,{id:'97a2cdfa9ef911e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'44692fdd9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6601851852',update_time:'43651.6627083333',}
    ,{id:'997b19d6a22811e9b6bf4cedfbc21591',code:'createToDo',text:'添加待办',type:'0',url:'',icon:'',icon_cls:'',parent_id:'463f200ca22811e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7116435185',update_time:'43655.7116435185',}
    ,{id:'9afbd4e5c7d711e9b6bf4cedfbc21591',code:'GenerateContact',text:'生成合同一览',type:'0',url:'',icon:'',icon_cls:'',parent_id:'1bb7b8cac55211e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43703.6673032407',update_time:'43703.6673032407',}
    ,{id:'9bfa6889a22e11e9b6bf4cedfbc21591',code:'aecompositionTasks',text:'分解任务',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4b310b8f9ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7415162037',update_time:'43655.7415162037',}
    ,{id:'9f0f51e19ef111e9b6bf4cedfbc21591',code:'createRole',text:'新增角色',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6205555556',update_time:'43651.6212152778',}
    ,{id:'9f371874c7da11e9b6bf4cedfbc21591',code:'GenerateContactInfo',text:'生成合同详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4ec460d2c7da11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43703.6822916667',update_time:'43703.6822916667',}
    ,{id:'9f93e3639ef911e9b6bf4cedfbc21591',code:'delete',text:'删除',type:'0',url:'',icon:'',icon_cls:'',parent_id:'44692fdd9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6603356482',update_time:'43651.6627546296',}
    ,{id:'a2a5f7a8c26511e9b6bf4cedfbc21591',code:'CommodityManagement',text:'商品管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7358217593',update_time:'43696.7358217593',}
    ,{id:'a32fae829ef711e9b6bf4cedfbc21591',code:'ModuleManagement',text:'模块管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'886e63479ef611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.650462963',update_time:'43651.650462963',}
    ,{id:'a895b367a22e11e9b6bf4cedfbc21591',code:'addingTestcases',text:'添加测试用例',type:'0',url:'',icon:'',icon_cls:'',parent_id:'4b310b8f9ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7417592593',update_time:'43655.7417592593',}
    ,{id:'ad124166c26511e9b6bf4cedfbc21591',code:'PersonnelManagement',text:'人员管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'0',remark:'',creator:'admin',updater:'admin',create_time:'43696.7360185185',update_time:'43696.7360185185',}
    ,{id:'adab5433a2e711e9b6bf4cedfbc21591',code:'Knowledge',text:'知识库管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.6615046296',update_time:'43656.6615046296',}
    ,{id:'b0432de6a38b11e9b6bf4cedfbc21591',code:'CreatePersonInfo',text:'创建人员',type:'0',url:'',icon:'',icon_cls:'',parent_id:'e33d8160a22611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4767824074',update_time:'43657.4772222222',}
    ,{id:'b67d9f6dc26511e9b6bf4cedfbc21591',code:'PositionManagement',text:'职位管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7362037037',update_time:'43696.7362037037',}
    ,{id:'b855339fa22d11e9b6bf4cedfbc21591',code:'confirm',text:'确认',type:'0',url:'',icon:'',icon_cls:'',parent_id:'360f0a9d9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7370949074',update_time:'43655.7370949074',}
    ,{id:'ba9c2b089efa11e9b6bf4cedfbc21591',code:'search',text:'搜索',type:'0',url:'',icon:'',icon_cls:'',parent_id:'29b9b1229ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6658333333',update_time:'43651.6658333333',}
    ,{id:'bb312f3ea2e711e9b6bf4cedfbc21591',code:'KnowledgeManage',text:'组织知识库',type:'0',url:'',icon:'',icon_cls:'',parent_id:'adab5433a2e711e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.6617592593',update_time:'43656.6617592593',}
    ,{id:'bf990270c26511e9b6bf4cedfbc21591',code:'RightsManagement',text:'权限管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7363773148',update_time:'43696.7363773148',}
    ,{id:'c0a2adc4c25b11e9b6bf4cedfbc21591',code:'SalesDepart',text:'销售部管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.6866898148',update_time:'43696.6866898148',}
    ,{id:'c283e5e2a22d11e9b6bf4cedfbc21591',code:'solution',text:'已修正',type:'0',url:'',icon:'',icon_cls:'',parent_id:'360f0a9d9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7372916667',update_time:'43655.7372916667',}
    ,{id:'c3bd4f1ba2e711e9b6bf4cedfbc21591',code:'LookKnowledgeInfo',text:'查看知识库详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'adab5433a2e711e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.6619328704',update_time:'43656.6619328704',}
    ,{id:'c8a06ff4c26511e9b6bf4cedfbc21591',code:'OrganizatDepartment',text:'组织部门',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7365509259',update_time:'43696.7365509259',}
    ,{id:'cba7490ca22d11e9b6bf4cedfbc21591',code:'close',text:'问题关闭',type:'0',url:'',icon:'',icon_cls:'',parent_id:'360f0a9d9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7374652777',update_time:'43655.7374652777',}
    ,{id:'cc9da6879efc11e9b6bf4cedfbc21591',code:'search',text:'搜索',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6761226852',update_time:'43651.6761226852',}
    ,{id:'ce68bc8f9ef511e9b6bf4cedfbc21591',code:'createProject',text:'添加项目',type:'0',url:'',icon:'',icon_cls:'',parent_id:'3419d7e69ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6413657407',update_time:'43651.6413657407',}
    ,{id:'d0846f09a38b11e9b6bf4cedfbc21591',code:'EditPersonInfo',text:'编辑人员',type:'0',url:'',icon:'',icon_cls:'',parent_id:'e33d8160a22611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43657.4774074074',update_time:'43657.4774074074',}
    ,{id:'d1e8b2179ef111e9b6bf4cedfbc21591',code:'deleteRole',text:'删除角色',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6215509259',update_time:'43651.6215509259',}
    ,{id:'d23e7a699efc11e9b6bf4cedfbc21591',code:'create',text:'创建',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6762268519',update_time:'43651.6762268519',}
    ,{id:'d27a7b6fc7e211e9b6bf4cedfbc21591',code:'SalesSampleRoom',text:'销售样品间',type:'0',url:'',icon:'',icon_cls:'',parent_id:'c0a2adc4c25b11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'',updater:'',create_time:'43703.7230555556',update_time:'43703.7230555556',}
    ,{id:'d28e2580a23211e9b6bf4cedfbc21591',code:'LookPersonInfo',text:'查看人员详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'e33d8160a22611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7624537037',update_time:'43655.7624537037',}
    ,{id:'d2e8c1b9c26511e9b6bf4cedfbc21591',code:'GeneralConfiguratOverview',text:'通用配置一览',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7367592593',update_time:'43696.7367592593',}
    ,{id:'d3826534a22d11e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'360f0a9d9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7376157407',update_time:'43655.7376157407',}
    ,{id:'d51415efc55511e9b6bf4cedfbc21591',code:'CreateOrder',text:'创建订单',type:'0',url:'',icon:'',icon_cls:'',parent_id:'6598bcb4c26011e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43700.4772337963',update_time:'43700.4772337963',}
    ,{id:'d570f2f6a22611e9b6bf4cedfbc21591',code:'BasicManage',text:'基本信息管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7028587963',update_time:'43655.7028587963',}
    ,{id:'d92e939c9ef111e9b6bf4cedfbc21591',code:'editRole',text:'编辑角色',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6216898148',update_time:'43651.6216898148',}
    ,{id:'de278374a2b711e9b6bf4cedfbc21591',code:'bugDetail',text:'Bug详情',type:'0',url:'',icon:'',icon_cls:'',parent_id:'264c14829ef311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.4238310185',update_time:'43656.4238310185',}
    ,{id:'defa09fa9efc11e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-5159c53c-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6764814815',update_time:'43651.6764814815',}
    ,{id:'e0c45c68c26511e9b6bf4cedfbc21591',code:'PromptInformationOverview',text:'提示信息一览',type:'0',url:'',icon:'',icon_cls:'',parent_id:'67d8b985c25f11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.737025463',update_time:'43696.737025463',}
    ,{id:'e33d8160a22611e9b6bf4cedfbc21591',code:'PersonInfo',text:'人员信息管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'d570f2f6a22611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7031365741',update_time:'43655.7031365741',}
    ,{id:'e3ee2e6c9efc11e9b6bf4cedfbc21591',code:'Prohibit',text:'禁用',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-5159c53c-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6765740741',update_time:'43651.6791319444',}
    ,{id:'eba61138a2e511e9b6bf4cedfbc21591',code:'edit',text:'编辑',type:'0',url:'',icon:'',icon_cls:'',parent_id:'8b0707609ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43656.6527662037',update_time:'43656.6527662037',}
    ,{id:'f02c39c69ef611e9b6bf4cedfbc21591',code:'EditingProjects',text:'编辑项目',type:'0',url:'',icon:'',icon_cls:'',parent_id:'886e63479ef611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6469907407',update_time:'43651.6469907407',}
    ,{id:'f0a6f313c26211e9b6bf4cedfbc21591',code:'PurchaseOrder',text:'采购订单',type:'0',url:'',icon:'',icon_cls:'',parent_id:'ff21e822c25d11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.7224189815',update_time:'43696.7224189815',}
    ,{id:'f71b2059a24011e9b6bf4cedfbc21591',code:'start',text:'开始',type:'0',url:'',icon:'',icon_cls:'',parent_id:'241e993b9ef511e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.8327662037',update_time:'43655.8327662037',}
    ,{id:'f83c3c989ef111e9b6bf4cedfbc21591',code:'deleteRoleUser',text:'删除角色用户',type:'0',url:'',icon:'',icon_cls:'',parent_id:'371e6a3f9ee311e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.6222916667',update_time:'43651.6226157407',}
    ,{id:'fcba8f4ac26211e9b6bf4cedfbc21591',code:'PurchaseSale',text:'采购合同',type:'0',url:'',icon:'',icon_cls:'',parent_id:'ff21e822c25d11e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.722650463',update_time:'43696.722650463',}
    ,{id:'fd596785a22611e9b6bf4cedfbc21591',code:'PersonGroup',text:'人员分组管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'d570f2f6a22611e9b6bf4cedfbc21591',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43655.7036342593',update_time:'43655.7036342593',}
    ,{id:'ff21e822c25d11e9b6bf4cedfbc21591',code:'ProcurementCommitteeManagement',text:'采购委外部管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43696.6978472222',update_time:'43696.6978472222',}
    ,{id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',code:'System',text:'系统管理',type:'0',url:'1',icon:'',icon_cls:'',parent_id:'',sort:'6',is_enabled:'1',remark:'1',creator:'',updater:'43383.8308333333',create_time:'',update_time:'43383.8308333333',}
    ,{id:'uuid-5159c53c-cc6f-11e8-818b-525400db2b92',code:'UserManage',text:'用户管理',type:'0',url:'',icon:'',icon_cls:'',parent_id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',sort:'0',is_enabled:'1',remark:'',creator:'admin',updater:'admin',create_time:'43651.5475231481',update_time:'43651.5475231481',}
    ,{id:'uuid-e58991c3-cc7f-11e8-9e08-525400db2b92',code:'ModuleManage',text:'模块管理',type:'1',url:'',icon:'',icon_cls:'',parent_id:'uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92',sort:'2',is_enabled:'1',remark:'',creator:'',updater:'43383.8308333333',create_time:'',update_time:'43383.8308333333',}
  ]
      ,
    }
  },
  computed: {
    // enabledFilter() {
    //   return function(isEnabled) {
    //     return apiClass.classFilter(this.optionsEnabled, isEnabled)
    //   }
    // }
  },
  created() {
    this.getEnabled()
    this.getTree()
  },
  methods: {
    getEnabled() {
      // apiClass.listClass({ parentCode: 'IS_ENABLED' }).then(response => {
      //   this.optionsEnabled = response
      // })
    },
    getTree() {
      this.loading = false
      // this.loading = true
      // apiModule.listModuleTree(this.query).then(response => {
      //   this.data = response
      //   this.loading = false
      // })
    },
    handleFilter() {
      this.getTree()
    },
    handleCreate(row) {
      // this.editData = Object.assign({}, defaultEditData)
      if (row !== undefined) {
        this.editData.parentId = row.id
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      var me = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          apiModule.createModule(me.editData).then(() => {
            me.handleFilter()
            me.dialogFormVisible = false
            me.$notify({
              title: me.$t('common.success'),
              message: me.dialogTitle[me.dialogStatus] + me.$t('common.success'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      // this.editData = Object.assign({}, row) // copy obj
      this.editData.createTime = new Date(this.editData.createTime)
      this.editData.updateTime = new Date(this.editData.updateTime)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      var me = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const requestData = Object.assign({}, me.editData)
          requestData.children = undefined
          requestData.parent = undefined
          apiModule.updateModule(requestData).then(() => {
            me.setUpdatedChildren(me.data, me.editData)
            me.dialogFormVisible = false
            me.$notify({
              title: me.$t('common.success'),
              message: me.dialogTitle[me.dialogStatus] + me.$t('common.success'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    setUpdatedChildren(data, editData) {
      for (const v of data) {
        if (v.id === editData.id) {
          const index = data.indexOf(v)
          data.splice(index, 1, editData)
          break
        }
        if (v.children.length > 0) {
          this.setUpdatedChildren(v.children, editData)
        }
      }
    },
    deleteData(row) {
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        apiModule.deleteModule({ id: row.id }).then(() => {
          this.handleFilter()
          this.$message({
            type: 'success',
            message: this.$t('common.delete') + this.$t('common.success')
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    }
  }
}
</script>
<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding: 10px;
}
.Btnfooter{
  margin-top:10px;
}
</style>
