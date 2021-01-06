<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="仓库-编辑新增"  width="85%">
   <!-- 仓库-编辑新增 -->
  <div class="app-container">
    <el-form ref="whEdit"  :model="whEdit" :rules="rules" >
      <div class="editContent">
        <el-row :gutter="23" style="padding:10px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!-- 中心编号 -->
              <el-form-item  :label="$t('warehouse.cntrCd')"  prop="orderNumber" label-width="80px">
                <el-select disabled v-model="whEdit.cntrCd"  :placeholder="$t('上海题桥')" >
                  <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('warehouse.whNmJc')" prop="whNmJc" label-width="80px">
                <el-input clearable v-model="whEdit.whNmJc" :placeholder="$t('placeholders.content')" maxlength="50">
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('warehouse.accept')" prop="accept" label-width="80px">
                <el-input clearable v-model="whEdit.accept" :placeholder="$t('placeholders.content')" maxlength="100" >
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.comment')" prop="place" label-width="80px">
                <el-input clearable v-model="whEdit.comment" rows="2" cols="100" type="textarea" style="width:260%;" maxlength="400">
                </el-input>
              </el-form-item>
              <!-- <el-form-item :label="$t('salesOrder.comment')" prop="accept">
                <el-input type="textarea" rows="2" cols="100" v-model="whEdit.accept"></el-input>
              </el-form-item> -->
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('warehouse.whCdDis')" prop="whCdDis" label-width="80px">
                <el-input clearable v-model="whEdit.whCdDis" :placeholder="$t('placeholders.content')" maxlength="10" >
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('warehouse.whType')" prop="whType" label-width="80px">
                <el-select v-model="whEdit.whType"  :placeholder="$t('personInfo.choose')">
                  <el-option v-for="item in whList" :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('warehouse.whNm')" prop="whNm" label-width="80px">
                <el-input  clearable v-model="whEdit.whNm" :placeholder="$t('placeholders.content')"  maxlength="50"/>
              </el-form-item>
              <el-form-item :label="$t('warehouse.place')" prop="place" label-width="80px">
                <el-input clearable v-model="whEdit.place" :placeholder="$t('placeholders.content')" maxlength="200">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form-item :label="$t('warehouse.remarks')" prop="shortOverShipped" label-width="110px">
                  <el-input v-model="msgFormSon"  clearable :placeholder="$t('placeholders.content')" >
                </el-input>
              </el-form-item>
            </div>
          </el-col> -->
        </el-row>
      </div>
      <!-- <hr> -->
      <el-card shadow="always" class="tab_border">
          <el-form-item  prop="description">
            <el-col :span="24">
              <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(1)">{{ $t('common.addAline') }}</el-button>
              <el-table
                :data="tableData1"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                class="intervalRows">
                <!-- <el-table-column :label="$t('warehouse.whNm')" align="center" width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.whNm" class="module" maxlength="10"  show-word-limit type="text"/>
                    <span>{{ scope.row.whNm }}</span>
                  </template>
                </el-table-column> -->
                <el-table-column :label="$t('zone.zoneCdDis')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.zoneCdDis" class="module" maxlength="10" type="text"/> 
                    <!-- <span>{{ scope.row.zoneCdDis }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('zone.zoneNm')" align="center" width="223">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.zoneNm" class="module" maxlength="50" type="text"/> 
                    <!-- <span>{{ scope.row.zoneNm }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('zone.remarks')" align="center" width="500">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remarks" :rows="1" class="module" maxlength="400" type="text" /> 
                    <!-- <span>{{ scope.row.remarks }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('channel.operation')" width="100" align="center">
                    <template slot-scope="scope">
                      <div class="button" style="text-align:center">
                      <el-tooltip :content="$t('operation.delete')"  effect="dark" placement="bottom"  >
                        <el-button icon="el-icon-delete" size="mini" circle  type="danger" plain @click="reduceRow(scope.$index,1)"></el-button><!-- 取消 -->
                      </el-tooltip>
                    </div>
                    </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
          <el-pagination
              :current-page.sync="query.page"
              :page-sizes="[10,20,30,50]"
              :page-size="query.limit"
              :total="total"
              layout="total, sizes, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
      </el-card>
      <div class="Btnfooter">
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
        <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
      </el-form-item>
      </div>
    </el-form>
    <!-- <product_list @func="getMsgFormSon" ref="productLists" /> -->
  </div>
 </el-dialog>
</template>

<script>
// import { apiProject, apiProTasks } from '@/api'
import product_list from '@/views/Supplier/productList'
import { fips } from 'crypto';
export default {
  name:'productList',
  components: {
    product_list,
  },
  data() {
    return {
      total: 3,
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      whList: [
        { id: '01', value: '坯纱' },
        { id: '02', value: '染化料助剂' },
        { id: '03', value: '毛坯布' },
        { id: '04', value: '成品' },
        { id: '05', value: '五金' },
        { id: '06', value: '样品间' },
        { id: '07', value: '档案室' }  
      ],
      whEdit:{
          id: '111111',
          cntrCd: '001',
          whCdDis: '#1',
          whNm: '筒纱毛坯仓',
          whNmJc: '筒纱毛坯仓',
          whType: '坯纱',
          place: '江苏题桥',
          accept: '张三',
          remarks: '备注'
      },
      tableData1: [{
          id: '111111',
          whNm: '筒纱毛坯仓',
          zoneCdDis: 'zone001',
          zoneNm: '临时存放区域',
          remarks: '轻拿轻放',
        },
        {
          id: '111112',
          whNm: '长纤毛坯纱仓',
          zoneCdDis: 'zone002',
          zoneNm: '散货区域',
          remarks: '轻拿轻放',
        },
        {
          id: '111113',
          whNm: '长纤毛坯纱仓',
          zoneCdDis: 'zone003',
          zoneNm: '普通存放区域',
          remarks: '轻拿轻放',
        }],
        query: {
        page: 1,
        limit: 10,
        isPublish: '',
        orderType:'',
        salesType:'',
        orderNumber:'',
        customer:'',
      },
      dialogVisible: false,
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      rules: {
          whNm: [{ required: true,message:'仓库名不能为空'}],
          whCdDis:[{ required: false,message:'仓库名不能为空'}]
          // zoneNm: [{ required: true,message:'区域名不能为空'}]
      },
    }
  },
  created() {

  },
  methods: {
    // checkNo(value){
    //   console.log('ss');
    //   let reg = /^[1-9]\d*$/;
    //   if (value) {
    //     if (value > 999999 || new RegExp(reg).test(value) == false) {
    //       setTimeout(() => {
    //          return 0;
    //       }, 200);
    //     }
    //   }
    // },
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
    productList() {
      debugger
      this.$refs.productLists.open()
      // this.varChangeColor = true;
    },

   // 获取数据
    personList() {
      console.log('刷新');
      this.$router.go(0);
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

    onSubmit1() {
      this.dialogVisible=false
    },

    // 返回
    backPoject() {
      this.dialogVisible=false
     // this.$router.push({ path: '/locationList'})
    },
    // 新增模块增加一行
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

    open() {//只能开始一次。
      debugger
      this.dialogVisible = true
    },
    //删除列表
    handleDelete(index, row) {
      this.list.splice(index, 1);
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
