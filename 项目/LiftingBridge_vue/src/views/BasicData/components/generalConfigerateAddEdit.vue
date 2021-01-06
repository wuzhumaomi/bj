<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="通用配置-编辑新增"  width="85%" append-to-body>
   <!--通用配置-编辑新增 -->
  <div class="app-container">
    <el-form ref="edit"  :model="edit" :rules="rules" >
      <div class="editContent">
        <el-row :gutter="23" style="padding:12px 12px 2px 12px;margin-top:6px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--中心编号--> 
              <!-- <el-form-item  disabled :label="$t('common.cntrCd')" label-width="60px" >
                <el-select disabled v-model="cntrList.value" :placeholder="$t('上海题桥')" @change="getAllProjects(MyData.proId,'change')">
                  <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item> -->
            </div>
          </el-col>
           <el-col :span="8">
            <div class="grid-content bg-purple">
              <!-- 配置编号 -->
              <el-form-item :label="$t('generalConfiguratOver.priority')" prop="priority" label-width="80px">
                <el-input v-model="edit.priority" clearable :placeholder="$t('placeholders.content')" maxlength="30"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!-- 配置名称 -->
              <el-form-item :label="$t('generalConfiguratOver.subProject')" prop="subProject" label-width="110px">
                <el-input  v-model="edit.subProject" clearable :placeholder="$t('placeholders.content')" maxlength="100"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <hr> -->
      <el-card shadow="always" class="tab_border">
          <el-form-item  prop="description">
            <el-col :span="24">
              <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(1)">{{ $t('common.addAline') }}</el-button>
              <el-table
                :data="list"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                class="intervalRows">
                <el-table-column :label="$t('generalConfiguratOver.generalCd')" align="center" width="180">
                  <template slot-scope="scope">
                    <!-- <span>{{ scope.row.supplierLineNum }}</span> -->
                    <el-input v-model="scope.row.generalCd" class="module" maxlength="30" type="text"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('generalConfiguratOver.generalNm')" align="center" width="300">
                  <template slot-scope="scope"> 
                    <el-input v-model="scope.row.generalNm" class="module" maxlength="100"  type="text"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('generalConfiguratOver.generalAbbr')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.generalAbbr" class="module" maxlength="50"  type="text"/> 
                  </template>
                </el-table-column>
                <!-- 文本1	 -->
                <el-table-column :label="$t('generalConfiguratOver.char1')" prop="char1" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.char1 }}</span>
                  </template>
                </el-table-column>
                <!-- 文本2	 -->
                <el-table-column :label="$t('generalConfiguratOver.char2')" prop="char2" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.char2 }}</span>
                  </template>
                </el-table-column>
                <!-- 文本3	 -->
                <el-table-column :label="$t('generalConfiguratOver.char3')" prop="char3" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.char3 }}</span>
                  </template>
                </el-table-column>
                <!-- 文本4	 -->
                <el-table-column :label="$t('generalConfiguratOver.char4')" prop="char4" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.char4 }}</span>
                  </template>
                </el-table-column>
                <!-- 文本5	 -->
                <el-table-column :label="$t('generalConfiguratOver.char5')" prop="char5" width="100px"  sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.char5 }}</span>
                  </template>
                </el-table-column>
                <!-- 数值1	 -->
                <el-table-column :label="$t('generalConfiguratOver.num1')" prop="num1" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.num1 }}</span>
                  </template>
                </el-table-column>
                <!-- 数值1	 -->
                <el-table-column :label="$t('generalConfiguratOver.num2')" prop="num2" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.num2 }}</span>
                  </template>
                </el-table-column>
                <!-- 数值1	 -->
                <el-table-column :label="$t('generalConfiguratOver.num3')" prop="num3" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.num3 }}</span>
                  </template>
                </el-table-column>
                <!-- 数值1	 -->
                <el-table-column :label="$t('generalConfiguratOver.num4')" prop="num4" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.num4 }}</span>
                  </template>
                </el-table-column>
                <!-- 数值1	 -->
                <el-table-column :label="$t('generalConfiguratOver.num5')" prop="num5" width="100px" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{ scope.row.num5 }}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column :label="$t('generalConfiguratOver.comment1')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.comment1" class="module" maxlength="100"  type="text"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('generalConfiguratOver.comment2')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.comment2" class="module" maxlength="100"  type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('generalConfiguratOver.defaultType')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.defaultType" class="module" type="text"/> 
                  </template>
                </el-table-column>
                <el-table-column :label="$t('generalConfiguratOver.systemType')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.systemType" class="module" type="text"/> 
                  </template>
                </el-table-column> -->

                <el-table-column :label="$t('channel.operation')" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delete')" placement="bottom">
                      <el-button  type="danger" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,1)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
      </el-card>
      <!-- <el-form-item :label="$t('salesOrder.comment')" prop="description">
        <el-input type="textarea" rows="6" cols="100"></el-input>
      </el-form-item> -->
      <div class="Btnfooter">
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
    <product_list @func="getMsgFormSon" ref="productLists" />
    <productYarn_list @func="getMsgFormSon" ref="productYarnLists" />
  </div>
</el-dialog>
</template>

<script>
// import { apiProject, apiProTasks } from '@/api'
import product_list from '@/views/Supplier/productList'
import productYarn_list from '@/views/Supplier/productYarnList'
export default {
  name:'productList',
  components: {
    product_list,
    productYarn_list,
  },
  data() {
    return {
    list: [
        {
          priority:'SEX_CD',
          subProject:'性别',
          generalCd:'0',
          generalNm:'女',
          generalAbbr:'女',
          comment1:'女',
          comment2:'注释2',
          defaultType:'0',
          systemType:'0'
        },
        {
          priority:'SEX_CD',
          subProject:'性别',
          generalCd:'1',
          generalNm:'男',
          generalAbbr:'男',
          comment1:'男',
          comment2:'注释2',
          defaultType:'0',
          systemType:'0'
        },
      ],
    edit:{
        priority:'SEX_CD',
        subProject:'性别',
    },
    cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      // supplierList: [
      //   { id: '001', value: '供应商1' },
      //   { id: '002', value: '供应商2' }
      // ],
      // supType: [
      //   { id: '01', value: '纱线' },
      //   { id: '02', value: '染化料助剂' },
      //   { id: '03', value: '包装材料' },
      //   { id: '04', value: '五金' },
      //   { id: '05', value: '特殊' },
      //   { id: '09', value: '全类型' },
      // ],
      // paymentType:[
      //   { id: '01', value: '现结' },
      //   { id: '02', value: '月结' },
      //   { id: '03', value: '季结' },
      //   { id: '04', value: '半年结'},
      //   { id: '05', value: '年结' },
      // ],
      query: {
        page: 1,
        limit: 10,
        isPublish: '',
        orderType:'',
        salesType:'',
        orderNumber:'',
        customer:'',
      },
      projectList: [],
      salesForm:{
        orderNumber:'',
        customer:'',
        dateOrder:'',
        salesType:'',
        orderType:'',
        shippingWay:'',
        shortOverShipped1:'',
        shortOverShipped2:'',
        modifyNumberTimes:' 2次',
        modificationDate:'2018-03-08'
      },
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      dialogVisible: false,
      rules: {
          priority: [{ required: true,message:'配置编号不能为空'}],
          subProject:[{ required: false,message:'配置名称不能为空'}],
          generalCd: [{ required: true,message:'项目编号不能为空'}],
          generalNm:[{ required: false,message:'项目名称不能为空'}]
          // zoneNm: [{ required: true,message:'区域名不能为空'}]
      },
    }
  },
  created() {

  },
  methods: {
    checkNo(value){
      console.log('ss');
      let reg = /^[1-9]\d*$/;
      if (value) {
        if (value > 999999 || new RegExp(reg).test(value) == false) {
          setTimeout(() => {
             return 0;
          }, 200);
        }
      }
    },
    checkEN(value){
      debugger
      let reg = /[a-zA-Z]+/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          this.edit.supplierNmEn="";
        }
      }
    },
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },

    //客户组件
    supplierEdit() {
      this.$refs.supplierEdits.open()
    },
    //客户组件
    productList() {
      //this.dialogVisible=false,
      this.$refs.productLists.open()
    },
        //客户组件
    productYarnList() {
      //this.dialogVisible=false,
      this.$refs.productYarnLists.open()
    },

    onSubmit1() {
      this.dialogVisible = false
    },
    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
    },

    // 返回
    backPoject() {
      this.dialogVisible=false
      //this.$router.push({ path: '/salesOrder'})
    },
    // 新增模块增加一行
    addRow(index) {
      if(index === 1){
        this.rowBranches(this.list);
      }else if(index === 2){
        this.rowBranches(this.tableData2);
      }else if(index === 3){
        this.rowBranches(this.tableData3);
      }else{
        console.log('error',index);
      }
    },
    rowBranches(datas) {
      if(datas.length > 4) {
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

    customerOrder() {
      this.$refs.customerOrders.open()
    },

    // 新增模块减少一行
    reduceRow(val,number) {
      if(number === 1){
        this.list.splice(val, 1)
      }else if(number ===2){
        this.tableData2.splice(val, 1)
      }else if(number ===3){
        this.tableData3.splice(val, 1)
      }else{
        console.log('error',number);
      }
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
.tab_border{
  margin: 12px 10px;
}
.tab_border .el-card__body{
  height: auto;
}
.inputTextarea textarea{
  resize:none;
}
.but_bottom{
  float:right;margin-bottom:16px
}

.intervalRows{
  margin-bottom: 10px
}

</style>
