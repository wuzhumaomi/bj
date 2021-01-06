<template>
    <!-- 生成合同详情页面 -->
    <div class="app-container">
    <el-form ref="salesFrom"  :model="salesFrom" >
      <div>
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item  :label="$t('salesOrder.hue')"  prop="hue" label-width="80px">
                {{ salesFrom.hue }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.generateOrderNumber')" prop="generateOrderNumber" label-width="90px">
                {{ salesFrom.generateOrderNumber }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.placeDelivery')" prop="placeDelivery" label-width="80px">
                {{ salesFrom.placeDelivery }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.shippingWay')" prop="shippingWay" label-width="80px">
                {{ salesFrom.shippingWay }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('salesOrder.numbe')" prop="numbe" label-width="80px">
                {{ salesFrom.numbe }}
              </el-form-item>
              <el-form-item :label="$t('salesOrder.totalPrice')" prop="totalPrice" label-width="80px">
                {{ salesFrom.totalPrice }}
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form-item :label="$t('salesOrder.comment')" prop="description">
        {{ salesFrom.comment }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'GenerateContactInfo',
    components: {
    },
    data() {
        return {
          titles:'详情页面',
          salesFrom:{
            hue:'数据显示',
            generateOrderNumber:'数据显示',
            placeDelivery:'数据显示',
            shippingWay:'数据显示',
            numbe:'数据显示',
            totalPrice:'11',
            comment:'备注数据显示'
          },
        };
    },
    created() {
    },
    methods:{
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

