<template>
  <el-dialog :visible.sync="visible" :title="$t('dialogTitle.personSelecter')" @close="handleCancel">
    <div class="filter-container">
      <el-input :placeholder="$t('personInfo.personnelNumber')" v-model="query.personNo" clearable style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('personInfo.name')" v-model="query.fullname" clearable style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      ref="tableProduct"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="300"
      @current-change="handleSelectionCurrentChange"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="multiSelection == true" type="selection" width="55"/>
      <el-table-column :label="$t('personInfo.personnelNumber')">
        <template slot-scope="scope"><span>{{ scope.row.personNo }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('personInfo.name')">
        <template slot-scope="scope"><span>{{ scope.row.fullname }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('personInfo.sex')">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">{{ $t('personInfo.man') }}</span>
          <span v-if="scope.row.sex == 0">{{ $t('personInfo.woman') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('personInfo.position')">
        <template slot-scope="scope"><span>{{ scope.row.professional }}</span></template>
      </el-table-column>
    </el-table>
    <!-- 翻页控制条 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="query.page" :page-sizes="[10,20,30,50]" :page-size="query.limit" :total="total" size="mini" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleConfirm">{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { apiPerson } from '@/api'
import { unixToDateTime } from '../utils/formater'
export default {
  name: 'SelectPerson',
  props: {
    visible: { type: Boolean, default: true },
    multiSelection: { type: Boolean, default: false }
  },
  data() {
    return {
      listLoading: false,
      // 商品选择对话框
      query: {
        page: 1,
        limit: 20,
        prodCode: undefined,
        prodName: undefined,
        isEnabled: '1'
      },
      list: [],
      total: null,
      selected: undefined
    }
  },
  watch: {
    visible: function() {
      if (this.visible) {
        this.getList()
      }
    }
  },
  created() {
  },
  methods: {
    handleFilter() {
      this.query.page = 1
      this.getList()
    },
    // 人员一览显示页大小改变
    handleSizeChange(val) {
      this.query.limit = val
      this.getList()
    },
    // 人员一览
    handleCurrentChange(val) {
      this.query.page = val
      this.getList()
    },
    // 取得人员一览
    getList() {
      this.listLoading = true
      apiPerson.listPerson(this.query).then(response => {
        this.list = response.list
        for (var i = 0; i < response.list.length; i++) {
          this.list[i].birthdate = unixToDateTime(response.list[i].birthdate)
        }
        this.total = response.total
        this.listLoading = false
      })
    },
    handleSelectionCurrentChange(currentRow, oldCurrentRow) {
      if (this.multiSelection === false) {
        this.selected = currentRow
      }
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
