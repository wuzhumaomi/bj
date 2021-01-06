<template>
   <!-- 销售订单-编辑新增 -->
  <div class="app-container">
    <el-form ref="salesForm"  :model="salesForm" >
      <div>
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesOrder.orderNumber')"  prop="orderNumber" label-width="80px">
              <el-input  clearable   v-model="salesForm.orderNumber" :placeholder="$t('placeholders.content')"  maxlength="20"/>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.dateOrder')" prop="dateOrder" label-width="80px">
                <el-date-picker  v-model="salesForm.dateOrder" type="date" placeholder="选择日期" >
                </el-date-picker>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.shortOverShipped')" prop="shortOverShipped" label-width="80px">
                <el-row :gutter="24" style="float: left;">
                  <el-col :span="11" >
                    <el-input  clearable  v-model="salesForm.shortOverShipped1"  :placeholder="$t('placeholders.content')"  maxlength="20">
                      <template slot="prepend">➖</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="padding:0;text-align: center;" >
                    /
                  </el-col>
                  <el-col :span="11">
                    <el-input  clearable  v-model="salesForm.shortOverShipped2"  :placeholder="$t('placeholders.content')"  maxlength="20">
                      <template slot="prepend">➕</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item  :label="$t('salesOrder.salesType')" prop="salesType" label-width="80px">
                  <el-select v-model="salesForm.salesType"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                    <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
                  </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.customer')" prop="customer" label-width="80px">
                <el-input  clearable  v-model="salesForm.customer"  :placeholder="$t('placeholders.content')"  maxlength="20"/>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.merchandiser')" prop="merchandiser" label-width="80px">
                <el-input v-model="msgFormSon"  clearable :placeholder="$t('placeholders.content')" >
                 <template slot="append" >
                   <el-button slot="append"  icon="el-icon-search" @click="customerOrder()" style=" background: #1890ff; color: #ffffff;border-radius: inherit;"></el-button>
                 </template>
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.modificationDate')" prop="modificationDate" label-width="80px">
                {{ salesForm.modificationDate }}
                <!-- <el-date-picker v-model="salesForm.modificationDate" type="date" placeholder="选择日期" :disabled="true">
                </el-date-picker> -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.orderType')" label-width="80px" prop="orderType">
                  <el-select v-model="salesForm.orderType"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                    <el-option v-for="item in projectList"   :key="item.id" :label="item.proNm" :value="item.id"/>
                  </el-select>
              </el-form-item>
              <el-form-item  :label="$t('salesOrder.shippingWay')" prop="shippingWay" label-width="80px">
                  <el-select v-model="salesForm.shippingWay"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                    <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
                  </el-select>
              </el-form-item>
               <el-form-item :label="$t('salesOrder.modifyNumberTimes')" prop="modifyNumberTimes" label-width="80px">
                 {{ salesForm.modifyNumberTimes }}
                  <!-- <el-input  clearable  v-model="salesForm.modifyNumberTimes"  :placeholder="$t('placeholders.content')"  maxlength="20"/> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <hr>
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
                <el-table-column :label="$t('salesOrder.modelNo')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.modelNo" class="module" maxlength="10"  show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.yarnFabrics')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input type="textarea" class="inputTextarea" v-model="scope.row.yarnFabrics" rows="3" cols="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.arnProperties')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input  type="textarea" class="inputTextarea" v-model="scope.row.arnProperties" rows="3" cols="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.colorNo')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input  type="textarea" class="inputTextarea" v-model="scope.row.colorNo" rows="3" cols="20"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.colourSystem')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.colourSystem"  :placeholder="$t('personInfo.choose')" @change="getAllProjects(MyData.proId,'change')">
                      <el-option v-for="item in projectList"  :key="item.id" :label="item.proNm" :value="item.id"/>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.colorCombination')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.colorCombination" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.ofTheGoods')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ofTheGoods" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.cycle')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cycle" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.effectiveWidth')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.effectiveWidth" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.gramWeight')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.gramWeight" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.shrinkage')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.shrinkage" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.quantityKGS')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.quantityKGS" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.comment')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.comment" class="module" maxlength="10" show-word-limit type="text"/>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('channel.operation')" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                      <el-button  type="info" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,1)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
      </el-card>
      <el-card shadow="always" class="tab_border">
        <el-form-item  prop="description">
          <el-col :span="24">
            <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(2)">{{ $t('common.addAline') }}</el-button>
            <el-table
              :data="tableData2"
              ref="table"
              tooltip-effect="dark"
              border
              stripe
              class="intervalRows">
              <el-table-column :label="$t('salesOrder.modelNo')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.modelNo" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.id')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.id" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.yarnFabrics')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input type="textarea" class="inputTextarea" v-model="scope.row.yarnFabrics" rows="3" cols="20"></el-input>
                </template>
              </el-table-column>
               <el-table-column :label="$t('salesOrder.arnProperties')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input type="textarea" class="inputTextarea" v-model="scope.row.arnProperties" rows="3" cols="20"></el-input>
                  </template>
                </el-table-column>
              <el-table-column :label="$t('salesOrder.colorNo')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input type="textarea" class="inputTextarea" v-model="scope.row.colorNo" rows="3" cols="20"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.hue')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.hue" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.use')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.use" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.unit')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.ALL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ALL" onkeypress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" :maxlength="4" @change="checkNo(scope.row.ALL)"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PS')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PS" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.s')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.s" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PM')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PM" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.M')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.M" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.L')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.L" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.XL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.XL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PXXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PXXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.XXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.XXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PXXXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PXXXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.XXXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.XXXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.PXXXXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.PXXXXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.XXXXL')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.XXXXL" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.reporter')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.reporter" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.comment')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.comment" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('channel.operation')" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                    <el-button  type="info" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,2)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
      </el-card>
      <el-card shadow="always" class="tab_border">
        <el-form-item  prop="description">
          <el-col :span="24">
            <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(3)">{{ $t('common.addAline') }}</el-button>
            <el-table
              :data="tableData3"
              ref="table"
              tooltip-effect="dark"
              border
              stripe
              class="intervalRows">
              <el-table-column :label="$t('salesOrder.size')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.size" class="module" maxlength="10" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.unit')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.collarLength')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.collarLength" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.collarHeight')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.collarHeight" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.sleeveLength')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sleeveLength" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.sleeveHeight')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sleeveHeight" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.lengthBelt')" align="center" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.lengthBelt" class="module" maxlength="20" show-word-limit type="text"/>
                </template>
              </el-table-column>
              <el-table-column :label="$t('channel.operation')" align="center" fixed="right" >
                <template slot-scope="scope">
                  <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                    <el-button  type="info" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,3)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
      </el-card>
      <el-form-item :label="$t('salesOrder.comment')" prop="description">
        <el-input type="textarea" rows="6" cols="100"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
        <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
      </el-form-item>
    </el-form>
    <customer_order @func="getMsgFormSon" ref="customerOrders" />
  </div>
</template>

<script>
// import { apiProject, apiProTasks } from '@/api'
import customer_order from '@/views/salesDepart/components/customerOrder'

import { unixToDateTime } from '../../../../utils/formater'
import { unixToDate } from '../../../../utils/formater'
export default {
  name:'CreateOrder',
  components: {
    customer_order,
  },
  data() {
    // const validateMobileInput = (rule, value, callback) => {
      // let reg = /^[1-9]\d*$/;
      // if (value) {
      //   if (value > 999999 || new RegExp(reg).test(value) == false) {
      //     setTimeout(() => {
      //         return callback(new Error('请填写正确的手机号码格式！'))
      //     }, 200);
      //   }
      // } else {
      //   callback()
      // }
      // if (!value) {
      //   return callback(new Error('手机号码必填！'))
      // } else if (!validateMobile(value)) {
      //   return callback(new Error('请填写正确的手机号码格式！'))
      // } else {
      //   callback()
      // }
      // if (!value) {
      //   return callback(new Error('手机号码必填！'))
      // } else if (!validateMobile(value)) {
      //   return callback(new Error('请填写正确的手机号码格式！'))
      // } else {
      //   callback()
      // }
    // }

    return {
      // rules: {
      //   ALL: [{ validator: validateMobileInput, trigger: 'blur' }]
      // },
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
    customerOrder() {
      this.$refs.customerOrders.open()
      // this.varChangeColor = true;
    },

    onSubmit1() {
    },

    // 返回
    backPoject() {
      this.$router.push({ path: '/salesOrder'})
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
