<template>
  <!-- 人员管理界面 -->
  <div class="administrator-list container project-tasks">
    <el-form ref="query" :model="query" label-width="100px" label-position="right">
      <div class="queryContent">
        <el-row :gutter="20">
          <el-col :span="7" >
            <el-form-item :label="$t('classificationGoods.prodClassCdDis')">
                <el-input v-model="query.prodClassCdDis" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="7" >
            <el-form-item :label="$t('classificationGoods.prodClassNm')">
                <el-input v-model="query.prodClassNm" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="7" >
            <el-form-item :label="$t('classificationGoods.prodClassJc')">
                <el-input v-model="query.prodClassJc" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="7" >
            <el-form-item :label="$t('classificationGoods.prodClassNmEn')">
                <el-input v-model="query.prodClassNmEn" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="7" >
            <el-form-item :label="$t('classificationGoods.prodType')">
                <el-select v-model="query.prodType" clearable  >
                  <el-option
                    v-for="item in prodTypeOptions"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"/>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus"  @click="handleEdit()">{{ $t('operation.newlyAdded') }}</el-button>
          <el-button type="primary" icon="el-icon-search" @click="productClassList">{{ $t('operation.query') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list" :default-sort = "{prop: 'prodType', order: 'descending'}" @row-dblclick="handleEdit('edit')" border style="width: 100%">
      <el-table-column prop="prodClassCdDis" :label="$t('classificationGoods.list.prodClassCdDis')" width="120px" sortable align="left">
      </el-table-column>
      <el-table-column prop="prodClassNm" :label="$t('classificationGoods.list.prodClassNm')" sortable>
      </el-table-column>
      <el-table-column prop="prodClassJc" :label="$t('classificationGoods.list.prodClassJc')" sortable>
      </el-table-column>
      <el-table-column prop="prodClassNmEn" :label="$t('classificationGoods.list.prodClassNmEn')" sortable>
      </el-table-column>
      <el-table-column prop="prodType" :label="$t('classificationGoods.list.prodType')" sortable>
      </el-table-column>
      <el-table-column prop="remarks" :label="$t('classificationGoods.list.remarks')">
      </el-table-column>
      <el-table-column :label="$t('common.actions')" width="90px" align="center" fixed="right">
        <template slot-scope="scope">
           <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
             <el-button type="primary" size="mini" icon="el-icon-setting" circle plain @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
           <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
             <el-button size="mini" icon="el-icon-delete" type="danger"  circle plain @click="handleEdit('edit', scope.row)"></el-button>
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
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="titleName" width="30%" @open="resetDialog" >
      <div class="app-container">
        <el-form ref="classificationGoodForm"  :model="classificationGoodForm" >
          <div class="editContent" >
          <el-row >
            <!-- <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.cntrCd')">
                    <el-select v-model="classificationGoodForm.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')"  style="width:200px">
                      <el-option
                        v-for="item in cntrOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code"/>
                    </el-select>
                </el-form-item>
            </el-col> -->
            <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.prodClassCdDis')">
                  <el-input  v-model="classificationGoodForm.prodClassCdDis" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
                </el-form-item>
            </el-col>
            <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.prodClassNm')">
                  <el-input  v-model="classificationGoodForm.prodClassNm" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
                </el-form-item>
            </el-col>
            <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.prodClassJc')">
                  <el-input  v-model="classificationGoodForm.prodClassJc" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
                </el-form-item>
            </el-col>
            <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.prodClassNmEn')">
                  <el-input  v-model="classificationGoodForm.prodClassNmEn" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
                </el-form-item>
            </el-col>
            <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.prodType')">
                    <el-select v-model="classificationGoodForm.prodType" :placeholder="$t('personInfo.choose')" style="width:200px">
                      <el-option
                        v-for="item in prodTypeOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code"/>
                    </el-select>
                </el-form-item>
              </el-col>
           <el-col :span="20" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('classificationGoods.list.remarks')">
                  <el-input type="textarea" v-model="classificationGoodForm.remarks" clearable :placeholder="$t('placeholders.content')" style="width:200px"/>
                </el-form-item>
            </el-col>
            </el-row>
        </div>
        <div class="Btnfooter">
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
            <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
          </el-form-item>
        </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      prodTypeOptions: [{code:'01',text:'纱线'},
        {code:'02',text:'布料'},
        {code:'03',text:'染料'},
        {code:'04',text:'助剂'},
        {code:'05',text:'包装材料'},
        {code:'06',text:'零配件'},
        {code:'07',text:'其他'},],
      total: 4,
      classificationGoodForm:{
        // id: "",
        // cntrCd: "1",
        // prodClassCd: "1",
        // prodClassNm: "一级品",
        // prodClassJc: "",
        // prodType: "01",
        // remarks: "",
        id:"4",cntrCd: "1",prodClassCd: "04",prodClassNm: "汗布",prodClassJc: "S01",prodType: "02",remarks: "一等品",
      },
      list: [
        // {id:"1",cntrCd: "1",prodClassCd: "纱线",prodClassNm: "粉色A-52号砂",prodClassJc: "粉A-52",prodType: "纱线",remarks: "一等品",},
        // {id:"2",cntrCd: "1",prodClassCd: "布料",prodClassNm: "藏青A-52号砂",prodClassJc: "藏A-52",prodType: "纱线",remarks: "一等品",},
        // {id:"3",cntrCd: "1",prodClassCd: "染料",prodClassNm: "卡其A-52号砂",prodClassJc: "卡A-52",prodType: "纱线",remarks: "一等品",},
        // {id:"4",cntrCd: "1",prodClassCd: "助剂",prodClassNm: "睿黑A-52号砂",prodClassJc: "睿A-52",prodType: "纱线",remarks: "一等品",},
        //布料
        {prodClassCdDis:"1",cntrCd: "1",prodClassCd: "布料",prodClassNm: "汗布",prodClassNmEn: "hb",prodClassJc: "S01",prodType: "布料",remarks: "一等品",},
        {prodClassCdDis:"2",cntrCd: "1",prodClassCd: "布料",prodClassNm: "棉毛布",prodClassNmEn: "mmb",prodClassJc: "D06",prodType: "布料",remarks: "一等品",},
        {prodClassCdDis:"3",cntrCd: "1",prodClassCd: "布料",prodClassNm: "罗马布",prodClassNmEn: "lmb",prodClassJc: "D08",prodType: "布料",remarks: "一等品",},
        //纱线
        {prodClassCdDis:"1",cntrCd: "1",prodClassCd: "纱线",prodClassNm: "腈纶",prodClassNmEn: "ql",prodClassJc: "AY",prodType: "纱线",remarks: "一等品",},
        {prodClassCdDis:"2",cntrCd: "1",prodClassCd: "纱线",prodClassNm: "尼龙",prodClassNmEn: "nl",prodClassJc: "NY",prodType: "纱线",remarks: "一等品",},
        {prodClassCdDis:"3",cntrCd: "1",prodClassCd: "染料",prodClassNm: "有机棉纱",prodClassNmEn: "yjms",prodClassJc: "OR",prodType: "纱线",remarks: "一等品",},

        ],
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        cntrCd:'1',
        prodClassCd:'1',
        prodClassNm:'',
        prodClassJc:'',
        prodType:'',
      },
      dialogVisible: false,
      titleName:'',
    }
  },
  created() {
    return {}
  },
  computed: {
  },
  methods: {
    resetDialog() {
      // this.$refs['levelManagementForm'].resetFields()
    },
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
    handleCreate() {
      // this.$router.push({ path: 'classificationGoodsOver'})
      
    },
    personList() {
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
    onSubmit1() {
      // this.$refs['classificationGoodForm'].validate(valid => {
      //   if (valid) {
      //     for(var i = 0; i < this.value.length; i++) {
      //       // this.edit.startDate = unixToDateTime(this.value[0])
      //       // if(this.value[1] != "" && this.value[1] != undefined) {
      //       //   this.projectForm.endDate = unixToDateTime(this.value[1])
      //       // }
      //     }
      //   }
      // })
      this.dialogVisible=false
    },
    // 返回
    backPoject() {
      this.dialogVisible=false
    },
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
    },
  }
}
</script>

<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding-top: 10px;
}
.Btnfooter{
  margin-top:10px;
}
.el-dialog__body{
  padding-top: 0;
}

</style>
