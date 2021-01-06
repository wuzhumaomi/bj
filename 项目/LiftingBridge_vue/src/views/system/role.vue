<template>
  <div class="administrator-list container">
    <el-card style="height:500px">
      <el-row :gutter="12">
        <!-- 角色 -->
        <el-col :span="6">
          <el-card shadow="hover" style="height:460px">
            <span style="float:left">{{ $t('role.role') }}</span>
            <el-button v-power="'createRole'" size="mini" type="primary" style="float:right;margin-right:3px" @click="handleRole('new')">{{ $t('operation.newlyAdded') }}</el-button>
            <el-table
              v-loading="listLoadinga"
              ref="roleTable"
              :data="list"
              style="width: 100%;height:350px"
              highlight-current-row
              @current-change="handleCurrentChange">
              <el-table-column>
                <template slot-scope="scope">
                  <span>{{ scope.row.roleName }}</span>
                  <el-tooltip :content="$t('common.delete')" placement="top" effect="light">
                    <el-button v-power="'deleteRole'" type="danger" icon="el-icon-delete" style="float:right" circle @click="amputatede(scope.row)"/>
                  </el-tooltip>
                  <el-tooltip :content="$t('common.edit')" placement="top" effect="light">
                    <el-button v-power="'editRole'" type="primary" icon="el-icon-edit" style="float:right;margin-right:5px" circle @click="handleRole(scope.row)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination v-show="total>0" :total="total" :current-page="query.page" :page-size="query.limit" background layout="prev, pager, next, total" style="float:left;margin-top:5px" @size-change="roleSizeChange" @current-change="roleCurrentChange"/>
          </el-card>
        </el-col>
        <!-- 用户 权限 -->
        <el-col :span="18">
          <el-card shadow="hover" style="height:460px">
            <el-tabs v-model="active" type="card">
              <el-tab-pane :label="$t('role.userRoles')" name="first">
                <el-button v-power="'deleteRoleUser'" style="float:right;margin-right:3px;margin-bottom:5px;" type="primary" @click="deleteRoleUser">{{ $t('common.delete') }}</el-button>
                <el-button v-power="'createRoleUser'" style="float:right;margin-right:3px" type="primary" @click="showSelectUser = true">{{ $t('operation.newlyAdded') }}</el-button>
                <el-table
                  v-loading="listLoading"
                  :key="tableKey"
                  :data="listUser"
                  stripe
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;height:297px"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column :label="$t('user.loginName')" align="left">
                    <template slot-scope="scope">
                      <span>{{ scope.row.loginName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('user.fullname')" align="left">
                    <template slot-scope="scope">
                      <span>{{ scope.row.realName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.createTime')" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.remark')" align="left">
                    <template slot-scope="scope">
                      <span>{{ scope.row.remark }}</span>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="pagination-container">
                  <el-pagination v-show="totalUser > 0" :current-page="userQuery.page" :page-size="userQuery.limit" :total="totalUser" background layout="prev, pager, next, total" @size-change="handleSizeChange" @current-change="handleCurrentChanges"/>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('role.permissions')" name="second">
                <div style="width:100%;height:350px;overflow:auto">
                  <div style="width:100%;height:38px;">
                    <el-button v-power="'saveRoles'" v-if="listModule.length > 0" style="float:right;margin-right:3px" type="primary" @click="saveRoleModule">{{ $t('common.save') }}</el-button>
                  </div>
                  <el-tree
                    ref="treeModule"
                    :data="listModule"
                    :default-checked-keys="defaultCheckedModule"
                    :props="moduleTreeProps"
                    show-checkbox
                    node-key="id"
                    default-expand-all/>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- 创建角色 -->
            <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="30%" @open="resetDialog">
              <el-form ref="roleForm" :model="roleForm" :rules="rules" label-position="left" label-width="100px" size="mini" style="width: 300px; margin-left:10%;">
                <el-form-item :label="$t('role.code')" prop="roleNo">
                  <el-input v-model="roleForm.roleNo" :disabled="!viewModel"/>
                </el-form-item>
                <el-form-item :label="$t('role.text')" prop="roleName">
                  <el-input v-model="roleForm.roleName"/>
                </el-form-item>
                <el-form-item>
                  <div style="float:right">
                    <el-button type="info" @click="dialogVisible = false">{{ $t('operation.cancel') }}</el-button>
                    <el-button type="primary" @click="saveRole">{{ $t('operation.save') }}</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :close-on-click-modal="false" :title="titleName[1]"  :visible.sync="dialogVisibleDep"  :before-close="close_add_edit2" width="60%" :append-to-body="true">
        <dept_addEdit ref="deptsAddEdits"  :editorVisible="dialogVisibleDep" @closeHide="close_add_edit2" />
    </el-dialog>

  </div>
</template>
<script>
// import { getList } from '@/api/modules/system/role'
import selectUser from '@/dialogs/selectUser'
import dept_addEdit from '../BasicData/components/DPtasksAddEdit'
import moment from 'moment'
export default {
  naem: 'Role',
  components: { dept_addEdit },
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
        callback(new Error(this.$t('common.message.info_create_groupNo')))
        return
      } else if (regExp.test(value) === false) {
        callback(new Error(this.$t('common.message.info_input_roleName')))
        return
      } else {
        callback()
      }
    }
    return {
      multipleSelection: undefined,
      listLoadinga: true,
      listLoading: true,
      total: undefined,
      currentRow: '',
      list: [],
      query: {
        id: '',
        page: 1,
        limit: 8,
        fullname: ''
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
        roleNo: '',
        roleName: ''
      },
      userData: {
        roleId: '',
        userStr: ''
      },
      userQuery: {
        page: 1,
        limit: 7,
        roleId: ''
      },
      roleUser: {
        roleId: '',
        userId: ''
      },
      listUser: null,
      tableKey: 0,
      totalUser: undefined,
      listModule: [],
      defaultCheckedModule: [],
      moduleTreeProps: { children: 'children', label: 'text' },
      dialogVisible: false,
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
    handleSizeChange(val) {
      this.userQuery.limit = val
      this.getUserRole()
    },
     handleCurrentChanges(val){
      this.userQuery.page = val
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
      this.list = []
      this.listLoadinga = true
      // return new Promise((resolve, reject) => {
      apiRole.listRole(this.query).then(responce => {
        this.list = responce.list
        this.total = responce.total
        this.listLoadinga = false
        if (this.list.length > 0) {
          this.$refs.roleTable.setCurrentRow(this.list[0])
        }
        // 默认选中第一组
      })
    },
    // 角色选中
    handleCurrentChange(val) {
      this.currentRow = val
      this.queryData.roleId = val.id
      this.handlerChangeRole()
      this.getUserRole()
    },
    // 重置表单
    resetDialog() {
      this.$refs['roleForm'].resetFields()
    },

    handleRole(row) {
      this.dialogVisible = true
      if (row === 'new') {
        this.viewModel = true
        this.dialogTitle = this.$t('role.newRole')
      } else {
        this.dialogTitle = this.$t('role.editRole')
        this.viewModel = false
        this.roleForm = { ...row }
        this.roleForm.createTime = moment(this.roleForm.createTime).format('YYYY-MM-DD HH:mm:ss')
        this.roleForm.updateTime = moment(this.roleForm.updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 角色新增保存
    saveRole() {
      var me = this
      me.$refs['roleForm'].validate(valid => {
        if (valid) {
          if (me.viewModel) {
            apiRole.createRole(me.roleForm).then(responce => {
              me.$message.success(me.$t('common.message.info_operation_success'))
              me.getRoleList()
            })
          } else {
            apiRole.updateRole(me.roleForm).then(responce => {
              me.$message.success(me.$t('common.message.info_operation_success'))
              me.getRoleList()
            })
          }
          me.dialogVisible = false
        }
      })
    },
    // 角色删除按钮点击事件
    amputatede(row) {
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        apiRole.deleteRole(row.id).then(responce => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.getRoleList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    },
    getUserRole() {
      this.userQuery.roleId = this.currentRow.id
      this.listLoading = true
      apiRole.listUser(this.userQuery).then(response => {
        this.listUser = response.list
        this.totalUser = response.total
        this.listLoading = false
      })
    },
    handlerChangeRole() {
      this.listModule = []
      this.defaultCheckedModule = []
      apiModule.listRoleModule({ roleCode: this.currentRow.id }).then(response => {
        this.listModule = response
        this.setDefaultCheckedModule(this.listModule)
      // })
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRoleUser(){
      if (this.multipleSelection === undefined) {
        this.$message.warning(this.$t('common.message.info_select_data'))
        return false
      } else {
        this.roleUser.roleId = this.currentRow.id
        this.roleUser.userId = this.multipleSelection.id
        apiRole.deleteRoleUser(this.roleUser).then(response => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.getUserRole()
        })
      }
    }
  }
}
</script>

<style>
.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 5px;
}
</style>
