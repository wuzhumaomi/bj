<template>
  <el-dialog :visible.sync="visible" :title="$t('dialogTitle.selectUser')" @close="handleCancel">
    <div class="app-container">
      <div class="filter-container">
        <el-input :placeholder="$t('user.loginName')" v-model="query.loginName" style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-input :placeholder="$t('user.fullname')" v-model="query.fullname" style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
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
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
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
        <el-table-column :label="$t('common.createTime')" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.remark')" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination v-show="total>0" :current-page="query.page" :page-sizes="[10,20,30, 50]" :page-size="query.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('common.confirm') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { apiUsers } from '@/api'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'SelectUser',
  directives: {
    waves
  },
  props: {
    visible: { type: Boolean, default: true },
    multiSelection: { type: Boolean, default: false }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      selected: [],
      query: {
        page: 1,
        limit: 20,
        loginName: undefined,
        fullname: undefined,
        loginType: undefined,
        isLocked: undefined,
        isEnabled: '1'
      }
    }
  },
  watch: {
    visible: function() {
      if (this.visible) {
        this.getList()
      }
    }
  },
  methods: {
    handleFilter() {
      this.query.page = 1
      this.getList()
    },
    // 人员一览
    handleCurrentChange(val) {
      this.query.page = val
      this.getList()
    },
    // 人员一览显示页大小改变
    handleSizeChange(val) {
      this.query.limit = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      apiUsers.userList(this.query).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },
    handleSelectionChange(selection) {
      this.selected = selection
    },
    handleConfirm() {
      this.$emit('confirm', this.selected)
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
