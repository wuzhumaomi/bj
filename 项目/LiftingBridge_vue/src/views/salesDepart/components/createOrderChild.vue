<template>
    <!-- 销售订单详情页面 -->
    <div class="app-container">
    <el-form ref="salesFrom"  :model="salesFrom" >
      <div>
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesOrder.orderNumber')"  prop="orderNumber" label-width="80px">
                {{ salesFrom.orderNumber }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.dateOrder')" prop="dateOrder" label-width="80px">
                {{ salesFrom.dateOrder }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.shortOverShipped')" prop="shortOverShipped" label-width="80px">
                <el-row :gutter="24" style="float: left;">
                  <el-col :span="11" >
                    {{ salesFrom.shortOverShipped1 }}
                  </el-col>
                  <el-col :span="2" style="padding:0;text-align: center;" >
                    /
                  </el-col>
                  <el-col :span="11">
                    {{ salesFrom.shortOverShipped2 }}
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item :label="$t('salesOrder.salesType')" prop="salesType" label-width="80px">
                {{ salesFrom.salesType }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.customer')" prop="customer" label-width="80px">
                {{ salesFrom.customer }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.merchandiser')" prop="merchandiser" label-width="80px">
                {{ salesFrom.msgFormSon }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.modificationDate')" prop="modificationDate" label-width="80px">
                {{ salesFrom.modificationDate }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.orderType')" label-width="80px" prop="orderType">
                {{ salesFrom.orderType }}
              </el-form-item>
              <el-form-item  :label="$t('salesOrder.shippingWay')" prop="shippingWay" label-width="80px">
                {{ salesFrom.shippingWay }}
              </el-form-item>
               <el-form-item :label="$t('salesOrder.modifyNumberTimes')" prop="modifyNumberTimes" label-width="80px">
                 {{ salesFrom.modifyNumberTimes }}
                  <!-- <el-input  clearable  v-model="salesForm.modifyNumberTimes"  :placeholder="$t('placeholders.content')"  maxlength="20"/> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <hr>
      <el-card shadow="always" class="tab_border" >
        <el-card shadow="always" class="tab_border">
            <el-form-item  prop="description">
              <el-col :span="24">
                <el-button class="but_bottom"  size="mini"  type="primary"  plain icon="el-icon-menu" @click="printMatchingContact()">{{ $t('common.contactMatchingProofing') }}</el-button>
                <el-button class="but_bottom" style="margin-right: 6px;" size="mini" type="primary"  plain icon="el-icon-s-cooperation" @click="printProductContact()">{{ $t('common.contactProductionProofing') }}</el-button>
                <el-table
                  :data="tableData1"
                  ref="table"
                  tooltip-effect="dark"
                  border
                  stripe
                  class="intervalRows"
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column type="selection" width="55" fixed="left">
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.modelNo')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.modelNo }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.yarnFabrics')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.yarnFabrics }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.arnProperties')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.arnProperties }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.colorNo')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.colorNo }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.colourSystem')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.colourSystem }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.colorCombination')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.colorCombination }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.ofTheGoods')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.ofTheGoods }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.cycle')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.cycle }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.effectiveWidth')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.effectiveWidth }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.gramWeight')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.gramWeight }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.shrinkage')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.shrinkage }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.quantityKGS')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.quantityKGS }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.contractStates')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.contractStates }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.proofingState')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.proofingState }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('salesOrder.comment')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.comment }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('channel.operation')" align="center" fixed="right" width="140">
                    <template slot-scope="scope">
                      <el-tooltip :content="$t('common.generateContract')" placement="bottom">
                        <el-button  type="success" plain circle icon="el-icon-s-order" @click="generateContact(scope.$index, scope.row)"/>
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
              <el-table
                :data="tableData1"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                class="intervalRows"
                @selection-change="handleSelectionChange"
                >
                <el-table-column type="selection" width="55" fixed="left">
                </el-table-column>
                <el-table-column :label="$t('salesOrder.modelNo')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.twomodelNo }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.id')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.id }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.yarnFabrics')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.twoyarnFabrics }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.arnProperties')" align="center" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.twoarnProperties }}
                    </template>
                  </el-table-column>
                <el-table-column :label="$t('salesOrder.colorNo')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.twocolorNo }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.hue')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.hue }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.use')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.use }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.unit')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.unit }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.ALL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.ALL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PS')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PS }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.s')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.s }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PM')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PM }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.M')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.M }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.L')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.L }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.XL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.XL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PXXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PXXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.XXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.XXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PXXXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PXXXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.XXXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.XXXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.PXXXXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.PXXXXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.XXXXL')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.XXXXL }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.reporter')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.reporter }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('salesOrder.comment')" align="center" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.twocomment }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-card>
      </el-card>
      <el-card shadow="always" class="tab_border">
        <el-form-item  prop="description">
          <el-col :span="24">
            <el-table
              :data="tableData3"
              ref="table"
              tooltip-effect="dark"
              border
              stripe
              class="intervalRows">
              <el-table-column :label="$t('salesOrder.size')" align="center" width="180">
                <template slot-scope="scope">
                   {{ scope.row.size }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.unit')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.unit }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.collarLength')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.collarLength }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.collarHeight')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.collarHeight }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.sleeveLength')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.sleeveLength }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.sleeveHeight')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.sleeveHeight }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('salesOrder.lengthBelt')" align="center" width="180">
                <template slot-scope="scope">
                  {{ scope.row.lengthBelt }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
      </el-card>
      <el-form-item :label="$t('salesOrder.comment')" prop="description">
        {{ salesFrom.node }}
      </el-form-item>
    </el-form>
    <print_contact ref="printContacts" />
  </div>
</template>

<script>
import print_contact from '@/views/salesDepart/components/printContactComponents/printContact'
export default {
    name: 'CreateOrderInfo',
    components: {
      print_contact,
    },
    data() {
        return {
          titles:'详情页面',
          salesFrom:{
            orderNumber:'数据显示',
            customer:'数据显示',
            dateOrder:'数据显示',
            salesType:'数据显示',
            orderType:'数据显示',
            shippingWay:'数据显示',
            shortOverShipped1:'11',
            shortOverShipped2:'22',
            modifyNumberTimes:'2次',
            modificationDate:'2018-03-08',
            msgFormSon:'数据显示',
            node:'备注数据显示'
          },
          tableData1:[
            {
              modelNo:'表一',
              yarnFabrics:'表一',
              arnProperties:'表一',
              colorNo:'表一',
              colourSystem:'表一',
              colorCombination:'表一',
              ofTheGoods:'表一',
              cycle:'表一',
              effectiveWidth:'表一',
              gramWeight:'表一',
              shrinkage:'表一',
              quantityKGS:'表一',
              comment:'表一',
              contractStates:'表一',
              proofingState:'表一',
              twomodelNo:'表二',
              id:'表二',
              twoyarnFabrics:'表二',
              twoarnProperties:'表二',
              twocolorNo:'表二',
              hue:'表二',
              use:'表二',
              unit:'表二',
              ALL:'表二',
              PS:'表二',
              s:'表二',
              PM:'表二',
              M:'表二',
              PL:'表二',
              L:'表二',
              PXL:'表二',
              XL:'表二',
              PXXL:'表二',
              XXL:'表二',
              PXXXL:'表二',
              XXXL:'表二',
              PXXXXL:'表二',
              XXXXL:'表二',
              reporter:'表二',
              twocomment:'表二',
            },
            {
              modelNo:'表一',
              yarnFabrics:'表一',
              arnProperties:'表一',
              colorNo:'表一',
              colourSystem:'表一',
              colorCombination:'表一',
              ofTheGoods:'表一',
              cycle:'表一',
              effectiveWidth:'表一',
              gramWeight:'表一',
              shrinkage:'表一',
              quantityKGS:'表一',
              comment:'表一',
              contractStates:'表一',
              proofingState:'表一',
              twomodelNo:'表二',
              id:'表二',
              twoyarnFabrics:'表二',
              twoarnProperties:'表二',
              twocolorNo:'表二',
              hue:'表二',
              use:'表二',
              unit:'表二',
              ALL:'表二',
              PS:'表二',
              s:'表二',
              PM:'表二',
              M:'表二',
              PL:'表二',
              L:'表二',
              PXL:'表二',
              XL:'表二',
              PXXL:'表二',
              XXL:'表二',
              PXXXL:'表二',
              XXXL:'表二',
              PXXXXL:'表二',
              XXXXL:'表二',
              reporter:'表二',
              twocomment:'表二',
            },
          ],
          tableData3:[
            {
            size:'表三',
            unit:'表三',
            collarLength:'表三',
            collarHeight:'表三',
            sleeveLength:'表三',
            sleeveHeight:'表三',
            lengthBelt:'表三',
            size:'表三',
            },
            {
            size:'表三',
            unit:'表三',
            collarLength:'表三',
            collarHeight:'表三',
            sleeveLength:'表三',
            sleeveHeight:'表三',
            lengthBelt:'表三',
            size:'表三',
            },
          ],
          multipleSelection: []
        };
    },
    created() {
    },
    methods:{

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //生成配色打样联系单
      printMatchingContact() {
        this.$refs.printContacts.open()
        // this.varChangeColor = true;
      },

      //生成生产工艺打样联系单组件
      printProductContact() {
        this.$refs.printContacts.open()
        // this.varChangeColor = true;
      },

      //生成合同跳转
      generateContact(row){
          this.$router.push({ path: '/generateContact/'+ 'xxx',})
      },

      personList(){
          let concent = this.$route.params;
          //显示的html部分
          // apiProTasks.getTaskDetails({taskId:concent.id}).then(response => {
          //     this.MyData = response[0];
          // }).catch((err) => {
          //     console.log('err...',err)
          // })
      },

    }
};
</script>
<style>
.tab_border .el-card__body{
  height: auto;
}
.quill-bod{
   border: 0.8px solid #dcdfe6;
}
.quill-bod .el-card__body{
   height: auto;
}
.quill-bod .el-form{
    padding: 20px;
}
.taskCsp p{
    margin: 0;
}
</style>

