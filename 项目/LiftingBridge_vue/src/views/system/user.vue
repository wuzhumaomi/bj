<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('user.loginName')" v-model="query.loginName" style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('user.fullname')" v-model="query.fullname" style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="query.loginType" :placeholder="$t('user.loginType')" clearable style="width: 120px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in optionsLoginType" :key="item.code" :label="item.text" :value="item.code"/>
      </el-select>
      <el-select v-model="query.isLocked" :placeholder="$t('user.isLocked')" clearable style="width: 120px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in optionsLocked" :key="item.code" :label="item.text" :value="item.code"/>
      </el-select> -->
      <el-select  v-model="query.isEnabled" :placeholder="$t('common.isEnabled')" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in optionsEnabled" :key="item.code" :label="item.text" :value="item.code"/>
      </el-select>
      <el-button v-waves v-power="'search'" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
      <el-button v-power="'create'" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('common.create') }}</el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('common.export') }}</el-button> -->
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('user.loginName')" align="left" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.fullname')" align="left" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.person == null ? null:scope.row.person.fullname }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('user.loginType')" align="left" width="90">
        <template slot-scope="scope">
          <span>{{ loginTypeFilter(scope.row.loginType) }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('user.isLocked')" class-name="status-col" width="70">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isLocked != ''" :type="scope.row.isLocked == '0' ? 'success' : 'danger'">{{ lockedFilter(scope.row.isLocked) }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('common.isEnabled')" class-name="status-col" width="70">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled != ''" :type="scope.row.isEnabled == '1' ? 'success' : 'danger'" >{{ enabledFilter(scope.row.isEnabled) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.createTime')" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.remark')" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" align="left" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope" >
          <el-button v-power="'edit'" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button v-power="'Prohibit'" v-if="scope.row.isEnabled != ''" :type="scope.row.isEnabled == '1' ? 'danger' : 'success'" size="mini" @click="handleEnabled(scope.row)">{{ enabledFilter(scope.row.isEnabled=='1'?'0':'1') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="query.page" :page-sizes="[10,20,30, 50]" :page-size="query.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="editData" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('user.loginName')" prop="loginName">
          <el-input v-model="editData.loginName" :disabled="dialogStatus != 'create'"/>
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password">
          <el-input v-model="editData.password" type="password"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('user.fullname')" prop="fullname">
          <el-input v-model="editData.fullname"/>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('user.loginType')" prop="loginType">
          <el-select v-model="editData.loginType" class="filter-item">
            <el-option v-for="item in optionsLoginType" :key="item.code" :label="item.text" :value="item.code"/>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('user.relationPerson')" prop="personId">
          <span>{{ editData.person == null ? '暂无关联': editData.person.fullname }}</span>
          <el-button icon="el-icon-search" circle @click="showSelectPerson = true"/>
        </el-form-item>
        <el-form-item :label="$t('common.remark')" prop="remark">
          <el-input v-model="editData.remark" type="textarea" />
        </el-form-item>
        <!-- <el-form-item :label="$t('user.isLocked')">
          <el-select v-model="editData.isLocked" class="filter-item">
            <el-option v-for="item in optionsLocked" :key="item.code" :label="item.text" :value="item.code"/>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('common.isEnabled')">
          <el-select v-model="editData.isEnabled" class="filter-item">
            <el-option v-for="item in optionsEnabled" :key="item.code" :label="item.text" :value="item.code"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('common.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog> -->
    <select-person :visible="showSelectPerson" @confirm="confirmPerson" @cancel="showSelectPerson=false"/>
  </div>
</template>

<script>
import { apiClass, apiUsers } from '@/api'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import selectPerson from '@/dialogs/selectPerson'

const defaultEditData = {
  id: undefined,
  loginName: '',
  password: '',
  fullname: '',
  personId: '',
  remark: '',
  isEnabled: '1',
  creator: undefined,
  updater: undefined,
  createTime: new Date(),
  updateTime: new Date()
}
export default {
  name: 'UserManage',
  components: { selectPerson },
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      showSelectPerson: false,
      person: null,
      query: {
        page: 1,
        limit: 20,
        loginName: undefined,
        fullname: undefined,
        loginType: undefined,
        isLocked: undefined,
        isEnabled: '1'
      },
      optionsEnabled: [],
      // optionsLoginType: [],
      editData: Object.assign({}, defaultEditData),
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitle: {
        update: this.$t('common.update'),
        create: this.$t('common.create')
      },
      rules: {
        loginName: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        fullname: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        loginType: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    lockedFilter() {
      return function(isLocked) {
        return apiClass.classFilter(this.optionsLocked, isLocked)
      }
    },
    enabledFilter() {
      return function(isEnabled) {
        return apiClass.classFilter(this.optionsEnabled, isEnabled)
      }
    }
  },
  created() {
    this.getEnabled()
    this.getList()
  },
  methods: {
    getEnabled() {
      apiClass.listClass({ parentCode: 'IS_ENABLED' }).then(response => {
        this.optionsEnabled = response
      })
    },
    // getLocked() {
    //   apiClass.listClass({ parentCode: 'IS_LOCKED' }).then(response => {
    //     this.optionsLocked = response
    //   })
    // },
    getList() {
      var me = this
      me.listLoading = true
      apiUsers.userList(me.query).then(response => {
        me.list = response.list
        me.total = response.total
        me.listLoading = false
      })
    },
    confirmPerson(selectPerson) {
      this.editData.person = selectPerson
      this.showSelectPerson = false
    },
    handleFilter() {
      this.query.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: this.t$('common.actions') + this.t$('common.success'),
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.editData = Object.assign({}, defaultEditData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      var me = this
      if (this.editData.person !== null) {
        me.editData.personId = this.editData.person.id
      }
      me.$refs['dataForm'].validate((valid) => {
        if (valid) {
          apiUsers.createUser(me.editData).then(() => {
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
      this.editData = Object.assign({}, row) // copy obj
      if (row.person !== null) {
        this.editData.personId = row.person.id
      }
      this.editData.person = row.person
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
          if (me.editData.person !== null) {
            me.editData.personId = me.editData.person.id
          }
          const tempData = Object.assign({}, me.editData)
          apiUsers.updateUser(tempData).then(() => {
            for (const v of me.list) {
              if (v.id === me.editData.id) {
                const index = me.list.indexOf(v)
                me.list.splice(index, 1, this.editData)
                break
              }
            }
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
    handleEnabled(row) {
      var me = this
      const isEnabledValue = row.isEnabled === '1' ? '0' : '1'
      apiUsers.isEnabled({ userId: row.id, isEnabled: isEnabledValue }).then(() => {
        row.isEnabled = isEnabledValue
        me.$notify({
          title: me.$t('common.success'),
          message: me.$t('common.update') + me.$t('common.success'),
          type: 'success',
          duration: 2000
        })
      })
    },
    handleLocked(row) {
      var me = this
      const isLockedValue = row.isLocked === '1' ? '0' : '1'
      apiUsers.isLocked({ userId: row.id, isLocked: isLockedValue }).then(() => {
        row.isLocked = isLockedValue
        me.$notify({
          title: me.$t('common.success'),
          message: me.$t('common.update') + me.$t('common.success'),
          type: 'success',
          duration: 2000
        })
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } if (j === 'isLocked') {
          return this.lockedFilter(v[j])
        } if (j === 'isEnabled') {
          return this.enabledFilter(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
