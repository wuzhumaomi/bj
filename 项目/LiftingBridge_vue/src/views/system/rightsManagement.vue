<template>
  <div class="administrator-list container" style="padding-right:0px;">
    <el-card style="height:100%;padding:0px;border:none">
      <el-row :gutter="20" style="padding-left:10px">
        <el-col :span="24" style="padding-top:10px">
          <el-card shadow="hover" style="height:720px;width:1250px" >
          <el-form ref="query" :model="query" size="mini" style="width: 90%">
            <el-col :span="24" style="padding-bottom:10px">
              <span >{{ $t('role.role') }}</span>
            </el-col>
            <el-col :span="24" style="padding-bottom: 0px;margin:0px;padding-top:10px">
              <el-form-item label-width="80px" label-position="left" :label="$t('personnelManagement.cntrCd')">
                  <el-select v-model="query.cntrCd" clearable :placeholder="$t('personInfo.choose')" >
                    <el-option
                      v-for="item in cntrOptions"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code"/>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label-width="80px" label-position="left" :label="$t('role.orgCd')" prop="orgCd">
                <el-input v-model="query.orgNm" :disabled="true" class="more_text_L">
                  <el-button slot="append" icon="el-icon-more" id="el-input__more" @click="handleEdit('dept','query')"/>
                  <el-button slot="suffix" icon="el-icon-circle-close" id="el-input__clear" size="mini" circle plain />
                </el-input>
              </el-form-item>
              <!-- <el-form-item label-width="80px" label-position="left" :label="$t('role.orgCd')">
                <el-input v-model="query.orgNm" clearable :placeholder="$t('placeholders.content')" style="width:160px"/>
                <el-button icon="el-icon-more" type="primary" circle  @click="handleEdit('dept','query')" />
              </el-form-item> -->
            </el-col>
            <el-col :span="20">
              <el-form-item label-width="80px" label-position="left" :label="$t('role.roleNm')">
                <el-input v-model="query.roleNm" :clearable="true" :placeholder="$t('placeholders.content')"/>
              </el-form-item>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary" icon="el-icon-search" style="padding-bottom:5px;" @click="getRoleList">{{ $t('operation.query') }}</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary" icon="el-icon-plus" style="padding-bottom:5px;margin-left:50px;float:right" @click="handleRole('new')">{{ $t('operation.newlyAdded') }}</el-button>
            </el-col>
            <el-col :span="24">
              <tree-table
                v-loading="listLoadinga"
                ref="roleTable" 
                :data="list" 
                :columns="columns" 
                highlight-current-row                
                :expand-all="expandAll"
                border
                style="height:600px;overflow-y:auto;margin-left:10px;margin-right:10px;">
                <el-table-column width="120px" :label="$t('common.actions')">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('operation.edit')"  effect="dark" placement="bottom">
                      <el-button type="primary" v-if="scope.row.leaf == true" size="mini" icon="el-icon-setting" circle @click="handleRole(scope.row)"/>
                    </el-tooltip>
                    <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom">
                      <el-button v-if="scope.row.leaf == true" size="mini" type="danger" icon="el-icon-delete" circle @click="amputatede(scope.row)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </tree-table>
            </el-col>
          </el-form>
        </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- 创建角色 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="dialogTitle" width="90%" top="3vh" @open="resetDialog">
    <template>
      <div class="administrator-list container">
        <el-card shadow="never" style="height:100%;border:none">
          <el-row :gutter="24" style="padding-left:10px">
            <!-- 角色 -->
            <el-col :span="10">
            <span style="float:left;">角色信息</span>
            </el-col>
            <el-col :span="14">
            <span >{{ $t('role.permissions') }}</span>
            </el-col>
            <el-col :span="10">
              <el-card shadow="hover" style="height:720px;padding:0px;">
              <el-form ref="roleForm" :model="roleForm" :rules="rules">
                <el-row :gutter="23" style="padding:10px 12px 2px 12px">
                  <el-col :span="24">
                    <el-form-item label-width="80px" label-position="right" :label="$t('role.cntrCd')">
                        <el-select v-model="roleForm.cntrCd" clearable :placeholder="$t('personInfo.choose')" >
                          <el-option
                            v-for="item in cntrOptions"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="80px" label-position="right" :label="$t('role.text')" prop="roleNm">
                      <el-input v-model="roleForm.roleNm" style="width:200px"/>
                    </el-form-item>
                    <el-form-item label-width="80px" label-position="right" :label="$t('role.orgCd')" prop="orgNm">
                      <el-input v-model="roleForm.orgNm" :disabled="true" :placeholder="$t('placeholders.content')" style="width:160px"/>
                      <el-button icon="el-icon-more" type="primary" circle  @click="handleEdit('dept', 'roleForm')" />
                    </el-form-item>
                    <el-form-item label-width="80px" label-position="right" :label="$t('role.roleDis')" prop="roleDis">
                      <el-input type="textarea" v-model="roleForm.roleDis" style="width:400px"/>
                    </el-form-item>
                      </el-col>
                    </el-row>
              </el-form>
              </el-card>
            </el-col>
            <!-- 用户 权限 -->
            <el-col :span="14">
              <el-card shadow="hover" style="height:720px;padding:0px;">
                <div style="width:100%;height:100%;">
                  <el-tree
                    v-loading="listLoading"
                    ref="treeModule"
                    :data="listModule"
                    :default-checked-keys="defaultCheckedModule"
                    :props="moduleTreeProps"
                    show-checkbox
                    show-border
                    node-key="id"
                    default-expand-all
                    style="height:680px;overflow-y:scroll;"/>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-button v-if="listModule.length > 0" type="primary" icon="el-icon-check" style="margin:3px" @click="saveRole">{{ $t('common.save') }}</el-button>
              <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </template>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="dialogTitle"  :visible.sync="dialogVisibleDep"  :before-close="close_add_edit2" width="60%" :append-to-body="true" >
        <dept_addEdit ref="deptsAddEdits"  :visible="dialogVisibleDep" @confirm="confirmDept" @cancel="dialogVisibleDep=false"/>
    </el-dialog>
  </div>
</template>
<script>
import treeTable from '@/components/TreeTable'
import dept_addEdit from '../BasicData/components/DPtasksAddEdit'

export default {
  name: 'RightManagement',
  components: {
    treeTable,
    dept_addEdit
  },
  data() {
    // 验证角色编号
    const roleNo = (rules, value, callback) => {
      var regExp = /^[0-9\u4e00-\u9fa5]{2,10}$/
      if (value === '') {
        callback(new Error(this.$t('common.message.info_create_roleNo')))
        return
      } else if (regExp.test(value) === false) {
        callback(new Error(this.$t('common.message.info_input_roleNo')))
        return
      } else {
        callback()
      }
    }
    // 验证角色名称
    const roleName = (rules, value, callback) => {
      var regExp = /^[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/
      if (value === '') {
        callback(new Error(this.$t('common.message.info_create_roleName')))
        return
      } else if (regExp.test(value) === false) {
        callback(new Error(this.$t('common.message.info_input_roleName')))
        return
      } else {
        callback()
      }
    }
    return {
      columns: [
        {
          text: this.$t('role.roleNm'),
          value: 'roleNm',
          align: 'left',
          width: 380
        },
        {
          text: this.$t('role.roleDis'),
          value: 'roleDis',
          align: 'left',
          width: 550
        },
      ],
      listLoadinga: false,
      listLoading: false,
      expandAll: true,
      total: 0,
      currentRow: '',
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],

      list: [
        {cntrCd: '江苏提桥', orgId: '销售部', roleId: '', roleNm: '销售部', leaf: false
            ,children: [
              {cntrCd: '江苏提桥', orgId: '销售部', roleId: '主管', roleNm: '主管', roleDis:'系统数据管理者', leaf: true},
              {cntrCd: '江苏提桥', orgId: '销售部', roleId: '经理', roleNm: '经理', roleDis:'生产部数据管理者', leaf: true},
              {cntrCd: '江苏提桥', orgId: '销售部', roleId: '员工', roleNm: '员工', roleDis:'生产者', leaf: true},
              ]},
              {cntrCd: '江苏提桥', orgId: '生产部', roleId: '', roleNm: '生产部', leaf: false
            ,children: [
              {cntrCd: '江苏提桥', orgId: '生产部', roleId: '主管', roleNm: '主管', leaf: true},
              {cntrCd: '江苏提桥', orgId: '生产部', roleId: '经理', roleNm: '经理', leaf: true},
              {cntrCd: '江苏提桥', orgId: '生产部', roleId: '员工', roleNm: '员工', leaf: true},
            ]},
        {cntrCd: '上海提桥', orgId: '销售部', roleId: '', roleNm: '销售部', leaf: false
            ,children: [
              {cntrCd: '上海提桥', orgId: '销售部', roleId: '主管', roleNm: '主管', leaf: true},
              {cntrCd: '上海提桥', orgId: '销售部', roleId: '经理', roleNm: '经理', leaf: true},
              {cntrCd: '上海提桥', orgId: '销售部', roleId: '员工', roleNm: '员工', leaf: true},
              ]
        },
        {cntrCd: '上海提桥', orgCd: '生产部', roleId: '', roleNm: '生产部', leaf: false
            ,children: [
              {cntrCd: '上海提桥', orgCd: '生产部', roleId: '主管', roleNm: '主管', leaf: true},
              {cntrCd: '上海提桥', orgCd: '生产部', roleId: '经理', roleNm: '经理', leaf: true},
              {cntrCd: '上海提桥', orgCd: '生产部', roleId: '员工', roleNm: '员工', leaf: true},
            ]
        },
      ],
      query: {
        id: '',
        page: 1,
        limit: 6,
        orgId:'',
        orgNm:'',
        orgCdDis:'',
        cntrCd: '1',
        orgCd:'生产部'
      },
      queryData: {
        roleId: '',
        page: 1,
        limit: 10
      },
      personData: {
        valueLeft: '', // 角色ID
        valueRight: '' // 用户ID
      },
      positionData: {
        id: '',
        rolePosition: ''
      },
      listdata: [],
      roleForm: {
        id: undefined,
        cntrCd: '1',
        roleNo: 'charge',
        roleName: '主管',
        orgCd: '生产部',
        roleDis: '描述',
      },
      userData: {
        roleId: '',
        userStr: ''
      },
      userQuery: {
        page: 1,
        limit: 6,
        roleId: ''
      },
      listUser: [{"createTime":1563520400000,"creator":"admin","email":"","headimg":"","id":"154e1ccda9f311e9a5c850e549c2854e","isEnabled":"1","loginName":"6666666","nickname":"","password":"666666","person":{"fullname":"ali","id":"4287457fa9f411e9a5c850e549c2854e"},"realName":"","remark":"fede","roleUserId":"59341d8ba9fb11e9a5c850e549c2854e","updateTime":1563521049000,"updater":"admin","url":"","userType":""},{"createTime":1546496351000,"creator":"","email":"admin@mail.com","headimg":"headimg.jpg","id":"32d24fdce63611e8a5362c4d54bf6856","isEnabled":"1","loginName":"admin","nickname":"管理员","password":"admin","person":{"fullname":"张三","id":"0068282822c611e9a97450e549c2854e"},"realName":"管理员","remark":"1234","roleUserId":"c9547239207711e9a97450e549c2854e","updateTime":1548657671000,"updater":"admin","url":"url","userType":"admin"},{"createTime":1543659152000,"creator":"","email":"","headimg":"","id":"4d5f8d711a3f11e98fbd50e549c2854e","isEnabled":"1","loginName":"test001","nickname":"","password":"test002","person":{"fullname":"王晶","id":"3e2568af22c911e9a97450e549c2854e"},"realName":"张","remark":"","roleUserId":"a6a34a72208211e9a97450e549c2854e","updateTime":1548824193000,"updater":"admin","url":"","userType":""},{"createTime":1548063111000,"creator":"","email":"","headimg":"","id":"442e2b6a1d5e11e999e450e549c2854e","isEnabled":"1","loginName":"test003","nickname":"","password":"test003","person":{"fullname":"李四","id":"9d31d16b22c811e9a97450e549c2854e"},"realName":"test003","remark":"ceshi","roleUserId":"c9458e45207711e9a97450e549c2854e","updateTime":1548824214000,"updater":"admin","url":"","userType":""},{"createTime":1548061617000,"creator":"admin","email":"","headimg":"","id":"c8d79b851d5a11e993f750e549c2854e","isEnabled":"1","loginName":"test002","nickname":"","password":"test002","person":{"$ref":"$[3].person"},"realName":"test002","remark":"cehsi","roleUserId":"dc4ae943208211e9a97450e549c2854e","updateTime":1548824209000,"updater":"admin","url":"","userType":""},{"createTime":1548647445000,"creator":"admin","email":"","headimg":"","id":"bf9fb0f722ae11e9a97450e549c2854e","isEnabled":"1","loginName":"test005","nickname":"","password":"test005","person":{"fullname":"周燕","id":"dbc320e022cb11e9a97450e549c2854e"},"realName":"","remark":"12135","roleUserId":"c86efd6322ae11e9a97450e549c2854e","updateTime":1548824221000,"updater":"admin","url":"","userType":""}],
      tableKey: 0,
      totalUser: 0,
      // listModule: [{"children":[{"children":[],"code":"01","createTime":1563520732000,"creator":"admin","id":"db0d1a9ea9f311e9a5c850e549c2854e","isEnabled":"1","parentId":"bf935136a9f311e9a5c850e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"01","type":"00","updateTime":1563520732000,"updater":"admin","url":""}],"code":"testali","createTime":1563520686000,"creator":"admin","id":"bf935136a9f311e9a5c850e549c2854e","isEnabled":"1","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"testali","type":"00","updateTime":1563520686000,"updater":"admin","url":""},{"children":[{"children":[],"code":"2","createTime":1563777415000,"creator":"admin","id":"7e215d3aac4911e9a5c850e549c2854e","isEnabled":"1","parentId":"7a71c605ac4211e9a5c850e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"2","type":"00","updateTime":1563777415000,"updater":"admin","url":""},{"children":[],"code":"1","createTime":1563777406000,"creator":"admin","id":"78b91bd6ac4911e9a5c850e549c2854e","isEnabled":"1","parentId":"7a71c605ac4211e9a5c850e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"1","type":"00","updateTime":1563777406000,"updater":"admin","url":""}],"code":"10086","createTime":1563774402000,"creator":"admin","id":"7a71c605ac4211e9a5c850e549c2854e","isEnabled":"1","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"1","type":"00","updateTime":1563774402000,"updater":"admin","url":"1"},{"children":[],"code":"222","createTime":1563774339000,"creator":"admin","id":"546fc14fac4211e9a5c850e549c2854e","isEnabled":"1","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"222","type":"00","updateTime":1563774339000,"updater":"admin","url":""},{"children":[],"code":"1008611","createTime":1563522454000,"creator":"admin","id":"dd583433a9f711e9a5c850e549c2854e","isEnabled":"1","remark":"11","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"1008611","type":"00","updateTime":1563522454000,"updater":"admin","url":"11"},{"children":[{"children":[],"code":"BaggagePassTime","createTime":1549100093000,"creator":"admin","id":"9e8c362b26cc11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"行李通过时间","type":"00","updateTime":1549100093000,"updater":"admin","url":""},{"children":[],"code":"PassengerPassTime","createTime":1549100051000,"creator":"admin","id":"856befe926cc11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"","sort":0,"text":"旅客通过时间","type":"00","updateTime":1549100051000,"updater":"admin","url":""},{"children":[{"children":[],"code":"channelStatistics","createTime":1550058994000,"creator":"admin","id":"40b5929c2f8511e989b250e549c2854e","isEnabled":"1","parentId":"8debe93523ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3fade0e456d11e99b5e50e549c2854e","sort":0,"text":"通道流量","type":"00","updateTime":1550058994000,"updater":"admin","url":""}],"code":"Statistics","createTime":1548756014000,"creator":"admin","icon":"","iconCls":"","id":"8debe93523ab11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f444c418456d11e99b5e50e549c2854e","sort":0,"text":"数据图表分析","type":"00","updateTime":1550030467000,"updater":"admin","url":""},{"children":[],"code":"ChannelStatistics","createTime":1548755996000,"creator":"admin","id":"837b6a8123ab11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f4004e1e456d11e99b5e50e549c2854e","sort":0,"text":"通道数据分析","type":"00","updateTime":1548755996000,"updater":"admin","url":""},{"children":[],"code":"PassengerRecheck","createTime":1549100026000,"creator":"admin","id":"7711096526cc11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3e46fe1456d11e99b5e50e549c2854e","sort":0,"text":"旅客复查率","type":"00","updateTime":1549100026000,"updater":"admin","url":""},{"children":[],"code":"PassengerTotal","createTime":1549099408000,"creator":"admin","id":"069a09aa26cb11e9b6fc50e549c2854e","isEnabled":"1","parentId":"6bf01fae23ab11e9b6fc50e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3db19b2456d11e99b5e50e549c2854e","sort":0,"text":"人数统计","type":"00","updateTime":1549099408000,"updater":"admin","url":""}],"code":"DataStatistics","createTime":1548755957000,"creator":"admin","id":"6bf01fae23ab11e9b6fc50e549c2854e","isEnabled":"1","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f43ebc61456d11e99b5e50e549c2854e","sort":0,"text":"数据分析","type":"00","updateTime":1548755957000,"updater":"admin","url":""},{"children":[{"children":[],"code":"Passageway","createTime":1548755559000,"creator":"admin","icon":"","iconCls":"","id":"7f18ece523aa11e9b6fc50e549c2854e","isEnabled":"1","parentId":"d3e65d97237311e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3d431bf456d11e99b5e50e549c2854e","sort":0,"text":"实时状态","type":"00","updateTime":1548756989000,"updater":"admin","url":""},{"children":[],"code":"Informationcollection","createTime":1548755618000,"creator":"admin","id":"a20c33d323aa11e9b6fc50e549c2854e","isEnabled":"1","parentId":"d3e65d97237311e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3cee24f456d11e99b5e50e549c2854e","sort":0,"text":"信息采集","type":"00","updateTime":1548755618000,"updater":"admin","url":""}],"code":"RealTime","createTime":1548732092000,"creator":"admin","id":"d3e65d97237311e9a97450e549c2854e","isEnabled":"1","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3c9e470456d11e99b5e50e549c2854e","sort":0,"text":"实时数据","type":"00","updateTime":1548732092000,"updater":"admin","url":""},{"children":[{"children":[{"children":[],"code":"PalletTag","createTime":1548731363000,"creator":"admin","id":"2199a228237211e9a97450e549c2854e","isEnabled":"1","parentId":"997b9ca9237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3c31d29456d11e99b5e50e549c2854e","sort":0,"text":"托盘标签管理","type":"00","updateTime":1548731363000,"updater":"admin","url":""},{"children":[],"code":"LocationTag","createTime":1548731221000,"creator":"admin","id":"ccfcef0a237111e9a97450e549c2854e","isEnabled":"1","parentId":"997b9ca9237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3bd085b456d11e99b5e50e549c2854e","sort":0,"text":"定位标签管理","type":"00","updateTime":1548731221000,"updater":"admin","url":""}],"code":"TagManage","createTime":1548731135000,"creator":"admin","id":"997b9ca9237111e9a97450e549c2854e","isEnabled":"1","parentId":"b5bf3b6e1fb611e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3b70091456d11e99b5e50e549c2854e","sort":0,"text":"标签管理","type":"00","updateTime":1548731135000,"updater":"admin","url":""},{"children":[],"code":"ChannelManage","createTime":1548730589000,"creator":"admin","id":"53fdb3d2237011e9a97450e549c2854e","isEnabled":"1","parentId":"b5bf3b6e1fb611e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3b22570456d11e99b5e50e549c2854e","sort":0,"text":"通道信息管理","type":"00","updateTime":1548730589000,"updater":"admin","url":""},{"children":[{"children":[],"code":"CreatePersonInfo","createTime":1548731015000,"creator":"admin","id":"5225597d237111e9a97450e549c2854e","isEnabled":"1","parentId":"26952e7e237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3acd474456d11e99b5e50e549c2854e","sort":0,"text":"创建人员信息","type":"00","updateTime":1548731015000,"updater":"admin","url":""},{"children":[],"code":"PersonInfo","createTime":1548730967000,"creator":"admin","id":"358b800e237111e9a97450e549c2854e","isEnabled":"1","parentId":"26952e7e237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3a7fd73456d11e99b5e50e549c2854e","sort":0,"text":"人员信息","type":"00","updateTime":1548730967000,"updater":"admin","url":""},{"children":[],"code":"LookPersonInfo","createTime":1548831768000,"creator":"admin","id":"efec794b245b11e9b6fc50e549c2854e","isEnabled":"1","parentId":"26952e7e237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f3a2ab0b456d11e99b5e50e549c2854e","sort":0,"text":"查看人员详情","type":"00","updateTime":1548831768000,"updater":"admin","url":""},{"children":[],"code":"PersonGroup","createTime":1548731090000,"creator":"admin","id":"7ee0d4d4237111e9a97450e549c2854e","isEnabled":"1","parentId":"26952e7e237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f397b96c456d11e99b5e50e549c2854e","sort":0,"text":"人员分组","type":"00","updateTime":1548731090000,"updater":"admin","url":""},{"children":[],"code":"EditPersonInfo","createTime":1548731032000,"creator":"admin","id":"5c3aa049237111e9a97450e549c2854e","isEnabled":"1","parentId":"26952e7e237111e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f387ebcf456d11e99b5e50e549c2854e","sort":0,"text":"修改人员信息","type":"00","updateTime":1548731032000,"updater":"admin","url":""}],"code":"PersonManage","createTime":1548730942000,"creator":"admin","id":"26952e7e237111e9a97450e549c2854e","isEnabled":"1","parentId":"b5bf3b6e1fb611e9a97450e549c2854e","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f37a063f456d11e99b5e50e549c2854e","sort":0,"text":"人员管理","type":"00","updateTime":1548730942000,"updater":"admin","url":""}],"code":"BasicManage","createTime":1548320999000,"creator":"admin","id":"b5bf3b6e1fb611e9a97450e549c2854e","isEnabled":"1","remark":"","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f36ac1ab456d11e99b5e50e549c2854e","sort":0,"text":"基本信息管理","type":"00","updateTime":1548321712000,"updater":"admin","url":""},{"children":[{"children":[],"code":"ClassManage","id":"uuid-6985ba03-cc6f-11e8-818b-525400db2b92","parentId":"uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f40dc8ef456d11e99b5e50e549c2854e","sort":1,"text":"分类管理","type":"01","updateTime":1539172584000,"updater":"2018-10-10 19:56:24"},{"children":[],"code":"ModuleManage","id":"uuid-e58991c3-cc7f-11e8-9e08-525400db2b92","parentId":"uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f412a265456d11e99b5e50e549c2854e","sort":2,"text":"模块管理","type":"01","updateTime":1539172584000,"updater":"2018-10-10 19:56:24"},{"children":[{"children":[],"code":"fullnameInput","createTime":1548827320000,"creator":"admin","icon":"","iconCls":"","id":"93d8f364245111e9b6fc50e549c2854e","isEnabled":"1","parentId":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","remark":"检索条件","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f4348632456d11e99b5e50e549c2854e","sort":0,"text":"姓名","type":"00","updateTime":1548827505000,"updater":"admin","url":""},{"children":[],"code":"isEnabledOption","createTime":1548827396000,"creator":"admin","id":"c1719b1e245111e9b6fc50e549c2854e","isEnabled":"1","parentId":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","remark":"检索","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f42fa991456d11e99b5e50e549c2854e","sort":0,"text":"是否启用","type":"00","updateTime":1548827396000,"updater":"admin","url":""},{"children":[],"code":"search","createTime":1548827448000,"creator":"admin","icon":"","iconCls":"","id":"e0787abe245111e9b6fc50e549c2854e","isEnabled":"1","parentId":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","remark":"按钮","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f428cfa9456d11e99b5e50e549c2854e","sort":0,"text":"查询","type":"00","updateTime":1548827488000,"updater":"admin","url":""},{"children":[],"code":"loginNameInput","createTime":1548827304000,"creator":"admin","id":"8a477a0f245111e9b6fc50e549c2854e","isEnabled":"1","parentId":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","remark":"检索","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f422f1cb456d11e99b5e50e549c2854e","sort":0,"text":"账户","type":"00","updateTime":1548827304000,"updater":"admin","url":""},{"children":[],"code":"create","createTime":1548827473000,"creator":"admin","icon":"","iconCls":"","id":"eee1d12d245111e9b6fc50e549c2854e","isEnabled":"1","parentId":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","remark":"按钮","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f41cc99e456d11e99b5e50e549c2854e","sort":0,"text":"创建","type":"00","updateTime":1548827480000,"updater":"admin","url":""}],"code":"UserManage","id":"uuid-5159c53c-cc6f-11e8-818b-525400db2b92","parentId":"uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f417f601456d11e99b5e50e549c2854e","sort":3,"text":"用户管理","type":"00","updateTime":1539172584000,"updater":"2018-10-10 19:56:24"},{"children":[],"code":"RoleManage","createTime":1548754547000,"creator":"","id":"uuid-03dd59f3-ccad-11e8-b158-525400db2b92","isEnabled":"","parentId":"uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f439cc1b456d11e99b5e50e549c2854e","sort":4,"text":"角色管理","type":"00","updateTime":1539190411000,"updater":"2018-10-11 00:53:31","url":""}],"code":"System","id":"uuid-3f27a0ea-cc6f-11e8-818b-525400db2b92","remark":"1","roleCode":"1d8689ef1fb211e9a97450e549c2854e","roleRelationId":"f407b9b5456d11e99b5e50e549c2854e","sort":6,"text":"系统管理","type":"00","updateTime":1539172584000,"updater":"2018-10-10 19:56:24"}],
      listModule:[
        {"children":[
          {"children":[],
          "code":"01",
          "text":"销售订单",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"销售合同",
          "type":"00",
          },
          {"children":[],
          "code":"03",
          "text":"销售样品间",
          "type":"00",
          }],
        "code":"testali",
        "text":"销售部管理",
        "type":"00",
        },
        {"children":[
          {"children":[],
          "code":"01",
          "text":"采购订单",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"采购合同",
          "type":"00",
          }],
        "code":"testali",
        "text":"采购委外部管理",
        "type":"00",
        },
        {"children":[
          {"children":[],
          "code":"01",
          "text":"商品分类",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"商品管理",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"仓库一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"库位一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"客户一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"供应商一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"外发工厂一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"物流公司一览",
          "type":"00",
          }
          ],
        "code":"testali",
        "text":"基础数据管理",
        "type":"00",
        },
        {"children":[
          {"children":[],
          "code":"01",
          "text":"人员管理",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"角色管理",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"模块管理",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"组织部门",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"通用组织一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"提示信息一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"日志一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"评级一览",
          "type":"00",
          }
          ],
        "code":"testali",
        "text":"箱一览",
        "type":"00",
        },
        {"children":[
          {"children":[],
          "code":"01",
          "text":"采购计划一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"采购订单一览",
          "type":"00",
          },
          {"children":[],
          "code":"02",
          "text":"采购合同一览",
          "type":"00",
          }],
        "code":"testali",
        "text":"采购管理",
        "type":"00",
        },
      ],
      defaultCheckedModule: [],
      moduleTreeProps: { children: 'children', label: 'text' },
      dialogVisible: false,
      dialogVisibleDep: false,
      editDialogVisible: false,
      viewModel: true,
      dialogTitle: '',
      active: 'first',
      showSelectUser: false,
      rules: {
        roleNo: [
          { validator: roleNo, trigger: 'blur' }
        ],
        roleName: [
          { validator: roleName, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 角色新增修改
    handleEdit(index, row) {
      if(index === 'dept'){
        this.dialogVisibleDep = true
        this.dialogTitle = '部门选择';
        this.target = 
        // this.$refs.deptsAddEdits.dateIs(row,'');
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
        this.target = row
      }

    },
    handleSizeChange(val) {
      this.userQuery.limit = val
      this.getUserRole()
    },
    roleSizeChange(val) {
      this.query.limit = val
      this.getRoleList()
    },
    roleCurrentChange(val) {
      this.query.page = val
      this.getRoleList()
    },
    // 获取角色列表
    getRoleList() {
      // apiRole.listRole(this.query).then(responce => {
      //   this.list = responce.list
      //   this.total = responce.total
      //   this.listLoadinga = false
      //   // 默认选中第一组
      //   if (this.list.length > 0) {
      //     this.$refs.roleTable.setCurrentRow(this.list[0])
      //   }
      // })
    },
    // 角色选中
    handleCurrentChange(val) {
      debugger
      this.currentRow = val
      this.queryData.roleId = val.id
      // this.handlerChangeRole()
      // this.getUserRole()
    },
    // 重置表单
    resetDialog() {
      // this.$refs['roleForm'].resetFields()
    },
    // 角色新增修改
    handleRole(row) {
      this.dialogVisible = true
      if (row === 'new') {
        this.viewModel = true
        this.dialogTitle = this.$t('role.newRole')
      } else {
        this.dialogTitle = this.$t('role.editRole')
        this.viewModel = false
        this.roleForm = { ...row }
        this.roleForm.createTime = null
        this.roleForm.updateTime = null
      }
    },
    // 角色新增保存
    saveRole() {
      // this.$refs['roleForm'].validate(valid => {
        // if (valid) {
        //   if (this.viewModel) {
        //     apiRole.createRole(this.roleForm).then(responce => {
        //       this.$message.success(this.$t('common.message.info_operation_success'))
        //       this.getRoleList()
        //     })
        //   } else {
        //     apiRole.updateRole(this.roleForm).then(responce => {
        //       this.getRoleList()
        //     })
        //   }
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.dialogVisible = false
        // }
      // })
    },
    // 角色删除按钮点击事件
    amputatede(row) {
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // apiRole.deleteRole(row.id).then(responce => {
        //   this.$message.success(this.$t('common.message.info_operation_success'))
        //   this.getRoleList()
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    },
    // 2019/07/23 Ins(S) ZWD 添加了角色用户的删除功能
    // 角色用户删除按钮点击事件
    delRoleUser(row) {
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        apiRole.deleteRoleUser(row.roleUserId).then(responce => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.getUserRole()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    },
    // 2019/07/23 Ins(E) ZWD 添加了角色用户的删除功能
    getUserRole() {
      this.userQuery.roleId = this.currentRow.id
      // this.listLoading = true
      // apiRole.listUser(this.userQuery).then(response => {
      //   this.listUser = response.list
      //   this.totalUser = response.total
      //   this.listLoading = false
      // })
    },
    handlerChangeRole() {
      this.listModule = []
      this.defaultCheckedModule = []
      apiModule.listRoleModule({ roleCode: this.currentRow.id }).then(response => {
        this.listModule = response
        this.setDefaultCheckedModule(this.listModule)
      })
    },
    setDefaultCheckedModule(listModule) {
      for (const m of listModule) {
        if (m.roleRelationId) {
          if (m.children.length > 0) {
            this.setDefaultCheckedModule(m.children)
          } else {
            this.defaultCheckedModule.push(m.id)
          }
        }
      }
    },
    saveRoleModule() {
      const moduleIds = this.$refs.treeModule.getCheckedKeys().concat(this.$refs.treeModule.getHalfCheckedKeys())
      const postData = { roleCode: this.currentRow.id, moduleIds: JSON.stringify(moduleIds) }
      apiModule.updateRoleModule(postData).then(() => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.save') + this.$t('common.success'),
          type: 'success',
          duration: 2000
        })
      })
    },
    confirmUser(selectUser) {
      if (selectUser.length > 0) {
        this.userData.roleId = this.currentRow.id
        this.userData.userStr = JSON.stringify(selectUser)
        apiRole.addUserRole(this.userData).then(response => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.getUserRole()
        })
      }
      this.showSelectUser = false
    },
    confirmDept(dept_addEdit) {
      if (dept_addEdit.length > 0) {
        debugger
        if (this.target == 'query') {
          this.query.orgId = dept_addEdit[dept_addEdit.length - 1].id
          this.query.orgCdDis = dept_addEdit[dept_addEdit.length - 1].orgCdDis
          this.query.orgNm = dept_addEdit[dept_addEdit.length - 1].orgNm
        } else if (this.target == 'roleForm') {
          this.roleForm.orgId = dept_addEdit[dept_addEdit.length - 1].id
          this.roleForm.orgCdDis = dept_addEdit[dept_addEdit.length - 1].orgCdDis
          this.roleForm.orgNm = dept_addEdit[dept_addEdit.length - 1].orgNm
        }
      }
      this.dialogVisibleDep = false
      // dept_addEdit.empty()
    },

    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
    },
    close_add_edit2(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleDep = false
      // this.$refs.deptsAddEdits.empty();
    },
  }
}
</script>

<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px
  /* border: 0ch */
}
.Btnfooter{
  margin-top:10px;
}
.el-card__body{
  padding:0px;
}
</style>
